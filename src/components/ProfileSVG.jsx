import React from 'react';

const ProfileSVG = ({ size = 200 }) => {
  return (
    <svg width={size} height={size} viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="avatarGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#3b82f6" />
          <stop offset="100%" stopColor="#10b981" />
        </linearGradient>
        <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="5" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>
      
      {/* Background Circle */}
      <circle cx="100" cy="100" r="90" fill="rgba(30, 41, 59, 0.5)" stroke="url(#avatarGradient)" strokeWidth="2" />
      
      {/* Stylized Tech Avatar (Abstract) */}
      <path 
        d="M100 50 L130 80 L100 110 L70 80 Z" 
        fill="url(#avatarGradient)" 
        fillOpacity="0.8"
        filter="url(#glow)"
      />
      <circle cx="100" cy="80" r="15" fill="white" fillOpacity="0.2" />
      
      {/* Circuit Lines */}
      <path d="M70 140 L100 110 L130 140" stroke="url(#avatarGradient)" strokeWidth="2" strokeLinecap="round" />
      <circle cx="70" cy="140" r="3" fill="#3b82f6" />
      <circle cx="130" cy="140" r="3" fill="#10b981" />
      <circle cx="100" cy="160" r="4" stroke="url(#avatarGradient)" strokeWidth="1" />
      
      {/* Name initials placeholder (Abstract) */}
      <text x="100" y="185" textAnchor="middle" fill="white" fontStyle="italic" fontWeight="800" fontSize="10" opacity="0.6">AS</text>
    </svg>
  );
};

export default ProfileSVG;
