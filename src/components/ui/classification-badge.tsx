import { cn } from "@/lib/utils";

interface ClassificationBadgeProps {
  classification: 'excelencia' | 'qualidade' | 'padrao';
  className?: string;
}

const classificationConfig = {
  excelencia: {
    label: 'Excelência',
    className: 'bg-excellence text-excellence-foreground border-excellence/20'
  },
  qualidade: {
    label: 'Qualidade',
    className: 'bg-quality text-quality-foreground border-quality/20'
  },
  padrao: {
    label: 'Padrão',
    className: 'bg-standard text-standard-foreground border-standard/20'
  }
};

export function ClassificationBadge({ classification, className }: ClassificationBadgeProps) {
  const config = classificationConfig[classification];
  
  return (
    <span
      className={cn(
        "inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border transition-colors",
        config.className,
        className
      )}
    >
      {config.label}
    </span>
  );
}