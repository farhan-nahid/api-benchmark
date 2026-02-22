import { IconBolt, IconClock, IconPlus } from "@tabler/icons-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import type { TestResult } from "@/lib/run-autocannon";
import { ComparisonChart } from "./comparison-chart";

export function Analysis({ data }: { data: TestResult[] }) {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      <Card className="overflow-hidden shadow-md">
        <CardHeader className="bg-muted/30 pb-4">
          <div className="mb-2 flex w-fit items-center gap-2 rounded border bg-background px-2 py-1 font-bold text-primary text-xs">
            <IconClock className="h-3 w-3" />
            LATENCY (AVG)
          </div>
        </CardHeader>
        <CardContent className="pt-6">
          <ComparisonChart
            results={data}
            metric="avgLatency"
            title="Average Latency"
            unit="ms"
          />
        </CardContent>
      </Card>

      <Card className="overflow-hidden shadow-md">
        <CardHeader className="bg-muted/30 pb-4">
          <div className="mb-2 flex w-fit items-center gap-2 rounded border bg-background px-2 py-1 font-bold text-blue-500 text-xs">
            <IconBolt className="h-3 w-3" />
            THROUGHPUT (RPS)
          </div>
        </CardHeader>
        <CardContent className="pt-6">
          <ComparisonChart
            results={data}
            metric="rps"
            title="Requests Per Second"
            unit="req/s"
          />
        </CardContent>
      </Card>

      <Card className="overflow-hidden shadow-md">
        <CardHeader className="bg-muted/30 pb-4">
          <div className="mb-2 flex w-fit items-center gap-2 rounded border bg-background px-2 py-1 font-bold text-green-500 text-xs">
            <IconPlus className="h-3 w-3" />
            TOTAL REQUESTS
          </div>
        </CardHeader>
        <CardContent className="pt-6">
          <ComparisonChart
            results={data}
            metric="totalRequests"
            title="Total Requests Handled"
            unit="reqs"
          />
        </CardContent>
      </Card>
    </div>
  );
}
