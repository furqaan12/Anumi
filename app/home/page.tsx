'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';

import { BackgroundGradientAnimation } from '@/components/ui/background-gradient-animation';
import { BrainIcon, EnergyIcon, HappyIcon, HeartCheckIcon, HealthIcon, SleepingIcon } from "hugeicons-react";

export default function Home() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  useEffect(() => {
    let ticking = false;
    const updateProgress = () => {
      const scrollY = window.scrollY;
      const heroEl = document.getElementById('hero');
      const heroHeight = heroEl ? heroEl.offsetHeight : window.innerHeight;
      const transitionHeight = heroHeight * 0.6; // Faster transition over 60% of hero height
      const progress = Math.min(scrollY / transitionHeight, 1);
      setScrollProgress(progress);
      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(updateProgress);
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    updateProgress();
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div
      className={`relative w-full min-h-screen overflow-x-clip ${scrollProgress > 0.3 ? 'light-mode' : ''}`}
      style={{
        backgroundColor: `rgb(${Math.round(254 * scrollProgress)}, ${Math.round(225 * scrollProgress)}, ${Math.round(211 * scrollProgress)})`
      }}
    >
      {/* Hero Section */}
      <div id="hero">
        <BackgroundGradientAnimation
          className="hero-section"
          gradientBackgroundStart={`rgba(${Math.round(254 * scrollProgress)}, ${Math.round(225 * scrollProgress)}, ${Math.round(211 * scrollProgress)}, 1)`}
          gradientBackgroundEnd={`rgba(${Math.round(254 * scrollProgress)}, ${Math.round(225 * scrollProgress)}, ${Math.round(211 * scrollProgress)}, 1)`}
          firstColor="255, 200, 100"
          secondColor="255, 110, 64"
          thirdColor="252, 160, 100"
          fourthColor="200, 70, 30"
          fifthColor="160, 40, 20"
          pointerColor="255, 180, 100"
          size="200%"
          interactive={false}
        >
          <div className="absolute z-50 inset-0 flex flex-col items-center justify-center px-6 text-center pointer-events-none">
            <div className="relative z-10 pointer-events-auto">
              <h1 className="font-alegreya text-3xl  leading-[1.2] tracking-tight text-white md:text-5xl lg:text-6xl xl:text-7xl">
                India, it’s time to regulate
                <br />
                <span className="text-white">
                  your nervous system.
                </span>
              </h1>

              <p className="mt-12 max-w-3xl font-inter text-xl leading-relaxed text-white md:text-2xl mx-auto">
                Modern breathwork and nervous system practices
                <br />
                for calmer, healthier living.
              </p>

              <div className="mt-16 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-center">
                <button className="group relative overflow-hidden rounded-full bg-[#ff6e40] px-14 py-5 font-inter text-base font-bold tracking-widest text-white transition-all duration-300 hover:bg-[#ff5722] hover:shadow-[0_0_20px_rgba(255,110,64,0.3)] cursor-pointer">
                  <span className="relative z-10">EXPLORE SESSIONS</span>
                </button>

                <div className="hidden sm:block px-6 text-white/30 font-bold">|</div>

                <button className="group relative overflow-hidden rounded-full bg-[#ff6e40] px-14 py-5 font-inter text-base font-bold tracking-widest text-white transition-all duration-300 hover:bg-[#ff5722] cursor-pointer">
                  <span className="relative z-10">WHY THIS HELPS</span>
                </button>
              </div>
            </div>
          </div>
        </BackgroundGradientAnimation>
      </div>
      <div className="section-separator" />

      {/* What This Is */}
      <section id="what" className="relative z-10 px-4 py-16 md:px-6 md:py-32">
        <div className="gradient-blob gradient-blob-middle-right">
          <Image src="/s.webp" alt="" fill className="object-contain" />
        </div>

        <div className="mx-auto max-w-6xl">
          <h2 className="font-alegreya text-4xl font-bold text-[#fef5ed] md:text-6xl lg:text-7xl">
            What is Modern Breathwork?
          </h2>

          <div className="mt-20">
            <div className="space-y-8 font-inter text-base md:text-lg leading-relaxed text-[#fcd19f] md:text-xl">
              <p>
                Modern breathwork combines ancient breathing techniques with contemporary neuroscience to help you regulate your nervous system, reduce stress, and enhance mental clarity.
              </p>
              <p>
                Through conscious breathing patterns, we activate your parasympathetic nervous system—shifting your body from fight-or-flight mode into a state of rest, digest, and heal.
              </p>
              <p className="text-[#fab76a]">
                It’s not just about breathing. It’s about rewiring your relationship with stress.
              </p>
            </div>
          </div>
        </div>
      </section>
      <div className="section-separator" />

      {/* Benefits Section */}
      <section id="benefits" className="relative z-10 px-4 py-16 md:px-6 md:py-32">
        <div className="gradient-blob gradient-blob-middle-left">
          <Image src="/s (1).webp" alt="" fill className="object-contain" />
        </div>

        <div className="mx-auto max-w-6xl">
          <h2 className="font-alegreya text-4xl font-bold text-[#fef5ed] md:text-6xl lg:text-7xl">
            Benefits
          </h2>

          <div className="mt-20 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: 'Reduced Stress & Anxiety',
                description: 'Lower cortisol levels and activate your parasympathetic nervous system for deep, lasting calm',
                icon: HappyIcon
              },
              {
                title: 'Improved Focus',
                description: 'Enhanced mental clarity and cognitive performance through optimized oxygen delivery',
                icon: BrainIcon
              },
              {
                title: 'Emotional Regulation',
                description: 'Process and release stored emotions, building resilience and emotional intelligence',
                icon: HeartCheckIcon
              },
              {
                title: 'Better Sleep Quality',
                description: 'Fall asleep faster and experience deeper, more restorative sleep cycles',
                icon: SleepingIcon
              },
              {
                title: 'Increased Energy',
                description: 'Natural, sustained energy without relying on caffeine or stimulants',
                icon: EnergyIcon
              },
              {
                title: 'Enhanced Immunity',
                description: 'Strengthen your immune system and overall physical resilience',
                icon: HealthIcon
              }
            ].map((benefit, index) => (
              <div
                key={index}
                className="group relative overflow-hidden rounded-2xl border border-[#9a4a17] bg-gradient-to-br from-[#0a0604] to-[#1a0f0a] p-6 md:p-8 transition-all duration-500 hover:border-[#f89b3f]"
              >
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#f89b3f]/5 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                <div className="relative z-10">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-[#f89b3f]/10 to-[#ff6e40]/10">
                    <benefit.icon size={32} color="#fef5ed" />
                  </div>

                  <h3 className="font-alegreya text-2xl font-bold text-[#fef5ed]">
                    {benefit.title}
                  </h3>

                  <p className="mt-4 font-inter text-base leading-relaxed text-[#fcd19f]">
                    {benefit.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <div className="section-separator" />

      {/* How it Works Section */}
      <section id="how-it-works" className="relative z-10 px-4 py-16 md:px-6 md:py-32">
        <div className="gradient-blob gradient-blob-middle-right">
          <Image src="/s.webp" alt="" fill className="object-contain" />
        </div>

        <div className="mx-auto max-w-6xl">
          <h2 className="font-alegreya text-4xl font-bold text-[#fef5ed] md:text-6xl lg:text-7xl">
            How it Works
          </h2>

          <div className="mt-20 space-y-12">
            {[
              {
                number: '01',
                title: 'Book Your Session',
                description: 'Choose between our Tuesday evening wind-down or Sunday morning reset sessions. Both are 60 minutes and conducted online.'
              },
              {
                number: '02',
                title: 'Prepare Your Space',
                description: 'Find a quiet, comfortable spot where you won’t be disturbed. Wear comfortable clothes. Have water nearby.'
              },
              {
                number: '03',
                title: 'Experience the Practice',
                description: 'Join the live session via Zoom. Follow along with guided breathwork, meditation, and nervous system regulation techniques.'
              },
              {
                number: '04',
                title: 'Integrate Daily',
                description: 'Practice the techniques between sessions. Notice the shifts in your stress levels, sleep quality, and overall wellbeing.'
              }
            ].map((step, index) => (
              <div
                key={index}
                className="group relative flex flex-col md:flex-row gap-4 md:gap-8 rounded-2xl border border-[#9a4a17] bg-gradient-to-br from-[#0a0604] to-[#1a0f0a] p-6 md:p-8 transition-all duration-500 hover:border-[#f89b3f]"
              >
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#f89b3f]/5 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                <div className="relative z-10 flex-shrink-0">
                  <div className="flex h-20 w-20 items-center justify-center rounded-full border-2 border-[#f89b3f] bg-gradient-to-br from-[#f89b3f]/10 to-transparent">
                    <span className="font-alegreya text-3xl font-bold text-[#f89b3f]">
                      {step.number}
                    </span>
                  </div>
                </div>

                <div className="relative z-10">
                  <h3 className="font-alegreya text-2xl md:text-3xl font-bold text-[#fef5ed]">
                    {step.title}
                  </h3>

                  <p className="mt-4 font-inter text-base md:text-lg leading-relaxed text-[#fcd19f]">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <div className="section-separator" />

      {/* Sessions */}
      <section id="sessions" className="relative z-10 px-4 py-16 md:px-6 md:py-32">
        <div className="mx-auto max-w-6xl">
          <h2 className="font-alegreya text-4xl font-bold text-[#fef5ed] md:text-6xl lg:text-7xl">
            Upcoming Sessions
          </h2>

          <div className="mt-20 flex flex-col lg:flex-row lg:gap-8 items-start">
            <div className="group relative overflow-hidden rounded-3xl border-2 border-[#9a4a17] bg-gradient-to-br from-[#0a0604] to-[#1a0f0a] p-6 md:p-10 backdrop-blur-sm transition-all duration-500 hover:border-[#f89b3f] flex-1">
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-[#f89b3f]/5 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

              <div className="relative z-10">
                <div className="mb-6 inline-block">
                  <div className="h-16 w-16 rounded-full bg-gradient-to-br from-[#f89b3f] to-[#ff6e40] opacity-20" />
                </div>

                <h3 className="font-alegreya text-2xl md:text-3xl lg:text-4xl font-bold text-[#fef5ed]">
                  Tuesday Wind Down
                </h3>

                <p className="mt-4 font-inter text-sm font-medium tracking-wider text-[#fab76a]">
                  7:00 PM IST · 60 minutes
                </p>

                <p className="mt-8 font-inter text-base md:text-lg leading-relaxed text-[#fcd19f]">
                  Release the accumulated stress of the week. Guided breathwork and somatic practices to help you transition from work mode to deep rest.
                </p>

                <button className="mt-8 rounded-full bg-[#f89b3f] px-6 sm:px-8 md:px-10 py-3 sm:py-4 font-inter text-sm font-bold tracking-wider text-white transition-all duration-300 hover:bg-[#e97d1f] hover:shadow-[0_0_20px_rgba(248,155,63,0.3)]">
                  BOOK NOW
                </button>

                <div className="mt-8 h-1 w-20 rounded-full bg-gradient-to-r from-[#f89b3f] to-[#ff6e40]" />
              </div>
            </div>

            <div className="hidden lg:flex flex-col justify-center px-4">
              <div className="w-px h-full bg-gradient-to-b from-transparent via-white/10 to-transparent"></div>
            </div>

            <div className="group relative overflow-hidden rounded-3xl border-2 border-[#9a4a17] bg-gradient-to-br from-[#0a0604] to-[#1a0f0a] p-6 md:p-10 backdrop-blur-sm transition-all duration-500 hover:border-[#f89b3f] flex-1">
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-[#f89b3f]/5 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

              <div className="relative z-10">
                <div className="mb-6 inline-block">
                  <div className="h-16 w-16 rounded-full bg-gradient-to-br from-[#ff6e40] to-[#f89b3f] opacity-20" />
                </div>

                <h3 className="font-alegreya text-2xl md:text-3xl lg:text-4xl font-bold text-[#fef5ed]">
                  Sunday Reset
                </h3>

                <p className="mt-4 font-inter text-sm font-medium tracking-wider text-[#fab76a]">
                  10:00 AM IST · 60 minutes
                </p>

                <p className="mt-8 font-inter text-base md:text-lg leading-relaxed text-[#fcd19f]">
                  Begin your week from a place of groundedness. Meditation and nervous system regulation to cultivate lasting calm and mental clarity.
                </p>

                <button className="mt-8 rounded-full bg-[#f89b3f] px-6 sm:px-8 md:px-10 py-3 sm:py-4 font-inter text-sm font-bold tracking-wider text-white transition-all duration-300 hover:bg-[#e97d1f] hover:shadow-[0_0_20px_rgba(248,155,63,0.3)]">
                  BOOK NOW
                </button>

                <div className="mt-8 h-1 w-20 rounded-full bg-gradient-to-r from-[#ff6e40] to-[#f89b3f]" />
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="section-separator" />

      {/* Meet Your Guide Section */}
      <section id="guide" className="relative z-10 px-4 py-16 md:px-6 md:py-32">
        <div className="gradient-blob gradient-blob-middle-left">
          <Image src="/s (1).webp" alt="" fill className="object-contain" />
        </div>

        <div className="mx-auto max-w-6xl">
          <h2 className="font-alegreya text-4xl font-bold text-[#fef5ed] md:text-6xl lg:text-7xl">
            Meet Your Guide
          </h2>

          <div className="mt-20 grid gap-12 md:grid-cols-2 items-center">
            <div className="relative aspect-square overflow-hidden rounded-3xl border-2 border-[#9a4a17]">
              <div className="absolute inset-0 bg-gradient-to-br from-[#f89b3f]/20 to-transparent" />
              {/* Placeholder for guide image */}
              <div className="flex h-full items-center justify-center bg-gradient-to-br from-[#1a0f0a] to-[#0a0604]">
                <div className="h-32 w-32 rounded-full bg-gradient-to-br from-[#f89b3f] to-[#ff6e40] opacity-20" />
              </div>
            </div>

            <div className="space-y-6">
              <h3 className="font-alegreya text-4xl font-bold text-[#fef5ed]">
                Sarah Chen
              </h3>

              <p className="font-inter text-sm font-medium tracking-wider text-[#fab76a]">
                CERTIFIED BREATHWORK FACILITATOR & SOMATIC PRACTITIONER
              </p>

              <div className="space-y-4 font-inter text-base md:text-lg leading-relaxed text-[#fcd19f]">
                <p>
                  With over 10 years of experience in breathwork, meditation, and nervous system regulation, Sarah combines ancient wisdom with modern neuroscience.
                </p>
                <p>
                  She’s worked with hundreds of professionals in high-stress environments, helping them find sustainable practices for mental wellbeing without adding more to their already full plates.
                </p>
              </div>

              <div className="pt-4">
                <div className="h-1 w-20 rounded-full bg-gradient-to-r from-[#f89b3f] to-[#ff6e40]" />
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="section-separator" />

      {/* Testimonials Section */}
      <section id="testimonials" className="relative z-10 px-4 py-16 md:px-6 md:py-32">
        <div className="gradient-blob gradient-blob-middle-right">
          <Image src="/s.webp" alt="" fill className="object-contain" />
        </div>

        <div className="mx-auto max-w-6xl">
          <h2 className="font-alegreya text-4xl font-bold text-[#fef5ed] md:text-6xl lg:text-7xl">
            What People Say
          </h2>

          <div className="mt-20 grid gap-8 md:grid-cols-3">
            {[
              {
                quote: "I was skeptical at first, but after just three sessions, I noticed a significant shift in my stress levels. I’m sleeping better and feeling more present.",
                author: "Raj K.",
                role: "Software Engineer"
              },
              {
                quote: "Sarah’s approach is both grounding and transformative. The techniques are simple enough to practice daily, yet powerful enough to create real change.",
                author: "Maya P.",
                role: "Product Manager"
              },
              {
                quote: "As someone who’s tried everything from therapy to meditation apps, this is the first practice that’s actually stuck. Game changer.",
                author: "Arjun M.",
                role: "Founder"
              }
            ].map((testimonial, index) => (
              <div
                key={index}
                className="group relative overflow-hidden rounded-2xl border border-[#9a4a17] bg-gradient-to-br from-[#0a0604] to-[#1a0f0a] p-6 md:p-8 transition-all duration-500 hover:border-[#f89b3f]"
              >
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#f89b3f]/5 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                <div className="relative z-10">
                  <div className="mb-6 text-3xl md:text-4xl lg:text-5xl text-[#f89b3f] opacity-30">"</div>

                  <p className="font-inter text-base leading-relaxed text-[#fcd19f]">
                    {testimonial.quote}
                  </p>

                  <div className="mt-6 border-t border-[#9a4a17] pt-6">
                    <p className="font-alegreya text-lg font-bold text-[#fef5ed]">
                      {testimonial.author}
                    </p>
                    <p className="mt-1 font-inter text-sm text-[#fab76a]">
                      {testimonial.role}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <div className="section-separator" />

      {/* FAQ Section */}
      <section id="faq" className="relative z-10 px-4 py-16 md:px-6 md:py-32">
        <div className="gradient-blob gradient-blob-middle-left">
          <Image src="/s (1).webp" alt="" fill className="object-contain" />
        </div>

        <div className="mx-auto max-w-4xl">
          <h2 className="font-alegreya text-4xl font-bold text-[#fef5ed] md:text-6xl lg:text-7xl">
            Frequently Asked Questions
          </h2>

          <div className="mt-20 space-y-4">
            {[
              {
                question: "Do I need any experience with breathwork or meditation?",
                answer: "Not at all. Our sessions are designed for complete beginners. Sarah guides you through every technique with clear instructions and modifications."
              },
              {
                question: "What do I need to participate?",
                answer: "Just a quiet space, comfortable clothing, and a mat or chair. You’ll need a stable internet connection to join the Zoom sessions."
              },
              {
                question: "How long are the sessions?",
                answer: "Each session is 60 minutes. We recommend joining a few minutes early to get settled and test your audio/video."
              },
              {
                question: "Are there any health conditions that would prevent me from participating?",
                answer: "Breathwork is generally safe, but if you have respiratory issues, cardiovascular conditions, or are pregnant, please consult your healthcare provider first. Reach out if you have specific concerns."
              },
              {
                question: "What if I can’t make a live session?",
                answer: "All sessions are recorded and available for 48 hours afterward. However, we encourage live participation when possible for the full experience."
              }
            ].map((faq, index) => (
              <div
                key={index}
                className="overflow-hidden rounded-2xl border border-[#9a4a17] bg-gradient-to-br from-[#0a0604] to-[#1a0f0a] transition-all duration-300"
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="flex w-full items-center justify-between p-6 text-left transition-colors duration-300 hover:bg-[#1a0f0a]"
                >
                  <span className="font-alegreya text-xl font-bold text-[#fef5ed] md:text-2xl">
                    {faq.question}
                  </span>
                  <span className="ml-4 flex-shrink-0 text-2xl text-[#f89b3f] transition-transform duration-300" style={{ transform: openFaq === index ? 'rotate(45deg)' : 'rotate(0deg)' }}>
                    +
                  </span>
                </button>

                <div
                  className="overflow-hidden transition-all duration-300"
                  style={{
                    maxHeight: openFaq === index ? '500px' : '0px',
                    opacity: openFaq === index ? 1 : 0
                  }}
                >
                  <div className="border-t border-[#9a4a17] p-6">
                    <p className="font-inter text-base leading-relaxed text-[#fcd19f]">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <div className="section-separator" />

      {/* Who This Is For */}
      <section id="who" className="relative z-10 px-4 py-16 md:px-6 md:py-32">
        <div className="gradient-blob gradient-blob-middle-right">
          <Image src="/s.webp" alt="" fill className="object-contain" />
        </div>

        <div className="mx-auto max-w-6xl">
          <h2 className="font-alegreya text-4xl font-bold text-[#fef5ed] md:text-6xl lg:text-7xl">
            Who this is for
          </h2>

          <div className="mt-20 space-y-6 font-inter text-base md:text-lg leading-relaxed text-[#fcd19f] md:text-xl">
            <p>• Knowledge workers drowning in constant connectivity and decision fatigue</p>
            <p>• Professionals seeking sustainable wellbeing practices that actually fit into life</p>
            <p>• Anyone navigating chronic stress, anxiety, or early signs of burnout</p>
            <p>• People ready to regulate their nervous system, not just push through</p>
            <p>• Those who want to feel calm without numbing out or checking out</p>
          </div>
        </div>
      </section>
      <div className="section-separator" />

      {/* CTA Section */}
      <section className="relative z-10 px-4 py-16 md:px-6 md:py-32">
        <div className="gradient-blob gradient-blob-top-right">
          <Image src="/s (1).webp" alt="" fill className="object-contain" />
        </div>
        <div className="gradient-blob gradient-blob-bottom-left">
          <Image src="/s.webp" alt="" fill className="object-contain" />
        </div>

        <div className="mx-auto max-w-4xl text-center">
          <div className="relative overflow-hidden rounded-3xl border-2 border-[#f89b3f] bg-gradient-to-br from-[#1a0f0a] to-[#0a0604] p-8 md:p-16 lg:p-24">
            <div className="relative z-10">
              <h3 className="font-alegreya text-2xl md:text-3xl lg:text-4xl font-bold text-[#fef5ed] lg:text-5xl xl:text-6xl">
                Ready to Breathe Better?
              </h3>

              <p className="mt-8 font-inter text-lg text-[#fcd19f] md:text-xl">
                Join us for your first session and start your journey to a calmer, more regulated nervous system
              </p>

              <button className="group relative mt-12 overflow-hidden rounded-full bg-[#f89b3f] px-8 sm:px-12 md:px-14 py-4 sm:py-5 md:py-6 font-inter text-lg font-bold tracking-widest text-white transition-all duration-300 hover:bg-[#e97d1f] hover:shadow-[0_0_30px_rgba(248,155,63,0.4)]">
                <span className="relative z-10">BOOK YOUR FIRST SESSION</span>
              </button>
            </div>
          </div>
        </div>
      </section>
      <div className="section-separator" />

      {/* Footer */}
      <footer className="relative z-10 border-t border-[#9a4a17] px-4 py-12 md:px-6 md:py-20">
        <div className="mx-auto max-w-4xl text-center">
          <p className="font-inter text-sm tracking-[0.3em] text-[#fab76a]">
            ANUMI
          </p>

          <p className="mt-6 font-inter text-base text-[#9a4a17]">
            Bangalore, India
          </p>

          <div className="mx-auto mt-8 h-[2px] w-32 rounded-full bg-gradient-to-r from-transparent via-[#f89b3f] to-transparent" />
        </div>
      </footer>

      {/* Global Grain Overlay */}
      <div
        className="fixed inset-0 z-40 pointer-events-none opacity-20"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 600 600'%3E%3Cfilter id='a'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23a)'/%3E%3C/svg%3E")`,
          backgroundSize: "182px",
        }}
      />
    </div>
  );
}
