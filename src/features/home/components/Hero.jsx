import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import HeroScene from '../../../components/three/HeroScene';
import { useScrollStore } from '../../../store/useScrollStore';

const EDITORIAL_SECTIONS = [
  {
    title: ["Luxury", "Without", "Compromise"],
    paragraph: "Experience the future placeholder.",
    buttons: [
      { text: "Explore", type: "button" },
      { text: "Reserve", type: "button" }
    ]
  },
  {
    title: ["Engineered", "To", "Perfection"],
    paragraph: "Designed around a high-performance carbon architecture.",
    buttons: [
      { text: "Specs", type: "button" },
      { text: "Compare", type: "button" }
    ]
  },
  {
    title: ["Unmatched", "Chassis", "Dynamics"],
    paragraph: "Aerodynamic stability engineered for maximum cornering speeds.",
    buttons: [
      { text: "Dynamics", type: "button" },
      { text: "Chassis", type: "button" }
    ]
  },
  {
    title: ["Begin", "Your", "Journey"],
    paragraph: "Reserve your Ferrari SF90 Spider custom configuration today.",
    buttons: [
      { text: "Configure", type: "button" },
      { text: "Reserve Now", type: "button" }
    ]
  }
];

export default function Hero() {
  const navigate = useNavigate();
  const setScrollProgress = useScrollStore((state) => state.setScrollProgress);
  const scrollProgress = useScrollStore((state) => state.scrollProgress);
  const containerRef = useRef(null);

  // Bind scroll event listeners to window and update store's target scroll progress
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const totalHeight = rect.height - window.innerHeight;
      if (totalHeight <= 0) return;
      const scrolled = -rect.top;
      const progress = scrolled / totalHeight;
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [setScrollProgress]);

  // Smoothly damp the scrollProgress inside the store on every animation frame
  useEffect(() => {
    let animationFrameId;

    const tick = () => {
      const state = useScrollStore.getState();
      const target = state.targetScrollProgress;
      const current = state.scrollProgress;

      // Smooth interpolation
      const next = current + (target - current) * 0.08;

      if (Math.abs(next - current) > 0.0001) {
        useScrollStore.setState({ scrollProgress: next });
      } else if (current !== target) {
        useScrollStore.setState({ scrollProgress: target });
      }

      animationFrameId = requestAnimationFrame(tick);
    };

    tick();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  // Determine active editorial section
  const activeSection = Math.min(3, Math.floor(scrollProgress * 4));

  return (
    <div 
      ref={containerRef}
      style={{
        position: 'relative',
        width: '100%',
        height: '400vh',
        backgroundColor: '#0a0a0a',
      }}
    >
      {/* Sticky viewport container */}
      <div style={{
        position: 'sticky',
        top: 0,
        width: '100%',
        height: '100vh',
        overflow: 'hidden',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        boxSizing: 'border-box',
        color: '#ffffff'
      }}>
        {/* Layer 1: Canvas layer */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: 1
        }}>
          <HeroScene />
        </div>

        {/* Layer 2: Editorial Column (Grid Column 1) */}
        <div style={{
          position: 'relative',
          zIndex: 2,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'flex-start',
          paddingLeft: '12%',
          paddingRight: '8%',
          boxSizing: 'border-box',
          pointerEvents: 'auto'
        }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSection}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '40px',
                maxWidth: '440px'
              }}
            >
              {/* Group 1: Headline */}
              <h1 style={{ 
                display: 'block', 
                margin: 0,
                fontFamily: '"Outfit", "Inter", -apple-system, sans-serif',
                fontSize: 'clamp(2.5rem, 5.2vw, 4.0rem)',
                fontWeight: '800',
                lineHeight: '1.02',
                letterSpacing: '-0.03em',
                textTransform: 'uppercase'
              }}>
                {EDITORIAL_SECTIONS[activeSection].title.map((line, idx) => (
                  <span key={idx} style={{ display: 'block' }}>{line}</span>
                ))}
              </h1>

              {/* Group 2 & 3: Content Block (Paragraph and CTAs attached) */}
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '28px'
              }}>
                <p style={{ 
                  display: 'block', 
                  margin: 0, 
                  fontFamily: '"Inter", -apple-system, sans-serif',
                  fontSize: '1.02rem', 
                  lineHeight: '1.65', 
                  opacity: 0.7,
                  fontWeight: '350',
                  maxWidth: '380px'
                }}>
                  {EDITORIAL_SECTIONS[activeSection].paragraph}
                </p>

                <div style={{ display: 'flex', gap: '16px', marginTop: '4px' }}>
                  {EDITORIAL_SECTIONS[activeSection].buttons.map((btn, idx) => {
                    const isPrimary = idx === 0;
                    return (
                      <motion.button
                        key={idx}
                        type={btn.type}
                        onClick={() => {
                          const text = btn.text.toLowerCase();
                          if (text === 'explore' || text === 'specs' || text === 'compare' || text === 'dynamics' || text === 'chassis') {
                            navigate('/fleet');
                          } else if (text === 'reserve' || text === 'reserve now' || text === 'configure') {
                            navigate('/booking');
                          }
                        }}
                        whileHover={{ 
                          scale: 1.02, 
                          backgroundColor: isPrimary ? '#e6e6e6' : 'rgba(255, 255, 255, 0.1)',
                          borderColor: isPrimary ? 'transparent' : '#ffffff'
                        }}
                        whileTap={{ scale: 0.98 }}
                        style={{
                          padding: '12px 28px',
                          fontSize: '0.82rem',
                          fontWeight: '600',
                          letterSpacing: '0.08em',
                          textTransform: 'uppercase',
                          backgroundColor: isPrimary ? '#ffffff' : 'transparent',
                          color: isPrimary ? '#000000' : '#ffffff',
                          border: isPrimary ? '1px solid transparent' : '1px solid rgba(255, 255, 255, 0.25)',
                          borderRadius: '4px',
                          cursor: 'pointer',
                          fontFamily: '"Inter", -apple-system, sans-serif',
                          transition: 'border-color 0.2s ease, background-color 0.2s ease',
                          outline: 'none'
                        }}
                      >
                        {btn.text}
                      </motion.button>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Layer 3: Empty Spacer (Grid Column 2) for negative space and Ferrari framing */}
        <div style={{
          position: 'relative',
          zIndex: 2,
          pointerEvents: 'none'
        }} />

        {/* Layer 4: Reserved overlay layer */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: 3,
          pointerEvents: 'none'
        }} />
      </div>
    </div>
  );
}
