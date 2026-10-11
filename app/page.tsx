"use client";

import Image from "next/image";
import { useState, useCallback, useEffect } from "react";

const TV_PROJECTS = [
  {
    id: 1,
    title: "DEMO #1",
    category: "Branding \\ Packaging \\ Web",
    year: "2026",
    desc: "Distillery brand identity and custom e-commerce experience crafted for a rare Kentucky spirit.",
    image: "https://via.placeholder.com/800x600/18181b/ffbf47.png?text=DEMO+%231",
  },
  {
    id: 2,
    title: "DEMO #2",
    category: "Product \\ Brand Identity \\ Mobile",
    year: "2026",
    desc: "Social sports betting platform built for friends — reimagined with bold retro typography and seamless UX.",
    image: "https://via.placeholder.com/800x600/0f172a/38bdf8.png?text=DEMO+%232",
  },
  {
    id: 3,
    title: "DEMO #3",
    category: "AEC \\ Web Design \\ Visual System",
    year: "2025",
    desc: "Comprehensive digital presence and visual language for a premier mixed-use architectural development.",
    image: "https://via.placeholder.com/800x600/052e16/4ade80.png?text=DEMO+%233",
  },
  {
    id: 4,
    title: "DEMO #4",
    category: "Nonprofit \\ Web Experience \\ Strategy",
    year: "2025",
    desc: "Patient-first digital ecosystem providing transparent access to supportive healthcare services.",
    image: "https://via.placeholder.com/800x600/3b0764/f472b6.png?text=DEMO+%234",
  },
  {
    id: 5,
    title: "DEMO #5",
    category: "Digital Platform \\ UX Architecture",
    year: "2025",
    desc: "Modular fitness apparatus companion app featuring real-time biometric metrics tracking.",
    image: "https://via.placeholder.com/800x600/431407/fb923c.png?text=DEMO+%235",
  },
];

const PILLARS = [
  {
    title: "Brand",
    items: [
      "Brand Identity",
      "Rebrands & Refreshes",
      "Visual Systems",
      "Brand Strategy",
      "Guidelines & Standards",
    ],
  },
  {
    title: "Digital",
    items: [
      "Custom Web Experiences",
      "E-Commerce Architecture",
      "UX & Interface Design",
      "Front-End Engineering",
      "Content Strategy",
    ],
  },
  {
    title: "Support",
    items: [
      "Packaging Design",
      "Editorial & Print",
      "Motion Direction",
      "Campaign Creative",
      "Design Systems Maintenance",
    ],
  },
];

