"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Github, Instagram, Mail, Info, HelpCircle,
  FileText, Home, Facebook, Youtube, Linkedin,
} from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";

const links = [
  { href: "/", label: "Home" },
  { href: "/blog", label: "Blog" },
  { href: "/faq", label: "FAQ" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
  { href: "/privacy", label: "Privacy" },
  { href: "/terms", label: "Terms" },
];

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 ios-glass">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <span className="text-xl font-bold gradient-text tracking-tight">
            Insta Reel ↓
          </span>
        </Link>

        {/* Desktop menu */}
        <div className="hidden items-center space-x-1 md:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`rounded-lg px-3 py-1.5 text-sm font-medium transition-all duration-150 ${
                pathname === link.href
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:bg-secondary hover:text-foreground"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <div className="ml-2">
            <ThemeToggle />
          </div>
        </div>

        {/* Mobile: theme + hamburger */}
        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <button
            onClick={() => setOpen(!open)}
            className="rounded-lg p-2 text-muted-foreground transition hover:bg-secondary"
            aria-label="Toggle menu"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden border-t border-border/50 bg-background/95 backdrop-blur md:hidden"
          >
            <div className="grid grid-cols-2 gap-1 p-3">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`rounded-xl px-4 py-3 text-sm font-medium transition-all ${
                    pathname === link.href
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                  }`}
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

export function Footer() {
  return (
    <footer className="mt-20 border-t border-border/50 bg-card/50">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 sm:grid-cols-2 md:grid-cols-3">
        {/* About */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h3 className="mb-3 text-base font-semibold gradient-text">
            Insta Reel Downloader
          </h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Free Instagram downloader for videos and Reels.<br />
            ⚡ Fast, 🔒 Secure, works on all devices.
          </p>
        </motion.div>

        {/* Quick Links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h3 className="mb-3 text-base font-semibold text-foreground">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            {[
              { href: "/", label: "Home", icon: Home },
              { href: "/blog", label: "Blog", icon: FileText },
              { href: "/faq", label: "FAQ", icon: HelpCircle },
              { href: "/about", label: "About", icon: Info },
              { href: "/contact", label: "Contact", icon: Mail },
            ].map(({ href, label, icon: Icon }) => (
              <li key={href}>
                <Link
                  href={href}
                  className="group flex items-center gap-2 text-muted-foreground transition hover:text-primary"
                >
                  <Icon className="h-3.5 w-3.5 group-hover:text-primary" />
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Legal */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <h3 className="mb-3 text-base font-semibold text-foreground">Legal</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href="/privacy" className="text-muted-foreground transition hover:text-primary">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link href="/terms" className="text-muted-foreground transition hover:text-primary">
                Terms of Service
              </Link>
            </li>
          </ul>
        </motion.div>
      </div>

      {/* Social */}
      <motion.div
        className="flex justify-center gap-4 py-4"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        {[
          { href: "https://www.instagram.com/gaming_zone.world/#", icon: Instagram, color: "hover:text-pink-500" },
          { href: "https://www.facebook.com/JaYShriRAM9p/", icon: Facebook, color: "hover:text-blue-500" },
          { href: "https://youtube.com/@makemoneydailyathome", icon: Youtube, color: "hover:text-red-500" },
          { href: "https://www.linkedin.com/in/chetan-solanki-66a6842b5/", icon: Linkedin, color: "hover:text-blue-600" },
          { href: "https://github.com/ChetaN7895", icon: Github, color: "hover:text-foreground" },
        ].map(({ href, icon: Icon, color }) => (
          <Link
            key={href}
            href={href}
            target="_blank"
            className={`rounded-xl p-2 text-muted-foreground transition-all duration-150 hover:bg-secondary ${color} active:scale-90`}
          >
            <Icon className="h-5 w-5" />
          </Link>
        ))}
      </motion.div>

      {/* Copyright */}
      <div className="border-t border-border/50 py-4 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()}{" "}
        <span className="font-semibold gradient-text">Insta Reel Downloader</span>
        . All rights reserved.
      </div>
    </footer>
  );
}
