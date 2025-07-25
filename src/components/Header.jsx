import React, { useState } from "react";
import { Logo, LogoutBtn } from "./index";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function Header() {
  const authStatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate();
 

  const navItems = [
    { name: "Home", slug: "/", active: true },
    { name: "Login", slug: "/login", active: !authStatus },
    { name: "Signup", slug: "/signup", active: !authStatus },
    { name: "Favourites", slug: "/favourites", active: authStatus },
  ];

  return (
    <header className="py-3 shadow  ">
      <nav className="flex items-center justify-between px-6">
        <Link to="/">
          <Logo width="70px" />
        </Link>

        <div className="flex gap-4">
          {navItems.map((item) =>
            item.active ? (
              <button
                key={item.name}
                onClick={() => navigate(item.slug)}
                className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition"
              >
                {item.name}
              </button>
            ) : null
          )}
          {authStatus && <LogoutBtn />}
        </div>

        
      </nav>
    </header>
  );
}

export default Header;
