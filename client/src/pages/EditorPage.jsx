import { useState, useRef, useCallback } from 'react';
import Editor from '@monaco-editor/react';
import {
  Play,
  Save,
  Loader2,
  ChevronDown,
  Trash2,
  X,
  Check,
  AlertCircle,
  Sparkles,
  Wand2,
  Send,
  Bot,
  Trophy,
  FileCode,
  Clock,
  Cpu,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { LANGUAGES, DEFAULT_CODE, LANGUAGE_MAP } from '../utils/constants';
import api from '../utils/api';
import toast from 'react-hot-toast';
import SaveSnippetModal from '../components/SaveSnippetModal';

const MONACO_OPTIONS = {
  fontSize: 14,
  fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
  fontLigatures: true,
  minimap: { enabled: false },
  scrollBeyondLastLine: false,
  lineHeight: 22,
  padding: { top: 16, bottom: 16 },
  renderLineHighlight: 'all',
  cursorBlinking: 'smooth',
  cursorSmoothCaretAnimation: 'on',
  smoothScrolling: true,
  tabSize: 2,
  wordWrap: 'on',
  automaticLayout: true,
  bracketPairColorization: { enabled: true },
  guides: { bracketPairs: true },
};

const EXTENSIONS = {
  python: 'py',
  javascript: 'js',
  typescript: 'ts',
  cpp: 'cpp',
  c: 'c',
  java: 'java',
  csharp: 'cs',
  go: 'go',
  rust: 'rs',
  kotlin: 'kt',
  swift: 'swift',
  php: 'php',
  ruby: 'rb',
  r: 'r',
};

export default function EditorPage({ initialSnippet = null }) {
  const { user } = useAuth();
  const targetLang =
    initialSnippet?.language && LANGUAGE_MAP[initialSnippet.language]
      ? initialSnippet.language
      : 'python';
  const [language, setLanguage] = useState(targetLang);
  const [code, setCode] = useState(
    initialSnippet?.code || DEFAULT_CODE[targetLang] || DEFAULT_CODE['python']
  );
  const [stdin, setStdin] = useState('');
  const [output, setOutput] = useState('');
  const [outputStatus, setOutputStatus] = useState(null); // 'success' | 'error' | null
  const [running, setRunning] = useState(false);
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [langDropOpen, setLangDropOpen] = useState(false);
  const [runMeta, setRunMeta] = useState(null); // { time, memory, status }
  const [snippetId, setSnippetId] = useState(initialSnippet?._id || null);
  const [snippetTitle, setSnippetTitle] = useState(initialSnippet?.title || '');
  const [challengeTitle, setChallengeTitle] = useState(initialSnippet?.challengeTitle || '');

  // AI Assistant State
  const [aiPanelOpen, setAiPanelOpen] = useState(false);
  const [aiLoading, setAiLoading] = useState(false);
  const [aiResult, setAiResult] = useState(null);
  const [aiQuestion, setAiQuestion] = useState('');

  const editorRef = useRef(null);

  const handleLanguageChange = (langId) => {
    setLanguage(langId);
    setCode(DEFAULT_CODE[langId] || '');
    setOutput('');
    setRunMeta(null);
    setLangDropOpen(false);
    setAiResult(null);
  };

  // AI Explain / Fix handler
  const handleAiExplain = async (errorText = '', customQuestion = '') => {
    setAiPanelOpen(true);
    setAiLoading(true);
    const errToAnalyze = errorText || (outputStatus === 'error' ? output : '');

    try {
      const { data } = await api.post('/ai/explain', {
        code,
        language,
        error: errToAnalyze,
        question: customQuestion,
      });

      setAiResult({
        explanation: data.explanation,
        fixedCode: data.fixedCode,
      });
      toast.success('AI analysis ready!');
    } catch (err) {
      toast.error('Could not get AI response');
    } finally {
      setAiLoading(false);
    }
  };

  // Apply AI fix to editor
  const handleApplyFix = () => {
    if (aiResult?.fixedCode) {
      setCode(aiResult.fixedCode);
      toast.success('Applied fix to editor');
    }
  };

  const handleRun = useCallback(async () => {
    if (!code.trim()) return;
    setRunning(true);
    setOutput('');
    setRunMeta(null);
    setOutputStatus(null);

    try {
      const { data } = await api.post('/code/run', { code, language, stdin });
      setOutput(data.output || '(no output)');
      setRunMeta({ time: data.time, memory: data.memory, status: data.status });

      const hasError =
        data.output?.toLowerCase().includes('error') ||
        data.status?.toLowerCase().includes('error') ||
        data.status?.toLowerCase().includes('runtime');
      setOutputStatus(hasError ? 'error' : 'success');
    } catch (err) {
      const msg = err.response?.data?.message || 'Failed to execute code';
      setOutput(msg);
      setOutputStatus('error');
      toast.error(msg);
    } finally {
      setRunning(false);
    }
  }, [code, language, stdin]);

  const handleSave = async (title) => {
    if (!user) {
      toast.error('Please login to save snippets');
      return;
    }
    try {
      let res;
      if (snippetId) {
        res = await api.put(`/snippets/${snippetId}`, { title, language, code });
        toast.success('Snippet updated!');
      } else {
        res = await api.post('/snippets', { title, language, code });
        setSnippetId(res.data.snippet._id);
        toast.success('Snippet saved!');
      }
      setSnippetTitle(title);
      setShowSaveModal(false);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to save');
    }
  };

  const selectedLang = LANGUAGE_MAP[language] || LANGUAGE_MAP['python'];

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      height: 'calc(100vh - 56px)',
      background: 'var(--bg-primary)',
      overflow: 'hidden',
    }}>
      {/* Toolbar */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        padding: '10px 16px',
        background: 'var(--bg-secondary)',
        borderBottom: '1px solid var(--border-color)',
        flexWrap: 'wrap',
        zIndex: 10,
      }}>
        {/* Language selector */}
        <div style={{ position: 'relative' }}>
          <button
            onClick={() => setLangDropOpen(!langDropOpen)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '7px 14px',
              background: 'var(--bg-tertiary)',
              border: '1px solid var(--border-color)',
              borderRadius: '8px',
              color: 'var(--text-primary)',
              fontSize: '13px',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.2s',
              minWidth: '140px',
              justifyContent: 'space-between',
            }}
          >
            <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span>{selectedLang.icon}</span>
              {selectedLang.label}
            </span>
            <ChevronDown size={14} style={{ transform: langDropOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }} />
          </button>
          {langDropOpen && (
            <div style={{
              position: 'absolute',
              top: 'calc(100% + 6px)',
              left: 0,
              background: 'var(--bg-secondary)',
              border: '1px solid var(--border-color)',
              borderRadius: '10px',
              overflowY: 'auto',
              maxHeight: '380px',
              zIndex: 50,
              minWidth: '180px',
              boxShadow: '0 8px 32px rgba(0,0,0,0.5)',
              animation: 'fadeIn 0.15s ease-out',
            }}>
              {LANGUAGES.map((lang) => (
                <button
                  key={lang.id}
                  onClick={() => handleLanguageChange(lang.id)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    width: '100%',
                    padding: '10px 14px',
                    background: language === lang.id ? 'var(--bg-tertiary)' : 'transparent',
                    border: 'none',
                    color: language === lang.id ? 'var(--accent-blue)' : 'var(--text-primary)',
                    fontSize: '13px',
                    fontWeight: language === lang.id ? '600' : '400',
                    cursor: 'pointer',
                    textAlign: 'left',
                    transition: 'background 0.15s',
                  }}
                  onMouseEnter={e => { if (language !== lang.id) e.currentTarget.style.background = 'var(--bg-tertiary)'; }}
                  onMouseLeave={e => { if (language !== lang.id) e.currentTarget.style.background = 'transparent'; }}
                >
                  <span>{lang.icon}</span>
                  {lang.label}
                  {language === lang.id && <Check size={13} style={{ marginLeft: 'auto' }} />}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Challenge title if loaded */}
        {challengeTitle && (
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            padding: '5px 12px',
            background: 'rgba(234,179,8,0.12)',
            border: '1px solid rgba(234,179,8,0.3)',
            borderRadius: '6px',
            fontSize: '12px',
            color: '#eab308',
            fontWeight: '600',
          }}>
            <Trophy size={13} /> {challengeTitle}
          </div>
        )}

        {/* Snippet title if loaded */}
        {snippetTitle && (
          <div style={{
            padding: '5px 12px',
            background: 'rgba(88,166,255,0.1)',
            border: '1px solid rgba(88,166,255,0.2)',
            borderRadius: '6px',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            fontSize: '12px',
            color: 'var(--accent-blue)',
            fontWeight: '500',
          }}>
            <FileCode size={13} /> {snippetTitle}
          </div>
        )}

        <div style={{ flex: 1 }} />

        {/* AI Assistant Button */}
        <button
          onClick={() => handleAiExplain()}
          className="btn-secondary"
          style={{
            padding: '7px 14px',
            fontSize: '13px',
            background: 'linear-gradient(135deg, rgba(168,85,247,0.15), rgba(79,70,229,0.15))',
            borderColor: 'rgba(168,85,247,0.4)',
            color: '#c084fc',
            fontWeight: '600',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
          }}
          title="Explain errors or ask AI to review code"
        >
          <Sparkles size={14} color="#c084fc" />
          AI Assistant
        </button>

        {/* Action buttons */}
        {user && (
          <button
            onClick={() => setShowSaveModal(true)}
            className="btn-secondary"
            style={{ padding: '7px 14px', fontSize: '13px' }}
          >
            <Save size={14} />
            {snippetId ? 'Update' : 'Save'}
          </button>
        )}

        <button
          onClick={handleRun}
          disabled={running}
          className="btn-primary"
          style={{ padding: '7px 18px', fontSize: '13px', opacity: running ? 0.8 : 1 }}
        >
          {running ? (
            <>
              <Loader2 size={14} style={{ animation: 'spin 0.7s linear infinite' }} />
              Running...
            </>
          ) : (
            <>
              <Play size={14} fill="white" />
              Run Code
            </>
          )}
        </button>
      </div>

      {/* Main layout: editor + output */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        flex: 1,
        overflow: 'hidden',
        gap: 0,
      }}
        className="editor-layout"
      >
        {/* LEFT: Editor */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          borderRight: '1px solid var(--border-color)',
          overflow: 'hidden',
        }}>
          <div style={{
            padding: '8px 16px',
            background: 'var(--bg-secondary)',
            borderBottom: '1px solid var(--border-muted)',
            fontSize: '11px',
            color: 'var(--text-muted)',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            letterSpacing: '0.5px',
          }}>
            <span style={{ color: 'var(--accent-blue)' }}>●</span>
            {`main.${EXTENSIONS[language] || 'txt'}`}
          </div>
          <div style={{ flex: 1, overflow: 'hidden' }}>
            <Editor
              height="100%"
              language={selectedLang.monacoId}
              value={code}
              onChange={(val) => setCode(val || '')}
              theme="vs-dark"
              options={MONACO_OPTIONS}
              onMount={(editor) => { editorRef.current = editor; }}
              loading={
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: '100%',
                  color: 'var(--text-muted)',
                  gap: '10px',
                }}>
                  <div className="spinner" />
                  Loading editor...
                </div>
              }
            />
          </div>
        </div>

        {/* RIGHT: Output + stdin */}
        <div style={{ display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
          {/* stdin */}
          <div style={{
            padding: '10px 16px',
            background: 'var(--bg-secondary)',
            borderBottom: '1px solid var(--border-color)',
          }}>
            <label style={{
              display: 'block',
              fontSize: '11px',
              color: 'var(--text-muted)',
              fontWeight: '600',
              letterSpacing: '0.8px',
              marginBottom: '6px',
            }}>
              STDIN (custom input)
            </label>
            <textarea
              value={stdin}
              onChange={(e) => setStdin(e.target.value)}
              placeholder="Enter input for your program here..."
              rows={2}
              style={{
                width: '100%',
                padding: '8px 12px',
                background: 'var(--bg-tertiary)',
                border: '1px solid var(--border-color)',
                borderRadius: '6px',
                color: 'var(--text-primary)',
                fontSize: '12px',
                fontFamily: "'JetBrains Mono', monospace",
                resize: 'vertical',
                outline: 'none',
                minHeight: '52px',
                transition: 'border-color 0.2s',
              }}
              onFocus={e => { e.target.style.borderColor = 'var(--accent-blue)'; }}
              onBlur={e => { e.target.style.borderColor = 'var(--border-color)'; }}
            />
          </div>

          {/* Output Console */}
          <div style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
          }}>
            <div style={{
              padding: '10px 16px',
              background: 'var(--bg-secondary)',
              borderBottom: '1px solid var(--border-muted)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{
                  width: '8px', height: '8px', borderRadius: '50%',
                  background: running ? '#f0883e' : outputStatus === 'success' ? '#3fb950' : outputStatus === 'error' ? '#f85149' : '#6e7681',
                  animation: running ? 'pulse-glow 1s infinite' : 'none',
                }} />
                <span style={{ fontSize: '11px', fontWeight: '600', color: 'var(--text-muted)', letterSpacing: '0.8px' }}>
                  OUTPUT
                </span>
                {outputStatus === 'error' && (
                  <AlertCircle size={12} color="var(--accent-red)" />
                )}
              </div>
              {runMeta && (
                <div style={{ display: 'flex', gap: '12px', fontSize: '11px', color: 'var(--text-muted)' }}>
                  {runMeta.time && <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}><Clock size={11} /> {runMeta.time}s</span>}
                  {runMeta.memory && <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}><Cpu size={11} /> {runMeta.memory}KB</span>}
                  <span style={{
                    color: outputStatus === 'error' ? 'var(--accent-red)' : 'var(--accent-green)',
                  }}>
                    {runMeta.status}
                  </span>
                </div>
              )}
              {output && (
                <button
                  onClick={() => { setOutput(''); setRunMeta(null); setOutputStatus(null); }}
                  style={{
                    background: 'none', border: 'none',
                    color: 'var(--text-muted)', cursor: 'pointer',
                    display: 'flex', alignItems: 'center',
                  }}
                >
                  <X size={13} />
                </button>
              )}
            </div>

            {/* Error AI Action Banner */}
            {outputStatus === 'error' && (
              <div style={{
                padding: '9px 16px',
                background: 'rgba(239, 68, 68, 0.08)',
                borderBottom: '1px solid rgba(239, 68, 68, 0.2)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '12px',
                animation: 'fadeIn 0.2s ease-out',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', color: '#fca5a5' }}>
                  <AlertCircle size={15} />
                  <span>Error in execution. Let AI explain and fix it for you.</span>
                </div>
                <button
                  onClick={() => handleAiExplain(output)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '6px 12px',
                    background: 'linear-gradient(135deg, #2563eb, #3b82f6)',
                    color: '#ffffff',
                    border: 'none',
                    borderRadius: '6px',
                    fontSize: '12px',
                    fontWeight: '600',
                    cursor: 'pointer',
                    boxShadow: '0 2px 8px rgba(37, 99, 235, 0.25)',
                    transition: 'opacity 0.15s',
                  }}
                  onMouseEnter={e => e.currentTarget.style.opacity = '0.9'}
                  onMouseLeave={e => e.currentTarget.style.opacity = '1'}
                >
                  <Sparkles size={13} /> Explain & Fix with AI
                </button>
              </div>
            )}

            <div style={{
              flex: 1,
              padding: '20px',
              overflowY: 'auto',
              background: '#0d1117',
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: '13px',
              lineHeight: 1.7,
            }}>
              {running ? (
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--text-muted)' }}>
                  <div className="spinner" />
                  Executing your code...
                </div>
              ) : output ? (
                <pre style={{
                  margin: 0,
                  whiteSpace: 'pre-wrap',
                  wordBreak: 'break-word',
                  color: outputStatus === 'error' ? 'var(--accent-red)' : '#e6edf3',
                }}>
                  {output}
                </pre>
              ) : (
                <div style={{ color: 'var(--text-muted)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', gap: '10px' }}>
                  <Play size={28} style={{ opacity: 0.3 }} />
                  <span>Click <strong style={{ color: 'var(--text-secondary)' }}>Run Code</strong> to see output here</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Save Modal */}
      {showSaveModal && (
        <SaveSnippetModal
          onClose={() => setShowSaveModal(false)}
          onSave={handleSave}
          defaultTitle={snippetTitle}
          language={language}
        />
      )}

      {/* AI Assistant Slide-Over Drawer */}
      {aiPanelOpen && (
        <div style={{
          position: 'fixed',
          top: 0,
          right: 0,
          bottom: 0,
          width: '460px',
          maxWidth: '92vw',
          background: '#161b22',
          borderLeft: '1px solid #30363d',
          zIndex: 1000,
          display: 'flex',
          flexDirection: 'column',
          boxShadow: '-8px 0 32px rgba(0,0,0,0.5)',
          animation: 'fadeIn 0.2s ease-out',
        }}>
          {/* Header */}
          <div style={{
            padding: '16px 20px',
            borderBottom: '1px solid #30363d',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            background: '#0d1117',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{
                width: '28px',
                height: '28px',
                borderRadius: '8px',
                background: 'linear-gradient(135deg, #2563eb, #3b82f6)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                <Sparkles size={16} color="#ffffff" />
              </div>
              <div>
                <h3 style={{ fontSize: '15px', fontWeight: '700', color: '#f0f6fc', margin: 0 }}>
                  Codify AI Assistant
                </h3>
                <span style={{ fontSize: '11px', color: '#8b949e' }}>Powered by intelligent code analysis</span>
              </div>
            </div>
            <button
              onClick={() => setAiPanelOpen(false)}
              style={{
                background: 'none',
                border: 'none',
                color: '#8b949e',
                cursor: 'pointer',
                display: 'flex',
              }}
            >
              <X size={18} />
            </button>
          </div>

          {/* Content Area */}
          <div style={{
            flex: 1,
            overflowY: 'auto',
            padding: '20px',
            fontSize: '13px',
            lineHeight: 1.6,
            color: '#c9d1d9',
          }}>
            {aiLoading ? (
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                height: '240px',
                gap: '14px',
                color: '#8b949e',
              }}>
                <Loader2 size={32} style={{ animation: 'spin 0.8s linear infinite', color: '#2563eb' }} />
                <span>Analyzing your {language} code & errors...</span>
              </div>
            ) : aiResult ? (
              <div>
                {/* Formatted Explanation */}
                <div style={{
                  background: '#0d1117',
                  border: '1px solid #30363d',
                  borderRadius: '10px',
                  padding: '16px',
                  marginBottom: '18px',
                  whiteSpace: 'pre-wrap',
                  fontFamily: 'inherit',
                }}>
                  {aiResult.explanation}
                </div>

                {/* Apply fix action */}
                {aiResult.fixedCode && aiResult.fixedCode !== code && (
                  <div style={{
                    background: 'rgba(35, 134, 54, 0.1)',
                    border: '1px solid rgba(46, 160, 67, 0.3)',
                    borderRadius: '10px',
                    padding: '16px',
                    marginBottom: '18px',
                  }}>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      marginBottom: '10px',
                    }}>
                      <span style={{ fontSize: '12px', fontWeight: '700', color: '#3fb950' }}>
                        SUGGESTED FIX READY
                      </span>
                      <button
                        onClick={handleApplyFix}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '6px',
                          padding: '6px 14px',
                          background: '#238636',
                          color: '#fff',
                          border: 'none',
                          borderRadius: '6px',
                          fontSize: '12px',
                          fontWeight: '600',
                          cursor: 'pointer',
                        }}
                      >
                        <Wand2 size={13} /> Apply Fix to Editor
                      </button>
                    </div>
                    <pre style={{
                      margin: 0,
                      background: '#0d1117',
                      padding: '10px',
                      borderRadius: '6px',
                      fontSize: '12px',
                      fontFamily: "'JetBrains Mono', monospace",
                      overflowX: 'auto',
                      color: '#e6edf3',
                    }}>
                      {aiResult.fixedCode}
                    </pre>
                  </div>
                )}
              </div>
            ) : (
              <div style={{ textAlign: 'center', padding: '40px 10px', color: '#8b949e' }}>
                <Bot size={40} style={{ opacity: 0.4, margin: '0 auto 16px' }} />
                <h4 style={{ fontSize: '15px', color: '#f0f6fc', marginBottom: '8px' }}>
                  Need help with your code?
                </h4>
                <p style={{ fontSize: '13px', lineHeight: 1.6, marginBottom: '20px' }}>
                  AI can explain compile errors, find logic bugs, optimize time complexity, or rewrite your code.
                </p>

                {/* Quick Prompts */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {[
                    'Why does this code produce an error?',
                    'How can I optimize this algorithm?',
                    'Explain this code step-by-step',
                  ].map((prompt) => (
                    <button
                      key={prompt}
                      onClick={() => {
                        setAiQuestion(prompt);
                        handleAiExplain(output, prompt);
                      }}
                      style={{
                        padding: '10px 14px',
                        background: '#0d1117',
                        border: '1px solid #30363d',
                        borderRadius: '8px',
                        color: '#c9d1d9',
                        fontSize: '12px',
                        textAlign: 'left',
                        cursor: 'pointer',
                        transition: 'border-color 0.15s',
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.borderColor = '#58a6ff')}
                      onMouseLeave={(e) => (e.currentTarget.style.borderColor = '#30363d')}
                    >
                      {prompt}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Bottom Chat / Ask Box */}
          <div style={{
            padding: '14px 16px',
            borderTop: '1px solid #30363d',
            background: '#0d1117',
            display: 'flex',
            gap: '8px',
          }}>
            <input
              type="text"
              value={aiQuestion}
              onChange={(e) => setAiQuestion(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && aiQuestion.trim()) {
                  handleAiExplain(output, aiQuestion);
                  setAiQuestion('');
                }
              }}
              placeholder="Ask AI anything about your code..."
              style={{
                flex: 1,
                padding: '9px 12px',
                background: '#161b22',
                border: '1px solid #30363d',
                borderRadius: '8px',
                color: '#e6edf3',
                fontSize: '13px',
                outline: 'none',
              }}
            />
            <button
              onClick={() => {
                if (aiQuestion.trim()) {
                  handleAiExplain(output, aiQuestion);
                  setAiQuestion('');
                }
              }}
              disabled={aiLoading || !aiQuestion.trim()}
              style={{
                padding: '0 14px',
                background: '#2563eb',
                color: '#fff',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                opacity: aiLoading || !aiQuestion.trim() ? 0.5 : 1,
              }}
            >
              <Send size={15} />
            </button>
          </div>
        </div>
      )}

      {/* Responsive: collapse to stacked on mobile */}
      <style>{`
        @media (max-width: 768px) {
          .editor-layout {
            grid-template-columns: 1fr !important;
            grid-template-rows: 50vh 1fr;
          }
        }
      `}</style>
    </div>
  );
}
