import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export function FAQSection() {
  const faqs = [
    {
      question: "¿Qué es la CEU y cuál es su función principal?",
      answer:
        "La Coordinadora de Estudiantes de la Universidad del Trabajo del Uruguay (CEU) es la organización que representa y defiende los intereses de todos los estudiantes de educación técnica del país. Nuestra función principal es ser la voz de los estudiantes ante las autoridades educativas y trabajar por mejorar la calidad de la educación técnica.",
    },
    {
      question: "¿Cómo puedo participar en la CEU?",
      answer:
        "Puedes participar de varias maneras: uniéndote a tu gremio estudiantil local, asistiendo a nuestras asambleas, participando en eventos y actividades, o postulándote para cargos de representación. También puedes contactarnos directamente para conocer las oportunidades de participación disponibles.",
    },
    {
      question: "¿Qué servicios ofrece la CEU a los estudiantes?",
      answer:
        "Ofrecemos representación estudiantil, defensa de derechos, organización de eventos educativos y culturales, capacitaciones, apoyo en trámites académicos, y servimos como canal de comunicación entre estudiantes y autoridades. También trabajamos en proyectos de mejora de la infraestructura educativa.",
    },
    {
      question: "¿Cómo se financia la CEU?",
      answer:
        "La CEU se financia principalmente a través de aportes de los gremios asociados, subsidios del Estado para actividades específicas, y colaboraciones con instituciones aliadas. Mantenemos total transparencia en el manejo de recursos y rendimos cuentas regularmente a la comunidad estudiantil.",
    },
    {
      question: "¿Qué requisitos hay para ser representante estudiantil?",
      answer:
        "Para ser representante estudiantil debes ser estudiante regular de la UTU, tener buen rendimiento académico, demostrar compromiso con la causa estudiantil y ser elegido por tus pares. También valoramos habilidades de liderazgo, comunicación y trabajo en equipo.",
    },
    {
      question: "¿Cómo puedo presentar una propuesta o reclamo?",
      answer:
        "Puedes presentar propuestas o reclamos a través de tu gremio estudiantil local, enviándonos un correo electrónico, asistiendo a nuestras asambleas, o utilizando nuestros canales de comunicación oficial. Todas las propuestas son evaluadas y respondidas en tiempo y forma.",
    },
    {
      question: "¿La CEU tiene presencia en todo el país?",
      answer:
        "Sí, la CEU tiene presencia en los 19 departamentos del Uruguay a través de nuestros gremios asociados. Trabajamos para asegurar que todos los estudiantes de la UTU, sin importar su ubicación geográfica, tengan representación y acceso a nuestros servicios.",
    },
    {
      question: "¿Cómo me mantengo informado sobre las actividades de la CEU?",
      answer:
        "Puedes mantenerte informado siguiendo nuestras redes sociales, suscribiéndote a nuestro boletín informativo, visitando regularmente nuestro sitio web, y participando en las asambleas de tu gremio local. También enviamos comunicados importantes directamente a los centros educativos.",
    },
  ]

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Preguntas <span className="text-primary">Frecuentes</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-pretty">
            Encuentra respuestas a las preguntas más comunes sobre la CEU y nuestro trabajo.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="border border-border rounded-lg px-6">
                <AccordionTrigger className="text-left hover:no-underline py-6">
                  <span className="font-medium tracking-wide text-foreground pr-4 text-lg leading-relaxed">
                    {faq.question}
                  </span>
                </AccordionTrigger>
                <AccordionContent className="pb-6 text-foreground/80 leading-relaxed text-base">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        <div className="mt-16 text-center">
          <div className="bg-primary/5 rounded-2xl p-8 border border-primary/10">
            <h3 className="text-xl font-bold text-foreground mb-4">¿No encontraste lo que buscabas?</h3>
            <p className="text-muted-foreground mb-6">
              Si tienes alguna pregunta específica que no está en esta lista, no dudes en contactarnos. Estamos aquí
              para ayudarte.
            </p>
            <a
              href="#contact"
              className="inline-flex items-center justify-center px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium"
            >
              Contáctanos
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
