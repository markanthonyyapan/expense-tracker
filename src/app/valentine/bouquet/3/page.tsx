"use client";

export const dynamic = "force-dynamic";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";

export default function Bouquet3Page() {
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
    ratings[3] = rating;
    localStorage.setItem("bouquetRatings", JSON.stringify(ratings));
    router.push("/valentine/bouquet/4");
  };

  const handleSkip = () => {
    router.push("/valentine/bouquet/4");
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
        {[...Array(8)].map((_, i) => (
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
                Third Bloom
              </span>
              <div className="w-32 h-1 bg-rose-200/50 dark:bg-rose-900/50 rounded-full overflow-hidden">
                <div className="h-full w-full bg-gradient-to-r from-rose-400 to-rose-500 rounded-full animate-pulse" />
              </div>
              <span className="text-xs text-rose-600 dark:text-rose-400 font-light">
                3/4
              </span>
            </div>
          </div>
        </div>

        {/* Elegant Rose Bouquet */}
        <div className="relative mb-12 transform hover:scale-105 transition-transform duration-700">
          {/* Sparkles */}
          <div className="sparkles">
            <div className="sparkle sparkle-1">✨</div>
            <div className="sparkle sparkle-2">✨</div>
            <div className="sparkle sparkle-3">✨</div>
            <div className="sparkle sparkle-4">✨</div>
            <div className="sparkle sparkle-5">✨</div>
          </div>

          {/* Flowers Container */}
          <div className="flex flex-wrap justify-center items-end gap-[-15px] relative z-10">
            {/* Center flower */}
            <div className="elegant-flower center-flower">
              <div className="e-petal e-petal-1" />
              <div className="e-petal e-petal-2" />
              <div className="e-petal e-petal-3" />
              <div className="e-petal e-petal-4" />
              <div className="e-petal e-petal-5" />
              <div className="e-petal e-petal-6" />
              <div className="e-center" />
            </div>

            {/* Surrounding flowers */}
            <div className="elegant-flower sf-1">
              <div className="e-petal e-petal-1" />
              <div className="e-petal e-petal-2" />
              <div className="e-petal e-petal-3" />
              <div className="e-petal e-petal-4" />
              <div className="e-center" />
            </div>
            <div className="elegant-flower sf-2">
              <div className="e-petal e-petal-1" />
              <div className="e-petal e-petal-2" />
              <div className="e-petal e-petal-3" />
              <div className="e-petal e-petal-4" />
              <div className="e-center" />
            </div>
            <div className="elegant-flower sf-3">
              <div className="e-petal e-petal-1" />
              <div className="e-petal e-petal-2" />
              <div className="e-petal e-petal-3" />
              <div className="e-petal e-petal-4" />
              <div className="e-center" />
            </div>
            <div className="elegant-flower sf-4">
              <div className="e-petal e-petal-1" />
              <div className="e-petal e-petal-2" />
              <div className="e-petal e-petal-3" />
              <div className="e-petal e-petal-4" />
              <div className="e-center" />
            </div>
            <div className="elegant-flower sf-5">
              <div className="e-petal e-petal-1" />
              <div className="e-petal e-petal-2" />
              <div className="e-petal e-petal-3" />
              <div className="e-petal e-petal-4" />
              <div className="e-center" />
            </div>
          </div>

          {/* Decorative leaves */}
          <div className="elegant-leaves">
            <div className="e-leaf e-leaf-1" />
            <div className="e-leaf e-leaf-2" />
            <div className="e-leaf e-leaf-3" />
            <div className="e-leaf e-leaf-4" />
          </div>

          {/* Elegant stem */}
          <div className="elegant-stem">
            <div className="es-1" />
            <div className="es-2" />
            <div className="es-3" />
          </div>

          {/* Elegant ribbon with bow */}
          <div className="elegant-ribbon">
            <div className="er-bow">
              <div className="er-loop er-loop-1" />
              <div className="er-loop er-loop-2" />
              <div className="er-loop er-loop-3" />
              <div className="er-knot" />
            </div>
          </div>
        </div>

        {/* Poetic description */}
        <div className="text-center mb-12 space-y-2">
          <h2 className="font-serif text-4xl italic text-rose-800 dark:text-rose-200">
            Bouquet Màlungay Chiz
          </h2>
          <p className="font-light text-sm tracking-widest text-rose-600 dark:text-rose-400 uppercase">
            The crown jewel of our collection
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

        .sparkles {
          position: absolute;
          width: 200px;
          height: 200px;
          top: -50px;
          left: 50%;
          transform: translateX(-50%);
        }
        .sparkle {
          position: absolute;
          font-size: 1.2rem;
          animation: sparkleAnim 1.5s ease-in-out infinite;
        }
        .sparkle-1 {
          top: 0;
          left: 50%;
          animation-delay: 0s;
        }
        .sparkle-2 {
          top: 20%;
          left: 10%;
          animation-delay: 0.3s;
        }
        .sparkle-3 {
          top: 60%;
          left: 5%;
          animation-delay: 0.6s;
        }
        .sparkle-4 {
          top: 20%;
          right: 10%;
          animation-delay: 0.9s;
        }
        .sparkle-5 {
          top: 60%;
          right: 5%;
          animation-delay: 1.2s;
        }

        @keyframes sparkleAnim {
          0%,
          100% {
            opacity: 0.3;
            transform: scale(1);
          }
          50% {
            opacity: 1;
            transform: scale(1.3);
          }
        }

        .elegant-flower {
          position: relative;
          width: 45px;
          height: 45px;
        }
        .center-flower {
          width: 55px;
          height: 55px;
          margin: 0 5px;
          animation: gentleSway 4s cubic-bezier(0.45, 0.05, 0.55, 0.95) infinite;
        }
        .sf-1 {
          animation: gentleSway 4s cubic-bezier(0.45, 0.05, 0.55, 0.95) 0.2s
            infinite;
          margin-top: -20px;
        }
        .sf-2 {
          animation: gentleSway 4s cubic-bezier(0.45, 0.05, 0.55, 0.95) 0.4s
            infinite;
        }
        .sf-3 {
          animation: gentleSway 4s cubic-bezier(0.45, 0.05, 0.55, 0.95) 0.6s
            infinite;
          margin-top: -20px;
        }
        .sf-4 {
          animation: gentleSway 4s cubic-bezier(0.45, 0.05, 0.55, 0.95) 0.8s
            infinite;
        }
        .sf-5 {
          animation: gentleSway 4s cubic-bezier(0.45, 0.05, 0.55, 0.95) 1s
            infinite;
          margin-top: -20px;
        }

        .e-petal {
          position: absolute;
          width: 25px;
          height: 25px;
          background: linear-gradient(
            135deg,
            #f43f5e 0%,
            #e11d48 50%,
            #be123c 100%
          );
          border-radius: 50% 0 50% 50%;
          box-shadow: inset 0 -5px 10px rgba(0, 0, 0, 0.1);
        }
        .e-petal-1 {
          transform: rotate(0deg);
          left: 10px;
          top: 0;
        }
        .e-petal-2 {
          transform: rotate(72deg);
          left: 22px;
          top: 8px;
        }
        .e-petal-3 {
          transform: rotate(144deg);
          left: 17px;
          top: 22px;
        }
        .e-petal-4 {
          transform: rotate(216deg);
          left: 3px;
          top: 22px;
        }
        .e-petal-5 {
          transform: rotate(288deg);
          left: -2px;
          top: 8px;
        }
        .e-petal-6 {
          transform: rotate(36deg);
          left: 10px;
          top: -5px;
        }

        .center-flower .e-petal {
          width: 30px;
          height: 30px;
        }
        .center-flower .e-petal-1 {
          left: 12px;
          top: 5px;
        }
        .center-flower .e-petal-2 {
          left: 28px;
          top: 15px;
        }
        .center-flower .e-petal-3 {
          left: 22px;
          top: 32px;
        }
        .center-flower .e-petal-4 {
          left: 2px;
          top: 32px;
        }
        .center-flower .e-petal-5 {
          left: -4px;
          top: 15px;
        }
        .center-flower .e-petal-6 {
          left: 12px;
          top: 2px;
        }

        .e-center {
          position: absolute;
          width: 15px;
          height: 15px;
          background: radial-gradient(circle, #fcd34d 0%, #f59e0b 100%);
          border-radius: 50%;
          left: 15px;
          top: 15px;
          box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
        }
        .center-flower .e-center {
          width: 18px;
          height: 18px;
          left: 18px;
          top: 18px;
        }

        .elegant-leaves {
          position: absolute;
          bottom: 50px;
          left: 50%;
          transform: translateX(-50%);
        }
        .e-leaf {
          position: absolute;
          width: 50px;
          height: 25px;
          background: linear-gradient(135deg, #22c55e 0%, #16a34a 100%);
          border-radius: 0 70% 0 70%;
          box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
        }
        .e-leaf-1 {
          transform: rotate(-50deg);
          left: -60px;
          bottom: -10px;
        }
        .e-leaf-2 {
          transform: rotate(-30deg);
          left: -40px;
          bottom: -5px;
        }
        .e-leaf-3 {
          transform: rotate(50deg) scaleX(-1);
          right: -60px;
          bottom: -10px;
        }
        .e-leaf-4 {
          transform: rotate(30deg) scaleX(-1);
          right: -40px;
          bottom: -5px;
        }

        .elegant-stem {
          position: relative;
          width: 50px;
          height: 100px;
          margin: 0 auto;
        }
        .es-1,
        .es-2,
        .es-3 {
          position: absolute;
          width: 6px;
          height: 80px;
          background: linear-gradient(
            90deg,
            #22c55e 0%,
            #16a34a 50%,
            #22c55e 100%
          );
          border-radius: 3px;
          bottom: 0;
        }
        .es-1 {
          left: 10px;
          transform: rotate(-3deg);
        }
        .es-2 {
          left: 22px;
        }
        .es-3 {
          left: 34px;
          transform: rotate(3deg);
        }

        .elegant-ribbon {
          position: absolute;
          bottom: 90px;
          left: 50%;
          transform: translateX(-50%);
        }
        .er-bow {
          position: relative;
        }
        .er-loop {
          position: absolute;
          width: 30px;
          height: 20px;
          background: linear-gradient(135deg, #ec4899 0%, #db2777 100%);
          border-radius: 50%;
        }
        .er-loop-1 {
          left: -25px;
          top: 0;
          transform: rotate(-30deg);
          animation: bowPulse 2s ease-in-out infinite;
        }
        .er-loop-2 {
          right: -25px;
          top: 0;
          transform: rotate(30deg);
          animation: bowPulse 2s ease-in-out infinite 0.3s;
        }
        .er-loop-3 {
          left: 50%;
          top: 5px;
          transform: translateX(-50%);
          width: 20px;
          height: 15px;
        }
        .er-knot {
          position: absolute;
          width: 15px;
          height: 15px;
          background: #be185d;
          border-radius: 50%;
          left: 50%;
          top: 8px;
          transform: translateX(-50%);
        }

        @keyframes gentleSway {
          0%,
          100% {
            transform: rotate(-2deg);
          }
          50% {
            transform: rotate(2deg);
          }
        }
        @keyframes bowPulse {
          0%,
          100% {
            transform: rotate(-30deg) scale(1);
          }
          50% {
            transform: rotate(-25deg) scale(1.1);
          }
        }
      `}</style>
    </div>
  );
}
