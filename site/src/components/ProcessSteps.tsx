import { Icon } from "./Icon";

export function ProcessSteps({
  steps,
}: {
  steps: Array<{ title: string; caption: string; icon: string }>;
}) {
  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
      {steps.map((step, i) => (
        <div key={step.title} className="grid gap-2">
          <div className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-navy-800 text-[13px] font-extrabold text-white">
              {i + 1}
            </span>
            <Icon name={step.icon} size={18} className="text-blue-500" />
          </div>
          <p className="m-0 text-[16px] font-bold text-navy-800">{step.title}</p>
          <p className="m-0 text-[13px] text-grey-500">{step.caption}</p>
        </div>
      ))}
    </div>
  );
}
