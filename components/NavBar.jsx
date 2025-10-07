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
        <Image src="/logo-texte.png" alt="Logo" width={180} height={180} />
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
            <Link href="/esq/actualites" className="dropdown-item">Actualités</Link>
            <Link href="/esq/histoire" className="dropdown-item">Histoire</Link>
            <Link href="/esq/mot-du-president" className="dropdown-item">Mot du Président</Link>
            <Link href="/esq/arbitres" className="dropdown-item">Arbitres</Link>
          </div>
        </div>
        <div className="relative group">
          <button className="navbar-link flex items-center gap-1">
            Nos équipes <ChevronDown size={16} />
          </button>
          <div className="absolute top-full left-0 bg-bleu py-2 w-48 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-40 flex flex-col">
            <div className="relative group/seniors">
              <button className="dropdown-item flex justify-between items-center w-full text-left">
                Seniors <ChevronDown size={14} />
              </button>
              <div className="absolute left-full top-0 bg-bleu py-2 w-48 opacity-0 invisible group-hover/seniors:opacity-100 group-hover/seniors:visible transition-all z-50 flex flex-col whitespace-nowrap">
                <Link href="/nos-equipes/seniors-A" className="dropdown-item">Équipe 1</Link>
                <Link href="/nos-equipes/seniors-B" className="dropdown-item">Équipe 2</Link>
                <Link href="/nos-equipes/seniors-C" className="dropdown-item">Équipe 3</Link>
              </div>
            </div>
            <div className="relative group/jeunes">
              <button className="dropdown-item flex justify-between items-center w-full text-left">
                Jeunes <ChevronDown size={14} />
              </button>
              <div className="absolute left-full top-0 bg-bleu py-2 w-48 opacity-0 invisible group-hover/jeunes:opacity-100 group-hover/jeunes:visible transition-all z-50 flex flex-col whitespace-nowrap">
                <Link href="/equipes/u17" className="dropdown-item">U17</Link>
                <Link href="/equipes/u15" className="dropdown-item">U15</Link>
                <Link href="/equipes/u13" className="dropdown-item">U13</Link>
                <Link href="/equipes/u11" className="dropdown-item">U11</Link>
                <Link href="/equipes/u9" className="dropdown-item">U9</Link>
                <Link href="/equipes/u7" className="dropdown-item">U7</Link>
              </div>
            </div>
            
            {/* Liens directs */}
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
