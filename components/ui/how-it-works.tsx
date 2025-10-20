"use client"

import { cn } from "@/lib/utils"
import { SparklesCore } from "@/components/ui/sparkles"
import { Database, Rocket, Wand2, Zap } from "lucide-react"
import type React from "react"

interface HowItWorksProps extends React.HTMLAttributes<HTMLElement> {}

interface StepCardProps {
  icon: React.ReactNode
  title: string
  description: string
  benefits: string[]
}

const StepCard: React.FC<StepCardProps> = ({
  icon,
  title,
  description,
  benefits,
}) => (
  <div
    className={cn(
      "relative rounded-2xl border bg-card p-6 text-card-foreground transition-all duration-300 ease-in-out",
      "hover:scale-105 hover:shadow-lg hover:border-primary/50 hover:bg-muted"
    )}
  >
    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-muted text-primary">
      {icon}
    </div>
    <h3 className="mb-2 text-xl font-semibold">{title}</h3>
    <p className="mb-6 text-muted-foreground">{description}</p>
    <ul className="space-y-3">
      {benefits.map((benefit, index) => (
        <li key={index} className="flex items-center gap-3">
          <div className="flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full bg-primary/20">
            <div className="h-2 w-2 rounded-full bg-primary" />
          </div>
          <span className="text-muted-foreground">{benefit}</span>
        </li>
      ))}
    </ul>
  </div>
)

export const HowItWorks: React.FC<HowItWorksProps> = ({ className, ...props }) => {
  const stepsData = [
    {
      icon: <Database className="h-6 w-6" />,
      title: "Upload your data",
      description:
        "Datail currently supports datasets hosted on Supabase — automatically validating their quality, structure, and freshness. Soon, you’ll also be able to connect Google Sheets, CSV files, and Airtable — making your data instantly ready for the AI economy.",
      benefits: [
        "Automatic schema and freshness checks",
        "Support for Supabase today, Sheets/CSV/Airtable soon",
        "Instant readiness for AI apps",
      ],
    },
    {
      icon: <Wand2 className="h-6 w-6" />,
      title: "Unleash business power",
      description:
        "Let Datail’s AI team analyze your dataset’s market size, ideal users, pricing strategy, and use-case opportunities — revealing where your data can create the most value.",
      benefits: [
        "Market sizing and opportunity mapping",
        "Ideal customer and pricing insights",
        "Use-case discovery for maximum ROI",
      ],
    },
    {
      icon: <Zap className="h-6 w-6" />,
      title: "Build ChatGPT Apps",
      description:
        "Generate one or multiple ChatGPT‑native Apps, preloaded with business logic and UI templates. No code required.",
      benefits: [
        "Auto‑generated app logic and UI",
        "Multiple apps from one dataset",
        "No‑code workflow",
      ],
    },
    {
      icon: <Rocket className="h-6 w-6" />,
      title: "Publish, promote, monetize",
      description:
        "Deploy instantly inside the ChatGPT ecosystem — where over 1 billion people can discover and use your app. Start earning from day one.",
      benefits: [
        "Immediate distribution in ChatGPT",
        "Built‑in discovery and reach",
        "Monetize from launch",
      ],
    },
  ]

  return (
    <section
      id="how-it-works"
      className={cn("w-full bg-background py-32 sm:py-48", className)}
      {...props}
    >
      <div className="container mx-auto px-4">
        <div className="relative mx-auto mb-16 max-w-4xl text-center">
          <div className="relative inline-block">
            <h2 className="relative z-10 text-4xl font-bold tracking-tight text-foreground sm:text-4xl">
              Fastest Way From dataset to ChatGPT App
            </h2>
            <div className="pointer-events-none absolute inset-0 -z-0">
              <SparklesCore
                background="transparent"
                minSize={0.3}
                maxSize={1.5}
                particleDensity={400}
                className="h-32 w-full"
                particleColor="#818cf8"
                speed={1.2}
              />
            </div>
          </div>
        </div>

        <div className="relative mx-auto mb-8 w-full max-w-5xl">
          <div
            aria-hidden="true"
            className="absolute left-[12.5%] top-1/2 h-0.5 w-[75%] -translate-y-1/2 bg-border"
          />
          <div className="relative grid grid-cols-4">
            {stepsData.map((_, index) => (
              <div
                key={index}
                className="flex h-8 w-8 items-center justify-center justify-self-center rounded-full bg-muted font-semibold text-foreground ring-4 ring-background"
              >
                {index + 1}
              </div>
            ))}
          </div>
        </div>

        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 md:grid-cols-4">
          {stepsData.map((step, index) => (
            <StepCard
              key={index}
              icon={step.icon}
              title={step.title}
              description={step.description}
              benefits={step.benefits}
            />
          ))}
        </div>
      </div>
    </section>
  )
}


