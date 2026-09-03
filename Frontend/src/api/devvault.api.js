import axiosInstance from "../utils/axios.instance";

export const registerUser = async (username, email, password) => {
  const { data } = await axiosInstance.post("/api/auth/register", {
    username,
    email,
    password,
  });
  return data;
};

export const verifyUser = async (otp, email) => {
  const { data } = await axiosInstance.post("/api/auth/verify-email", {
    email,
    otp,
  });
  return data;
};

export const loginUser = async (email, password) => {
  const { data } = await axiosInstance.post("/api/auth/login", {
    email,
    password,
  });
  return data;
};

export const refreshAccessToken = async () => {
  const { data } = await axiosInstance.post("/api/auth/refresh-token");
  return data;
};

export const getCurrentUser = async () => {
  const { data } = await axiosInstance.get("/api/auth/getme");
  return data;
};

export const logOut = async () => {
  await axiosInstance.get("/api/auth/logout");
};

export const resendOtp = async (email) => {
  const { data } = await axiosInstance.post("/api/auth/resend-otp", { email });
  return data;
};

export const forgotPassword = async (email) => {
  const { data } = await axiosInstance.post("/api/auth/forgot-password", {
    email,
  });
  return data;
};

export const verifyResetOtp = async (otp, email) => {
  const { data } = await axiosInstance.post("/api/auth/verify-reset-otp", {
    otp,
    email,
  });
  return data;
};

export const resetPassword = async (newPassword, token) => {
  const { data } = await axiosInstance.post(
    "/api/auth/reset-password",
    { newPassword },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  return data;
};

export const getDocument = async () => {
  const { data } = await axiosInstance.get("/api/documents/get");

  return data;
};

export const uploadDocument = async (formData) => {
  const { data } = await axiosInstance.post("/api/documents/upload", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return data;
};

export const viewDocument = async (id) => {
  const { data } = await axiosInstance.get(`/api/documents/${id}/view`, {
    responseType: "blob",
  });

  return URL.createObjectURL(data);
};

export const deleteDocument = async (id) => {
  const { data } = await axiosInstance.delete(`/api/documents/${id}`);
  return data;
};

export const updateDocument = async (id, payload) => {
  const { data } = await axiosInstance.put(`/api/documents/${id}`, payload);
  return data;
};

export const getFamilyMembers = async ()=>{
  const {data} =await axiosInstance.get("/api/family")
  return data;
}

export const addFamilyMember = async(name,relation)=>{
  const {data} = await axiosInstance.post("/api/family",{
    name,relation
  })
  return data;
}

export const deleteFamilyMember = async(id)=>{
  const {data} = await axiosInstance.delete(`/api/family/${id}`)
  return data
}