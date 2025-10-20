"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { SparklesCore } from "@/components/ui/sparkles"
import { Hero } from "@/components/ui/hero-1"
import { TextGenerateEffect } from "@/components/ui/text-generate-effect"
import { BlurText } from "@/components/ui/animated-blur-text"
import { StickyScroll } from "@/components/ui/sticky-scroll-reveal"
import { Casestudy5 } from "@/components/ui/casestudy-5"
import { ArrowRight, Sparkles, TrendingUp, Users, DollarSign, Shield, Code, DollarSign as Dollar, Lock } from "lucide-react"
import { HowItWorks } from "@/components/ui/how-it-works"
import { GradientCard } from "@/components/ui/gradient-card"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-black">
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-sm border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-white rounded-md flex items-center justify-center">
                <span className="text-black font-bold text-sm">D</span>
              </div>
              <span className="font-semibold text-lg text-white">Datail</span>
            </div>

            <div className="hidden md:flex items-center gap-8">
              <a href="#features" className="text-sm text-gray-300 hover:text-white transition-colors">
                Features
              </a>
              <a href="#how-it-works" className="text-sm text-gray-300 hover:text-white transition-colors">
                How It Works
              </a>
              <a href="#pricing" className="text-sm text-gray-300 hover:text-white transition-colors">
                Pricing
              </a>
              <a href="#vision" className="text-sm text-gray-300 hover:text-white transition-colors">
                Vision
              </a>
            </div>

            <div className="flex items-center gap-4">
              <Button variant="ghost" className="text-sm text-gray-300 hover:text-white">
                Sign In
              </Button>
              <Button className="bg-white text-black hover:bg-gray-200 rounded-full text-sm px-5">Get Started</Button>
            </div>
          </div>
        </div>
      </nav>
      {/* </CHANGE> */}

      <section className="pt-32 pb-32 px-4 sm:px-6 lg:px-8">
        <div className="min-h-[60vh]">
          <Hero
            title="Your Data + Datail = Your AI-Powered Business"
            subtitle="Datail transforms your datasets into ChatGPT-native Apps — AI-powered businesses that unlock and monetize your data across billions of ChatGPT users."
            ctaLabel="Build Your App"
            ctaHref="#"
          />
        </div>
      </section>
      {/* </CHANGE> */}

    
    
      {/* </CHANGE> */}

      <section className="py-48 px-4 sm:px-6 lg:px-8 bg-black">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6 text-balance">Best Time for Data Owners.</h2>
          <div className="mb-8">
            <TextGenerateEffect
              duration={1.2}
              filter={false}
              className="font-normal text-gray-300"
              words={`The AI revolution has created the biggest opportunity for data owners in history — to build their own AI-powered businesses. ChatGPT, Claude, Gemini — every AI platform is powerful, but incomplete. They know language, not your data.`}
            />
          </div>
          <div className="mb-8">
            <TextGenerateEffect
              duration={1.2}
              filter={false}
              className="font-normal text-gray-300"
              // delay start roughly after first finishes: words * 0.2s + base duration
              startDelay={1.2 + 34 * 0.2}
              words={`Every day, billions of users ask questions those AIs can't fully answer — because the real intelligence still lives inside your spreadsheets, APIs, and databases.`}
            />
          </div>
          <div>
            <TextGenerateEffect
              duration={1.2}
              filter={false}
              className="font-bold text-white"
              startDelay={14.2}
              words={`Datail bridges that gap, helping you turn your datasets into AI Apps that serve this new global audience.`}
            />
          </div>
          <div className="mt-8">
            <Button className="bg-white text-black hover:bg-gray-200 rounded-full px-6 py-6 text-base">
              Turn My Data into an App
            </Button>
          </div>
        </div>
      </section>
      {/* </CHANGE> */}


      <HowItWorks className="bg-black" />
      {/* </CHANGE> */}

      <section className="py-48 px-4 sm:px-6 lg:px-8 bg-black">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
              Why choose Datail?
            </h2>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="h-[450px]">
              <GradientCard
                title="No code. No pitch decks. No waiting."
                description="With Datail, data owners become entrepreneurs. Build your own AI apps in hours, get automatic market insights and app design, and launch directly into ChatGPT's global app marketplace."
                icon={<Code className="w-5 h-5" />}
              />
            </div>
            <div className="h-[450px]">
              <GradientCard
                title="Simple, transparent pricing for data owners."
                description="One simple subscription. Build unlimited apps, reach billions of users, keep 100% of your revenue."
                icon={<Dollar className="w-5 h-5" />}
              />
            </div>
            <div className="h-[450px]">
              <GradientCard
                title="Secure, verified, and always yours."
                description="We never sell, share, or replicate your data. Each dataset is verified for quality, authenticity, and privacy — giving AIs (and users) full confidence in the source. You stay the owner. Always."
                icon={<Lock className="w-5 h-5" />}
              />
            </div>
          </div>
        </div>
      </section>
      {/* </CHANGE> */}

      <section id="vision" className="relative py-64 px-4 sm:px-6 lg:px-8 bg-black overflow-hidden">
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <BlurText
            text="In the AI era, creators are data owners."
            delay={150}
            animateBy="words"
            direction="top"
            className="text-5xl sm:text-6xl font-bold text-white mb-8 leading-tight text-balance"
          />
          <BlurText
            text="The next frontier of entrepreneurship isn't apps or code — it's data."
            delay={200}
            animateBy="words"
            direction="bottom"
            className="text-2xl text-gray-300 mb-6 leading-relaxed"
          />
          <BlurText
            text="ChatGPT has given humanity a universal interface. Datail gives data owners a universal opportunity."
            delay={250}
            animateBy="words"
            direction="bottom"
            className="text-2xl text-gray-300 mb-6 leading-relaxed"
          />
          <BlurText
            text="Own Data = Own AI-Powered Business"
            delay={300}
            animateBy="words"
            direction="top"
            className="text-3xl font-bold text-white mb-12"
          />
         
        </div>
      </section>
      {/* </CHANGE> */}

      <footer className="py-12 px-4 sm:px-6 lg:px-8 bg-black border-t border-gray-700">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-white rounded-md flex items-center justify-center">
                  <span className="text-black font-bold text-sm">D</span>
                </div>
                <span className="font-semibold text-lg text-white">Datail</span>
              </div>
              <p className="text-sm text-gray-300">Where Data Becomes Business</p>
            </div>

            <div>
              <div className="text-sm font-semibold text-white mb-3">Product</div>
              <div className="space-y-2">
                <a href="#" className="block text-sm text-gray-300 hover:text-white transition-colors">
                  Features
                </a>
                <a href="#" className="block text-sm text-gray-300 hover:text-white transition-colors">
                  How It Works
                </a>
                <a href="#" className="block text-sm text-gray-300 hover:text-white transition-colors">
                  Pricing
                </a>
                <a href="#" className="block text-sm text-gray-300 hover:text-white transition-colors">
                  Examples
                </a>
              </div>
            </div>

            <div>
              <div className="text-sm font-semibold text-white mb-3">Resources</div>
              <div className="space-y-2">
                <a href="#" className="block text-sm text-gray-300 hover:text-white transition-colors">
                  Documentation
                </a>
                <a href="#" className="block text-sm text-gray-300 hover:text-white transition-colors">
                  API Reference
                </a>
                <a href="#" className="block text-sm text-gray-300 hover:text-white transition-colors">
                  Blog
                </a>
                <a href="#" className="block text-sm text-gray-300 hover:text-white transition-colors">
                  Support
                </a>
              </div>
            </div>

            <div>
              <div className="text-sm font-semibold text-white mb-3">Company</div>
              <div className="space-y-2">
                <a href="#" className="block text-sm text-gray-300 hover:text-white transition-colors">
                  About
                </a>
                <a href="#" className="block text-sm text-gray-300 hover:text-white transition-colors">
                  Privacy
                </a>
                <a href="#" className="block text-sm text-gray-300 hover:text-white transition-colors">
                  Terms
                </a>
                <a href="#" className="block text-sm text-gray-300 hover:text-white transition-colors">
                  Contact
                </a>
              </div>
            </div>
          </div>

          <div className="pt-8 text-center">
            <p className="text-sm text-gray-400">© 2025 Datail Technologies. All rights reserved.</p>
          </div>
        </div>
      </footer>
      {/* </CHANGE> */}
    </div>
  )
}
