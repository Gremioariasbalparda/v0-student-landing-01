"use client"

import { motion } from "framer-motion"

export function StatsChart() {
  const keyStats = [
    { number: "15K+", label: "Estudiantes Representados", description: "En todo el país" },
    { number: "45", label: "Centros Educativos", description: "Participando activamente" },
    { number: "19", label: "Departamentos", description: "Con presencia CEU" },
    { number: "6", label: "Especialidades", description: "Técnicas principales" },
  ]

  const specialties = [
    { name: "Informática", students: "4.5K+" },
    { name: "Electrotecnia", students: "3.2K+" },
    { name: "Mecánica", students: "2.8K+" },
    { name: "Construcción", students: "2.1K+" },
    { name: "Gastronomía", students: "1.4K+" },
    { name: "Otras", students: "1K+" },
  ]

  return (
    <section className="py-32 bg-gray-50 relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl sm:text-6xl font-light text-gray-900 mb-6 tracking-tight">
            Estudiantes
            <span className="block font-medium">Representados</span>
          </h2>
          <div className="w-24 h-px bg-gray-900 mx-auto mb-8" />
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed font-light">
            Los números que respaldan nuestro trabajo y el alcance de nuestra representación estudiantil
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="grid md:grid-cols-4 gap-8 mb-20"
        >
          {keyStats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="text-center bg-white p-12 rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              <div className="text-6xl font-light text-gray-900 mb-4">{stat.number}</div>
              <div className="text-gray-900 font-medium tracking-wide mb-2">{stat.label}</div>
              <div className="text-gray-500 text-sm font-light">{stat.description}</div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="bg-white rounded-3xl p-16 shadow-sm max-w-4xl mx-auto"
        >
          <h3 className="text-4xl font-light text-gray-900 mb-12 text-center">Distribución por Especialidad</h3>

          <div className="grid md:grid-cols-2 gap-8">
            {specialties.map((specialty, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="flex justify-between items-center p-6 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors duration-300"
              >
                <span className="text-lg font-light text-gray-900">{specialty.name}</span>
                <span className="text-2xl font-light text-gray-600">{specialty.students}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
