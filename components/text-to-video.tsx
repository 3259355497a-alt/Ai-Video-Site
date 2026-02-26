"use client"

import { useState } from "react"
import { Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/lib/i18n"

export function TextToVideo() {
  const { t } = useLanguage()
  const [prompt, setPrompt] = useState("")

  const examples = [
    t("example.1"),
    t("example.2"),
    t("example.3"),
  ]

  return (
    <div className="flex flex-col gap-6">
      {/* Text Area */}
      <div className="flex flex-col gap-2">
        <label htmlFor="video-prompt" className="text-sm font-medium text-foreground">
          {t("text.label")}
        </label>
        <textarea
          id="video-prompt"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder={t("text.placeholder")}
          rows={6}
          className="resize-none rounded-xl border border-border bg-secondary px-4 py-3 text-sm leading-relaxed text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
        />
      </div>

      {/* Example Prompts */}
      <div className="flex flex-col gap-3">
        <p className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
          <Sparkles className="size-3.5 text-primary" />
          {t("text.examples")}
        </p>
        <div className="flex flex-wrap gap-2">
          {examples.map((example) => (
            <button
              key={example}
              onClick={() => setPrompt(example)}
              className="rounded-lg border border-border bg-secondary/50 px-3 py-1.5 text-xs text-muted-foreground transition-all hover:border-primary/50 hover:bg-primary/5 hover:text-foreground"
            >
              {example}
            </button>
          ))}
        </div>
      </div>

      {/* Generate Button */}
      <Button size="lg" className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-medium">
        {t("generate.button")}
      </Button>
    </div>
  )
}
