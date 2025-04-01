import { useContext } from "react";
import { UserContext } from "../../contexts/UserContext";

export const useUser = () => {
  const data = useContext(UserContext);
  return data;
};
