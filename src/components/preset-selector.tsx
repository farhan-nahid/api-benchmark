import { BENCHMARK_PRESETS } from "@/lib/benchmark-types";

interface PresetSelectorProps {
  selectedTypeId: string;
  onSelect: (typeId: string) => void;
}

export function PresetSelector({ selectedTypeId, onSelect }: PresetSelectorProps) {
  return (
    <div className="space-y-4">
      <h3 className="font-semibold text-muted-foreground text-sm uppercase tracking-wider">
        Quick Presets
      </h3>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4">
        {BENCHMARK_PRESETS.map((type) => (
          <button
            key={type.id}
            type="button"
            onClick={() => onSelect(type.id)}
            className={`group flex flex-col rounded-xl border-2 p-4 text-left transition-all ${
              selectedTypeId === type.id
                ? `border-primary shadow-md ${type.bg}`
                : "border-muted bg-background hover:border-primary/50"
            }`}
          >
            <div
              className={`mb-3 w-fit rounded-lg p-2 transition-colors ${
                selectedTypeId === type.id
                  ? "bg-primary text-primary-foreground"
                  : `${type.bg} ${type.color}`
              }`}
            >
              {type.icon}
            </div>
            <div className="font-bold text-sm tracking-tight">{type.name}</div>
            <div className="mt-1 line-clamp-1 text-[10px] text-muted-foreground">
              {type.description}
            </div>
            <div className="mt-3 flex items-center gap-3">
              <div className="rounded bg-muted px-1.5 py-0.5 font-mono text-[9px]">
                {type.connections} conn
              </div>
              <div className="rounded bg-muted px-1.5 py-0.5 font-mono text-[9px]">
                {type.duration}s
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
