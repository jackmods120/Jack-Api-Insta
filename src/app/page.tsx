"use client";
import Link from "next/link";
import { useState } from "react";
import { InstagramVideoForm } from "@/features/instagram/components/form";
import { Download, Link2, CheckCircle, Zap, Smartphone, Film, Shield } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import FaqPreview from "@/components/FaqPreview";
import { DownloadSteps } from "@/components/DownloadSteps";

const faqs = [
  {
    q: "Is downloading from Instagram legal?",
    a: "Downloading for personal use is usually fine, but copyright remains with the creator. Always get permission before sharing or republishing content.",
  },
  {
    q: "Do I need to log in?",
    a: "No login or account is required. Just paste the public Instagram link.",
  },
  {
    q: "What devices are supported?",
    a: "Our downloader works on mobile, tablet, and desktop. Compatible with all browsers.",
  },
  {
    q: "What video/photo quality do I get?",
    a: "Photos are downloaded in original resolution (up to 1080px). Videos are MP4 in the best available quality.",
  },
];

const features = [
  { icon: Zap, label: "Fast", desc: "Instant processing with no waiting time." },
  { icon: Smartphone, label: "All Devices", desc: "Works on mobile, tablet, and desktop." },
  { icon: Film, label: "HD Quality", desc: "Videos saved as MP4 at highest resolution." },
  { icon: Shield, label: "Secure", desc: "No login required. Private & safe downloads." },
];

const steps = [
  { icon: Link2, label: "Copy Link", desc: "Copy the Instagram post, Reel, or video URL." },
  { icon: Download, label: "Paste URL", desc: "Paste the link into the input box above." },
  { icon: CheckCircle, label: "Download", desc: "Click download and save the file to your device." },
];

export default function HomePage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="relative overflow-hidden px-4 py-24 text-center">
        {/* Background gradient blobs */}
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute -top-32 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-purple-500/20 blur-3xl dark:bg-purple-700/25" />
          <div className="absolute -bottom-20 right-1/4 h-64 w-64 rounded-full bg-pink-500/20 blur-3xl dark:bg-pink-700/20" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="mb-4 inline-block rounded-full border border-primary/30 bg-primary/10 px-4 py-1 text-sm font-medium text-primary">
            Free • Fast • No Login Required
          </span>
          <h1 className="mb-4 text-5xl font-bold tracking-tight sm:text-6xl">
            <span className="gradient-text">Reels Downloader</span>
          </h1>
          <p className="mx-auto mb-10 max-w-xl text-lg text-muted-foreground">
            Download Instagram Videos & Reels in HD quality — instantly, securely, and for free.
          </p>
          <div className="mx-auto max-w-xl">
            <InstagramVideoForm />
          </div>
        </motion.div>
      </section>

      {/* Steps */}
      <section className="px-4 py-16">
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-10 text-center text-2xl font-bold">How to Download?</h2>
          <div className="grid gap-4 sm:grid-cols-3">
            {steps.map(({ icon: Icon, label, desc }, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="ios-card p-6 text-center"
              >
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10">
                  <Icon className="h-6 w-6 text-primary" />
                </div>
                <div className="mb-1 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                  Step {i + 1}
                </div>
                <h3 className="mb-2 font-semibold">{label}</h3>
                <p className="text-sm text-muted-foreground">{desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="px-4 py-16">
        <div className="mx-auto grid max-w-4xl gap-4 sm:grid-cols-2 md:grid-cols-4">
          {features.map(({ icon: Icon, label, desc }, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.08 }}
              className="ios-card p-5 text-center"
            >
              <div className="mx-auto mb-3 flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/10">
                <Icon className="h-5 w-5 text-primary" />
              </div>
              <h3 className="mb-1 font-semibold">{label}</h3>
              <p className="text-xs text-muted-foreground">{desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="mx-auto w-full max-w-2xl px-4 py-16">
        <h2 className="mb-8 text-center text-2xl font-bold">Frequently Asked Questions</h2>
        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <div key={i} className="ios-card overflow-hidden">
              <button
                className="flex w-full items-center justify-between px-5 py-4 text-left text-sm font-medium transition-colors hover:bg-secondary/50"
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
              >
                <span>{faq.q}</span>
                <span className={`ml-4 shrink-0 text-primary transition-transform duration-200 ${openFaq === i ? "rotate-45" : ""}`}>
                  ✕
                </span>
              </button>
              <AnimatePresence>
                {openFaq === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="overflow-hidden"
                  >
                    <p className="px-5 pb-4 text-sm text-muted-foreground leading-relaxed">
                      {faq.a}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
