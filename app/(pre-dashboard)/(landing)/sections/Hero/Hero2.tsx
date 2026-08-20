'use client';
import Image from 'next/image';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getSelf } from '@/app/lib/data';
import { fuzzy } from '@/app/ui/fonts';

/**
 * F2026 HERO
 *
 * Replaces the F2025 two-column layout (title.png left, dragon.png right) with
 * the centred, layered composition from the F26 design.
 *
 * WHY TWO IMAGES INSTEAD OF ONE:
 * tree-background.png and frog.png are both exactly 3500x7665. They are two
 * layers of a single artwork - the misty forest behind, and the cliff walls +
 * branch arch + frog in front, with the middle of the foreground left
 * transparent. Because the intrinsic aspect ratios are identical, stacking the
 * foreground at `absolute inset-0` keeps the two locked together at every
 * viewport width with no per-breakpoint tuning.
 *
 * WHY NO title.png / button1.png / button2.png EQUIVALENTS:
 * The F26 asset drop contains no wordmark and no button art, and the design
 * does not need them - the mockup renders "HACKRU" as type and the two calls
 * to action as flat rounded pills. Both are CSS here.
 */

const BG_W = 3500;
const BG_H = 7665;

async function fetchUser(cb: (isLogged: boolean) => void) {
  try {
    const data = await getSelf();
    if (data.error !== '') {
      cb(false);
      return;
    }
    cb(true);
  } catch (error) {
    console.log(error);
  }
}

export default function Hero() {
  const [isLogged, setIsLogged] = useState(false);
  const router = useRouter();

  // Unchanged from F2025: decides whether the second button reads LOG IN or
  // DASHBOARD. Kept deliberately - this is auth behaviour, not styling.
  useEffect(() => {
    fetchUser(setIsLogged);
  }, []);

  return (
    <section className="relative w-full overflow-hidden">
      {/* ---------- BACKDROP ---------- */}
      {/* The background image is in normal flow, so IT defines the section's
          height. Everything else is absolutely positioned against it. */}
      <Image
        src="/landing/F2026/tree-background.png"
        alt=""
        aria-hidden="true"
        width={BG_W}
        height={BG_H}
        priority
        className="h-auto w-full select-none"
      />

      {/* Foreground layer: cliffs, branch arch and the frog. Same intrinsic
          dimensions as the background, so inset-0 aligns them exactly. */}
      <Image
        src="/landing/F2026/frog.png"
        alt="A frog in a mushroom cap working on a laptop"
        width={BG_W}
        height={BG_H}
        priority
        className="pointer-events-none absolute inset-0 h-auto w-full select-none"
      />

      {/* ---------- CONTENT OVERLAY ---------- */}
      {/* Percentage padding, not fixed px: the artwork scales with viewport
          width, so the copy has to scale with it or it drifts off the arch. */}
      <div className="absolute inset-x-0 top-0 flex flex-col items-center pt-[6%]">
        <h1
          className={`${fuzzy.className} select-none text-center leading-none
            text-[#FBF3B9]
            text-6xl sm:text-7xl md:text-8xl lg:text-9xl`}
          style={{
            // Layered shadows fake the outlined-and-lifted look of the mockup
            // wordmark. Cheaper and sharper than shipping another PNG.
            textShadow:
              '0 0 2px #2F4F2F, 0 4px 0 #3E6B3E, 0 8px 18px rgba(0,0,0,0.45)',
          }}
        >
          HACKRU
        </h1>

        <p className={`${fuzzy.className} mt-[1.5%] text-center text-sm text-white/90 sm:text-lg md:text-xl`}>
          October 10th - 11th, Busch Student Center
        </p>

        <div className="mt-[2.5%] flex items-center justify-center gap-4 sm:gap-6">
          {/* SIGN UP - pink pill, matches the mockup's left-hand button */}
          <button
            onClick={() => router.push('/signup')}
            className={`${fuzzy.className} rounded-full bg-[#E8579A] px-6 py-2
              text-base text-white shadow-[0_4px_0_#A82F6B] ring-2 ring-white/70
              transition-transform duration-100 hover:scale-105
              sm:px-10 sm:py-3 sm:text-xl md:text-2xl`}
          >
            SIGN UP
          </button>

          {/* LOG IN / DASHBOARD - blue pill. Label and destination still driven
              by the auth check above, exactly as in F2025. */}
          <button
            onClick={() => router.push(isLogged ? '/dashboard' : '/login')}
            className={`${fuzzy.className} rounded-full bg-[#4A9FE0] px-6 py-2
              text-base text-white ring-2 ring-white/70
              transition-transform duration-100 hover:scale-105
              sm:px-10 sm:py-3 sm:text-xl md:text-2xl`}
          >
            {!isLogged ? 'LOG IN' : 'DASHBOARD'}
          </button>
        </div>
      </div>
    </section>
  );
}
