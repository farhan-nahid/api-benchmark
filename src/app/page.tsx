import { Comparison } from "./_components/comparison";
import { Cta } from "./_components/cta";
import { Features } from "./_components/features";
import { Hero } from "./_components/hero";
import { HowItWorks } from "./_components/how-it-works";
import { TechnicalDetail } from "./_components/technical-detail";
import { UseCases } from "./_components/use-cases";

export default function LandingPage() {
  return (
    <main className="flex flex-col items-center">
      <Hero />
      <HowItWorks />
      <Features />
      <Comparison />
      <UseCases />
      <TechnicalDetail />
      <Cta />
    </main>
  );
}
