import { Link } from 'react-router-dom';
import { ArrowLeft, Shield, Sparkles, Compass, Target, Eye } from 'lucide-react';

export default function About() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white pt-32 pb-24 px-6 md:px-12 lg:px-24 relative overflow-hidden">
      {/* Background ambient light */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-red-600/5 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-zinc-800/5 rounded-full blur-[180px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Navigation Breadcrumb */}
        <Link to="/" className="inline-flex items-center gap-2 text-zinc-500 hover:text-white transition-colors text-xs font-semibold uppercase tracking-wider no-underline mb-12">
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>

        {/* Header */}
        <div className="mb-16">
          <span className="text-xs font-semibold uppercase tracking-[0.25em] text-red-500 mb-3 block">
            Our Heritage
          </span>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight font-outfit uppercase m-0 leading-tight mb-4">
            About DriveNova
          </h1>
          <p className="text-zinc-400 font-light max-w-2xl text-sm md:text-base leading-relaxed m-0">
            DriveNova is the world's premier private members club offering discerning drivers on-demand access to a curated registry of V12 hypercars, supercars, and high-performance roadsters.
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* LEFT: Overview & Philosophy (7 Columns) */}
          <div className="lg:col-span-7 space-y-12">
            
            {/* Company Overview */}
            <section className="bg-zinc-950/80 border border-zinc-900 rounded-lg p-8 backdrop-blur-md">
              <h2 className="text-2xl font-bold uppercase tracking-tight text-white mb-4 font-outfit">
                Company Overview
              </h2>
              <p className="text-zinc-400 font-light text-sm md:text-base leading-relaxed m-0">
                Founded by racing enthusiasts and luxury hospitality veterans, DriveNova bridge the gap between absolute performance engineering and flawless concierge service. We maintain a limited-member roster to guarantee that our V12 hypercars are meticulously detailed, dynamically inspected, and ready for immediate delivery at our private terminals.
              </p>
            </section>

            {/* Mission & Vision */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-zinc-950/80 border border-zinc-900 rounded-lg p-6 backdrop-blur-md">
                <div className="w-8 h-8 rounded bg-red-950/10 border border-red-950/40 flex items-center justify-center mb-4">
                  <Target className="w-4 h-4 text-red-500" />
                </div>
                <h3 className="text-sm uppercase tracking-wider font-bold text-white mb-2 font-outfit">Our Mission</h3>
                <p className="text-zinc-400 font-light text-xs md:text-sm leading-relaxed m-0">
                  To provide friction-free, elite-tier access to the world's most coveted driving machines, bypassing the burdens of ownership.
                </p>
              </div>

              <div className="bg-zinc-950/80 border border-zinc-900 rounded-lg p-6 backdrop-blur-md">
                <div className="w-8 h-8 rounded bg-red-950/10 border border-red-950/40 flex items-center justify-center mb-4">
                  <Eye className="w-4 h-4 text-red-500" />
                </div>
                <h3 className="text-sm uppercase tracking-wider font-bold text-white mb-2 font-outfit">Our Vision</h3>
                <p className="text-zinc-400 font-light text-xs md:text-sm leading-relaxed m-0">
                  To establish the benchmark for global luxury mobility, where performance telemetry meets elite concierge lifestyle.
                </p>
              </div>
            </div>

            {/* Philosophy */}
            <section className="bg-zinc-950/80 border border-zinc-900 rounded-lg p-8 backdrop-blur-md">
              <h2 className="text-2xl font-bold uppercase tracking-tight text-white mb-4 font-outfit">
                Luxury Mobility Philosophy
              </h2>
              <p className="text-zinc-400 font-light text-sm md:text-base leading-relaxed m-0">
                We believe that driving is an art form. The mechanical symphony of a V12 powertrain, the feedback of an active aerodynamic wing, and the thrill of absolute power cannot be replaced. Our philosophy dictates that every handover should be an experience of high ceremony. We ensure that your vehicle is calibrated to your preferred throttle mapping, climate settings, and preloaded route telemetry before you touch the wheel.
              </p>
            </section>

          </div>

          {/* RIGHT: Why DriveNova & Key Pillars (5 Columns) */}
          <div className="lg:col-span-5 space-y-6">
            
            <div className="bg-zinc-950/80 border border-zinc-900 rounded-lg p-8 backdrop-blur-md">
              <h3 className="text-lg font-bold uppercase tracking-tight text-white mb-6 font-outfit flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-red-500" />
                Why DriveNova
              </h3>
              
              <ul className="list-none p-0 m-0 space-y-6">
                <li className="flex gap-4">
                  <div className="flex-shrink-0 w-6 h-6 rounded bg-zinc-900 border border-zinc-800 flex items-center justify-center mt-1">
                    <Shield className="w-3.5 h-3.5 text-zinc-500" />
                  </div>
                  <div>
                    <h4 className="text-xs uppercase tracking-wider font-semibold text-white mb-1">Guaranteed Quality</h4>
                    <p className="text-zinc-400 text-xs font-light leading-relaxed m-0">
                      Every supercar undergoes a strict 150-point diagnostic check before handover to ensure track-ready performance.
                    </p>
                  </div>
                </li>

                <li className="flex gap-4">
                  <div className="flex-shrink-0 w-6 h-6 rounded bg-zinc-900 border border-zinc-800 flex items-center justify-center mt-1">
                    <Compass className="w-3.5 h-3.5 text-zinc-500" />
                  </div>
                  <div>
                    <h4 className="text-xs uppercase tracking-wider font-semibold text-white mb-1">Concierge Delivery</h4>
                    <p className="text-zinc-400 text-xs font-light leading-relaxed m-0">
                      We offer handovers at private jet terminals, yacht harbors, or directly to your hotel suite door.
                    </p>
                  </div>
                </li>

                <li className="flex gap-4">
                  <div className="flex-shrink-0 w-6 h-6 rounded bg-zinc-900 border border-zinc-800 flex items-center justify-center mt-1">
                    <Sparkles className="w-3.5 h-3.5 text-zinc-500" />
                  </div>
                  <div>
                    <h4 className="text-xs uppercase tracking-wider font-semibold text-white mb-1">Curated Registry</h4>
                    <p className="text-zinc-400 text-xs font-light leading-relaxed m-0">
                      Our fleet contains only limited-run hypercars and track-focused performance vehicles.
                    </p>
                  </div>
                </li>
              </ul>
            </div>

            {/* Member Info */}
            <div className="bg-zinc-950 border border-zinc-900 rounded-lg p-6 text-center">
              <span className="text-[10px] uppercase font-mono tracking-widest text-zinc-500 block mb-2">SYSTEM_MEMBERSHIP_STATUS</span>
              <span className="text-xs text-zinc-300 font-light block mb-4">Registry open to select members only. Handovers are synchronized across global hubs.</span>
              <Link to="/fleet" className="inline-block w-full py-3 bg-white text-black font-extrabold text-xs uppercase tracking-wider rounded text-center no-underline hover:bg-zinc-200 transition-colors">
                Explore The Fleet
              </Link>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
