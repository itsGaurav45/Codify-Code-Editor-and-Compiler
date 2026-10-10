import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowRight, BookOpen, Code2, Zap, ShieldCheck, Save } from 'lucide-react';
import CodifyLogo from '../components/CodifyLogo';

/* ─── LANGUAGE DATA ───────────────────────────────── */
const COMPILERS = [
  { label: 'Python Compiler', tag: 'PY', lang: 'python', color: '#3572A5' },
  { label: 'JavaScript Compiler', tag: 'JS', lang: 'javascript', color: '#f0db4f' },
  { label: 'Java Compiler', tag: 'JV', lang: 'java', color: '#ED8B00' },
  { label: 'C++ Compiler', tag: 'C++', lang: 'cpp', color: '#f34b7d' },
  { label: 'C Compiler', tag: 'C', lang: 'c', color: '#555555' },
  { label: 'C# Compiler', tag: 'C#', lang: 'csharp', color: '#9B4F96' },
  { label: 'TypeScript Compiler', tag: 'TS', lang: 'typescript', color: '#3178c6' },
  { label: 'Go Compiler', tag: 'GO', lang: 'go', color: '#00ADD8' },
  { label: 'Rust Compiler', tag: 'RS', lang: 'rust', color: '#dea584' },
  { label: 'Kotlin Compiler', tag: 'KT', lang: 'kotlin', color: '#A97BFF' },
  { label: 'Swift Compiler', tag: 'SW', lang: 'swift', color: '#F05138' },
  { label: 'PHP Compiler', tag: 'PHP', lang: 'php', color: '#4F5D95' },
];

const TUTORIALS = [
  { label: 'Learn Python', lang: 'python' },
  { label: 'Learn JavaScript', lang: 'javascript' },
  { label: 'Learn Java', lang: 'java' },
  { label: 'Learn C++', lang: 'cpp' },
  { label: 'Learn C', lang: 'c' },
  { label: 'Learn TypeScript', lang: 'typescript' },
  { label: 'Learn Go', lang: 'go' },
  { label: 'Learn Rust', lang: 'rust' },
  { label: 'Learn Kotlin', lang: 'kotlin' },
  { label: 'Learn Swift', lang: 'swift' },
  { label: 'Learn C#', lang: 'csharp' },
  { label: 'Learn PHP', lang: 'php' },
];

const WHY = [
  {
    icon: Code2,
    title: 'Real Code Execution',
    desc: 'Powered by Judge0 — your code runs on real cloud servers in under 2 seconds with full stdin/stdout support.',
  },
  {
    icon: BookOpen,
    title: 'Step-by-Step Tutorials',
    desc: 'Guided learning paths for every language. Each lesson has runnable code examples you can edit and execute.',
  },
  {
    icon: ShieldCheck,
    title: 'Secure & Always Free',
    desc: 'JWT auth, bcrypt password hashing, private snippets. Core features are free forever — no credit card needed.',
  },
];

/* ─── HERO CODE MOCKUP ───────────────────────────── */
const DEMO_CODE = [
  { n: 1, t: 'keyword', v: 'def ' },
  { n: 1, t: 'fn', v: 'bubble_sort' },
  { n: 1, t: 'plain', v: '(arr):' },
  { n: 2, t: 'keyword', v: '    n = ' },
  { n: 2, t: 'fn', v: 'len' },
  { n: 2, t: 'plain', v: '(arr)' },
  { n: 3, t: 'keyword', v: '    for ' },
  { n: 3, t: 'plain', v: 'i ' },
  { n: 3, t: 'keyword', v: 'in ' },
  { n: 3, t: 'fn', v: 'range' },
  { n: 3, t: 'plain', v: '(n):' },
  { n: 4, t: 'keyword', v: '        for ' },
  { n: 4, t: 'plain', v: 'j ' },
  { n: 4, t: 'keyword', v: 'in ' },
  { n: 4, t: 'fn', v: 'range' },
  { n: 4, t: 'plain', v: '(n-i-1):' },
  { n: 5, t: 'keyword', v: '            if ' },
  { n: 5, t: 'plain', v: 'arr[j] > arr[j+1]:' },
  { n: 6, t: 'plain', v: '                arr[j], arr[j+1] = arr[j+1], arr[j]' },
  { n: 7, t: 'plain', v: '    return arr' },
  { n: 8, t: 'plain', v: '' },
  { n: 9, t: 'plain', v: 'nums = [64, 34, 25, 12, 22, 11, 90]' },
  { n: 10, t: 'fn', v: 'print' },
  { n: 10, t: 'plain', v: '(' },
  { n: 10, t: 'str', v: '"Sorted:"' },
  { n: 10, t: 'plain', v: ', bubble_sort(nums))' },
];

