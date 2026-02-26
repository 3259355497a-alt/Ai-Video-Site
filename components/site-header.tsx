"use client"

import { Video, Globe } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/lib/i18n"

export function SiteHeader() {
  const { lang, setLang, t } = useLanguage()

  return (
    <header className="sticky top-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 lg:px-6">
        <div className="flex items-center gap-6">
          <a href="#" className="flex items-center gap-2">
            <div className="flex size-8 items-center justify-center rounded-lg bg-primary">
              <Video className="size-4 text-primary-foreground" />
            </div>
            <span className="text-lg font-bold tracking-tight text-foreground" style={{ fontFamily: "var(--font-heading)" }}>
              VidAI
            </span>
          </a>
          <nav className="hidden items-center gap-4 md:flex">
            <a href="#pricing" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
              {t("nav.pricing")}
            </a>
            <a href="#faq" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
              {t("nav.faq")}
            </a>
          </nav>
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setLang(lang === "en" ? "zh" : "en")}
            className="gap-1.5 text-muted-foreground hover:text-foreground"
          >
            <Globe className="size-4" />
            <span className="text-xs font-medium">{lang === "en" ? "EN" : "中文"}</span>
          </Button>

          <span className="text-sm text-muted-foreground">user@example.com</span>

          <Badge className="bg-primary/15 text-primary hover:bg-primary/20 border-primary/20">
            {t("credits")}: 3
          </Badge>
        </div>
      </div>
    </header>
  )
}
