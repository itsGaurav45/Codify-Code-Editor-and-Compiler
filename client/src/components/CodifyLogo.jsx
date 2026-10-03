import React, { useId } from 'react';
import { Link } from 'react-router-dom';

/**
 * Codify Brand Logo
 * Unified, single-color developer-brand logo with stylized "C" code-bracket emblem.
 * Uses a single cohesive Electric Blue palette (#2563eb / #3b82f6).
 *
 * @param {'small'|'medium'|'large'|'xlarge'|number} size - Logo sizing
 * @param {string|null} linkTo - Route to link to ('/' by default, null for no link)
 * @param {boolean} light - Whether text is light (for dark backgrounds)
 * @param {boolean} iconOnly - Show only the icon without text
 * @param {string} className - Optional container class
 * @param {object} style - Optional container inline styles
 */
export default function CodifyLogo({
  size = 'medium',
  linkTo = '/',
  light = false,
  iconOnly = false,
  className = '',
  style = {},
}) {
  const reactId = useId();
  // Clean safe ID for SVG gradient references
  const id = reactId.replace(/[^a-zA-Z0-9_-]/g, '');

  const getDimensions = () => {
    if (typeof size === 'number') {
      return {
        iconSize: size,
        fontSize: `${Math.round(size * 0.68)}px`,
        gap: `${Math.max(6, Math.round(size * 0.28))}px`,
      };
    }
    switch (size) {
      case 'small':
        return { iconSize: 24, fontSize: '17px', gap: '8px' };
      case 'large':
        return { iconSize: 40, fontSize: '26px', gap: '12px' };
      case 'xlarge':
        return { iconSize: 52, fontSize: '32px', gap: '14px' };
      case 'medium':
      default:
        return { iconSize: 32, fontSize: '21px', gap: '10px' };
    }
  };

  const dims = getDimensions();

  const iconSvg = (
    <svg
      width={dims.iconSize}
      height={dims.iconSize}
      viewBox="0 0 36 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{
        flexShrink: 0,
        display: 'block',
        filter: 'drop-shadow(0 2px 8px rgba(37, 99, 235, 0.3))',
        transition: 'transform 0.2s cubic-bezier(0.16, 1, 0.3, 1), filter 0.2s ease',
      }}
      className="codify-logo-icon"
    >
      <defs>
        {/* Clean Slate/Navy Badge Background */}
        <linearGradient id={`codify_bg_${id}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#0b1739" />
          <stop offset="50%" stopColor="#0a122c" />
          <stop offset="100%" stopColor="#030712" />
        </linearGradient>

        {/* Unified Blue Border Gradient */}
        <linearGradient id={`codify_border_${id}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#60a5fa" stopOpacity="0.8" />
          <stop offset="50%" stopColor="#2563eb" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#1d4ed8" stopOpacity="0.8" />
        </linearGradient>

        {/* Single Blue C-Bracket Gradient */}
        <linearGradient id={`codify_c_grad_${id}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#60a5fa" />
          <stop offset="100%" stopColor="#2563eb" />
        </linearGradient>

        {/* Single Blue Chevron Gradient */}
        <linearGradient id={`codify_chev_grad_${id}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#93c5fd" />
          <stop offset="100%" stopColor="#3b82f6" />
        </linearGradient>

        {/* Ambient Glow */}
        <filter id={`codify_glow_${id}`} x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="1" stdDeviation="1.5" floodColor="#2563eb" floodOpacity="0.5" />
        </filter>
      </defs>

      {/* Modern Badge Container */}
      <rect
        x="0.75"
        y="0.75"
        width="34.5"
        height="34.5"
        rx="9.5"
        fill={`url(#codify_bg_${id})`}
        stroke={`url(#codify_border_${id})`}
        strokeWidth="1.2"
      />

      {/* Inner Gloss Light Line */}
      <path
        d="M 6 5.5 C 10 4 20 4 30 5.5"
        stroke="rgba(255, 255, 255, 0.15)"
        strokeWidth="1"
        strokeLinecap="round"
      />

      {/* The Iconic "C" Outer Code-Bracket */}
      <path
        d="M 26 10 H 15.5 C 13.2 10 11.5 11.4 10.5 13.2 L 8 18 L 10.5 22.8 C 11.5 24.6 13.2 26 15.5 26 H 26"
        stroke={`url(#codify_c_grad_${id})`}
        strokeWidth="3.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        filter={`url(#codify_glow_${id})`}
      />

      {/* The Inner Code Prompt Chevron ( > ) */}
      <path
        d="M 16.5 14 L 21 18 L 16.5 22"
        stroke={`url(#codify_chev_grad_${id})`}
        strokeWidth="2.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Execution Pulse Dot */}
      <circle
        cx="25.5"
        cy="18"
        r="1.4"
        fill="#60a5fa"
      />
    </svg>
  );

  const content = (
    <div
      className={`codify-brand-logo ${className}`}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: dims.gap,
        textDecoration: 'none',
        userSelect: 'none',
        cursor: linkTo ? 'pointer' : 'default',
        ...style,
      }}
    >
      {iconSvg}

      {!iconOnly && (
        <span
          style={{
            fontSize: dims.fontSize,
            fontWeight: '800',
            letterSpacing: '-0.035em',
            lineHeight: 1,
            fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
            display: 'inline-flex',
            alignItems: 'center',
          }}
        >
          <span style={{ color: '#2563eb' }}>
            C
          </span>
          <span style={{ color: light ? '#f8fafc' : '#0f172a', transition: 'color 0.15s ease' }}>
            odify
          </span>
          <span
            style={{
              display: 'inline-block',
              width: '5px',
              height: '5px',
              borderRadius: '50%',
              background: '#2563eb',
              marginLeft: '2px',
              marginBottom: '2px',
              alignSelf: 'flex-end',
              boxShadow: '0 0 6px rgba(37, 99, 235, 0.6)',
            }}
          />
        </span>
      )}
    </div>
  );

  if (linkTo) {
    return (
      <Link
        to={linkTo}
        style={{
          textDecoration: 'none',
          display: 'inline-flex',
          alignItems: 'center',
        }}
      >
        {content}
      </Link>
    );
  }

  return content;
}
