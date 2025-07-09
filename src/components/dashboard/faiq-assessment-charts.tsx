
import { useState } from "react";
import { AssessmentLevelsChart } from "./assessment-levels-chart";
import { Button } from "@/components/ui/button";
import { faiqAreas } from "@/data/faiqData";

export function FaiqAssessmentCharts() {
  const [selectedAreaIndex, setSelectedAreaIndex] = useState(0);

  // Get the selected area data
  const selectedArea = faiqAreas[selectedAreaIndex];
  
  // Extract category names and count indicators per category
  const categoryNames = selectedArea.categories.map(cat => cat.name);
  const indicatorsPerCategory = Math.max(...selectedArea.categories.map(cat => cat.indicators.length));

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
      />
    </div>
  );
}
