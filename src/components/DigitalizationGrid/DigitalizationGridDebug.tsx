'use client';

import React from 'react';

interface Item {
  id: string;
  label: string;
  icon: React.ReactNode;
  gridPosition: number;
  color: string;
}

interface Connection {
  from: string;
  to: string;
  path: string;
  gradient: { start: string; end: string };
  wave: number;
}

const getCellCenter = (position: number): { x: number; y: number } => {
  const col = ((position - 1) % 4);
  const row = Math.floor((position - 1) / 4);
  return {
    x: col * 90 + 40,
    y: row * 90 + 40,
  };
};

const items: Item[] = [
  {
    id: 'crm',
    label: 'CRM',
    gridPosition: 1,
    color: 'text-forest-400',
    icon: (
      <svg width="32" height="32" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="24" cy="16" r="6" stroke="currentColor" strokeWidth="2"/>
        <circle cx="14" cy="32" r="4" stroke="currentColor" strokeWidth="2"/>
        <circle cx="34" cy="32" r="4" stroke="currentColor" strokeWidth="2"/>
        <path d="M20 20L16 28M28 20L32 28" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    id: 'calendrier',
    label: 'Calendrier',
    gridPosition: 2,
    color: 'text-[#006BFF]',
    icon: (
      <svg width="32" height="32" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="8" y="10" width="32" height="28" rx="2" stroke="currentColor" strokeWidth="2"/>
        <path d="M8 18H40" stroke="currentColor" strokeWidth="2"/>
        <path d="M16 6V14M32 6V14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        <circle cx="16" cy="26" r="1.5" fill="currentColor"/>
        <circle cx="24" cy="26" r="1.5" fill="currentColor"/>
        <circle cx="32" cy="26" r="1.5" fill="currentColor"/>
      </svg>
    ),
  },
  {
    id: 'stripe',
    label: 'Stripe',
    gridPosition: 3,
    color: 'text-[#635BFF]',
    icon: (
      <svg width="32" height="32" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="6" y="14" width="36" height="20" rx="3" stroke="currentColor" strokeWidth="2"/>
        <rect x="6" y="14" width="36" height="6" fill="currentColor" opacity="0.2"/>
        <rect x="10" y="26" width="12" height="4" rx="1" fill="currentColor"/>
      </svg>
    ),
  },
  {
    id: 'mailing',
    label: 'Mailing',
    gridPosition: 8,
    color: 'text-[#FFE01B]',
    icon: (
      <svg width="32" height="32" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="6" y="12" width="36" height="24" rx="2" stroke="currentColor" strokeWidth="2"/>
        <path d="M6 15L24 27L42 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    id: 'zapier',
    label: 'Zapier',
    gridPosition: 10,
    color: 'text-[#FF4A00]',
    icon: (
      <svg width="32" height="32" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M24 8L28 20H40L30 28L34 40L24 32L14 40L18 28L8 20H20L24 8Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    id: 'analytics',
    label: 'Analytics',
    gridPosition: 12,
    color: 'text-[#F9AB00]',
    icon: (
      <svg width="32" height="32" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 40 L12 40" stroke="#E37400" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M24 40 L24 24" stroke="#E37400" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M36 40 L36 8" stroke="#F9AB00" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    id: 'manychat',
    label: 'ManyChat',
    gridPosition: 13,
    color: 'text-[#00D068]',
    icon: (
      <svg width="32" height="32" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="8" y="12" width="32" height="20" rx="4" stroke="currentColor" strokeWidth="2"/>
        <path d="M24 32L20 36L20 32H24Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
        <circle cx="16" cy="22" r="2" fill="currentColor"/>
        <circle cx="24" cy="22" r="2" fill="currentColor"/>
        <circle cx="32" cy="22" r="2" fill="currentColor"/>
      </svg>
    ),
  },
  {
    id: 'website',
    label: 'Site Web',
    gridPosition: 15,
    color: 'text-forest-400',
    icon: (
      <svg width="32" height="32" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="24" cy="24" r="14" stroke="currentColor" strokeWidth="2"/>
        <path d="M10 24H38M24 10C24 10 18 16 18 24C18 32 24 38 24 38M24 10C24 10 30 16 30 24C30 32 24 38 24 38" stroke="currentColor" strokeWidth="2"/>
      </svg>
    ),
  },
  {
    id: 'social',
    label: 'Réseaux',
    gridPosition: 18,
    color: 'text-[#E1306C]',
    icon: (
      <svg width="32" height="32" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M24,20 A 8 8 0 1 0 32,28 V8 A 8 8 0 0 0 40,16" stroke="currentColor" strokeWidth="6" strokeLinejoin="round"/>
      </svg>
    ),
  },
];

const connections: Connection[] = [
  // Animation 1
  { from: 'social', to: 'manychat', path: 'M130,366 L130,322 Q130,310 118,310 L74,310', gradient: { start: '#E1306C', end: '#00D068' }, wave: 1 },
  { from: 'social', to: 'website', path: 'M130,366 L130,322 Q130,310 142,310 L186,310', gradient: { start: '#E1306C', end: '#95E1D3' }, wave: 1 },
  // Animation 2
  { from: 'manychat', to: 'social', path: 'M74,310 L118,310 Q130,310 130,322 L130,366', gradient: { start: '#00D068', end: '#E1306C' }, wave: 2 },
  { from: 'manychat', to: 'zapier', path: 'M40,276 L40,232 Q40,220 52,220 L96,220', gradient: { start: '#00D068', end: '#FF4A00' }, wave: 2 },
  { from: 'website', to: 'analytics', path: 'M220,276 L220,232 Q220,220 232,220 L276,220', gradient: { start: '#95E1D3', end: '#F9AB00' }, wave: 2 },
  // Animation 3
  { from: 'zapier', to: 'crm', path: 'M130,186 L130,142 Q130,130 118,130 L52,130 Q40,130 40,118 L40,74', gradient: { start: '#FF4A00', end: '#F38181' }, wave: 3 },
  { from: 'website', to: 'mailing', path: 'M220,276 L220,142 Q220,130 232,130 L276,130', gradient: { start: '#95E1D3', end: '#FFE01B' }, wave: 3 },
  // Animation 4
  { from: 'mailing', to: 'crm', path: 'M276,130 L52,130 Q40,130 40,118 L40,74', gradient: { start: '#FFE01B', end: '#F38181' }, wave: 4 },
  { from: 'mailing', to: 'zapier', path: 'M276,130 L142,130 Q130,130 130,142 L130,186', gradient: { start: '#FFE01B', end: '#FF4A00' }, wave: 4 },
  // Animation 5
  { from: 'website', to: 'stripe', path: 'M220,276 L220,74', gradient: { start: '#95E1D3', end: '#635BFF' }, wave: 5 },
  { from: 'website', to: 'zapier', path: 'M220,276 L220,232 Q220,220 208,220 L164,220', gradient: { start: '#95E1D3', end: '#FF4A00' }, wave: 5 },
  { from: 'website', to: 'mailing', path: 'M220,276 L220,142 Q220,130 232,130 L276,130', gradient: { start: '#95E1D3', end: '#FFE01B' }, wave: 5 },
  // Animation 6
  { from: 'zapier', to: 'crm', path: 'M130,186 L130,142 Q130,130 118,130 L52,130 Q40,130 40,118 L40,74', gradient: { start: '#FF4A00', end: '#F38181' }, wave: 6 },
  { from: 'zapier', to: 'calendrier', path: 'M130,186 L130,74', gradient: { start: '#FF4A00', end: '#006BFF' }, wave: 6 },
  { from: 'stripe', to: 'zapier', path: 'M220,74 L220,118 Q220,130 208,130 L142,130 Q130,130 130,142 L130,186', gradient: { start: '#635BFF', end: '#FF4A00' }, wave: 6 },
];

export default function DigitalizationGridDebug() {
  return (
    <div className="relative w-full max-w-[350px] mx-auto">
      <div className="relative w-full">
        {/* SVG Connections Layer - Absolute overlay */}
        <svg
          className="absolute top-0 left-0 w-full h-full pointer-events-none z-0"
          viewBox="0 0 360 440"
          xmlns="http://www.w3.org/2000/svg"
          style={{ width: '360px', height: '440px' }}
        >
          <defs>
            {connections.map((connection, index) => (
              <linearGradient
                key={`gradient-${index}`}
                id={`debug-gradient-${index}`}
                gradientUnits="userSpaceOnUse"
              >
                <stop offset="0%" stopColor={connection.gradient.start} />
                <stop offset="100%" stopColor={connection.gradient.end} />
              </linearGradient>
            ))}
          </defs>

          {/* Red dots at cell centers */}
          {[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20].map(pos => {
            const center = getCellCenter(pos);
            return (
              <circle
                key={`dot-${pos}`}
                cx={center.x}
                cy={center.y}
                r="3"
                fill="red"
                opacity="0.8"
              />
            );
          })}

          {/* All connections visible */}
          {connections.map((connection, index) => (
            <path
              key={`connection-${index}`}
              d={connection.path}
              stroke={`url(#debug-gradient-${index})`}
              strokeWidth="3"
              fill="none"
              opacity="0.8"
            />
          ))}
        </svg>

        {/* Items Layer - CSS Grid */}
        <div className="grid grid-cols-4 gap-[10px] relative z-10" style={{ width: '350px' }}>
          {/* Render grid with proper empty cells */}
          {Array.from({ length: 20 }, (_, index) => {
            const position = index + 1;
            const item = items.find(i => i.gridPosition === position);
            
            if (!item) {
              // Empty cell
              return <div key={`empty-${position}`} className="w-20 h-20" />;
            }

            // Item cell
            return (
              <div
                key={item.id}
                className="w-20 h-20 flex items-center justify-center"
              >
                <div className="flex flex-col items-center justify-center gap-1 border-2 rounded-lg p-2 bg-neutral-100 border-neutral-200 w-[76px] h-[76px]">
                  <div className="text-neutral-800">
                    {item.icon}
                  </div>
                  <div className="font-body text-xs font-medium text-center leading-tight text-neutral-200">
                    {item.label}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}