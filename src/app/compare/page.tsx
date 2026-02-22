import { CompareForm } from "./_components/compare-form";

export const metadata = {
  title: "Compare",
  description: "Compare two APIs side by side.",
};

export default function ComparePage() {
  return (
    <div className="container mx-auto max-w-6xl px-4 py-10">
      <CompareForm />
    </div>
  );
}
