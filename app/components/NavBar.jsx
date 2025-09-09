import Link from "next/link";
import Image from "next/image";
import { AtSign, Instagram, Facebook } from "lucide-react";

export default function NavBar() {
  return (
    <header className="bg-bleu flex flex-col justify-between w-full px-36 py-4 gap-8">
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
      <nav className="flex justify-center items-center gap-8">
        <Link href="/admin" className="navbar-link">Accueil</Link>
        <Link href="/about" className="navbar-link">L'ESQ</Link>
        <Link href="/contact" className="navbar-link">Nos équipes</Link>
        <Link href="/services" className="navbar-link">Partenaires</Link>
        <Link href="/blog" className="navbar-link">Contact</Link>
      </nav>
    </header>
  );
}