export default function Home() {
  const [currentChannel, setCurrentChannel] = useState(0);
  const [isTuning, setIsTuning] = useState(false);
  const [displayedText, setDisplayedText] = useState(TV_PROJECTS[0].title);
  const [isLoading, setIsLoading] = useState(true);
  const [progressWidth, setProgressWidth] = useState("w-0");
  const [isIntroLoaded, setIsIntroLoaded] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  // 2-second loading screen to let all assets load into browser cache
  useEffect(() => {
    const progressTimer = setTimeout(() => {
      setProgressWidth("w-full");
    }, 50);

    const loadTimer = setTimeout(() => {
      setIsLoading(false);
      // Trigger zoom-in & unblur right after loading screen fades
      setTimeout(() => {
        setIsIntroLoaded(true);
      }, 100);
    }, 2000);

    return () => {
      clearTimeout(progressTimer);
      clearTimeout(loadTimer);
    };
  }, []);

  // Parallax scroll tracking
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Typewriter animation: reveals letters progressively once channel tunes in
  useEffect(() => {
    if (isTuning) return;

    const target = TV_PROJECTS[currentChannel].title;
    let charIndex = 0;

    const interval = setInterval(() => {
      charIndex++;
      setDisplayedText(target.slice(0, charIndex));
      if (charIndex >= target.length) {
        clearInterval(interval);
      }
    }, 45); // 45ms per character

    return () => clearInterval(interval);
  }, [currentChannel, isTuning]);

  // Cycle channels with a 200ms static burst transition
  const changeChannel = useCallback(
    (direction: "next" | "prev") => {
      if (isTuning) return;
      setIsTuning(true);
      setDisplayedText("");

      const nextIndex =
        direction === "next"
          ? (currentChannel + 1) % TV_PROJECTS.length
          : (currentChannel - 1 + TV_PROJECTS.length) % TV_PROJECTS.length;

      setTimeout(() => {
        setCurrentChannel(nextIndex);
        setIsTuning(false);
      }, 200);
    },
    [currentChannel, isTuning]
  );

  const tuneToChannel = useCallback(
    (idx: number) => {
      if (currentChannel === idx || isTuning) return;
      setIsTuning(true);
      setDisplayedText("");

      setTimeout(() => {
        setCurrentChannel(idx);
        setIsTuning(false);
      }, 200);

      window.scrollTo({ top: 0, behavior: "smooth" });
    },
    [currentChannel, isTuning]
  );

  // Keyboard navigation support (ArrowLeft / ArrowRight)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") changeChannel("next");
      if (e.key === "ArrowLeft") changeChannel("prev");
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [changeChannel]);

  const activeProject = TV_PROJECTS[currentChannel];

  return (
    <div className="w-full min-h-screen overflow-x-clip bg-[#0c0a09] text-[#e6e4e2] font-sans antialiased selection:bg-[#ffbf47] selection:text-black">
      {/* 2-Second Asset Loading Screen Overlay */}
      <div
        className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#0c0a09] transition-opacity duration-500 select-none ${
          isLoading ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        aria-hidden={!isLoading}
      >
        <div className="flex flex-col items-center gap-4">
          <div className="flex items-center gap-2.5 tracking-widest text-base font-bold uppercase text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
            <span className="inline-block w-2.5 h-2.5 bg-[#ffbf47] rounded-full shadow-[0_0_12px_#ffbf47] animate-pulse" />
            DEMO <span className="text-zinc-400 font-light text-xs ml-1">LOADING</span>
          </div>

          <div className="w-44 h-1 bg-zinc-900 border border-white/10 rounded-full overflow-hidden p-0.5">
            <div
              className={`h-full bg-[#ffbf47] rounded-full transition-all duration-[1900ms] ease-out ${progressWidth}`}
            />
          </div>

          <span className="font-mono text-[11px] tracking-widest uppercase text-zinc-400">
            PLEASE WAIT...
          </span>
        </div>
      </div>
      {/* 
        ========================================================================
        HERO / TV SHOWCASE SECTION
        - Lower dimensions: h-[108vw] min-h-[380px]
          Foreground sits at top/center, header cuts off right after desk.
        - Desktop (md:): h-dvh full viewport immersion.
        ========================================================================
      */}
      <header className="relative w-full h-[108vw] min-h-[380px] md:h-dvh overflow-hidden bg-black select-none">

        {/* Background & Midground Layers: Studio room + anglepoise lamp */}
        <div
          className={`absolute inset-0 z-0 overflow-hidden pointer-events-none transition-[filter] duration-1000 ease-out ${
            isIntroLoaded ? "blur-none" : "blur-xl"
          }`}
          style={{
            transform: `translate3d(0, ${scrollY * 0.35}px, 0)`,
          }}
        >
          <Image
            src="/bg-5400.webp"
            alt="Studio room background"
            fill
            priority
            unoptimized
            sizes="100vw"
            className="object-cover object-bottom"
          />
          <Image
            src="/mid-5400.webp"
            alt="Studio room lamp and blueprints"
            fill
            priority
            unoptimized
            sizes="100vw"
            className="object-cover object-bottom"
            style={{
              transform: `translate3d(0, ${scrollY * -0.08}px, 0)`,
            }}
          />
        </div>

        {/* Foreground Layer: Retro TV & Desk setup */}
        <div
          className={`absolute -bottom-20 left-1/2 -translate-x-1/2 z-10 pointer-events-none [container-type:inline-size]
            w-[210%]
            min-[480px]:w-[180%]
            sm:w-[175%]
            md:w-[138%]
            lg:w-[125%]
            xl:w-[135%]
            2xl:w-[148%]
            max-w-[calc(95dvh*1440/580)]
            origin-bottom transition-transform duration-1000 ease-out
            ${isIntroLoaded ? "scale-100" : "scale-[0.88]"}`}
        >
          {/* TV Screen: Placed behind the TV cutout (z-0) */}
          <div
            className="absolute z-0 left-[48.3%] top-[5%] -translate-x-[51%] w-[30%] h-[46%] overflow-hidden rounded-[4%] bg-black pointer-events-auto"
            tabIndex={0}
            role="region"
            aria-label={`Television display: ${activeProject.title}`}
          >
            {/* Project Images (Pre-rendered for instantaneous switching) */}
            {TV_PROJECTS.map((project, idx) => (
              <div
                key={project.id}
                className={`absolute inset-0 transition-opacity duration-150 ${!isTuning && currentChannel === idx ? "opacity-100 z-[1]" : "opacity-0 z-0"
                  }`}
              >
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  unoptimized
                  priority={idx === 0}
                  sizes="(max-width: 768px) 66vw, 30vw"
                  className="object-cover"
                />
              </div>
            ))}

            {/* TV Static Noise: Bursts at opacity-100 for 200ms during channel change */}
            <div
              className={`absolute inset-0 z-[2] transition-opacity duration-75 pointer-events-none ${isTuning ? "opacity-100" : "opacity-15 mix-blend-screen"
                }`}
            >
              <Image
                src="/static-800.webp"
                alt="TV static noise"
                fill
                priority
                unoptimized
                sizes="(max-width: 768px) 66vw, 30vw"
                className="object-cover"
              />
            </div>

            {/* CRT Scanline effect */}
            <div
              className="absolute inset-0 pointer-events-none z-[3] opacity-25"
              style={{
                background:
                  "repeating-linear-gradient(to bottom, transparent 0px, transparent 2px, rgba(0,0,0,0.5) 2px, rgba(0,0,0,0.5) 4px)",
              }}
            />

            {/* Screen Glow / Vignette */}
            <div
              className="absolute inset-0 pointer-events-none z-[4]"
              style={{
                background:
                  "radial-gradient(ellipse at center, transparent 55%, rgba(0,0,0,0.65) 100%)",
              }}
            />
          </div>

          {/* Digital Title Readout on Desk Switcher Box: Digital-7 font scaling in 1.4cqw with typewriter effect */}
          <div
            className="absolute z-15 left-[40.6%] top-[61.1%] w-[17.5%] h-[5%] overflow-hidden flex items-center pointer-events-none"
          >
            <span
              className="font-['Digital-7'] text-[1.4cqw] leading-none tracking-[0.06em] uppercase text-[#ffbf47] whitespace-nowrap"
              style={{
                textShadow: "0 0 0.35em rgba(255, 191, 71, 0.65), 0 0 0.7em rgba(255, 191, 71, 0.3)",
              }}
            >
              {isTuning
                ? ""
                : displayedText.split("").map((char, index) => {
                  const dur = 2.0 + ((index * 7) % 5) * 0.4;
                  const delay = ((index * 11) % 6) * 0.3;
                  return (
                    <span
                      key={index}
                      className="inline-block"
                      style={{
                        animation: `digital-flicker ${dur}s linear ${delay}s infinite`,
                      }}
                    >
                      {char === " " ? "\u00A0" : char}
                    </span>
                  );
                })}
              {!isTuning && displayedText.length < activeProject.title.length && (
                <span className="inline-block w-[0.5em] h-[0.8em] bg-[#ffbf47] ml-0.5 animate-pulse align-middle" />
              )}
            </span>
          </div>

          {/* Foreground Desk Artwork: Front bezel overlaying screen */}
          <Image
            src="/foreground-1440.webp"
            alt="Vintage yellow television on designer desk"
            width={1440}
            height={670}
            priority
            unoptimized
            sizes="100vw"
            className="relative z-10 block w-full h-auto pointer-events-none"
          />

          {/* TV Front Panel Controls: Dial & Navigation Buttons */}
          <div className="absolute left-[64%] top-[7.5%] w-[6%] h-[16%] z-20 pointer-events-auto">
            {/* Left Button (Previous) */}
            <button
              type="button"
              onClick={() => changeChannel("prev")}
              className="absolute left-[6%] top-[106%] w-[34%] cursor-pointer border-none bg-transparent p-0 leading-none transition-transform duration-75 active:scale-95 hover:brightness-110 focus-visible:outline-2 focus-visible:outline-white focus-visible:rounded-full"
              aria-label="Previous channel"
              disabled={isTuning}
            >
              <Image
                src="/btn-01-120.webp"
                alt="Previous"
                width={120}
                height={121}
                unoptimized
                className="block w-full h-auto pointer-events-none drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]"
              />
            </button>

            {/* Right Button (Next) */}
            <button
              type="button"
              onClick={() => changeChannel("next")}
              className="absolute left-[55%] top-[106%] w-[34%] cursor-pointer border-none bg-transparent p-0 leading-none transition-transform duration-75 active:scale-95 hover:brightness-110 focus-visible:outline-2 focus-visible:outline-white focus-visible:rounded-full"
              aria-label="Next channel"
              disabled={isTuning}
            >
              <Image
                src="/btn-02-120.webp"
                alt="Next"
                width={120}
                height={121}
                unoptimized
                className="block w-full h-auto pointer-events-none drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]"
              />
            </button>
          </div>
        </div>
      </header>

      {/* 
        ========================================================================
        MOCK SECTION (BELOW THE HEADER)
        Continuation matching madebyhart.com:
        - Statement section
        - Explore the work cards
        - Capabilities & Pillars
        - Footer
        ========================================================================
      */}
      <main className="relative z-20 bg-[#0c0a09]">
        {/* Section 1: Intro / Studio Manifesto */}
        <section
          id="about"
          className="px-6 py-20 md:py-32 max-w-5xl mx-auto text-center border-b border-white/5"
        >
          <span className="inline-block text-xs uppercase tracking-[0.25em] text-[#ffbf47] mb-6 font-semibold">
            Creative & Dev Studio
          </span>
          <h1 className="text-2xl sm:text-3xl md:text-5xl font-light leading-tight tracking-tight text-zinc-100 max-w-4xl mx-auto">
            Hart Studio creates visuals, systems and web experiences for brands that expect clear thinking behind every move, from concept to build.
          </h1>
          <div className="mt-10 flex justify-center">
            <a
              href="#contact"
              className="inline-flex items-center gap-3 px-8 py-4 text-xs font-semibold tracking-widest uppercase text-black bg-[#ededed] hover:bg-white rounded-full transition-all hover:scale-105 active:scale-95 shadow-[0_4px_24px_rgba(255,255,255,0.1)]"
            >
              Work With Us
              <span className="text-base leading-none">→</span>
            </a>
          </div>
        </section>

        {/* Section 2: In Good Company Banner */}
        <section className="px-6 py-16 md:py-24 max-w-6xl mx-auto border-b border-white/5">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-baseline">
            <div className="md:col-span-4">
              <h2 className="text-xl md:text-2xl font-light text-zinc-200 tracking-tight">
                In Good Company.
              </h2>
            </div>
            <div className="md:col-span-8">
              <p className="text-zinc-400 text-base md:text-lg leading-relaxed font-light">
                Construction firms, healthcare practices, universities, tech companies, retailers,
                nonprofits, and national brands all sit on the same roster. Different industries,
                audiences, and ambitions — each with an identity built to belong exactly where it does.
              </p>
            </div>
          </div>
        </section>

        {/* Section 3: Explore The Work (Projects Grid) */}
        <section id="work" className="px-6 py-20 md:py-32 max-w-6xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-16 gap-4 border-b border-white/10 pb-6">
            <div>
              <span className="text-xs uppercase tracking-[0.2em] text-zinc-400 block mb-2">
                Featured Portfolio
              </span>
              <h2 className="text-3xl md:text-4xl font-light text-white tracking-tight">
                Explore the work
              </h2>
            </div>
            <span className="text-xs uppercase tracking-widest text-[#ffbf47] font-mono">
              [ 05 / 15 RECENT PROJECTS ]
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {TV_PROJECTS.map((p, idx) => (
              <article
                key={p.id}
                onClick={() => tuneToChannel(idx)}
                className={`group cursor-pointer relative p-8 md:p-10 rounded-2xl bg-zinc-950/60 border transition-all duration-300 flex flex-col justify-between ${currentChannel === idx
                  ? "border-[#ffbf47] shadow-[0_0_24px_rgba(255,191,71,0.15)]"
                  : "border-white/10 hover:border-white/30"
                  }`}
              >
                <div>
                  <div className="flex items-center justify-between text-xs font-mono text-zinc-400 mb-6">
                    <span className={currentChannel === idx ? "text-[#ffbf47] font-bold" : "text-zinc-400"}>
                      CH 0{p.id} {currentChannel === idx && "● TUNED IN"}
                    </span>
                    <span>{p.year}</span>
                  </div>
                  <h3 className="text-2xl md:text-3xl font-normal text-white group-hover:text-[#ffbf47] transition-colors mb-2">
                    {p.title}
                  </h3>
                  <span className="text-xs tracking-wider uppercase text-zinc-400 block mb-4">
                    {p.category}
                  </span>
                  <p className="text-zinc-400 text-sm md:text-base leading-relaxed font-light">
                    {p.desc}
                  </p>
                </div>

                <div className="mt-8 pt-6 border-t border-white/5 flex items-center justify-between">
                  <span className="text-xs font-semibold uppercase tracking-widest text-zinc-300 group-hover:text-white transition-colors">
                    {currentChannel === idx ? "Playing on TV" : "Tune in on TV"}
                  </span>
                  <span className="text-zinc-400 group-hover:text-[#ffbf47] group-hover:translate-x-1 transition-all">
                    →
                  </span>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Section 4: Capabilities / Pillars */}
        <section id="services" className="px-6 py-20 md:py-32 bg-zinc-950 border-t border-b border-white/10">
          <div className="max-w-6xl mx-auto">
            <div className="max-w-xl mb-16">
              <span className="text-xs uppercase tracking-[0.2em] text-[#ffbf47] block mb-2 font-mono">
                Capabilities
              </span>
              <h2 className="text-3xl md:text-4xl font-light text-white tracking-tight">
                Concept \ Design \ Build \ Deploy
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
              {PILLARS.map((pillar) => (
                <div key={pillar.title} className="space-y-6">
                  <h3 className="text-lg uppercase tracking-wider font-medium text-white pb-3 border-b border-white/15">
                    {pillar.title}
                  </h3>
                  <ul className="space-y-3.5">
                    {pillar.items.map((item) => (
                      <li
                        key={item}
                        className="text-zinc-400 text-sm hover:text-white transition-colors flex items-center gap-2"
                      >
                        <span className="w-1.5 h-1.5 bg-[#ffbf47]/60 rounded-full" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Section 5: Minimal Footer */}
        <footer id="contact" className="px-6 py-16 md:py-24 max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-10">
            <div>
              <span className="text-xs uppercase tracking-[0.25em] text-[#ffbf47] block mb-3 font-semibold">
                Get In Touch
              </span>
              <h2 className="text-3xl md:text-5xl font-light text-white tracking-tight mb-4">
                Ready to start something?
              </h2>
              <a
                href="mailto:hello@madebyhart.com"
                className="text-zinc-400 hover:text-white transition-colors text-lg"
              >
                hello@madebyhart.com
              </a>
            </div>

            <div className="text-xs text-zinc-400 space-y-1">
              <p>© 2026 Hart Studio. All rights reserved.</p>
              <p className="text-zinc-400 font-mono">Curated showcase reproduction</p>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}
