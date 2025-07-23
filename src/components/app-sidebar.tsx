
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { BarChart3, Building2, FileText, Activity, Home, Users, Grid2X2, Eye, EyeOff } from "lucide-react";
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
import { Separator } from "@/components/ui/separator";

const mainItems = [
  { title: "Dashboard", url: "/", icon: Home },
  { title: "Nova Avaliação", url: "/avaliacao", icon: Activity },
  { title: "Gerenciar Clínicas", url: "/clinicas", icon: Building2 },
  { title: "Gráficos de Níveis", url: "/graficos-niveis", icon: Grid2X2 },
  { title: "Relatórios", url: "/relatorios", icon: BarChart3 },
];

const systemItems = [
  { title: "Indicadores FAIQ", url: "/indicadores", icon: FileText },
  { title: "Usuários", url: "/usuarios", icon: Users },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const location = useLocation();
  const navigate = useNavigate();
  const currentPath = location.pathname;

  const isActive = (path: string) => currentPath === path;
  
  const getNavCls = ({ isActive }: { isActive: boolean }) =>
    isActive 
      ? "bg-primary/10 text-primary font-medium border-r-2 border-primary" 
      : "hover:bg-muted/50 text-muted-foreground hover:text-foreground";

  const handleViewToggle = () => {
    navigate("/institucional");
  };

  return (
    <Sidebar className={state === "collapsed" ? "w-16" : "w-64"}>
      <SidebarContent className="bg-card">
        <div className="p-4 border-b">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
              <Activity className="w-4 h-4 text-white" />
            </div>
            {state !== "collapsed" && (
              <div>
                <h2 className="font-bold text-primary">FAIQ-S</h2>
                <p className="text-xs text-muted-foreground">Sistema de Qualidade</p>
              </div>
            )}
          </div>
        </div>

        <SidebarGroup>
          <SidebarGroupLabel>Menu Principal</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink 
                      to={item.url} 
                      end 
                      className={getNavCls}
                    >
                      <item.icon className={`h-4 w-4 ${state === "collapsed" ? 'mx-auto' : 'mr-2'}`} />
                      {state !== "collapsed" && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Sistema</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {systemItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink 
                      to={item.url} 
                      className={getNavCls}
                    >
                      <item.icon className={`h-4 w-4 ${state === "collapsed" ? 'mx-auto' : 'mr-2'}`} />
                      {state !== "collapsed" && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-4 border-t">
        <div className="flex flex-col gap-2">
          <Separator />
          <Button
            variant="outline"
            size="sm"
            onClick={handleViewToggle}
            className="w-full justify-start text-muted-foreground hover:text-foreground"
          >
            <Eye className={`h-4 w-4 ${state === "collapsed" ? 'mx-auto' : 'mr-2'}`} />
            {state !== "collapsed" && <span>Visualização Cliente</span>}
          </Button>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
