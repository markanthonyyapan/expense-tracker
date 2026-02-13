"use client";

export const dynamic = "force-dynamic";

import { useRouter } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import { useAuth } from "@/context/AuthContext";

export default function Bouquet4Page() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const [hoveredStar, setHoveredStar] = useState<number | null>(null);
  const [showResults, setShowResults] = useState(false);
  const [videoEnded, setVideoEnded] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (!authLoading && !user) {
      router.push("/");
    }
  }, [user, authLoading, router]);

  const handleRate = (rating: number) => {
    const ratings = JSON.parse(localStorage.getItem("bouquetRatings") || "{}");
    ratings[4] = rating;
    localStorage.setItem("bouquetRatings", JSON.stringify(ratings));
    setShowResults(true);
  };

  const handleSkip = () => {
    setShowResults(true);
  };

  const handleFinish = () => {
    sessionStorage.setItem("seenValentine", "true");
    router.push("/?skipValentine=true");
  };

  const getRatings = () => {
    return JSON.parse(localStorage.getItem("bouquetRatings") || "{}");
  };

  const getAverageRating = () => {
    const ratings = getRatings();
    const values = Object.values(ratings);
    if (values.length === 0) return 0;
    const sum = values.reduce(
      (acc: number, val: unknown) => acc + (val as number),
      0,
    );
    return (sum / values.length).toFixed(1);
  };

  const getTopBouquet = () => {
    const ratings = getRatings();
    const entries = Object.entries(ratings) as [string, number][];
    if (entries.length === 0) return null;
    const sorted = entries.sort((a, b) => b[1] - a[1]);
    const topId = sorted[0][0];
    const names: Record<string, string> = {
      "1": "Eternelle La Sàntan",
      "2": "Tulipes de Sálabât",
      "3": "Bouquet Màlungay Chiz",
      "4": "Bouquet de Marc",
    };
    return {
      id: topId,
      name: names[topId] || `Bouquet ${topId}`,
      rating: sorted[0][1],
    };
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

  if (showResults) {
    const topBouquet = getTopBouquet();
    return (
      <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-rose-50 via-pink-50 to-red-50 dark:from-gray-950 dark:via-gray-900 dark:to-rose-950">
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
          <div className="text-center mb-8">
            <h1 className="font-serif text-4xl italic text-rose-800 dark:text-rose-200 mb-6">
              Happy Valentine&apos;s Day!
            </h1>
          </div>

          {topBouquet && (
            <div className="backdrop-blur-sm bg-white/30 dark:bg-gray-900/30 p-8 rounded-3xl shadow-2xl border border-rose-200/50 dark:border-rose-800/30 mb-8">
              <p className="text-xs uppercase tracking-[0.3em] text-rose-600 dark:text-rose-400 mb-4 text-center font-light">
                Your Most Cherished
              </p>
              <p className="font-serif text-2xl italic text-rose-800 dark:text-rose-200 mb-2">
                {topBouquet.name}
              </p>
              <p className="text-4xl text-center mt-4">
                {"★".repeat(topBouquet.rating)}
                {"☆".repeat(5 - topBouquet.rating)}
              </p>
            </div>
          )}

          <div className="backdrop-blur-sm bg-white/30 dark:bg-gray-900/30 p-6 rounded-2xl shadow-xl border border-rose-200/50 dark:border-rose-800/30">
            <p className="text-xs uppercase tracking-wider text-rose-600 dark:text-rose-400 mb-2 text-center">
              Your Average Rating
            </p>
            <p className="font-serif text-3xl text-center text-rose-800 dark:text-rose-200">
              {getAverageRating()}/5
            </p>
          </div>

          <button
            onClick={handleFinish}
            className="mt-8 px-8 py-4 bg-gradient-to-r from-rose-400 to-rose-500 text-white text-sm font-semibold rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
          >
            Continue to Expense Tracker
          </button>
        </div>
      </div>
    );
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
                The Grand Finale
              </span>
              <div className="w-32 h-1 bg-rose-200/50 dark:bg-rose-900/50 rounded-full overflow-hidden">
                <div className="h-full w-full bg-gradient-to-r from-rose-400 to-rose-500 rounded-full animate-pulse" />
              </div>
              <span className="text-xs text-rose-600 dark:text-rose-400 font-light">
                4/4
              </span>
            </div>
          </div>
        </div>

        {/* Video Container */}
        <div className="relative mb-12">
          <div className="backdrop-blur-sm bg-white/30 dark:bg-gray-900/30 p-3 rounded-2xl shadow-xl border border-rose-200/50 dark:border-rose-800/30">
            <video
              ref={videoRef}
              className="max-w-xs w-full rounded-xl"
              controls
              onEnded={() => setVideoEnded(true)}
            >
              {/* Replace with your video path */}
              <source src="/bouquet-video.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>

          {!videoEnded && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <p className="text-xs uppercase tracking-wider text-rose-600/70 dark:text-rose-400/70 bg-white/50 dark:bg-gray-900/50 px-4 py-2 rounded-full">
                Watch the video
              </p>
            </div>
          )}
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
      `}</style>
    </div>
  );
}
