"use client";

export const dynamic = "force-dynamic";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";

export default function Bouquet1Page() {
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
    ratings[1] = rating;
    localStorage.setItem("bouquetRatings", JSON.stringify(ratings));
    router.push("/valentine/bouquet/2");
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
                First Bloom
              </span>
              <div className="w-32 h-1 bg-rose-200/50 dark:bg-rose-900/50 rounded-full overflow-hidden">
                <div className="h-full w-1/3 bg-gradient-to-r from-rose-400 to-rose-500 rounded-full animate-pulse" />
              </div>
              <span className="text-xs text-rose-600 dark:text-rose-400 font-light">
                1/3
              </span>
            </div>
          </div>
        </div>

        {/* The Rose - Elegant rendition with proper connections */}
        <div className="relative mb-12 transform hover:scale-105 transition-transform duration-700">
          {/* Main stem - central anchor */}
          <div className="relative flex flex-col items-center">
            {/* Flower head - directly connected to stem */}
            <div className="relative z-20 mb-[-15px]">
              <div className="flower flower-1">
                <div className="petal petal-1" />
                <div className="petal petal-2" />
                <div className="petal petal-3" />
                <div className="petal petal-4" />
                <div className="center" />
                <div className="bud" />
              </div>
            </div>

            {/* Stem with attached leaves */}
            <div className="relative z-10 flex flex-col items-center">
              {/* Stem segment connecting to flower */}
              <div className="stem-connector" />

              {/* Main stem */}
              <div className="stem">
                {/* Leaves attached directly to stem */}
                <div className="leaf-container left">
                  <div className="leaf leaf-left" />
                </div>
                <div className="leaf-container right">
                  <div className="leaf leaf-right" />
                </div>
              </div>

              {/* Ribbon tied around stem */}
              <div className="ribbon-wrapper">
                <div className="ribbon-knot" />
                <div className="ribbon-streamer left" />
                <div className="ribbon-streamer right" />
              </div>
            </div>

            {/* Supporting buds with their own stems */}
            <div className="absolute -left-16 top-8 flex flex-col items-center">
              <div className="bud-flower">
                <div className="petal petal-1 scale-75" />
                <div className="petal petal-2 scale-75" />
                <div className="petal petal-3 scale-75" />
                <div className="petal petal-4 scale-75" />
                <div className="center scale-75" />
              </div>
              <div className="bud-stem" />
            </div>

            <div className="absolute -right-16 top-12 flex flex-col items-center">
              <div className="bud-flower">
                <div className="petal petal-1 scale-75" />
                <div className="petal petal-2 scale-75" />
                <div className="petal petal-3 scale-75" />
                <div className="petal petal-4 scale-75" />
                <div className="center scale-75" />
              </div>
              <div className="bud-stem" />
            </div>
          </div>

          {/* Morning dew */}
          <div className="absolute top-4 left-1/2 transform -translate-x-16 w-1 h-1 bg-white/80 rounded-full blur-[0.5px]" />
          <div className="absolute top-8 right-1/2 transform translate-x-16 w-1 h-1 bg-white/80 rounded-full blur-[0.5px]" />
        </div>

        {/* Poetic description */}
        <div className="text-center mb-12 space-y-2">
          <h2 className="font-serif text-4xl italic text-rose-800 dark:text-rose-200">
            Éternelle La Sàntan
          </h2>
          <p className="font-light text-sm tracking-widest text-rose-600 dark:text-rose-400 uppercase">
            A single stem, infinite poetry
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
      </div>

      <style jsx global>{`
        .flower {
          position: relative;
          width: 60px;
          height: 60px;
          animation: gentleSway 4s cubic-bezier(0.45, 0.05, 0.55, 0.95) infinite;
          filter: drop-shadow(0 10px 15px rgba(251, 113, 133, 0.1));
        }

        .flower-1 {
          animation-delay: 0s;
        }

        .bud-flower {
          position: relative;
          width: 45px;
          height: 45px;
          animation: gentleSway 5s cubic-bezier(0.45, 0.05, 0.55, 0.95) infinite;
          filter: drop-shadow(0 8px 12px rgba(251, 113, 133, 0.1));
        }

        .petal {
          position: absolute;
          width: 28px;
          height: 28px;
          background: radial-gradient(circle at 30% 30%, #fb7185, #f43f5e);
          border-radius: 70% 30% 60% 40% / 60% 40% 70% 30%;
          opacity: 0.95;
          box-shadow: 0 4px 8px rgba(244, 63, 94, 0.2);
        }

        .petal-1 {
          transform: rotate(-15deg);
          left: 16px;
          top: 0;
        }
        .petal-2 {
          transform: rotate(75deg);
          left: 32px;
          top: 8px;
        }
        .petal-3 {
          transform: rotate(165deg);
          left: 20px;
          top: 28px;
        }
        .petal-4 {
          transform: rotate(255deg);
          left: 4px;
          top: 16px;
        }

        .center {
          position: absolute;
          width: 14px;
          height: 14px;
          background: radial-gradient(circle at 40% 40%, #fde047, #facc15);
          border-radius: 50%;
          left: 23px;
          top: 23px;
          box-shadow: 0 2px 6px rgba(250, 204, 21, 0.4);
        }

        .bud {
          position: absolute;
          width: 10px;
          height: 10px;
          background: #fda4af;
          border-radius: 50%;
          left: -5px;
          top: 10px;
          opacity: 0.6;
          filter: blur(1px);
        }

        .stem-connector {
          width: 3px;
          height: 15px;
          background: linear-gradient(180deg, #4ade80, #22c55e);
          border-radius: 2px 2px 0 0;
          margin-bottom: -2px;
        }

        .stem {
          position: relative;
          width: 4px;
          height: 80px;
          background: linear-gradient(180deg, #4ade80, #15803d);
          border-radius: 4px;
          box-shadow: 0 0 10px rgba(74, 222, 128, 0.2);
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .leaf-container {
          position: absolute;
          width: 100%;
          height: 100%;
          pointer-events: none;
        }

        .leaf-container.left {
          left: -15px;
          top: 30px;
        }

        .leaf-container.right {
          right: -15px;
          top: 45px;
        }

        .leaf {
          width: 35px;
          height: 18px;
          background: linear-gradient(135deg, #86efac, #22c55e);
          border-radius: 80% 20% 70% 30% / 40% 60% 40% 60%;
          position: relative;
          box-shadow: 0 4px 8px rgba(34, 197, 94, 0.2);
        }

        .leaf-left {
          transform: rotate(-35deg) scaleX(-1);
        }

        .leaf-right {
          transform: rotate(35deg);
        }

        .bud-stem {
          width: 2px;
          height: 30px;
          background: linear-gradient(180deg, #86efac, #22c55e);
          border-radius: 2px;
          margin-top: -8px;
          transform: rotate(5deg);
        }

        .ribbon-wrapper {
          position: absolute;
          bottom: 15px;
          left: 50%;
          transform: translateX(-50%);
          width: 50px;
          height: 20px;
          z-index: 15;
        }

        .ribbon-knot {
          position: absolute;
          width: 16px;
          height: 16px;
          background: linear-gradient(145deg, #ec4899, #db2777);
          border-radius: 6px;
          left: 17px;
          top: 2px;
          transform: rotate(45deg);
          box-shadow: 0 4px 8px rgba(236, 72, 153, 0.3);
        }

        .ribbon-streamer {
          position: absolute;
          width: 25px;
          height: 10px;
          background: linear-gradient(145deg, #f472b6, #ec4899);
          border-radius: 4px;
          top: 5px;
        }

        .ribbon-streamer.left {
          left: -10px;
          transform: rotate(-25deg);
          box-shadow: -2px 4px 8px rgba(236, 72, 153, 0.2);
        }

        .ribbon-streamer.right {
          right: -10px;
          transform: rotate(25deg);
          box-shadow: 2px 4px 8px rgba(236, 72, 153, 0.2);
        }

        @keyframes gentleSway {
          0%,
          100% {
            transform: rotate(-2deg) translateY(0);
          }
          50% {
            transform: rotate(2deg) translateY(-2px);
          }
        }

        @keyframes float {
          0%,
          100% {
            transform: translateY(0) translateX(0) rotate(0deg);
            opacity: 0.2;
          }
          50% {
            transform: translateY(-40px) translateX(10px) rotate(180deg);
            opacity: 0.4;
          }
        }
      `}</style>
    </div>
  );
}
