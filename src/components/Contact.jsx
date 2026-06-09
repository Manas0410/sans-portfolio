import { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import Magnetic from "./Magnetic";
import data from "../data/portfolio.json";

const Icon = ({ name }) => {
  const props = {
    width: 20,
    height: 20,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round",
    strokeLinejoin: "round",
  };
  switch (name) {
    case "github":
      return (
        <svg {...props} fill="currentColor" stroke="none">
          <path d="M12 2C6.48 2 2 6.48 2 12c0 4.42 2.87 8.17 6.84 9.5.5.09.68-.22.68-.48 0-.24-.01-.87-.01-1.7-2.78.6-3.37-1.34-3.37-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.89 1.52 2.34 1.08 2.91.83.09-.65.35-1.08.63-1.33-2.22-.25-4.55-1.11-4.55-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.02a9.56 9.56 0 0 1 5 0c1.91-1.29 2.75-1.02 2.75-1.02.55 1.38.2 2.4.1 2.65.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.69-4.57 4.94.36.31.68.92.68 1.85 0 1.34-.01 2.42-.01 2.75 0 .27.18.58.69.48A10.01 10.01 0 0 0 22 12c0-5.52-4.48-10-10-10z" />
        </svg>
      );
    case "linkedin":
      return (
        <svg {...props} fill="currentColor" stroke="none">
          <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14zM8.34 18.34V9.9H5.67v8.44h2.67zM7 8.67a1.55 1.55 0 1 0 0-3.1 1.55 1.55 0 0 0 0 3.1zm11.34 9.67v-4.63c0-2.47-1.32-3.62-3.08-3.62-1.42 0-2.06.78-2.41 1.33V9.9h-2.67c.04.75 0 8.44 0 8.44h2.67v-4.71c0-.24.02-.48.09-.65.19-.48.63-.98 1.36-.98.96 0 1.34.73 1.34 1.8v4.54h2.7z" />
        </svg>
      );
    case "mail":
      return (
        <svg {...props}>
          <rect x="2" y="4" width="20" height="16" rx="2" />
          <path d="m22 7-10 6L2 7" />
        </svg>
      );
    case "phone":
      return (
        <svg {...props}>
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" />
        </svg>
      );
    default:
      return null;
  }
};

function ContactRow({ icon, label, value, href }) {
  return (
    <a
      href={href}
      target={href.startsWith("http") ? "_blank" : undefined}
      rel="noreferrer"
      data-cursor="link"
      className="group flex items-center justify-between border-t border-white/8 py-6 transition-colors hover:border-white/20"
    >
      <div className="flex items-center gap-5">
        <span className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 text-mist transition-all duration-300 group-hover:border-cyan/40 group-hover:text-cyan">
          <Icon name={icon} />
        </span>
        <div>
          <div className="font-mono text-xs uppercase tracking-widest text-mist">
            {label}
          </div>
          <div className="font-display text-lg font-semibold md:text-xl">
            {value}
          </div>
        </div>
      </div>
      <span className="text-mist transition-all duration-300 group-hover:translate-x-1 group-hover:text-ghost">
        ↗
      </span>
    </a>
  );
}

export default function Contact() {
  const { contact, meta } = data;
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end end"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [80, 0]);

  const rows = [
    {
      icon: "mail",
      label: "Email",
      value: contact.email,
      href: `mailto:${contact.email}`,
    },
    {
      icon: "phone",
      label: "Phone",
      value: contact.phone,
      href: `tel:${contact.phoneHref}`,
    },
    {
      icon: "github",
      label: "GitHub",
      value: "@" + contact.socials.github.split("/").pop(),
      href: contact.socials.github,
    },
    {
      icon: "linkedin",
      label: "LinkedIn",
      value: "in/" + contact.socials.linkedin.split("/").pop(),
      href: contact.socials.linkedin,
    },
  ];

  return (
    <section
      id="contact"
      ref={ref}
      className="relative overflow-hidden py-12 px-6"
    >
      <div className="pointer-events-none absolute left-1/2 bottom-0 h-[50vw] w-[50vw] -translate-x-1/2 translate-y-1/3 rounded-full bg-violet/15 blur-[140px]" />

      <motion.div
        style={{ y }}
        className="relative mx-auto max-w-5xl text-center"
      >
        <motion.span
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="font-mono text-xs uppercase tracking-[0.3em] text-cyan"
        >
          05 — Contact
        </motion.span>

        <h2 className="mx-auto mt-6 max-w-3xl font-display text-5xl font-extrabold leading-[1.05] tracking-tight md:text-7xl">
          {contact.heading}
        </h2>
        <p className="mx-auto mt-6 max-w-xl text-lg text-mist">
          {contact.subheading}
        </p>

        <Magnetic strength={0.4}>
          <a
            href={`mailto:${contact.email}`}
            data-cursor="link"
            className="group mt-10 inline-flex items-center gap-3 rounded-full bg-ghost px-9 py-5 font-medium text-ink"
          >
            <span className="text-lg">Start a conversation</span>
            <span className="transition-transform group-hover:translate-x-1">
              →
            </span>
          </a>
        </Magnetic>

        <div className="mx-auto mt-20 max-w-2xl text-left">
          {rows.map((r) => (
            <ContactRow key={r.label} {...r} />
          ))}
          <div className="border-t border-white/8" />
        </div>
      </motion.div>

      <footer className="relative mx-auto mt-28 max-w-7xl border-t border-white/8 pt-8">
        <div className="flex flex-col items-center justify-between gap-4 text-sm text-mist md:flex-row">
          <span>
            © {new Date().getFullYear()} {meta.name}. Designed & built with
            care.
          </span>
          <span className="font-mono text-xs">
            {meta.location} ·{" "}
            {meta.available ? "Available for work" : "Currently booked"}
          </span>
        </div>
      </footer>
    </section>
  );
}
