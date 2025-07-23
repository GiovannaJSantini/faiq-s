
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Phone, Mail, MapPin, Clock, Send } from "lucide-react";
import { useState } from "react";

export function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    institution: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Aqui seria implementada a lógica de envio do formulário
    console.log('Form submitted:', formData);
    alert('Mensagem enviada com sucesso! Entraremos em contato em breve.');
    setFormData({ name: '', email: '', phone: '', institution: '', message: '' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <section id="contato" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Entre em Contato
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Pronto para elevar a qualidade da sua instituição? Solicite uma avaliação 
            gratuita e descubra como podemos ajudar você a alcançar a excelência.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Informações de Contato */}
          <div className="space-y-6">
            <Card className="institutional-card">
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-foreground flex items-center gap-2">
                  <Phone className="w-5 h-5 text-primary" />
                  Telefone
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-foreground font-medium">+55 (11) 99999-9999</p>
                <p className="text-sm text-muted-foreground">Segunda a sexta, 8h às 18h</p>
              </CardContent>
            </Card>

            <Card className="institutional-card">
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-foreground flex items-center gap-2">
                  <Mail className="w-5 h-5 text-primary" />
                  E-mail
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-foreground font-medium">contato@faiq-s.com.br</p>
                <p className="text-sm text-muted-foreground">Resposta em até 24h</p>
              </CardContent>
            </Card>

            <Card className="institutional-card">
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-foreground flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-primary" />
                  Endereço
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-foreground font-medium">São Paulo, SP</p>
                <p className="text-sm text-muted-foreground">Atendimento em todo o Brasil</p>
              </CardContent>
            </Card>

            <Card className="institutional-card">
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-foreground flex items-center gap-2">
                  <Clock className="w-5 h-5 text-primary" />
                  Horário de Funcionamento
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-1 text-sm">
                  <p className="text-foreground">Segunda a sexta: 8h às 18h</p>
                  <p className="text-foreground">Sábado: 8h às 12h</p>
                  <p className="text-muted-foreground">Domingo: Fechado</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Formulário de Contato */}
          <div className="lg:col-span-2">
            <Card className="institutional-card">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-foreground">
                  Solicite uma Avaliação Gratuita
                </CardTitle>
                <p className="text-muted-foreground">
                  Preencha o formulário abaixo e nossa equipe entrará em contato para 
                  agendar uma avaliação personalizada da sua instituição.
                </p>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name" className="text-foreground">Nome completo *</Label>
                      <Input
                        id="name"
                        name="name"
                        type="text"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        className="mt-1"
                        placeholder="Seu nome completo"
                      />
                    </div>
                    <div>
                      <Label htmlFor="email" className="text-foreground">E-mail *</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className="mt-1"
                        placeholder="seu@email.com"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="phone" className="text-foreground">Telefone *</Label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={handleChange}
                        className="mt-1"
                        placeholder="(11) 99999-9999"
                      />
                    </div>
                    <div>
                      <Label htmlFor="institution" className="text-foreground">Instituição *</Label>
                      <Input
                        id="institution"
                        name="institution"
                        type="text"
                        required
                        value={formData.institution}
                        onChange={handleChange}
                        className="mt-1"
                        placeholder="Nome da clínica/hospital"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="message" className="text-foreground">Mensagem</Label>
                    <Textarea
                      id="message"
                      name="message"
                      rows={4}
                      value={formData.message}
                      onChange={handleChange}
                      className="mt-1"
                      placeholder="Conte-nos mais sobre suas necessidades..."
                    />
                  </div>

                  <Button
                    type="submit"
                    size="lg"
                    className="w-full institutional-button"
                  >
                    <Send className="w-4 h-4 mr-2" />
                    Enviar Solicitação
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
