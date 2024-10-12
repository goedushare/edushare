"use client";

import TextField from "@/components/TextField";
import { Button } from "@nextui-org/react";
import Link from "next/link";
import { useState } from "react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="h-screen flex flex-row justify-center">
      <div className="w-96 h-80 mt-24 px-4 py-4 bg-gray-50 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold">Login</h1>
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
              <Button type="submit" className="bg-[#0E793C] text-white">
                Log In
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
