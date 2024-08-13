import Footer from "@/templates/footer";
import AboutBait from "./section/about";
import AcademyHook from "./section/academy";
import HeroSection from "./section/hero";
import UserHook from "./section/hook";
import Partnership from "./section/partners";
import OtherInitiatives from "./section/projects";

export default function Home() {
  return (
    <main className="">
      <HeroSection />
      <UserHook />
      <AboutBait />
      <AcademyHook />
      <OtherInitiatives />
      <Partnership />
    </main>
  );
}
