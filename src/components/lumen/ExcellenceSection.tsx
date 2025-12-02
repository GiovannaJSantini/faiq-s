export function ExcellenceSection() {
  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="aspect-square bg-gradient-to-br from-[#1FA87A]/20 to-[#F28C28]/20 rounded-2xl flex items-center justify-center">
              <div className="text-center space-y-4 p-8">
                <div className="w-32 h-32 bg-[#1FA87A] rounded-full flex items-center justify-center mx-auto">
                  <span className="text-5xl text-white font-bold">L</span>
                </div>
                <p className="text-xl font-semibold text-foreground">
                  Compromisso com a Excelência
                </p>
              </div>
            </div>

            <div className="space-y-6">
              <h2 className="text-3xl lg:text-4xl font-bold text-foreground">
                Compromisso com a Excelência
              </h2>
              <div className="space-y-4 text-lg text-muted-foreground">
                <p>
                  Na Lumen, excelência não é apenas um objetivo – é o padrão que guia 
                  cada projeto, cada interação e cada entrega.
                </p>
                <p>
                  Construímos parcerias de longo prazo baseadas em confiança, rigor técnico 
                  e resultados tangíveis. Nosso compromisso é transformar desafios em 
                  oportunidades estratégicas de crescimento sustentável.
                </p>
                <p>
                  Acreditamos que organizações que atendem a população TEA merecem suporte 
                  técnico de altíssimo nível, e é exatamente isso que entregamos: expertise, 
                  ciência aplicada e impacto duradouro.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
