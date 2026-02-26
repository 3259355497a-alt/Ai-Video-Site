"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

type Lang = "en" | "zh"

interface Translations {
  [key: string]: { en: string; zh: string }
}

const translations: Translations = {
  "nav.pricing": { en: "Pricing", zh: "定价" },
  "nav.faq": { en: "FAQ", zh: "常见问题" },
  "credits": { en: "Credits", zh: "积分" },
  "tab.photoToVideo": { en: "Photo to Video", zh: "图片转视频" },
  "tab.textToVideo": { en: "Text to Video", zh: "文字转视频" },
  "upload.title": { en: "Upload your image", zh: "上传你的图片" },
  "upload.subtitle": { en: "Drag and drop or click to browse", zh: "拖放或点击浏览" },
  "upload.formats": { en: "Supports JPG, PNG, WebP (max 10MB)", zh: "支持 JPG, PNG, WebP (最大 10MB)" },
  "motion.label": { en: "How to move? (optional)", zh: "如何运动？（可选）" },
  "motion.placeholder": { en: "e.g. zoom in slowly, pan left to right, gentle breeze effect...", zh: "例如：缓慢放大，从左向右平移，微风效果..." },
  "generate.button": { en: "Generate Video (1 credit)", zh: "生成视频（1积分）" },
  "text.label": { en: "Describe your video", zh: "描述你的视频" },
  "text.placeholder": { en: "Describe the video you want to create in detail...", zh: "详细描述你想创建的视频..." },
  "text.examples": { en: "Example prompts:", zh: "示例提示：" },
  "example.1": { en: "A golden sunset over the ocean with gentle waves", zh: "金色的海上落日，伴有温柔的波浪" },
  "example.2": { en: "A futuristic city at night with flying cars", zh: "未来之城的夜景，有飞行汽车" },
  "example.3": { en: "A slow-motion macro shot of coffee being poured", zh: "慢动作微距拍摄咖啡倒入的过程" },
  "free.trial": { en: "Free trial: 1 credit", zh: "免费试用：1积分" },
  "out.credits": { en: "Out of credits? Buy more", zh: "积分用完了？购买更多" },
  "pricing.title": { en: "Get More Credits", zh: "获取更多积分" },
  "pricing.subtitle": { en: "Choose the plan that works best for you", zh: "选择最适合你的方案" },
  "pricing.starter": { en: "Starter", zh: "入门版" },
  "pricing.popular": { en: "Popular", zh: "热门版" },
  "pricing.pro": { en: "Pro", zh: "专业版" },
  "pricing.max": { en: "Max", zh: "旗舰版" },
  "pricing.credits": { en: "credits", zh: "积分" },
  "pricing.bonus": { en: "bonus", zh: "赠送" },
  "pricing.buy": { en: "Buy Now", zh: "立即购买" },
  "faq.title": { en: "Frequently Asked Questions", zh: "常见问题" },
  "faq.refund.title": { en: "Refund Policy", zh: "退款政策" },
  "faq.free": { en: "Free trial: 1 credit for new users (one-time only)", zh: "免费试用：新用户1积分（仅限一次）" },
  "faq.unused": { en: "Unused credits: Full refund within 7 days", zh: "未使用积分：7天内全额退款" },
  "faq.used": { en: "Used credits: Non-refundable", zh: "已使用积分：不可退款" },
  "faq.failed": { en: "Failed generations: Auto retry, no credit deducted", zh: "生成失败：自动重试，不扣积分" },
  "footer.expire": { en: "Credits never expire", zh: "积分永不过期" },
  "footer.secure": { en: "Secure payment", zh: "安全支付" },
  "footer.support": { en: "24/7 support", zh: "全天候支持" },
}

const LanguageContext = createContext<{
  lang: Lang
  setLang: (lang: Lang) => void
  t: (key: string) => string
}>({
  lang: "en",
  setLang: () => {},
  t: (key: string) => key,
})

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>("en")

  const t = (key: string): string => {
    return translations[key]?.[lang] ?? key
  }

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  return useContext(LanguageContext)
}
