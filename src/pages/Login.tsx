import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Headphones } from "lucide-react";
import logo from "@/assets/eventhex-logo.png";
import heroBackground from "@/assets/hero-background.png";

const Login = () => {
  const [avCode, setAvCode] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (avCode.trim()) {
      navigate("/sessions");
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Hero Section */}
      <div 
        className="hidden lg:flex lg:w-1/2 relative bg-cover bg-center"
        style={{ backgroundImage: `url(${heroBackground})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/80 to-blue-600/60" />
        <div className="relative z-10 flex flex-col justify-between p-12 text-white">
          <img src={logo} alt="EventHex" className="h-10 w-auto" />
          
          <div>
            <h1 className="text-5xl font-bold mb-4 leading-tight">
              Engage, Inspire<br />Inform With Ai
            </h1>
            <p className="text-2xl text-blue-100 font-light">
              AI-Based Real-Time<br />Content Summarisation
            </p>
          </div>
        </div>
      </div>

      {/* Right Form Section */}
      <div className="flex-1 flex items-center justify-center p-8 bg-background">
        <div className="w-full max-w-md">
          <div className="mb-8 lg:hidden">
            <img src={logo} alt="EventHex" className="h-8" />
          </div>

          <div className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <h2 className="text-3xl font-semibold text-foreground">
                Enter AV Code
              </h2>
              <Headphones className="w-6 h-6 text-muted-foreground" />
            </div>
            <p className="text-muted-foreground">
              Provide your assigned AV team code to continue.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="avCode" className="text-foreground">
                AV Code
              </Label>
              <Input
                id="avCode"
                type="text"
                placeholder="Enter AV Code"
                value={avCode}
                onChange={(e) => setAvCode(e.target.value)}
                className="h-12"
              />
            </div>

            <Button type="submit" className="w-full h-12 text-base font-medium">
              Sign in
            </Button>
          </form>

          <p className="mt-8 text-center text-sm text-muted-foreground">
            Secure access portal
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
