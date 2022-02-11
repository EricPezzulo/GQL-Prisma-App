import React from "react";
import Link from "next/link";
import { Users } from "@styled-icons/fa-solid/Users";
import { Home } from "@styled-icons/boxicons-regular/Home";

const Header = () => {
  return (
    <header className="text-gray-600 body-font">
      <div className="container mx-auto flex justify-between items-center my-5">
        <Link href="/">
          <div className="h-10 w-10 bg-blue-500 text-white p-1 rounded-full flex items-center hover:cursor-pointer">
            <Home />
          </div>
        </Link>

        <Link href="/users">
          <div className="h-10 w-10 bg-blue-500 text-white p-1 rounded-full flex items-center hover:cursor-pointer">
            <Users />
          </div>
        </Link>
      </div>
    </header>
  );
};

export default Header;
