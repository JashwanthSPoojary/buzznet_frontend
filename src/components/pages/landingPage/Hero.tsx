import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="flex flex-col items-center justify-center min-h-[90vh] px-6 text-center">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-serif tracking-wide max-w-5xl leading-tight"
      >
        <span className="text-foreground">welcome to</span>
        <br />
        <span className="text-foreground">a </span>
        <span className="text-secondary-foreground italic">BuzzNet</span>
        <span className="text-foreground"> Social</span>
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="mt-8 text-foreground/80 max-w-2xl text-lg md:text-xl lg:text-2xl"
      >
        Real-time communication platform made for collaboration.  
        <br />
        Social media built for seamless team communication.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="flex flex-col sm:flex-row gap-6 mt-12"
      >
        <Link to="/signin">
          <Button className="cursor-pointer px-8 py-6 text-lg md:text-xl rounded-lg">
            Get Started
          </Button>
        </Link>
      </motion.div>
    </section>
  );
}
