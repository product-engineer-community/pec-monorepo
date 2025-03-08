import logoSrc from "@/public/logo.webp";
import Image from "next/image";

export const Logo = () => {
  return (
    <Image
      className="rounded-md"
      src={logoSrc}
      width={32}
      height={32}
      alt="logo"
    />
  );
};
