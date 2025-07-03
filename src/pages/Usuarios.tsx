import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Plus, Edit, Trash2, Shield, UserCheck, User } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  accessType: 'admin' | 'avaliador' | 'cliente';
  isActive: boolean;
  createdAt: Date;
}

const accessTypeConfig = {
  admin: { label: 'Administrador', color: 'bg-red-100 text-red-800', icon: Shield },
  avaliador: { label: 'Avaliador', color: 'bg-blue-100 text-blue-800', icon: UserCheck },
  cliente: { label: 'Cliente', color: 'bg-green-100 text-green-800', icon: User }
};

const sampleUsers: User[] = [
  {
    id: "1",
    name: "Dr. João Silva",
    email: "joao.silva@admin.com",
    phone: "(11) 99999-9999",
    accessType: "admin",
    isActive: true,
    createdAt: new Date("2024-01-15")
  },
  {
    id: "2",
    name: "Dra. Maria Santos",
    email: "maria.santos@avaliador.com",
    phone: "(11) 88888-8888",
    accessType: "avaliador",
    isActive: true,
    createdAt: new Date("2024-02-20")
  },
  {
    id: "3",
    name: "Ana Oliveira",
    email: "ana.oliveira@cliente.com",
    phone: "(11) 77777-7777",
    accessType: "cliente",
    isActive: true,
    createdAt: new Date("2024-03-10")
  }
];

const Usuarios = () => {
  const [users, setUsers] = useState<User[]>(sampleUsers);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    accessType: "cliente" as User['accessType']
  });
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingUser) {
      // Update existing user
      setUsers(users.map(user => 
        user.id === editingUser.id 
          ? { ...user, ...formData }
          : user
      ));
      toast({
        title: "Usuário atualizado",
        description: "As informações do usuário foram atualizadas com sucesso.",
      });
    } else {
      // Create new user
      const newUser: User = {
        id: Date.now().toString(),
        ...formData,
        isActive: true,
        createdAt: new Date()
      };
      setUsers([...users, newUser]);
      toast({
        title: "Usuário criado",
        description: "Novo usuário foi adicionado ao sistema.",
      });
    }
    
    setIsDialogOpen(false);
    setEditingUser(null);
    setFormData({ name: "", email: "", phone: "", accessType: "cliente" });
  };

  const handleEdit = (user: User) => {
    setEditingUser(user);
    setFormData({
      name: user.name,
      email: user.email,
      phone: user.phone,
      accessType: user.accessType
    });
    setIsDialogOpen(true);
  };

  const handleDelete = (userId: string) => {
    setUsers(users.filter(user => user.id !== userId));
    toast({
      title: "Usuário removido",
      description: "O usuário foi removido do sistema.",
      variant: "destructive",
    });
  };

  const toggleUserStatus = (userId: string) => {
    setUsers(users.map(user => 
      user.id === userId 
        ? { ...user, isActive: !user.isActive }
        : user
    ));
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
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="phone">Telefone</Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  placeholder="(11) 99999-9999"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="accessType">Tipo de acesso</Label>
                <Select value={formData.accessType} onValueChange={(value: User['accessType']) => setFormData({...formData, accessType: value})}>
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
                <TableHead>Telefone</TableHead>
                <TableHead>Tipo de Acesso</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Data de Criação</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user) => {
                const config = accessTypeConfig[user.accessType];
                const IconComponent = config.icon;
                return (
                  <TableRow key={user.id}>
                    <TableCell className="font-medium">{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.phone}</TableCell>
                    <TableCell>
                      <Badge className={config.color}>
                        <IconComponent className="h-3 w-3 mr-1" />
                        {config.label}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Button
                        variant={user.isActive ? "default" : "secondary"}
                        size="sm"
                        onClick={() => toggleUserStatus(user.id)}
                      >
                        {user.isActive ? "Ativo" : "Inativo"}
                      </Button>
                    </TableCell>
                    <TableCell>
                      {user.createdAt.toLocaleDateString("pt-BR")}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleEdit(user)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => handleDelete(user.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default Usuarios;