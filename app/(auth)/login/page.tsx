import TextField from "@/app/components/TextField";
import { Button } from "@nextui-org/react";
import Link from "next/link";

const Login = () => {
  return (
    <div className="h-screen flex flex-row justify-center">
      <div className="w-96 h-1/2 mt-24 px-4 py-4 bg-gray-50 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold">Login</h1>
        <form className="flex flex-col h-5/6 mt-4">
          <TextField type="email" label="Email" className="basis-1/4" />
          <TextField type="password" label="Password" className="basis-1/4" />
          <div className="basis-1/2 flex flex-col justify-end">
            <div className="flex flex-row justify-between items-end">
              <Button color="primary" type="submit" className="">
                Button
              </Button>
              <p>
                <Link
                  href="/register"
                  className="hover:underline text-blue-500"
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
