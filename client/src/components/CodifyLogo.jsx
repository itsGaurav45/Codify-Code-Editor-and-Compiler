import React from 'react';
import { Link } from 'react-router-dom';

/**
 * Codify Brand Logo — Clean professional mark
 * Icon: geometric {/} code emblem, single-color blue
 * Wordmark: "Codify" bold sans-serif
 */
export default function CodifyLogo({
  size = 'medium',
  linkTo = '/',
  light = false,
  iconOnly = false,
  className = '',
  style = {},
}) {
  const dims = (() => {
    if (typeof size === 'number') return { iconSize: size, fontSize: Math.round(size * 0.65), gap: Math.max(6, Math.round(size * 0.28)) };
    switch (size) {
      case 'small':  return { iconSize: 22, fontSize: 15, gap: 7 };
      case 'large':  return { iconSize: 38, fontSize: 24, gap: 11 };
      case 'xlarge': return { iconSize: 48, fontSize: 30, gap: 13 };
      default:       return { iconSize: 30, fontSize: 20, gap: 9 };
    }
  })();

  const s = dims.iconSize;

  const iconSvg = (
    <svg
      width={s}
      height={s}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ flexShrink: 0, display: 'block' }}
    >
      {/* Badge background */}
      <rect width="32" height="32" rx="8" fill="#1d4ed8" />

      {/* { bracket left */}
      <path
        d="M11 9 C9 9 8 10 8 11.5 L8 14 C8 15.1 7.1 16 6 16 C7.1 16 8 16.9 8 18 L8 20.5 C8 22 9 23 11 23"
        stroke="white"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />

      {/* / slash */}
      <line x1="14" y1="22" x2="18" y2="10" stroke="white" strokeWidth="1.8" strokeLinecap="round" />

      {/* } bracket right */}
      <path
        d="M21 9 C23 9 24 10 24 11.5 L24 14 C24 15.1 24.9 16 26 16 C24.9 16 24 16.9 24 18 L24 20.5 C24 22 23 23 21 23"
        stroke="white"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );

  const content = (
    <div
      className={`codify-brand-logo ${className}`}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: `${dims.gap}px`,
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
            fontSize: `${dims.fontSize}px`,
            fontWeight: '700',
            letterSpacing: '-0.03em',
            lineHeight: 1,
            fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
            color: light ? '#f1f5f9' : '#0f172a',
          }}
        >
          Codify
        </span>
      )}
    </div>
  );

  if (linkTo) {
    return (
      <Link to={linkTo} style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center' }}>
        {content}
      </Link>
    );
  }
  return content;
}
