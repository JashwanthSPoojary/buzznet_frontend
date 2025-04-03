import { useState, useEffect } from "react"
import {  LogInIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [scrolled])


  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        scrolled 
          ? "bg-background/80 backdrop-blur-md" 
          : "bg-transparent"
      }`}
    >
      <div className="max-w-5xl mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-2 cursor-pointer">
          <div className="relative h-8 w-8 overflow-hidden rounded-full bg-gradient-to-br from-orange-400 to-red-600">
            <div className="absolute inset-1 rounded-full bg-background"></div>
            <div className="absolute inset-[5px] rounded-full border-2 border-orange-500"></div>
          </div>
          <span className="text-lg font-medium text-foreground">BuzzNet</span>
        </Link>

        <Link to="/" className="flex items-center gap-2 sm:gap-4">
          <Button className="cursor-pointer bg-primary text-primary-foreground hover:bg-primary/90 text-sm sm:text-base px-3 py-1 sm:px-4 sm:py-2">
            Home <LogInIcon className="ml-1 sm:ml-2 h-3 w-3 sm:h-4 sm:w-4" />
          </Button>
        </Link>
      </div>
    </header>
  )
}