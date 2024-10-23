"use client";

import TextField from "@/components/TextField";
import {
  Button,
  DropdownItem,
  DropdownTrigger,
  Dropdown,
} from "@nextui-org/react";
import Link from "next/link";
import { useState } from "react";
import { auth, googleProvider } from "@/lib/firebaseConfig";
import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  updateProfile,
} from "firebase/auth";
import { useRouter } from "next/navigation";
import { onRegister } from "@/lib/firestoreHelpers";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("student");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const router = useRouter();

  const handleRegister = async () => {
    setError("");
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      await updateProfile(userCredential.user, {
        displayName: name,
      });
      setSuccess(true);
      onRegister(userCredential.user, name, role);
      console.log("User registered:", userCredential.user);
      console.log("User registered:", userCredential);
      router.push("/dashboard");
    } catch (error) {
      // Handle different Firebase auth errors
      const firebaseError = error as { code: string };
      if (firebaseError.code === "auth/weak-password") {
        setError("Password is too short. It should be at least 6 characters.");
      } else if (firebaseError.code === "auth/email-already-in-use") {
        setError("This email is already in use.");
      } else if (firebaseError.code === "auth/invalid-email") {
        setError("The email address is not valid.");
      } else {
        setError("Failed to register. Please try again.");
      }
      // console.error('Error registering:', firebaseError);
    }
  };

  const handleGoogleRegister = async () => {
    signInWithPopup(auth, googleProvider)
      .then((res) => {
        setSuccess(true);
        onRegister(res.user, res.user.displayName, role);
        router.push("/dashboard");
      })
      .catch((error) => {
        console.log("Error signing in with Google:", error);
      });
  };

  return (
    <div className="h-screen flex flex-row justify-center">
      <div className="w-96 h-[440px] mt-24 p-8 bg-gray-50 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold">Register</h1>
        <form
          className="flex flex-col h-5/6 mt-4"
          onSubmit={(e) => e.preventDefault()}
        >
          <TextField
            value={name}
            setValue={setName}
            label="Name"
            className="basis-1/6"
          />
          <TextField
            value={email}
            setValue={setEmail}
            type="email"
            label="Email"
            className="basis-1/6"
          />
          <TextField
            value={password}
            setValue={setPassword}
            type="password"
            label="Password"
            className="basis-1/6"
          />

          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
          <div className="basis-1/2 flex flex-col justify-end gap-y-4">
            <Button
              onClick={handleGoogleRegister}
              className="text-[#0E793C] border-[#0E793C] border bg-transparent font-semibold"
            >
              Register with Google
            </Button>
            <div className="flex flex-row justify-between items-end">
              <Button
                onClick={handleRegister}
                type="submit"
                className="bg-[#0E793C] text-white font-semibold"
              >
                Register
              </Button>
              <p>
                <Link href="/login" className="hover:underline text-[#0E793C]">
                  Login Here
                </Link>
              </p>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
