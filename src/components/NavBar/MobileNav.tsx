import { Menu } from "lucide-react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { Separator } from "../ui/separator";
import Link from "next/link";

const MobileNav = () => {
  return (
    <Sheet aria-describedby="mobile nav">
      <SheetTrigger>
        <Menu />
      </SheetTrigger>
      <SheetContent
        className="flex flex-col gap-3 rounded-bl-xl rounded-br-xl"
        aria-describedby={"dialog-description"}
        side={"top"}
      >
        <SheetTitle className="text-base font-bold text-greenPrimary">
          Tumaini Oasis Adventures
        </SheetTitle>
        <Separator />
        <div
          className="flex flex-col justify-between gap-5"
          id="dialog-description"
        >
          <div className="flex flex-col space-y-3">
            <SheetClose asChild>
              <Link
                href={"/tours"}
                className="font-semibold active:text-greenPrimary text-sm"
              >
                Tours
              </Link>
            </SheetClose>

            <Separator />
            <SheetClose asChild>
              <Link
                href={"/about"}
                className="font-semibold active:text-greenPrimary text-sm"
              >
                About us
              </Link>
            </SheetClose>

            <Separator />

            <SheetClose asChild>
              <Link
                href={"/contact"}
                className="font-semibold active:text-greenPrimary text-sm"
              >
                contact-us
              </Link>
            </SheetClose>

            <Separator />

            <SheetClose asChild>
              <Link
                href={"/gallery"}
                className="font-semibold active:text-greenPrimary text-sm"
              >
                Gallery
              </Link>
            </SheetClose>
          </div>
          <a
            href="https://gym.tumainioasisadventures.co.ke/"
            target="_blank"
            rel="noopener"
            className="font-bold text-sm text-primary underline"
          >
            Checkout our Gym
          </a>{" "}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNav;
