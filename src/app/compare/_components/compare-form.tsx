"use client";

import {
  IconAlertCircle,
  IconPlayerPlay,
  IconPlus,
  IconRotate,
  IconTrash,
} from "@tabler/icons-react";
import { useState } from "react";
import { BenchmarkHeader } from "@/components/benchmark-header";
import { CommonSettings } from "@/components/common-settings";
import { PresetSelector } from "@/components/preset-selector";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { compareTestsAction } from "@/lib/actions";
import { BENCHMARK_PRESETS, type HTTPMethod } from "@/lib/benchmark-types";
import { COLORS } from "@/lib/constants";
import { exportToCSV } from "@/lib/export";
import type { TestResult } from "@/lib/run-autocannon";
import { Analysis } from "./analysis";
import { ComparisonTable } from "./comparison-table";

export function CompareForm() {
  const [urls, setUrls] = useState([
    "https://jsonplaceholder.typicode.com/posts/1",
    "https://jsonplaceholder.typicode.com/todos/1",
  ]);
  const [method, setMethod] = useState<HTTPMethod>("GET");
  const [duration, setDuration] = useState(5);
  const [connections, setConnections] = useState(10);
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<TestResult[] | null>(null);
  const [testType, setTestType] = useState("custom");
  const [error, setError] = useState<string | null>(null);
  const [timeLeft, setTimeLeft] = useState<number | null>(null);
  const [headerName, setHeaderName] = useState("");
  const [headerValue, setHeaderValue] = useState("");

  const applyTestType = (typeId: string) => {
    setTestType(typeId);
    const type = BENCHMARK_PRESETS.find((t) => t.id === typeId);
    if (type) {
      setConnections(type.connections);
      setDuration(type.duration);
    }
  };

  const addUrl = () => {
    if (urls.length < 5) setUrls([...urls, ""]);
  };

  const removeUrl = (index: number) => {
    if (urls.length > 2) {
      const newUrls = [...urls];
      newUrls.splice(index, 1);
      setUrls(newUrls);
    }
  };

  const updateUrl = (index: number, value: string) => {
    const newUrls = [...urls];
    newUrls[index] = value;
    setUrls(newUrls);
  };

  const handleRunCompare = async () => {
    setLoading(true);
    setError(null);
    setResults(null);
    setTimeLeft(duration);

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev && prev > 0) return prev - 1;
        clearInterval(interval);
        return null;
      });
    }, 1000);

    try {
      const headers =
        headerName && headerValue ? { [headerName]: headerValue } : undefined;
      const data = await compareTestsAction(urls, {
        method,
        duration,
        connections,
        headers,
      });
      setResults(data.apis);
    } catch (err: any) {
      setError(err.message);
    } finally {
      clearInterval(interval);
      setLoading(false);
      setTimeLeft(null);
    }
  };

  return (
    <div className="space-y-10">
      <BenchmarkHeader
        title="Compare APIs"
        description="Measure up to 5 APIs side-by-side with identical settings."
        onExport={() => results && exportToCSV(results)}
        onReset={() => {
          setResults(null);
          setTestType("custom");
        }}
        isExportDisabled={!results}
      />

      {!results ? (
        <Card className="border-2 shadow-xl">
          <CardHeader>
            <CardTitle>Comparison Settings</CardTitle>
            <CardDescription>
              Enter the URLs and configuration for your benchmark comparison.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-8">
            <PresetSelector selectedTypeId={testType} onSelect={applyTestType} />

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-muted-foreground text-sm uppercase tracking-wider">
                  Endpoints
                </h3>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={addUrl}
                  disabled={urls.length >= 5}
                  className="text-primary hover:bg-primary/5 hover:text-primary"
                >
                  <IconPlus className="mr-1 h-4 w-4" />
                  Add API
                </Button>
              </div>
              <div className="space-y-3">
                {urls.map((url, index) => (
                  <div key={index} className="flex gap-2">
                    <div
                      className={`flex flex-1 items-center overflow-hidden rounded-md border border-l-4 bg-muted/20 focus-within:ring-1 focus-within:ring-primary ${COLORS[index]}`}
                    >
                      <div className="flex h-full items-center border-r bg-muted/30 px-3 font-bold text-muted-foreground text-xs">
                        #{index + 1}
                      </div>
                      <Input
                        value={url}
                        onChange={(e) => updateUrl(index, e.target.value)}
                        placeholder="https://api.example.com/endpoint"
                        className="h-10 border-0 bg-transparent shadow-none focus-visible:ring-0"
                      />
                    </div>
                    {urls.length > 2 && (
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeUrl(index)}
                        className="text-muted-foreground hover:text-destructive"
                      >
                        <IconTrash className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <CommonSettings
              method={method}
              setMethod={setMethod}
              duration={duration}
              setDuration={setDuration}
              connections={connections}
              setConnections={setConnections}
              headerName={headerName}
              setHeaderName={setHeaderName}
              headerValue={headerValue}
              setHeaderValue={setHeaderValue}
              isCustomizing={testType !== "custom"}
              onCustomize={() => setTestType("custom")}
              methodLabel="Shared Method"
            />

            {error && (
              <div className="flex items-center gap-2 rounded-lg border border-destructive/20 bg-destructive/10 p-4 text-destructive text-sm">
                <IconAlertCircle className="h-5 w-5 shrink-0" />
                <p>{error}</p>
              </div>
            )}

            {loading && timeLeft !== null && (
              <p className="mb-2 text-muted-foreground text-sm">
                Time remaining: <span className="font-bold">{timeLeft}s</span>
              </p>
            )}

            <Button
              onClick={handleRunCompare}
              disabled={loading}
              className="h-12 w-full font-bold text-base shadow-lg"
            >
              {loading ? (
                <div className="flex items-center gap-2">
                  <IconRotate className="h-4 w-4 animate-spin" />
                  Running Sequential Tests...
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <IconPlayerPlay className="h-4 w-4 fill-current" />
                  Start Comparison
                </div>
              )}
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="fade-in animate-in space-y-10 duration-500">
          <Analysis data={results} />
          <ComparisonTable data={results} />
        </div>
      )}
    </div>
  );
}
