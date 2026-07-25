"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

type SiteMotionProps = {
  children: React.ReactNode;
};

export function SiteMotion({ children }: SiteMotionProps) {
  const pathname = usePathname();

  useEffect(() => {
    let cancelled = false;
    let kill: (() => void) | undefined;

    const boot = async () => {
      const reduced =
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduced) return;

      const gsap = (await import("gsap")).default;
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      if (cancelled) return;
      gsap.registerPlugin(ScrollTrigger);

      const cleanups: Array<() => void> = [];

      document.querySelectorAll<HTMLElement>("[data-line]").forEach((el, i) => {
        gsap.fromTo(
          el,
          { yPercent: 110 },
          {
            yPercent: 0,
            duration: 1.1,
            ease: "power4.out",
            delay: 0.08 * i,
            scrollTrigger: { trigger: el, start: "top 88%" },
          },
        );
      });

      document.querySelectorAll<HTMLElement>("[data-reveal]").forEach((el) => {
        gsap.fromTo(
          el,
          { y: 28, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 88%" },
          },
        );
      });

      document.querySelectorAll<HTMLElement>("[data-words]").forEach((el) => {
        const walk = (node: Node) => {
          Array.from(node.childNodes).forEach((child) => {
            if (child.nodeType === Node.TEXT_NODE && child.textContent?.trim()) {
              const frag = document.createDocumentFragment();
              child.textContent!.split(/(\s+)/).forEach((w) => {
                if (!w.trim()) {
                  frag.appendChild(document.createTextNode(w));
                  return;
                }
                const s = document.createElement("span");
                s.textContent = w;
                s.style.display = "inline-block";
                s.setAttribute("data-w", "1");
                frag.appendChild(s);
              });
              node.replaceChild(frag, child);
            } else if (child.nodeType === Node.ELEMENT_NODE) {
              walk(child);
            }
          });
        };
        walk(el);
        gsap.fromTo(
          el.querySelectorAll("[data-w]"),
          { opacity: 0.12 },
          {
            opacity: 1,
            stagger: 0.02,
            ease: "none",
            scrollTrigger: {
              trigger: el,
              start: "top 80%",
              end: "top 35%",
              scrub: true,
            },
          },
        );
      });

      document
        .querySelectorAll<HTMLElement>("[data-parallax]")
        .forEach((el) => {
          const f = parseFloat(el.getAttribute("data-parallax") || "0.06");
          gsap.fromTo(
            el,
            { yPercent: -f * 100, scale: 1.12 },
            {
              yPercent: f * 100,
              scale: 1.12,
              ease: "none",
              scrollTrigger: {
                trigger: el.parentElement,
                start: "top bottom",
                end: "bottom top",
                scrub: true,
              },
            },
          );
        });

      document
        .querySelectorAll<HTMLElement>("[data-media-frame]")
        .forEach((el) => {
          gsap.fromTo(
            el,
            { clipPath: "inset(6% 4% 6% 4% round 20px)" },
            {
              clipPath: "inset(0% 0% 0% 0% round 20px)",
              ease: "power2.out",
              duration: 1.2,
              scrollTrigger: { trigger: el, start: "top 80%" },
            },
          );
        });

      document.querySelectorAll<HTMLElement>("[data-count]").forEach((el) => {
        const target = parseInt(el.getAttribute("data-count") || "0", 10);
        gsap.fromTo(
          el,
          { textContent: "0" },
          {
            textContent: String(target),
            duration: 1.6,
            ease: "power2.out",
            snap: { textContent: 1 },
            scrollTrigger: { trigger: el, start: "top 88%" },
          },
        );
      });

      document
        .querySelectorAll<HTMLElement>("[data-section-scale]")
        .forEach((el) => {
          gsap.fromTo(
            el,
            { scale: 0.96 },
            {
              scale: 1,
              ease: "none",
              scrollTrigger: {
                trigger: el,
                start: "top 95%",
                end: "top 35%",
                scrub: true,
              },
            },
          );
        });

      const wm = document.querySelector<HTMLElement>("[data-wordmark]");
      if (wm?.parentElement) {
        gsap.fromTo(
          wm,
          { yPercent: 55 },
          {
            yPercent: 6,
            ease: "none",
            scrollTrigger: {
              trigger: wm.parentElement,
              start: "top bottom",
              end: "bottom bottom",
              scrub: true,
            },
          },
        );
      }

      document
        .querySelectorAll<HTMLElement>("[data-magnetic]")
        .forEach((btn) => {
          const canMagnetic = window.matchMedia("(pointer: fine)").matches;
          if (!canMagnetic) return;

          const arrow = btn.querySelector<HTMLElement>("[data-btn-arrow]");
          const onMove = (e: MouseEvent) => {
            const r = btn.getBoundingClientRect();
            gsap.to(btn, {
              x: (e.clientX - r.left - r.width / 2) * 0.06,
              y: (e.clientY - r.top - r.height / 2) * 0.08,
              duration: 0.25,
              ease: "power2.out",
              overwrite: "auto",
            });
            if (arrow) arrow.style.transform = "translateX(4px)";
          };
          const onLeave = () => {
            gsap.to(btn, {
              x: 0,
              y: 0,
              duration: 0.25,
              ease: "power2.out",
              overwrite: "auto",
            });
            if (arrow) arrow.style.transform = "translateX(0)";
          };
          btn.addEventListener("mousemove", onMove);
          btn.addEventListener("mouseleave", onLeave);
          cleanups.push(() => {
            btn.removeEventListener("mousemove", onMove);
            btn.removeEventListener("mouseleave", onLeave);
            gsap.set(btn, { clearProps: "transform" });
          });
        });

      // Home-specific hero timeline
      const heroLines = document.querySelectorAll<HTMLElement>("[data-chars]");
      if (heroLines.length) {
        /** Split into chars without mid-word wraps: each word is nowrap. */
        const splitChars = (el: HTMLElement) => {
          if (el.dataset.charsReady === "1") {
            return Array.from(
              el.querySelectorAll<HTMLElement>("[data-char]"),
            );
          }

          const out: HTMLElement[] = [];

          const wrapWord = (word: string) => {
            const wordEl = document.createElement("span");
            wordEl.className = "hero-word";
            wordEl.style.display = "inline-block";
            wordEl.style.whiteSpace = "nowrap";
            Array.from(word).forEach((ch) => {
              const s = document.createElement("span");
              s.dataset.char = "1";
              s.textContent = ch;
              s.style.display = "inline-block";
              s.style.willChange = "transform";
              out.push(s);
              wordEl.appendChild(s);
            });
            return wordEl;
          };

          const walk = (node: Node) => {
            Array.from(node.childNodes).forEach((child) => {
              if (child.nodeType === Node.TEXT_NODE && child.textContent) {
                const frag = document.createDocumentFragment();
                child.textContent.split(/(\s+)/).forEach((token) => {
                  if (!token) return;
                  if (/^\s+$/.test(token)) {
                    frag.appendChild(document.createTextNode(token));
                    return;
                  }
                  frag.appendChild(wrapWord(token));
                });
                node.replaceChild(frag, child);
              } else if (child.nodeType === Node.ELEMENT_NODE) {
                walk(child);
              }
            });
          };

          walk(el);
          el.dataset.charsReady = "1";
          return out;
        };

        const heroTl = gsap.timeline({ defaults: { ease: "power4.out" } });
        heroLines.forEach((line, li) => {
          const chars = splitChars(line);
          gsap.set(chars, { yPercent: 120, rotateZ: 4 });
          heroTl.to(
            chars,
            {
              yPercent: 0,
              rotateZ: 0,
              duration: 1.1,
              stagger: 0.016,
              clearProps: "willChange",
            },
            0.15 + li * 0.12,
          );
        });

        const heroItems = gsap.utils.toArray<HTMLElement>("[data-hero-item]");
        gsap.set(heroItems, { y: 26, opacity: 0 });
        heroTl.to(
          heroItems,
          { y: 0, opacity: 1, duration: 0.9, stagger: 0.1 },
          0.55,
        );

        const chips = gsap.utils.toArray<HTMLElement>("[data-chip]");
        gsap.set(chips, { y: 14, opacity: 0, scale: 0.94 });
        heroTl.to(
          chips,
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.6,
            stagger: 0.06,
            ease: "back.out(2)",
          },
          0.9,
        );

        const heroMedia = document.querySelector<HTMLElement>("[data-hero-media]");
        if (heroMedia) {
          gsap.set(heroMedia, {
            clipPath: "inset(12% 8% 12% 8% round 24px)",
            opacity: 0.001,
          });
          heroTl.to(
            heroMedia,
            {
              clipPath: "inset(0% 0% 0% 0% round 20px)",
              opacity: 1,
              duration: 1.4,
              ease: "power3.inOut",
            },
            0.7,
          );
        }

        const cue = document.querySelector<HTMLElement>("[data-scroll-cue]");
        if (cue) {
          gsap.fromTo(
            cue,
            { scaleX: 0.2, opacity: 0.4 },
            {
              scaleX: 1,
              opacity: 1,
              duration: 1.1,
              ease: "power2.inOut",
              repeat: -1,
              yoyo: true,
            },
          );
        }
      }

      // Marquee
      const track = document.querySelector<HTMLElement>("[data-marquee]");
      if (track) {
        const half = track.scrollWidth / 2;
        let x = 0;
        let vel = 0;
        const st = ScrollTrigger.create({
          onUpdate: (self) => {
            vel = self.getVelocity() / 900;
          },
        });
        const tick = () => {
          x -= 0.8 + Math.min(Math.abs(vel), 6);
          vel *= 0.94;
          if (-x >= half) x += half;
          const skew = Math.max(-8, Math.min(8, vel * 1.6));
          track.style.transform = `translateX(${x}px) skewX(${skew}deg)`;
        };
        gsap.ticker.add(tick);
        cleanups.push(() => {
          gsap.ticker.remove(tick);
          st.kill();
        });
      }

      kill = () => {
        cleanups.forEach((fn) => fn());
        ScrollTrigger.getAll().forEach((t) => t.kill());
      };
    };

    void boot();

    return () => {
      cancelled = true;
      kill?.();
    };
  }, [pathname]);

  return <>{children}</>;
}
