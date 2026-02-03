import React, { useState, useEffect, useRef } from 'react';
import {
  DollarSign, Star,
  Users, Crosshair, Briefcase,
  Play, Shield, ChevronRight, QrCode
} from 'lucide-react';

import vrgcLogo from '../pics/VRGC Logo.png';
import gamersAsylumLogo from "../pics/Gamer's Asylum 6.0 logo.png";
import valoPoster from '../pics/ValorantTourney.png';
import bgmiPoster from '../pics/BGMITOURNEYposter.png';
import codPoster from '../pics/CALL OF DUTY.png';

// --- GTA V STYLE SHEET ---
const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Anton&family=Archivo+Black&family=Oswald:wght@300;400;500;700&display=swap');

  :root {
    --gta-bg: #0f0f0f;
    --gta-green: #56a95e; /* HUD Green */
    --gta-green-dim: #2d5a31;
    --gta-blue: #6cb6ff;  /* Armor Blue */
    --gta-white: #f0f0f0;
    --gta-grey: #bcbcbc;
  }

  .text-gta-green { color: var(--gta-green); }
  .text-gta-blue { color: var(--gta-blue); }
  .bg-gta-green { background: var(--gta-green); }
  .bg-gta-green-dim { background: var(--gta-green-dim); }

  body {
    background-color: var(--gta-bg);
    color: var(--gta-white);
    font-family: 'Oswald', sans-serif;
    overflow-x: hidden;
    margin: 0;
  }

  /* Typography */
  .font-pricedown {
    font-family: 'Anton', sans-serif; /* Closest web-safe match to Pricedown */
    letter-spacing: 1px;
  }

  .font-heist {
    font-family: 'Archivo Black', sans-serif;
    text-transform: uppercase;
  }

  /* Utility Classes */
  .bg-noise {
    background-image: url("https://www.transparenttextures.com/patterns/stardust.png");
    opacity: 0.05;
    pointer-events: none;
  }

  .scanlines {
    background: repeating-linear-gradient(
      to bottom,
      rgba(255,255,255,0.03) 0,
      rgba(255,255,255,0.03) 1px,
      transparent 2px,
      transparent 4px
    );
    mix-blend-mode: soft-light;
    opacity: 0.5;
    pointer-events: none;
  }

  .glow {
    box-shadow: 0 0 30px rgba(86,169,94,0.25), 0 0 80px rgba(86,169,94,0.2);
  }

  .hud-card {
    background: rgba(12,12,12,0.8);
    border: 1px solid rgba(255,255,255,0.15);
    transition: transform 0.2s ease, box-shadow 0.2s ease;
  }
  .hud-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 10px 30px rgba(0,0,0,0.6);
  }

  .pulse {
    animation: pulse 2.2s ease-in-out infinite;
  }
  @keyframes pulse {
    0%, 100% { box-shadow: 0 0 0 rgba(86,169,94,0.0); }
    50% { box-shadow: 0 0 25px rgba(86,169,94,0.35); }
  }

  .tip-card {
    background: rgba(0,0,0,0.7);
    border: 1px solid rgba(255,255,255,0.2);
    padding: 12px 14px;
  }

  .wanted-star {
    width: 18px;
    height: 18px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    background: #eeb92e;
    clip-path: polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%);
    animation: wanted-flicker 1.8s ease-in-out infinite;
  }
  @keyframes wanted-flicker {
    0%, 100% { opacity: 0.7; transform: scale(1); }
    50% { opacity: 1; transform: scale(1.05); }
  }

  .gallery-card {
    position: relative;
    overflow: hidden;
  }
  .gallery-overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(180deg, transparent, rgba(0,0,0,0.75));
    opacity: 0;
    transition: opacity 0.2s ease;
    display: flex;
    align-items: flex-end;
    padding: 12px;
    color: #fff;
    font-size: 12px;
    letter-spacing: 0.2em;
    text-transform: uppercase;
  }
  .gallery-card:hover .gallery-overlay {
    opacity: 1;
  }

  .h-scroll {
    display: flex;
    gap: 12px;
    overflow-x: auto;
    scroll-snap-type: x mandatory;
    padding-bottom: 8px;
  }
  .h-card {
    min-width: 220px;
    scroll-snap-align: start;
    background: rgba(0,0,0,0.6);
    border: 1px solid rgba(255,255,255,0.15);
  }

  .neon-border {
    position: relative;
    border: 1px solid rgba(255,255,255,0.2);
    box-shadow: 0 0 12px rgba(86,169,94,0.35), inset 0 0 12px rgba(86,169,94,0.25);
  }
  .neon-border::after {
    content: '';
    position: absolute;
    inset: -1px;
    border: 1px solid rgba(155,225,93,0.35);
    pointer-events: none;
  }

  .mini-player {
    position: fixed;
    left: 16px;
    bottom: 16px;
    z-index: 90;
    background: rgba(0,0,0,0.85);
    border: 1px solid rgba(255,255,255,0.2);
    padding: 8px 10px;
    display: flex;
    align-items: center;
    gap: 8px;
    width: 280px;
    border-radius: 10px;
    animation: floaty 2.6s ease-in-out infinite;
  }
  .mini-player.dragging {
    animation: none;
    cursor: grabbing;
  }
  .mini-player-handle {
    cursor: grab;
    padding: 2px 6px;
    border: 1px solid rgba(255,255,255,0.2);
    font-size: 10px;
    text-transform: uppercase;
    letter-spacing: 0.25em;
    color: #cfcfcf;
  }
  .mini-player .title {
    font-size: 12px;
    color: #fff;
    text-transform: uppercase;
    letter-spacing: 0.2em;
  }
  .mini-player .meta {
    font-size: 11px;
    color: #a7a7a7;
  }
  .wave {
    display: flex;
    gap: 3px;
    align-items: flex-end;
    height: 14px;
  }
  .wave span {
    width: 3px;
    background: #9be15d;
    opacity: 0.8;
    animation: wave 1.2s ease-in-out infinite;
  }
  .wave span:nth-child(2) { animation-delay: 0.1s; }
  .wave span:nth-child(3) { animation-delay: 0.2s; }
  .wave span:nth-child(4) { animation-delay: 0.3s; }
  .wave span:nth-child(5) { animation-delay: 0.4s; }
  @keyframes wave {
    0%, 100% { height: 4px; }
    50% { height: 14px; }
  }
  @keyframes floaty {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-3px); }
  }

  .ticker {
    width: 100%;
    overflow: hidden;
    white-space: nowrap;
    border-top: 1px solid rgba(255,255,255,0.1);
    border-bottom: 1px solid rgba(255,255,255,0.1);
    background: rgba(0,0,0,0.6);
  }
  .ticker-track {
    display: inline-block;
    padding-left: 100%;
    animation: ticker 18s linear infinite;
  }
  @keyframes ticker {
    0% { transform: translateX(0); }
    100% { transform: translateX(-100%); }
  }

  .loading-bar {
    height: 8px;
    background: rgba(255,255,255,0.08);
    border: 1px solid rgba(255,255,255,0.15);
    position: relative;
    overflow: hidden;
  }
  .loading-fill {
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    width: 35%;
    background: linear-gradient(90deg, var(--gta-green), #9be15d);
    animation: loading-sweep 2.8s ease-in-out infinite;
  }
  .loading-glow {
    position: absolute;
    left: 0;
    top: -6px;
    height: 20px;
    width: 60px;
    background: radial-gradient(circle, rgba(155,225,93,0.6), transparent 70%);
    animation: loading-sweep 2.8s ease-in-out infinite;
  }
  @keyframes loading-sweep {
    0% { transform: translateX(-20%); }
    50% { transform: translateX(120%); }
    100% { transform: translateX(-20%); }
  }

  .text-stroke {
    -webkit-text-stroke: 1px black;
    text-shadow: 2px 2px 0 #000;
  }

  .gta-menu-item {
    position: relative;
    transition: all 0.2s ease;
  }
  .gta-menu-item::after {
    content: '';
    position: absolute;
    bottom: -8px;
    left: 0;
    width: 100%;
    height: 4px;
    background-color: var(--gta-white);
    transform: scaleX(0);
    transition: transform 0.2s ease;
  }
  .gta-menu-item.active {
    color: var(--gta-white);
    text-shadow: 0 0 10px rgba(255,255,255,0.5);
  }
  .gta-menu-item.active::after {
    transform: scaleX(1);
  }

  .job-card:hover {
    background-color: rgba(255,255,255,0.1);
    border-left: 4px solid var(--gta-green);
  }

  .gta-panel {
    background: #111111;
    border: 1px solid rgba(255,255,255,0.1);
    box-shadow: 0 10px 30px rgba(0,0,0,0.6);
  }

  .gta-divider {
    border-bottom: 1px solid rgba(255,255,255,0.1);
  }

  .gta-pill {
    background: #0a0a0a;
    border: 1px solid rgba(255,255,255,0.2);
    padding: 4px 10px;
    font-size: 11px;
    text-transform: uppercase;
    letter-spacing: 0.2em;
  }

  .loading-slide {
    position: relative;
    width: 100%;
    height: 100%;
    overflow: hidden;
  }

  .kenburns {
    animation: kenburns 12s ease-in-out infinite;
    transform-origin: center;
  }

  @keyframes kenburns {
    0% { transform: scale(1) translateZ(0); }
    50% { transform: scale(1.08) translateZ(0); }
    100% { transform: scale(1) translateZ(0); }
  }

  .stats-bar {
    background: #1a1a1a;
    border: 1px solid rgba(255,255,255,0.15);
    height: 10px;
    position: relative;
  }

  .stats-fill {
    height: 100%;
    background: linear-gradient(90deg, var(--gta-green), #9be15d);
  }

  .hero-title {
    font-size: clamp(2.4rem, 9vw, 5rem);
    line-height: 0.9;
  }
  .hero-subtitle {
    font-size: clamp(1rem, 3.5vw, 1.25rem);
  }

  .page-pad {
    padding: 7rem 24px 3rem;
  }

  .nav-bar {
    height: 80px;
  }
  .nav-title { font-size: 1rem; }
  .nav-subtitle { font-size: 0.75rem; }

  .parallax-layer {
    transition: transform 0.2s ease;
  }

  .breathing {
    animation: breathe 6s ease-in-out infinite;
  }

  @keyframes breathe {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.02); }
  }

  .ifruit {
    position: fixed;
    right: 16px;
    bottom: 16px;
    width: 90px;
    height: 90px;
    border-radius: 28px;
    background: #0b0b0b;
    border: 2px solid rgba(255,255,255,0.2);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 70;
    box-shadow: 0 12px 30px rgba(0,0,0,0.5);
    cursor: pointer;
  }

  .ifruit-panel {
    position: fixed;
    right: 16px;
    bottom: 16px;
    width: 320px;
    height: 620px;
    border-radius: 32px;
    background: #0f0f0f;
    border: 2px solid rgba(255,255,255,0.2);
    box-shadow: 0 20px 50px rgba(0,0,0,0.6);
    z-index: 80;
    transform: translateY(24px) scale(0.98);
    opacity: 0;
    pointer-events: none;
    transition: all 0.25s ease;
    overflow: hidden;
  }

  .ifruit-panel.open {
    transform: translateY(0) scale(1);
    opacity: 1;
    pointer-events: auto;
  }

  .ifruit-header {
    padding: 16px;
    border-bottom: 1px solid rgba(255,255,255,0.1);
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 12px;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: #cfcfcf;
  }

  .ifruit-screen {
    height: calc(100% - 64px);
    display: flex;
    flex-direction: column;
    background: radial-gradient(circle at top, #1a1a1a, #0c0c0c 60%);
  }

  .ifruit-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 12px;
    padding: 16px;
  }

  .ifruit-app {
    background: #111;
    border: 1px solid rgba(255,255,255,0.15);
    border-radius: 14px;
    padding: 12px;
    text-align: center;
    font-size: 11px;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    color: #e8e8e8;
  }

  .ifruit-app:hover {
    background: #1a1a1a;
  }

  .ifruit-dock {
    margin-top: auto;
    padding: 12px 16px 16px;
    border-top: 1px solid rgba(255,255,255,0.08);
    display: flex;
    gap: 10px;
    justify-content: space-between;
  }

  .ifruit-home {
    width: 52px;
    height: 52px;
    border-radius: 18px;
    background: #111;
    border: 1px solid rgba(255,255,255,0.2);
    display: flex;
    align-items: center;
    justify-content: center;
  }

  @media (max-width: 768px) {
    .ifruit-panel {
      right: 12px;
      left: 12px;
      width: auto;
      height: 540px;
      bottom: 12px;
    }
    .ifruit {
      right: 12px;
      bottom: 12px;
    }
  }

  @media (max-width: 640px) {
    .nav-bar { height: 64px; }
    .hero-title { font-size: clamp(2rem, 10vw, 3.5rem); }
    .hero-subtitle { font-size: 0.95rem; }
    .mini-player { width: 220px; }
    .ifruit { width: 70px; height: 70px; }
    .ifruit-panel { height: 460px; }
    .page-pad { padding: 5.5rem 16px 2rem; }
    .job-card { padding: 12px; gap: 12px; }
    .gta-panel, .hud-card { padding: 12px; }
    .gta-pill { font-size: 9px; }
    .h-card { min-width: 180px; }
  }

  @media (prefers-reduced-motion: reduce) {
    .kenburns,
    .breathing,
    .floaty,
    .pulse,
    .wave span {
      animation: none !important;
    }
  }

  /* Mission Passed Effect */
  @keyframes pass-banner-slide {
    0% { width: 0; opacity: 0; }
    100% { width: 100%; opacity: 1; }
  }
  @keyframes text-slam {
    0% { transform: scale(2); opacity: 0; }
    50% { transform: scale(1); opacity: 1; }
    100% { transform: scale(1); opacity: 1; }
  }
