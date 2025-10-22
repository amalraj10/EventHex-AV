import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "@/components/common/Input";
import Button from "@/components/common/Button";
import { ROUTES } from "@/constants/routes";
import backgroundImage from "@/assets/images/bg-1-image.svg";
import logo from "@/assets/logos/Layer-1-logo.svg";

export default function Login() {
  const navigate = useNavigate();
  const [avCode, setAvCode] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (avCode.trim()) {
      navigate(ROUTES.SESSIONS);
    }
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* Left Side - Hero Section */}
      <div className="relative flex-1 bg-[#0f172a] overflow-hidden min-h-[400px] lg:min-h-screen">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src={backgroundImage}
            alt=""
            className="w-full h-full object-cover opacity-80"
          />
        </div>

        {/* Blue gradient overlay - only on left side behind text */}
        <div className="absolute left-0 top-0 bottom-0 w-[60%] bg-gradient-to-r from-[#1e3a8a]/70 via-[#1e40af]/50 to-transparent" />

        {/* Glowing Blue Light Effect - Only around logo and text */}
        <div className="absolute left-8 top-12 w-[400px] h-[400px] rounded-full bg-[#3b82f6] opacity-25 blur-[100px]" />
        <div className="absolute left-0 top-32 w-[300px] h-[300px] rounded-full bg-[#60a5fa] opacity-20 blur-[80px]" />

        {/* Content */}
        <div className="relative z-10 flex flex-col gap-16 p-8 lg:p-16 pt-12 lg:pt-16">
          {/* Logo */}
          <img
            src={logo}
            alt="EventHex"
            className="w-[220px] lg:w-[280px] h-auto"
          />

          {/* Headlines */}
          <div className="flex flex-col gap-6 max-w-[600px]">
            <h1 className="text-white font-sans text-[42px] sm:text-[52px] lg:text-[64px] font-bold leading-[1.1] tracking-tight">
              Engage, Inspire
              <br />
              Inform With Ai
            </h1>
            <h2 className="text-white/90 font-sans text-[28px] sm:text-[36px] lg:text-[44px] font-normal leading-[1.15] tracking-tight">
              AI-Based Real-Time
              <br />
              Content Summarisation
            </h2>
          </div>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="flex-1 bg-white flex flex-col items-center justify-center p-8 lg:p-20 relative">
        <div className="w-full max-w-[420px] flex flex-col gap-10">
          {/* Intro */}
          <div className="flex flex-col gap-3">
            <h2 className="text-[#0f172a] font-sans text-[34px] lg:text-[38px] font-bold leading-[1.1]">
              Enter AV Code 🎧
            </h2>
            <p className="text-[#64748b] font-sans text-[16px] font-normal leading-[1.5]">
              Provide your assigned AV team code to continue.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            {/* Input Field */}
            <Input
              id="avCode"
              label="AV Code"
              type="text"
              value={avCode}
              onChange={(e) => setAvCode(e.target.value)}
              placeholder="Enter AV Code"
            />

            {/* Sign In Button */}
            <Button
              type="submit"
              className="w-full py-3.5 rounded-lg  text-white font-sans text-[16px] font-semibold leading-[1] hover:bg-[#5558e3] transition-colors shadow-sm"
            >
              Sign in
            </Button>
          </form>
        </div>

        {/* Secure Access Portal Text - Desktop */}
        <div className="hidden lg:block absolute bottom-12 text-[#64748b] text-center font-sans text-[14px] font-normal">
          Secure access portal
        </div>
      </div>

      {/* Footer - Mobile/Tablet */}
      <div className="lg:hidden bg-white py-6 text-center border-t border-gray-100">
        <p className="text-[#64748b] font-sans text-sm font-normal">
          Secure access portal
        </p>
        <p className="text-[#94a3b8] font-sans text-sm font-normal mt-2">
          © 2025 ALL RIGHTS RESERVED
        </p>
      </div>
    </div>
  );
}
