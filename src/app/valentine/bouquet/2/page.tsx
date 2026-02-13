"use client";

export const dynamic = "force-dynamic";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";

export default function Bouquet2Page() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const [hoveredStar, setHoveredStar] = useState<number | null>(null);

  useEffect(() => {
    if (!authLoading && !user) {
      router.push("/");
    }
  }, [user, authLoading, router]);

  const handleRate = (rating: number) => {
    const ratings = JSON.parse(localStorage.getItem("bouquetRatings") || "{}");
    ratings[2] = rating;
    localStorage.setItem("bouquetRatings", JSON.stringify(ratings));
    router.push("/valentine/bouquet/3");
  };

  const handleSkip = () => {
    router.push("/valentine/bouquet/3");
  };

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-rose-50 via-pink-50 to-red-50 dark:from-gray-950 dark:via-gray-900 dark:to-rose-950">
        <div className="relative">
          <div className="w-16 h-16 border-2 border-rose-200 border-t-rose-500 rounded-full animate-spin" />
          <p className="mt-4 text-sm tracking-wider text-rose-600 dark:text-rose-400 animate-pulse">
            Awakening the roses...
          </p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-rose-50 via-pink-50 to-red-50 dark:from-gray-950 dark:via-gray-900 dark:to-rose-950">
      {/* Floating petals background */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute w-4 h-4 bg-rose-200/20 rounded-full blur-sm"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float ${8 + i * 2}s infinite ease-in-out ${i * 0.5}s`,
            }}
          />
        ))}
      </div>

      <div className="relative flex flex-col items-center justify-center min-h-screen py-12 px-4">
        {/* Progress with refinement */}
        <div className="fixed top-8 left-1/2 transform -translate-x-1/2 z-20">
          <div className="backdrop-blur-sm bg-white/30 dark:bg-gray-900/30 px-6 py-3 rounded-full shadow-lg border border-rose-200/50 dark:border-rose-800/30">
            <div className="flex items-center gap-4">
              <span className="text-xs uppercase tracking-wider text-rose-700 dark:text-rose-300 font-light">
                Second Bloom
              </span>
              <div className="w-32 h-1 bg-rose-200/50 dark:bg-rose-900/50 rounded-full overflow-hidden">
                <div className="h-full w-2/3 bg-gradient-to-r from-rose-400 to-rose-500 rounded-full animate-pulse" />
              </div>
              <span className="text-xs text-rose-600 dark:text-rose-400 font-light">
                2/3
              </span>
            </div>
          </div>
        </div>

        {/* Pink Tulips */}
        <div className="relative mb-12 transform hover:scale-105 transition-transform duration-700">
          <div className="flex flex-wrap justify-center items-end gap-[-10px]">
            {/* Tulip flowers */}
            <div className="tulip tulip-1">
              <div className="tulip-petal" />
              <div
                className="tulip-petal"
                style={{ transform: "rotate(45deg)" }}
              />
              <div className="tulip-stem" />
            </div>
            <div className="tulip tulip-2">
              <div className="tulip-petal" />
              <div
                className="tulip-petal"
                style={{ transform: "rotate(45deg)" }}
              />
              <div className="tulip-stem" />
            </div>
            <div className="tulip tulip-3">
              <div className="tulip-petal" />
              <div
                className="tulip-petal"
                style={{ transform: "rotate(45deg)" }}
              />
              <div className="tulip-stem" />
            </div>
            <div className="tulip tulip-4">
              <div className="tulip-petal" />
              <div
                className="tulip-petal"
                style={{ transform: "rotate(45deg)" }}
              />
              <div className="tulip-stem" />
            </div>
            <div className="tulip tulip-5">
              <div className="tulip-petal" />
              <div
                className="tulip-petal"
                style={{ transform: "rotate(45deg)" }}
              />
              <div className="tulip-stem" />
            </div>
            <div className="tulip tulip-6">
              <div className="tulip-petal" />
              <div
                className="tulip-petal"
                style={{ transform: "rotate(45deg)" }}
              />
              <div className="tulip-stem" />
            </div>
          </div>

          {/* Leaves */}
          <div className="flex justify-center gap-6 mt-[-15px]">
            <div className="leaf-rose leaf-rose-1" />
            <div className="leaf-rose leaf-rose-2" />
            <div className="leaf-rose leaf-rose-3" />
          </div>

          {/* Stem */}
          <div className="stem-bundle">
            <div className="stem-line" />
            <div className="stem-line" />
            <div className="stem-line" />
            <div className="stem-line" />
            <div className="stem-line" />
            <div className="stem-line" />
          </div>

          {/* Ribbon */}
          <div className="ribbon-bow">
            <div className="bow-left" />
            <div className="bow-right" />
            <div className="bow-center" />
          </div>
        </div>

        {/* Poetic description */}
        <div className="text-center mb-12 space-y-2">
          <h2 className="font-serif text-4xl italic text-rose-800 dark:text-rose-200">
            Tulipes de Sálabât
          </h2>
          <p className="font-light text-sm tracking-widest text-rose-600 dark:text-rose-400 uppercase">
            Dreams dancing on spring stems
          </p>
          <div className="flex justify-center gap-1 text-rose-400/50 text-xs">
            <span>✦</span>
            <span className="mx-2">•</span>
            <span>✦</span>
          </div>
        </div>

        {/* Refined rating experience */}
        <div className="relative backdrop-blur-sm bg-white/30 dark:bg-gray-900/30 p-8 rounded-3xl shadow-2xl border border-rose-200/50 dark:border-rose-800/30">
          <p className="text-xs uppercase tracking-[0.3em] text-rose-600 dark:text-rose-400 mb-6 text-center font-light">
            Express your admiration
          </p>

          <div className="flex justify-center gap-4">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                onClick={() => handleRate(star)}
                onMouseEnter={() => setHoveredStar(star)}
                onMouseLeave={() => setHoveredStar(null)}
                className="group relative"
              >
                <div className="absolute inset-0 bg-rose-400/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div
                  className={`
                    relative w-14 h-14 rounded-full flex items-center justify-center
                    transition-all duration-500
                    ${
                      hoveredStar !== null && hoveredStar >= star
                        ? "bg-gradient-to-br from-rose-400 to-rose-500 scale-110 shadow-2xl shadow-rose-500/30"
                        : "bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-rose-200 dark:border-rose-800"
                    }
                  `}
                >
                  <span
                    className={`
                    text-2xl transition-all duration-300
                    ${
                      hoveredStar !== null && hoveredStar >= star
                        ? "text-white scale-110"
                        : "text-rose-400 group-hover:text-rose-500"
                    }
                  `}
                  >
                    ✦
                  </span>
                </div>
              </button>
            ))}
          </div>

          <p className="text-xs text-rose-500/70 dark:text-rose-400/70 mt-6 text-center italic">
            Touch a star to bestow your favor
          </p>
        </div>

        <button
          onClick={handleSkip}
          className="mt-6 text-xs uppercase tracking-wider text-rose-500/60 hover:text-rose-600 dark:text-rose-400/60 dark:hover:text-rose-300 transition-colors"
        >
          Skip for now
        </button>
      </div>

      <style jsx global>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0) rotate(0deg);
            opacity: 0.3;
          }
          50% {
            transform: translateY(-20px) rotate(10deg);
            opacity: 0.6;
          }
        }

        .tulip {
          position: relative;
          width: 35px;
          height: 50px;
          animation: bloom 2s ease-in-out infinite;
        }
        .tulip-1 {
          animation-delay: 0s;
        }
        .tulip-2 {
          animation-delay: 0.2s;
        }
        .tulip-3 {
          animation-delay: 0.4s;
        }
        .tulip-4 {
          animation-delay: 0.6s;
          margin-top: -30px;
        }
        .tulip-5 {
          animation-delay: 0.8s;
          margin-top: -30px;
        }
        .tulip-6 {
          animation-delay: 1s;
          margin-top: -30px;
        }

        .tulip-petal {
          position: absolute;
          width: 0;
          height: 0;
          border-left: 12px solid transparent;
          border-right: 12px solid transparent;
          border-bottom: 35px solid #f9a8d4;
          top: 0;
          left: 5px;
        }

        .tulip-stem {
          position: absolute;
          width: 4px;
          height: 40px;
          background: linear-gradient(90deg, #22c55e 0%, #16a34a 100%);
          bottom: -35px;
          left: 13px;
          border-radius: 2px;
        }

        .leaf-rose {
          position: absolute;
          width: 40px;
          height: 20px;
          background: linear-gradient(135deg, #4ade80 0%, #22c55e 100%);
          border-radius: 0 70% 0 70%;
        }
        .leaf-rose-1 {
          transform: rotate(-45deg);
          left: 30%;
          bottom: 20px;
        }
        .leaf-rose-2 {
          transform: rotate(45deg) scaleX(-1);
          left: 50%;
          bottom: 15px;
        }
        .leaf-rose-3 {
          transform: rotate(-30deg);
          left: 70%;
          bottom: 25px;
        }

        .stem-bundle {
          position: relative;
          width: 60px;
          height: 80px;
          margin: 0 auto;
        }

        .stem-line {
          position: absolute;
          width: 4px;
          height: 70px;
          background: linear-gradient(90deg, #22c55e 0%, #16a34a 100%);
          border-radius: 2px;
        }
        .stem-line:nth-child(1) {
          left: 8px;
          transform: rotate(-5deg);
        }
        .stem-line:nth-child(2) {
          left: 18px;
          transform: rotate(-2deg);
        }
        .stem-line:nth-child(3) {
          left: 28px;
        }
        .stem-line:nth-child(4) {
          left: 38px;
          transform: rotate(2deg);
        }
        .stem-line:nth-child(5) {
          left: 48px;
          transform: rotate(5deg);
        }

        .ribbon-bow {
          position: absolute;
          bottom: 60px;
          left: 50%;
          transform: translateX(-50%);
        }

        .bow-left,
        .bow-right {
          position: absolute;
          width: 25px;
          height: 15px;
          background: #ec4899;
          border-radius: 50%;
        }
        .bow-left {
          left: -20px;
          transform: rotate(-20deg);
          animation: bowWave 1.5s ease-in-out infinite;
        }
        .bow-right {
          right: -20px;
          transform: rotate(20deg);
          animation: bowWave 1.5s ease-in-out infinite 0.2s;
        }

        .bow-center {
          position: absolute;
          width: 12px;
          height: 12px;
          background: #db2777;
          border-radius: 50%;
          left: 6px;
          top: 2px;
        }

        @keyframes bloom {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-5px);
          }
        }
        @keyframes bowWave {
          0%,
          100% {
            transform: rotate(-20deg) scale(1);
          }
          50% {
            transform: rotate(-15deg) scale(1.1);
          }
        }
      `}</style>
    </div>
  );
}
