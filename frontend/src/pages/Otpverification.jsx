import { useState } from "react";
import { useNavigate } from "react-router-dom";

function ForgotPassword() {
  const [formData, setFormData] = useState({
    otp: "",
    email: localStorage.getItem("email"),
  });
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const apiUrl = import.meta.env.VITE_API_URL;

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      if (!formData.otp) {
        setError("Empty field!");
        return;
      }
      const res = await fetch(`${apiUrl}/auth/verifyOtp`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      console.log(data);
      if (!res.ok) {
        console.log("ERROR:", data);
      } else {
        navigate("/resetpassword");
      }
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="flex justify-center items-center h-screen bg-slate-100">
      <div className="w-full max-w-sm px-6 py-8 rounded-xl shadow-xl hover:shadow-2xl">
        <div className="mb-8">
          <p className="text-xs font-medium uppercase tracking-widest text-gray-400 mb-2">
            Account
          </p>
          <h1 className="text-2xl font-medium text-gray-900 mb-1">
            Reset password
          </h1>
          <p className="text-sm text-gray-500">Enter OTP</p>
        </div>

        <div className="flex flex-col gap-3 mb-6">
          <form onSubmit={handleSubmit}>
            <label className="block text-xs text-gray-500 mb-1.5">OTP</label>
            <input
              name="otp"
              type="text"
              value={formData.otp}
              onChange={handleChange}
              placeholder="Enter OTP "
              className="w-full border border-gray-500 rounded-lg px-3 py-2 text-sm outline-none focus:border-gray-400 transition-colors"
            />
            <p className="flex justify-center mt-2 text-xs text-red-500 tranistion">
              {error}
            </p>

            <button
              type="submit"
              className="w-full border mt-4 border-gray-500 rounded-lg py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-200 transition-colors"
            >
              Confirm
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
