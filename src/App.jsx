import React, { useState, useEffect, useRef } from 'react';
import {
  Gamepad2, Headphones, Calendar, Ticket, Users, Trophy,
  ChevronRight, Menu, X, Cpu, Zap, MapPin, Clock,
  CheckCircle, QrCode, Terminal, Activity, Shield, Crosshair,
  Star, Award, Target, Flame, Sparkles, Code, Youtube, Instagram,
  Twitter, Github, Mail, Phone, MapPinned, ExternalLink
} from 'lucide-react';

import vrgcLogo from '../pics/VRGC Logo.png';
import gamersAsylumLogo from "../pics/Gamer's Asylum 6.0 logo.png";
import valoPoster from '../pics/ValorantTourney.png';
import bgmiPoster from '../pics/BGMITOURNEYposter.png';
import codPoster from '../pics/CALL OF DUTY.png';

// --- CUSTOM COMPONENTS ---

// 1. Matrix/Grid Background with Optimized Performance
const MatrixBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    let width = window.innerWidth;
    let height = window.innerHeight;
    let animationFrameId;

    canvas.width = width;
    canvas.height = height;

    const particles = [];
    const particleCount = Math.min(50, Math.floor(width / 20)); // Responsive particle count

    class Particle {
      constructor() {
        this.reset();
      }

      reset() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
        this.size = Math.random() * 2 + 1;
        this.color = Math.random() > 0.5 ? '#a855f7' : '#3b82f6';
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;
        if (this.x < 0 || this.x > width) this.vx *= -1;
        if (this.y < 0 || this.y > height) this.vy *= -1;
      }

      draw() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    const drawGrid = () => {
      ctx.strokeStyle = 'rgba(124, 58, 237, 0.1)';
      ctx.lineWidth = 1;
      ctx.beginPath();

      for (let x = 0; x <= width; x += 50) {
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
      }
      for (let y = 0; y <= height; y += 50) {
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
      }
      ctx.stroke();
    };

    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      drawGrid();

      particles.forEach((p, i) => {
        p.update();
        p.draw();

        // Connect nearby particles
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 100) {
            ctx.strokeStyle = `rgba(168, 85, 247, ${0.3 - dist / 300})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 z-0 pointer-events-none opacity-60" />;
};

// 2. Glitch Text Component
const GlitchText = ({ text, className = "", as: Component = "h1" }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Component
      className={`relative inline-block cursor-default ${className} ${isHovered ? 'animate-glitch' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <span className="relative z-10">{text}</span>
      {isHovered && (
        <>
          <span className="absolute top-0 left-0 -ml-[2px] text-red-500 opacity-70 animate-pulse pointer-events-none" aria-hidden="true">{text}</span>
          <span className="absolute top-0 left-0 ml-[2px] text-cyan-500 opacity-70 animate-pulse delay-75 pointer-events-none" aria-hidden="true">{text}</span>
        </>
      )}
    </Component>
  );
};

// 3. Boot Loader with Better UX
const BootLoader = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [log, setLog] = useState("INITIALIZING KERNEL...");

  useEffect(() => {
    const logs = [
      "LOADING ASSETS...",
      "CONNECTING TO VR NET...",
      "OPTIMIZING SHADERS...",
      "AUTHENTICATING USER...",
      "SYSTEM READY."
    ];

    let step = 0;
    const interval = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev + 2;
        if (newProgress >= 100) {
          clearInterval(interval);
          setTimeout(onComplete, 500);
          return 100;
        }
        return newProgress;
      });

      if (Math.random() > 0.8 && step < logs.length) {
        setLog(logs[step]);
        step++;
      }
    }, 30);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 bg-black z-[100] flex flex-col items-center justify-center font-mono text-green-500">
      <div className="w-80 mb-4">
        <div className="flex justify-between text-xs mb-1">
          <span>BOOT_SEQUENCE_V2.0</span>
          <span>{progress}%</span>
        </div>
        <div className="h-2 bg-gray-900 rounded-full overflow-hidden border border-green-900">
          <div
            className="h-full bg-green-500 transition-all duration-75 ease-out shadow-[0_0_10px_#22c55e]"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
      <div className="text-sm h-6 animate-pulse">{'>'} {log}</div>
    </div>
  );
};

