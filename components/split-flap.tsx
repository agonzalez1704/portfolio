"use client";

import { Instrument_Serif } from "next/font/google";
import { useEffect, useRef } from "react";

const serif = Instrument_Serif({ subsets: ["latin"], weight: "400" });

const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const randGlyph = (not: string) => {
  let g = not;
  while (g === not) g = GLYPHS[(Math.random() * GLYPHS.length) | 0];
  return g;
};
const wait = (ms: number) => new Promise<void>((r) => setTimeout(r, ms));

type Faces = {
  topStatic: HTMLElement;
  botStatic: HTMLElement;
  topFlap: HTMLElement;
  botFlap: HTMLElement;
  topFlapG: HTMLElement;
  botFlapG: HTMLElement;
};

function faces(tile: HTMLElement): Faces {
  const q = (s: string) => tile.querySelector(s) as HTMLElement;
  return {
    topStatic: q(".sf-static.top .sf-glyph"),
    botStatic: q(".sf-static.bottom .sf-glyph"),
    topFlap: q(".sf-flap.top"),
    botFlap: q(".sf-flap.bottom"),
    topFlapG: q(".sf-flap.top .sf-glyph"),
    botFlapG: q(".sf-flap.bottom .sf-glyph"),
  };
}

// Paint a tile at rest on one character — all four faces agree.
function settle(tile: HTMLElement, ch: string) {
  const f = faces(tile);
  f.topStatic.textContent = ch;
  f.botStatic.textContent = ch;
  f.topFlapG.textContent = ch;
  f.botFlapG.textContent = ch;
  f.topFlap.style.transition = "none";
  f.topFlap.style.transform = "rotateX(0deg)";
  f.topFlap.style.filter = "brightness(1)";
  f.botFlap.style.transition = "none";
  f.botFlap.style.transform = "rotateX(90deg)";
}

// One mechanical flip from `from` to `to`.
async function flip(tile: HTMLElement, from: string, to: string, topDur: number, botDur: number, botEase: string) {
  const f = faces(tile);
  // Behind the folding top flap sits the next glyph; the bottom still shows the old one.
  f.topStatic.textContent = to;
  f.topFlapG.textContent = from;
  f.botStatic.textContent = from;
  f.botFlapG.textContent = to;
  f.topFlap.style.transition = `transform ${topDur}s cubic-bezier(.36,0,.66,-.05), filter ${topDur}s linear`;
  f.topFlap.style.transform = "rotateX(-90deg)";
  f.topFlap.style.filter = "brightness(.45)";
  await wait(topDur * 1000);
  f.botFlap.style.transition = `transform ${botDur}s ${botEase}`;
  f.botFlap.style.transform = "rotateX(0deg)";
  await wait(botDur * 1000);
  settle(tile, to);
}

export function SplitFlap({ word, className = "" }: { word: string; className?: string }) {
  const chars = word.toUpperCase().split("");
  const boardRef = useRef<HTMLDivElement>(null);
  const tiles = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const board = boardRef.current;
    if (!board) return;
    const els = tiles.current;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      els.forEach((t, i) => settle(t, chars[i]));
      return;
    }

    let alive = true;
    let playing = false;
    const current = chars.map(() => randGlyph(""));
    els.forEach((t, i) => settle(t, current[i]));

    async function runTile(tile: HTMLElement, i: number) {
      const flips = 5 + 2 * i;
      for (let k = 0; k < flips && alive; k++) {
        const last = k === flips - 1;
        const from = current[i];
        const to = last ? chars[i] : randGlyph(from);
        current[i] = to;
        if (last) await flip(tile, from, to, 0.2, 0.32, "cubic-bezier(.3,1.6,.6,1)");
        else await flip(tile, from, to, 0.11, 0.13, "cubic-bezier(.2,.7,.3,1)");
      }
    }

    async function play() {
      if (playing || !alive) return;
      playing = true;
      await Promise.all(els.map((t, i) => runTile(t, i)));
      playing = false;
    }

    const kickoff = setTimeout(play, 400);
    const loop = setInterval(play, 9000);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        void play();
      }
    };
    const onClick = () => void play();
    board.addEventListener("click", onClick);
    board.addEventListener("keydown", onKey);

    return () => {
      alive = false;
      clearTimeout(kickoff);
      clearInterval(loop);
      board.removeEventListener("click", onClick);
      board.removeEventListener("keydown", onKey);
    };
    // chars derives from the word prop; re-run only when the word changes.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [word]);

  return (
    <div
      ref={boardRef}
      role="button"
      tabIndex={0}
      aria-label={`${word} — click to flip the board again`}
      className={`sf-board ${serif.className} ${className}`}
    >
      {chars.map((_, i) => (
        <div
          key={i}
          ref={(el) => {
            if (el) tiles.current[i] = el;
          }}
          aria-hidden="true"
          className="sf-tile"
        >
          <div className="sf-face">
            <div className="sf-static top"><span className="sf-glyph" /></div>
            <div className="sf-static bottom"><span className="sf-glyph" /></div>
            <div className="sf-flap top"><span className="sf-glyph" /></div>
            <div className="sf-flap bottom"><span className="sf-glyph" /></div>
            <span className="sf-seam" />
            <span className="sf-hinge left" />
            <span className="sf-hinge right" />
          </div>
        </div>
      ))}
    </div>
  );
}
