import React, { useState } from 'react';

interface MarketWeatherModalProps {
  initialTab?: 'market' | 'weather';
  onClose: () => void;
}

export const MarketWeatherModal: React.FC<MarketWeatherModalProps> = ({
  initialTab = 'market',
  onClose
}) => {
  const [tab, setTab] = useState<'market' | 'weather'>(initialTab);

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white border border-[#1a1a1a] max-w-lg w-full p-6 space-y-4 shadow-2xl relative">
        <div className="flex justify-between items-center border-b border-[#1a1a1a] pb-2">
          <div className="flex space-x-3 text-xs font-sans font-bold">
            <button
              onClick={() => setTab('market')}
              className={`px-3 py-1 cursor-pointer uppercase tracking-wider ${
                tab === 'market' ? 'bg-[#1a1a1a] text-white' : 'text-[#1a1a1a] hover:bg-[#F5F5F5]'
              }`}
            >
              European & Global Markets
            </button>
            <button
              onClick={() => setTab('weather')}
              className={`px-3 py-1 cursor-pointer uppercase tracking-wider ${
                tab === 'weather' ? 'bg-[#1a1a1a] text-white' : 'text-[#1a1a1a] hover:bg-[#F5F5F5]'
              }`}
            >
              European Weather
            </button>
          </div>
          <button
            onClick={onClose}
            className="text-[#1a1a1a] hover:text-[#666] text-xl font-bold p-1 cursor-pointer"
            aria-label="Close"
          >
            ✕
          </button>
        </div>

        {tab === 'market' ? (
          <div className="space-y-4 font-sans text-xs">
            <div className="flex justify-between items-center text-[#666]">
              <span>Euronext & Global Benchmarks</span>
              <span>Updated 17:35 CET</span>
            </div>

            <div className="divide-y divide-[#E5E5E5] border border-[#E5E5E5]">
              {[
                { name: 'CAC 40 (Paris)', value: '7,642.18', change: '+31.95', pct: '+0.42%', up: true },
                { name: 'Euro Stoxx 50', value: '4,985.40', change: '+18.20', pct: '+0.37%', up: true },
                { name: 'DAX (Frankfurt)', value: '19,372.50', change: '+55.10', pct: '+0.28%', up: true },
                { name: 'EUR / USD', value: '1.0924', change: '+0.0018', pct: '+0.16%', up: true },
                { name: 'Brent Crude (North Sea)', value: '$78.45', change: '+0.92', pct: '+1.19%', up: true },
                { name: 'French 10-Yr OAT Bond', value: '3.02%', change: '-0.02', pct: '-0.65%', up: true }
              ].map((item) => (
                <div key={item.name} className="p-2.5 flex items-center justify-between hover:bg-[#FAF8F5]">
                  <div>
                    <span className="font-bold text-[#1a1a1a] block">{item.name}</span>
                    <span className="text-[0.6875rem] text-[#666]">Index Points</span>
                  </div>
                  <div className="text-right">
                    <span className="font-mono font-bold text-sm text-[#1a1a1a] block">{item.value}</span>
                    <span
                      className={`font-mono text-xs font-semibold ${
                        item.up ? 'text-[#107c41]' : 'text-[#c51118]'
                      }`}
                    >
                      {item.pct} ({item.change})
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-3 bg-[#FAF8F5] border border-[#E5E5E5] text-[0.6875rem] text-[#666] leading-relaxed">
              Quotes provided in collaboration with Euronext Paris and Dow Jones. Real-time for European indices; commodities delayed 15 minutes.
            </div>
          </div>
        ) : (
          <div className="space-y-4 font-sans text-xs">
            <div className="flex justify-between items-center text-[#666]">
              <span>Météo France Metropolitan Forecast</span>
              <span>Updated 12:00 CET</span>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {[
                { city: 'Paris', temp: '17°C / 63°F', cond: 'Partly Cloudy', icon: 'wb_cloudy', high: '19°C', low: '12°C' },
                { city: 'Lyon', temp: '19°C / 66°F', cond: 'Sunny spells', icon: 'wb_sunny', high: '21°C', low: '11°C' },
                { city: 'Marseille', temp: '22°C / 72°F', cond: 'Mistral & Sun', icon: 'air', high: '24°C', low: '15°C' },
                { city: 'Nice', temp: '23°C / 73°F', cond: 'Mediterranean Clear', icon: 'sunny', high: '25°C', low: '16°C' },
                { city: 'Bordeaux', temp: '18°C / 64°F', cond: 'Mild Breeze', icon: 'wb_cloudy', high: '20°C', low: '13°C' },
                { city: 'Brussels', temp: '15°C / 59°F', cond: 'Overcast', icon: 'cloud', high: '17°C', low: '10°C' }
              ].map((loc) => (
                <div key={loc.city} className="border border-[#E5E5E5] p-3 bg-white space-y-1 hover:bg-[#FAF8F5]">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-[#1a1a1a] text-sm">{loc.city}</span>
                    <span className="material-symbols-outlined text-base text-[#555]">{loc.icon}</span>
                  </div>
                  <span className="text-lg font-serif font-bold text-[#1a1a1a] block">{loc.temp}</span>
                  <span className="text-[0.6875rem] text-[#666] block">{loc.cond}</span>
                  <span className="text-[0.625rem] text-[#888] block">H: {loc.high} · L: {loc.low}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