// 4. Enhanced Navbar with Mobile Support
const Navbar = ({ activeTab, setActiveTab }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = ['HOME', 'EVENTS', 'MEMBERSHIP', 'GALLERY', 'ABOUT'];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? 'bg-slate-900/95 backdrop-blur-xl shadow-lg shadow-purple-500/10' : 'bg-slate-900/90 backdrop-blur-xl'
    } border-b border-purple-500/30`}>
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div
            className="flex items-center gap-3 cursor-pointer group"
            onClick={() => {
              setActiveTab('home');
              setMobileMenuOpen(false);
            }}
          >
            <div className="relative">
              <div className="absolute inset-0 bg-purple-600 blur-lg opacity-50 group-hover:opacity-100 transition-opacity" />
              <div className="relative w-12 h-12 bg-slate-800 border border-slate-700 rounded-lg flex items-center justify-center transform group-hover:rotate-6 transition-transform duration-300">
                <img src={vrgcLogo} alt="VRGC" className="w-8 h-8 object-contain" />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="font-black text-2xl tracking-wider text-white italic">
                VRGC<span className="text-purple-500">.exe</span>
              </span>
              <span className="text-[10px] text-green-400 font-mono tracking-widest">SYSTEM ONLINE</span>
            </div>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <button
                key={item}
                onClick={() => setActiveTab(item.toLowerCase())}
                className={`relative px-4 py-2 text-sm font-bold tracking-widest transition-all duration-300 group overflow-hidden ${
                  activeTab === item.toLowerCase() ? 'text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                <span className="relative z-10">{item}</span>
                <span className={`absolute bottom-0 left-0 h-[2px] bg-purple-500 transition-all duration-300 ${
                  activeTab === item.toLowerCase() ? 'w-full shadow-[0_0_10px_#a855f7]' : 'w-0 group-hover:w-full'
                }`} />
              </button>
            ))}
            <button
              onClick={() => setActiveTab('events')}
              className="bg-purple-600 hover:bg-purple-500 text-white px-6 py-2 rounded-sm font-bold uppercase tracking-wider text-xs border border-purple-400 shadow-[0_0_15px_rgba(168,85,247,0.5)] hover:shadow-[0_0_25px_rgba(168,85,247,0.8)] transition-all flex items-center gap-2 transform hover:-translate-y-1 active:translate-y-0"
            >
              <Ticket className="w-4 h-4" />
              Get Pass
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white hover:text-purple-400 transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-slate-800 animate-fade-in">
            {navItems.map((item) => (
              <button
                key={item}
                onClick={() => {
                  setActiveTab(item.toLowerCase());
                  setMobileMenuOpen(false);
                }}
                className={`block w-full text-left px-4 py-3 text-sm font-bold tracking-widest transition-all ${
                  activeTab === item.toLowerCase()
                    ? 'text-white bg-purple-900/30 border-l-4 border-purple-500'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
                }`}
              >
                {item}
              </button>
            ))}
            <button
              onClick={() => {
                setActiveTab('events');
                setMobileMenuOpen(false);
              }}
              className="w-full mt-4 bg-purple-600 hover:bg-purple-500 text-white px-6 py-3 rounded-sm font-bold uppercase tracking-wider text-xs border border-purple-400 flex items-center justify-center gap-2"
            >
              <Ticket className="w-4 h-4" />
              Get Pass
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

