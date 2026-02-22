import { TestForm } from "./_components/test-form";

export const metadata = {
  title: "Test",
  description: "Run tests on your API endpoints.",
};

export default function TestPage() {
  return (
    <div className="container mx-auto max-w-5xl px-4 py-10">
      <TestForm />
    </div>
  );
}
