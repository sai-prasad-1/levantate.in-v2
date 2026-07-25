"use client";

import { useEffect, useRef, useState } from "react";

const STATUS_LINES = [
  "Warming the studio feed",
  "Compositing first frame",
  "Syncing motion path",
  "Loading Levantate reel",
  "Almost in frame",
] as const;

type LoadPhase = "loading" | "ready" | "error";

export function HeroMedia() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [phase, setPhase] = useState<LoadPhase>("loading");
  const [progress, setProgress] = useState(0);
  const [statusIndex, setStatusIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (phase !== "loading") return;

    const progressTimer = window.setInterval(() => {
      setProgress((current) => {
        if (current >= 92) return current;
        const step = current < 40 ? 2.4 : current < 70 ? 1.4 : 0.55;
        return Math.min(92, current + step);
      });
    }, 80);

    const statusTimer = window.setInterval(() => {
      setStatusIndex((i) => (i + 1) % STATUS_LINES.length);
    }, 1600);

    return () => {
      window.clearInterval(progressTimer);
      window.clearInterval(statusTimer);
    };
  }, [phase]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const markReady = () => {
      setProgress(100);
      setPhase("ready");
      void video.play().catch(() => {
        /* autoplay may be blocked; still show the frame */
      });
    };

    if (video.readyState >= 3) {
      markReady();
      return;
    }

    video.addEventListener("canplaythrough", markReady, { once: true });
    video.addEventListener("loadeddata", markReady, { once: true });
    video.addEventListener(
      "error",
      () => {
        setPhase("error");
        setProgress(100);
      },
      { once: true },
    );

    return () => {
      video.removeEventListener("canplaythrough", markReady);
      video.removeEventListener("loadeddata", markReady);
    };
  }, []);

  useEffect(() => {
    if (phase !== "ready") return;
    const hide = window.setTimeout(() => setVisible(false), 700);
    return () => window.clearTimeout(hide);
  }, [phase]);

  const displayProgress = Math.min(100, Math.round(progress));

  return (
    <div className="absolute inset-0 overflow-hidden bg-ink">
      <video
        ref={videoRef}
        className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ease-out ${
          phase === "ready" ? "opacity-100" : "opacity-0"
        }`}
        src="/hero.mp4"
        muted
        loop
        playsInline
        preload="auto"
        aria-label="Levantate Labs studio reel"
      />

      {visible ? (
        <div
          className={`absolute inset-0 z-[2] flex items-end justify-between overflow-hidden bg-[linear-gradient(145deg,#16150f_0%,#1c1a14_42%,#2a1812_100%)] transition-opacity duration-700 ease-out ${
            phase === "ready" ? "pointer-events-none opacity-0" : "opacity-100"
          }`}
          aria-busy={phase === "loading"}
          aria-live="polite"
        >
          {/* Atmosphere */}
          <div
            className="pointer-events-none absolute inset-0 opacity-50"
            style={{
              backgroundImage:
                "radial-gradient(circle at 18% 22%, rgba(199,74,38,0.28), transparent 38%), radial-gradient(circle at 82% 78%, rgba(247,245,240,0.08), transparent 42%)",
            }}
          />
          <div
            className="hero-loader-grid pointer-events-none absolute inset-0 opacity-[0.14]"
            aria-hidden
          />
          <div
            className="hero-loader-scan pointer-events-none absolute inset-x-0 h-[28%] opacity-40"
            aria-hidden
          />

          {/* Orbital loader */}
          <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[58%]">
            <div className="relative h-[148px] w-[148px] sm:h-[180px] sm:w-[180px]">
              <div className="hero-loader-ring absolute inset-0 rounded-full border border-[rgba(247,245,240,0.12)]" />
              <div className="hero-loader-ring-a absolute inset-[10px] rounded-full border border-transparent border-t-[rgba(199,74,38,0.85)] border-r-[rgba(247,245,240,0.2)]" />
              <div className="hero-loader-ring-b absolute inset-[26px] rounded-full border border-transparent border-b-[rgba(247,245,240,0.55)] border-l-[rgba(199,74,38,0.45)]" />
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-1">
                <span className="font-mono text-[10px] tracking-[0.22em] text-[rgba(247,245,240,0.45)] uppercase">
                  Frame
                </span>
                <span className="font-mono text-[28px] leading-none tracking-[-0.04em] text-bone tabular-nums sm:text-[34px]">
                  {String(displayProgress).padStart(2, "0")}
                  <span className="text-[16px] text-ember">%</span>
                </span>
              </div>
              <div className="hero-loader-orbit pointer-events-none absolute inset-0">
                <span className="absolute top-0 left-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-ember shadow-[0_0_12px_rgba(199,74,38,0.65)]" />
              </div>
            </div>
          </div>

          {/* Copy / status */}
          <div className="relative z-[1] flex w-full flex-col gap-5 p-5 sm:flex-row sm:items-end sm:justify-between sm:p-7 md:p-8">
            <div className="max-w-[420px]">
              <div className="mb-3 inline-flex items-center gap-2.5 font-mono text-[11px] tracking-[0.14em] text-[rgba(247,245,240,0.5)] uppercase">
                <span className="inline-block h-[6px] w-[6px] shrink-0 bg-ember" />
                Fig. 01 — studio reel
              </div>
              <p className="m-0 text-[20px] font-semibold tracking-[-0.03em] text-bone sm:text-[24px]">
                {phase === "error"
                  ? "Reel unavailable"
                  : "Preparing the opening frame"}
              </p>
              <p className="mt-2 mb-0 min-h-[1.4em] font-mono text-[12px] tracking-[0.06em] text-[rgba(247,245,240,0.48)] uppercase sm:text-[12.5px]">
                {phase === "error"
                  ? "Continue scrolling — the studio still stands"
                  : STATUS_LINES[statusIndex]}
                {phase === "loading" ? (
                  <span className="hero-loader-ellipsis ml-1 inline-block w-[1.2em]" />
                ) : null}
              </p>
            </div>

            <div className="flex flex-col gap-2 font-mono text-[11px] tracking-[0.1em] text-[rgba(247,245,240,0.4)] uppercase sm:items-end sm:text-right">
              <span>Source · hero.mp4</span>
              <span className="text-[rgba(247,245,240,0.55)]">
                {phase === "ready"
                  ? "Ready · playback"
                  : phase === "error"
                    ? "Fallback · silent"
                    : "Buffer · decode · paint"}
              </span>
              <div className="mt-1 h-px w-full max-w-[180px] overflow-hidden bg-[rgba(247,245,240,0.12)] sm:ml-auto">
                <div
                  className="h-full bg-ember transition-[width] duration-200 ease-out"
                  style={{ width: `${displayProgress}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
