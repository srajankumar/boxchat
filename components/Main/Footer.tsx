import { Heart } from "lucide-react";

const Footer = () => {
  return (
    <div className="flex font-medium w-full justify-center pb-10 items-center space-x-1">
      <p>made on earth with</p> <Heart className="w-[1rem] h-[1rem]" />
    </div>
  );
};

export default Footer;
