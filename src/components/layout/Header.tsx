import { Globe } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Logo from "@/components/common/Logo";
import { ROUTES } from "@/constants/routes";

const Header = () => {
  const navigate = useNavigate();

  const handleLogoClick = () => {
    navigate(ROUTES.HOME);
  };

  return (
    <header className="border-b border-border bg-background px-6 py-4">
      <div className="flex items-center justify-between">
        <Logo onClick={handleLogoClick} />
        <button className="p-2 hover:bg-accent rounded-lg transition-colors">
          <Globe className="w-5 h-5 text-muted-foreground" />
        </button>
      </div>
    </header>
  );
};

export default Header;