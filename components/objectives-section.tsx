"use client"

import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle, Target, Lightbulb, Globe, Handshake, Zap } from "lucide-react"

export function ObjectivesSection() {
  const objectives = [
    {
      icon: Target,
      title: "Mejorar la Calidad Educativa",
      description:
        "Trabajamos para que la educación técnica sea de la más alta calidad, con programas actualizados y recursos adecuados.",
    },
    {
      icon: Handshake,
      title: "Fortalecer la Participación",
      description: "Promovemos la participación activa de los estudiantes en las decisiones que afectan su educación.",
    },
    {
      icon: Globe,
      title: "Ampliar Oportunidades",
      description: "Buscamos expandir las oportunidades educativas y laborales para todos los estudiantes de la UTU.",
    },
    {
      icon: Lightbulb,
      title: "Innovar en la Educación",
      description: "Impulsamos la incorporación de nuevas tecnologías y metodologías en el proceso educativo.",
    },
    {
      icon: CheckCircle,
      title: "Defender Derechos",
      description: "Protegemos y promovemos los derechos de todos los estudiantes sin distinción.",
    },
    {
      icon: Zap,
      title: "Conectar con el Mundo Laboral",
      description: "Facilitamos la conexión entre la formación técnica y las demandas del mercado actual.",
    },
  ]

  return (
    <section id="objetivos" className="py-32 bg-gray-50">
      <div className="container-custom">
        <div className="text-center mb-20">
          <div className="inline-flex items-center px-4 py-2 bg-white rounded-full text-sm font-medium text-gray-600 mb-6 shadow-sm">
            <span className="w-2 h-2 bg-red-600 rounded-full mr-2"></span>
            Nuestros Objetivos
          </div>
          <h2 className="text-4xl lg:text-5xl font-light text-gray-900 mb-6 text-balance">
            Trabajamos por un
            <span className="block text-red-600 font-normal">futuro mejor</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto text-pretty leading-relaxed">
            Cada día trabajamos para alcanzar estos objetivos que benefician a toda la comunidad estudiantil de la UTU.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {objectives.map((objective, index) => {
            const Icon = objective.icon
            return (
              <Card key={index} className="border-0 shadow-sm bg-white hover-lift group">
                <CardContent className="p-8">
                  <div className="w-14 h-14 bg-gray-50 rounded-xl flex items-center justify-center mb-6 group-hover:bg-red-50 transition-colors">
                    <Icon className="h-7 w-7 text-gray-700 group-hover:text-red-600 transition-colors" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 text-balance">{objective.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{objective.description}</p>
                </CardContent>
              </Card>
            )
          })}
        </div>

        <div className="relative">
          <div className="bg-white rounded-3xl p-12 lg:p-16 shadow-sm border border-gray-100">
            <div className="text-center max-w-4xl mx-auto">
              <div className="w-16 h-16 bg-gradient-to-br from-gray-600 via-gray-700 to-gray-800 rounded-2xl flex items-center justify-center mx-auto mb-8 shadow-lg">
                <CheckCircle className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-3xl lg:text-4xl font-light text-gray-900 mb-6 text-balance">
                Nuestro compromiso es inquebrantable
              </h3>
              <p className="text-lg text-gray-600 leading-relaxed text-pretty">
                Trabajamos incansablemente por estos objetivos, manteniendo siempre la transparencia, la participación
                democrática y el diálogo constructivo como pilares fundamentales de nuestra gestión.
              </p>
            </div>
          </div>
          <div className="absolute -top-4 -left-4 w-8 h-8 bg-gradient-to-br from-gray-300 to-gray-400 rounded-full opacity-30"></div>
          <div className="absolute -bottom-4 -right-4 w-12 h-12 bg-gradient-to-br from-gray-400 to-gray-500 rounded-full opacity-25"></div>
        </div>
      </div>
    </section>
  )
}
