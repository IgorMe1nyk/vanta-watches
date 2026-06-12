import Hero from "@/components/home/Hero";
import CollectionsStrip from "@/components/home/CollectionsStrip";
import MovementSection from "@/components/home/MovementSection";
import HeritageSection from "@/components/home/HeritageSection";
import FeaturedWatches from "@/components/home/FeaturedWatches";
import Newsletter from "@/components/home/Newsletter";

export default function Home() {
  return (
    <>
      <Hero />
      <CollectionsStrip />
      <MovementSection />
      <HeritageSection />
      <FeaturedWatches />
      <Newsletter />
    </>
  );
}
