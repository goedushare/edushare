"use client";

import TextField from "@/components/TextField";
import { Button } from "@nextui-org/react";
import Link from "next/link";
import { useState } from "react";
import { auth } from '@/lib/firebaseConfig';
import { createUserWithEmailAndPassword } from 'firebase/auth';

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleRegister = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      setSuccess(true);
      console.log('User registered:', userCredential.user);
    } catch (error) {
      // setError(error.message);
      console.error('Error registering:', error);
    }
  };

  return (
    <div className="h-screen flex flex-row justify-center">
      <div className="w-96 h-96 mt-24 px-4 py-4 bg-gray-50 rounded-lg shadow-md">
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
          <div className="basis-1/2 flex flex-col justify-end">
            <div className="flex flex-row justify-between items-end">
              <Button onClick={handleRegister} type="submit" className="bg-[#0E793C] text-white">
                Register
              </Button>
              <p>
                <Link href="/login" className="hover:underline text-[#0E793C]">
                  Log In Here
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
