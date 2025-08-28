"use client"

import { motion } from "framer-motion"

interface AnimatedHamburgerProps {
  isOpen: boolean
  className?: string
}

export function AnimatedHamburger({ isOpen, className = "" }: AnimatedHamburgerProps) {
  return (
    <div className={`w-6 h-6 flex flex-col justify-center items-center ${className}`}>
      <motion.span
        className="block h-0.5 w-6 bg-current"
        animate={{
          rotate: isOpen ? 45 : 0,
          y: isOpen ? 0 : -4,
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        style={{ transformOrigin: "center" }}
      />
      <motion.span
        className="block h-0.5 w-6 bg-current mt-1"
        animate={{
          opacity: isOpen ? 0 : 1,
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      />
      <motion.span
        className="block h-0.5 w-6 bg-current mt-1"
        animate={{
          rotate: isOpen ? -45 : 0,
          y: isOpen ? -8 : 4,
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        style={{ transformOrigin: "center" }}
      />
    </div>
  )
}
