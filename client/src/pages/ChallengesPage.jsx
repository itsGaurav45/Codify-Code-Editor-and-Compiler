import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Trophy, Code2, ArrowRight, Search, CheckCircle2, Sparkles, Filter } from 'lucide-react';
import { CHALLENGES } from '../utils/challengesData';

export default function ChallengesPage() {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('python');

  const categories = ['All', 'Arrays', 'Strings', 'Algorithms', 'Math'];

  const filteredChallenges = CHALLENGES.filter((ch) => {
    const matchesCategory = selectedCategory === 'All' || ch.category === selectedCategory;
    const matchesSearch =
      ch.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ch.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleSolve = (challenge) => {
    // Navigate to editor with the challenge's starter code
    const starter = challenge.starterCode[selectedLanguage] || challenge.starterCode['python'];
    navigate('/editor', {
      state: {
        code: starter,
        language: selectedLanguage,
        challengeTitle: challenge.title,
      },
    });
  };

  return (
    <div style={{ minHeight: 'calc(100vh - 66px)', background: '#0d1117', color: '#e6edf3', padding: '40px 24px' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        
        {/* Hero Header */}
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '6px 16px',
            background: 'rgba(234, 179, 8, 0.1)',
            border: '1px solid rgba(234, 179, 8, 0.25)',
            borderRadius: '20px',
            color: '#eab308',
            fontSize: '13px',
            fontWeight: '600',
            marginBottom: '16px',
          }}>
            <Trophy size={16} /> Interactive Practice
          </div>
          <h1 style={{ fontSize: '36px', fontWeight: '800', letterSpacing: '-1px', marginBottom: '12px' }}>
            Coding Challenges & Interview Practice
          </h1>
          <p style={{ color: '#8b949e', fontSize: '16px', maxWidth: '640px', margin: '0 auto 24px', lineHeight: 1.6 }}>
            Solve hand-picked programming problems, test your logic, and get instant explanations with Codify AI.
          </p>

          {/* Language selector for challenges */}
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: '#161b22', padding: '6px 12px', borderRadius: '10px', border: '1px solid #30363d' }}>
            <span style={{ fontSize: '13px', color: '#8b949e', fontWeight: '500' }}>Choose language to solve:</span>
            {[
              { id: 'python', label: 'Python', tag: 'PY' },
              { id: 'javascript', label: 'JavaScript', tag: 'JS' },
              { id: 'cpp', label: 'C++', tag: 'C++' },
              { id: 'java', label: 'Java', tag: 'JV' },
            ].map((lang) => (
              <button
                key={lang.id}
                onClick={() => setSelectedLanguage(lang.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '5px 12px',
                  borderRadius: '6px',
                  border: selectedLanguage === lang.id ? '1px solid #2563eb' : '1px solid transparent',
                  background: selectedLanguage === lang.id ? 'rgba(37, 99, 235, 0.15)' : 'transparent',
                  color: selectedLanguage === lang.id ? '#60a5fa' : '#c9d1d9',
                  fontSize: '13px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.15s',
                }}
              >
                <span style={{
                  fontSize: '11px',
                  fontFamily: "'JetBrains Mono', monospace",
                  padding: '1px 5px',
                  borderRadius: '4px',
                  background: selectedLanguage === lang.id ? '#2563eb' : 'rgba(255,255,255,0.06)',
                  color: selectedLanguage === lang.id ? '#ffffff' : '#8b949e',
                }}>
                  {lang.tag}
                </span>
                {lang.label}
              </button>
            ))}
          </div>
        </div>

        {/* Filter Bar & Search */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '16px',
          marginBottom: '28px',
          flexWrap: 'wrap',
        }}>
          {/* Categories */}
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                style={{
                  padding: '8px 16px',
                  borderRadius: '8px',
                  fontSize: '13px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  border: `1px solid ${selectedCategory === cat ? '#2563eb' : '#30363d'}`,
                  background: selectedCategory === cat ? 'rgba(37,99,235,0.15)' : '#161b22',
                  color: selectedCategory === cat ? '#60a5fa' : '#8b949e',
                  transition: 'all 0.15s',
                }}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Bar */}
          <div style={{ position: 'relative', width: '280px' }}>
            <Search size={15} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#6e7681' }} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search challenges..."
              style={{
                width: '100%',
                padding: '9px 14px 9px 36px',
                background: '#161b22',
                border: '1px solid #30363d',
                borderRadius: '8px',
                color: '#e6edf3',
                fontSize: '13px',
                outline: 'none',
              }}
            />
          </div>
        </div>

        {/* Challenge Cards Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '20px' }}>
          {filteredChallenges.map((ch) => {
            const isEasy = ch.difficulty === 'Easy';
            return (
              <div
                key={ch.id}
                style={{
                  background: '#161b22',
                  border: '1px solid #30363d',
                  borderRadius: '14px',
                  padding: '24px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  transition: 'all 0.2s',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = '#58a6ff';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = '#30363d';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                <div>
                  {/* Top tags row */}
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
                    <span style={{
                      fontSize: '11px',
                      fontWeight: '700',
                      padding: '3px 10px',
                      borderRadius: '20px',
                      background: isEasy ? 'rgba(63, 185, 80, 0.15)' : 'rgba(234, 179, 8, 0.15)',
                      color: isEasy ? '#3fb950' : '#eab308',
                      border: `1px solid ${isEasy ? 'rgba(63, 185, 80, 0.3)' : 'rgba(234, 179, 8, 0.3)'}`,
                    }}>
                      {ch.difficulty}
                    </span>
                    <span style={{ fontSize: '12px', color: '#8b949e', fontWeight: '500' }}>
                      {ch.category}
                    </span>
                  </div>

                  {/* Title & Description */}
                  <h3 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '8px', color: '#f0f6fc' }}>
                    {ch.title}
                  </h3>
                  <p style={{
                    fontSize: '13px',
                    color: '#8b949e',
                    lineHeight: '1.6',
                    marginBottom: '16px',
                    display: '-webkit-box',
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                  }}>
                    {ch.description.replace(/[`*]/g, '')}
                  </p>

                  {/* Examples Preview */}
                  {ch.examples[0] && (
                    <div style={{
                      background: '#0d1117',
                      border: '1px solid #21262d',
                      borderRadius: '8px',
                      padding: '10px 12px',
                      fontSize: '12px',
                      fontFamily: "'JetBrains Mono', monospace",
                      color: '#c9d1d9',
                      marginBottom: '20px',
                    }}>
                      <span style={{ color: '#58a6ff' }}>Input:</span> {ch.examples[0].input}<br />
                      <span style={{ color: '#3fb950' }}>Output:</span> {ch.examples[0].output}
                    </div>
                  )}
                </div>

                {/* Bottom Action */}
                <button
                  onClick={() => handleSolve(ch)}
                  style={{
                    width: '100%',
                    padding: '11px 16px',
                    background: '#2563eb',
                    color: '#ffffff',
                    border: 'none',
                    borderRadius: '8px',
                    fontSize: '14px',
                    fontWeight: '600',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    transition: 'background 0.15s',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = '#1d4ed8')}
                  onMouseLeave={(e) => (e.currentTarget.style.background = '#2563eb')}
                >
                  <Code2 size={16} /> Solve in Editor ({selectedLanguage.toUpperCase()}) <ArrowRight size={14} />
                </button>
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
}
