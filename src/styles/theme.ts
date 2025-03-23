// Theme configuration for the application
// Contains all shared styles, colors, and animations used throughout the app

export const colors = {
    // Primary color palette
    primary: {
        purple: '#9333EA', // purple-600
        indigo: '#6366F1', // indigo-500
        pink: '#EC4899',   // pink-500
        blue: '#3B82F6',   // blue-500
    },

    // Background gradients
    gradients: {
        background: 'linear-gradient(to bottom right, #111827, #4C1D95, #4F46E5)',
        purpleToPink: 'linear-gradient(to right, #9333EA, #EC4899)',
        blueToPurple: 'linear-gradient(to right, #3B82F6, #6366F1)',
        pinkToPurple: 'linear-gradient(to right, #EC4899, #9333EA)',
        text: 'linear-gradient(to right, #C4B5FD, #F9A8D4, #93C5FD)', // purple-300, pink-300, blue-300
        rainbow: 'linear-gradient(90deg, #ff1493, #ff8c00, #ffd700, #00fa9a, #00bfff, #ff1493)',
    },

    // UI elements
    ui: {
        card: 'rgba(255, 255, 255, 0.05)',
        cardHover: 'rgba(255, 255, 255, 0.1)',
        glassBg: 'rgba(0, 0, 0, 0.3)',
        glassLight: 'rgba(255, 255, 255, 0.05)',
        border: 'rgba(255, 255, 255, 0.1)',
        borderHover: 'rgba(255, 255, 255, 0.2)',
        inputBg: 'rgba(255, 255, 255, 0.05)',
    },

    // Text colors
    text: {
        primary: '#FFFFFF',
        secondary: '#D1D5DB', // gray-300
        muted: '#9CA3AF',     // gray-400
        accent: '#C4B5FD',    // purple-300
    },
};

export const animations = {
    // CSS keyframes
    keyframes: `
    @keyframes blob {
      0% { transform: translate(0px, 0px) scale(1); }
      33% { transform: translate(30px, -50px) scale(1.1); }
      66% { transform: translate(-20px, 20px) scale(0.9); }
      100% { transform: translate(0px, 0px) scale(1); }
    }
    
    @keyframes blob-fast {
      0% { transform: translate(0px, 0px) scale(1); }
      25% { transform: translate(40px, -60px) scale(1.15); }
      50% { transform: translate(-30px, 30px) scale(0.85); }
      75% { transform: translate(20px, -20px) scale(1.05); }
      100% { transform: translate(0px, 0px) scale(1); }
    }
    
    @keyframes rainbow-move {
      0% { background-position: 0% 50%; }
      50% { background-position: 100% 50%; }
      100% { background-position: 0% 50%; }
    }
    
    @keyframes shimmer-move {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }

    @keyframes blink {
      0%, 100% { opacity: 1; }
      50% { opacity: 0; }
    }
    
    @keyframes pulse {
      0%, 100% { 
        transform: scale(1);
        box-shadow: 0 0 0 rgba(139, 92, 246, 0.2);
      }
      50% { 
        transform: scale(1.02);
        box-shadow: 0 0 15px rgba(139, 92, 246, 0.4);
      }
    }

    @keyframes float {
      0%, 100% { transform: translateY(0px); }
      50% { transform: translateY(-5px); }
    }
    
    @keyframes scroll-rtl {
      0% { transform: translateX(0); }
      100% { transform: translateX(calc(-400px * 7 - 7 * 1.5rem)); }
    }
  `,

    // CSS classes
    classes: `
    .animate-blob {
      animation: blob 15s infinite cubic-bezier(0.4, 0, 0.2, 1);
    }
    
    .animate-blob-fast {
      animation: blob-fast 8s infinite cubic-bezier(0.4, 0, 0.2, 1);
    }
    
    .animation-delay-2000 {
      animation-delay: 2s;
    }
    
    .animation-delay-4000 {
      animation-delay: 4s;
    }
    
    .animation-delay-6000 {
      animation-delay: 6s;
    }

    .animate-blink {
      animation: blink 0.75s infinite;
    }

    .animate-pulse {
      animation: pulse 5s infinite ease-in-out;
    }

    .animate-float {
      animation: float 3s infinite ease-in-out;
    }
    
    .animate-scroll-rtl {
      animation: scroll-rtl 25s linear infinite;
      will-change: transform;
    }
    
    .hover\:animation-play-state-paused:hover {
      animation-play-state: paused;
    }
  `,
};

