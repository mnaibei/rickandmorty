"use client";
import Link from "next/link";

export default function Nav() {
  return (
    <nav className="flex-between w-full mb-16 pt-3">
      <Link href="/" className="flex gap-2 flex-center">
        {/* <Image
              src="/assets/images/logo.svg"
              alt="logo"
              width={30}
              height={30}
              className="object-contain" */}
        {/* /> */}
        <h1 className="logo_text">Rick and Morty</h1>
      </Link>
      <div className="sm:flex hidden">
        <div className="flex gap-3 md:gap-5">
          <Link href="/" className="flex-center black_btn">
            <button className="btn btn-primary">Home</button>
          </Link>
        </div>
      </div>
    </nav>
  );
}
