"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Instagram, Facebook } from "lucide-react";

export default function NavBar() {
  const [openMenu, setOpenMenu] = useState(null);

  const toggleMenu = (menu) => {
    setOpenMenu(openMenu === menu ? null : menu);
  };

  return (
    <header className="bg-bleu flex items-center justify-between w-full px-12 py-3 relative">
      <Image
        src="/logo.png"
        alt="Logo"
        width={50}
        height={50}
        className="bg-bleu"
      />
      <nav>
        <ul className="flex gap-x-10 relative">
          <li>
            <Link href="/" className="text-white hover:underline">
              Accueil
            </Link>
          </li>

          {/* L'ESQ avec sous-menu */}
          <li className="relative">
            <button
              onClick={() => toggleMenu("esq")}
              className="text-white hover:underline"
            >
              L&apos;ESQ
            </button>
            {openMenu === "esq" && (
              <div className="absolute left-0 -bottom-[calc(100%-12px)] w-48 bg-white text-black shadow-lg rounded-md">
                <ul className="flex flex-col">
                  <li>
                    <Link
                      href="/about/histoire"
                      className="block px-4 py-2 hover:bg-gray-100"
                    >
                      Histoire
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/about/staff"
                      className="block px-4 py-2 hover:bg-gray-100"
                    >
                      Staff
                    </Link>
                  </li>
                </ul>
              </div>
            )}
          </li>

          {/* Nos équipes avec sous-menu */}
          <li className="relative">
            <button
              onClick={() => toggleMenu("equipes")}
              className="text-white hover:underline"
            >
              Nos équipes
            </button>
            {openMenu === "equipes" && (
              <div className="absolute left-0 -bottom-[calc(100%-12px)] w-60 bg-white text-black shadow-lg rounded-md">
                <ul className="flex flex-col">
                  <li>
                    <Link
                      href="/equipes/seniors"
                      className="block px-4 py-2 hover:bg-gray-100"
                    >
                      Seniors
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/equipes/u18"
                      className="block px-4 py-2 hover:bg-gray-100"
                    >
                      U18
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/equipes/u15"
                      className="block px-4 py-2 hover:bg-gray-100"
                    >
                      U15
                    </Link>
                  </li>
                </ul>
              </div>
            )}
          </li>

          <li>
            <Link href="/partenaires" className="text-white hover:underline">
              Partenaires
            </Link>
          </li>
          <li>
            <Link href="/contact" className="text-white hover:underline">
              Contact
            </Link>
          </li>
        </ul>
      </nav>
      <div className="flex gap-x-4">
        <li>
          <Link href="/boutique" className="btn">
            Boutique
          </Link>
        </li>
        <li>
          <Link href="/insta" className="text-white hover:underline">
            <Instagram />
          </Link>
        </li>
        <li>
          <Link href="/facebook" className="text-white hover:underline">
            <Facebook />
          </Link>
        </li>
      </div>
    </header>
  );
}
