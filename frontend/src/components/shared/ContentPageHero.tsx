"use client"

import PageHero from "./PageHero"
import { useContentValue } from "@/context/ContentContext"

interface ContentPageHeroProps {
  titleKey: string
  subtitleKey: string
  defaultTitle: string
  defaultSubtitle: string
  breadcrumb?: { label: string; href: string }[]
}

export default function ContentPageHero({
  titleKey,
  subtitleKey,
  defaultTitle,
  defaultSubtitle,
  breadcrumb,
}: ContentPageHeroProps) {
  const title    = useContentValue(titleKey,    defaultTitle)
  const subtitle = useContentValue(subtitleKey, defaultSubtitle)
  return <PageHero title={title} subtitle={subtitle} breadcrumb={breadcrumb} />
}
