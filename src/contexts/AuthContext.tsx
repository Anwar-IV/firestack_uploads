import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../config/firebase";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  updateProfile,
  User,
  signOut,
} from "firebase/auth";

type AuthContextProviderProps = {
  children: React.ReactNode;
};

type AuthContextProps = {
  user: User | null;
  registerUser: (
    displayName: string,
    email: string,
    password: string
  ) => Promise<User | undefined>;
  error: string | null;
  loginError: string | null;
  loginUser: (email: string, password: string) => Promise<User | undefined>;
  setError: React.Dispatch<React.SetStateAction<string | null>>;
  setLoginError: React.Dispatch<React.SetStateAction<string | null>>;
  _signOut: () => void;
  loading: boolean;
};

const AuthContext = createContext<AuthContextProps>({} as AuthContextProps);

export function useAuthCtx() {
  return useContext(AuthContext);
}

export function AuthContextProvider({ children }: AuthContextProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [loginError, setLoginError] = useState<string | null>(null);

  const registerUser = async (
    displayName: string,
    email: string,
    password: string
  ): Promise<User | undefined> => {
    try {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      if (user) {
        await updateProfile(user, { displayName });
        return user;
      }
    } catch (error: any) {
      switch (error.code) {
        case "auth/weak-password":
          setError(
            "Password should be at least 6 characters. Please select a stronger password."
          );
          break;
        case "auth/invalid-email":
          setError("Email is not valid. Please select a valid email");
          break;
        case "auth/email-already-in-use":
          setError("Email already exists. Do you have an account with us?");
          break;
        default:
          setError(error.code);
          return;
      }
    }
  };

  const loginUser = async (
    email: string,
    password: string
  ): Promise<User | undefined> => {
    try {
      const { user } = await signInWithEmailAndPassword(auth, email, password);
      if (user) {
        return user;
      }
    } catch (error: any) {
      switch (error.code) {
        case "auth/wrong-password":
          setLoginError(
            "Incorrect Credentials. Please check your email and password are correct"
          );
          break;
        case "auth/user-not-found":
          setLoginError(
            "Incorrect Credentials. Please check your email and password are correct"
          );
          break;
        case "auth/invalid-email":
          setLoginError("Email is not valid. Please select a valid email");
          break;
        default:
          setLoginError(error.code);
          return;
      }
    }
  };
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        setLoading(false);
      } else {
        setUser(null);
        setLoading(false);
      }
    });
    return () => unsubscribe();
  }, []);
  const _signOut = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.log({ error });
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        registerUser,
        error,
        loginUser,
        loginError,
        setError,
        setLoginError,
        _signOut,
        loading,
      }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
}
