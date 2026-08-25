import userModel from "../models/user.model.js";
import config from "../config/config.js";
import sessionModel from "../models/session.model.js";
import crypto from "crypto";
import jwt from "jsonwebtoken";

export async function register(req, res) {
  const { username, email, password } = req.body;
  const alreadyRegistered = await userModel.findOne({
    $or: [{ username }, { email }],
  });

  if (alreadyRegistered) {
    return res.status(409).json({
      message: "Username or email already exist",
    });
  }

  const hashedPassword = crypto
    .createHash("sha256")
    .update(password)
    .digest("hex");

  const user = await userModel.create({
    username,
    email,
    password: hashedPassword,
  });

   const refreshToken = jwt.sign(
    {
      id: user._id,
    },
    config.JWT_SECRET,
    {
      expiresIn: "7d",
    },
  );

  const refreshTokenHash = crypto.createHash("sha256").update(refreshToken).digest("hex")

  const session = await sessionModel.create({
          user:user._id,
          refreshTokenHash,
          ip:req.ip,
          userAgent:req.headers["user-agent"]
  })


  const accessToken = jwt.sign(
    {
      id: user._id,
      sessionId:session._id
    },
    config.JWT_SECRET,
    {
      expiresIn: "15min",
    },
  );

 

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  res.status(201).json({
    message: "User Created Successfully",
    user: {
      username: user.username,
      email: user.email,
    },
    accessToken,
  });
}

export async function login(req,res){
    const{email,password}=req.body
    const user = await userModel.findOne({email})

    if(!user){
        return res.status(401).json({
            message:"invalid email or password"
        })
    }

    const hashedPassword = crypto.createHash("sha256").update(password).digest("hex")
    const isPasswordValid =  hashedPassword === user.password

    if(!isPasswordValid){
        return res.status(401).json({
            message:"invalid email or password "
        })
    }

    const refreshToken = jwt.sign({
        id:user._id,
        },config.JWT_SECRET,
        {
            expiresIn:"7d"
        }
    )

    const refreshTokenHash = crypto.createHash("sha256").update(refreshToken).digest("hex")

    const session = await sessionModel.create({
        user:user._id,
        refreshTokenHash,
        ip:req.ip,
        userAgent:req.headers["user-agent"]
    })

    const accessToken = jwt.sign({
        id:user._id,
        sessionId:session._id
    },config.JWT_SECRET,
    {
        expiresIn:"15m"
    }
)

   res.cookies("refreshToken",refreshToken,{
    httpOnly:true,
    secure:true,
    sameSite:"strict",
    maxAge: 7*24*60*60*1000
   })

   res.status(200).json({
    message:"Logged In Successfully",
    user:{
        username:user.username,
        email:user.email,
    },accessToken
   })
}

export async function getme(req, res) {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({
      message: "token not found",
    });
  }

  const decoded = jwt.verify(token, config.JWT_SECRET);
  const user = await userModel.findById(decoded.id);

  res.status(200).json({
    message: "user fetched successfully",
    user: {
      username: user.username,
      email: user.email,
    },
  });
}

export async function refreshToken(req, res) {
  const refreshToken = req.cookies.refreshToken;

  if (!refreshToken) {
    return res.status(401).json({
      message: "refresh token not found",
    });
  }

  const decoded = jwt.verify(refreshToken, config.JWT_SECRET);

  const refreshTokenHash = crypto.createHash("sha256").update(refreshToken).digest("hex")

  const session = sessionModel.findOne({
    refreshTokenHash,
    revoked:false
  })

  if(!session){
    return res.status(401).json({
        message:"invalid refresh token"
    })
  }


  const accessToken = jwt.sign(
    {
      id: decoded.id,
    },
    config.JWT_SECRET,
    {
      expiresIn: "15m",
    },
  );

  const newrefreshToken = jwt.sign(
    {
      id : decoded.id,
    },config.JWT_SECRET,
    {
        expiresIn:"7d"
    }
  )

  
    const newRefreshTokenHash = crypto.createHash("sha256").update(refreshToken).digest("hex")
    session.refreshTokenHash=newRefreshTokenHash
    await session.save()


  res.cookie("refreshToken",newrefreshToken,{
     httpOnly:true,
     secure:true,
     sameSite:"strict",
     maxAge: 7*24*60*60*1000
  })

  res.status(200).json({
    message: "access token refreshed",
    accessToken,
  });
}

export async function logout(req,res){
    const refreshToken = req.cookies.refreshToken;

    if(!refreshToken){
        return res.status(400).json({
            message:"Refresh token not found"
        })
    }

    const refreshTokenHash = crypto.createHash("sha256").update(refreshToken).digest("hex")

    const session = await sessionModel.findOne({
        refreshTokenHash,
        revoked:false
    })

    if(!session){
        return res.status(400).json({
            message:"Invalid refresh token"
        })
    }

    session.revoked = true;
    await session.save();

    res.clearCookie("refreshToken")

    res.status(200).json({
        message:"Logged Out Successfully"
    })


}

export async function logoutAll(req,res){
    const refreshToken = req.cookies.refreshToken
    if(!refreshToken){
        return res.status(400).json({
            message:"Refresh Token not found"
        })
    }

    const decoded = jwt.verify(refreshToken,config.JWT_SECRET)

    await sessionModel.updateMany({
        user:decoded.id,
        revoked:false
    },{
        revoked:true
    }
)

res.clearCookie("refreshToken")
res.status(200).json({
    message:"Logged out from all devices successfully"
})

}

