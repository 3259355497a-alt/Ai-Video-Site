"use client"

import { LanguageProvider } from "@/lib/i18n"
import { SiteHeader } from "@/components/site-header"
import { GeneratorSection } from "@/components/generator-section"
import { PricingSection } from "@/components/pricing-section"
import { FaqSection } from "@/components/faq-section"
import { SiteFooter } from "@/components/site-footer"

export default function Page() {
  return (
    <LanguageProvider>
      <div className="flex min-h-screen flex-col bg-background">
        <SiteHeader />
        <main className="flex-1">
          <GeneratorSection />
          <PricingSection />
          <FaqSection />
        </main>
        <SiteFooter />
      </div>
    </LanguageProvider>
  )
}
