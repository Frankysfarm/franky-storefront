"use client";

export function BonusCard() {
  const filled = 2;
  const total = 5;

  return (
    <section className="max-w-[1240px] mx-auto mt-4 px-6">
      <div
        className="relative overflow-hidden rounded-[18px] p-5 border-[1.5px] border-[rgba(228,192,104,0.35)]"
        style={{
          background: "linear-gradient(135deg, #2a3a2c 0%, #4a5e4a 100%)",
          boxShadow: "0 0 0 1.5px rgba(228,192,104,0.4) inset, 0 8px 32px -8px rgba(42,58,44,0.3)",
          animation: "loyalty-enter 0.5s ease-out",
        }}
      >
        {/* Glow behind icon */}
        <div
          className="absolute left-5 top-1/2 w-16 h-16 rounded-full pointer-events-none"
          style={{
            background: "radial-gradient(ellipse, rgba(228,192,104,0.35) 0%, transparent 70%)",
            animation: "loyalty-glow-pulse 4s ease-in-out infinite",
          }}
        />

        {/* Shine sweep overlay */}
        <div className="absolute inset-0 overflow-hidden rounded-[18px] pointer-events-none">
          <div
            className="absolute top-0 bottom-0 w-[25%] bg-gradient-to-r from-transparent via-white/10 to-transparent"
            style={{
              animation: "loyalty-shine-sweep 4.5s ease-in-out infinite 1.5s",
            }}
          />
        </div>

        <div className="relative z-[1] flex items-center gap-4">
          {/* Icon */}
          <div
            className="flex-shrink-0 w-12 h-12 rounded-[14px] flex items-center justify-center text-2xl"
            style={{
              background: "linear-gradient(135deg, #e4c068 0%, #c9a227 100%)",
              animation: "loyalty-icon-bob 3s ease-in-out infinite",
            }}
          >
            🎁
          </div>

          {/* Middle content */}
          <div className="flex-1 min-w-0">
            <div className="text-[10px] font-extrabold tracking-[1.4px] text-gold mb-0.5">
              BONUS-CLUB
            </div>
            <div className="font-display font-black text-white text-[15px] leading-tight mb-2.5">
              Jede 5. Bestellung = 1 Pasta gratis
            </div>

            {/* Progress dots */}
            <div className="flex items-center gap-1.5">
              {Array.from({ length: total }).map((_, i) => {
                const isFilled = i < filled;
                const isLast = i === total - 1;

                if (isLast) {
                  return (
                    <div
                      key={i}
                      className="w-7 h-7 rounded-full flex items-center justify-center text-sm"
                      style={{
                        background: isFilled
                          ? "linear-gradient(135deg, #e4c068, #c9a227)"
                          : "rgba(255,255,255,0.12)",
                        border: isFilled ? "none" : "1.5px solid rgba(255,255,255,0.2)",
                      }}
                    >
                      🎁
                    </div>
                  );
                }

                return (
                  <div
                    key={i}
                    className="w-6 h-6 rounded-full"
                    style={{
                      background: isFilled
                        ? "linear-gradient(135deg, #e4c068, #c9a227)"
                        : "rgba(255,255,255,0.12)",
                      border: isFilled ? "none" : "1.5px solid rgba(255,255,255,0.2)",
                    }}
                  />
                );
              })}
            </div>
          </div>

          {/* Right count */}
          <div className="flex-shrink-0 text-right">
            <div className="font-display font-black text-2xl text-white leading-none">
              {filled}/{total}
            </div>
            <div
              className="mt-1 w-5 h-5 rounded-full border border-[rgba(228,192,104,0.5)] flex items-center justify-center text-xs text-gold cursor-pointer ml-auto"
              title="Sammle 5 Bestellungen und erhalte eine Pasta gratis"
            >
              ?
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
