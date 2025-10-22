import logo from "@/assets/logos/header-logo-1.svg";
import { LogoProps } from "@/types/common.types";

const Logo = ({ className = "h-8", onClick }: LogoProps) => {
  return (
    <img
      src={logo}
      alt="EventHex"
      className={`${className} ${onClick ? "cursor-pointer" : ""}`}
      onClick={onClick}
    />
  );
};

export default Logo;