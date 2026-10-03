import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Plus, Trash2, Code2, Clock, Search, LayoutDashboard, AlertTriangle } from 'lucide-react';
import api from '../utils/api';
import toast from 'react-hot-toast';
import { LANGUAGE_MAP } from '../utils/constants';

function formatDate(dateStr) {
  const d = new Date(dateStr);
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

function ConfirmDeleteModal({ snippet, onConfirm, onCancel }) {
  return (
    <div
      onClick={(e) => { if (e.target === e.currentTarget) onCancel(); }}
      style={{
        position: 'fixed', inset: 0,
        background: 'rgba(0,0,0,0.7)',
        backdropFilter: 'blur(4px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        zIndex: 1000,
      }}
    >
      <div style={{
        background: 'var(--bg-secondary)',
        border: '1px solid var(--border-color)',
        borderRadius: '14px',
        padding: '28px',
        width: '380px',
        maxWidth: '90vw',
        animation: 'fadeIn 0.15s ease-out',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
          <div style={{
            width: '40px', height: '40px',
            background: 'rgba(248,81,73,0.15)',
            borderRadius: '10px',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <AlertTriangle size={20} color="var(--accent-red)" />
          </div>
          <div>
            <h3 style={{ fontSize: '16px', fontWeight: '700' }}>Delete Snippet</h3>
            <p style={{ fontSize: '13px', color: 'var(--text-muted)' }}>This cannot be undone</p>
          </div>
        </div>
        <p style={{ fontSize: '14px', color: 'var(--text-secondary)', marginBottom: '24px', lineHeight: 1.6 }}>
          Are you sure you want to delete <strong style={{ color: 'var(--text-primary)' }}>"{snippet.title}"</strong>?
        </p>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button onClick={onCancel} className="btn-secondary" style={{ flex: 1 }}>Cancel</button>
          <button onClick={onConfirm} className="btn-danger" style={{ flex: 1, justifyContent: 'center' }}>
            <Trash2 size={14} /> Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default function DashboardPage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [snippets, setSnippets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [langFilter, setLangFilter] = useState('all');
  const [deleteTarget, setDeleteTarget] = useState(null);

  useEffect(() => {
    fetchSnippets();
  }, []);

  const fetchSnippets = async () => {
    setLoading(true);
    try {
      const { data } = await api.get('/snippets');
      setSnippets(data.snippets);
    } catch (err) {
      toast.error('Failed to load snippets');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    try {
      await api.delete(`/snippets/${deleteTarget._id}`);
      setSnippets((prev) => prev.filter((s) => s._id !== deleteTarget._id));
      toast.success('Snippet deleted');
    } catch {
      toast.error('Failed to delete snippet');
    } finally {
      setDeleteTarget(null);
    }
  };

  const handleOpen = (snippet) => {
    navigate('/editor', { state: { snippet } });
  };

  const filtered = snippets.filter((s) => {
    const matchSearch = s.title.toLowerCase().includes(search.toLowerCase());
    const matchLang = langFilter === 'all' || s.language === langFilter;
    return matchSearch && matchLang;
  });

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '40px 24px', minHeight: 'calc(100vh - 56px)' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '32px', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
            <LayoutDashboard size={22} color="var(--accent-blue)" />
            <h1 style={{ fontSize: '26px', fontWeight: '700', letterSpacing: '-0.5px' }}>My Snippets</h1>
          </div>
          <p style={{ fontSize: '14px', color: 'var(--text-muted)' }}>
            Welcome back, <span style={{ color: 'var(--text-secondary)', fontWeight: '500' }}>{user?.name}</span>
            {' '}— {snippets.length} snippet{snippets.length !== 1 ? 's' : ''} saved
          </p>
        </div>
        <button
          onClick={() => navigate('/editor')}
          className="btn-primary"
          style={{ flexShrink: 0 }}
        >
          <Plus size={16} />
          New Snippet
        </button>
      </div>

      {/* Filters */}
      <div style={{ display: 'flex', gap: '12px', marginBottom: '24px', flexWrap: 'wrap' }}>
        {/* Search */}
        <div style={{ position: 'relative', flex: '1', minWidth: '200px' }}>
          <Search size={14} style={{
            position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)',
            color: 'var(--text-muted)', pointerEvents: 'none',
          }} />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search snippets..."
            className="input-field"
            style={{ paddingLeft: '36px' }}
          />
        </div>

        {/* Language filter */}
        <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
          {['all', ...Array.from(new Set(snippets.map((s) => s.language).filter(Boolean)))].map((lang) => {
            const langColor = lang === 'all' ? 'var(--accent-blue)' : LANGUAGE_MAP[lang]?.color || '#58a6ff';
            return (
              <button
                key={lang}
                onClick={() => setLangFilter(lang)}
                style={{
                  padding: '8px 14px',
                  borderRadius: '8px',
                  border: `1px solid ${langFilter === lang ? langColor : 'var(--border-color)'}`,
                  background: langFilter === lang ? `${langColor}18` : 'var(--bg-secondary)',
                  color: langFilter === lang ? langColor : 'var(--text-secondary)',
                  fontSize: '12px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  textTransform: lang === 'all' ? 'none' : 'uppercase',
                  letterSpacing: lang === 'all' ? 0 : '0.5px',
                  transition: 'all 0.15s',
                }}
              >
                {lang === 'all' ? 'All' : (LANGUAGE_MAP[lang]?.label || lang)}
              </button>
            );
          })}
        </div>
      </div>

      {/* Content */}
      {loading ? (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '300px', gap: '16px', color: 'var(--text-muted)' }}>
          <div className="spinner" style={{ width: '32px', height: '32px', borderWidth: '3px' }} />
          <span>Loading your snippets...</span>
        </div>
      ) : filtered.length === 0 ? (
        <div style={{
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
          height: '300px', gap: '16px',
          background: 'var(--bg-secondary)',
          border: '1px dashed var(--border-color)',
          borderRadius: '14px',
        }}>
          <Code2 size={40} style={{ opacity: 0.3 }} />
          <div style={{ textAlign: 'center' }}>
            <p style={{ fontSize: '16px', fontWeight: '600', marginBottom: '6px' }}>
              {search || langFilter !== 'all' ? 'No snippets match your filter' : 'No snippets yet'}
            </p>
            <p style={{ fontSize: '14px', color: 'var(--text-muted)' }}>
              {search || langFilter !== 'all'
                ? 'Try a different search or filter'
                : 'Write some code and save it to your dashboard!'}
            </p>
          </div>
          {!search && langFilter === 'all' && (
            <button onClick={() => navigate('/editor')} className="btn-primary">
              <Plus size={15} /> Create First Snippet
            </button>
          )}
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '16px' }}>
          {filtered.map((snippet) => {
            const lang = LANGUAGE_MAP[snippet.language];
            const color = LANGUAGE_MAP[snippet.language]?.color || '#58a6ff';
            return (
              <div
                key={snippet._id}
                style={{
                  background: 'var(--bg-secondary)',
                  border: '1px solid var(--border-color)',
                  borderRadius: '12px',
                  padding: '20px',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  position: 'relative',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = color + '60';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = `0 8px 24px rgba(0,0,0,0.3)`;
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = 'var(--border-color)';
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
                onClick={() => handleOpen(snippet)}
              >
                {/* Top row */}
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '8px', marginBottom: '12px' }}>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <h3 style={{
                      fontSize: '15px', fontWeight: '600',
                      overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                      marginBottom: '6px',
                    }}>
                      {snippet.title}
                    </h3>
                    <span style={{
                      display: 'inline-flex', alignItems: 'center', gap: '4px',
                      padding: '2px 10px',
                      borderRadius: '20px',
                      fontSize: '11px', fontWeight: '600',
                      letterSpacing: '0.5px', textTransform: 'uppercase',
                      background: color + '18',
                      color: color,
                    }}>
                      {lang?.icon} {lang?.label}
                    </span>
                  </div>
                  <button
                    onClick={(e) => { e.stopPropagation(); setDeleteTarget(snippet); }}
                    style={{
                      background: 'none', border: 'none',
                      color: 'var(--text-muted)', cursor: 'pointer',
                      padding: '4px', borderRadius: '6px',
                      transition: 'all 0.15s',
                      flexShrink: 0,
                    }}
                    onMouseEnter={e => { e.currentTarget.style.color = 'var(--accent-red)'; e.currentTarget.style.background = 'rgba(248,81,73,0.1)'; }}
                    onMouseLeave={e => { e.currentTarget.style.color = 'var(--text-muted)'; e.currentTarget.style.background = 'none'; }}
                  >
                    <Trash2 size={14} />
                  </button>
                </div>

                {/* Date */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '12px', color: 'var(--text-muted)' }}>
                  <Clock size={11} />
                  <span>Updated {formatDate(snippet.updatedAt)}</span>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Delete confirm modal */}
      {deleteTarget && (
        <ConfirmDeleteModal
          snippet={deleteTarget}
          onConfirm={handleDelete}
          onCancel={() => setDeleteTarget(null)}
        />
      )}
    </div>
  );
}
