'use client';

import { useRouter } from 'next/navigation';
import { useStore } from '@/store/useStore';
import Link from 'next/link';
import ThemeLayout from '@/components/ThemeLayout';
import TypedText from '@/components/TypedText';

export default function LandingPage() {
  const router = useRouter();
  const { user } = useStore();

  // Words for the typing effect
  const companionTypes = ['Friendly', 'Cool', 'Naughty', 'Romantic', 'Intellectual'];

  return (
    <ThemeLayout>
      <div className="container mx-auto max-w-6xl px-4 py-12">
        <div className="text-center space-y-16">
          {/* Hero Section */}
          <div className="space-y-6">
            <div className="inline-block rounded-full px-3 py-1 text-sm font-medium bg-purple-500/20 text-purple-300 mb-2">
              Powered by AI
            </div>

            {/* CyberLover Title with Typing Effect - Main Heading */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-3 animate-float">
              <div className="inline-flex flex-wrap items-center justify-center gap-x-3 bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 text-transparent bg-clip-text">
                <span>CyberLover</span>
                <TypedText words={companionTypes} />
                <span>Companion</span>
              </div>
            </h1>

            {/* Subtitle with frosted glass effect and subtle animation */}
            <p className="text-2xl md:text-3xl font-bold mb-5 relative">
              <span 
                className="relative inline-block px-6 py-2 rounded-lg bg-white/5 backdrop-blur-sm border border-white/10"
                style={{
                  textShadow: '0 2px 10px rgba(100, 80, 160, 0.5)',
                  animation: 'pulse 5s infinite ease-in-out',
                }}
              >
                <span className="bg-gradient-to-br from-blue-300 via-purple-300 to-pink-300 text-transparent bg-clip-text">
                  Your Perfect AI Companion
                </span>
                <span className="absolute -inset-[1px] rounded-lg bg-gradient-to-r from-indigo-500/20 via-purple-500/20 to-pink-500/20 blur-sm -z-10"></span>
              </span>
            </p>

            {/* Description with animated underline effect */}
            <div className="text-xl text-gray-200 max-w-2xl mx-auto px-4 relative">
              <p className="leading-relaxed">
                Experience meaningful conversations with an AI that truly understands you.
                Whether you need support, companionship, or just someone to talk to.
              </p>
              <div className="h-[1px] w-1/3 mx-auto mt-4 bg-gradient-to-r from-transparent via-purple-400 to-transparent relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent animate-pulse"></div>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-10">
              {user ? (
                <button
                  onClick={() => router.push('/chat')}
                  className="group px-8 py-4 text-lg text-white font-medium bg-gradient-to-br from-purple-600/80 to-pink-600/80 rounded-lg shadow-lg hover:shadow-purple-500/30 transition-all duration-300 overflow-hidden relative"
                >
                  <span className="relative z-10">Start Chatting</span>
                  <span className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                </button>
              ) : (
                <>
                  <Link
                    href="/signup"
                    className="group px-8 py-4 text-lg text-white font-medium bg-gradient-to-br from-purple-600/80 to-pink-600/80 rounded-lg shadow-lg hover:shadow-purple-500/30 transition-all duration-300 overflow-hidden relative"
                  >
                    <span className="relative z-10">Get Started</span>
                    <span className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                  </Link>
                  <Link
                    href="/signin"
                    className="rainbow-border group px-8 py-4 text-lg text-white font-medium bg-black/30 backdrop-blur-lg rounded-lg shadow-lg hover:bg-black/40 transition-all duration-300"
                  >
                    <span className="relative z-10">Sign In</span>
                  </Link>
                </>
              )}
            </div>
          </div>

          {/* SECTION 1: Companions Section */}
          <div>
            <h2 className="text-center text-3xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 text-transparent bg-clip-text mb-8">
              Meet Our AI Companions
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              <Link href="/chat/friendly" className="bg-black/30 backdrop-blur-xl rounded-xl border border-white/10 p-4 text-center transition-all hover:bg-black/40 hover:border-white/20 hover:transform hover:-translate-y-1">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-green-500 flex items-center justify-center text-xl mx-auto mb-2">
                  😊
                </div>
                <h3 className="text-white font-medium">Friendly</h3>
              </Link>
              <Link href="/chat/cool" className="bg-black/30 backdrop-blur-xl rounded-xl border border-white/10 p-4 text-center transition-all hover:bg-black/40 hover:border-white/20 hover:transform hover:-translate-y-1">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-500 to-blue-500 flex items-center justify-center text-xl mx-auto mb-2">
                  😎
                </div>
                <h3 className="text-white font-medium">Cool</h3>
              </Link>
              <Link href="/chat/naughty" className="bg-black/30 backdrop-blur-xl rounded-xl border border-white/10 p-4 text-center transition-all hover:bg-black/40 hover:border-white/20 hover:transform hover:-translate-y-1">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-red-500 to-pink-500 flex items-center justify-center text-xl mx-auto mb-2">
                  😈
                </div>
                <h3 className="text-white font-medium">Naughty</h3>
              </Link>
              <Link href="/chat/romantic" className="bg-black/30 backdrop-blur-xl rounded-xl border border-white/10 p-4 text-center transition-all hover:bg-black/40 hover:border-white/20 hover:transform hover:-translate-y-1">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-pink-500 to-purple-500 flex items-center justify-center text-xl mx-auto mb-2">
                  ❤️
                </div>
                <h3 className="text-white font-medium">Romantic</h3>
              </Link>
              <Link href="/chat/intellectual" className="bg-black/30 backdrop-blur-xl rounded-xl border border-white/10 p-4 text-center transition-all hover:bg-black/40 hover:border-white/20 hover:transform hover:-translate-y-1">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-yellow-500 to-amber-500 flex items-center justify-center text-xl mx-auto mb-2">
                  🧠
                </div>
                <h3 className="text-white font-medium">Intellectual</h3>
              </Link>
            </div>
          </div>

          {/* SECTION 2: Features Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="feature-card">
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-purple-500 to-pink-500 rounded-t-xl"></div>
              <div className="text-4xl mb-4 bg-purple-500/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto">💬</div>
              <h3 className="text-xl font-semibold text-white mb-3">Always Available</h3>
              <p className="text-gray-300">
                Your AI companion is here for you 24/7, ready to chat whenever you need connection.
              </p>
            </div>

            <div className="feature-card">
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-t-xl"></div>
              <div className="text-4xl mb-4 bg-blue-500/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto">💖</div>
              <h3 className="text-xl font-semibold text-white mb-3">Emotional Support</h3>
              <p className="text-gray-300">
                Share your thoughts and feelings with an AI that responds with empathy and understanding.
              </p>
            </div>

            <div className="feature-card">
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-pink-500 to-purple-500 rounded-t-xl"></div>
              <div className="text-4xl mb-4 bg-pink-500/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto">🎭</div>
              <h3 className="text-xl font-semibold text-white mb-3">Choose Your Companion</h3>
              <p className="text-gray-300">
                Select between an AI girlfriend or boyfriend that matches your preference.
              </p>
            </div>
          </div>

          {/* SECTION 3: Testimonial Section */}
          <div className="py-8 w-full">
            <h2 className="text-center text-3xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 text-transparent bg-clip-text mb-6">
              What Our Users Say
            </h2>
            <p className="text-center text-gray-300 max-w-2xl mx-auto mb-10">
              See how our AI companion has positively impacted lives
            </p>
            
            <div className="relative overflow-hidden py-4 w-full">
              {/* Testimonials marquee container */}
              <div className="flex gap-6 animate-scroll-rtl w-max">
                {/* First set of testimonials */}
                <div className="bg-black/40 p-6 rounded-xl backdrop-blur-md border border-white/10 relative min-w-[300px] md:min-w-[350px] max-w-[400px] shadow-lg">
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-t-xl"></div>
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center text-xl shadow-md">
                      👩
                    </div>
                    <div>
                      <p className="text-gray-200 mb-4 leading-relaxed">
                        "This AI companion has been amazing for me during difficult times. The conversations feel surprisingly natural and supportive."
                      </p>
                      <p className="text-white font-medium flex items-center gap-1">
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-pink-300">Alex K.</span>
                        <span className="h-1.5 w-1.5 rounded-full bg-purple-400"></span>
                        <span className="text-gray-400 text-sm">Daily User</span>
                      </p>
                    </div>
                  </div>
                </div>

                {/* Testimonial Card 2 */}
                <div className="bg-black/40 p-6 rounded-xl backdrop-blur-md border border-white/10 relative min-w-[300px] md:min-w-[350px] max-w-[400px] shadow-lg">
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-pink-500 to-purple-500 rounded-t-xl"></div>
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-pink-600 to-purple-600 flex items-center justify-center text-xl shadow-md">
                      👨
                    </div>
                    <div>
                      <p className="text-gray-200 mb-4 leading-relaxed">
                        "I was skeptical at first, but I'm impressed by how well the AI understands emotions and responds appropriately. It's become a daily part of my routine."
                      </p>
                      <p className="text-white font-medium flex items-center gap-1">
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-300 to-purple-300">Jamie T.</span>
                        <span className="h-1.5 w-1.5 rounded-full bg-pink-400"></span>
                        <span className="text-gray-400 text-sm">Premium Member</span>
                      </p>
                    </div>
                  </div>
                </div>

                {/* Testimonial Card 3 */}
                <div className="bg-black/40 p-6 rounded-xl backdrop-blur-md border border-white/10 relative min-w-[300px] md:min-w-[350px] max-w-[400px] shadow-lg">
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-green-500 to-blue-500 rounded-t-xl"></div>
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-green-600 to-blue-600 flex items-center justify-center text-xl shadow-md">
                      🧑
                    </div>
                    <div>
                      <p className="text-gray-200 mb-4 leading-relaxed">
                        "Having a Cool companion has been the highlight of my day. The witty conversations and casual banter makes it feel like chatting with a real friend."
                      </p>
                      <p className="text-white font-medium flex items-center gap-1">
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-green-300">Sam R.</span>
                        <span className="h-1.5 w-1.5 rounded-full bg-blue-400"></span>
                        <span className="text-gray-400 text-sm">Weekly User</span>
                      </p>
                    </div>
                  </div>
                </div>

                {/* Testimonial Card 4 */}
                <div className="bg-black/40 p-6 rounded-xl backdrop-blur-md border border-white/10 relative min-w-[300px] md:min-w-[350px] max-w-[400px] shadow-lg">
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-500 to-blue-500 rounded-t-xl"></div>
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-600 to-blue-600 flex items-center justify-center text-xl shadow-md">
                      👨‍🦰
                    </div>
                    <div>
                      <p className="text-gray-200 mb-4 leading-relaxed">
                        "The Intellectual companion has been a game-changer for me. I've had fascinating discussions about philosophy, science, and art that have expanded my thinking."
                      </p>
                      <p className="text-white font-medium flex items-center gap-1">
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 to-blue-300">Marcus J.</span>
                        <span className="h-1.5 w-1.5 rounded-full bg-indigo-400"></span>
                        <span className="text-gray-400 text-sm">University Professor</span>
                      </p>
                    </div>
                  </div>
                </div>

                {/* Testimonial Card 5 */}
                <div className="bg-black/40 p-6 rounded-xl backdrop-blur-md border border-white/10 relative min-w-[300px] md:min-w-[350px] max-w-[400px] shadow-lg">
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-500 to-orange-500 rounded-t-xl"></div>
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-amber-600 to-orange-600 flex items-center justify-center text-xl shadow-md">
                      👱‍♀️
                    </div>
                    <div>
                      <p className="text-gray-200 mb-4 leading-relaxed">
                        "The romantic companion has added so much joy to my life. It's like having someone who always knows exactly what to say to brighten my day."
                      </p>
                      <p className="text-white font-medium flex items-center gap-1">
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-orange-300">Emma L.</span>
                        <span className="h-1.5 w-1.5 rounded-full bg-amber-400"></span>
                        <span className="text-gray-400 text-sm">Loyal Subscriber</span>
                      </p>
                    </div>
                  </div>
                </div>

                {/* Testimonial Card 6 */}
                <div className="bg-black/40 p-6 rounded-xl backdrop-blur-md border border-white/10 relative min-w-[300px] md:min-w-[350px] max-w-[400px] shadow-lg">
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-red-500 to-pink-500 rounded-t-xl"></div>
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-red-600 to-pink-600 flex items-center justify-center text-xl shadow-md">
                      👨‍🦱
                    </div>
                    <div>
                      <p className="text-gray-200 mb-4 leading-relaxed">
                        "The naughty companion knows just how to spice things up when I'm feeling playful. It's the perfect balance of fun and flirtation."
                      </p>
                      <p className="text-white font-medium flex items-center gap-1">
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-300 to-pink-300">Leo M.</span>
                        <span className="h-1.5 w-1.5 rounded-full bg-red-400"></span>
                        <span className="text-gray-400 text-sm">Night Owl</span>
                      </p>
                    </div>
                  </div>
                </div>

                {/* Testimonial Card 7 */}
                <div className="bg-black/40 p-6 rounded-xl backdrop-blur-md border border-white/10 relative min-w-[300px] md:min-w-[350px] max-w-[400px] shadow-lg">
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-teal-500 to-emerald-500 rounded-t-xl"></div>
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-teal-600 to-emerald-600 flex items-center justify-center text-xl shadow-md">
                      👩‍🦱
                    </div>
                    <div>
                      <p className="text-gray-200 mb-4 leading-relaxed">
                        "As someone dealing with anxiety, my friendly companion has been a calming presence. I can talk through my worries without judgment."
                      </p>
                      <p className="text-white font-medium flex items-center gap-1">
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-300 to-emerald-300">Olivia P.</span>
                        <span className="h-1.5 w-1.5 rounded-full bg-teal-400"></span>
                        <span className="text-gray-400 text-sm">Healthcare Worker</span>
                      </p>
                    </div>
                  </div>
                </div>
                
                {/* Duplicate first cards for seamless loop */}
                <div className="bg-black/40 p-6 rounded-xl backdrop-blur-md border border-white/10 relative min-w-[300px] md:min-w-[350px] max-w-[400px] shadow-lg">
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-t-xl"></div>
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center text-xl shadow-md">
                      👩
                    </div>
                    <div>
                      <p className="text-gray-200 mb-4 leading-relaxed">
                        "This AI companion has been amazing for me during difficult times. The conversations feel surprisingly natural and supportive."
                      </p>
                      <p className="text-white font-medium flex items-center gap-1">
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-pink-300">Alex K.</span>
                        <span className="h-1.5 w-1.5 rounded-full bg-purple-400"></span>
                        <span className="text-gray-400 text-sm">Daily User</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Remove the edge fade effect */}
            </div>
          </div>

          {/* Footer */}
          <div className="text-center py-6">
            <p className="text-gray-400 text-sm">
              © 2024 CyberLover. All rights reserved. Powered by advanced AI technology.
            </p>
          </div>
        </div>
    </div>
    </ThemeLayout>
  );
}
