export function StepProgress({ step, total, label }: { step: number; total: number; label: string }) {
  return (
    <div className="grid gap-2">
      <div className="flex items-center justify-between text-[13px]">
        <span className="font-bold text-navy-800">
          Étape {step} / {total}
        </span>
        <span className="text-grey-500">{label}</span>
      </div>
      <div className="flex gap-1.5">
        {Array.from({ length: total }).map((_, i) => (
          <span
            key={i}
            className={`h-1.5 flex-1 rounded-full ${i < step ? "bg-blue-500" : "bg-grey-200"}`}
          />
        ))}
      </div>
    </div>
  );
}
