"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { SparklesCore } from "@/components/ui/sparkles";
import { Hero } from "@/components/ui/hero-1";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";
import { BlurText } from "@/components/ui/animated-blur-text";
import { StickyScroll } from "@/components/ui/sticky-scroll-reveal";
import { Casestudy5 } from "@/components/ui/casestudy-5";
import {
  ArrowRight,
  Sparkles,
  TrendingUp,
  Users,
  DollarSign,
  Shield,
  Code,
  DollarSign as Dollar,
  Lock,
  CheckCircle2,
} from "lucide-react";
import { HowItWorks } from "@/components/ui/how-it-works";
import { GradientCard } from "@/components/ui/gradient-card";
import { WaitlistDialog } from "@/components/ui/waitlist-dialog";

export default function HomePage() {
  const [waitlistOpen, setWaitlistOpen] = useState(false);
  const [isJoined, setIsJoined] = useState(false);

  // Check localStorage on mount
  useEffect(() => {
    const joined = localStorage.getItem("waitlist_joined") === "true";
    setIsJoined(joined);
  }, []);

  const handleJoined = () => {
    setIsJoined(true);
  };

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
              <a
                href="#features"
                className="text-sm text-gray-300 hover:text-white transition-colors"
              >
                Features
              </a>
              <a
                href="#how-it-works"
                className="text-sm text-gray-300 hover:text-white transition-colors"
              >
                How It Works
              </a>
              <a
                href="#pricing"
                className="text-sm text-gray-300 hover:text-white transition-colors"
              >
                Pricing
              </a>
              <a
                href="https://community-mobile-web.onrender.com/"
                rel="noopener noreferrer"
                className="text-sm text-gray-300 hover:text-white transition-colors"
              >
                Community
              </a>
            </div>

            <div className="flex items-center gap-4">
              {/* <Button
                className={`rounded-full px-6 py-3 text-base ${
                  isJoined 
                    ? 'bg-gray-600 text-gray-300 cursor-not-allowed opacity-60' 
                    : 'bg-white text-black hover:bg-gray-200'
                }`}
                onClick={() => !isJoined && setWaitlistOpen(true)}
                disabled={isJoined}
              >
                {isJoined ? (
                  <span className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4" />
                    You're on the waitlist
                  </span>
                ) : (
                  'Join Our Waitlist'
                )}
              </Button> */}
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
            ctaLabel="Join Our Waitlist"
            ctaHref="https://web.datail.ai"
            target="_self"
            rel="self"
            isJoined={isJoined}
            onOpenWaitlist={() => setWaitlistOpen(true)}
          />
        </div>
      </section>
      {/* </CHANGE> */}

      {/* </CHANGE> */}

      <section className="py-48 px-4 sm:px-6 lg:px-8 bg-black">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6 text-balance">
            Best Time for Data Owners.
          </h2>
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
            <Button
              className={`rounded-full px-6 py-6 text-base ${
                isJoined
                  ? "bg-gray-600 text-gray-300 cursor-not-allowed"
                  : "bg-white text-black hover:bg-gray-200"
              }`}
              onClick={() => !isJoined && setWaitlistOpen(true)}
              disabled={isJoined}
            >
              {isJoined ? (
                <span className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5" />
                  You're on the waitlist
                </span>
              ) : (
                "Join Our Waitlist"
              )}
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

      <section id="pricing" className="py-24 px-4 sm:px-6 lg:px-8 bg-black">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6 text-balance">
            Simple, transparent pricing for data owners.
          </h2>
          <p className="text-xl text-gray-300 mb-12 leading-relaxed">
            One simple subscription. Build unlimited apps, reach billions of
            users, keep 100% of your revenue.
          </p>

          <div className="max-w-md mx-auto mb-12">
            <Card className="p-8 hover:shadow-lg transition-shadow bg-black border-2 border-gray-700">
              <div className="text-sm font-semibold text-gray-400 mb-2">
                SUBSCRIPTION
              </div>
              <div className="text-5xl font-bold text-white mb-2">
                $39<span className="text-sm">/month</span>
              </div>
              <p className="text-base text-gray-300 mb-6">
                Everything you need to turn your data into AI-powered
                businesses.
              </p>
              <div className="space-y-3 text-left mb-6">
                <div className="flex items-start gap-3">
                  <svg
                    className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-sm text-white">
                    Unlimited datasets and apps
                  </span>
                </div>
                <div className="flex items-start gap-3">
                  <svg
                    className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-sm text-white">
                    AI-powered market analysis
                  </span>
                </div>
                <div className="flex items-start gap-3">
                  <svg
                    className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-sm text-white">
                    ChatGPT Store publishing
                  </span>
                </div>
                <div className="flex items-start gap-3">
                  <svg
                    className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-sm text-white">
                    Advanced analytics dashboard
                  </span>
                </div>
                <div className="flex items-start gap-3">
                  <svg
                    className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-sm text-white">Priority support</span>
                </div>
                <div className="flex items-start gap-3">
                  <svg
                    className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-sm text-white font-semibold">
                    Keep 100% of your revenue
                  </span>
                </div>
              </div>
              {/* <Button
                className="w-full bg-white text-black hover:bg-gray-200 rounded-lg py-3"
                onClick={() => setWaitlistOpen(true)}
              >
                Subscribe
              </Button> */}
            </Card>
          </div>
        </div>
      </section>
      {/* </CHANGE> */}

      <section
        id="community"
        className="relative py-64 px-4 sm:px-6 lg:px-8 bg-black overflow-hidden"
      >
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
              <p className="text-sm text-gray-300">
                Where Data Becomes Business
              </p>
            </div>

            <div>
              <div className="text-sm font-semibold text-white mb-3">
                Product
              </div>
              <div className="space-y-2">
                <a
                  href="#"
                  className="block text-sm text-gray-300 hover:text-white transition-colors"
                >
                  Features
                </a>
                <a
                  href="#"
                  className="block text-sm text-gray-300 hover:text-white transition-colors"
                >
                  How It Works
                </a>
                <a
                  href="#"
                  className="block text-sm text-gray-300 hover:text-white transition-colors"
                >
                  Pricing
                </a>
                <a
                  href="#"
                  className="block text-sm text-gray-300 hover:text-white transition-colors"
                >
                  Examples
                </a>
              </div>
            </div>

            <div>
              <div className="text-sm font-semibold text-white mb-3">
                Resources
              </div>
              <div className="space-y-2">
                <a
                  href="#"
                  className="block text-sm text-gray-300 hover:text-white transition-colors"
                >
                  Documentation
                </a>
                <a
                  href="#"
                  className="block text-sm text-gray-300 hover:text-white transition-colors"
                >
                  API Reference
                </a>
                <a
                  href="#"
                  className="block text-sm text-gray-300 hover:text-white transition-colors"
                >
                  Blog
                </a>
                <a
                  href="#"
                  className="block text-sm text-gray-300 hover:text-white transition-colors"
                >
                  Support
                </a>
              </div>
            </div>

            <div>
              <div className="text-sm font-semibold text-white mb-3">
                Company
              </div>
              <div className="space-y-2">
                <a
                  href="#"
                  className="block text-sm text-gray-300 hover:text-white transition-colors"
                >
                  About
                </a>
                <a
                  href="#"
                  className="block text-sm text-gray-300 hover:text-white transition-colors"
                >
                  Privacy
                </a>
                <a
                  href="#"
                  className="block text-sm text-gray-300 hover:text-white transition-colors"
                >
                  Terms
                </a>
                <a
                  href="#"
                  className="block text-sm text-gray-300 hover:text-white transition-colors"
                >
                  Contact
                </a>
              </div>
            </div>
          </div>

          <div className="pt-8 text-center">
            <p className="text-sm text-gray-400">
              © 2025 Datail Technologies. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
      {/* </CHANGE> */}

      <WaitlistDialog
        open={waitlistOpen}
        onOpenChange={setWaitlistOpen}
        onJoined={handleJoined}
      />
    </div>
  );
}
