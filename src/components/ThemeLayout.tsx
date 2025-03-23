import { ReactNode } from 'react';
import { globalStyles, createBackgroundBlobs } from '@/styles/theme';

interface ThemeLayoutProps {
  children: ReactNode;
  withBlobs?: boolean;
  className?: string;
  fixedHeight?: boolean;
}

export default function ThemeLayout({ 
  children, 
  withBlobs = true, 
  className = '',
  fixedHeight = false
}: ThemeLayoutProps) {
  // Different styling based on whether we need fixed height for chat or scrollable for landing page
  if (fixedHeight) {
    // Chat interface - fixed height, no scroll on container
    return (
      <div className={`min-h-screen max-h-screen overflow-hidden flex flex-col bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900 ${className}`}>
        {/* Animated background blobs */}
        {withBlobs && (
          <div className="fixed inset-0 -z-10" dangerouslySetInnerHTML={{ __html: createBackgroundBlobs() }} />
        )}

        {/* Main content - full height flex container */}
        <div className="relative z-10 w-full h-full flex flex-col">
          {children}
        </div>

        <style jsx global>{globalStyles}</style>
      </div>
    );
  } else {
    // Landing page - scrollable
    return (
      <div className={`min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900 ${className}`}>
        {/* Fixed background blobs */}
        {withBlobs && (
          <div className="fixed inset-0 -z-10" dangerouslySetInnerHTML={{ __html: createBackgroundBlobs() }} />
        )}

        {/* Scrollable content with padding */}
        <div className="relative z-10 w-full">
          {children}
        </div>

        <style jsx global>{globalStyles}</style>
      </div>
    );
  }
} 