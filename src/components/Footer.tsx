import React from 'react';
import { Category } from '../types';

interface FooterProps {
  onSelectCategory: (cat: Category | 'All') => void;
}

export const Footer: React.FC<FooterProps> = ({ onSelectCategory }) => {
  return (
    <footer className="w-full bg-[#FFFFFF] border-t-2 border-[#1a1a1a] pt-8 pb-12 mt-12 text-[#1a1a1a]">
      <div className="w-full max-w-7xl mx-auto px-4 space-y-8">
        {/* Footer Brand Logo & Tagline */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-[#E5E5E5] pb-6 gap-4">
          <div>
            <div className="flex items-baseline space-x-2">
              <span
                style={{ fontFamily: '"UnifrakturMaguntia", serif' }}
                className="text-4xl sm:text-5xl tracking-tight text-[#1a1a1a] select-none"
              >
                Le Monde
              </span>
              <span className="text-xl font-serif italic text-[#666]">in English</span>
            </div>
            <p className="text-xs font-sans text-[#666] mt-1">
              Independent journalism, curated and translated from Paris for an international readership.
            </p>
          </div>

          <div className="flex items-center space-x-3 text-xs font-sans font-semibold">
            <span className="bg-[#fed000] text-[#1a1a1a] px-3 py-1.5 font-bold tracking-wider uppercase">
              Subscribe from €1 / month
            </span>
            <span className="text-xs text-[#666]">Cancel anytime</span>
          </div>
        </div>

        {/* 5-Column Editorial Directory */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-6 text-xs font-sans">
          <div>
            <h4 className="font-bold text-[#1a1a1a] uppercase tracking-wider mb-2.5 pb-1 border-b border-[#E5E5E5]">
              News & Europe
            </h4>
            <ul className="space-y-1.5 text-[#555]">
              <li>
                <button onClick={() => onSelectCategory('International')} className="hover:underline hover:text-black">
                  International
                </button>
              </li>
              <li>
                <button onClick={() => onSelectCategory('France')} className="hover:underline hover:text-black">
                  France & Politics
                </button>
              </li>
              <li>
                <button onClick={() => onSelectCategory('Economy')} className="hover:underline hover:text-black">
                  Economy & Business
                </button>
              </li>
              <li>
                <button onClick={() => onSelectCategory('Environment')} className="hover:underline hover:text-black">
                  Environment & Climate
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-[#1a1a1a] uppercase tracking-wider mb-2.5 pb-1 border-b border-[#E5E5E5]">
              Culture & Society
            </h4>
            <ul className="space-y-1.5 text-[#555]">
              <li>
                <button onClick={() => onSelectCategory('Culture')} className="hover:underline hover:text-black">
                  Cinema & Arts
                </button>
              </li>
              <li>
                <button onClick={() => onSelectCategory('Society')} className="hover:underline hover:text-black">
                  Society & Heritage
                </button>
              </li>
              <li>
                <button onClick={() => onSelectCategory('Culture')} className="hover:underline hover:text-black">
                  Gastronomy & Wine
                </button>
              </li>
              <li>
                <button onClick={() => onSelectCategory('Sports')} className="hover:underline hover:text-black">
                  Sports
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-[#1a1a1a] uppercase tracking-wider mb-2.5 pb-1 border-b border-[#E5E5E5]">
              Opinions & Debates
            </h4>
            <ul className="space-y-1.5 text-[#555]">
              <li>
                <button onClick={() => onSelectCategory('Opinion')} className="hover:underline hover:text-black">
                  Editorials
                </button>
              </li>
              <li>
                <button onClick={() => onSelectCategory('Opinion')} className="hover:underline hover:text-black">
                  Columnists (Alain Frachon)
                </button>
              </li>
              <li>
                <button onClick={() => onSelectCategory('Opinion')} className="hover:underline hover:text-black">
                  European Thinkers
                </button>
              </li>
              <li>
                <button onClick={() => onSelectCategory('Opinion')} className="hover:underline hover:text-black">
                  Letters to the Editor
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-[#1a1a1a] uppercase tracking-wider mb-2.5 pb-1 border-b border-[#E5E5E5]">
              Digital Services
            </h4>
            <ul className="space-y-1.5 text-[#555]">
              <li>
                <button onClick={() => onSelectCategory('Podcasts')} className="hover:underline hover:text-black">
                  Audio & Podcasts
                </button>
              </li>
              <li>
                <button onClick={() => onSelectCategory('Games')} className="hover:underline hover:text-black">
                  Mots Croisés & Games
                </button>
              </li>
              <li>
                <span className="hover:underline hover:text-black cursor-pointer">
                  Today’s Paper (L’Édition du Jour)
                </span>
              </li>
              <li>
                <span className="hover:underline hover:text-black cursor-pointer">
                  Newsletters
                </span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-[#1a1a1a] uppercase tracking-wider mb-2.5 pb-1 border-b border-[#E5E5E5]">
              Groupe Le Monde
            </h4>
            <ul className="space-y-1.5 text-[#555]">
              <li>
                <span className="hover:underline hover:text-black cursor-pointer">
                  Courrier International
                </span>
              </li>
              <li>
                <span className="hover:underline hover:text-black cursor-pointer">
                  Télérama
                </span>
              </li>
              <li>
                <span className="hover:underline hover:text-black cursor-pointer">
                  La Vie
                </span>
              </li>
              <li>
                <span className="hover:underline hover:text-black cursor-pointer">
                  Le HuffPost
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Corporate & Legal Footer Strip */}
        <div className="pt-6 border-t border-[#E5E5E5] flex flex-col md:flex-row justify-between items-center text-xs font-sans text-[#777] gap-3">
          <div className="flex flex-wrap gap-4 justify-center md:justify-start">
            <span className="hover:underline cursor-pointer">Editorial Independence Charter</span>
            <span className="hover:underline cursor-pointer">Terms of Service</span>
            <span className="hover:underline cursor-pointer">Privacy & Cookies</span>
            <span className="hover:underline cursor-pointer">Legal Mentions</span>
            <span className="hover:underline cursor-pointer">Contact the Newsroom</span>
          </div>
          <p>© 2026 Le Monde.fr — All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};
