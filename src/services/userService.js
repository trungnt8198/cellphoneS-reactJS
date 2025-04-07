import httpRequest from "../utils/httpRequest";

export const getUser = async (idOrUsername) => {
  const response = await httpRequest.get(`/users/${idOrUsername}`);
  return response;
};

export const updateUser = async (username, request) => {
  const response = await httpRequest.put(`/users/me?_method=PUT`, request);
  return response;
};
