"use client"

import { Gift, CheckCircle, XCircle, RefreshCw } from "lucide-react"
import { useLanguage } from "@/lib/i18n"

export function FaqSection() {
  const { t } = useLanguage()

  const policies = [
    { icon: Gift, text: t("faq.free"), color: "text-primary" },
    { icon: CheckCircle, text: t("faq.unused"), color: "text-success" },
    { icon: XCircle, text: t("faq.used"), color: "text-destructive" },
    { icon: RefreshCw, text: t("faq.failed"), color: "text-primary" },
  ]

  return (
    <section id="faq" className="border-t border-border py-16">
      <div className="mx-auto max-w-2xl px-4 lg:px-6">
        <h2 className="mb-8 text-center text-2xl font-bold tracking-tight text-foreground sm:text-3xl" style={{ fontFamily: "var(--font-heading)" }}>
          {t("faq.title")}
        </h2>

        <div className="rounded-2xl border border-border bg-card p-6">
          <h3 className="mb-5 text-base font-semibold text-foreground">
            {t("faq.refund.title")}
          </h3>
          <div className="flex flex-col gap-4">
            {policies.map((policy) => (
              <div key={policy.text} className="flex items-start gap-3">
                <policy.icon className={`mt-0.5 size-5 shrink-0 ${policy.color}`} />
                <span className="text-sm leading-relaxed text-muted-foreground">{policy.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