export const components = {
    // Component styles
    styles: `
    .feature-card {
      position: relative;
      background: rgba(255, 255, 255, 0.05);
      backdrop-filter: blur(10px);
      -webkit-backdrop-filter: blur(10px);
      border-radius: 16px;
      border: 1px solid rgba(255, 255, 255, 0.1);
      padding: 2rem;
      text-align: center;
      transition: all 0.3s ease;
      box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
    }
    
    .feature-card:hover {
      transform: translateY(-5px);
      box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
      border-color: rgba(255, 255, 255, 0.2);
    }
    
    .glass-input {
      width: 100%;
      background: rgba(255, 255, 255, 0.07);
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 8px;
      padding: 10px 16px;
      color: white;
      transition: all 0.3s ease;
      backdrop-filter: blur(4px);
      -webkit-backdrop-filter: blur(4px);
    }
    
    .glass-input:focus {
      outline: none;
      border-color: rgba(255, 255, 255, 0.3);
      box-shadow: 0 0 0 2px rgba(139, 92, 246, 0.3);
    }
    
    .glass-input::placeholder {
      color: rgba(255, 255, 255, 0.4);
    }
    
    .glass-input:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }
    
    .glass-button {
      background: rgba(139, 92, 246, 0.2);
      color: white;
      border: 1px solid rgba(139, 92, 246, 0.3);
      border-radius: 8px;
      padding: 10px 20px;
      font-weight: 500;
      transition: all 0.3s ease;
      cursor: pointer;
      backdrop-filter: blur(4px);
      -webkit-backdrop-filter: blur(4px);
    }
    
    .glass-button:hover:not(:disabled) {
      background: rgba(139, 92, 246, 0.3);
      transform: translateY(-2px);
    }
    
    .glass-button:active:not(:disabled) {
      transform: translateY(0);
    }
    
    .glass-button:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }
    
    .rainbow-border {
      position: relative;
      border: none;
      z-index: 0;
      overflow: hidden;
      transition: all 0.3s ease;
    }
    
    .rainbow-border:before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      padding: 2px;
      border-radius: 8px;
      background: linear-gradient(
        90deg, 
        #ff1493, #ff8c00, #ffd700, #00fa9a, #00bfff, #ff1493
      );
      background-size: 400% 400%;
      animation: rainbow-move 3s linear infinite;
      -webkit-mask: 
        linear-gradient(#fff 0 0) content-box, 
        linear-gradient(#fff 0 0);
      -webkit-mask-composite: xor;
      mask-composite: exclude;
      z-index: -1;
    }
    
    .rainbow-border:hover:before {
      animation: rainbow-move 1.5s linear infinite;
    }
    
    .shimmer-border {
      position: relative;
      overflow: hidden;
    }
    
    .shimmer-border:before {
      content: '';
      position: absolute;
      top: -100%;
      left: -100%;
      right: -100%;
      bottom: -100%;
      background: linear-gradient(
        315deg,
        transparent 0%,
        transparent 35%,
        rgba(255, 255, 255, 0.2) 35%,
        rgba(255, 255, 255, 0.2) 60%,
        transparent 60%,
        transparent 100%
      );
      background-size: 400% 400%;
      animation: shimmer-move 3s linear infinite;
      z-index: -1;
    }
    
    .shimmer-border:hover {
      background-color: rgba(255, 255, 255, 0.05);
      border-color: rgba(255, 255, 255, 0.3);
      box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
      transform: translateY(-2px);
    }
    
    .shimmer-border:hover:before {
      animation: shimmer-move 1.5s linear infinite;
    }
    
    .glass-card {
      backdrop-filter: blur(10px);
      -webkit-backdrop-filter: blur(10px);
      background: rgba(255, 255, 255, 0.05);
      border-radius: 16px;
      border: 1px solid rgba(255, 255, 255, 0.1);
      box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
    }
    
    .neuro-card {
      background: rgba(15, 14, 20, 0.5);
      border-radius: 16px;
      box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
      backdrop-filter: blur(10px);
      -webkit-backdrop-filter: blur(10px);
      border: 1px solid rgba(255, 255, 255, 0.1);
      padding: 2rem;
    }
  `,
};

// Helper function to create background blobs
export const createBackgroundBlobs = () => {
    return `
      <div class="absolute inset-0">
        <div class="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600/40 rounded-full mix-blend-multiply filter blur-[80px] opacity-70 animate-blob-fast"></div>
        <div class="absolute top-1/3 right-1/4 w-96 h-96 bg-indigo-600/40 rounded-full mix-blend-multiply filter blur-[80px] opacity-70 animate-blob-fast animation-delay-2000"></div>
        <div class="absolute bottom-1/4 left-1/3 w-96 h-96 bg-pink-600/40 rounded-full mix-blend-multiply filter blur-[80px] opacity-70 animate-blob-fast animation-delay-4000"></div>
        <div class="absolute bottom-1/3 right-1/3 w-72 h-72 bg-blue-600/40 rounded-full mix-blend-multiply filter blur-[80px] opacity-70 animate-blob-fast animation-delay-6000"></div>
      </div>
    `;
};

// Global styles to include in layout
export const globalStyles = `
  ${animations.keyframes}
  ${animations.classes}
  ${components.styles}
`;

export default {
    colors,
    animations,
    components,
    createBackgroundBlobs,
    globalStyles,
}; 