import { useContext, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setLogin } from "../store/reducers/auth.slice";
// import { useAuthContext } from "./useAuthContext";
import { useNavigate } from "react-router-dom";

export const useLogin = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  // const { dispatch } = useAuthContext();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const login = async (values) => {
    setIsLoading(true);
    setError(null);

    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });

    const json = await response.json();

    if (!response.ok) {
      setIsLoading(false);
      setError(json.error);
    }

    if (response.ok) {
      // saving user session to local storage
      localStorage.setItem("user", JSON.stringify(json));

      dispatch(setLogin(json));
      setIsLoading(false);
      navigate("/");
    }
  };

  return { login, isLoading, error };
};
