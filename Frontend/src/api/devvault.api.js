import axiosInstance from "../utils/axios.instance";

export const registerUser = async(username,email,password)=>{
    const {data} = await axiosInstance.post("/api/auth/register",{username,email,password})
    return data;
}

export const verifyUser = async(otp,email)=>{
    const {data} = await axiosInstance.post("/api/auth/verify-email",{email,otp})
    return data;
}

export const loginUser = async(email,password)=>{
    const{data} = await axiosInstance.post("/api/auth/login",{email,password})
    return data;
}

export const refreshAccessToken = async () => {
  const { data } = await axiosInstance.post("/api/auth/refresh-token");
  return data;
};

export const getCurrentUser = async () => {
  const { data } = await axiosInstance.get("/api/auth/getme");
  return data;
};

export const logOut = async ()=>{
    await axiosInstance.get("/api/auth/logout")
}

export const resendOtp = async (email)=>{
  const {data} = await axiosInstance.post("/api/auth/resend-otp",
   {email} 
  )
  return data;
}

export const forgotPassword = async(email)=>{
  const {data} = await axiosInstance.post("/api/auth/forgot-password",
    {email}
  )
  return data;
}

export const verifyResetOtp = async(otp,email)=>{
  const {data} = await axiosInstance.post("/api/auth/verify-reset-otp",
    {otp,email}
  )
  return data;
}

export const resetPassword = async(newPassword,token)=>{
  const {data} = await axiosInstance.post("/api/auth/reset-password",
    {newPassword},{
      headers:{
        Authorization:`Bearer ${token}`,
      },
    }
  )
  return data;
}