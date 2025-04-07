import httpRequest from "../utils/httpRequest";

export const getCurrentUser = async () => {
  const response = await httpRequest.get("/auth/me");
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

export const checkEmail = async (email, excludeId = undefined) => {
  const excludedIdParam = excludeId ? `&exclude_id=${excludeId}` : "";
  const response = await httpRequest.get(
    `/auth/check-email?email=${email}${excludedIdParam}`
  );
  return response;
};

export const checkPhone = async (phone, excludeId) => {
  const response = await httpRequest.get(
    `/auth/check-phone?phone=${phone}&exclude_id=${excludeId}`
  );
  return response;
};

export const checkUsername = async (username, excludeId) => {
  const response = await httpRequest.get(
    `/auth/check-username?username=${username}&exclude_id=${excludeId}`
  );
  return response;
};