const TOKEN_COLOR = { keyword: '#ff7b72', fn: '#d2a8ff', str: '#a5d6ff', plain: '#c9d1d9' };

function CodeMockup() {
  const lines = [];
  let current = [];
  let lineNum = 1;

  DEMO_CODE.forEach((tok, i) => {
    if (tok.n !== lineNum) {
      lines.push({ num: lineNum, tokens: current });
      current = [];
      lineNum = tok.n;
    }
    current.push(tok);
    if (i === DEMO_CODE.length - 1) lines.push({ num: lineNum, tokens: current });
  });

  return (
    <div style={{
      background: '#161b22',
      border: '1px solid #30363d',
      borderRadius: '12px',
      overflow: 'hidden',
      boxShadow: '0 24px 64px rgba(0,0,0,0.6)',
      fontFamily: "'JetBrains Mono', 'Fira Code', 'Cascadia Code', monospace",
      fontSize: '13px',
      maxWidth: '500px',
      width: '100%',
    }}>
      {/* Title bar */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '10px 16px',
        background: '#0d1117',
        borderBottom: '1px solid #21262d',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{ display: 'flex', gap: '5px' }}>
            <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#ff5f57', display: 'block' }} />
            <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#febc2e', display: 'block' }} />
            <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#28c840', display: 'block' }} />
          </div>
          <span style={{ color: '#8b949e', fontSize: '12px', marginLeft: '8px' }}>main.py</span>
        </div>
        <div style={{
          display: 'flex', alignItems: 'center', gap: '5px',
          background: '#238636', color: '#fff', fontSize: '12px', fontWeight: '600',
          padding: '4px 12px', borderRadius: '6px', cursor: 'pointer',
        }}>
          ▶ Run
        </div>
      </div>

      {/* Code area */}
      <div style={{ padding: '16px', lineHeight: '22px' }}>
        {lines.map(line => (
          <div key={line.num} style={{ display: 'flex', gap: '16px' }}>
            <span style={{ color: '#3d4451', userSelect: 'none', minWidth: '16px', textAlign: 'right', flexShrink: 0 }}>
              {line.num}
            </span>
            <span>
              {line.tokens.map((tok, i) => (
                <span key={i} style={{ color: TOKEN_COLOR[tok.t] }}>{tok.v}</span>
              ))}
            </span>
          </div>
        ))}
      </div>

      {/* Output bar */}
      <div style={{
        background: '#0d1117', borderTop: '1px solid #21262d',
        padding: '10px 16px', display: 'flex', gap: '12px', alignItems: 'center',
      }}>
        <span style={{ color: '#8b949e', fontSize: '11px', fontWeight: '600', letterSpacing: '0.5px' }}>OUTPUT</span>
        <span style={{ color: '#3fb950', fontSize: '13px' }}>Sorted: [11, 12, 22, 25, 34, 64, 90]</span>
      </div>
    </div>
  );
}

