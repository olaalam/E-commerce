import axios from "axios";
import { useMutation } from "@tanstack/react-query";

const API_BASE_URL = "https://ecommerce.routemisr.com/api/v1/auth";

export function forgotPassword(email) {
  return axios.post(`${API_BASE_URL}/forgotPasswords`, { email });
}

export function verifyResetCode(resetCode) {
  return axios.post(`${API_BASE_URL}/verifyResetCode`, { resetCode });
}

export function resetPassword(email, newPassword) {
  return axios.put(`${API_BASE_URL}/resetPassword`, { email, newPassword });
}

export default function useMutationForgotPassword() {
  return useMutation({
    mutationFn: forgotPassword,
    mutationKey: ["password"],
  });
}
