import { IconChartLine, IconClock, IconFlame, IconServer } from "@tabler/icons-react";
import React from "react";

export type HTTPMethod = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";

export interface BenchmarkPreset {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  connections: number;
  duration: number;
  color: string;
  bg: string;
}

export const BENCHMARK_PRESETS: BenchmarkPreset[] = [
  {
    id: "latency",
    name: "Latency Test",
    description: "Focus on response time stability",
    icon: React.createElement(IconClock, { className: "h-5 w-5" }),
    connections: 5,
    duration: 10,
    color: "text-blue-500",
    bg: "bg-blue-500/10",
  },
  {
    id: "load",
    name: "Load Test",
    description: "Standard heavy traffic simulation",
    icon: React.createElement(IconServer, { className: "h-5 w-5" }),
    connections: 25,
    duration: 30,
    color: "text-green-500",
    bg: "bg-green-500/10",
  },
  {
    id: "stress",
    name: "Stress Test",
    description: "Pushing the system to its breaking point",
    icon: React.createElement(IconFlame, { className: "h-5 w-5" }),
    connections: 50,
    duration: 60,
    color: "text-orange-500",
    bg: "bg-orange-500/10",
  },
  {
    id: "capacity",
    name: "Capacity Test",
    description: "Find maximum throughput peak",
    icon: React.createElement(IconChartLine, { className: "h-5 w-5" }),
    connections: 40,
    duration: 45,
    color: "text-purple-500",
    bg: "bg-purple-500/10",
  },
];
