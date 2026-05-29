import { Card, CardContent, CardTitle } from "@/components/ui/card";

interface BenchmarkTerminalProps {
  title: string;
  lines: string[];
  isRunning?: boolean;
  embedded?: boolean;
}

export function BenchmarkTerminal({
  title,
  lines,
  isRunning,
  embedded,
}: BenchmarkTerminalProps) {
  const content = (
    <>
      <div className="flex items-center justify-between gap-4 border-b bg-background/70 px-4 py-3">
        <CardTitle className="text-base">{title}</CardTitle>
        <div className="flex items-center gap-2 text-muted-foreground text-xs">
          <span
            className={
              isRunning
                ? "h-2 w-2 rounded-full bg-emerald-500"
                : "h-2 w-2 rounded-full bg-muted-foreground/40"
            }
          />
          {isRunning ? "STREAMING" : "IDLE"}
        </div>
      </div>
      <pre
        className={[
          "max-h-72",
          "overflow-auto",
          "px-4",
          "py-3",
          "font-mono",
          "text-[11px]",
          "leading-5",
          "text-foreground/90",
          "whitespace-pre-wrap",
        ].join(" ")}
      >
        {lines.length > 0 ? lines.join("\n") : "Waiting for benchmark output..."}
      </pre>
    </>
  );

  if (embedded) {
    return (
      <div className="overflow-hidden rounded-lg border bg-muted/20 shadow-md">
        {content}
      </div>
    );
  }

  return (
    <Card className="border-border/70 bg-muted/20 shadow-md">
      <CardContent className="p-0">{content}</CardContent>
    </Card>
  );
}
