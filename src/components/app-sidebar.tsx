
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { BarChart3, Building2, FileText, Activity, Home, Users, Grid2X2, Eye } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
  useSidebar,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { useUserRole } from "@/hooks/useUserRole";

const mainItems = [
  { title: "Dashboard", url: "/", icon: Home, roles: ['admin', 'avaliador'] },
  { title: "Nova Avaliação", url: "/avaliacao", icon: Activity, roles: ['admin', 'avaliador'] },
  { title: "Gerenciar Clínicas", url: "/clinicas", icon: Building2, roles: ['admin'] },
  { title: "Gráficos de Níveis", url: "/graficos-niveis", icon: Grid2X2, roles: ['admin', 'avaliador'] },
  { title: "Relatórios", url: "/relatorios", icon: BarChart3, roles: ['admin', 'avaliador', 'cliente'] },
];

const systemItems = [
  { title: "Indicadores FAIQ", url: "/indicadores", icon: FileText, roles: ['admin'] },
  { title: "Usuários", url: "/usuarios", icon: Users, roles: ['admin'] },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const location = useLocation();
  const navigate = useNavigate();
  const currentPath = location.pathname;
  const { userRole, isLoading } = useUserRole();

  const isActive = (path: string) => currentPath === path;
  
  const getNavCls = ({ isActive }: { isActive: boolean }) =>
    isActive 
      ? "bg-primary/10 text-primary font-medium border-l-2 border-primary" 
      : "hover:bg-sidebar-accent text-sidebar-foreground hover:text-primary transition-all duration-150";

  const handleViewToggle = () => {
    navigate("/institucional");
  };

  // Filtrar itens baseado no role do usuário
  const filteredMainItems = mainItems.filter(item => 
    !item.roles || !userRole || item.roles.includes(userRole)
  );
  
  const filteredSystemItems = systemItems.filter(item => 
    !item.roles || !userRole || item.roles.includes(userRole)
  );

  if (isLoading) {
    return (
      <Sidebar className={state === "collapsed" ? "w-16" : "w-64"}>
        <SidebarContent className="bg-card flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </SidebarContent>
      </Sidebar>
    );
  }

  return (
    <Sidebar className={state === "collapsed" ? "w-16" : "w-64"}>
      <SidebarContent className="bg-sidebar-background border-r border-sidebar-border">
        <div className="p-4 border-b border-sidebar-border">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center shadow-soft">
              <Activity className="w-5 h-5 text-primary-foreground" strokeWidth={2} />
            </div>
            {state !== "collapsed" && (
              <div>
                <h2 className="font-semibold text-primary tracking-tight">FAIQ-S</h2>
                <p className="text-xs text-muted-foreground font-medium">Sistema de Qualidade</p>
              </div>
            )}
          </div>
        </div>

        {filteredMainItems.length > 0 && (
          <SidebarGroup>
            <SidebarGroupLabel className="text-xs font-semibold text-muted-foreground uppercase tracking-wide px-4">
              Menu Principal
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {filteredMainItems.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <NavLink 
                        to={item.url} 
                        end 
                        className={getNavCls}
                      >
                        <item.icon className={`h-4 w-4 ${state === "collapsed" ? 'mx-auto' : 'mr-3'}`} strokeWidth={1.5} />
                        {state !== "collapsed" && <span className="font-medium">{item.title}</span>}
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        )}

        {filteredSystemItems.length > 0 && (
          <SidebarGroup>
            <SidebarGroupLabel className="text-xs font-semibold text-muted-foreground uppercase tracking-wide px-4">
              Sistema
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {filteredSystemItems.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <NavLink 
                        to={item.url} 
                        className={getNavCls}
                      >
                        <item.icon className={`h-4 w-4 ${state === "collapsed" ? 'mx-auto' : 'mr-3'}`} strokeWidth={1.5} />
                        {state !== "collapsed" && <span className="font-medium">{item.title}</span>}
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        )}
      </SidebarContent>

      <SidebarFooter className="p-4 border-t border-sidebar-border bg-sidebar-background">
        <Button
          variant="ghost"
          size="sm"
          onClick={handleViewToggle}
          className="w-full justify-start text-muted-foreground hover:text-primary hover:bg-sidebar-accent transition-all duration-150"
        >
          <Eye className={`h-4 w-4 ${state === "collapsed" ? 'mx-auto' : 'mr-3'}`} strokeWidth={1.5} />
          {state !== "collapsed" && <span className="font-medium">Visualização Cliente</span>}
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
}
