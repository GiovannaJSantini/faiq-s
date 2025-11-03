import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Building2, MapPin, Plus, Edit, Trash2, Eye, Calendar } from "lucide-react";
import { ClassificationBadge } from "@/components/ui/classification-badge";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { useToast } from "@/hooks/use-toast";
import { useClinics } from "@/hooks/useClinics";
import { useAssessments } from "@/hooks/useAssessments";
import { clinicSchema } from "@/lib/validations/clinic";

export default function GerenciarClinicas() {
  const { toast } = useToast();
  const { clinics, isLoading, createClinic, updateClinic, deleteClinic } = useClinics();
  const { assessments, isLoading: assessmentsLoading } = useAssessments();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingClinic, setEditingClinic] = useState<any>(null);
  
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    type: "",
    phone: "",
    email: "",
    responsible_name: "",
    responsible_title: ""
  });

  const resetForm = () => {
    setFormData({
      name: "",
      location: "",
      type: "",
      phone: "",
      email: "",
      responsible_name: "",
      responsible_title: ""
    });
    setEditingClinic(null);
  };

  const openAddDialog = () => {
    resetForm();
    setIsDialogOpen(true);
  };

  const openEditDialog = (clinic: any) => {
    setFormData({
      name: clinic.name,
      location: clinic.location,
      type: clinic.type,
      phone: clinic.phone || "",
      email: clinic.email || "",
      responsible_name: clinic.responsible_name || "",
      responsible_title: clinic.responsible_title || ""
    });
    setEditingClinic(clinic);
    setIsDialogOpen(true);
  };

  const handleSave = () => {
    // Validate form data with zod schema
    const result = clinicSchema.safeParse(formData);
    
    if (!result.success) {
      toast({
        variant: "destructive",
        title: "Dados inválidos",
        description: result.error.errors[0].message
      });
      return;
    }

    // Prepare data with required fields guaranteed
    const validatedData = {
      name: result.data.name,
      location: result.data.location,
      type: result.data.type,
      phone: result.data.phone,
      email: result.data.email,
      responsible_name: result.data.responsible_name,
      responsible_title: result.data.responsible_title
    };

    if (editingClinic) {
      // Editar clínica existente
      updateClinic.mutate({
        id: editingClinic.id,
        updates: validatedData
      });
    } else {
      // Adicionar nova clínica
      createClinic.mutate(validatedData);
    }

    setIsDialogOpen(false);
    resetForm();
  };

  const handleDelete = (clinicId: string) => {
    deleteClinic.mutate(clinicId);
  };

  const getClinicAssessments = (clinicId: string) => {
    return assessments.filter(assessment => assessment.clinic_id === clinicId);
  };

  const getLatestAssessment = (clinicId: string) => {
    const clinicAssessments = getClinicAssessments(clinicId);
    return clinicAssessments.sort((a, b) => 
      new Date(b.assessment_date).getTime() - new Date(a.assessment_date).getTime()
    )[0];
  };

  if (isLoading || assessmentsLoading) {
    return (
      <div className="container mx-auto p-6">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center space-y-4">
            <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto" />
            <p className="text-muted-foreground">Carregando clínicas...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Gerenciar Clínicas</h1>
          <p className="text-muted-foreground">Cadastro e gestão de clínicas no sistema FAIQ-S</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={openAddDialog} className="bg-primary text-primary-foreground">
              <Plus className="w-4 h-4 mr-2" />
              Nova Clínica
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>
                {editingClinic ? "Editar Clínica" : "Nova Clínica"}
              </DialogTitle>
              <p className="text-sm text-muted-foreground">
                Preencha os dados da clínica abaixo
              </p>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Nome da Clínica *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="Ex: Clínica São Lucas"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="location">Localização *</Label>
                  <Input
                    id="location"
                    value={formData.location}
                    onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                    placeholder="Ex: São Paulo - SP"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="type">Tipo *</Label>
                  <Select 
                    value={formData.type} 
                    onValueChange={(value) => setFormData(prev => ({ ...prev, type: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o tipo" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="especializada">Especializada</SelectItem>
                      <SelectItem value="geral">Geral</SelectItem>
                      <SelectItem value="hospital">Hospital</SelectItem>
                      <SelectItem value="consultorio">Consultório</SelectItem>
                      <SelectItem value="centro_reabilitacao">Centro de Reabilitação</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Telefone</Label>
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                    placeholder="(11) 99999-9999"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">E-mail</Label>
                  <Input
                    id="email"
                    value={formData.email}
                    onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                    placeholder="contato@clinica.com"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="responsibleName">Nome do Responsável</Label>
                  <Input
                    id="responsibleName"
                    value={formData.responsible_name}
                    onChange={(e) => setFormData(prev => ({ ...prev, responsible_name: e.target.value }))}
                    placeholder="Dr. João Silva"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="responsibleTitle">Cargo do Responsável</Label>
                  <Input
                    id="responsibleTitle"
                    value={formData.responsible_title}
                    onChange={(e) => setFormData(prev => ({ ...prev, responsible_title: e.target.value }))}
                    placeholder="Diretor Clínico"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <Button 
                  variant="outline" 
                  onClick={() => setIsDialogOpen(false)}
                >
                  Cancelar
                </Button>
                <Button onClick={handleSave}>
                  {editingClinic ? "Atualizar" : "Adicionar"}
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-card shadow-soft border-0">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                <Building2 className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-foreground">{clinics.length}</h3>
                <p className="text-sm text-muted-foreground">Total de Clínicas</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card shadow-soft border-0">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-success/10 rounded-lg flex items-center justify-center">
                <Eye className="w-6 h-6 text-success" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-foreground">
                  {clinics.filter(clinic => getClinicAssessments(clinic.id).length > 0).length}
                </h3>
                <p className="text-sm text-muted-foreground">Com Avaliações</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card shadow-soft border-0">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-warning/10 rounded-lg flex items-center justify-center">
                <Calendar className="w-6 h-6 text-warning" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-foreground">
                  {clinics.filter(clinic => getClinicAssessments(clinic.id).length === 0).length}
                </h3>
                <p className="text-sm text-muted-foreground">Pendentes</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Lista de Clínicas */}
      <Card className="bg-card shadow-soft border-0">
        <CardHeader>
          <CardTitle>Clínicas Cadastradas</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Clínica</TableHead>
                <TableHead>Localização</TableHead>
                <TableHead>Tipo</TableHead>
                <TableHead>Última Avaliação</TableHead>
                <TableHead>Classificação</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {clinics.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8">
                    <div className="text-muted-foreground">
                      <Building2 className="w-12 h-12 mx-auto mb-2 opacity-50" />
                      <p>Nenhuma clínica cadastrada</p>
                      <p className="text-sm mt-1">Clique em "Nova Clínica" para começar</p>
                    </div>
                  </TableCell>
                </TableRow>
              ) : (
                clinics.map((clinic) => {
                const latestAssessment = getLatestAssessment(clinic.id);
                const assessmentCount = getClinicAssessments(clinic.id).length;
                
                return (
                  <TableRow key={clinic.id}>
                    <TableCell>
                      <div>
                        <div className="font-medium">{clinic.name}</div>
                        {assessmentCount > 0 && (
                          <div className="text-sm text-muted-foreground">
                            {assessmentCount} avaliação{assessmentCount !== 1 ? 'ões' : ''}
                          </div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <MapPin className="w-4 h-4 text-muted-foreground" />
                        {clinic.location}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary" className="capitalize">
                        {clinic.type.replace('_', ' ')}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {latestAssessment ? (
                        <div className="text-sm">
                          {format(new Date(latestAssessment.assessment_date), "dd/MM/yyyy", { locale: ptBR })}
                          <div className="text-xs text-muted-foreground">
                            {latestAssessment.overall_percentage.toFixed(1)}%
                          </div>
                        </div>
                      ) : (
                        <span className="text-muted-foreground text-sm">Sem avaliação</span>
                      )}
                    </TableCell>
                    <TableCell>
                      {latestAssessment ? (
                        <ClassificationBadge 
                          classification={latestAssessment.classification}
                          className="text-xs px-2 py-1"
                        />
                      ) : (
                        <span className="text-muted-foreground">-</span>
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => openEditDialog(clinic)}
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDelete(clinic.id)}
                          className="text-destructive hover:text-destructive"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}