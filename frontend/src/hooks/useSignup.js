import { useContext, useState } from "react";
// import { useAuthContext } from "./useAuthContext";
import { useDispatch, useSelector } from "react-redux";
import { setLogin } from "../store/reducers/auth.slice";

export const useSignup = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const dispatch = useDispatch();

  const signup = async (values) => {
    setIsLoading(true);
    setError(null);

    const response = await fetch("/api/auth/signup", {
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
    }
  };

  return { signup, isLoading, error };
};
