import { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Search, ChevronDown, Terminal, BookOpen, LogOut, User, X } from 'lucide-react';
import CodifyLogo from './CodifyLogo';
import { LANGUAGES } from '../utils/constants';

const COMPILERS = [
  { label: 'Python', lang: 'python', tag: 'PY', color: '#3572A5' },
  { label: 'JavaScript', lang: 'javascript', tag: 'JS', color: '#eab308' },
  { label: 'Java', lang: 'java', tag: 'JV', color: '#b07219' },
  { label: 'C++', lang: 'cpp', tag: 'C++', color: '#f34b7d' },
  { label: 'C', lang: 'c', tag: 'C', color: '#6e7681' },
  { label: 'TypeScript', lang: 'typescript', tag: 'TS', color: '#3178c6' },
  { label: 'Go', lang: 'go', tag: 'GO', color: '#00ADD8' },
  { label: 'Rust', lang: 'rust', tag: 'RS', color: '#dea584' },
  { label: 'Kotlin', lang: 'kotlin', tag: 'KT', color: '#A97BFF' },
  { label: 'Swift', lang: 'swift', tag: 'SW', color: '#F05138' },
  { label: 'C#', lang: 'csharp', tag: 'C#', color: '#9B4F96' },
  { label: 'PHP', lang: 'php', tag: 'PHP', color: '#4F5D95' },
];

const POPULAR_TUTORIALS = [
  { title: 'Learn Python', path: '/tutorials', lang: 'python', desc: 'Variables, loops, functions, lists' },
  { title: 'Learn JavaScript', path: '/tutorials', lang: 'javascript', desc: 'Modern ES6, arrays, arrow functions' },
  { title: 'Learn Java', path: '/tutorials', lang: 'java', desc: 'Classes, OOP, methods, loops' },
  { title: 'Learn C++', path: '/tutorials', lang: 'cpp', desc: 'Syntax, pointers, memory, vectors' },
  { title: 'Learn C', path: '/tutorials', lang: 'c', desc: 'Variables, loops, pointers, arrays' },
  { title: 'Learn TypeScript', path: '/tutorials', lang: 'typescript', desc: 'Types, interfaces, functions' },
  { title: 'Learn Go', path: '/tutorials', lang: 'go', desc: 'Packages, slices, concurrency' },
  { title: 'Learn Rust', path: '/tutorials', lang: 'rust', desc: 'Ownership, safety, vectors' },
];

