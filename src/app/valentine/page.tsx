"use client";

export const dynamic = 'force-dynamic';

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function ValentinePage() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [showContent, setShowContent] = useState(false);
  const [isExiting, setIsExiting] = useState(false);

  const messages = [
    "Hi, Kaye...",
    "Please rate every bouquet that will display",
    "Each bloom awaits your gentle judgment",
    "Take your time!",
  ];

  useEffect(() => {
    if (!authLoading && !user) {
      router.push("/");
    }
  }, [user, authLoading, router]);

  useEffect(() => {
    const timer = setTimeout(() => setShowContent(true), 400);
    return () => clearTimeout(timer);
  }, []);

  // Refined auto-advance with pause on hover
  useEffect(() => {
    if (!showContent) return;

    const interval = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev < messages.length - 1) {
          return prev + 1;
        }
        return prev;
      });
    }, 2800);

    return () => clearInterval(interval);
  }, [showContent, messages.length]);

  const handleProceed = () => {
    setIsExiting(true);
    setTimeout(() => {
      router.push("/valentine/bouquet/1");
    }, 600);
  };

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-rose-50 via-pink-50 to-red-50 dark:from-gray-950 dark:via-rose-950/20 dark:to-gray-950">
        <div className="relative">
          <div className="w-20 h-20 border border-rose-200/50 border-t-rose-400 rounded-full animate-spin-slow" />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-2xl text-rose-400/50 animate-pulse">✧</span>
          </div>
          <p className="mt-6 text-xs tracking-[0.3em] text-rose-600 dark:text-rose-400 animate-pulse uppercase">
            Preparing your experience
          </p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div
      className={`
      relative min-h-screen overflow-hidden
      bg-gradient-to-br from-rose-50 via-pink-50 to-red-50 
      dark:from-gray-950 dark:via-rose-950/20 dark:to-gray-950
      transition-opacity duration-600
      ${isExiting ? "opacity-0" : "opacity-100"}
    `}
    >
      {/* Elegant floating elements */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Rose petals */}
        {[...Array(12)].map((_, i) => (
          <div
            key={`petal-${i}`}
            className="absolute w-4 h-3 bg-gradient-to-br from-rose-300/20 to-pink-300/20 dark:from-rose-400/10 dark:to-pink-400/10 rounded-[80%_20%_70%_30%/60%_40%_70%_30%]"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              transform: `rotate(${Math.random() * 360}deg)`,
              animation: `petalFloat ${12 + i * 2}s infinite ease-in-out ${i * 0.3}s`,
            }}
          />
        ))}

        {/* Delicate hearts */}
        {[...Array(8)].map((_, i) => (
          <div
            key={`heart-${i}`}
            className="absolute text-rose-300/20 dark:text-rose-500/10 select-none"
            style={{
              left: `${5 + Math.random() * 90}%`,
              top: `${Math.random() * 100}%`,
              fontSize: `${1.2 + Math.random() * 1.5}rem`,
              animation: `heartFloat ${10 + i * 2}s infinite ease-in-out ${i * 0.5}s`,
            }}
          >
            ✧
          </div>
        ))}
      </div>

      {/* Main content */}
      <div className="relative flex flex-col items-center justify-center min-h-screen py-12 px-6">
        {/* Subtle vignette */}
        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,_transparent_50%,_rgba(251,113,133,0.03)_100%)] dark:bg-[radial-gradient(ellipse_at_center,_transparent_50%,_rgba(251,113,133,0.05)_100%)]" />

        <div className="max-w-2xl mx-auto text-center relative z-10">
          {/* Decorative header */}
          <div className="mb-16 space-y-3">
            <div className="flex justify-center gap-2 text-rose-400/50 dark:text-rose-500/30 text-sm tracking-[0.5em]">
              <span className="animate-pulse-slow">⌇</span>
              <span>✧</span>
              <span className="animate-pulse-slow delay-300">⌇</span>
            </div>
            <p className="text-xs uppercase tracking-[0.5em] text-rose-500/60 dark:text-rose-400/60 font-light">
              Mark Anthony Yapan
            </p>
          </div>

          {/* Poetry box */}
          <div className="relative backdrop-blur-sm bg-white/40 dark:bg-gray-900/40 p-10 rounded-[2.5rem] shadow-2xl border border-rose-200/50 dark:border-rose-800/30">
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 px-6 py-2 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-full text-xs text-rose-600 dark:text-rose-400 border border-rose-200/50 shadow-sm">
              ✦ A Letter for You ✦
            </div>

            {/* Animated messages */}
            <div className="min-h-[120px] flex items-center justify-center my-12">
              <div className="relative w-full">
                {messages.map((message, index) => (
                  <div
                    key={index}
                    className={`
                      absolute w-full left-0 right-0
                      transition-all duration-800 ease-in-out
                      ${
                        index === currentStep
                          ? "opacity-100 translate-y-0 scale-100 filter blur-none"
                          : index < currentStep
                            ? "opacity-0 -translate-y-12 scale-95 filter blur-[2px]"
                            : "opacity-0 translate-y-12 scale-95 filter blur-[2px]"
                      }
                    `}
                  >
                    <p className="font-serif text-3xl md:text-4xl italic text-rose-800 dark:text-rose-200 leading-relaxed">
                      {message}
                    </p>
                    {index === currentStep && (
                      <span className="inline-block w-1 h-5 ml-1 bg-rose-400 animate-pulse-slow" />
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Refined progress indicator */}
            <div className="flex justify-center gap-3 mb-12">
              {messages.map((_, index) => (
                <div
                  key={index}
                  className={`
                    relative transition-all duration-500
                    ${index === currentStep ? "w-8" : "w-2"}
                  `}
                >
                  <div
                    className={`
                      absolute inset-0 rounded-full
                      transition-all duration-500
                      ${
                        index === currentStep
                          ? "bg-gradient-to-r from-rose-400 to-pink-400 h-2 shadow-lg shadow-rose-500/30"
                          : index < currentStep
                            ? "bg-rose-400/60 h-2"
                            : "bg-rose-200/60 dark:bg-rose-800/60 h-2"
                      }
                    `}
                  />
                </div>
              ))}
            </div>

            {/* Elegant call to action */}
            <div className="space-y-6">
              <p className="text-xs text-rose-500/70 dark:text-rose-400/70 font-light italic">
                &quot;Every flower is a soul blossoming in nature&quot;
              </p>

              <button
                onClick={handleProceed}
                className="group relative px-10 py-4 overflow-hidden rounded-full"
              >
                {/* Animated background */}
                <div className="absolute inset-0 bg-gradient-to-r from-rose-400 to-pink-400 transition-transform duration-500 group-hover:scale-110" />

                {/* Shine effect */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                  <div className="absolute top-0 -left-full w-full h-full bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12 group-hover:left-full transition-all duration-700" />
                </div>

                {/* Button content */}
                <span className="relative flex items-center justify-center gap-3 text-white font-light tracking-wider">
                  <span className="text-sm uppercase tracking-[0.3em]">
                    Begin the journey
                  </span>
                  <span className="text-xl group-hover:rotate-12 transition-transform duration-300">
                    ✧
                  </span>
                </span>
              </button>

              {/* Subtle hint */}
              <p className="text-[10px] text-rose-400/50 dark:text-rose-500/30 uppercase tracking-[0.4em] pt-4">
                Four bouquets await your eye
              </p>
            </div>
          </div>

          {/* Decorative footer */}
          <div className="mt-16 flex justify-center gap-4 text-rose-300/40 dark:text-rose-500/20 text-xs">
            <span>⌇</span>
            <span className="tracking-[1em]">✧</span>
            <span>⌇</span>
          </div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes petalFloat {
          0%,
          100% {
            transform: translateY(0) translateX(0) rotate(0deg);
            opacity: 0.2;
          }
          25% {
            transform: translateY(-20px) translateX(10px) rotate(45deg);
            opacity: 0.3;
          }
          50% {
            transform: translateY(-35px) translateX(0) rotate(90deg);
            opacity: 0.4;
          }
          75% {
            transform: translateY(-20px) translateX(-10px) rotate(135deg);
            opacity: 0.3;
          }
        }

        @keyframes heartFloat {
          0%,
          100% {
            transform: translateY(0) rotate(0deg);
            opacity: 0.2;
          }
          50% {
            transform: translateY(-40px) rotate(10deg);
            opacity: 0.4;
          }
        }

        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        .animate-spin-slow {
          animation: spin-slow 3s linear infinite;
        }

        .animate-pulse-slow {
          animation: pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }

        .delay-300 {
          animation-delay: 300ms;
        }

        .duration-600 {
          transition-duration: 600ms;
        }

        .duration-800 {
          transition-duration: 800ms;
        }
      `}</style>
    </div>
  );
}
