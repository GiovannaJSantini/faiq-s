export interface Indicator {
  id: string;
  code: string;
  name: string;
  description: string;
  weight: number;
  classification: 'padrao' | 'qualidade' | 'excelencia';
}

export interface Category {
  id: string;
  name: string;
  description: string;
  indicators: Indicator[];
}

export interface Area {
  id: string;
  name: string;
  description: string;
  categories: Category[];
}

export interface IndicatorScore {
  indicatorId: string;
  score: 0 | 0.5 | 1;
  notes?: string;
}

export interface CategoryScore {
  categoryId: string;
  indicatorScores: IndicatorScore[];
  totalScore: number;
  maxScore: number;
  percentage: number;
}

export interface AreaScore {
  areaId: string;
  categoryScores: CategoryScore[];
  totalScore: number;
  maxScore: number;
  percentage: number;
}

export interface Assessment {
  id: string;
  clinicId: string;
  clinicName: string;
  assessmentDate: Date;
  assessorName: string;
  areaScores: AreaScore[];
  totalScore: number;
  maxScore: number;
  overallPercentage: number;
  classification: 'excelencia' | 'qualidade' | 'padrao';
  status: 'em_andamento' | 'concluida' | 'revisao';
  createdAt: Date;
  updatedAt: Date;
}

export interface Clinic {
  id: string;
  name: string;
  location: string;
  type: string;
  assessments: Assessment[];
}

export type ScoreValue = 0 | 0.5 | 1;

export interface DashboardFilters {
  clinicIds?: string[];
  areaIds?: string[];
  categoryIds?: string[];
  classification?: ('excelencia' | 'qualidade' | 'padrao')[];
  dateRange?: {
    start: Date;
    end: Date;
  };
}