function useDropdown() {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);
  return { open, setOpen, ref };
}

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const compilersDropdown = useDropdown();
  const tutorialsDropdown = useDropdown();
  const userDropdown = useDropdown();

  // Search state
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const searchRef = useRef(null);

  useEffect(() => {
    const handler = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setSearchOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  // Filtered search results
  const filteredCompilers = LANGUAGES.filter((l) =>
    l.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
    l.id.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const filteredTutorials = POPULAR_TUTORIALS.filter((t) =>
    t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    t.desc.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <header style={{
      background: '#0d1117',
      borderBottom: '1px solid #21262d',
      position: 'sticky',
      top: 0,
      zIndex: 100,
      boxShadow: '0 1px 0 rgba(255,255,255,0.04)',
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    }}>
      <div style={{
        maxWidth: '1360px',
        margin: '0 auto',
        padding: '0 24px',
        height: '66px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '20px',
      }}>
        {/* Left Side: Brand Logo + Nav Items + Search */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '28px', flex: 1 }}>
          {/* Codify Brand Logo */}
          <CodifyLogo size="medium" light={true} />

          {/* Nav Item: Online Compilers */}
          <div ref={compilersDropdown.ref} style={{ position: 'relative' }}>
            <button
              onClick={() => compilersDropdown.setOpen(!compilersDropdown.open)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '5px',
                padding: '8px 12px',
                background: 'transparent',
                border: 'none',
                color: compilersDropdown.open ? '#60a5fa' : '#c9d1d9',
                fontSize: '15px',
                fontWeight: '500',
                cursor: 'pointer',
                borderRadius: '6px',
                transition: 'color 0.15s ease',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#60a5fa')}
              onMouseLeave={(e) => {
                if (!compilersDropdown.open) e.currentTarget.style.color = '#c9d1d9';
              }}
            >
              <span>Online Compilers</span>
              <ChevronDown
                size={15}
                color={compilersDropdown.open ? '#60a5fa' : '#8b949e'}
                style={{
                  transform: compilersDropdown.open ? 'rotate(180deg)' : 'none',
                  transition: 'transform 0.2s ease',
                }}
              />
            </button>

            {/* Dropdown Menu */}
            {compilersDropdown.open && (
              <div
                onClick={() => compilersDropdown.setOpen(false)}
                style={{
                  position: 'absolute',
                  top: 'calc(100% + 12px)',
                  left: 0,
                  background: '#161b22',
                  border: '1px solid #30363d',
                  borderRadius: '14px',
                  boxShadow: '0 16px 40px rgba(0,0,0,0.5)',
                  minWidth: '580px',
                  zIndex: 200,
                  overflow: 'hidden',
                  animation: 'fadeIn 0.15s ease-out',
                }}
              >
                <div style={{ padding: '18px 24px 12px', borderBottom: '1px solid #21262d' }}>
                  <p style={{
                    fontSize: '11px',
                    fontWeight: '700',
                    color: '#8b949e',
                    letterSpacing: '1px',
                    marginBottom: '14px',
                  }}>
                    POPULAR COMPILERS
                  </p>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '6px' }}>
                    {COMPILERS.map((c) => (
                      <Link
                        key={c.lang}
                        to={`/editor?lang=${c.lang}`}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '10px',
                          padding: '9px 12px',
                          borderRadius: '8px',
                          textDecoration: 'none',
                          color: '#c9d1d9',
                          fontSize: '14px',
                          fontWeight: '500',
                          transition: 'all 0.15s',
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = 'rgba(37,99,235,0.1)';
                          e.currentTarget.style.color = '#60a5fa';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = 'transparent';
                          e.currentTarget.style.color = '#c9d1d9';
                        }}
                      >
                        <span style={{
                          fontFamily: "'JetBrains Mono', monospace",
                          fontSize: '11px',
                          fontWeight: 700,
                          padding: '2px 6px',
                          borderRadius: '4px',
                          background: 'rgba(37, 99, 235, 0.08)',
                          color: '#2563eb',
                          border: '1px solid rgba(37, 99, 235, 0.2)',
                          minWidth: '28px',
                          textAlign: 'center',
                        }}>
                          {c.tag}
                        </span>
                        <span>{c.label}</span>
                      </Link>
                    ))}
                  </div>
                </div>

                <div style={{
                  padding: '12px 24px',
                  background: '#0d1117',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}>
                  <span style={{ fontSize: '13px', color: '#8b949e' }}>
                    Run 14+ languages directly in browser
                  </span>
                  <Link
                    to="/editor"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                      fontSize: '13px',
                      fontWeight: '600',
                      color: '#2563eb',
                      textDecoration: 'none',
                    }}
                  >
                    <Terminal size={14} /> Open Full IDE →
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* Nav Item: Tutorials */}
          <div ref={tutorialsDropdown.ref} style={{ position: 'relative' }}>
            <button
              onClick={() => tutorialsDropdown.setOpen(!tutorialsDropdown.open)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '5px',
                padding: '8px 12px',
                background: 'transparent',
                border: 'none',
                color: tutorialsDropdown.open ? '#60a5fa' : '#c9d1d9',
                fontSize: '15px',
                fontWeight: '500',
                cursor: 'pointer',
                borderRadius: '6px',
                transition: 'color 0.15s ease',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#60a5fa')}
              onMouseLeave={(e) => {
                if (!tutorialsDropdown.open) e.currentTarget.style.color = '#c9d1d9';
              }}
            >
              <span>Tutorials</span>
              <ChevronDown
                size={15}
                color={tutorialsDropdown.open ? '#60a5fa' : '#8b949e'}
                style={{
                  transform: tutorialsDropdown.open ? 'rotate(180deg)' : 'none',
                  transition: 'transform 0.2s ease',
                }}
              />
            </button>

            {/* Dropdown Menu */}
            {tutorialsDropdown.open && (
              <div
                onClick={() => tutorialsDropdown.setOpen(false)}
                style={{
                  position: 'absolute',
                  top: 'calc(100% + 12px)',
                  left: 0,
                  background: '#161b22',
                  border: '1px solid #30363d',
                  borderRadius: '14px',
                  boxShadow: '0 16px 40px rgba(0,0,0,0.5)',
                  minWidth: '520px',
                  zIndex: 200,
                  overflow: 'hidden',
                  animation: 'fadeIn 0.15s ease-out',
                }}
              >
                <div style={{ padding: '18px 24px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '18px' }}>
                  <div>
                    <p style={{
                      fontSize: '11px',
                      fontWeight: '700',
                      color: '#8b949e',
                      letterSpacing: '1px',
                      marginBottom: '12px',
                    }}>
                      POPULAR TUTORIALS
                    </p>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                      {POPULAR_TUTORIALS.slice(0, 4).map((t) => (
                        <Link
                          key={t.title}
                          to={t.path}
                          style={{
                            padding: '8px 10px',
                            borderRadius: '6px',
                            textDecoration: 'none',
                            color: '#c9d1d9',
                            fontSize: '14px',
                            fontWeight: '500',
                            transition: 'all 0.15s',
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.background = 'rgba(37,99,235,0.1)';
                            e.currentTarget.style.color = '#60a5fa';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.background = 'transparent';
                            e.currentTarget.style.color = '#c9d1d9';
                          }}
                        >
                          {t.title}
                        </Link>
                      ))}
                    </div>
                  </div>

                  <div>
                    <p style={{
                      fontSize: '11px',
                      fontWeight: '700',
                      color: '#8b949e',
                      letterSpacing: '1px',
                      marginBottom: '12px',
                    }}>
                      MORE TRACKS
                    </p>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                      {POPULAR_TUTORIALS.slice(4).map((t) => (
                        <Link
                          key={t.title}
                          to={t.path}
                          style={{
                            padding: '8px 10px',
                            borderRadius: '6px',
                            textDecoration: 'none',
                            color: '#c9d1d9',
                            fontSize: '14px',
                            fontWeight: '500',
                            transition: 'all 0.15s',
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.background = 'rgba(37,99,235,0.1)';
                            e.currentTarget.style.color = '#60a5fa';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.background = 'transparent';
                            e.currentTarget.style.color = '#c9d1d9';
                          }}
                        >
                          {t.title}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>

                <div style={{
                  padding: '12px 24px',
                  background: '#0d1117',
                  borderTop: '1px solid #21262d',
                }}>
                  <Link
                    to="/tutorials"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                      fontSize: '13px',
                      fontWeight: '600',
                      color: '#2563eb',
                      textDecoration: 'none',
                    }}
                  >
                    <BookOpen size={14} /> View All Tutorials & Guides →
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* Nav Item: Practice / Challenges */}
          <Link
            to="/challenges"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '8px 12px',
              textDecoration: 'none',
              color: '#25265e',
              fontSize: '15px',
              fontWeight: '500',
              borderRadius: '6px',
              transition: 'color 0.15s ease',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = '#2563eb')}
            onMouseLeave={(e) => (e.currentTarget.style.color = '#25265e')}
          >
            <span>Practice</span>
            <span style={{
              fontSize: '10px',
              fontWeight: '700',
              background: 'rgba(37, 99, 235, 0.1)',
              color: '#2563eb',
              padding: '1px 6px',
              borderRadius: '10px',
            }}>
              NEW
            </span>
          </Link>

          {/* Programiz-style Search Bar */}
          <div ref={searchRef} style={{ position: 'relative', flex: 1, maxWidth: '380px' }}>
            <div
              onClick={() => setSearchOpen(true)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                padding: '9px 16px',
                background: '#161b22',
                border: '1px solid #30363d',
                borderRadius: '8px',
                cursor: 'text',
                transition: 'all 0.2s ease',
                boxShadow: searchOpen ? '0 0 0 3px rgba(37,99,235,0.15)' : 'none',
                borderColor: searchOpen ? '#2563eb' : '#30363d',
              }}
            >
              <Search size={18} color="#6b7280" />
              <input
                type="text"
                value={searchQuery}
                onFocus={() => setSearchOpen(true)}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setSearchOpen(true);
                }}
                placeholder="Search tutorials & examples"
                style={{
                  border: 'none',
                  outline: 'none',
                  background: 'transparent',
                  color: '#c9d1d9',
                  fontSize: '14px',
                  width: '100%',
                  fontFamily: 'inherit',
                }}
              />
              {searchQuery && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setSearchQuery('');
                  }}
                  style={{
                    background: 'none',
                    border: 'none',
                    padding: 0,
                    cursor: 'pointer',
                    color: '#9ca3af',
                    display: 'flex',
                  }}
                >
                  <X size={15} />
                </button>
              )}
            </div>

            {/* Live Search Modal/Dropdown */}
            {searchOpen && (
              <div style={{
                position: 'absolute',
                top: 'calc(100% + 8px)',
                left: 0,
                right: 0,
                background: '#161b22',
                border: '1px solid #30363d',
                borderRadius: '12px',
                boxShadow: '0 16px 36px rgba(0,0,0,0.5)',
                zIndex: 300,
                maxHeight: '380px',
                overflowY: 'auto',
                padding: '12px',
              }}>
                <div style={{ marginBottom: '10px' }}>
                  <p style={{ fontSize: '11px', fontWeight: '700', color: '#8b949e', letterSpacing: '0.5px', padding: '4px 8px' }}>
                    ONLINE COMPILERS
                  </p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                    {filteredCompilers.slice(0, 5).map((l) => (
                      <Link
                        key={l.id}
                        to={`/editor?lang=${l.id}`}
                        onClick={() => setSearchOpen(false)}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '10px',
                          padding: '8px 10px',
                          borderRadius: '6px',
                          textDecoration: 'none',
                          color: '#c9d1d9',
                          fontSize: '13px',
                          transition: 'background 0.15s',
                        }}
                        onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(37,99,235,0.1)')}
                        onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
                      >
                        <span style={{
                          fontFamily: "'JetBrains Mono', monospace",
                          fontSize: '11px',
                          fontWeight: 700,
                          padding: '2px 6px',
                          borderRadius: '4px',
                          background: 'rgba(37, 99, 235, 0.08)',
                          color: '#2563eb',
                          border: '1px solid rgba(37, 99, 235, 0.2)',
                          minWidth: '28px',
                          textAlign: 'center',
                        }}>
                          {l.tag}
                        </span>
                        <span style={{ fontWeight: '500' }}>Online {l.label} Compiler</span>
                      </Link>
                    ))}
                  </div>
                </div>

                <div>
                  <p style={{ fontSize: '11px', fontWeight: '700', color: '#8b949e', letterSpacing: '0.5px', padding: '4px 8px' }}>
                    TUTORIALS & GUIDES
                  </p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                    {filteredTutorials.slice(0, 4).map((t) => (
                      <Link
                        key={t.title}
                        to={t.path}
                        onClick={() => setSearchOpen(false)}
                        style={{
                          display: 'flex',
                          flexDirection: 'column',
                          gap: '2px',
                          padding: '8px 10px',
                          borderRadius: '6px',
                          textDecoration: 'none',
                          color: '#c9d1d9',
                          fontSize: '13px',
                          transition: 'background 0.15s',
                        }}
                        onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(37,99,235,0.1)')}
                        onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
                      >
                        <span style={{ fontWeight: '600', color: '#2563eb' }}>{t.title}</span>
                        <span style={{ fontSize: '12px', color: '#64748b' }}>{t.desc}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Side: Action CTA / User Profile */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px', flexShrink: 0 }}>
          {user ? (
            <div ref={userDropdown.ref} style={{ position: 'relative' }}>
              <button
                onClick={() => userDropdown.setOpen(!userDropdown.open)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '5px 12px 5px 6px',
                  background: '#161b22',
                  border: '1px solid #30363d',
                  borderRadius: '20px',
                  cursor: 'pointer',
                  color: '#c9d1d9',
                  fontSize: '13px',
                  fontWeight: '600',
                  transition: 'all 0.15s',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.borderColor = '#2563eb')}
                onMouseLeave={(e) => (e.currentTarget.style.borderColor = '#30363d')}
              >
                <div style={{
                  width: '28px',
                  height: '28px',
                  background: 'linear-gradient(135deg, #2563eb, #3b82f6)',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '13px',
                  fontWeight: '700',
                  color: '#fff',
                }}>
                  {user.name[0].toUpperCase()}
                </div>
                <span>{user.name.split(' ')[0]}</span>
                <ChevronDown size={14} color="#64748b" />
              </button>

              {userDropdown.open && (
                <div style={{
                  position: 'absolute',
                  top: 'calc(100% + 8px)',
                  right: 0,
                  background: '#161b22',
                  border: '1px solid #30363d',
                  borderRadius: '12px',
                  boxShadow: '0 12px 32px rgba(0,0,0,0.5)',
                  minWidth: '200px',
                  zIndex: 200,
                  overflow: 'hidden',
                  animation: 'fadeIn 0.15s ease-out',
                }}
                  onClick={() => userDropdown.setOpen(false)}
                >
                  <div style={{ padding: '14px', borderBottom: '1px solid #21262d' }}>
                    <div style={{ fontSize: '14px', fontWeight: '600', color: '#e6edf3' }}>{user.name}</div>
                    <div style={{ fontSize: '12px', color: '#8b949e' }}>{user.email}</div>
                  </div>
                  <Link
                    to="/dashboard"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                      padding: '10px 14px',
                      textDecoration: 'none',
                      color: '#c9d1d9',
                      fontSize: '13px',
                      transition: 'background 0.15s',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(37,99,235,0.1)')}
                    onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
                  >
                    <User size={15} /> My Snippets
                  </Link>
                  <button
                    onClick={handleLogout}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                      width: '100%',
                      padding: '10px 14px',
                      background: 'none',
                      border: 'none',
                      color: '#dc2626',
                      fontSize: '13px',
                      cursor: 'pointer',
                      textAlign: 'left',
                      transition: 'background 0.15s',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(220,38,38,0.1)')}
                    onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
                  >
                    <LogOut size={15} /> Sign Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Link
                to="/login"
                style={{
                  padding: '8px 16px',
                  color: '#c9d1d9',
                  textDecoration: 'none',
                  fontSize: '14px',
                  fontWeight: '600',
                  borderRadius: '6px',
                  transition: 'color 0.15s',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = '#60a5fa')}
                onMouseLeave={(e) => (e.currentTarget.style.color = '#c9d1d9')}
              >
                Sign In
              </Link>
              <Link
                to="/editor"
                style={{
                  padding: '9px 18px',
                  background: '#2563eb',
                  color: '#ffffff',
                  textDecoration: 'none',
                  fontSize: '14px',
                  fontWeight: '600',
                  borderRadius: '8px',
                  boxShadow: '0 2px 8px rgba(37,99,235,0.25)',
                  transition: 'background 0.15s',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = '#1d4ed8')}
                onMouseLeave={(e) => (e.currentTarget.style.background = '#2563eb')}
              >
                Start Coding
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
