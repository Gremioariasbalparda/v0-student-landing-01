import { Mail, Phone, MapPin } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-foreground text-background py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-6">
              <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm">CEU</span>
              </div>
              <span className="font-bold text-lg">CEU Uruguay</span>
            </div>
            <p className="text-background/80 text-sm leading-relaxed">
              Representando y defendiendo los derechos de los estudiantes de la Universidad del Trabajo del Uruguay
              desde hace más de una década.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4">Enlaces Rápidos</h3>
            <ul className="space-y-2">
              <li>
                <a href="#about" className="text-background/80 hover:text-background transition-colors text-sm">
                  Nosotros
                </a>
              </li>
              <li>
                <a href="#objectives" className="text-background/80 hover:text-background transition-colors text-sm">
                  Objetivos
                </a>
              </li>
              <li>
                <a href="#events" className="text-background/80 hover:text-background transition-colors text-sm">
                  Eventos
                </a>
              </li>
              <li>
                <a href="#members" className="text-background/80 hover:text-background transition-colors text-sm">
                  Miembros
                </a>
              </li>
              <li>
                <a href="/login" className="text-background/80 hover:text-background transition-colors text-sm">
                  Iniciar Sesión
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4">Gremios</h3>
            <ul className="space-y-2">
              <li>
                <span className="text-background/80 text-sm">AEITU - Informática</span>
              </li>
              <li>
                <span className="text-background/80 text-sm">AEETU - Electrotecnia</span>
              </li>
              <li>
                <span className="text-background/80 text-sm">AEMTU - Mecánica</span>
              </li>
              <li>
                <span className="text-background/80 text-sm">AECTU - Construcción</span>
              </li>
              <li>
                <span className="text-background/80 text-sm">Y 8 gremios más...</span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4">Contacto</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-primary" />
                <span className="text-background/80 text-sm">contacto@ceu-utu.edu.uy</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-primary" />
                <span className="text-background/80 text-sm">+598 2901 8765</span>
              </div>
              <div className="flex items-start space-x-2">
                <MapPin className="h-4 w-4 text-primary mt-0.5" />
                <span className="text-background/80 text-sm">
                  Av. Libertador 1234
                  <br />
                  Montevideo, Uruguay
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-background/20 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-background/60 text-sm">
              © 2025 Coordinadora de Estudiantes de la UTU. Todos los derechos reservados.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-background/60 hover:text-background text-sm transition-colors">
                Política de Privacidad
              </a>
              <a href="#" className="text-background/60 hover:text-background text-sm transition-colors">
                Términos de Uso
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
