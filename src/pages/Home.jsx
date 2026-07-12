import UtilityBar from "../components/home/UtilityBar";
import PrimaryNav from "../components/home/PrimaryNav";
import HeroSplit from "../components/home/HeroSplit";
import CategoryStrip from "../components/home/CategoryStrip";
import PromoCards from "../components/home/PromoCards";

export default function Home() {
  return (
    <div className="min-h-screen bg-paper">
      <UtilityBar />
      <PrimaryNav />
      <HeroSplit />
      <CategoryStrip />
      <PromoCards />
    </div>
  );
}
