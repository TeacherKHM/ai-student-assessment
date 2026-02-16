"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

export default function NavBar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "glass py-3 shadow-md" : "bg-transparent py-5"}`}>
      <div className="container mx-auto flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white font-bold group-hover:scale-110 transition-transform">
            Σ
          </div>
          <span className="text-xl font-bold tracking-tight text-foreground">
            Edu<span className="text-primary">AI</span>
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          <Link href="#features" className="text-sm font-medium text-secondary hover:text-primary transition-colors">Features</Link>
          <Link href="#how-it-works" className="text-sm font-medium text-secondary hover:text-primary transition-colors">How it Works</Link>
          <Link href="/dashboard" className="text-sm font-medium text-secondary hover:text-primary transition-colors">Dashboard</Link>
        </div>

        <div className="flex items-center gap-4">
          <Link href="/login" className="text-sm font-medium text-secondary hover:text-primary transition-colors px-4 py-2">
            Log in
          </Link>
          <Link href="/signup" className="bg-primary text-white text-sm font-semibold px-5 py-2.5 rounded-full hover:bg-primary-hover hover:shadow-lg transition-all active:scale-95">
            Get Started
          </Link>
        </div>
      </div>
    </nav>
  );
}
