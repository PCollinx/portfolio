"use client";

import { useEffect, useRef, type RefObject } from "react";
import type { AnimationItem } from "lottie-web";

/**
 * A Lottie parrot that flies in from the right, lands on the avatar,
 * perches, then takes off up and to the left, looping endlessly.
 *
 * The flight path is computed every frame from the avatar's real position,
 * so the perch stays exact at any screen size.
 */

// Lottie box size in px (the source animation is 793x835).
const BOX_W = 120;
const BOX_H = 126;
// Frame of the source animation where the wings are folded: used while perched.
const PERCH_FRAME = 13;
// Rotation that makes the folded-wing frame sit upright.
const PERCH_ROTATION = 32;
// With the perch rotation applied at scale 1, the point where the parrot's
// belly meets its tail sits this far below the centre of the box.
const BELLY_OFFSET_Y = 16;
// Where along the avatar's top edge the parrot sits: 0 = centre, 1 = right edge.
const PERCH_RIM_X = 0.62;
const CYCLE_MS = 18000;

// Phase boundaries as fractions of the cycle.
const APPROACH_END = 0.3;
const LAND_END = 0.4;
const PERCH_END = 0.72;
const TAKEOFF_END = 0.8;

type Props = {
  containerRef: RefObject<HTMLElement | null>;
  avatarRef: RefObject<HTMLElement | null>;
};

type Pose = { x: number; y: number; rotate: number; scale: number };

const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);
const easeInCubic = (t: number) => t * t * t;

function mix(a: Pose, b: Pose, t: number): Pose {
  return {
    x: lerp(a.x, b.x, t),
    y: lerp(a.y, b.y, t),
    rotate: lerp(a.rotate, b.rotate, t),
    scale: lerp(a.scale, b.scale, t),
  };
}

export function Parrot({ containerRef, avatarRef }: Props) {
  const birdRef = useRef<HTMLDivElement>(null);
  const boxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const bird = birdRef.current;
    const box = boxRef.current;
    const container = containerRef.current;
    const avatar = avatarRef.current;
    if (!bird || !box || !container || !avatar) return;

    let anim: AnimationItem | null = null;
    let raf = 0;
    let cancelled = false;
    let perched = false;
    let visible = true;
    const start = performance.now();
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    // Key poses, recomputed from layout each frame (cheap, and survives resizes).
    function poses() {
      const c = container!.getBoundingClientRect();
      const a = avatar!.getBoundingClientRect();
      const w = c.width;
      // Bird size follows the avatar size; flight size follows the viewport.
      const perchScale = 0.6 * (a.width / 52);
      const flyScale = Math.min(1, 0.55 + 0.45 * (w / 1200));
      const avatarCentreX = a.left - c.left + a.width / 2;
      const avatarTop = a.top - c.top;

      // Perch on the upper-right rim of the round avatar, so the tail hangs
      // down beside the face instead of over it.
      const r = a.width / 2;
      const dx = r * PERCH_RIM_X;
      const rimY = avatarTop + r - Math.sqrt(r * r - dx * dx);
      const perch: Pose = {
        x: avatarCentreX + dx,
        y: rimY + 1 - perchScale * BELLY_OFFSET_Y,
        rotate: PERCH_ROTATION,
        scale: perchScale,
      };
      const enter: Pose = {
        x: w + BOX_W,
        y: avatarTop + 60,
        rotate: 0,
        scale: flyScale,
      };
      const approach: Pose = {
        x: perch.x + Math.min(320, w * 0.3),
        y: perch.y - Math.min(70, w * 0.08),
        rotate: -6,
        scale: flyScale * 0.85,
      };
      const lift: Pose = {
        x: perch.x - 70,
        y: perch.y - 110,
        rotate: 15,
        scale: flyScale * 0.85,
      };
      const exit: Pose = {
        x: -BOX_W * 2,
        y: -BOX_H * 2,
        rotate: 10,
        scale: flyScale,
      };
      return { perch, enter, approach, lift, exit };
    }

    function poseAt(t: number): Pose {
      const p = poses();
      if (t < APPROACH_END) {
        const k = t / APPROACH_END;
        const pose = mix(p.enter, p.approach, k);
        // Gentle rise and fall while flying.
        pose.y += Math.sin(k * Math.PI * 2) * 12;
        return pose;
      }
      if (t < LAND_END) {
        const k = easeOutCubic((t - APPROACH_END) / (LAND_END - APPROACH_END));
        return mix(p.approach, p.perch, k);
      }
      if (t < PERCH_END) return p.perch;
      if (t < TAKEOFF_END) {
        const k = easeInCubic((t - PERCH_END) / (TAKEOFF_END - PERCH_END));
        return mix(p.perch, p.lift, k);
      }
      const k = (t - TAKEOFF_END) / (1 - TAKEOFF_END);
      return mix(p.lift, p.exit, k);
    }

    function apply(pose: Pose) {
      bird!.style.transform = `translate3d(${pose.x - BOX_W / 2}px, ${
        pose.y - BOX_H / 2
      }px, 0) rotate(${pose.rotate}deg) scale(${pose.scale})`;
    }

    function setPerched(next: boolean) {
      if (!anim || next === perched) return;
      perched = next;
      if (perched) anim.goToAndStop(PERCH_FRAME, true);
      else anim.play();
    }

    function tick(now: number) {
      if (cancelled) return;
      if (visible && !document.hidden) {
        const t = ((now - start) % CYCLE_MS) / CYCLE_MS;
        apply(poseAt(t));
        setPerched(t >= LAND_END && t < PERCH_END);
      }
      raf = requestAnimationFrame(tick);
    }

    // Stop work while the hero is scrolled out of view.
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (!anim) return;
      if (!visible) anim.pause();
      else if (!perched) anim.play();
    });
    observer.observe(container);

    const placeStill = () => apply(poses().perch);

    import("lottie-web/build/player/lottie_light").then(({ default: lottie }) => {
      if (cancelled) return;
      anim = lottie.loadAnimation({
        container: box,
        renderer: "svg",
        loop: true,
        autoplay: !reduceMotion,
        path: "/parrot.json",
      });
      if (reduceMotion) {
        anim.addEventListener("DOMLoaded", () =>
          anim?.goToAndStop(PERCH_FRAME, true)
        );
        perched = true;
        placeStill();
        window.addEventListener("resize", placeStill);
      } else {
        raf = requestAnimationFrame(tick);
      }
    });

    return () => {
      cancelled = true;
      cancelAnimationFrame(raf);
      observer.disconnect();
      window.removeEventListener("resize", placeStill);
      anim?.destroy();
    };
  }, [containerRef, avatarRef]);

  return (
    <div
      ref={birdRef}
      aria-hidden="true"
      className="pointer-events-none absolute left-0 top-0 z-20 will-change-transform"
      style={{ width: BOX_W, height: BOX_H, transform: "translate3d(-999px,-999px,0)" }}
    >
      <div ref={boxRef} style={{ width: BOX_W, height: BOX_H }} />
    </div>
  );
}
