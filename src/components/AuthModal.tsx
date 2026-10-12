import React, { useState } from 'react';

interface AuthModalProps {
  onClose: () => void;
  onLoginSuccess?: (email: string) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ onClose, onLoginSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setLoggedIn(true);
      if (onLoginSuccess) onLoginSuccess(email);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white border border-[#1a1a1a] max-w-sm w-full p-6 space-y-4 shadow-2xl relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-[#1a1a1a] hover:text-[#666] text-xl font-bold p-1 cursor-pointer"
          aria-label="Close"
        >
          ✕
        </button>

        {!loggedIn ? (
          <div className="space-y-4 font-sans">
            <div className="text-center space-y-1">
              <div className="flex items-baseline justify-center space-x-1.5 pb-1">
                <span
                  style={{ fontFamily: '"UnifrakturMaguntia", serif' }}
                  className="text-2xl text-[#1a1a1a]"
                >
                  Le Monde
                </span>
                <span className="text-sm font-serif italic text-[#666]">Mon Compte</span>
              </div>
              <h3 className="text-xl font-serif font-bold text-[#1a1a1a]">
                Log In to Your Subscriber Account
              </h3>
              <p className="text-xs text-[#666]">
                Access your subscriptions, saved articles, and subscriber-only investigations.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-[#1a1a1a] uppercase tracking-wider mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full border border-[#1a1a1a] p-2.5 text-xs text-[#1a1a1a] outline-none bg-white"
                />
              </div>

              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="block text-xs font-bold text-[#1a1a1a] uppercase tracking-wider">
                    Password
                  </label>
                  <span className="text-[0.625rem] text-[#1a1a1a] hover:underline cursor-pointer">
                    Forgot password?
                  </span>
                </div>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full border border-[#1a1a1a] p-2.5 text-xs text-[#1a1a1a] outline-none bg-white"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-[#1a1a1a] hover:bg-[#333] text-white font-bold py-2.5 text-xs uppercase tracking-widest transition-colors cursor-pointer"
              >
                Log In
              </button>
            </form>

            <div className="relative py-2 text-center text-xs text-[#777]">
              <span className="bg-white px-2 relative z-10">or quick access</span>
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-[#E5E5E5]" />
              </div>
            </div>

            <button
              onClick={() => {
                setLoggedIn(true);
                if (onLoginSuccess) onLoginSuccess('subscriber@lemonde.fr');
              }}
              className="w-full bg-[#FFF9DB] border border-[#F0D680] hover:bg-[#FFF3C2] text-[#855B00] font-bold py-2 text-xs transition-colors cursor-pointer flex items-center justify-center space-x-2"
            >
              <span>Demo Quick Sign In (Subscriber Access)</span>
            </button>
          </div>
        ) : (
          <div className="py-6 text-center space-y-3 font-sans">
            <span className="material-symbols-outlined text-4xl text-[#107c41]">check_circle</span>
            <h4 className="text-xl font-serif font-bold text-[#1a1a1a]">Connected</h4>
            <p className="text-xs text-[#555]">
              You are signed in as <strong>{email || 'subscriber@lemonde.fr'}</strong>.
            </p>
            <button
              onClick={onClose}
              className="bg-[#1a1a1a] text-white px-6 py-2 text-xs font-bold uppercase tracking-wider hover:bg-[#333] cursor-pointer"
            >
              Continue Reading
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