// 5. Enhanced Hero Section
const Hero = ({ setActiveTab }) => {
  const stats = [
    { icon: Users, val: "1.2K+", label: "Active Players", color: "text-blue-500" },
    { icon: Trophy, val: "₹50K+", label: "Prize Pool", color: "text-yellow-500" },
    { icon: Calendar, val: "45+", label: "Events/Year", color: "text-green-500" },
    { icon: Gamepad2, val: "12+", label: "Game Dev Projects", color: "text-purple-500" }
  ];

  return (
    <div className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
      {/* Background Video */}
      <div className="absolute inset-0 -z-10 opacity-30">
        <div className="absolute inset-0 bg-slate-950/70" />
        <div className="absolute inset-0 overflow-hidden">
          <iframe
            width="560"
            height="315"
            src="https://www.youtube.com/embed/oKYW5gKeOWc?si=6dEHD_v7mXIfJwkR&start=3&autoplay=1&mute=1&loop=1&playlist=oKYW5gKeOWc&controls=0&modestbranding=1&rel=0&playsinline=1"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
            className="absolute top-1/2 left-1/2 w-[140vw] h-[140vh] -translate-x-1/2 -translate-y-1/2 object-cover pointer-events-none"
          />
        </div>
      </div>
      {/* Floating Geometric Elements */}
      <div className="absolute top-1/4 left-10 w-24 h-24 border border-purple-500/20 rounded-full animate-float blur-sm" />
      <div className="absolute bottom-1/4 right-10 w-32 h-32 border border-blue-500/20 rounded-full animate-float delay-1000 blur-sm" />
      <div className="absolute top-1/2 right-1/4 w-16 h-16 border border-pink-500/20 rotate-45 animate-float delay-500" />

      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
        {/* Status Badge */}
        <div className="inline-flex items-center gap-3 px-4 py-2 bg-slate-900/80 border border-green-500/50 text-green-400 font-mono text-xs mb-8 rounded-sm shadow-[0_0_10px_rgba(34,197,94,0.2)] animate-pulse">
          <Activity className="w-3 h-3" />
          <span>SERVER_STATUS: RECRUITING</span>
          <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
        </div>

        {/* Main Heading */}
        <div className="flex flex-col items-center gap-4 mb-6">
          <img src={vrgcLogo} alt="VRGC Logo" className="w-20 h-20 object-contain opacity-90" />
          <h1 className="text-5xl md:text-7xl font-black text-white tracking-tight">
            VR & Gaming Club
          </h1>
          <div className="text-sm md:text-base font-mono text-slate-400 tracking-widest">
            VIT BHOPAL UNIVERSITY
          </div>
        </div>

        {/* Subheading */}
        <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto mb-10 font-mono">
          Building competitive esports, VR innovation, and a campus-wide gaming culture.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
          <button
            onClick={() => setActiveTab('events')}
            className="group relative px-8 py-4 bg-transparent overflow-hidden rounded-sm w-full sm:w-auto"
          >
            <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-purple-600 to-blue-600 opacity-80 group-hover:opacity-100 transition-opacity" />
            <div className="absolute inset-0 w-full h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAwIDAgTCAwIDIwIE0gMCAwIEwgMjAgMCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjZmZmIiBvcGFjaXR5PSIwLjEiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-20" />
            <span className="relative flex items-center justify-center gap-2 font-bold text-white tracking-widest uppercase">
              Start Game <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </span>
            <div className="absolute bottom-0 left-0 w-full h-1 bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
          </button>

          <button
            onClick={() => setActiveTab('membership')}
            className="px-8 py-4 border-2 border-slate-600 text-slate-300 font-bold uppercase tracking-widest hover:bg-slate-800 hover:text-white hover:border-white transition-all rounded-sm flex items-center justify-center gap-2 group w-full sm:w-auto"
          >
            <Users className="w-4 h-4 text-slate-500 group-hover:text-white transition-colors" />
            Join Guild
          </button>
        </div>

        {/* Stats */}
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-4 border-t border-slate-800 pt-8 glass-effect p-6 rounded-xl">
          {stats.map((stat, i) => (
            <div key={i} className="flex flex-col items-center group cursor-default">
              <stat.icon className={`w-6 h-6 ${stat.color} mb-2 group-hover:scale-110 transition-transform`} />
              <span className="text-2xl font-bold text-white">{stat.val}</span>
              <span className="text-[10px] text-slate-500 uppercase tracking-widest">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// 6. Events Page - Gamer Asylum 6.0
const EventsPage = () => {
  const gamerAsylumEvent = {
    id: 1,
    title: "GAMER ASYLUM 6.0",
    type: "ESPORTS FESTIVAL",
    date: "FEB 2026",
    time: "All Day",
    location: "VIT Bhopal Campus",
    description: "The flagship esports circuit featuring Valorant, BGMI, and Call of Duty."
  };

  const esportsCards = [
    {
      id: 'valorant',
      title: 'Valorant Pre-Finals',
      status: 'Registration Open',
      poster: valoPoster,
      cta: 'Register',
      lumaUrl: 'https://lu.ma/nmtp4uiv',
    },
    {
      id: 'bgmi',
      title: 'BGMI Tournament',
      status: 'Registration Open',
      poster: bgmiPoster,
      cta: 'Register',
      lumaUrl: 'https://luma.com/event/evt-3wYphiWIMjmlp3l',
    },
    {
      id: 'codm',
      title: 'CODM Showdown',
      status: 'Coming Soon',
      poster: codPoster,
      cta: 'Notify Me',
      lumaUrl: null,
    },
  ];

  const posters = [
    { src: valoPoster, alt: 'Valorant Poster' },
    { src: bgmiPoster, alt: 'BGMI Poster' },
    { src: codPoster, alt: 'CODM Poster' },
  ];
  const [slideIndex, setSlideIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setSlideIndex((prev) => (prev + 1) % posters.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [posters.length]);

  return (
    <div className="min-h-screen pt-28 px-4 pb-20">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-6xl font-black text-white mb-4">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-200 to-slate-400">FEATURED EVENT</span>
          </h2>
          <p className="text-slate-400 font-mono">Professional esports production • Campus-wide participation</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div className="glass-effect p-8 rounded-2xl border border-slate-700">
            <div className="flex items-center gap-4 mb-6">
              <img src={gamersAsylumLogo} alt="Gamer Asylum 6.0" className="w-20 h-20 object-contain" />
              <div>
                <div className="text-xs font-mono text-slate-400">{gamerAsylumEvent.type}</div>
                <h3 className="text-3xl font-black text-white">{gamerAsylumEvent.title}</h3>
              </div>
            </div>

            <p className="text-slate-400 mb-6">
              {gamerAsylumEvent.description}
            </p>

            <div className="space-y-3 text-sm text-slate-300 font-mono mb-8">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-slate-400" />
                <span>{gamerAsylumEvent.date}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-slate-400" />
                <span>{gamerAsylumEvent.time}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-slate-400" />
                <span>{gamerAsylumEvent.location}</span>
              </div>
            </div>

            <a
              href="https://lu.ma/nmtp4uiv"
              target="_blank"
              rel="noreferrer"
              className="w-full py-3 bg-white text-slate-900 font-bold uppercase tracking-widest transition-all flex items-center justify-center gap-2 border border-white/20 hover:bg-slate-200 rounded"
            >
              <Ticket className="w-4 h-4" /> Register Now
            </a>
          </div>

          <div className="relative">
            <div className="rounded-2xl overflow-hidden border border-slate-800">
              <img
                src={posters[slideIndex].src}
                alt={posters[slideIndex].alt}
                className="w-full h-full object-cover transition-opacity duration-500"
              />
            </div>
            <div className="absolute -bottom-4 -right-4 bg-slate-900/90 border border-slate-700 px-4 py-2 rounded-xl text-xs font-mono text-slate-300">
              Powered by VRGC Esports
            </div>
          </div>
        </div>

        <div className="mt-12">
          <h3 className="text-2xl font-bold text-white mb-6 text-center">ESPORTS EVENTS</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {esportsCards.map((card) => (
              <div key={card.id} className="bg-slate-900 border border-slate-700 rounded-xl overflow-hidden">
                <img src={card.poster} alt={card.title} className="w-full h-44 object-cover" />
                <div className="p-4">
                  <div className="text-white font-semibold mb-1">{card.title}</div>
                  <div className={`text-xs font-mono mb-4 ${card.status === 'Coming Soon' ? 'text-slate-400' : 'text-emerald-400'}`}>
                    {card.status}
                  </div>
                  {card.lumaUrl ? (
                    <a
                      href={card.lumaUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="w-full py-2 text-xs font-bold uppercase tracking-widest border rounded transition-all border-white/20 bg-white text-slate-900 hover:bg-slate-200 inline-flex items-center justify-center"
                    >
                      {card.cta}
                    </a>
                  ) : (
                    <button
                      className="w-full py-2 text-xs font-bold uppercase tracking-widest border rounded transition-all border-slate-700 text-slate-400 bg-slate-800/50 cursor-not-allowed"
                      disabled
                    >
                      {card.cta}
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// 7. Gallery Page
const GalleryPage = () => {
  const images = [
    { id: 1, title: "Gamer Asylum 6.0", category: "ESPORTS", src: gamersAsylumLogo },
    { id: 2, title: "Valorant Tournament", category: "ESPORTS", src: valoPoster },
    { id: 3, title: "BGMI Tournament", category: "ESPORTS", src: bgmiPoster },
    { id: 4, title: "Call of Duty", category: "ESPORTS", src: codPoster },
    { id: 5, title: "VRGC Branding", category: "CLUB", src: vrgcLogo },
  ];

  return (
    <div className="min-h-screen pt-28 px-4 pb-20">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-6xl font-black text-white mb-4">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">MEMORY VAULT</span>
          </h2>
          <p className="text-slate-400 font-mono">Highlights from our epic gaming journey</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {images.map((img) => (
            <div
              key={img.id}
              className="group relative aspect-video bg-slate-900 rounded-lg overflow-hidden border border-slate-700 hover:border-slate-400 transition-all duration-300 cursor-pointer"
            >
              <img src={img.src} alt={img.title} className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4">
                <h3 className="text-white font-bold text-lg">{img.title}</h3>
                <span className="text-xs text-slate-300 font-mono">{img.category}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// 8. About/Membership Page
const AboutPage = () => {
  const team = [
    { name: "Lead Name", role: "President", icon: Star },
    { name: "Lead Name", role: "Vice President", icon: Award },
    { name: "Lead Name", role: "Esports Lead", icon: Target },
    { name: "Lead Name", role: "Creative Lead", icon: Sparkles },
  ];

  const perks = [
    { icon: Trophy, title: "Exclusive Tournaments", desc: "Participate in inter-college and national esports competitions" },
    { icon: Headphones, title: "VR Access", desc: "Free access to our state-of-the-art VR lab and equipment" },
    { icon: Users, title: "Community", desc: "Connect with 1000+ gamers and developers across campus" },
    { icon: Code, title: "Workshops", desc: "Learn game development, 3D modeling, and programming" },
    { icon: Ticket, title: "Event Passes", desc: "Priority access and discounts on all club events" },
    { icon: Star, title: "Networking", desc: "Meet industry professionals and game studio representatives" },
  ];

  return (
    <div className="min-h-screen pt-28 px-4 pb-20">
      <div className="max-w-7xl mx-auto">
        {/* About Section */}
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-6xl font-black text-white mb-6">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">ABOUT THE GUILD</span>
          </h2>
          <p className="text-slate-300 text-lg max-w-3xl mx-auto leading-relaxed mb-8">
            The VR & Gaming Club (VRGC) at VIT Bhopal is the ultimate hub for gaming enthusiasts, esports athletes,
            and aspiring game developers. Since 2020, we've been building a community where passion meets innovation.
          </p>
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-900/20 border border-green-500/50 text-green-400 font-mono text-sm rounded">
            <CheckCircle className="w-4 h-4" />
            <span>EST. 2020 • 1200+ MEMBERS • 45+ EVENTS/YEAR</span>
          </div>
        </div>

        {/* Membership Perks */}
        <div className="mb-20">
          <h3 className="text-3xl font-black text-white mb-8 text-center">MEMBERSHIP PERKS</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {perks.map((perk, i) => (
              <div
                key={i}
                className="glass-effect p-6 rounded-lg border-2 border-slate-700 hover:border-purple-500 transition-all group"
              >
                <div className="w-12 h-12 bg-purple-900/30 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <perk.icon className="w-6 h-6 text-purple-400" />
                </div>
                <h4 className="text-white font-bold text-lg mb-2">{perk.title}</h4>
                <p className="text-slate-400 text-sm">{perk.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Club Leads Section */}
        <div className="mb-20">
          <h3 className="text-3xl font-black text-white mb-8 text-center">CLUB LEADS</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member, i) => (
              <div
                key={i}
                className="glass-effect p-6 rounded-lg text-center border border-slate-700 hover:border-slate-400 transition-all group"
              >
                <div className="w-20 h-20 mx-auto bg-slate-900 rounded-full flex items-center justify-center mb-4 border border-slate-700 group-hover:scale-105 transition-transform">
                  <member.icon className="w-10 h-10 text-slate-200" />
                </div>
                <h4 className="text-white font-bold text-lg">{member.name}</h4>
                <p className="text-slate-400 text-sm font-mono">{member.role}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Team Registration */}
        <div className="mb-20">
          <h3 className="text-3xl font-black text-white mb-8 text-center">JOIN A TEAM</h3>
          <div className="glass-effect p-8 rounded-xl border border-slate-700 max-w-3xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="text-xs font-mono text-slate-400">FULL NAME</label>
                <input className="w-full mt-2 bg-slate-900 border border-slate-700 p-3 text-white focus:outline-none focus:border-slate-400 transition-all font-mono" placeholder="Your name" />
              </div>
              <div>
                <label className="text-xs font-mono text-slate-400">EMAIL</label>
                <input className="w-full mt-2 bg-slate-900 border border-slate-700 p-3 text-white focus:outline-none focus:border-slate-400 transition-all font-mono" placeholder="you@vitbhopal.ac.in" />
              </div>
              <div>
                <label className="text-xs font-mono text-slate-400">PHONE</label>
                <input className="w-full mt-2 bg-slate-900 border border-slate-700 p-3 text-white focus:outline-none focus:border-slate-400 transition-all font-mono" placeholder="+91" />
              </div>
              <div>
                <label className="text-xs font-mono text-slate-400">TEAM</label>
                <select className="w-full mt-2 bg-slate-900 border border-slate-700 p-3 text-white focus:outline-none focus:border-slate-400 transition-all font-mono">
                  <option>Education Team</option>
                  <option>Social Media Team</option>
                  <option>Design Team</option>
                  <option>Esports Team</option>
                  <option>PR & Outreach Team</option>
                </select>
              </div>
            </div>
            <button className="mt-6 w-full py-3 bg-white text-slate-900 font-bold uppercase tracking-widest border border-white/20 hover:bg-slate-200 transition-all">
              Submit Interest
            </button>
          </div>
        </div>

        {/* Join CTA */}
        <div className="glass-effect p-12 rounded-xl border-2 border-purple-500/30 text-center">
          <h3 className="text-3xl font-black text-white mb-4">READY TO JOIN?</h3>
          <p className="text-slate-400 mb-8 max-w-2xl mx-auto">
            Become part of VIT Bhopal's most active gaming community. Access exclusive events,
            tournaments, workshops, and connect with fellow gamers.
          </p>
          <button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white px-8 py-4 rounded-sm font-bold uppercase tracking-wider text-sm border border-purple-400 shadow-[0_0_20px_rgba(168,85,247,0.5)] hover:shadow-[0_0_30px_rgba(168,85,247,0.8)] transition-all flex items-center gap-2 mx-auto">
            <Users className="w-5 h-5" />
            Apply for Membership
          </button>
        </div>
      </div>
    </div>
  );
};



// 10. Footer Component
const Footer = () => {
  const socialLinks = [
    { icon: Instagram, url: '#', label: 'Instagram' },
    { icon: Twitter, url: '#', label: 'Twitter' },
    { icon: Youtube, url: '#', label: 'YouTube' },
    { icon: Github, url: '#', label: 'GitHub' },
  ];

  return (
    <footer className="relative z-10 bg-slate-900 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-slate-800 rounded-lg flex items-center justify-center border border-slate-700">
                <img src={vrgcLogo} alt="VRGC" className="w-6 h-6 object-contain" />
              </div>
              <span className="font-black text-xl text-white">VRGC<span className="text-slate-400">.exe</span></span>
            </div>
            <p className="text-slate-400 text-sm mb-4">
              VR & Gaming Club at VIT Bhopal University. Building the future of gaming and virtual reality.
            </p>
            <div className="flex gap-3">
              {socialLinks.map((social, i) => (
                <a
                  key={i}
                  href={social.url}
                  aria-label={social.label}
                  className="w-10 h-10 bg-slate-800 hover:bg-purple-600 border border-slate-700 hover:border-purple-500 rounded flex items-center justify-center transition-all group"
                >
                  <social.icon className="w-5 h-5 text-slate-400 group-hover:text-white transition-colors" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-bold mb-4 text-sm uppercase tracking-wider">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              {['Home', 'Events', 'Membership', 'Gallery', 'About'].map((link) => (
                <li key={link}>
                  <a href={`#${link.toLowerCase()}`} className="text-slate-400 hover:text-purple-400 transition-colors">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-bold mb-4 text-sm uppercase tracking-wider">Contact</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2 text-slate-400">
                <Mail className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span>vrgc@vitbhopal.ac.in</span>
              </li>
              <li className="flex items-start gap-2 text-slate-400">
                <Phone className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span>+91 98765 43210</span>
              </li>
              <li className="flex items-start gap-2 text-slate-400">
                <MapPinned className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span>VIT Bhopal University, Sehore, MP</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <Cpu className="w-4 h-4 text-purple-500" />
            <span className="font-mono text-xs text-slate-500">SYSTEM_HEALTH: OPTIMAL</span>
          </div>
          <div className="text-slate-600 text-sm text-center">
            &copy; {new Date().getFullYear()} VRGC VIT Bhopal. Designed for the Future.
          </div>
        </div>
      </div>
    </footer>
  );
};

// --- MAIN APP COMPONENT ---

export default function App() {
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('home');

  // Smooth scroll to top on tab change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activeTab]);

  if (loading) {
    return <BootLoader onComplete={() => setLoading(false)} />;
  }

  return (
    <div className="relative min-h-screen bg-slate-950 text-slate-200 overflow-x-hidden selection:bg-purple-500 selection:text-white">
      {/* Background System */}
      <MatrixBackground />
      <div className="scanline-overlay fixed inset-0 z-[1] pointer-events-none opacity-20" />

      {/* Navigation */}
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Content */}
      <main className="relative z-10">
        {activeTab === 'home' && <Hero setActiveTab={setActiveTab} />}
        {activeTab === 'events' && <EventsPage />}
        {activeTab === 'gallery' && <GalleryPage />}
        {activeTab === 'membership' && <AboutPage />}
        {activeTab === 'about' && <AboutPage />}
      </main>

      {/* Footer */}
      <Footer />

      {/* Ticket Modal */}
    </div>
  );
}
