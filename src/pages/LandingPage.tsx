import Features from "@/components/pages/landingPage/Features";
import Footer from "@/components/pages/landingPage/Footer";
import Hero from "@/components/pages/landingPage/Hero";
import Navbar from "@/components/pages/landingPage/Navbar";

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      <Features />
      <Footer />
    </div>
  );
};

export default LandingPage;
