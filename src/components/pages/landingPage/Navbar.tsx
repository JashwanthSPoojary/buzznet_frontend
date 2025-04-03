import { useState, useEffect } from "react"
import { Moon, Sun, LogInIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Link, useNavigate } from "react-router-dom"
import { useTheme } from "@/hooks/useTheme"

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const { theme, setTheme } = useTheme();
  const navigate = useNavigate();
  
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

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light")
  }

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

        <div className="flex items-center gap-2 sm:gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            className="text-foreground hover:bg-muted cursor-pointer"
          >
            {theme === "light" ? (
              <Moon className="h-5 w-5" />
            ) : (
              <Sun className="h-5 w-5" />
            )}
            <span className="sr-only">Toggle theme</span>
          </Button>

          <Button onClick={()=>navigate('/signin')} className="cursor-pointer bg-primary text-primary-foreground hover:bg-primary/90 text-sm sm:text-base px-3 py-1 sm:px-4 sm:py-2">
            SignIn <LogInIcon className="ml-1 sm:ml-2 h-3 w-3 sm:h-4 sm:w-4" />
          </Button>
        </div>
      </div>
    </header>
  )
}