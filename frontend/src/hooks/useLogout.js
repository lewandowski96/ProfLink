import { useDispatch } from "react-redux";
import { setLogout } from "../store/reducers/auth.slice";
// import { useAuthContext } from "./useAuthContext";

export const useLogout = () => {
  const dispatch = useDispatch();

  const logout = () => {
    localStorage.removeItem("user");

    dispatch(setLogout());
  };

  return { logout };
};
