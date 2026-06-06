import { MapPin, Phone } from "lucide-react";
import { FaFacebook, FaInstagram, FaWhatsapp } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const Social = () => {
  return (
    <div className="">
      <div className="flex flex-col justify-center gap-3">
        <h3 className="mb-3 text-base font-bold text-greenPrimary underline">
          Connect With Us
        </h3>
        <div className="flex flex-col gap-3">
          <span className="flex items-center gap-6">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white">
              <Phone className="h-5 w-5 text-greenPrimary" />
            </div>
            <div>
              <p className="text-sm font-normal">Drop a Line</p>
              <h4 className="text-sm font-bold">+254 703 371 240</h4>
            </div>
          </span>

          <span className="flex items-center gap-6">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white">
              <MapPin className="h-5 w-5 text-greenPrimary" />
            </div>
            <div>
              <p className="text-sm font-normal">Visit the office</p>
              <p className="text-sm font-normal">Kastemil business centre</p>
              <h4 className="text-sm font-bold">Nairobi, Kasarani</h4>
            </div>
          </span>
          <div className="ml-14 mt-2 flex gap-3">
            <a
              href="https://web.facebook.com/tumainifitnesscentre"
              target="_blank"
              rel="noopener"
            >
              <FaFacebook className="text-xl text-gray-500 duration-200 ease-out hover:text-greenPrimary" />
            </a>
            <a
              href="https://www.instagram.com/tumaini_fitness_centre/"
              target="_blank"
              rel="noopener"
            >
              <FaInstagram className="text-xl text-gray-500 duration-200 ease-out hover:text-greenPrimary" />
            </a>
            <a
              href="https://x.com/Bonifac45261505"
              target="_blank"
              rel="noopener"
            >
              <FaXTwitter className="text-xl text-gray-500 duration-200 ease-out hover:text-greenPrimary" />
            </a>
            <a
              href="https://wa.me/+254703371240"
              target="_blank"
              rel="noopener"
            >
              <FaWhatsapp className="text-xl text-gray-500 duration-200 ease-out hover:text-greenPrimary" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Social;
