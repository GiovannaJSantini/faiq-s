import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { ClassificationBadge } from "@/components/ui/classification-badge";
import { TrendingUp, Activity, Users, Award } from "lucide-react";
export function DashboardDemo() {
  // Dados demonstrativos baseados no sistema real
  const performanceData = [{
    name: 'Clínica A',
    score: 92,
    classification: 'excelencia'
  }, {
    name: 'Hospital B',
    score: 78,
    classification: 'qualidade'
  }, {
    name: 'Clínica C',
    score: 85,
    classification: 'qualidade'
  }, {
    name: 'Hospital D',
    score: 95,
    classification: 'excelencia'
  }, {
    name: 'Clínica E',
    score: 68,
    classification: 'padrao'
  }];
  const distributionData = [{
    name: 'Excelência',
    value: 40,
    color: 'hsl(155, 56%, 40%)'
  }, {
    name: 'Qualidade',
    value: 45,
    color: 'hsl(38, 100%, 48%)'
  }, {
    name: 'Padrão',
    value: 15,
    color: 'hsl(35, 32%, 65%)'
  }];
  const stats = [{
    title: "Clínicas Avaliadas",
    value: "150+",
    icon: Users,
    color: "text-primary"
  }, {
    title: "Avaliações Realizadas",
    value: "500+",
    icon: Activity,
    color: "text-accent"
  }, {
    title: "Índice Médio",
    value: "82.5%",
    icon: TrendingUp,
    color: "text-success"
  }, {
    title: "Certificações",
    value: "95%",
    icon: Award,
    color: "text-primary"
  }];
  return <section id="indicadores" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Indicadores de Qualidade
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Visualize em tempo real os resultados das avaliações e acompanhe 
            o progresso das instituições através de nosso dashboard interativo.
          </p>
        </div>

        {/* Cards de Estatísticas */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          {stats.map((stat, index) => <Card key={index} className="institutional-card">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </CardTitle>
                <stat.icon className={`h-4 w-4 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-foreground">{stat.value}</div>
              </CardContent>
            </Card>)}
        </div>

        {/* Gráficos */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          

          
        </div>

        {/* Classificações */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="institutional-card text-center">
            <div className="mb-4">
              <ClassificationBadge classification="excelencia" className="text-lg px-4 py-2" />
            </div>
            <h3 className="text-xl font-bold text-foreground mb-2">Excelência</h3>
            <p className="text-muted-foreground mb-4">
              Pontuação acima de 90%. Instituições que superam os padrões de qualidade.
            </p>
            <div className="text-3xl font-bold text-excellence">40%</div>
            <p className="text-sm text-muted-foreground">das instituições avaliadas</p>
          </div>
          
          <div className="institutional-card text-center">
            <div className="mb-4">
              <ClassificationBadge classification="qualidade" className="text-lg px-4 py-2" />
            </div>
            <h3 className="text-xl font-bold text-foreground mb-2">Qualidade</h3>
            <p className="text-muted-foreground mb-4">
              Pontuação entre 70-89%. Instituições com bom nível de qualidade.
            </p>
            <div className="text-3xl font-bold text-quality">45%</div>
            <p className="text-sm text-muted-foreground">das instituições avaliadas</p>
          </div>
          
          <div className="institutional-card text-center">
            <div className="mb-4">
              <ClassificationBadge classification="padrao" className="text-lg px-4 py-2" />
            </div>
            <h3 className="text-xl font-bold text-foreground mb-2">Padrão</h3>
            <p className="text-muted-foreground mb-4">
              Pontuação abaixo de 70%. Instituições que precisam de melhorias.
            </p>
            <div className="text-3xl font-bold text-standard">15%</div>
            <p className="text-sm text-muted-foreground">das instituições avaliadas</p>
          </div>
        </div>
      </div>
    </section>;
}