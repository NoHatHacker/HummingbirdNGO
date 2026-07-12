import Hero from "../components/Hero";
import ImpactCarousel from "../components/ImpactCarousel";
import Stats from "../components/Stats";
import Philosophy from "../components/Philosophy";
import GlobalPresence from "../components/GlobalPresence";
import ConnectSection from "../components/ConnectSection";

function Home() {
  return (
    <div className="page-wrapper">
      <Hero />
      <Stats />
      <Philosophy />
      <GlobalPresence />
      <ConnectSection />
    </div>
  );
}

export default Home;
