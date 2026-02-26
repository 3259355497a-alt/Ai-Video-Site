"use client"

import { ShieldCheck, Clock, Headphones } from "lucide-react"
import { useLanguage } from "@/lib/i18n"

export function SiteFooter() {
  const { t } = useLanguage()

  const items = [
    { icon: Clock, text: t("footer.expire") },
    { icon: ShieldCheck, text: t("footer.secure") },
    { icon: Headphones, text: t("footer.support") },
  ]

  return (
    <footer className="border-t border-border bg-secondary/20 py-8">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-6 px-4 lg:px-6">
        {items.map((item) => (
          <div key={item.text} className="flex items-center gap-2 text-sm text-muted-foreground">
            <item.icon className="size-4 text-primary/70" />
            <span>{item.text}</span>
          </div>
        ))}
      </div>
    </footer>
  )
}
