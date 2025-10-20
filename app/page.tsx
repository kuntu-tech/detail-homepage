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

      <section className="pt-32 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="min-h-[60vh]">
          <Hero
            title="Your Data + Datail = Your AI-Powered Business."
            subtitle="Datail transforms your datasets into ChatGPT-native Apps — AI-powered businesses that unlock and monetize your data across billions of ChatGPT users."
            ctaLabel="Build Your App"
            ctaHref="#"
          />
        </div>
      </section>
      {/* </CHANGE> */}

    
    
      {/* </CHANGE> */}

      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-black">
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


      <section id="how-it-works" className="py-24 px-4 sm:px-6 lg:px-8 bg-black">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
              Fastest Way From dataset to ChatGPT App
            </h2>
          </div>

          {/* Step 1 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">
            <div>
              <div className="inline-block bg-black text-white text-sm font-semibold px-3 py-1 rounded-full mb-4">
                Step 1
              </div>
              <h3 className="text-3xl sm:text-4xl font-bold text-white mb-6 text-balance">Upload your data</h3>
              <p className="text-xl text-gray-300 leading-relaxed mb-6">
                Datail currently supports datasets hosted on Supabase — automatically validating their quality,
                structure, and freshness. Soon, you’ll also be able to connect Google Sheets, CSV files, and Airtable —
                making your data instantly ready for the AI economy..
              </p>
              <a href="#" className="text-white font-semibold inline-flex items-center hover:gap-2 transition-all">
                Learn about data validation <ArrowRight className="ml-1 h-4 w-4" />
              </a>
            </div>

            <div className="bg-gradient-to-br from-gray-200 to-gray-300 rounded-2xl p-8 aspect-square flex items-center justify-center">
              <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                      />
                    </svg>
                  </div>
                  <p className="text-gray-700 font-medium mb-2">Drop your dataset here</p>
                  <p className="text-sm text-gray-500">CSV, JSON, or connect your database</p>
                </div>
                <div className="mt-4 space-y-2">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <div className="w-4 h-4 rounded-full bg-green-500 flex items-center justify-center">
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <span>Quality validation</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <div className="w-4 h-4 rounded-full bg-green-500 flex items-center justify-center">
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <span>Structure analysis</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <div className="w-4 h-4 rounded-full bg-green-500 flex items-center justify-center">
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <span>Privacy compliance</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Step 2 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">
            <div>
              <div className="bg-gradient-to-br from-gray-200 to-gray-300 rounded-2xl p-8 aspect-square flex items-center justify-center">
                <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
                  <div className="flex items-center gap-2 mb-4 pb-3 border-b border-gray-200">
                    <Sparkles className="h-5 w-5 text-purple-600" />
                    <span className="font-semibold text-gray-900">McKinsey-Level AI Analyst</span>
                  </div>
                  <div className="space-y-4">
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                      <div className="text-xs text-blue-600 font-semibold mb-1">MARKET ANALYSIS</div>
                      <div className="text-sm text-gray-800">
                        Your housing data targets <span className="font-semibold">2.4M real estate professionals</span>{" "}
                        in a market growing <span className="font-semibold text-green-600">13% annually</span>.
                      </div>
                    </div>
                    <div className="bg-purple-50 border border-purple-200 rounded-lg p-3">
                      <div className="text-xs text-purple-600 font-semibold mb-1">PRICING STRATEGY</div>
                      <div className="text-sm text-gray-800">
                        Recommended: <span className="font-semibold">$0.10/query</span> or{" "}
                        <span className="font-semibold">$99/month</span> subscription
                      </div>
                    </div>
                    <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                      <div className="text-xs text-green-600 font-semibold mb-1">REVENUE PROJECTION</div>
                      <div className="text-sm text-gray-800">
                        Estimated <span className="font-semibold">$8,000/month</span> at 10% market penetration
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <div className="inline-block bg-black text-white text-sm font-semibold px-3 py-1 rounded-full mb-4">
                Step 2
              </div>
              <h3 className="text-3xl sm:text-4xl font-bold text-white mb-6 text-balance">
                Unleash the Full Business Power of Your Data
              </h3>
              <p className="text-xl text-gray-300 leading-relaxed mb-6">
                Let Datail’s “McKinsey-level” AI team unlock the full business potential of your data. We analyze your
                dataset��s market size, ideal users, pricing strategy, and use-case opportunities — revealing where your
                data can create the most value.
              </p>
              <a href="#" className="text-white font-semibold inline-flex items-center hover:gap-2 transition-all">
                Learn about AI market analysis <ArrowRight className="ml-1 h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Step 3 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">
            <div>
              <div className="inline-block bg-black text-white text-sm font-semibold px-3 py-1 rounded-full mb-4">
                Step 3
              </div>
              <h3 className="text-3xl sm:text-4xl font-bold text-white mb-6 text-balance">Build ChatGPT Apps</h3>
              <p className="text-xl text-gray-300 leading-relaxed mb-6">
                Generate one or multiple ChatGPT-native Apps, preloaded with business logic and UI templates. No code
                required.
              </p>
              <a href="#" className="text-white font-semibold inline-flex items-center hover:gap-2 transition-all">
                See example apps <ArrowRight className="ml-1 h-4 w-4" />
              </a>
            </div>

            <div className="bg-gradient-to-br from-gray-200 to-gray-300 rounded-2xl p-8 aspect-square flex items-center justify-center">
              <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
                <div className="mb-4">
                  <div className="text-sm font-semibold text-gray-900 mb-2">Generated ChatGPT App</div>
                  <div className="text-xs text-gray-500">HousingInsight Pro</div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-blue-500 flex-shrink-0" />
                    <div className="flex-1">
                      <div className="bg-gray-100 rounded-lg p-3 text-sm text-gray-700">
                        @HousingInsight show me average prices in San Francisco
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex-shrink-0 flex items-center justify-center">
                      <Sparkles className="h-4 w-4 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 text-sm text-gray-800">
                        <p className="mb-2">
                          Average home price in San Francisco:{" "}
                          <span className="font-semibold text-blue-600">$1.2M</span>
                        </p>
                        <p className="text-gray-600 text-xs">
                          Based on 15,000 listings • Updated 2 hours ago • 3 bed avg: $1.4M
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-3 text-xs text-gray-600 text-center">
                    Powered by your housing_prices.csv dataset
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Step 4 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1">
              <div className="bg-gradient-to-br from-gray-200 to-gray-300 rounded-2xl p-8 aspect-square flex items-center justify-center">
                <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
                  <div className="text-center mb-6">
                    <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center mx-auto mb-3">
                      <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <div className="text-lg font-bold text-gray-900 mb-1">App Published!</div>
                    <div className="text-sm text-gray-600">Now live in ChatGPT Store</div>
                  </div>

                  <div className="space-y-3 mb-4">
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <span className="text-sm text-gray-600">Total Queries</span>
                      <span className="text-lg font-bold text-gray-900">1,247</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <span className="text-sm text-gray-600">Active Users</span>
                      <span className="text-lg font-bold text-gray-900">342</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-200">
                      <span className="text-sm text-gray-600">Revenue (30d)</span>
                      <span className="text-lg font-bold text-green-600">$2,847</span>
                    </div>
                  </div>

                  <Button className="w-full bg-black text-white hover:bg-gray-800 rounded-lg">
                    View Analytics Dashboard
                  </Button>
                </div>
              </div>
            </div>

            <div className="order-1 lg:order-2">
              <div className="inline-block bg-black text-white text-sm font-semibold px-3 py-1 rounded-full mb-4">
                Step 4
              </div>
              <h3 className="text-3xl sm:text-4xl font-bold text-white mb-6 text-balance">
                Publish,Promote monetize
              </h3>
              <p className="text-xl text-gray-300 leading-relaxed mb-6">
                Deploy instantly inside the ChatGPT ecosystem — where over 1 billion people can discover and use your
                app. Start earning from day one.
              </p>
              <a href="#" className="text-white font-semibold inline-flex items-center hover:gap-2 transition-all">
                Learn about monetization <ArrowRight className="ml-1 h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </section>
      {/* </CHANGE> */}

      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-black">
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
                cta="Start Building Now"
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

      <section id="vision" className="relative py-32 px-4 sm:px-6 lg:px-8 bg-black overflow-hidden">
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
          <Button className="bg-white text-black hover:bg-gray-200 rounded-full px-8 py-6 text-base">
            Start Build Your AI Data Business
          </Button>
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

          <div className="pt-8 border-t border-gray-700 text-center">
            <p className="text-sm text-gray-400">© 2025 Datail Technologies. All rights reserved.</p>
          </div>
        </div>
      </footer>
      {/* </CHANGE> */}
    </div>
  )
}
