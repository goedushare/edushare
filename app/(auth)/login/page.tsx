"use client";

import TextField from "@/components/TextField";
import { Button } from "@nextui-org/react";
import Link from "next/link";
import { useState, useEffect } from "react";
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/lib/firebaseConfig';
import useAuth from '@/lib/useAuth';
import { useRouter } from 'next/router';
import { redirect } from 'next/navigation';



const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { user, loading } = useAuth();

  useEffect(() => {

    if (!loading && user) {
      redirect('/dashboard');
    }
  }, [user, loading]);

  const handleLogin = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log('User logged in:', userCredential.user);
    } catch (error) {
      console.error('Error logging in:', error);
    }
  };

  return (
    <div className="h-screen flex flex-row justify-center">
      <div className="w-96 h-96 mt-24 p-10 bg-gray-50 rounded-lg shadow-md">
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
          <div className="basis-1/2 flex flex-col justify-end">
            <div className="flex flex-row justify-between items-end">
              <Button onClick={handleLogin} type="submit" className="bg-[#0E793C] text-white font-semibold">
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
