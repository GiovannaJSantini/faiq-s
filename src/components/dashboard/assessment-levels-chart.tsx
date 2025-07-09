
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Area, Assessment } from "@/types/faiq";

interface AssessmentLevelsChartProps {
  title: string;
  categories: string[];
  indicatorsPerCategory: number;
  areaData: Area;
  assessmentData?: Assessment;
}

export function AssessmentLevelsChart({ 
  title, 
  categories, 
  indicatorsPerCategory, 
  areaData, 
  assessmentData 
}: AssessmentLevelsChartProps) {
  const levels = [
    { name: 'Excelência', color: 'bg-blue-500', textColor: 'text-white', level: 3 },
    { name: 'Qualidade', color: 'bg-green-500', textColor: 'text-white', level: 2 },
    { name: 'Padrão', color: 'bg-orange-500', textColor: 'text-white', level: 1 }
  ];

  // Get assessment scores for this area
  const areaAssessment = assessmentData?.areaScores.find(area => area.areaId === areaData.id);

  const getIndicatorScore = (categoryIndex: number, indicatorIndex: number): number => {
    if (!areaAssessment) return 0;
    
    const category = areaData.categories[categoryIndex];
    const indicator = category?.indicators[indicatorIndex];
    if (!indicator) return 0;

    const categoryScore = areaAssessment.categoryScores.find(cat => cat.categoryId === category.id);
    const indicatorScore = categoryScore?.indicatorScores.find(ind => ind.indicatorId === indicator.id);
    
    return indicatorScore?.score || 0;
  };

  const getScoreColor = (score: number): string => {
    if (score === 1) return 'bg-green-500';
    if (score === 0.5) return 'bg-yellow-500';
    return 'bg-gray-200';
  };

  const renderGrid = (levelColor: string, levelName: string) => (
    <div className="grid gap-1 mb-6" style={{ gridTemplateColumns: `repeat(${categories.length}, 1fr)` }}>
      {/* Header com nome do nível */}
      <div className={`${levelColor} text-white p-3 text-center font-semibold rounded-t`} style={{ gridColumn: `1 / ${categories.length + 1}` }}>
        {levelName}
      </div>
      
      {/* Headers das categorias */}
      {categories.map((category, categoryIndex) => (
        <div key={categoryIndex} className="bg-gray-100 p-2 text-center font-medium text-xs border min-h-[60px] flex items-center justify-center">
          <span className="leading-tight">{category}</span>
        </div>
      ))}
      
      {/* Grid de indicadores com tooltips e pontuação */}
      <TooltipProvider>
        {Array.from({ length: indicatorsPerCategory }, (_, rowIndex) => (
          categories.map((_, categoryIndex) => {
            const category = areaData.categories[categoryIndex];
            const indicator = category?.indicators[rowIndex];
            const indicatorNumber = indicator ? `${category.name.split('.')[0]}.${rowIndex + 1}` : '';
            const score = getIndicatorScore(categoryIndex, rowIndex);
            
            return (
              <div key={`${categoryIndex}-${rowIndex}`} className="border border-gray-300 h-16 flex items-center justify-center bg-white hover:bg-gray-50 transition-colors relative">
                {indicator && (
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div className="cursor-help flex flex-col items-center justify-center w-full h-full">
                        <span className="text-xs text-gray-600 font-medium text-center px-1">
                          {indicatorNumber}
                        </span>
                        {assessmentData && (
                          <div className={`w-3 h-3 rounded-full mt-1 ${getScoreColor(score)}`} />
                        )}
                      </div>
                    </TooltipTrigger>
                    <TooltipContent className="max-w-xs">
                      <div className="space-y-2">
                        <p className="font-semibold">{indicator.name}</p>
                        <p className="text-sm">{indicator.description}</p>
                        {assessmentData && (
                          <p className="text-xs text-gray-600">
                            Pontuação: {score} / 1
                          </p>
                        )}
                      </div>
                    </TooltipContent>
                  </Tooltip>
                )}
              </div>
            );
          })
        ))}
      </TooltipProvider>
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
