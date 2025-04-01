import httpRequest from "../utils/httpRequest";

export const getCurrentUser = async () => {
  const response = await httpRequest.get("/auth/me");
  return response;
};

export const getUser = async (idOrUsername) => {
  const response = await httpRequest.get(`/auth/users/${idOrUsername}`);
  return response;
};

export const login = async (request) => {
  const response = await httpRequest.post("/auth/login", request);
  return response;
};

export const register = async (request) => {
  const response = await httpRequest.post("/auth/register", request);
  return response;
};

export const logout = async () => {
  const response = await httpRequest.post("/auth/logout");
  return response;
};

export const checkEmail = async (email) => {
  const response = await httpRequest.get(`/auth/check-email?email=${email}`);
  return response;
};
