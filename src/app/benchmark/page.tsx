import { BenchmarkForm } from "./_components/benchmark-form";

export const metadata = {
  title: "Benchmark",
  description: "Run benchmarks on your API endpoints.",
};

export default function BenchmarkPage() {
  return (
    <div className="container mx-auto max-w-5xl px-4 py-10">
      <BenchmarkForm />
    </div>
  );
}
