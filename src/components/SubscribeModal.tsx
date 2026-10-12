import React, { useState } from 'react';

interface SubscribeModalProps {
  onClose: () => void;
}

export const SubscribeModal: React.FC<SubscribeModalProps> = ({ onClose }) => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white border border-[#1a1a1a] max-w-md w-full p-6 space-y-4 shadow-2xl relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-[#1a1a1a] hover:text-[#666] text-xl font-bold p-1 cursor-pointer"
          aria-label="Close"
        >
          ✕
        </button>

        {!submitted ? (
          <div className="space-y-4">
            <div className="text-center space-y-1">
              <span className="text-[0.6875rem] font-sans font-bold uppercase tracking-widest text-[#855B00]">
                Special Introductory Offer
              </span>
              <div className="flex items-baseline justify-center space-x-2 pt-1">
                <span
                  style={{ fontFamily: '"UnifrakturMaguntia", serif' }}
                  className="text-3xl text-[#1a1a1a]"
                >
                  Le Monde
                </span>
                <span className="text-lg font-serif italic text-[#666]">in English</span>
              </div>
              <p className="text-sm font-serif text-[#444] pt-1">
                Unlimited access to France’s newspaper of record. Independent journalism, investigative reports, and European geopolitics.
              </p>
            </div>

            <div className="bg-[#FFF9DB] p-4 border border-[#F0D680] text-center space-y-1">
              <div className="text-3xl font-bold font-serif text-[#1a1a1a]">
                €1 <span className="text-sm font-sans font-normal text-[#666]">/ for the first month</span>
              </div>
              <p className="text-xs font-sans text-[#666]">Then €9.99/month. No commitment, cancel anytime.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3 font-sans">
              <div>
                <label className="block text-xs font-bold text-[#1a1a1a] uppercase tracking-wider mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full border border-[#1a1a1a] p-2.5 text-sm outline-none bg-white text-[#1a1a1a]"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-[#fed000] hover:bg-[#e5bc00] text-[#1a1a1a] font-bold py-3 text-xs uppercase tracking-widest transition-colors cursor-pointer"
              >
                Start Your Subscription for €1
              </button>
            </form>

            <ul className="text-xs font-sans text-[#555] space-y-1.5 pt-2">
              <li className="flex items-center space-x-2">
                <span className="material-symbols-outlined text-sm text-[#107c41]">check</span>
                <span>Full access to Le Monde in English & French digital edition</span>
              </li>
              <li className="flex items-center space-x-2">
                <span className="material-symbols-outlined text-sm text-[#107c41]">check</span>
                <span>Daily digital broadsheet replica from 2:00 PM CET</span>
              </li>
              <li className="flex items-center space-x-2">
                <span className="material-symbols-outlined text-sm text-[#107c41]">check</span>
                <span>Ad-free browsing and offline reading on mobile apps</span>
              </li>
              <li className="flex items-center space-x-2">
                <span className="material-symbols-outlined text-sm text-[#107c41]">check</span>
                <span>Exclusive newsletters and subscriber audio podcasts</span>
              </li>
            </ul>
          </div>
        ) : (
          <div className="py-8 text-center space-y-3 font-sans">
            <span className="material-symbols-outlined text-4xl text-[#107c41]">check_circle</span>
            <h4 className="text-2xl font-serif font-bold text-[#1a1a1a]">Welcome to Le Monde</h4>
            <p className="text-sm font-serif text-[#444]">
              A verification link and onboarding access have been sent to <strong>{email}</strong>.
            </p>
            <button
              onClick={onClose}
              className="mt-4 bg-[#1a1a1a] text-white px-6 py-2 text-xs font-bold uppercase tracking-wider hover:bg-[#333] cursor-pointer"
            >
              Start Reading
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