`;

// --- DATA ---
const NAV_ITEMS = ['HOME', 'JOBS', 'CREW', 'RECRUITMENT', 'ABOUT', 'GALLERY', 'RADIO'];

const LOADING_SLIDES = [
  {
    id: 1,
    title: 'GAMER ASYLUM 6.0',
    subtitle: 'The city’s biggest esports run.',
    image: valoPoster,
    accent: 'text-gta-green',
  },
  {
    id: 2,
    title: 'BGMI: FINAL DROP',
    subtitle: 'Squad up. Secure the zone.',
    image: bgmiPoster,
    accent: 'text-gta-blue',
  },
  {
    id: 3,
    title: 'CODM: NIGHT RAID',
    subtitle: 'Operator ready. Coming soon.',
    image: codPoster,
    accent: 'text-white',
  },
  {
    id: 4,
    title: 'VRGC ONLINE',
    subtitle: 'Recruiting new crew members.',
    image: gamersAsylumLogo,
    accent: 'text-gta-green',
  }
];

const LOADING_TIPS = [
  'Tip: Secure the high ground for better visibility.',
  'Tip: Join scrims to improve team synergy.',
  'Tip: Warm up 10 mins before ranked.',
  'Tip: Stick to your role in tournaments.',
  'Tip: Use utility before pushing angles.'
];

const RADIO_STATIONS = [
  { id: 'NSP', name: 'Non-Stop-Pop FM', desc: 'Pop anthems & chart hits' },
  { id: 'LSR', name: 'Radio Los Santos', desc: 'Hip-hop & west coast classics' },
  { id: 'LSR2', name: 'Los Santos Rock', desc: 'Rock legends & power ballads' },
  { id: 'VIBE', name: 'Vibe FM', desc: 'Chill synth & nighttime drive' },
];

const RADIO_TRACKS = [
  {
    title: 'Lady (Hear Me Tonight)',
    artist: 'Modjo',
    station: 'Non-Stop-Pop FM',
    url: 'https://audio.jukehost.co.uk/QuGx9UV74D8tUuuzEIWgsN8fSyAGd4QI'
  },
  {
    title: 'Midnight City',
    artist: 'M83',
    station: 'Non-Stop-Pop FM',
    url: 'https://audio.jukehost.co.uk/wki6sBN8TgHr12sVzNUvxGaQ0G11slb1'
  },
  {
    title: 'Glamorous',
    artist: 'Fergie',
    station: 'Non-Stop-Pop FM',
    url: 'https://audio.jukehost.co.uk/zwsvXKZ5ZeOVJRrvclU3eWekp6MrrKSi'
  },
  {
    title: 'California Love',
    artist: '2Pac & Dr. Dre',
    station: 'Radio Los Santos',
    url: 'https://audio.jukehost.co.uk/QPXUI6sMhpDzcj2APibEjaPjvOmgUvOu'
  },
  {
    title: 'Radio Ga Ga',
    artist: 'Queen',
    station: 'Los Santos Rock',
    url: 'https://audio.jukehost.co.uk/x5jtqga954LllbWsTTBVJ6aXffwnVNa5'
  },
  {
    title: 'Danger Zone',
    artist: 'Kenny Loggins',
    station: 'Los Santos Rock',
    url: 'https://audio.jukehost.co.uk/JBBLlP7FxktoNhHxOpjqEp0EzLFM6Vas'
  },
];

const JOBS = [
  {
    id: 1,
    title: "GAMER ASYLUM 6.0 – VALORANT",
    type: "Esports Tournament",
    rp: "12000 RP",
    cash: "₹50,000+ Prize Pool",
    desc: "Tactical ops. Prove your aim. Compete in the Valorant pre-finals.",
    image: valoPoster,
    players: "5 Players",
    url: "https://lu.ma/nmtp4uiv"
  },
  {
    id: 2,
    title: "GAMER ASYLUM 6.0 – BGMI",
    type: "Battle Royale",
    rp: "9000 RP",
    cash: "₹30,000+ Prize Pool",
    desc: "Drop in. Loot up. Dominate the battlegrounds.",
    image: bgmiPoster,
    players: "4 Players",
    url: "https://luma.com/event/evt-3wYphiWIMjmlp3l"
  },
  {
    id: 3,
    title: "GAMER ASYLUM 6.0 – CODM",
    type: "Multiplayer",
    rp: "7000 RP",
    cash: "Coming Soon",
    desc: "Fast-paced firefights. Coming soon — stay alert.",
    image: codPoster,
    players: "5 Players",
    url: null
  }
];

const CREW = [
  { id: 1, name: "CLUB LEAD", role: "BOSS", skill: "Leadership", stat: 95, img: "https://api.dicebear.com/7.x/avataaars/svg?seed=Lead&clothing=blazerAndShirt&eyes=surprised", stamina: 88, shooting: 70, stealth: 65, driving: 90 },
  { id: 2, name: "ESPORTS LEAD", role: "GUNMAN", skill: "Strategy", stat: 90, img: "https://api.dicebear.com/7.x/avataaars/svg?seed=Esports&clothing=hoodie", stamina: 80, shooting: 92, stealth: 60, driving: 75 },
  { id: 3, name: "CREATIVE LEAD", role: "HACKER", skill: "Design", stat: 88, img: "https://api.dicebear.com/7.x/avataaars/svg?seed=Creative&clothing=graphicShirt", stamina: 70, shooting: 55, stealth: 85, driving: 60 },
];

const RECRUIT_TEAMS = [
  { id: 'education', name: 'Education Team', desc: 'Workshops, tutorials, and peer training.' },
  { id: 'social', name: 'Social Media Team', desc: 'Content, reels, and live coverage.' },
  { id: 'design', name: 'Design Team', desc: 'Posters, branding, and event visuals.' },
  { id: 'esports', name: 'Esports Team', desc: 'Tournaments, scrims, and strategy.' },
  { id: 'pr', name: 'PR & Outreach Team', desc: 'Partnerships, sponsors, and outreach.' },
];

// --- COMPONENTS ---
const Navbar = ({ activeTab, setActiveTab, onBlip, onSelect }) => {
  const [open, setOpen] = useState(false);

  return (
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/90 border-b border-white/10 nav-bar">
        <div className="flex items-center h-full">
        <div className="max-w-7xl mx-auto w-full px-6 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
              <img src={vrgcLogo} alt="VRGC" className="w-6 h-6 object-contain" loading="lazy" decoding="async" />
            </div>
            <div className="hidden md:block">
              <h1 className="font-heist leading-none tracking-tight nav-title">VRGC ONLINE</h1>
              <h1 className="font-heist leading-none text-gray-400 tracking-tight nav-subtitle">GAMER ASYLUM 6.0</h1>
            </div>
          </div>

          <div className="hidden md:flex gap-8 md:gap-16">
            {NAV_ITEMS.map((item) => (
              <button
                key={item}
                onMouseEnter={onBlip}
                onClick={() => { onSelect(); setActiveTab(item); }}
                className={`font-pricedown text-2xl tracking-widest uppercase gta-menu-item ${
                  activeTab === item ? 'active' : 'text-gray-500 hover:text-gray-300'
                }`}
              >
                {item}
              </button>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-2 text-xs text-gray-400 font-heist">
            <span className="inline-block w-2 h-2 rounded-full bg-gta-green"></span>
            ONLINE
          </div>

          <button
            className="md:hidden border border-white/20 px-3 py-2 text-xs font-heist uppercase"
            onMouseEnter={onBlip}
            onClick={() => { onSelect(); setOpen((v) => !v); }}
          >
            Menu
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden border-t border-white/10 bg-black/95">
          <div className="px-6 py-4 grid grid-cols-2 gap-3">
            {NAV_ITEMS.map((item) => (
              <button
                key={item}
                onMouseEnter={onBlip}
                onClick={() => { onSelect(); setActiveTab(item); setOpen(false); }}
                className={`text-left px-3 py-2 border border-white/10 font-heist uppercase text-xs ${
                  activeTab === item ? 'bg-white/10 text-white' : 'text-gray-300'
                }`}
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

const LoadingHome = ({ onStart, onBlip, onSelect }) => {
  const [slideIndex, setSlideIndex] = useState(0);
  const [tipIndex, setTipIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [parallax, setParallax] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const interval = setInterval(() => {
      setSlideIndex((prev) => (prev + 1) % LOADING_SLIDES.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const tipTimer = setInterval(() => {
      setTipIndex((prev) => (prev + 1) % LOADING_TIPS.length);
    }, 4200);
    return () => clearInterval(tipTimer);
  }, []);

  const prevChar = () => setCharIndex((prev) => (prev - 1 + CREW.length) % CREW.length);
  const nextChar = () => setCharIndex((prev) => (prev + 1) % CREW.length);

  useEffect(() => {
    const handleMove = (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 8;
      const y = (e.clientY / window.innerHeight - 0.5) * 8;
      setParallax({ x, y });
    };
    window.addEventListener('mousemove', handleMove);
    return () => window.removeEventListener('mousemove', handleMove);
  }, []);

  const slide = LOADING_SLIDES[slideIndex];

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-black z-10"></div>
        <div className="absolute inset-0 scanlines z-20"></div>
        <img src={slide.image} className="w-full h-full object-cover opacity-70 kenburns" alt={slide.title} />
      </div>

      <div className="relative z-20 w-full max-w-7xl px-6 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div className="text-left space-y-6">
          <div className="inline-block gta-pill text-white">Loading Screen</div>
          <h1 className="font-pricedown hero-title text-white drop-shadow-[5px_5px_0_rgba(0,0,0,1)]">
            {slide.title}
          </h1>
          <p className="font-sans hero-subtitle text-gray-300 max-w-md leading-relaxed border-l-4 border-gta-green pl-4">
            {slide.subtitle}
          </p>
          <div className="space-y-2 max-w-md">
            <div className="flex items-center justify-between text-xs text-gray-400 font-heist tracking-[0.3em]">
              <span>LOADING</span>
              <span>ONLINE</span>
            </div>
            <div className="loading-bar">
              <div className="loading-fill"></div>
              <div className="loading-glow"></div>
            </div>
          </div>
          <div className="tip-card max-w-md">
            <div className="text-xs text-gray-400 font-heist tracking-[0.3em]">LOADING TIP</div>
            <div className="text-sm text-gray-200 mt-2">{LOADING_TIPS[tipIndex]}</div>
          </div>
          <div className="flex items-center gap-2 text-xs text-gray-400 font-heist tracking-[0.3em]">
            <span>WANTED</span>
            <div className="flex gap-1">
              {[1,2,3].map((s) => (
                <span key={s} className="wanted-star"></span>
              ))}
              {[4,5].map((s) => (
                <span key={s} className="wanted-star" style={{ opacity: 0.25 }}></span>
              ))}
            </div>
          </div>
          <button
            onMouseEnter={onBlip}
            onClick={() => { onSelect(); onStart(); }}
            className="mt-8 px-10 py-4 bg-transparent border-2 border-white text-white font-heist text-2xl hover:bg-white hover:text-black transition-all uppercase tracking-wider flex items-center gap-3 group pulse"
          >
            Enter Lobby <ChevronRight className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        <div className="hidden md:block relative h-[560px]">
          <div className="grid grid-cols-1 gap-4">
            <div className="hud-card p-5 glow">
              <div className="text-xs text-gray-400 font-heist">MISSION BRIEF</div>
              <div className="font-pricedown text-3xl mt-2">GA 6.0 WEEK</div>
              <p className="text-sm text-gray-300 mt-2">3 tournaments live. 2 more dropping soon.</p>
            </div>
            <div className="hud-card p-5">
              <div className="text-xs text-gray-400 font-heist">FEATURED EVENT</div>
              <div className="mt-3 flex items-center gap-3">
                <img src={valoPoster} alt="Valorant" className="w-16 h-16 object-cover border border-white/20" loading="lazy" decoding="async" />
                <div>
                  <div className="font-heist text-lg">Valorant Finals</div>
                  <div className="text-xs text-gray-400">Prize Pool ₹50K+</div>
                </div>
              </div>
            </div>
            <div className="hud-card p-5 neon-border">
              <div className="text-xs text-gray-400 font-heist">CHARACTER SELECT</div>
              <div className="mt-3 flex items-center gap-3">
                <img src={CREW[charIndex].img} alt={CREW[charIndex].name} className="w-16 h-16 object-cover border border-white/20" loading="lazy" decoding="async" />
                <div>
                  <div className="font-heist text-lg">{CREW[charIndex].name}</div>
                  <div className="text-xs text-gray-400">{CREW[charIndex].role}</div>
                </div>
              </div>
              <div className="mt-3 flex gap-2">
                <button
                  onMouseEnter={onBlip}
                  onClick={() => { onSelect(); prevChar(); }}
                  className="px-3 py-1 border border-white/30 text-xs font-heist uppercase hover:bg-white hover:text-black"
                >
                  Prev
                </button>
                <button
                  onMouseEnter={onBlip}
                  onClick={() => { onSelect(); nextChar(); }}
                  className="px-3 py-1 border border-white/30 text-xs font-heist uppercase hover:bg-white hover:text-black"
                >
                  Next
                </button>
              </div>
            </div>
            <div className="hud-card p-5">
              <div className="text-xs text-gray-400 font-heist">CREW STATUS</div>
              <div className="mt-2 text-sm text-gray-300">Active Squads: 12</div>
              <div className="mt-1 text-sm text-gray-300">Scrims Tonight: 8PM</div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-16 left-0 right-0 z-20">
        <div className="ticker text-xs font-heist tracking-[0.4em] text-gray-300">
          <div className="ticker-track">
            VRGC ONLINE  •  GAMER ASYLUM 6.0  •  VALORANT FINALS LIVE  •  BGMI DROP ZONE  •  CODM NIGHT RAID  •  RECRUITMENT OPEN NOW  •
          </div>
        </div>
      </div>

      <div className="absolute bottom-6 left-6 z-20 text-xs text-gray-300 font-heist tracking-widest">
        <div className="flex items-center gap-2">
          <img src={vrgcLogo} alt="VRGC" className="w-5 h-5 object-contain" />
          <span>VRGC</span>
          <span className="text-gray-500">/</span>
          <span>GAMER ASYLUM</span>
        </div>
      </div>
    </div>
  );
};

const JobBoard = ({ onSelectJob, onBlip, onSelect }) => (
  <div className="page-pad max-w-7xl mx-auto min-h-screen">
    <div className="flex items-center justify-between mb-8 border-b border-white/20 pb-4">
      <h2 className="font-heist text-4xl tracking-tighter">AVAILABLE JOBS</h2>
      <div className="flex gap-2">
        <span className="bg-white text-black px-3 py-1 font-bold text-xs">ALL</span>
        <span className="bg-black border border-white/30 text-gray-400 px-3 py-1 font-bold text-xs">HEISTS</span>
        <span className="bg-black border border-white/30 text-gray-400 px-3 py-1 font-bold text-xs">RACES</span>
      </div>
    </div>

    <div className="mb-6">
      <div className="text-xs text-gray-400 font-heist tracking-[0.3em] mb-3">FEATURED RUNS</div>
      <div className="h-scroll">
        {JOBS.map((job) => (
          <button
            key={`featured-${job.id}`}
            onMouseEnter={onBlip}
            onClick={() => { onSelect(); onSelectJob(job); }}
            className="h-card text-left"
          >
            <div className="h-32">
              <img src={job.image} alt={job.title} className="w-full h-full object-cover" />
            </div>
            <div className="p-3">
              <div className="text-sm font-heist text-white">{job.title}</div>
              <div className="text-xs text-gray-400 mt-1">{job.cash}</div>
            </div>
          </button>
        ))}
      </div>
    </div>

    <div className="grid gap-4">
      {JOBS.map((job) => (
        <div
          key={job.id}
          onMouseEnter={onBlip}
          onClick={() => { onSelect(); onSelectJob(job); }}
          className="job-card bg-black/50 border border-white/10 p-4 flex flex-col md:flex-row gap-6 cursor-pointer group transition-all"
        >
          <div className="w-full md:w-64 h-28 md:h-36 bg-gray-800 relative overflow-hidden shrink-0 border border-white/20">
            <img src={job.image} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" alt={job.title} loading="lazy" decoding="async" />
            <div className="absolute top-0 left-0 bg-gta-green text-black font-bold px-2 py-0.5 text-xs uppercase">
              2x RP
            </div>
          </div>

          <div className="flex-1 flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-start">
                <h3 className="font-heist text-2xl text-white mb-1">{job.title}</h3>
                <div className="flex gap-1">
                   {[1,2,3,4,5].map(i => <Star key={i} className="w-4 h-4 fill-white text-white" />)}
                </div>
              </div>
              <p className="text-gray-400 font-sans text-sm max-w-2xl">{job.desc}</p>
            </div>

            <div className="flex items-center gap-6 mt-4 text-sm font-bold uppercase tracking-wider">
              <span className="flex items-center gap-2 text-gta-blue"><Users className="w-4 h-4" /> {job.players}</span>
              <span className="flex items-center gap-2 text-gta-green"><DollarSign className="w-4 h-4" /> {job.cash}</span>
              <span className="flex items-center gap-2 text-white"><Star className="w-4 h-4" /> {job.rp}</span>
            </div>
          </div>

          <div className="hidden md:flex items-center px-4">
            <ChevronRight className="w-8 h-8 text-gray-600 group-hover:text-white transition-colors" />
          </div>
        </div>
      ))}
    </div>
  </div>
);

const CrewRoster = ({ onBlip, onSelect }) => {
  const [selectedId, setSelectedId] = useState(CREW[0]?.id || 1);
  const selected = CREW.find((m) => m.id === selectedId) || CREW[0];

  return (
    <div className="page-pad max-w-7xl mx-auto min-h-screen">
      <div className="mb-8 gta-divider pb-4">
        <h2 className="font-heist text-4xl tracking-tighter">CREW STATS</h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="gta-panel p-4">
          {CREW.map((member) => (
            <button
              key={member.id}
              onMouseEnter={onBlip}
              onClick={() => { onSelect(); setSelectedId(member.id); }}
              className={`w-full text-left px-4 py-3 border-b border-white/10 flex items-center gap-3 ${
                selectedId === member.id ? 'bg-white/10' : 'hover:bg-white/5'
              }`}
            >
              <div className="w-10 h-10 bg-black/60 border border-white/20 flex items-center justify-center">
                <Crosshair className="w-5 h-5 text-gta-green" />
              </div>
              <div>
                <div className="font-pricedown text-xl text-white">{member.name}</div>
                <div className="text-xs text-gray-400 font-heist">{member.role}</div>
              </div>
            </button>
          ))}
        </div>

        <div className="lg:col-span-2 gta-panel p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-black/60 border border-white/10 p-4">
            <div className="text-xs text-gray-400 font-heist">MUGSHOT</div>
            <div className="mt-3 aspect-[3/4] border border-white/20 bg-black/70 overflow-hidden">
              <img src={selected.img} alt={selected.name} className="w-full h-full object-cover" loading="lazy" decoding="async" />
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <div className="text-xs text-gray-400 font-heist">PROFILE</div>
              <div className="font-pricedown text-3xl mt-2">{selected.name}</div>
              <div className="text-gta-green font-heist text-lg">{selected.role}</div>
            </div>

            <div className="space-y-4">
              {[
                { label: 'Leadership', value: selected.stat },
                { label: 'Stamina', value: selected.stamina },
                { label: 'Shooting', value: selected.shooting },
                { label: 'Stealth', value: selected.stealth },
                { label: 'Driving', value: selected.driving },
              ].map((item) => (
                <div key={item.label}>
                  <div className="flex justify-between text-xs font-bold uppercase text-gray-400">
                    <span>{item.label}</span>
                    <span>{item.value}/100</span>
                  </div>
                  <div className="stats-bar mt-2">
                    <div className="stats-fill" style={{ width: `${item.value}%` }}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const RecruitmentPage = ({ onBlip, onSelect }) => (
  <div className="page-pad max-w-7xl mx-auto min-h-screen">
    <div className="mb-8 gta-divider pb-4 flex items-center justify-between">
      <h2 className="font-heist text-4xl tracking-tighter">RECRUITMENT OFFICE</h2>
      <span className="gta-pill text-white">APPLICATIONS OPEN</span>
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2 gta-panel p-6">
        <h3 className="font-heist text-2xl mb-4">APPLY NOW</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input className="bg-black border border-white/20 p-3 text-white" placeholder="Full Name" />
          <input className="bg-black border border-white/20 p-3 text-white" placeholder="Email" />
          <input className="bg-black border border-white/20 p-3 text-white" placeholder="Phone" />
          <select className="bg-black border border-white/20 p-3 text-white">
            {RECRUIT_TEAMS.map((t) => (
              <option key={t.id}>{t.name}</option>
            ))}
          </select>
          <input className="bg-black border border-white/20 p-3 text-white md:col-span-2" placeholder="Portfolio / LinkedIn (optional)" />
          <textarea className="bg-black border border-white/20 p-3 text-white md:col-span-2" rows="4" placeholder="Why do you want to join VRGC?" />
        </div>
        <button
          onMouseEnter={onBlip}
          onClick={onSelect}
          className="mt-6 px-8 py-3 bg-white text-black font-heist uppercase tracking-wider"
        >
          Submit Application
        </button>
      </div>

      <div className="gta-panel p-6">
        <h3 className="font-heist text-2xl mb-4">PROCESS</h3>
        <ol className="space-y-4 text-sm text-gray-300">
          <li>1. Application review</li>
          <li>2. Shortlisted interview</li>
          <li>3. Trial task (optional)</li>
          <li>4. Final onboarding</li>
        </ol>
        <div className="mt-6 border-t border-white/10 pt-4">
          <h4 className="font-heist text-lg">TEAMS</h4>
          <ul className="mt-3 space-y-2 text-sm text-gray-400">
            {RECRUIT_TEAMS.map((t) => (
              <li key={t.id}><span className="text-white">{t.name}:</span> {t.desc}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  </div>
);

const AboutSection = ({ onBlip, onSelect }) => (
  <div className="page-pad max-w-7xl mx-auto min-h-screen">
    <div className="mb-8 gta-divider pb-4 flex items-center justify-between">
      <h2 className="font-heist text-4xl tracking-tighter">ABOUT VRGC</h2>
      <span className="gta-pill text-white">EST. 2020</span>
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2 gta-panel p-6 space-y-6">
        <p className="text-gray-300 font-sans text-lg leading-relaxed">
          VRGC is a competitive gaming community focused on esports, tournaments, and creator growth. We run
          high-energy events, LAN meetups, and skill-building workshops for players across PC and mobile titles.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { label: 'Events Hosted', value: '25+' },
            { label: 'Active Members', value: '1.5K+' },
            { label: 'Prize Pool', value: '₹2L+' },
          ].map((item) => (
            <div key={item.label} className="bg-black/60 border border-white/10 p-4 text-center">
              <div className="font-pricedown text-3xl text-white">{item.value}</div>
              <div className="text-xs text-gray-400 font-heist uppercase tracking-widest">{item.label}</div>
            </div>
          ))}
        </div>
        <button
          onMouseEnter={onBlip}
          onClick={onSelect}
          className="px-8 py-3 bg-white text-black font-heist uppercase tracking-wider"
        >
          Join the Crew
        </button>
      </div>

      <div className="gta-panel p-6">
        <h3 className="font-heist text-2xl mb-4">WHAT WE DO</h3>
        <ul className="space-y-3 text-sm text-gray-300">
          <li>• Esports tournaments & leagues</li>
          <li>• Creator meetups & collabs</li>
          <li>• Workshops & coaching</li>
          <li>• Community nights & LANs</li>
        </ul>
      </div>
    </div>
  </div>
);

const GallerySection = ({ onBlip, onSelect }) => (
  <div className="page-pad max-w-7xl mx-auto min-h-screen">
    <div className="mb-8 gta-divider pb-4 flex items-center justify-between">
      <h2 className="font-heist text-4xl tracking-tighter">GALLERY</h2>
      <span className="gta-pill text-white">HIGHLIGHTS</span>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {[
        { img: valoPoster, label: 'Valorant Finals' },
        { img: bgmiPoster, label: 'BGMI Showdown' },
        { img: codPoster, label: 'CODM Night Raid' },
        { img: gamersAsylumLogo, label: 'Gamer Asylum 6.0' },
        { img: vrgcLogo, label: 'VRGC Crew' },
        { img: valoPoster, label: 'LAN Moments' },
      ].map((item, idx) => (
        <button
          key={`${item.label}-${idx}`}
          onMouseEnter={onBlip}
          onClick={onSelect}
          className="bg-black/60 border border-white/10 overflow-hidden text-left gallery-card"
        >
          <div className="h-48 bg-black relative">
            <img src={item.img} alt={item.label} className="w-full h-full object-cover" loading="lazy" decoding="async" />
            <div className="gallery-overlay">View</div>
          </div>
          <div className="p-3 text-sm text-gray-300 font-heist">{item.label}</div>
        </button>
      ))}
    </div>
  </div>
);

const RadioSection = ({
  onBlip,
  onSelect,
  nowPlaying,
  isPlaying,
  onPlay,
  onPause,
  onStop,
}) => {
  const [selectedStation, setSelectedStation] = useState(RADIO_STATIONS[0].name);

  const stationTracks = RADIO_TRACKS.filter((t) => t.station === selectedStation);

  return (
    <div className="page-pad max-w-7xl mx-auto min-h-screen">
      <div className="mb-8 gta-divider pb-4 flex items-center justify-between">
        <h2 className="font-heist text-4xl tracking-tighter">RADIO</h2>
        <span className="gta-pill text-white">SELECT TO PLAY</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="gta-panel p-6">
          <h3 className="font-heist text-2xl mb-4">STATIONS</h3>
          <div className="space-y-3">
            {RADIO_STATIONS.map((s) => (
              <button
                key={s.id}
                onMouseEnter={onBlip}
                onClick={() => {
                  onSelect();
                  setSelectedStation(s.name);
                  onStop();
                }}
                className={`w-full text-left px-4 py-3 border border-white/10 ${
                  selectedStation === s.name ? 'bg-white/10' : 'hover:bg-white/5'
                }`}
              >
                <div className="font-heist text-lg">{s.name}</div>
                <div className="text-xs text-gray-400">{s.desc}</div>
              </button>
            ))}
          </div>
        </div>

        <div className="lg:col-span-2 gta-panel p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-heist text-2xl">TRACKS</h3>
            {nowPlaying && (
              <div className="text-xs text-gray-400 font-heist">NOW PLAYING: {nowPlaying.title}</div>
            )}
          </div>
          <div className="space-y-3">
            {stationTracks.map((track, idx) => (
              <div key={`${track.title}-${idx}`} className="bg-black/60 border border-white/10 p-4 flex items-center justify-between">
                <div>
                  <div className="font-heist text-lg text-white">{track.title}</div>
                  <div className="text-xs text-gray-400">{track.artist}</div>
                </div>
                {track.url ? (
                  <button
                    onMouseEnter={onBlip}
                    onClick={() => { onSelect(); onPlay(track); }}
                    className="px-4 py-2 border border-white/30 text-xs font-heist uppercase hover:bg-white hover:text-black"
                  >
                    Play
                  </button>
                ) : (
                  <button
                    onMouseEnter={onBlip}
                    onClick={onSelect}
                    className="px-4 py-2 border border-white/30 text-xs font-heist uppercase opacity-50 cursor-not-allowed"
                  >
                    No Audio
                  </button>
                )}
              </div>
            ))}
          </div>
          <div className="mt-6 flex items-center gap-3">
            <button
              onMouseEnter={onBlip}
              onClick={() => { onSelect(); onPause(); }}
              className="px-4 py-2 border border-white/30 text-xs font-heist uppercase hover:bg-white hover:text-black"
            >
              Pause
            </button>
            {nowPlaying && (
              <div className="text-xs text-gray-400 font-heist">
                {isPlaying ? 'Playing' : 'Paused'}: {nowPlaying.title}
              </div>
            )}
          </div>
          <div className="mt-4 text-xs text-gray-500 font-heist">
            Playback starts only when you press Play.
          </div>
          <div className="mt-2 text-[11px] text-gray-500 font-heist leading-relaxed">
            Disclaimer: VRGC does not own or claim copyright to any of the songs listed. All rights belong to
            their respective owners. Audio is provided for demonstration purposes only.
          </div>
        </div>
      </div>
    </div>
  );
};

const MissionModal = ({ job, onClose, onSelect }) => {
  const [phase, setPhase] = useState('briefing');

  const handleStart = () => {
    setPhase('passed');
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/95 backdrop-blur-md">
      {phase === 'briefing' ? (
        <div className="w-full max-w-4xl bg-[#1a1a1a] border border-white/10 grid grid-cols-1 md:grid-cols-2 shadow-2xl">
          <div className="h-64 md:h-auto relative">
             <img src={job.image} className="w-full h-full object-cover opacity-80" alt={job.title} />
             <div className="absolute bottom-0 left-0 bg-gta-green text-black font-heist px-4 py-2 text-xl">
               SETUP: {job.title}
             </div>
          </div>

          <div className="p-8 flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-start mb-6">
                <div>
                   <h2 className="font-heist text-3xl text-white">JOB DETAILS</h2>
                   <div className="h-1 w-12 bg-gta-green mt-1"></div>
                </div>
                <div className="text-right">
                  <div className="text-xs text-gray-500 uppercase font-bold">Payout</div>
                  <div className="text-gta-green font-pricedown text-3xl">{job.cash}</div>
                </div>
              </div>

              <div className="space-y-4 font-sans text-gray-300 text-sm">
                <p>{job.desc}</p>
                <div className="bg-black/40 p-4 border-l-2 border-white/20">
                  <div className="flex justify-between mb-1"><span>Difficulty</span> <span className="text-white">Hard</span></div>
                  <div className="flex justify-between mb-1"><span>Team Lives</span> <span className="text-white">0</span></div>
                  <div className="flex justify-between"><span>Location</span> <span className="text-white">Vinewood</span></div>
                </div>
              </div>
            </div>

            <div className="flex gap-4 mt-8">
              <button
                onClick={() => { onSelect(); handleStart(); }}
                className="flex-1 bg-white text-black font-heist text-xl py-3 hover:bg-gray-200 transition-colors uppercase"
              >
                Confirm
              </button>
              {job.url && (
                <a
                  href={job.url}
                  target="_blank"
                  rel="noreferrer"
                  className="px-6 border border-white/20 hover:bg-white/10 text-white font-heist text-xl py-3 transition-colors uppercase"
                >
                  Register
                </a>
              )}
              <button
                onClick={() => { onSelect(); onClose(); }}
                className="px-6 border border-white/20 hover:bg-white/10 text-white font-heist text-xl py-3 transition-colors uppercase"
              >
                Exit
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="w-full h-full flex flex-col items-center justify-center relative overflow-hidden">
          <div className="w-full max-w-4xl relative mb-12 animate-[pass-banner-slide_0.5s_ease-out_forwards]">
            <div
              className="h-32 absolute inset-0 opacity-50 blur-xl"
              style={{ background: 'linear-gradient(90deg, transparent, var(--gta-green-dim), transparent)' }}
            ></div>
            <h1
              className="font-pricedown text-8xl md:text-[150px] text-gta-green text-center relative z-10 text-stroke animate-[text-slam_0.5s_cubic-bezier(0.175,0.885,0.32,1.275)_forwards]"
              style={{ color: '#eeb92e', textShadow: '4px 4px 0 #000' }}
            >
              MISSION PASSED
            </h1>
            <div className="text-center text-white font-heist text-2xl tracking-[1em] mt-4 uppercase drop-shadow-md">
              Respect +
            </div>
          </div>

          <div className="bg-black/80 border border-white/20 p-8 w-full max-w-md backdrop-blur-md animate-[pass-banner-slide_0.5s_ease-out_0.5s_forwards] opacity-0">
             <div className="flex justify-between items-center border-b border-white/20 pb-4 mb-4">
               <span className="text-gray-400 uppercase font-bold text-sm">Job</span>
               <span className="text-white font-bold uppercase">{job.title}</span>
             </div>

             <div className="flex justify-center py-6">
                <div className="bg-white p-2">
                   <QrCode className="w-32 h-32 text-black" />
                </div>
             </div>

             <div className="text-center space-y-2">
               <div className="text-gta-green font-pricedown text-4xl">{job.cash}</div>
               <p className="text-xs text-gray-500 uppercase">Funds transferred to Maze Bank account</p>
             </div>

             <button
               onClick={() => { onSelect(); onClose(); }}
               className="w-full mt-6 bg-transparent border border-white/30 text-white py-3 font-heist uppercase hover:bg-white hover:text-black transition-colors"
             >
               Continue
             </button>
          </div>
        </div>
      )}
    </div>
  );
};

const IfruitPhone = ({ onNavigate, onBlip, onSelect }) => {
  const [open, setOpen] = useState(false);

  const apps = [
    { id: 'JOBS', label: 'Jobs', icon: Briefcase },
    { id: 'CREW', label: 'Contacts', icon: Users },
    { id: 'RECRUITMENT', label: 'Recruit', icon: Shield },
    { id: 'ABOUT', label: 'About', icon: Play },
    { id: 'GALLERY', label: 'Gallery', icon: Star },
    { id: 'RADIO', label: 'Radio', icon: Star },
    { id: 'HOME', label: 'Home', icon: Play },
  ];

  return (
    <>
      <div className={`ifruit-panel ${open ? 'open' : ''}`}>
        <div className="ifruit-header">
          <span>iFruit</span>
          <button onClick={() => { onSelect(); setOpen(false); }}>X</button>
        </div>
        <div className="ifruit-screen">
          <div className="ifruit-grid">
            {apps.map((app) => (
              <button
                key={app.id}
                className="ifruit-app"
                onMouseEnter={onBlip}
                onClick={() => {
                  onSelect();
                  onNavigate(app.id);
                  setOpen(false);
                }}
              >
                <app.icon className="w-5 h-5 mx-auto mb-2" />
                {app.label}
              </button>
            ))}
          </div>
          <div className="ifruit-dock">
            <button className="ifruit-home" onMouseEnter={onBlip} onClick={() => { onSelect(); onNavigate('HOME'); setOpen(false); }}>
              <Play className="w-5 h-5 text-white" />
            </button>
            <button className="ifruit-home" onMouseEnter={onBlip} onClick={() => { onSelect(); onNavigate('JOBS'); setOpen(false); }}>
              <Briefcase className="w-5 h-5 text-white" />
            </button>
            <button className="ifruit-home" onMouseEnter={onBlip} onClick={() => { onSelect(); onNavigate('CREW'); setOpen(false); }}>
              <Users className="w-5 h-5 text-white" />
            </button>
          </div>
        </div>
      </div>

      <button
        className="ifruit"
        onMouseEnter={onBlip}
        onClick={() => { onSelect(); setOpen((v) => !v); }}
      >
        <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center">
          <Play className="w-6 h-6 text-black" />
        </div>
      </button>
    </>
  );
};

export default function App() {
  const [activeTab, setActiveTab] = useState('HOME');
  const [selectedJob, setSelectedJob] = useState(null);
  const uiAudioRef = useRef(null);
  const musicRef = useRef(null);
  const [nowPlaying, setNowPlaying] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioError, setAudioError] = useState(null);
  const [playerPos, setPlayerPos] = useState({ x: 16, y: 16 });
  const [dragging, setDragging] = useState(false);

  const initAudio = () => {
    if (uiAudioRef.current) return;
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    uiAudioRef.current = ctx;
  };

  const playTone = (freq, duration = 0.08) => {
    const ctx = uiAudioRef.current;
    if (!ctx) return;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'square';
    osc.frequency.value = freq;
    gain.gain.value = 0.05;
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + duration);
  };

  const blip = () => playTone(520, 0.04);
  const select = () => playTone(220, 0.08);

  const handlePlayTrack = (track) => {
    if (!track?.url) return;
    if (musicRef.current) musicRef.current.pause();
    const audio = new Audio(track.url);
    audio.crossOrigin = 'anonymous';
    audio.preload = 'none';
    musicRef.current = audio;
    audio.onerror = () => {
      setAudioError('Audio failed to load. The host may block playback or CORS.');
      setIsPlaying(false);
    };
    audio.onplaying = () => {
      setAudioError(null);
      setIsPlaying(true);
    };
    audio.onended = () => {
      setIsPlaying(false);
    };
    audio.play().catch(() => {
      setAudioError('Playback blocked. Tap Play again or check the audio URL.');
      setIsPlaying(false);
    });
    setNowPlaying(track);
  };

  const handlePauseTrack = () => {
    if (!musicRef.current) return;
    musicRef.current.pause();
    setIsPlaying(false);
  };

  const handleStopTrack = () => {
    if (musicRef.current) {
      musicRef.current.pause();
      musicRef.current = null;
    }
    setIsPlaying(false);
    setNowPlaying(null);
    setAudioError(null);
  };

  const startDrag = (e) => {
    e.preventDefault();
    setDragging(true);
  };

  useEffect(() => {
    if (!dragging) return;
    const handleMove = (e) => {
      const x = Math.max(8, Math.min(window.innerWidth - 300, e.clientX - 80));
      const y = Math.max(8, Math.min(window.innerHeight - 80, window.innerHeight - e.clientY - 40));
      setPlayerPos({ x, y });
    };
    const handleUp = () => setDragging(false);
    window.addEventListener('mousemove', handleMove);
    window.addEventListener('mouseup', handleUp);
    return () => {
      window.removeEventListener('mousemove', handleMove);
      window.removeEventListener('mouseup', handleUp);
    };
  }, [dragging]);

  useEffect(() => {
    const styleSheet = document.createElement("style");
    styleSheet.innerText = styles;
    document.head.appendChild(styleSheet);
    return () => document.head.removeChild(styleSheet);
  }, []);

  useEffect(() => {
    // keep music playing across pages; no auto-stop on tab change
  }, [activeTab]);

  return (
    <div className="min-h-screen relative text-[#f0f0f0] bg-[#0f0f0f]" onClick={initAudio} onKeyDown={initAudio}>
      <div className="fixed inset-0 bg-noise z-0 pointer-events-none"></div>

      <div className="relative z-10">
        <Navbar activeTab={activeTab} setActiveTab={setActiveTab} onBlip={blip} onSelect={select} />

        {activeTab === 'HOME' && <LoadingHome onStart={() => setActiveTab('JOBS')} onBlip={blip} onSelect={select} />}
        {activeTab === 'JOBS' && <JobBoard onSelectJob={setSelectedJob} onBlip={blip} onSelect={select} />}
        {activeTab === 'CREW' && <CrewRoster onBlip={blip} onSelect={select} />}
        {activeTab === 'RECRUITMENT' && <RecruitmentPage onBlip={blip} onSelect={select} />}
        {activeTab === 'ABOUT' && <AboutSection onBlip={blip} onSelect={select} />}
        {activeTab === 'GALLERY' && <GallerySection onBlip={blip} onSelect={select} />}
        {activeTab === 'RADIO' && (
          <RadioSection
            onBlip={blip}
            onSelect={select}
            nowPlaying={nowPlaying}
            isPlaying={isPlaying}
            onPlay={handlePlayTrack}
            onPause={handlePauseTrack}
            onStop={handleStopTrack}
          />
        )}

        {selectedJob && <MissionModal job={selectedJob} onClose={() => setSelectedJob(null)} onSelect={select} />}

        <IfruitPhone onNavigate={setActiveTab} onBlip={blip} onSelect={select} />
        {nowPlaying && (
          <div
            className={`mini-player ${dragging ? 'dragging' : ''}`}
            style={{ left: `${playerPos.x}px`, bottom: `${playerPos.y}px`, right: 'auto' }}
          >
            <div className="mini-player-handle" onMouseDown={startDrag}>DRAG</div>
            <div className="flex-1">
              <div className="title">Now Playing</div>
              <div className="meta">{nowPlaying.title} — {nowPlaying.artist}</div>
              {audioError && <div className="meta" style={{ color: '#ff8a8a' }}>{audioError}</div>}
            </div>
            {isPlaying && (
              <div className="wave" aria-hidden="true">
                <span></span><span></span><span></span><span></span><span></span>
              </div>
            )}
            <button
              onMouseEnter={blip}
              onClick={() => { select(); handlePauseTrack(); }}
              className="px-3 py-2 border border-white/30 text-xs font-heist uppercase hover:bg-white hover:text-black"
            >
              {isPlaying ? 'Pause' : 'Play'}
            </button>
            <button
              onMouseEnter={blip}
              onClick={() => { select(); handleStopTrack(); }}
              className="px-3 py-2 border border-white/30 text-xs font-heist uppercase hover:bg-white hover:text-black"
            >
              Stop
            </button>
          </div>
        )}

        <footer className="mt-16 border-t border-white/10 py-6 px-6 text-xs text-gray-500 font-heist">
          Disclaimer: VRGC does not own or claim copyright to any third-party content, music, images, or
          trademarks displayed on this site. All rights belong to their respective owners. Content is used
          for showcase/demo purposes only.
        </footer>
      </div>
    </div>
  );
}
