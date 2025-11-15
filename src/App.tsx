
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import { Layout } from "@/components/layout";
import Index from "./pages/Index";
import NovaAvaliacao from "./pages/NovaAvaliacao";
import GerenciarClinicas from "./pages/GerenciarClinicas";
import Relatorios from "./pages/Relatorios";
import IndicadoresFaiq from "./pages/IndicadoresFaiq";
import Usuarios from "./pages/Usuarios";
import GraficosNiveis from "./pages/GraficosNiveis";
import Institucional from "./pages/Institucional";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      retryDelay: 500,
      staleTime: 1000 * 60 * 2,
      gcTime: 1000 * 60 * 5,
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      networkMode: 'online',
    },
    mutations: {
      retry: 0,
      networkMode: 'online',
    },
  },
});

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Rota institucional (sem sidebar) */}
            <Route path="/institucional" element={<Institucional />} />
            
            {/* Rotas do sistema interno (com sidebar) */}
            <Route path="/*" element={
              <Layout>
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/avaliacao" element={<NovaAvaliacao />} />
                  <Route path="/clinicas" element={<GerenciarClinicas />} />
                  <Route path="/relatorios" element={<Relatorios />} />
                  <Route path="/indicadores" element={<IndicadoresFaiq />} />
                  <Route path="/usuarios" element={<Usuarios />} />
                  <Route path="/graficos-niveis" element={<GraficosNiveis />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </Layout>
            } />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
