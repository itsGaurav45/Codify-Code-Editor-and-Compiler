import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Terminal, ArrowRight, Play, BookOpen, Star, Zap, Save, Cpu, Laptop, ShieldCheck } from 'lucide-react';
import CodifyLogo from '../components/CodifyLogo';

/* ─── DATA ─────────────────────────────────────── */
const COMPILERS = [
  { label: 'Python', tag: 'PY', lang: 'python' },
  { label: 'JavaScript', tag: 'JS', lang: 'javascript' },
  { label: 'Java', tag: 'JV', lang: 'java' },
  { label: 'C++', tag: 'C++', lang: 'cpp' },
  { label: 'C', tag: 'C', lang: 'c' },
  { label: 'TypeScript', tag: 'TS', lang: 'typescript' },
  { label: 'Go', tag: 'GO', lang: 'go' },
  { label: 'Rust', tag: 'RS', lang: 'rust' },
  { label: 'Kotlin', tag: 'KT', lang: 'kotlin' },
  { label: 'Swift', tag: 'SW', lang: 'swift' },
  { label: 'C#', tag: 'C#', lang: 'csharp' },
  { label: 'PHP', tag: 'PHP', lang: 'php' },
];

const TUTORIALS = [
  { label: 'Python Tutorial', tag: 'PY', lang: 'python', desc: 'Beginner friendly, widely used' },
  { label: 'JavaScript Tutorial', tag: 'JS', lang: 'javascript', desc: 'Web & full-stack development' },
  { label: 'Java Tutorial', tag: 'JV', lang: 'java', desc: 'Enterprise & Android apps' },
  { label: 'C++ Tutorial', tag: 'C++', lang: 'cpp', desc: 'Systems & competitive programming' },
  { label: 'C Tutorial', tag: 'C', lang: 'c', desc: 'Low-level systems programming' },
  { label: 'TypeScript', tag: 'TS', lang: 'typescript', desc: 'Typed superset of JavaScript' },
  { label: 'Go Tutorial', tag: 'GO', lang: 'go', desc: 'Cloud-native & concurrent apps' },
  { label: 'Rust Tutorial', tag: 'RS', lang: 'rust', desc: 'Memory safe systems language' },
];

const FEATURES = [
  { icon: Zap, title: '20+ Languages', desc: 'From Python to Rust — compile and run code in 20+ programming languages instantly in your browser.' },
  { icon: BookOpen, title: 'Structured Tutorials', desc: 'Follow guided learning paths with practical runnable examples built right into every lesson.' },
  { icon: Save, title: 'Save Your Code', desc: 'Sign up free and save unlimited snippets to your personal dashboard. Access from anywhere.' },
  { icon: Cpu, title: 'Real Execution', desc: 'Powered by Judge0 — your code runs on real cloud servers in under 2 seconds with full stdin support.' },
  { icon: Laptop, title: 'Works Everywhere', desc: 'Fully responsive editor that works on desktop, tablet, and mobile without any installation.' },
  { icon: ShieldCheck, title: 'Secure & Private', desc: 'JWT auth, password hashing with bcrypt, and your snippets are always private to your account.' },
];

const STATS = [
  { val: '20+', label: 'Languages Supported' },
  { val: '∞', label: 'Free Forever' },
  { val: '< 2s', label: 'Code Execution' },
  { val: '100%', label: 'Browser-Based' },
];

