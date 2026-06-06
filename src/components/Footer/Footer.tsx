import Link from "next/link";
import Logo from "./Logo";
import Social from "./Social";
import UsefulLinks from "./UsefulLinks";

const Footer = () => {
  return (
    <footer className="mt-4 w-full bg-muted">
      <div className="mx-auto max-w-full px-3 md:max-w-[95%] lg:max-w-[1140px]">
        <div className="flex flex-row flex-wrap justify-between gap-9 py-10">
          <div className="min-w-[200px]">
            <Logo />
          </div>
          <div>
            <Social />
          </div>
          <div>
            <UsefulLinks />
          </div>
        </div>
      </div>
      <div className="h-[50px] w-full items-center bg-card text-sm md:text-base text-center">
        <Link href={"/admin/dashboard"}>©</Link> {new Date().getFullYear()}{" "}
        Copyrights by Tumaini Oasis Adventures. All Rights Reserved
      </div>
    </footer>
  );
};

export default Footer;
