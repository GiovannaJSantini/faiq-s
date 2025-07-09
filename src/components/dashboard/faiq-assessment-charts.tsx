
import { useState } from "react";
import { AssessmentLevelsChart } from "./assessment-levels-chart";
import { Button } from "@/components/ui/button";
import { faiqAreas, sampleAssessments } from "@/data/faiqData";

export function FaiqAssessmentCharts() {
  const [selectedAreaIndex, setSelectedAreaIndex] = useState(0);

  // Get the selected area data
  const selectedArea = faiqAreas[selectedAreaIndex];
  
  // Extract category names and count indicators per category
  const categoryNames = selectedArea.categories.map(cat => cat.name);
  const indicatorsPerCategory = Math.max(...selectedArea.categories.map(cat => cat.indicators.length));

  // Get the most recent assessment for demonstration
  const latestAssessment = sampleAssessments[0]; // Using the first sample assessment

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-foreground mb-2">
          Avaliação FAIQ-S por Níveis de Qualidade
        </h2>
        <p className="text-muted-foreground">
          Estrutura de avaliação organizada em três níveis: Padrão, Qualidade e Excelência
        </p>
      </div>

      {/* Area selection buttons */}
      <div className="flex flex-wrap gap-2 justify-center mb-6">
        {faiqAreas.map((area, index) => (
          <Button
            key={area.id}
            variant={selectedAreaIndex === index ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedAreaIndex(index)}
            className="text-xs"
          >
            {area.name}
          </Button>
        ))}
      </div>
      
      {/* Display the selected area chart */}
      <AssessmentLevelsChart
        title={selectedArea.name}
        categories={categoryNames}
        indicatorsPerCategory={indicatorsPerCategory}
        areaData={selectedArea}
        assessmentData={latestAssessment}
      />
      
      {/* Legend for scoring */}
      <div className="flex justify-center space-x-6 mt-4">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 rounded-full bg-green-500" />
          <span className="text-sm">Atende (1.0)</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 rounded-full bg-yellow-500" />
          <span className="text-sm">Parcial (0.5)</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 rounded-full bg-gray-200" />
          <span className="text-sm">Não Atende (0.0)</span>
        </div>
      </div>
    </div>
  );
}
