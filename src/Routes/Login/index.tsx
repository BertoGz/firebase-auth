import React, { useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "../../Components/Input";
import { HiOutlineMail } from "react-icons/hi";
import { AiFillPhone } from "react-icons/ai";
import { MdPassword } from "react-icons/md";
import { useState } from "react";
import {
  useMutationCreateUser,
  useMutationLoginUser,
  loginUserErrorStates,
  createUserErrorStates,
} from "../../React-Query";
import { FirebaseActions } from "../../Firebase";
import { getAuth } from "firebase/auth";

const auth = getAuth();

function Login() {
  const navigate = useNavigate();
  const { mutateAsync: loginMutation } = useMutationLoginUser();
  const { mutateAsync: createUserMutation } = useMutationCreateUser();
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [isLogin, setIsLogin] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function onLogin(isEmailLinkSignin = false) {
    loginMutation(
      {
        isEmailLinkSignin,
        email: credentials.email,
        password: credentials.password,
      },
      {
        onSuccess: () => {
          //debugger;
          // alert("success login!");
          navigate("user");
        },
        onError: (res) => {
          setError(res);
        },
      }
    );
  }

  useEffect(() => {
    const isSignInWithEmailLink = FirebaseActions.isSignInWithEmailLink();
    auth.onAuthStateChanged((user) => {
      if (user && !isSignInWithEmailLink) {
        onLogin();
      }
    });

    if (isSignInWithEmailLink) {
      onLogin(isSignInWithEmailLink);
    }
  }, []);

  function onChangeCredentials(key: string, e: any) {
    if (!e) {
      return;
    }
    setCredentials({
      ...credentials,
      [key]: e.target.value,
    });
  }
  const checkEmailError = useMemo(() => {
    if (!isLogin) {
      return (
        error === createUserErrorStates.emailInUse ||
        error === createUserErrorStates.invalidEmail
      );
    } else {
      return error === loginUserErrorStates.incorrectCredentials;
    }
  }, [error, isLogin]);
  const checkPasswordError = useMemo(() => {
    if (!isLogin) {
      return error === createUserErrorStates.weakPassword;
    } else {
      return error === loginUserErrorStates.incorrectCredentials;
    }
  }, [error, isLogin]);
  const getErrorMessage = useMemo(() => {
    switch (error) {
      case createUserErrorStates.emailInUse:
        return "An account with that email already exists";
      case createUserErrorStates.invalidEmail:
        return "Please enter a valid email";
      case createUserErrorStates.weakPassword:
        return "Please use a password that is 6 or more characters in length";
      case loginUserErrorStates.incorrectCredentials:
        return "Incorrect password or email";
      case createUserErrorStates.networkError:
      case loginUserErrorStates.networkError:
        return "There is a network error";
    }
  }, [error]);

  function onSubmit() {
    setError(null);
    if (isLogin) {
      onLogin();
    } else {
      createUserMutation(
        {
          email: credentials.email,
          password: credentials.password,
        },
        {
          onSuccess: () => {
            navigate("user");
          },
          onError: (res) => {
            setError(res);
          },
        }
      );
    }
  }
  return (
    <div className="grid flex-col place-items-center justify-center bg-red-300 h-screen">
      <div className="bg-slate-50 inline-flex flex-col w-[340px] space-y-8 p-4 shadow-lg rounded">
        <div className="inline-flex flex-row">
          <AiFillPhone className="text-emerald-400" />
          <h1 className="text-slate-600 font-bold">Firebase-auth</h1>
        </div>
        <h1 className="text-3xl text-slate-600 font-bold text-center">
          {isLogin ? "User Login" : "Register"}
        </h1>
        <div>
          <Input
            value={credentials.email}
            onChange={(e) => {
              onChangeCredentials("email", e);
            }}
            type="email"
            placeholder="Enter email"
            startAdornment={<HiOutlineMail />}
          />
          {checkEmailError && (
            <h1 className="text-red-500 text-sm">{getErrorMessage}</h1>
          )}
        </div>
        <div>
          <Input
            value={credentials.password}
            placeholder="Enter password"
            startAdornment={<MdPassword />}
            type="password"
            onChange={(e) => {
              onChangeCredentials("password", e);
            }}
          />
          {checkPasswordError && (
            <h1 className="text-red-500 text-sm">{getErrorMessage}</h1>
          )}
        </div>
        {!isLogin && (
          <Input
            value={credentials.confirmPassword}
            placeholder="Confirm password"
            startAdornment={<MdPassword />}
            type="password"
            onChange={(e) => {
              onChangeCredentials("confirmPassword", e);
            }}
          />
        )}
        <h1 className="text-slate-800">
          {isLogin ? "New user?" : "Already a user?"}{" "}
          <button
            onClick={() => {
              setIsLogin(!isLogin);
            }}
            className="text-blue-500"
          >
            {isLogin ? "Sign up!" : "Login"}
          </button>
        </h1>
        <button className="bg-blue-600 text-white rounded" onClick={onSubmit}>
          {" "}
          {isLogin ? "Login" : "Sign Up"}
        </button>
      </div>
        <div className="flex flex-col place-items-center">
          <h1 className="text-slate-600 text-sm font-bold">Created using</h1>
          <h1 className="text-slate-600 text-sm">TailwindCss</h1>
          <h1 className="text-slate-600 text-sm">React Query</h1>
          <h1 className="text-slate-600 text-sm">Firebase</h1>
        </div>

    </div>
  );
}

export default Login;
