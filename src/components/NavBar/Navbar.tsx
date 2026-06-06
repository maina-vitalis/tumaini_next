import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";
import logo from "./../../../public/image/icon.png";
import MainNav from "./MainNav";
import MobileNav from "./MobileNav";
import { ModeToggle } from "./ThemeToggle";

const Navbar = () => {
  return (
    <div className="sticky top-0 z-50 flex h-20 items-center bg-muted">
      <div className="mx-auto flex w-full items-center justify-between px-3 md:max-w-[95%] lg:max-w-[1200px] gap-3">
        <Link href={"/"} className="text-3xl font-bold text-primary">
          <div className="m-2 h-[70px] w-[70px] overflow-hidden rounded-full">
            <Image
              src={logo}
              alt="tumaini fitness logo"
              width={70}
              height={70}
              className="h-full w-full object-cover"
            />
          </div>
        </Link>

        <div className="hidden w-full items-center md:flex">
          <div className="">
            <MainNav />
          </div>

          <Button className="rounded-xl border-[1px] border-transparent bg-greenPrimary hover:border-[1px] hover:border-greenPrimary hover:bg-white hover:text-gray-500 ml-auto">
            <a
              href="https://gym.tumainioasisadventures.co.ke/"
              target="_blank"
              rel="noopener"
            >
              Checkout our Gym
            </a>
          </Button>
        </div>
        <div className="flex gap-3 items-center">
          <div>
            <ModeToggle />
          </div>

          <div className="block md:hidden">
            <MobileNav />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
