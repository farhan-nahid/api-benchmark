import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { COLORS } from "@/lib/constants";
import type { TestResult } from "@/lib/run-autocannon";

export function ComparisonTable({ data }: { data: TestResult[] }) {
  return (
    <Card className="overflow-hidden border-t-4 border-t-primary shadow-xl">
      <CardHeader className="bg-muted/10">
        <CardTitle>Detailed Comparison Table</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b bg-muted/20">
                <th className="px-4 py-3 text-left font-bold">API</th>
                <th className="px-4 py-3 text-right font-bold">Avg Latency</th>
                <th className="px-4 py-3 text-right font-bold">P90</th>
                <th className="px-4 py-3 text-right font-bold">P99</th>
                <th className="px-4 py-3 text-right font-bold">RPS</th>
                <th className="px-4 py-3 text-right font-bold">Status</th>
              </tr>
            </thead>
            <tbody>
              {data.map((res, index) => (
                <tr key={index} className="border-b transition-colors hover:bg-muted/10">
                  <td className="px-4 py-4">
                    <div className="flex flex-col">
                      <div className="flex items-center gap-2">
                        <div
                          className={`h-3 w-3 rounded-full ${COLORS[index].replace(
                            "border-",
                            "bg-",
                          )}`}
                        />
                        <span className="font-bold">API {index + 1}</span>
                      </div>
                      <span className="mt-1 max-w-50 truncate text-muted-foreground text-xs">
                        {res.url}
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-4 text-right font-mono">
                    {res.latency?.average?.toFixed(1)} ms
                  </td>
                  <td className="px-4 py-4 text-right font-mono">{res.latency.p90} ms</td>
                  <td className="px-4 py-4 text-right font-mono">{res.latency.p99} ms</td>
                  <td className="px-4 py-4 text-right font-mono">
                    {res.requests?.average?.toFixed(1)}
                  </td>
                  <td className="px-4 py-4 text-right">
                    <Badge
                      variant={res.non2xx > 0 ? "destructive" : "outline"}
                      className="h-5 px-1.5 text-[10px]"
                    >
                      {res.non2xx} errors
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}
