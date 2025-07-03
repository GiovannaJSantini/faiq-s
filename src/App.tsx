import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "@/components/layout";
import Index from "./pages/Index";
import NovaAvaliacao from "./pages/NovaAvaliacao";
import GerenciarClinicas from "./pages/GerenciarClinicas";
import Relatorios from "./pages/Relatorios";
import IndicadoresFaiq from "./pages/IndicadoresFaiq";
import Usuarios from "./pages/Usuarios";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/avaliacao" element={<NovaAvaliacao />} />
            <Route path="/clinicas" element={<GerenciarClinicas />} />
            <Route path="/relatorios" element={<Relatorios />} />
            <Route path="/indicadores" element={<IndicadoresFaiq />} />
            <Route path="/usuarios" element={<Usuarios />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
