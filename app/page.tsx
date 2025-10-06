import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { AboutSection } from "@/components/about-section"
import { ObjectivesSection } from "@/components/objectives-section"
import { EventsSection } from "@/components/events-section"
import { MembersSection } from "@/components/members-section"
import { StatsChart } from "@/components/stats-chart"
import { PartnersCarousel } from "@/components/partners-carousel"
import { UnionsCarousel } from "@/components/unions-carousel"
import { FAQSection } from "@/components/faq-section"
import { ContactSection } from "@/components/contact-section"
import { Footer } from "@/components/footer"

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <HeroSection />
        <AboutSection />
        <ObjectivesSection />
        <EventsSection />
        <MembersSection />
        <StatsChart />
        <PartnersCarousel />
        <UnionsCarousel />
        <FAQSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  )
}
