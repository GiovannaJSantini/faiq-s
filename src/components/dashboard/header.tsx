
import { Activity, BarChart3, Users, Grid2X2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export function DashboardHeader() {
  const navigate = useNavigate();

  return (
    <div className="bg-gradient-primary text-white p-6 shadow-medium">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tight">
              FAIQ-S
            </h1>
            <p className="text-primary-glow text-lg">
              Ferramenta de Sistema Avaliação de Indicadores de Qualidade
            </p>
          </div>
          
          <div className="flex items-center gap-4">
            <Button 
              variant="secondary" 
              size="sm" 
              className="bg-white/10 text-white border-white/20 hover:bg-white/20"
              onClick={() => navigate('/avaliacao')}
            >
              <Activity className="w-4 h-4 mr-2" />
              Nova Avaliação
            </Button>
            <Button 
              variant="secondary" 
              size="sm" 
              className="bg-white/10 text-white border-white/20 hover:bg-white/20"
              onClick={() => navigate('/clinicas')}
            >
              <Users className="w-4 h-4 mr-2" />
              Gerenciar Clínicas
            </Button>
            <Button 
              variant="secondary" 
              size="sm" 
              className="bg-white/10 text-white border-white/20 hover:bg-white/20"
              onClick={() => navigate('/graficos-niveis')}
            >
              <Grid2X2 className="w-4 h-4 mr-2" />
              Gráficos de Níveis
            </Button>
            <Button 
              variant="secondary" 
              size="sm" 
              className="bg-white/10 text-white border-white/20 hover:bg-white/20"
              onClick={() => navigate('/relatorios')}
            >
              <BarChart3 className="w-4 h-4 mr-2" />
              Relatórios
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
