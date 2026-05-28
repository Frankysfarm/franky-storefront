"use client";

interface Props {
  filled?: number;
  total?: number;
  onClick?: () => void;
}

export function LoyaltyCard({ filled = 3, total = 5, onClick }: Props) {
  const progressPercent = (filled / total) * 100;

  return (
    <section className="max-w-[1240px] mx-auto mt-4 px-6">
      <button
        onClick={onClick}
        className="w-full relative overflow-hidden rounded-[18px] p-4 sm:p-5 text-left flex items-center gap-4 sm:gap-5 transition-transform hover:-translate-y-[2px]"
        style={{
          background: `
            radial-gradient(ellipse at top right, rgba(228,192,104,0.25) 0%, transparent 55%),
            radial-gradient(ellipse at bottom left, rgba(74,94,74,0.2) 0%, transparent 60%),
            linear-gradient(135deg, #2a3a2c 0%, #3a4a3a 50%, #4a5e4a 100%)
          `,
          color: "var(--color-cream)",
          boxShadow:
            "0 4px 18px -4px rgba(74,94,74,0.35), 0 0 0 1.5px rgba(228,192,104,0.4) inset, 0 0 0 3px rgba(228,192,104,0.12)",
          animation: "loyalty-enter 0.7s cubic-bezier(0.22, 1, 0.36, 1) 0.3s both",
        }}
      >
        {/* Ambient glow behind icon */}
        <div
          className="absolute pointer-events-none"
          style={{
            width: 140,
            height: 140,
            left: -20,
            top: "50%",
            transform: "translateY(-50%)",
            background: "radial-gradient(circle, rgba(228,192,104,0.35) 0%, transparent 60%)",
            animation: "loyalty-glow-pulse 4s ease-in-out infinite",
          }}
        />

        {/* Shine sweep overlay */}
        <div
          className="absolute inset-0 pointer-events-none overflow-hidden rounded-[18px]"
        >
          <div
            className="absolute top-0 bottom-0 w-[30%]"
            style={{
              background:
                "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.12) 50%, transparent 100%)",
              animation: "loyalty-shine-sweep 4.5s ease-in-out infinite 1.5s",
            }}
          />
        </div>

        {/* Gift Icon (big, with glow) */}
        <div
          className="relative z-[1] flex-shrink-0 w-14 h-14 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center text-3xl sm:text-4xl"
          style={{
            background: "linear-gradient(135deg, #e4c068 0%, #c9a227 100%)",
            boxShadow: "0 4px 12px rgba(201,162,39,0.4)",
            animation: "loyalty-icon-bob 3s ease-in-out infinite",
          }}
        >
          🎁
        </div>

        {/* Content */}
        <div className="relative z-[1] flex-1 min-w-0">
          {/* Tag */}
          <div
            className="text-[10px] sm:text-[11px] font-extrabold tracking-[1.4px] mb-1.5"
            style={{ color: "var(--color-gold)" }}
          >
            FRANKY&apos;S BONUS-CLUB
          </div>

          {/* Headline */}
          <div
            className="font-display font-extrabold leading-tight text-white mb-3"
            style={{ fontSize: "clamp(14px, 2vw, 17px)", letterSpacing: "-0.02em" }}
          >
            Jede{" "}
            <em
              className="not-italic font-black italic"
              style={{ color: "var(--color-gold)" }}
            >
              5. Bestellung
            </em>{" "}
            = 1 Pasta gratis
          </div>

          {/* Progress bar with milestones */}
          <div className="flex items-center gap-3">
            <div
              className="relative flex-1 h-[7px] rounded-full overflow-visible"
              style={{ background: "rgba(245,242,231,0.15)", boxShadow: "0 1px 2px rgba(0,0,0,0.2) inset" }}
            >
              {/* Fill bar */}
              <div
                className="absolute inset-y-0 left-0 rounded-full overflow-hidden"
                style={{
                  width: `${progressPercent}%`,
                  background: "linear-gradient(90deg, #c9a227 0%, #e4c068 50%, #f7d77a 100%)",
                  boxShadow: "0 0 10px rgba(228,192,104,0.55)",
                }}
              >
                {/* Shimmer */}
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.55) 50%, transparent 100%)",
                    animation: "lt-shimmer 3.2s ease-in-out infinite 2s",
                  }}
                />
              </div>

              {/* Milestones (5 dots + gift) */}
              <div className="absolute inset-x-0 -inset-y-[2px] flex justify-between items-center pointer-events-none">
                {Array.from({ length: total - 1 }).map((_, i) => {
                  const isDone = i < filled;
                  return (
                    <div
                      key={i}
                      className="w-2.5 h-2.5 sm:w-[11px] sm:h-[11px] rounded-full border-2"
                      style={{
                        background: isDone ? "var(--color-gold)" : "rgba(245,242,231,0.2)",
                        borderColor: isDone ? "var(--color-gold)" : "rgba(245,242,231,0.35)",
                        boxShadow: isDone ? "0 0 8px rgba(228,192,104,0.6)" : "none",
                      }}
                    />
                  );
                })}
                {/* Gift milestone */}
                <div
                  className="w-5 h-5 sm:w-6 sm:h-6 rounded-full flex items-center justify-center text-[10px] sm:text-xs"
                  style={{
                    background: filled >= total
                      ? "linear-gradient(135deg, #e4c068, #c9a227)"
                      : "rgba(245,242,231,0.2)",
                    border: filled >= total ? "none" : "2px solid rgba(245,242,231,0.35)",
                  }}
                >
                  🎁
                </div>
              </div>
            </div>

            {/* Counter */}
            <div className="flex-shrink-0 flex items-baseline gap-0.5">
              <span
                className="font-display font-black text-2xl sm:text-3xl leading-none"
                style={{ color: "var(--color-gold)" }}
              >
                {filled}
              </span>
              <span className="text-sm sm:text-base text-white/60 font-mono">/{total}</span>
            </div>
          </div>
        </div>

        {/* Info icon */}
        <div
          className="relative z-[1] flex-shrink-0 hidden sm:flex w-7 h-7 rounded-full items-center justify-center"
          style={{
            border: "1.5px solid rgba(228,192,104,0.5)",
            color: "var(--color-gold)",
          }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="16" x2="12" y2="12" />
            <line x1="12" y1="8" x2="12.01" y2="8" />
          </svg>
        </div>
      </button>
    </section>
  );
}