/* ─── CODE DEMO ──────────────────────────────────── */
const CODE_DEMOS = {
  python: {
    code: `def bubble_sort(arr):
    n = len(arr)
    for i in range(n):
        for j in range(0, n-i-1):
            if arr[j] > arr[j+1]:
                arr[j], arr[j+1] = arr[j+1], arr[j]
    return arr

nums = [64, 34, 25, 12, 22, 11, 90]
print("Sorted:", bubble_sort(nums))`,
    output: 'Sorted: [11, 12, 22, 25, 34, 64, 90]',
  },
  javascript: {
    code: `const fibonacci = (n) => {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
};

const results = Array.from({length: 8}, (_, i) => fibonacci(i));
console.log("Fibonacci:", results);`,
    output: 'Fibonacci: [0, 1, 1, 2, 3, 5, 8, 13]',
  },
  java: {
    code: `public class Main {
  static int factorial(int n) {
    return n <= 1 ? 1 : n * factorial(n - 1);
  }
  public static void main(String[] args) {
    for (int i = 1; i <= 6; i++) {
      System.out.println(i + "! = " + factorial(i));
    }
  }
}`,
    output: '1! = 1\n2! = 2\n3! = 6\n4! = 24\n5! = 120\n6! = 720',
  },
  cpp: {
    code: `#include <iostream>
#include <vector>
using namespace std;

int main() {
    vector<int> primes;
    for (int n = 2; primes.size() < 8; n++) {
        bool isPrime = true;
        for (int i = 2; i * i <= n; i++)
            if (n % i == 0) { isPrime = false; break; }
        if (isPrime) primes.push_back(n);
    }
    for (int p : primes) cout << p << " ";
}`,
    output: '2 3 5 7 11 13 17 19',
  },
};

/* ─── TOKEN COLORS ───────────────────────────────── */
function colorize(code, lang) {
  // Simple syntax highlighting via spans
  const lines = code.split('\n');
  return lines.map((line, i) => (
    <div key={i} style={{ display: 'flex', minHeight: '22px' }}>
      <span style={{ color: '#3d4451', userSelect: 'none', width: '28px', flexShrink: 0, textAlign: 'right', marginRight: '16px', fontSize: '12px' }}>
        {i + 1}
      </span>
      <span style={{ color: '#e6edf3' }}>{line}</span>
    </div>
  ));
}

