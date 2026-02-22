import { Button } from "@/components/ui/button";
import { Field, FieldDescription, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { HTTPMethod } from "@/lib/benchmark-types";

interface CommonSettingsProps {
  method: HTTPMethod;
  setMethod: (method: HTTPMethod) => void;
  duration: number;
  setDuration: (duration: number) => void;
  connections: number;
  setConnections: (connections: number) => void;
  headerName: string;
  setHeaderName: (name: string) => void;
  headerValue: string;
  setHeaderValue: (value: string) => void;
  isCustomizing?: boolean;
  onCustomize?: () => void;
  methodLabel?: string;
}

export function CommonSettings({
  method,
  setMethod,
  duration,
  setDuration,
  connections,
  setConnections,
  headerName,
  setHeaderName,
  headerValue,
  setHeaderValue,
  isCustomizing,
  onCustomize,
  methodLabel = "HTTP Method",
}: CommonSettingsProps) {
  return (
    <>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <Field>
          <div className="flex items-center justify-between">
            <FieldLabel>{methodLabel}</FieldLabel>
            {isCustomizing && onCustomize && (
              <Button
                variant="ghost"
                type="button"
                size="sm"
                onClick={onCustomize}
                className="font-medium text-[10px] text-primary hover:underline"
              >
                Customize Settings
              </Button>
            )}
          </div>
          <Select value={method} onValueChange={(val: any) => setMethod(val)}>
            <SelectTrigger className="h-11">
              <SelectValue placeholder="Select method" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="GET">GET</SelectItem>
              <SelectItem value="POST">POST</SelectItem>
              <SelectItem value="PUT">PUT</SelectItem>
              <SelectItem value="PATCH">PATCH</SelectItem>
              <SelectItem value="DELETE">DELETE</SelectItem>
            </SelectContent>
          </Select>
        </Field>

        <Field>
          <FieldLabel>Duration (seconds)</FieldLabel>
          <Input
            type="number"
            min={1}
            max={290}
            value={duration}
            onChange={(e) => setDuration(parseInt(e.target.value, 10))}
            className="h-11"
          />
          <FieldDescription>Max 290s for serverless stability.</FieldDescription>
        </Field>

        <Field>
          <FieldLabel>Connections</FieldLabel>
          <Input
            type="number"
            min={1}
            max={100}
            value={connections}
            onChange={(e) => setConnections(parseInt(e.target.value, 10))}
            className="h-11"
          />
          <FieldDescription>Concurrent requests (max 100).</FieldDescription>
        </Field>
      </div>

      <div className="grid grid-cols-1 gap-6 border-t pt-4 md:grid-cols-2">
        <Field>
          <FieldLabel>Header Name (Optional)</FieldLabel>
          <Input
            value={headerName}
            onChange={(e) => setHeaderName(e.target.value)}
            placeholder="e.g. Authorization"
            className="h-11"
          />
        </Field>
        <Field>
          <FieldLabel>Header Value (Optional)</FieldLabel>
          <Input
            value={headerValue}
            onChange={(e) => setHeaderValue(e.target.value)}
            placeholder="e.g. Bearer your-token"
            className="h-11"
          />
        </Field>
      </div>
    </>
  );
}
