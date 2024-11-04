"use client";

import { cn } from "@/utils/cn";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
} from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import styles from "./floatingNavbar.module.css";

type NavbarItem = {
  link: string;
  name: string;
};

type FloatingNavbarProps = {
  className?: string;
  navbarItems: NavbarItem[];
};

const FloatingNavbar = ({ navbarItems, className }: FloatingNavbarProps) => {
  const { scrollYProgress } = useScroll();
  const [visible, setVisible] = useState(true);

  // Provide from https://ui.aceternity.com/components/floating-navbar
  useMotionValueEvent(scrollYProgress, "change", (current) => {
    // Always display at the top or at the end of the page
    if (scrollYProgress.get() === 0 || current === 1) {
      setVisible(true);
    } else {
      // Determines displaying based on scroll direction
      setVisible(current! - scrollYProgress.getPrevious()! < 0);
    }
  });

  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{
          opacity: 1,
          y: 0,
        }}
        animate={{
          y: visible ? 0 : -100,
          opacity: visible ? 1 : 0,
        }}
        transition={{
          duration: 0.2,
        }}
        className={cn(
          "flex fixed inset-x-0 bg-white z-[5000] items-center justify-between pr-4 pl-4 py-1",
          className
        )}
      >
        <Link className={`hover:text-neutral-500 ${styles.link}`} href="/">
          Apolline Pellion
        </Link>
        <div className="flex gap-4">
          {navbarItems.map((navItem: NavbarItem, idx: number) => (
            <Link
              className={`relative items-center flex space-x-1 hover:text-neutral-500 ${styles.link}`}
              href={navItem.link}
              key={`link=${idx}`}
            >
              <span className="sm:block text-sm">{navItem.name}</span>
            </Link>
          ))}
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default FloatingNavbar;
