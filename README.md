# ⚡ API Benchmark

Benchmark your APIs with confidence. A lightweight, serverless-ready, and stateless tool built with [Next.js 15+](https://nextjs.org/) and [Autocannon](https://github.com/mcollina/autocannon) to measure and compare API performance in real-time.

![Next.js](https://img.shields.io/badge/Next.js-15+-black?style=flat-square&logo=next.js)
![Bun](https://img.shields.io/badge/Bun-%23000000.svg?style=flat-square&logo=bun&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.0-38B2AC?style=flat-square&logo=tailwind-css)
![TypeScript](https://img.shields.io/badge/TypeScript-5.7-blue?style=flat-square&logo=typescript)

---

## ✨ Features

- 🚀 **Instant Execution**: Run load tests immediately from your browser using Bun's fast runtime.
- 📊 **Visual Analytics**: Beautiful, interactive charts for latency, throughput, and error rates using Recharts.
- 🔄 **Side-by-Side Comparison**: Compare up to 5 APIs sequentially to ensure accuracy and performance parity.
- 🔒 **Secure & Stateless**: Zero data persistence. Built-in SSRF protection blocks internal network requests.
- 📥 **Export Results**: Download your benchmark results as CSV for further analysis.
- 🎨 **Modern UI**: Sleek, responsive design built with Tailwind CSS 4 and Geist font.

---

## 🛠️ Tech Stack

- **Framework**: [Next.js 16 (App Router)](https://nextjs.org/)
- **Runtime**: [Bun](https://bun.sh/)
- **Benchmarking Engine**: [Autocannon](https://github.com/mcollina/autocannon)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **Components**: [Base UI](https://base-ui.com/), [Shadcn UI](https://ui.shadcn.com/)
- **Charts**: [Recharts](https://recharts.org/)
- **Icons**: [Tabler Icons](https://tabler-icons.io/)
- **Validation**: [Zod](https://zod.dev/)

---

## 🚀 Getting Started

### Prerequisites

- [Bun](https://bun.sh/) installed on your machine.

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/api-benchmark.git
   cd api-benchmark
   ```

2. Install dependencies:
   ```bash
   bun install
   ```

3. Run the development server:
   ```bash
   bun dev
   ```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

---

## 📖 Usage

### Single API Test
1. Navigate to `/test`.
2. Enter your API endpoint URL.
3. Configure duration, connections, headers, and body (optional).
4. Click **Start Benchmarking**.

### Side-by-Side Comparison
1. Navigate to `/compare`.
2. Add up to 5 API endpoints.
3. Configure the common test parameters.
4. Click **Compare APIs** to run them sequentially.

---

## 🛡️ Security

This tool implements strict URL validation to prevent **Server-Side Request Forgery (SSRF)**.
- **Blocked**: Internal hostnames (`localhost`, `127.0.0.1`), private IP ranges, and cloud metadata endpoints.
- **Allowed**: Publicly accessible `http` and `https` URLs.

---

## 🛠️ Development

Available scripts:

- `bun dev`: Starts the development server.
- `bun build`: Builds the application for production.
- `bun start`: Starts the production server.
- `bun lint`: Runs ESLint.
- `bun format`: Formats code with Prettier.
- `bun typecheck`: Runs TypeScript type checking.

---

## 📄 License

This project is open-source and available under the MIT License.
