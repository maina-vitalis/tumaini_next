import Image from "next/image";
import logo from "./../../../public/image/icon.png";

const Logo = () => {
  return (
    <div>
      <div className="relative h-28 w-28 overflow-hidden rounded-full">
        <Image 
          src={logo} 
          alt="tumaini fitness logo" 
          fill 
          className="object-cover" 
        />
      </div>
    </div>
  );
};

export default Logo;
