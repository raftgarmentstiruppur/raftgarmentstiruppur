"use client"

import PageHero from "./PageHero"
import { useContentValue } from "@/context/ContentContext"

interface ContentPageHeroProps {
  titleKey: string
  subtitleKey: string
  defaultTitle: string
  defaultSubtitle: string
  breadcrumb?: { label: string; href: string }[]
  imageKey?: string
  defaultImage?: string
}

export default function ContentPageHero({
  titleKey,
  subtitleKey,
  defaultTitle,
  defaultSubtitle,
  breadcrumb,
  imageKey,
  defaultImage,
}: ContentPageHeroProps) {
  const title    = useContentValue(titleKey,    defaultTitle)
  const subtitle = useContentValue(subtitleKey, defaultSubtitle)
  const bgImage  = useContentValue(imageKey ?? "", "")
  return <PageHero title={title} subtitle={subtitle} breadcrumb={breadcrumb} bgImage={bgImage || defaultImage || undefined} />
}
