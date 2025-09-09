"use client";

import Link from "next/link";
import Image from "next/image";
import { AtSign, Instagram, Facebook, ChevronDown } from "lucide-react";

export default function NavBar() {
  return (
    <header className="bg-bleu flex flex-col justify-between w-full px-36 pt-4 gap-4">
      <div className="flex justify-between items-center">
        <a href="mailto:contact@esq.com" className="flex items-center gap-2 text-white">
          <AtSign size={20} />
          <span>contact@esq.com</span>
        </a>
        <Image src="/logo.png" alt="Logo" width={80} height={80} />
        <div className="flex items-center gap-8">
          <Link href="#" className="btn">Boutique</Link>
          <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
            <Facebook size={20} color="white" />
          </a>
          <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
            <Instagram size={20} color="white" />
          </a>
        </div>
      </div>

      <nav className="flex justify-center items-center gap-6 relative">
        <Link href="/" className="navbar-link">Accueil</Link>
        <div className="relative group">
          <button className="navbar-link flex items-center gap-1">
            L'ESQ <ChevronDown size={16} />
          </button>
          <div className="absolute top-full bg-bleu py-2 w-48 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-40 flex flex-col">
            <Link href="/club/actualites" className="dropdown-item">Actualités</Link>
            <Link href="/club/histoire" className="dropdown-item">Histoire</Link>
            <Link href="/club/mot-du-president" className="dropdown-item">Mot du Président</Link>
            <Link href="/club/arbitres" className="dropdown-item">Arbitres</Link>
          </div>
        </div>
        <div className="relative group">
          <button className="navbar-link flex items-center gap-1">
            Nos équipes <ChevronDown size={16} />
          </button>
          <div className="absolute top-full bg-bleu py-2 w-48 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-40 flex flex-col">
            <div className="relative">
              <button className="dropdown-item peer flex justify-between items-center w-full text-left">
                Seniors <ChevronDown size={14} />
              </button>
              <div className="absolute left-full top-0 mt-0 bg-bleu py-2 w-48 opacity-0 invisible peer-hover:opacity-100 peer-focus:opacity-100 peer-hover:visible peer-focus:visible transition-all z-50 flex flex-col whitespace-nowrap">
                <Link href="/equipes/seniors-1" className="dropdown-item">Équipe 1</Link>
                <Link href="/equipes/seniors-2" className="dropdown-item">Équipe 2</Link>
              </div>
            </div>
            <div className="relative">
              <button className="dropdown-item peer flex justify-between items-center w-full text-left">
                Jeunes <ChevronDown size={14} />
              </button>
              <div className="absolute left-full top-0 mt-0 bg-bleu py-2 w-48 opacity-0 invisible peer-hover:opacity-100 peer-focus:opacity-100 peer-hover:visible peer-focus:visible transition-all z-50 flex flex-col whitespace-nowrap">
                <Link href="/equipes/u18" className="dropdown-item">U18</Link>
                <Link href="/equipes/u15" className="dropdown-item">U15</Link>
                <Link href="/equipes/u13" className="dropdown-item">U13</Link>
              </div>
            </div>
            <Link href="/equipes/feminines" className="dropdown-item">Féminines</Link>
            <Link href="/equipes/futsal" className="dropdown-item">Futsal</Link>
            <Link href="/equipes/veterans" className="dropdown-item">Vétérans</Link>
          </div>
        </div>
        <Link href="/partenaires" className="navbar-link">Partenaires</Link>
        <Link href="/contact" className="navbar-link">Contact</Link>
      </nav>
    </header>
  );
}
