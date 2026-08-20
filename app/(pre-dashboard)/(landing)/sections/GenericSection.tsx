import SectionTitle from './SectionTitle';
import { ReactNode } from 'react';
import Image from 'next/image';

/**
 * GenericSection - section wrapper with a themed header.
 *
 * WHY THIS WAS REWRITTEN
 * The F2025 version branched on `props.title` as a raw string through three
 * nested ternaries (Sponsors -> else Schedule -> else FAQ -> else default).
 * All three branches rendered the SAME header1.png with near-identical markup,
 * so every new section meant another level of nesting. The F26 design needs
 * three DIFFERENT headers, which under the old shape would have meant three
 * more branches.
 *
 * Replaced with a lookup table. Adding a section is now one entry, and the
 * rendering logic is read once instead of once per branch.
 */

/** Ribbon art, sized to the F26 assets. */
type HeaderStyle =
  | { kind: 'ribbon'; src: string }
  | { kind: 'pill' }
  | { kind: 'default' };

/**
 * Per-section header treatment, taken from the F26 mockup:
 *   Schedule -> blue ribbon      Sponsors -> red pill      FAQ -> pink ribbon
 * A title with no entry falls through to <SectionTitle />, which is what the
 * old `else` branch did.
 */
const HEADER_BY_TITLE: Record<string, HeaderStyle> = {
  Schedule: { kind: 'ribbon', src: '/landing/F2026/ribbon-blue.png' },
  FAQ: { kind: 'ribbon', src: '/landing/F2026/ribbon-pink.png' },
  Sponsors: { kind: 'pill' },
};

function SectionHeader({ title }: { title: string }) {
  const style = HEADER_BY_TITLE[title] ?? { kind: 'default' };

  if (style.kind === 'ribbon') {
    return (
      <div className="relative flex items-center justify-center p-4">
        <Image
          src={style.src}
          width={700}
          height={700}
          // The ribbon PNGs are 3500x3500 with large transparent margins, so
          // the visible banner is much smaller than the box. w-[420px] matches
          // the mockup's optical size.
          className="w-[300px] sm:w-[380px] md:w-[420px]"
          alt=""
          aria-hidden="true"
          quality={60}
        />
        {/* Centred on the ribbon rather than offset with ad-hoc padding, which
            is what caused the old header text to drift at some breakpoints. */}
        <p className="absolute inset-0 flex items-center justify-center pb-[6%] text-2xl text-white sm:text-3xl md:text-4xl">
          {title.toUpperCase()}
        </p>
      </div>
    );
  }

  if (style.kind === 'pill') {
    return (
      <div className="flex items-center justify-center p-4">
        <span className="inline-block rounded-full bg-[#C0392B] px-8 py-2 text-2xl text-white shadow-[0_3px_0_#7B241C] md:text-4xl">
          {title.toUpperCase()}
        </span>
      </div>
    );
  }

  return <SectionTitle title={title} />;
}

type GenericSectionProps = {
  children: ReactNode;
  title: string;
  /** Tailwind class for the spacer strip below the section. */
  color?: string;
};

export default function GenericSection(props: GenericSectionProps) {
  const spacerColor = props.color ?? 'yellow-100';

  return (
    <div id={props.title} className="sections flex w-full flex-col items-center">
      <SectionHeader title={props.title} />

      <div className="sections relative h-fit w-full">{props.children}</div>

      <div className={`h-[15vh] w-full ${spacerColor}`} />
    </div>
  );
}
