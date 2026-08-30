import axiosInstance from "../utils/axios.instance";

export const registerUser = async(username,email,password)=>{
    const {data} = await axiosInstance.post("/api/auth/register",{username,email,password})
    return data;
}

export const verifyUser = async(otp,email)=>{
    const {data} = await axiosInstance.post("/api/auth/verify-email",{otp,email})
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