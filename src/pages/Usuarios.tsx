import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Plus, Edit, Shield, UserCheck, User } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { userSchema, userUpdateSchema } from "@/lib/validations/user";

interface UserDisplay {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'avaliador' | 'cliente';
  createdAt: Date;
}

const roleConfig = {
  admin: { label: 'Administrador', color: 'bg-red-100 text-red-800', icon: Shield },
  avaliador: { label: 'Avaliador', color: 'bg-blue-100 text-blue-800', icon: UserCheck },
  cliente: { label: 'Cliente', color: 'bg-green-100 text-green-800', icon: User }
};

const Usuarios = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<UserDisplay | null>(null);
  const [password, setPassword] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "cliente" as 'admin' | 'avaliador' | 'cliente'
  });
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Buscar usuários com seus roles da tabela user_roles
  const { data: users = [], isLoading } = useQuery({
    queryKey: ['usersWithRoles'],
    queryFn: async () => {
      const { data: profiles, error: profilesError } = await supabase
        .from('profiles')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (profilesError) throw profilesError;

      const { data: userRoles, error: rolesError } = await supabase
        .from('user_roles')
        .select('user_id, role');
      
      if (rolesError) throw rolesError;

      // Combinar profiles com roles
      const usersWithRoles: UserDisplay[] = profiles.map(profile => {
        const userRole = userRoles.find(ur => ur.user_id === profile.id);
        return {
          id: profile.id,
          name: profile.name || profile.email,
          email: profile.email,
          role: (userRole?.role as 'admin' | 'avaliador' | 'cliente') || 'cliente',
          createdAt: new Date(profile.created_at || Date.now()),
        };
      });

      return usersWithRoles;
    },
  });

  // Mutation para criar usuário
  const createUser = useMutation({
    mutationFn: async ({ email, password, name, role }: { 
      email: string; 
      password: string; 
      name: string; 
      role: 'admin' | 'avaliador' | 'cliente' 
    }) => {
      const redirectUrl = import.meta.env.VITE_OAUTH_REDIRECT_URL || window.location.origin;
      
      // Criar usuário no auth
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${redirectUrl}/`,
          data: { name }
        }
      });

      if (authError) throw authError;
      if (!authData.user) throw new Error('Falha ao criar usuário');

      // O role 'cliente' é criado automaticamente pelo trigger handle_new_user
      // Só precisamos atualizar se for admin ou avaliador
      if (role !== 'cliente') {
        const { error: roleError } = await supabase
          .from('user_roles')
          .update({ role })
          .eq('user_id', authData.user.id);

        if (roleError) throw roleError;
      }

      return authData.user;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['usersWithRoles'] });
      toast({ title: 'Usuário criado com sucesso' });
    },
    onError: (error: any) => {
      toast({
        title: 'Erro ao criar usuário',
        description: error.message,
        variant: 'destructive',
      });
    },
  });

  // Mutation para atualizar usuário
  const updateUser = useMutation({
    mutationFn: async ({ id, name, role }: { 
      id: string; 
      name: string; 
      role: 'admin' | 'avaliador' | 'cliente' 
    }) => {
      // Atualizar perfil
      const { error: profileError } = await supabase
        .from('profiles')
        .update({ name })
        .eq('id', id);

      if (profileError) throw profileError;

      // Atualizar role
      const { error: roleError } = await supabase
        .from('user_roles')
        .update({ role })
        .eq('user_id', id);

      if (roleError) throw roleError;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['usersWithRoles'] });
      toast({ title: 'Usuário atualizado com sucesso' });
    },
    onError: (error: any) => {
      toast({
        title: 'Erro ao atualizar usuário',
        description: error.message,
        variant: 'destructive',
      });
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingUser) {
      // Validate update data
      const result = userUpdateSchema.safeParse({
        name: formData.name,
        role: formData.role
      });
      
      if (!result.success) {
        toast({
          title: "Dados inválidos",
          description: result.error.errors[0].message,
          variant: "destructive",
        });
        return;
      }
      
      // Atualizar usuário existente
      updateUser.mutate({
        id: editingUser.id,
        name: result.data.name,
        role: result.data.role,
      });
    } else {
      // Validate full user data including password
      const result = userSchema.safeParse({
        name: formData.name,
        email: formData.email,
        password: password,
        role: formData.role
      });
      
      if (!result.success) {
        toast({
          title: "Dados inválidos",
          description: result.error.errors[0].message,
          variant: "destructive",
        });
        return;
      }

      createUser.mutate({
        email: result.data.email,
        password: result.data.password,
        name: result.data.name,
        role: result.data.role,
      });
    }
    
    setIsDialogOpen(false);
    setEditingUser(null);
    setFormData({ name: "", email: "", role: "cliente" });
    setPassword("");
  };

  const handleEdit = (user: UserDisplay) => {
    setEditingUser(user);
    setFormData({
      name: user.name,
      email: user.email,
      role: user.role
    });
    setIsDialogOpen(true);
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-primary">Gerenciar Usuários</h1>
          <p className="text-muted-foreground">
            Gerencie os usuários do sistema FAIQ-S
          </p>
        </div>
        
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Novo Usuário
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {editingUser ? "Editar Usuário" : "Novo Usuário"}
              </DialogTitle>
              <DialogDescription>
                {editingUser ? "Atualize as informações do usuário." : "Preencha os dados para criar um novo usuário."}
              </DialogDescription>
            </DialogHeader>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nome completo</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  placeholder="Digite o nome completo"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email">E-mail</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  placeholder="Digite o e-mail"
                  disabled={!!editingUser}
                  required
                />
              </div>
              
              {!editingUser && (
                <div className="space-y-2">
                  <Label htmlFor="password">Senha</Label>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Digite uma senha"
                    required={!editingUser}
                  />
                </div>
              )}
              
              <div className="space-y-2">
                <Label htmlFor="role">Tipo de acesso</Label>
                <Select value={formData.role} onValueChange={(value: 'admin' | 'avaliador' | 'cliente') => setFormData({...formData, role: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o tipo de acesso" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="admin">Administrador</SelectItem>
                    <SelectItem value="avaliador">Avaliador</SelectItem>
                    <SelectItem value="cliente">Cliente</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancelar
                </Button>
                <Button type="submit">
                  {editingUser ? "Atualizar" : "Criar"}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center p-12">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Carregando usuários...</p>
          </div>
        </div>
      ) : (
        <Card>
        <CardHeader>
          <CardTitle>Lista de Usuários</CardTitle>
          <CardDescription>
            {users.length} usuário{users.length !== 1 ? 's' : ''} cadastrado{users.length !== 1 ? 's' : ''} no sistema
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead>E-mail</TableHead>
                <TableHead>Tipo de Acesso</TableHead>
                <TableHead>Data de Criação</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                    Nenhum usuário cadastrado
                  </TableCell>
                </TableRow>
              ) : (
                users.map((user) => {
                  const config = roleConfig[user.role];
                  const IconComponent = config.icon;
                  return (
                    <TableRow key={user.id}>
                      <TableCell className="font-medium">{user.name}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>
                        <Badge className={config.color}>
                          <IconComponent className="h-3 w-3 mr-1" />
                          {config.label}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {user.createdAt.toLocaleDateString("pt-BR")}
                      </TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleEdit(user)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      )}
    </div>
  );
};

export default Usuarios;