import { Globe } from "lucide-react";
import logo from "@/assets/eventhex-logo.png";

const Header = () => {
  return (
    <header className="border-b border-border bg-background px-6 py-4">
      <div className="flex items-center justify-between">
        <img src={logo} alt="EventHex" className="h-8" />
        <button className="p-2 hover:bg-accent rounded-lg transition-colors">
          <Globe className="w-5 h-5 text-muted-foreground" />
        </button>
      </div>
    </header>
  );
};

export default Header;
