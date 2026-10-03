import { useState, useEffect } from 'react';
import { X, Save } from 'lucide-react';
import { LANGUAGE_MAP } from '../utils/constants';

export default function SaveSnippetModal({ onClose, onSave, defaultTitle = '', language }) {
  const [title, setTitle] = useState(defaultTitle);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const handleEsc = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    setSaving(true);
    await onSave(title.trim());
    setSaving(false);
  };

  const lang = LANGUAGE_MAP[language];

  return (
    <div
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
      style={{
        position: 'fixed', inset: 0,
        background: 'rgba(0,0,0,0.7)',
        backdropFilter: 'blur(4px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        zIndex: 1000,
        animation: 'fadeIn 0.15s ease-out',
      }}
    >
      <div style={{
        background: 'var(--bg-secondary)',
        border: '1px solid var(--border-color)',
        borderRadius: '14px',
        padding: '28px',
        width: '420px',
        maxWidth: '90vw',
        boxShadow: '0 24px 80px rgba(0,0,0,0.6)',
        animation: 'fadeIn 0.2s ease-out',
      }}>
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
          <div>
            <h2 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '4px' }}>Save Snippet</h2>
            <p style={{ fontSize: '13px', color: 'var(--text-muted)' }}>Give your code snippet a title</p>
          </div>
          <button
            onClick={onClose}
            style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', padding: '4px' }}
          >
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Language preview */}
          <div style={{
            display: 'flex', alignItems: 'center', gap: '8px',
            padding: '10px 14px',
            background: 'var(--bg-tertiary)',
            borderRadius: '8px',
            marginBottom: '16px',
            fontSize: '13px',
            color: 'var(--text-secondary)',
          }}>
            <span>{lang?.icon}</span>
            <span style={{ fontWeight: '500' }}>{lang?.label}</span>
            <span style={{ marginLeft: 'auto', color: 'var(--text-muted)' }}>Language</span>
          </div>

          {/* Title input */}
          <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', color: 'var(--text-muted)', marginBottom: '8px', letterSpacing: '0.5px' }}>
            SNIPPET TITLE
          </label>
          <input
            type="text"
            className="input-field"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. Binary Search in Python"
            maxLength={100}
            autoFocus
            required
            style={{ marginBottom: '8px' }}
          />
          <div style={{ fontSize: '11px', color: 'var(--text-muted)', textAlign: 'right', marginBottom: '24px' }}>
            {title.length}/100
          </div>

          <div style={{ display: 'flex', gap: '10px' }}>
            <button
              type="button"
              onClick={onClose}
              className="btn-secondary"
              style={{ flex: 1 }}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!title.trim() || saving}
              className="btn-primary"
              style={{ flex: 1, opacity: (!title.trim() || saving) ? 0.7 : 1 }}
            >
              <Save size={14} />
              {saving ? 'Saving...' : 'Save Snippet'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
