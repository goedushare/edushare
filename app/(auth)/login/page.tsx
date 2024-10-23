"use client";

import TextField from "@/components/TextField";
import { Button } from "@nextui-org/react";
import Link from "next/link";
import { useState, useEffect } from "react";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "@/lib/firebaseConfig";
import useAuth from "@/lib/useAuth";
import { useRouter } from "next/navigation";
import { redirect } from "next/navigation";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const { user, loading } = useAuth();

  useEffect(() => {
    if (!loading && user) {
      redirect("/dashboard");
    }
  }, [user, loading]);

  const router = useRouter();

  const handleGoogleLogin = async () => {
    signInWithPopup(auth, googleProvider)
      .then((res) => {
        router.push("/dashboard");
      })
      .catch((error) => {
        console.log("Error signing in with Google:", error);
      });
  };

  const handleLogin = async () => {
    setError("");
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      router.push("/dashboard");
      console.log("User logged in:", userCredential.user);
    } catch (error) {
      // Handle different Firebase auth errors
      const firebaseError = error as { code: string };
      if (firebaseError.code === "auth/wrong-password") {
        setError("Password and email do not match.");
      } else if (firebaseError.code === "auth/user-not-found") {
        setError("This email is not registered.");
      } else if (firebaseError.code === "auth/invalid-email") {
        setError("The email address is not valid.");
      } else if (firebaseError.code === "auth/invalid-credential") {
        setError("Password and email do not match.");
      } else {
        setError("Failed to log in. Please try again.");
      }
      // console.error('Error logging in:', firebaseError);
    }
  };

  return (
    <div className="h-screen flex flex-row justify-center">
      <div className="w-96 h-96 mt-24 p-8 bg-gray-50 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold font-montserrat">Login</h1>
        <form
          className="flex flex-col h-5/6 mt-4"
          onSubmit={(e) => e.preventDefault()}
        >
          <TextField
            value={email}
            setValue={setEmail}
            type="email"
            label="Email"
            className="basis-1/4"
          />
          <TextField
            value={password}
            setValue={setPassword}
            type="password"
            label="Password"
            className="basis-1/4"
          />

          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
          <div className="basis-1/2 flex flex-col justify-end gap-y-4">
            <Button
              onClick={handleGoogleLogin}
              className="text-[#0E793C] border-[#0E793C] border bg-transparent font-semibold"
            >
              Login with Google
            </Button>
            <div className="flex flex-row justify-between items-end">
              <Button
                onClick={handleLogin}
                type="submit"
                className="bg-[#0E793C] text-white font-semibold"
              >
                Login
              </Button>
              <p>
                <Link
                  href="/register"
                  className="hover:underline text-[#0E793C]"
                >
                  Register Here
                </Link>
              </p>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
