"use client"

import { Check, Zap } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/lib/i18n"

interface PricingPlan {
  nameKey: string
  price: string
  credits: number
  bonus?: number
  popular?: boolean
}

const plans: PricingPlan[] = [
  { nameKey: "pricing.starter", price: "$9.99", credits: 10 },
  { nameKey: "pricing.popular", price: "$19.99", credits: 25, bonus: 5, popular: true },
  { nameKey: "pricing.pro", price: "$49.99", credits: 70, bonus: 20 },
  { nameKey: "pricing.max", price: "$99.99", credits: 150, bonus: 50 },
]

export function PricingSection() {
  const { t } = useLanguage()

  return (
    <section id="pricing" className="border-t border-border bg-secondary/30 py-16">
      <div className="mx-auto max-w-6xl px-4 lg:px-6">
        <div className="mb-10 text-center">
          <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl" style={{ fontFamily: "var(--font-heading)" }}>
            {t("pricing.title")}
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            {t("pricing.subtitle")}
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {plans.map((plan) => (
            <div
              key={plan.nameKey}
              className={`relative flex flex-col rounded-2xl border p-6 transition-all hover:border-primary/50 ${
                plan.popular
                  ? "border-primary bg-primary/5 shadow-[0_0_30px_-5px] shadow-primary/20"
                  : "border-border bg-card"
              }`}
            >
              {plan.popular && (
                <Badge className="absolute -top-2.5 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground px-3 text-xs">
                  <Zap className="mr-1 size-3" />
                  POPULAR
                </Badge>
              )}

              <div className="mb-4">
                <h3 className="text-sm font-semibold text-foreground">{t(plan.nameKey)}</h3>
                <div className="mt-2 flex items-baseline gap-1">
                  <span className="text-3xl font-bold tracking-tight text-foreground" style={{ fontFamily: "var(--font-heading)" }}>
                    {plan.price}
                  </span>
                </div>
              </div>

              <div className="mb-6 flex flex-col gap-2">
                <div className="flex items-center gap-2 text-sm text-foreground">
                  <Check className="size-4 text-primary" />
                  <span>
                    {plan.credits} {t("pricing.credits")}
                  </span>
                </div>
                {plan.bonus && (
                  <div className="flex items-center gap-2 text-sm text-success">
                    <Check className="size-4" />
                    <span>
                      +{plan.bonus} {t("pricing.bonus")}
                    </span>
                  </div>
                )}
              </div>

              <Button
                className={`mt-auto w-full font-medium ${
                  plan.popular
                    ? "bg-primary text-primary-foreground hover:bg-primary/90"
                    : "bg-secondary text-secondary-foreground hover:bg-secondary/80 border border-border"
                }`}
              >
                {t("pricing.buy")}
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
