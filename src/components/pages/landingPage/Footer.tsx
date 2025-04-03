import {
  ArrowRight,
  Github,
  Twitter,
  CodeIcon,
  Linkedin,
} from "lucide-react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="w-full bg-foreground text-primary-foreground py-12 px-4 md:px-8 lg:px-12 relative overflow-hidden">
      <div className="container mx-auto max-w-7xl relative z-10">
        {/* Main content */}
        <div className="mb-12">
          <h2 className="text-4xl md:text-5xl font-serif mb-4">BuzzNet Social</h2>
          <p className="text-base md:text-lg max-w-xl mb-8">
            Community driven social media platform made for the collaboration , professional works and team building . 
          </p>

          <Link
            to="/"
            className="inline-flex items-center gap-2 bg-background text-primary hover:bg-background/90 px-6 py-3 rounded-md transition-colors"
          >
            SignIn <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {/* Social and footer info */}
        <div className="flex flex-col md:flex-row justify-between gap-8">
          <div>
            <h3 className="font-medium text-lg mb-4">Follow Us</h3>
            <div className="flex gap-4">
              <Link to="https://github.com/JashwanthSPoojary" target="_blank" aria-label="GitHub">
                <Github className="h-5 w-5" />
              </Link>
              <Link to="https://x.com/JashwantPoojary" target="_blank" aria-label="Twitter">
                <Twitter className="h-5 w-5" />
              </Link>
              <Link to="https://jashwanth.me" target="_blank" aria-label="portfolio">
                <CodeIcon className="h-5 w-5" />
              </Link>
              <Link to="https://www.linkedin.com/in/jashwanth-s-poojary/" target="_blank" aria-label="portfolio">
                <Linkedin className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>

        {/* Made with love */}
        <div className="mt-12 pt-6 border-t border-black/10">
          <p className="text-sm">
            Made with <span className="text-red-500">❤️</span> by the Jashwanth S Poojary
          </p>
        </div>
      </div>
      <div className="absolute right-0 bottom-0 w-48 h-48 pointer-events-none">
        <svg
          viewBox="0 0 200 200"
          className="w-full h-full"
          style={{ transform: "rotate(90deg)" }}
        >
          <path
            d="M100,100 C100,55 55,100 0,100 C55,100 100,145 100,200 C100,145 145,100 200,100 C145,100 100,55 100,0"
            fillOpacity="0.1"
            className="bg-foreground"
          />
        </svg>
      </div>
    </footer>
  );
}