/* ─── COMPONENT ──────────────────────────────────── */
export default function LandingPage() {
  const navigate = useNavigate();
  const [activeDemo, setActiveDemo] = useState('python');

  return (
    <div style={{ minHeight: '100vh', background: '#0d1117' }}>

      {/* ── HERO ── */}
      <section style={{
        padding: '64px 24px 72px',
        background: 'radial-gradient(ellipse 80% 50% at 50% -10%, rgba(31,111,235,0.18) 0%, transparent 70%)',
        textAlign: 'center',
      }}>
        <div style={{ maxWidth: '780px', margin: '0 auto', animation: 'fadeIn 0.5s ease-out' }}>
          {/* Badge */}
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '8px',
            padding: '6px 16px', marginBottom: '28px',
            background: 'rgba(37,99,235,0.08)', border: '1px solid rgba(37,99,235,0.25)',
            borderRadius: '20px', fontSize: '12px', fontWeight: '600', color: '#60a5fa',
          }}>
            <span style={{ width: '6px', height: '6px', background: '#3b82f6', borderRadius: '50%', boxShadow: '0 0 8px rgba(37,99,235,0.8)' }} />
            Free Online Compilers & Code Editor
          </div>

          <h1 style={{
            fontSize: 'clamp(32px, 6vw, 60px)', fontWeight: '800',
            letterSpacing: '-2px', lineHeight: 1.1, marginBottom: '20px',
            color: '#e6edf3',
          }}>
            The easiest way to{' '}
            <span style={{
              background: 'linear-gradient(135deg, #60a5fa 0%, #2563eb 100%)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
            }}>
              code online
            </span>
          </h1>
          <p style={{
            fontSize: '17px', color: '#8b949e', maxWidth: '560px',
            margin: '0 auto 36px', lineHeight: 1.75,
          }}>
            Open your browser and start coding. No installation, no sign-up required.
            Compile & run code in 20+ programming languages — instantly.
          </p>

          {/* Primary CTAs */}
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '48px' }}>
            <button onClick={() => navigate('/editor')} className="btn-primary"
              style={{ padding: '13px 28px', fontSize: '15px', borderRadius: '8px', gap: '8px' }}>
              <Terminal size={17} /> Start Coding — It's Free
            </button>
            <button onClick={() => navigate('/tutorials')} className="btn-secondary"
              style={{ padding: '13px 28px', fontSize: '15px', borderRadius: '8px', gap: '8px' }}>
              <BookOpen size={17} /> Browse Tutorials
            </button>
          </div>

          {/* Stats */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '40px', flexWrap: 'wrap' }}>
            {STATS.map(s => (
              <div key={s.label} style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '26px', fontWeight: '800', color: '#3b82f6', lineHeight: 1 }}>{s.val}</div>
                <div style={{ fontSize: '12px', color: '#8b949e', marginTop: '4px' }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── LANGUAGE COMPILER CARDS ── */}
      <section style={{ padding: '56px 24px', background: '#0d1117' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2 style={{ textAlign: 'center', fontSize: '28px', fontWeight: '700', marginBottom: '8px', color: '#e6edf3' }}>
            Free Online Compilers
          </h2>
          <p style={{ textAlign: 'center', color: '#8b949e', marginBottom: '40px', fontSize: '15px' }}>
            Run code in your browser. No setup. No installation. No sign-up.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(168px, 1fr))', gap: '12px' }}>
            {COMPILERS.map((c) => (
              <Link
                key={c.lang}
                to={`/editor?lang=${c.lang}`}
                style={{ textDecoration: 'none' }}
              >
                <div style={{
                  padding: '20px 16px', borderRadius: '10px',
                  background: '#161b22', border: '1px solid #21262d',
                  display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px',
                  cursor: 'pointer', transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)', textAlign: 'center',
                }}
                  onMouseEnter={e => {
                    e.currentTarget.style.borderColor = '#2563eb';
                    e.currentTarget.style.background = '#1a2233';
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = '0 8px 24px rgba(37, 99, 235, 0.15)';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.borderColor = '#21262d';
                    e.currentTarget.style.background = '#161b22';
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  <div style={{
                    width: '42px', height: '42px',
                    borderRadius: '8px',
                    background: 'rgba(37, 99, 235, 0.1)',
                    border: '1px solid rgba(37, 99, 235, 0.25)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: '13px', fontWeight: '700',
                    color: '#60a5fa',
                  }}>
                    {c.tag}
                  </div>
                  <span style={{ fontSize: '13px', fontWeight: '600', color: '#e6edf3' }}>
                    {c.label}
                  </span>
                  <span style={{
                    fontSize: '11px', padding: '2px 8px',
                    background: 'rgba(255, 255, 255, 0.05)', color: '#8b949e',
                    borderRadius: '4px', fontWeight: '500',
                    fontFamily: "'JetBrains Mono', monospace",
                  }}>
                    Compiler
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── INTERACTIVE CODE DEMO ── */}
      <section style={{ padding: '56px 24px', background: '#161b22', borderTop: '1px solid #21262d', borderBottom: '1px solid #21262d' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <h2 style={{ textAlign: 'center', fontSize: '28px', fontWeight: '700', marginBottom: '8px', color: '#e6edf3' }}>
            Try it Now
          </h2>
          <p style={{ textAlign: 'center', color: '#8b949e', marginBottom: '32px', fontSize: '15px' }}>
            Select a language and see real code examples with output
          </p>

          {/* Language tabs */}
          <div style={{ display: 'flex', gap: '8px', marginBottom: '20px', justifyContent: 'center', flexWrap: 'wrap' }}>
            {Object.keys(CODE_DEMOS).map(lang => {
              const info = COMPILERS.find(c => c.lang === lang);
              const active = activeDemo === lang;
              return (
                <button key={lang} onClick={() => setActiveDemo(lang)} style={{
                  display: 'flex', alignItems: 'center', gap: '8px',
                  padding: '7px 16px', borderRadius: '8px', cursor: 'pointer',
                  border: `1px solid ${active ? '#2563eb' : '#30363d'}`,
                  background: active ? 'rgba(37, 99, 235, 0.15)' : 'transparent',
                  color: active ? '#60a5fa' : '#8b949e',
                  fontSize: '13px', fontWeight: '600', transition: 'all 0.15s',
                  fontFamily: 'Inter, sans-serif',
                }}>
                  <span style={{
                    fontSize: '11px', fontFamily: "'JetBrains Mono', monospace",
                    padding: '1px 5px', borderRadius: '4px',
                    background: active ? '#2563eb' : 'rgba(255,255,255,0.06)',
                    color: active ? '#fff' : '#8b949e',
                  }}>
                    {info?.tag || lang.toUpperCase()}
                  </span>
                  {info?.label || lang}
                </button>
              );
            })}
          </div>

          {/* Editor mock */}
          <div style={{
            background: '#0d1117', border: '1px solid #30363d', borderRadius: '14px',
            overflow: 'hidden', boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
          }}>
            {/* Title bar */}
            <div style={{
              display: 'flex', alignItems: 'center', gap: '8px',
              padding: '12px 16px', background: '#161b22', borderBottom: '1px solid #21262d',
            }}>
              {['#f85149', '#f0883e', '#3fb950'].map(c => (
                <div key={c} style={{ width: '11px', height: '11px', borderRadius: '50%', background: c }} />
              ))}
              <span style={{ marginLeft: '8px', fontSize: '12px', color: '#6e7681', fontFamily: 'monospace' }}>
                {activeDemo === 'cpp' ? 'main.cpp' : activeDemo === 'java' ? 'Main.java' : activeDemo === 'javascript' ? 'index.js' : 'main.py'}
              </span>
              <button
                onClick={() => navigate(`/editor?lang=${activeDemo}`)}
                style={{
                  marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '6px',
                  padding: '5px 12px', background: '#238636', color: '#fff',
                  border: 'none', borderRadius: '6px', fontSize: '12px',
                  fontWeight: '600', cursor: 'pointer', fontFamily: 'Inter, sans-serif',
                }}
              >
                <Play size={11} fill="#fff" /> Run in Editor
              </button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
              {/* Code */}
              <div style={{ padding: '20px', overflowX: 'auto', borderRight: '1px solid #21262d' }}>
                <pre style={{
                  margin: 0, fontFamily: "'JetBrains Mono', monospace",
                  fontSize: '13px', lineHeight: '22px', color: '#e6edf3',
                }}>
                  {colorize(CODE_DEMOS[activeDemo].code, activeDemo)}
                </pre>
              </div>
              {/* Output */}
              <div style={{ padding: '20px', background: 'rgba(0,0,0,0.2)' }}>
                <div style={{ fontSize: '11px', color: '#3fb950', fontFamily: 'monospace', marginBottom: '12px', letterSpacing: '1px' }}>
                  ▶ OUTPUT
                </div>
                <pre style={{
                  margin: 0, fontFamily: "'JetBrains Mono', monospace",
                  fontSize: '13px', lineHeight: '22px', color: '#3fb950',
                }}>
                  {CODE_DEMOS[activeDemo].output}
                </pre>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── TUTORIALS SECTION ── */}
      <section style={{ padding: '56px 24px', background: '#0d1117' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '40px', flexWrap: 'wrap', gap: '12px' }}>
            <div>
              <h2 style={{ fontSize: '28px', fontWeight: '700', color: '#e6edf3', marginBottom: '6px' }}>
                Learn Programming
              </h2>
              <p style={{ color: '#8b949e', fontSize: '15px' }}>
                Structured tutorials with runnable examples for every lesson
              </p>
            </div>
            <Link to="/tutorials" style={{
              display: 'flex', alignItems: 'center', gap: '6px',
              color: '#58a6ff', textDecoration: 'none', fontSize: '14px', fontWeight: '600',
            }}>
              View All Tutorials <ArrowRight size={14} />
            </Link>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '16px' }}>
            {TUTORIALS.map((t) => (
              <Link key={t.lang} to="/tutorials" style={{ textDecoration: 'none' }}>
                <div style={{
                  padding: '22px', borderRadius: '12px',
                  background: '#161b22', border: '1px solid #21262d',
                  transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)', cursor: 'pointer',
                }}
                  onMouseEnter={e => {
                    e.currentTarget.style.borderColor = '#2563eb';
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = '0 8px 24px rgba(37, 99, 235, 0.12)';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.borderColor = '#21262d';
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                    <div style={{
                      width: '36px', height: '36px',
                      borderRadius: '8px',
                      background: 'rgba(37, 99, 235, 0.1)',
                      border: '1px solid rgba(37, 99, 235, 0.25)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: '12px', fontWeight: '700',
                      color: '#60a5fa',
                    }}>
                      {t.tag}
                    </div>
                    <div>
                      <div style={{ fontSize: '15px', fontWeight: '700', color: '#e6edf3' }}>{t.label}</div>
                      <div style={{ fontSize: '12px', color: '#8b949e', marginTop: '2px' }}>{t.desc}</div>
                    </div>
                  </div>
                  <div style={{
                    display: 'flex', alignItems: 'center', gap: '6px',
                    fontSize: '12px', color: '#60a5fa', fontWeight: '600',
                  }}>
                    <Play size={11} fill="#60a5fa" /> Start Learning →
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURES GRID ── */}
      <section style={{ padding: '56px 24px', background: '#161b22', borderTop: '1px solid #21262d', borderBottom: '1px solid #21262d' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <h2 style={{ textAlign: 'center', fontSize: '28px', fontWeight: '700', marginBottom: '8px', color: '#e6edf3' }}>
            Why Choose Codify?
          </h2>
          <p style={{ textAlign: 'center', color: '#8b949e', marginBottom: '48px', fontSize: '15px' }}>
            Everything you need to write, learn, and share code
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
            {FEATURES.map(f => {
              const IconComp = f.icon;
              return (
                <div key={f.title} style={{
                  padding: '24px', background: '#0d1117', border: '1px solid #21262d',
                  borderRadius: '12px', transition: 'all 0.2s',
                }}
                  onMouseEnter={e => {
                    e.currentTarget.style.borderColor = '#2563eb';
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = '0 8px 24px rgba(37, 99, 235, 0.1)';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.borderColor = '#21262d';
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  <div style={{
                    width: '42px', height: '42px',
                    borderRadius: '10px',
                    background: 'rgba(37, 99, 235, 0.1)',
                    border: '1px solid rgba(37, 99, 235, 0.25)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    marginBottom: '16px',
                    color: '#60a5fa',
                  }}>
                    <IconComp size={20} />
                  </div>
                  <h3 style={{ fontSize: '16px', fontWeight: '700', color: '#e6edf3', marginBottom: '8px' }}>{f.title}</h3>
                  <p style={{ fontSize: '14px', color: '#8b949e', lineHeight: 1.7 }}>{f.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ── */}
      <section style={{ padding: '72px 24px', textAlign: 'center', background: '#0d1117' }}>
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
          <div style={{
            width: '56px', height: '56px',
            borderRadius: '14px',
            background: 'rgba(37, 99, 235, 0.1)',
            border: '1px solid rgba(37, 99, 235, 0.25)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            margin: '0 auto 20px',
            color: '#60a5fa',
            boxShadow: '0 8px 24px rgba(37, 99, 235, 0.15)',
          }}>
            <Terminal size={28} />
          </div>
          <h2 style={{ fontSize: '32px', fontWeight: '800', letterSpacing: '-1px', marginBottom: '12px', color: '#e6edf3' }}>
            Start Coding Today
          </h2>
          <p style={{ color: '#8b949e', marginBottom: '32px', fontSize: '16px', lineHeight: 1.7 }}>
            No installation. No setup. Just open your browser and write code.<br />
            Trusted by developers learning at all levels.
          </p>
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button onClick={() => navigate('/editor')} className="btn-primary"
              style={{ padding: '14px 32px', fontSize: '16px', borderRadius: '8px' }}>
              <Terminal size={18} /> Open Code Editor
            </button>
            <button onClick={() => navigate('/signup')} className="btn-secondary"
              style={{ padding: '14px 32px', fontSize: '16px', borderRadius: '8px' }}>
              <Star size={16} /> Create Free Account
            </button>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{
        background: '#161b22', borderTop: '1px solid #21262d', padding: '48px 24px 24px',
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '32px', marginBottom: '40px' }}>
            {/* Brand */}
            <div>
              <div style={{ marginBottom: '12px' }}>
                <CodifyLogo size="medium" light={true} />
              </div>
              <p style={{ fontSize: '13px', color: '#6e7681', lineHeight: 1.7 }}>
                Free online compiler and code editor for everyone.
              </p>
            </div>

            {/* Compilers */}
            <div>
              <h4 style={{ fontSize: '13px', fontWeight: '700', color: '#8b949e', marginBottom: '12px', letterSpacing: '0.5px', textTransform: 'uppercase' }}>Online Compilers</h4>
              {['Python', 'JavaScript', 'Java', 'C++', 'C', 'Go'].map(l => (
                <Link key={l} to="/editor" style={{ display: 'block', color: '#6e7681', fontSize: '13px', textDecoration: 'none', marginBottom: '7px', transition: 'color 0.15s' }}
                  onMouseEnter={e => e.currentTarget.style.color = '#58a6ff'}
                  onMouseLeave={e => e.currentTarget.style.color = '#6e7681'}
                >
                  Online {l}
                </Link>
              ))}
            </div>

            {/* Tutorials */}
            <div>
              <h4 style={{ fontSize: '13px', fontWeight: '700', color: '#8b949e', marginBottom: '12px', letterSpacing: '0.5px', textTransform: 'uppercase' }}>Tutorials</h4>
              {['Python', 'JavaScript', 'Java', 'C++', 'TypeScript', 'Rust'].map(l => (
                <Link key={l} to="/tutorials" style={{ display: 'block', color: '#6e7681', fontSize: '13px', textDecoration: 'none', marginBottom: '7px', transition: 'color 0.15s' }}
                  onMouseEnter={e => e.currentTarget.style.color = '#58a6ff'}
                  onMouseLeave={e => e.currentTarget.style.color = '#6e7681'}
                >
                  Learn {l}
                </Link>
              ))}
            </div>

            {/* Account */}
            <div>
              <h4 style={{ fontSize: '13px', fontWeight: '700', color: '#8b949e', marginBottom: '12px', letterSpacing: '0.5px', textTransform: 'uppercase' }}>Account</h4>
              {[{ label: 'Sign Up Free', to: '/signup' }, { label: 'Sign In', to: '/login' }, { label: 'My Snippets', to: '/dashboard' }].map(l => (
                <Link key={l.label} to={l.to} style={{ display: 'block', color: '#6e7681', fontSize: '13px', textDecoration: 'none', marginBottom: '7px', transition: 'color 0.15s' }}
                  onMouseEnter={e => e.currentTarget.style.color = '#58a6ff'}
                  onMouseLeave={e => e.currentTarget.style.color = '#6e7681'}
                >
                  {l.label}
                </Link>
              ))}
            </div>
          </div>

          <div style={{ borderTop: '1px solid #21262d', paddingTop: '20px', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '10px' }}>
            <p style={{ fontSize: '13px', color: '#6e7681' }}>
              © 2024 Codify. Built with React, Monaco Editor & Judge0.
            </p>
            <p style={{ fontSize: '13px', color: '#6e7681' }}>
              Free to use forever. No credit card required.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}