/* ─── MAIN COMPONENT ─────────────────────────────── */
export default function LandingPage() {
  const navigate = useNavigate();
  const [hoveredCompiler, setHoveredCompiler] = useState(null);
  const [hoveredTutorial, setHoveredTutorial] = useState(null);

  return (
    <div style={{ minHeight: '100vh', background: '#0d1117', color: '#c9d1d9' }}>

      {/* ── HERO ─────────────────────────────────────── */}
      <section
        className="landing-hero-grid"
        style={{
          padding: '80px 24px 64px',
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '64px',
          alignItems: 'center',
        }}
      >
        {/* Left */}
        <div className="landing-hero-text-wrap">
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '8px',
            padding: '5px 14px', marginBottom: '24px',
            background: 'rgba(37,99,235,0.1)', border: '1px solid rgba(37,99,235,0.3)',
            borderRadius: '20px', fontSize: '13px', fontWeight: '600', color: '#60a5fa',
          }}>
            <span style={{ width: 6, height: 6, background: '#3b82f6', borderRadius: '50%' }} />
            Free Online Code Editor & Compiler
          </div>

          <h1 style={{
            fontSize: 'clamp(28px, 4vw, 48px)',
            fontWeight: '800',
            lineHeight: 1.15,
            letterSpacing: '-1.5px',
            color: '#f0f6fc',
            marginBottom: '20px',
          }}>
            Write, Run & Learn<br />
            <span style={{ color: '#2563eb' }}>Code Online</span> — Free
          </h1>

          <p style={{
            fontSize: '17px', color: '#8b949e', lineHeight: 1.75, marginBottom: '36px', maxWidth: '440px',
          }}>
            Open your browser and start coding. No installation, no sign-up required.
            Compile & run code in <strong style={{ color: '#c9d1d9' }}>20+ programming languages</strong> — instantly.
          </p>

          <div className="landing-hero-buttons" style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <button
              onClick={() => navigate('/editor')}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '8px',
                padding: '13px 26px', background: '#2563eb', color: '#fff',
                border: 'none', borderRadius: '8px', fontSize: '15px', fontWeight: '600',
                cursor: 'pointer', transition: 'background 0.15s',
              }}
              onMouseEnter={e => e.currentTarget.style.background = '#1d4ed8'}
              onMouseLeave={e => e.currentTarget.style.background = '#2563eb'}
            >
              Start Coding Free
            </button>
            <button
              onClick={() => navigate('/tutorials')}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '8px',
                padding: '13px 26px', background: 'transparent', color: '#c9d1d9',
                border: '1px solid #30363d', borderRadius: '8px', fontSize: '15px', fontWeight: '600',
                cursor: 'pointer', transition: 'all 0.15s',
              }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = '#2563eb'; e.currentTarget.style.color = '#60a5fa'; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = '#30363d'; e.currentTarget.style.color = '#c9d1d9'; }}
            >
              <BookOpen size={17} /> Browse Tutorials
            </button>
          </div>
        </div>

        {/* Right — Code Mockup */}
        <div className="code-mockup-container" style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
          <CodeMockup />
        </div>
      </section>

      {/* ── ONLINE COMPILERS ─────────────────────────── */}
      <section style={{ padding: '64px 24px', background: '#161b22', borderTop: '1px solid #21262d', borderBottom: '1px solid #21262d' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '26px', fontWeight: '700', color: '#f0f6fc', marginBottom: '8px', textAlign: 'center' }}>
            Online Compilers
          </h2>
          <p style={{ textAlign: 'center', color: '#8b949e', marginBottom: '40px', fontSize: '15px' }}>
            Run code directly in your browser. No setup. No installation.
          </p>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
            gap: '10px',
          }}>
            {COMPILERS.map(c => (
              <Link
                key={c.lang}
                to={`/editor?lang=${c.lang}`}
                style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  padding: '14px 18px',
                  background: hoveredCompiler === c.lang ? '#1c2128' : '#0d1117',
                  border: `1px solid ${hoveredCompiler === c.lang ? '#2563eb' : '#21262d'}`,
                  borderRadius: '10px',
                  textDecoration: 'none',
                  color: '#c9d1d9',
                  fontSize: '14px',
                  fontWeight: '500',
                  transition: 'all 0.15s ease',
                  transform: hoveredCompiler === c.lang ? 'translateY(-1px)' : 'none',
                  boxShadow: hoveredCompiler === c.lang ? '0 4px 16px rgba(37,99,235,0.12)' : 'none',
                }}
                onMouseEnter={() => setHoveredCompiler(c.lang)}
                onMouseLeave={() => setHoveredCompiler(null)}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <span style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: '11px', fontWeight: '700',
                    padding: '3px 7px', borderRadius: '5px',
                    background: `${c.color}18`,
                    color: c.color,
                    border: `1px solid ${c.color}35`,
                    minWidth: '32px', textAlign: 'center',
                  }}>
                    {c.tag}
                  </span>
                  <span>{c.label}</span>
                </div>
                <ArrowRight size={15} color="#8b949e" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── LEARN TUTORIALS ──────────────────────────── */}
      <section style={{ padding: '72px 24px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <div style={{
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
              width: '44px', height: '44px', borderRadius: '10px',
              background: 'rgba(37,99,235,0.1)', border: '1px solid rgba(37,99,235,0.25)',
              color: '#60a5fa', marginBottom: '16px',
            }}>
              <BookOpen size={22} />
            </div>
            <h2 style={{ fontSize: '28px', fontWeight: '700', color: '#f0f6fc', marginBottom: '10px' }}>
              Learn programming step by step.
            </h2>
            <p style={{ color: '#8b949e', fontSize: '15px', maxWidth: '480px', margin: '0 auto', lineHeight: 1.7 }}>
              Each lesson contains practical runnable code examples you can execute directly in your browser.
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
            gap: '8px',
          }}>
            {TUTORIALS.map(t => (
              <Link
                key={t.lang}
                to="/tutorials"
                style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  padding: '14px 18px',
                  background: hoveredTutorial === t.lang ? '#161b22' : 'transparent',
                  border: `1px solid ${hoveredTutorial === t.lang ? '#30363d' : '#21262d'}`,
                  borderRadius: '8px',
                  textDecoration: 'none',
                  color: hoveredTutorial === t.lang ? '#60a5fa' : '#c9d1d9',
                  fontSize: '14px',
                  fontWeight: '500',
                  transition: 'all 0.15s ease',
                }}
                onMouseEnter={() => setHoveredTutorial(t.lang)}
                onMouseLeave={() => setHoveredTutorial(null)}
              >
                {t.label}
                <ArrowRight size={14} color={hoveredTutorial === t.lang ? '#60a5fa' : '#8b949e'} />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY CODIFY ───────────────────────────────── */}
      <section style={{ padding: '64px 24px', background: '#161b22', borderTop: '1px solid #21262d' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <h2 style={{ textAlign: 'center', fontSize: '26px', fontWeight: '700', color: '#f0f6fc', marginBottom: '48px' }}>
            Why Codify?
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '32px' }}>
            {WHY.map(w => {
              const Icon = w.icon;
              return (
                <div key={w.title} style={{ display: 'flex', gap: '18px', alignItems: 'flex-start' }}>
                  <div style={{
                    width: '42px', height: '42px', flexShrink: 0,
                    borderRadius: '10px',
                    background: 'rgba(37,99,235,0.1)', border: '1px solid rgba(37,99,235,0.25)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: '#60a5fa',
                  }}>
                    <Icon size={20} />
                  </div>
                  <div>
                    <h3 style={{ fontSize: '16px', fontWeight: '700', color: '#f0f6fc', marginBottom: '6px' }}>{w.title}</h3>
                    <p style={{ fontSize: '14px', color: '#8b949e', lineHeight: 1.7 }}>{w.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── FOOTER ───────────────────────────────────── */}
      <footer style={{ background: '#0d1117', borderTop: '1px solid #21262d', padding: '48px 24px 28px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '32px', marginBottom: '40px' }}>
            <div>
              <div style={{ marginBottom: '12px' }}>
                <CodifyLogo size="medium" light={true} linkTo="/" />
              </div>
              <p style={{ fontSize: '13px', color: '#6e7681', lineHeight: 1.7 }}>
                Free online compiler and code editor for everyone.
              </p>
            </div>
            <div>
              <h4 style={{ fontSize: '12px', fontWeight: '700', color: '#8b949e', marginBottom: '12px', letterSpacing: '0.5px', textTransform: 'uppercase' }}>Compilers</h4>
              {['Python', 'JavaScript', 'Java', 'C++', 'Go', 'Rust'].map(l => (
                <Link key={l} to="/editor" style={{ display: 'block', color: '#6e7681', fontSize: '13px', textDecoration: 'none', marginBottom: '7px', transition: 'color 0.15s' }}
                  onMouseEnter={e => e.currentTarget.style.color = '#58a6ff'}
                  onMouseLeave={e => e.currentTarget.style.color = '#6e7681'}
                >Online {l}</Link>
              ))}
            </div>
            <div>
              <h4 style={{ fontSize: '12px', fontWeight: '700', color: '#8b949e', marginBottom: '12px', letterSpacing: '0.5px', textTransform: 'uppercase' }}>Tutorials</h4>
              {['Python', 'JavaScript', 'Java', 'C++', 'TypeScript', 'Rust'].map(l => (
                <Link key={l} to="/tutorials" style={{ display: 'block', color: '#6e7681', fontSize: '13px', textDecoration: 'none', marginBottom: '7px', transition: 'color 0.15s' }}
                  onMouseEnter={e => e.currentTarget.style.color = '#58a6ff'}
                  onMouseLeave={e => e.currentTarget.style.color = '#6e7681'}
                >Learn {l}</Link>
              ))}
            </div>
            <div>
              <h4 style={{ fontSize: '12px', fontWeight: '700', color: '#8b949e', marginBottom: '12px', letterSpacing: '0.5px', textTransform: 'uppercase' }}>Account</h4>
              {[{ label: 'Sign Up Free', to: '/signup' }, { label: 'Sign In', to: '/login' }, { label: 'My Snippets', to: '/dashboard' }].map(l => (
                <Link key={l.label} to={l.to} style={{ display: 'block', color: '#6e7681', fontSize: '13px', textDecoration: 'none', marginBottom: '7px', transition: 'color 0.15s' }}
                  onMouseEnter={e => e.currentTarget.style.color = '#58a6ff'}
                  onMouseLeave={e => e.currentTarget.style.color = '#6e7681'}
                >{l.label}</Link>
              ))}
            </div>
          </div>
          <div style={{ borderTop: '1px solid #21262d', paddingTop: '20px', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px' }}>
            <p style={{ fontSize: '13px', color: '#6e7681' }}>© 2026 Codify. Built with React, Monaco Editor & Judge0.</p>
            <p style={{ fontSize: '13px', color: '#6e7681' }}>Free to use forever. No credit card required.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
