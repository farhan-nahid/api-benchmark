import { IconDownload, IconRotate } from "@tabler/icons-react";
import { Button } from "@/components/ui/button";

interface BenchmarkHeaderProps {
  title: string;
  description: string;
  onExport: () => void;
  onReset: () => void;
  isExportDisabled: boolean;
}

export function BenchmarkHeader({
  title,
  description,
  onExport,
  onReset,
  isExportDisabled,
}: BenchmarkHeaderProps) {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="font-bold text-3xl tracking-tight">{title}</h1>
        <p className="mt-1 text-lg text-muted-foreground">{description}</p>
      </div>
      <div className="flex items-center gap-3">
        <Button
          variant="outline"
          onClick={onExport}
          className="flex items-center gap-2"
          disabled={isExportDisabled}
        >
          <IconDownload className="h-4 w-4" />
          Export CSV
        </Button>
        <Button variant="outline" onClick={onReset} className="flex items-center gap-2">
          <IconRotate className="h-4 w-4" />
          Reset
        </Button>
      </div>
    </div>
  );
}
