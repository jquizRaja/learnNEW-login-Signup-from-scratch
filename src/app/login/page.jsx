"use client";
import React, { useState,useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios"
import toast from "react-hot-toast";

const LoginPage = () => {
  const router=useRouter()
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const onLogin = async () => {
    try {
      setLoading(true);
      const response = await axios.post("api/users/login", user);
      console.log("Login Success", response.data);
      toast.success("Login Successfully✅🔓🔓✅🎈🎈🎆👍")
      router.push("/profile");
    } catch (error) {
      console.log("Login Fail", error.message);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };
    useEffect(() => {
      if (
        user.email.length > 0 &&
        user.password.length > 0
      ) {
        setButtonDisabled(false);
      } else {
        setButtonDisabled(true);
      }
    }, [user]);
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 mb-10">
      <h1>{loading ? "Processing..." : "Login"}</h1>
      <hr />

      <label htmlFor="email">Email</label>
      <input
        id="email"
        type="email"
        value={user.email}
        onChange={(e) => setUser({ ...user, email: e.target.value })}
        placeholder="Email"
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      />
      <label htmlFor="password">Password</label>
      <input
        id="password"
        type="password"
        value={user.password}
        onChange={(e) => setUser({ ...user, password: e.target.value })}
        placeholder="Password"
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      />
      <button
        onClick={onLogin}
        className="bg-blue-500 hover:bg-blue-700 mt-5 text-white font-bold py-2 px-4 rounded-full"
      >
        {buttonDisabled ? "Provide All Fields" : "Login"}
      </button>
      <Link href="/signup">
        <span>Not Registered Yet! </span>Sign Up{" "}
      </Link>
    </div>
  );
};

export default LoginPage;
