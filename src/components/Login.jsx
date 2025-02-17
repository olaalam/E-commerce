import React, { useContext, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { UserToken } from "../context/UserToken";
import { forgotPassword, verifyResetCode, resetPassword } from "../hooks/useMutationForgotPassword";

export default function Login() {
  const [loading, setLoading] = useState(false);
  const [errMseg, setErrMesg] = useState("");
  const [forgotSuccess, setForgotSuccess] = useState("");
  const [showVerifyCode, setShowVerifyCode] = useState(false);
  const [resetCode, setResetCode] = useState("");
  const [showResetPassword, setShowResetPassword] = useState(false);
  const [newPassword, setNewPassword] = useState("");

  const navigate = useNavigate();
  let { setLogin } = useContext(UserToken);

  async function handleLogin(values) {
    try {
      setLoading(true);
      let { data } = await axios.post("https://ecommerce.routemisr.com/api/v1/auth/signin", values);
  
      if (data.message === "success") {
        const token = data.token;
        localStorage.setItem("token", token);
  
        const decodedToken = JSON.parse(atob(token.split(".")[1])); 
        const userId = decodedToken.id; 
  
        localStorage.setItem("userId", userId);
        console.log("User ID:", userId);
  
        setLogin(token);
        navigate("/cart");
      }
      setErrMesg("");
    } catch (error) {
      setErrMesg("Email or password incorrect");
    } finally {
      setLoading(false);
    }
  }
  

  let validationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("This field is required"),
    password: Yup.string().required("Required"),
  });

  let formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: handleLogin,
  });

  let { mutate, isLoading } = useMutation({
    mutationKey: ["password"],
    mutationFn: forgotPassword,
    onSuccess: () => {
      setForgotSuccess("Password reset code sent successfully!");
      setErrMesg("");
      setShowVerifyCode(true);
    },
    onError: () => {
      setErrMesg("Failed to send reset email. Please try again.");
    },
  });

  const handleVerifyResetCode = async () => {
    try {
      let { data } = await verifyResetCode(resetCode);
      if (data.status === "success") {
        setForgotSuccess("Reset code verified! Please enter your new password.");
        setErrMesg("");
        setShowResetPassword(true);
      } else {
        throw new Error("Invalid reset code");
      }
    } catch (error) {
      setErrMesg("Invalid reset code. Please try again.");
    }
  };

  const handleResetPassword = async () => {
    try {
      let { data } = await resetPassword(formik.values.email, newPassword);
      if (data.status === "success") {
        setForgotSuccess("Password reset successfully! You can now log in.");
        setErrMesg("");
        setShowVerifyCode(false);
        setShowResetPassword(false);
      }
    } catch (error) {
      setErrMesg("Failed to reset password. Try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center dark:bg-gray-900">
      <div className="w-full max-w-md md:max-w-lg bg-white dark:bg-gray-800 shadow-lg rounded-lg p-8">
        <h1 className="text-center text-3xl font-semibold text-gray-900 dark:text-white mb-6">Login Now</h1>
        <form onSubmit={formik.handleSubmit} className="space-y-6">
          <div className="relative">
            <label className="block text-gray-700 dark:text-gray-300">Email Address</label>
            <input
              type="email"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              className="peer block w-full px-4 py-3 border border-gray-300 rounded-lg"
              placeholder="Enter your email"
            />
          </div>
          <div className="relative">
            <label className="block text-gray-700 dark:text-gray-300">Password</label>
            <input
              type="password"
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              className="peer block w-full px-4 py-3 border border-gray-300 rounded-lg"
              placeholder="Enter your password"
            />
          </div>
          {errMseg && <p className="text-red-600 text-center">{errMseg}</p>}
          {forgotSuccess && <p className="text-green-600 text-center">{forgotSuccess}</p>}
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 text-white bg-green-600 ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
          >
            {loading ? "Loading..." : "Login"}
          </button>
          <button
            type="button"
            onClick={() => {
              if (formik.values.email) {
                mutate(formik.values.email);
              } else {
                setErrMesg("Please enter your email first.");
              }
            }}
            className="w-full py-3 text-green-700 border border-green-600"
          >
            Forgot Password?
          </button>
          {showVerifyCode && (
            <div className="relative mt-4">
              <label className="block text-gray-700 dark:text-gray-300">Reset Code</label>
              <input
                type="text"
                value={resetCode}
                onChange={(e) => setResetCode(e.target.value)} 
                className="peer block w-full px-4 py-3 border border-gray-300 rounded-lg"
                placeholder="Enter Reset Code"
              />
              <button onClick={handleVerifyResetCode} className="w-full mt-2 py-3 text-white bg-green-600">
                Verify Code
              </button>
            </div>
          )}
          {showResetPassword && (
            <div className="relative mt-4">
              <label className="block text-gray-700 dark:text-gray-300">New Password</label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="peer block w-full px-4 py-3 border border-gray-300 rounded-lg"
                placeholder="New Password"
              />
              <button onClick={handleResetPassword} className="w-full mt-2 py-3 text-white bg-green-600">
                Reset Password
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
