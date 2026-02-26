"use client"

import { useState } from "react"
import { Camera, Type, Gift, Sparkles } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PhotoToVideo } from "@/components/photo-to-video"
import { TextToVideo } from "@/components/text-to-video"
import { useLanguage } from "@/lib/i18n"

export function GeneratorSection() {
  const { t } = useLanguage()
  const [hasFreeTrial] = useState(true)

  return (
    <section className="mx-auto w-full max-w-2xl px-4 py-10 lg:px-6">
      {/* Free Trial Badge */}
      {hasFreeTrial && (
        <div className="mb-6 flex justify-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-success/30 bg-success/10 px-4 py-1.5">
            <Gift className="size-4 text-success" />
            <span className="text-sm font-medium text-success">{t("free.trial")}</span>
          </div>
        </div>
      )}

      {/* Tabs */}
      <Tabs defaultValue="photo" className="w-full">
        <TabsList className="mb-6 grid h-11 w-full grid-cols-2 rounded-xl bg-secondary p-1">
          <TabsTrigger
            value="photo"
            className="flex items-center gap-2 rounded-lg data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
          >
            <Camera className="size-4" />
            <span className="text-sm font-medium">{t("tab.photoToVideo")}</span>
          </TabsTrigger>
          <TabsTrigger
            value="text"
            className="flex items-center gap-2 rounded-lg data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
          >
            <Type className="size-4" />
            <span className="text-sm font-medium">{t("tab.textToVideo")}</span>
          </TabsTrigger>
        </TabsList>

        <div className="rounded-2xl border border-border bg-card p-6">
          <TabsContent value="photo" className="mt-0">
            <PhotoToVideo />
          </TabsContent>
          <TabsContent value="text" className="mt-0">
            <TextToVideo />
          </TabsContent>
        </div>
      </Tabs>

      {/* Out of Credits */}
      <div className="mt-4 flex justify-center">
        <a
          href="#pricing"
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-primary"
        >
          <Sparkles className="size-3.5" />
          {t("out.credits")}
        </a>
      </div>
    </section>
  )
}
