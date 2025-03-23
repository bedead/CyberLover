'use client';

export default function NaughtyLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen max-h-screen overflow-hidden">
      {/* Add naughty-specific styling */}
      <div className="fixed inset-0 -z-10 bg-black opacity-90"></div>
      <div className="fixed top-0 right-0 -z-10 h-72 w-72 rounded-full blur-3xl bg-gradient-to-br from-red-500 to-pink-500 opacity-20"></div>
      <div className="fixed bottom-0 left-0 -z-10 h-72 w-72 rounded-full blur-3xl bg-gradient-to-br from-red-500 to-pink-500 opacity-20"></div>
      
      {children}
    </div>
  );
} 