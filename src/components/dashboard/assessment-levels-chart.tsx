
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface AssessmentLevelsChartProps {
  title: string;
  categories: string[];
  indicatorsPerCategory: number;
}

export function AssessmentLevelsChart({ title, categories, indicatorsPerCategory }: AssessmentLevelsChartProps) {
  const levels = [
    { name: 'Excelência', color: 'bg-blue-500', textColor: 'text-white', level: 3 },
    { name: 'Qualidade', color: 'bg-green-500', textColor: 'text-white', level: 2 },
    { name: 'Padrão', color: 'bg-orange-500', textColor: 'text-white', level: 1 }
  ];

  const renderGrid = (levelColor: string, levelName: string) => (
    <div className="grid grid-cols-12 gap-1 mb-4">
      {/* Header com nome do nível */}
      <div className={`${levelColor} text-white p-2 text-center font-semibold col-span-12 rounded-t`}>
        {levelName}
      </div>
      
      {/* Headers das categorias */}
      {categories.map((category, categoryIndex) => (
        <div key={categoryIndex} className="bg-gray-100 p-2 text-center font-medium text-sm border">
          {category}
        </div>
      ))}
      
      {/* Grid de indicadores */}
      {Array.from({ length: indicatorsPerCategory }, (_, rowIndex) => (
        categories.map((_, categoryIndex) => {
          const indicatorNumber = (categoryIndex * indicatorsPerCategory) + rowIndex + 1;
          return (
            <div key={`${categoryIndex}-${rowIndex}`} className="border border-gray-300 h-12 flex items-center justify-center bg-white hover:bg-gray-50 transition-colors">
              <span className="text-xs text-gray-500">{indicatorNumber}</span>
            </div>
          );
        })
      ))}
      
      {/* Círculos de marcação abaixo de cada categoria */}
      {categories.map((_, categoryIndex) => (
        <div key={`circles-${categoryIndex}`} className="flex justify-center items-center space-x-1 py-2">
          {Array.from({ length: 5 }, (_, circleIndex) => (
            <div 
              key={circleIndex} 
              className="w-3 h-3 border-2 border-gray-400 rounded-full bg-white hover:bg-gray-100 cursor-pointer transition-colors"
            />
          ))}
        </div>
      ))}
    </div>
  );

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-center">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {levels.map((level) => (
          <div key={level.level}>
            {renderGrid(level.color, level.name)}
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
