import { TestResult } from './run-autocannon';

export function exportToCSV(results: TestResult | TestResult[]) {
  const data = Array.isArray(results) ? results : [results];

  const headers = [
    'API URL',
    'Duration (s)',
    'Connections',
    'Avg Requests/sec',
    'Total Requests',
    'Avg Latency (ms)',
    'Min Latency (ms)',
    'Max Latency (ms)',
    'P50 Latency (ms)',
    'P99 Latency (ms)',
    'Avg Throughput (MB/s)',
    'Errors',
    'Timeouts',
    'Non-2xx Responses'
  ];

  const rows = data.map(res => [
    res.url,
    res.duration,
    res.connections,
    res.requests.average.toFixed(2),
    res.requests.total,
    res.latency.average.toFixed(2),
    res.latency.min,
    res.latency.max,
    res.latency.p50,
    res.latency.p99,
    (res.throughput.average / 1024 / 1024).toFixed(2),
    res.errors,
    res.timeouts,
    res.non2xx
  ]);

  const csvContent = [
    headers.join(','),
    ...rows.map(row => row.join(','))
  ].join('\n');

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', `benchmark_results_${new Date().toISOString()}.csv`);
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
