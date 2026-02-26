"use client"

import { useState, useCallback } from "react"
import { Upload, ImageIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/lib/i18n"

export function PhotoToVideo() {
  const { t } = useLanguage()
  const [dragActive, setDragActive] = useState(false)
  const [preview, setPreview] = useState<string | null>(null)

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }, [])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    const file = e.dataTransfer.files?.[0]
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader()
      reader.onload = (ev) => setPreview(ev.target?.result as string)
      reader.readAsDataURL(file)
    }
  }, [])

  const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (ev) => setPreview(ev.target?.result as string)
      reader.readAsDataURL(file)
    }
  }, [])

  return (
    <div className="flex flex-col gap-6">
      {/* Upload Area */}
      <div
        className={`relative flex min-h-[260px] cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed transition-all ${
          dragActive
            ? "border-primary bg-primary/5"
            : "border-border hover:border-primary/50 hover:bg-primary/5"
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        onClick={() => document.getElementById("file-upload")?.click()}
        role="button"
        tabIndex={0}
        aria-label={t("upload.title")}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            document.getElementById("file-upload")?.click()
          }
        }}
      >
        <input
          id="file-upload"
          type="file"
          className="hidden"
          accept="image/jpeg,image/png,image/webp"
          onChange={handleFileChange}
        />
        {preview ? (
          <img
            src={preview}
            alt="Uploaded preview"
            className="max-h-[240px] rounded-lg object-contain"
          />
        ) : (
          <div className="flex flex-col items-center gap-3 p-8">
            <div className="flex size-14 items-center justify-center rounded-2xl bg-primary/10">
              {dragActive ? (
                <Upload className="size-6 text-primary" />
              ) : (
                <ImageIcon className="size-6 text-primary" />
              )}
            </div>
            <div className="text-center">
              <p className="text-sm font-medium text-foreground">{t("upload.title")}</p>
              <p className="mt-1 text-xs text-muted-foreground">{t("upload.subtitle")}</p>
            </div>
            <p className="text-xs text-muted-foreground/70">{t("upload.formats")}</p>
          </div>
        )}
      </div>

      {/* Motion Input */}
      <div className="flex flex-col gap-2">
        <label htmlFor="motion-input" className="text-sm font-medium text-foreground">
          {t("motion.label")}
        </label>
        <input
          id="motion-input"
          type="text"
          placeholder={t("motion.placeholder")}
          className="h-10 rounded-lg border border-border bg-secondary px-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
        />
      </div>

      {/* Generate Button */}
      <Button size="lg" className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-medium">
        {t("generate.button")}
      </Button>
    </div>
  )
}
