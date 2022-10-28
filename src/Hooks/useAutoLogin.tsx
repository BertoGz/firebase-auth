import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useMutationLoginUser } from "../React-Query";
import { FirebaseActions } from "../Firebase";
import { getAuth } from "firebase/auth";
const auth = getAuth();
export const useAutoLogin = () => {
  const { mutateAsync: loginMutation } = useMutationLoginUser();
  const navigate = useNavigate();
  function onAutoLogin(isEmailLinkSignin = false) {
    loginMutation(
      {
        isEmailLinkSignin,
      },
      {
        onSuccess: () => {
          //debugger;
          // alert("success login!");
          navigate("user");
        },
      }
    );
  }

  useEffect(() => {
    const isSignInWithEmailLink = FirebaseActions.isSignInWithEmailLink();
    auth.onAuthStateChanged((user) => {
      if (user && !isSignInWithEmailLink) {
        onAutoLogin();
      }
    });

    if (isSignInWithEmailLink) {
      onAutoLogin(isSignInWithEmailLink);
    }
  }, []);
  return <></>;
};
