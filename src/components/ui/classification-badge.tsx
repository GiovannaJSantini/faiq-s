import { cn } from "@/lib/utils";

interface ClassificationBadgeProps {
  classification: 'excelencia' | 'qualidade' | 'padrao';
  className?: string;
}

const classificationConfig = {
  excelencia: {
    label: 'Excelência',
    className: 'bg-excellence-light text-excellence border border-excellence/20 shadow-soft'
  },
  qualidade: {
    label: 'Qualidade',
    className: 'bg-quality-light text-quality border border-quality/20 shadow-soft'
  },
  padrao: {
    label: 'Padrão',
    className: 'bg-standard-light text-standard border border-standard/20 shadow-soft'
  }
};

export function ClassificationBadge({ classification, className }: ClassificationBadgeProps) {
  const config = classificationConfig[classification];
  
  return (
    <span
      className={cn(
        "inline-flex items-center px-3 py-1 rounded-md text-sm font-medium transition-all duration-150",
        config.className,
        className
      )}
    >
      {config.label}
    </span>
  );
}