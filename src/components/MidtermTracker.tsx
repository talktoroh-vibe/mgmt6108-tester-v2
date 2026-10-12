import React, { useState } from 'react';

interface FrenchPoliticsTrackerProps {
  onOpenDetails?: () => void;
}

export const MidtermTracker: React.FC<FrenchPoliticsTrackerProps> = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div className="p-3 bg-[#FAF8F5] border border-[#E5E5E5] space-y-2">
        <span className="text-[0.6875rem] font-sans uppercase font-bold text-[#1a1a1a] block tracking-wider">
          PARLIAMENTARY BAROMETER
        </span>
        <p className="text-sm font-serif font-bold text-[#1a1a1a]">Palais Bourbon Majority Watch</p>
        
        {/* Parliamentary Balance Strip */}
        <div className="grid grid-cols-3 gap-1.5 text-xs font-sans pt-1">
          <div className="border border-[#E5E5E5] p-2 bg-white text-center">
            <span className="block text-[#666] font-bold text-[0.625rem] truncate">LEFT (NFP)</span>
            <span className="text-base font-serif font-bold text-[#1a1a1a]">193</span>
            <span className="text-[#855B00] text-[0.625rem] font-semibold block">Plurality</span>
          </div>
          <div className="border border-[#E5E5E5] p-2 bg-white text-center">
            <span className="block text-[#666] font-bold text-[0.625rem] truncate">CENTRE</span>
            <span className="text-base font-serif font-bold text-[#1a1a1a]">166</span>
            <span className="text-[#666] text-[0.625rem] font-semibold block">Coalition</span>
          </div>
          <div className="border border-[#E5E5E5] p-2 bg-white text-center">
            <span className="block text-[#666] font-bold text-[0.625rem] truncate">RIGHT (RN)</span>
            <span className="text-base font-serif font-bold text-[#1a1a1a]">142</span>
            <span className="text-[#666] text-[0.625rem] font-semibold block">Opposition</span>
          </div>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="w-full text-xs font-sans text-[#1a1a1a] hover:underline pt-1 text-center font-semibold cursor-pointer flex items-center justify-center space-x-1"
        >
          <span>See National Assembly seat breakdown</span>
          <span className="text-xs">›</span>
        </button>
      </div>

      {/* Parliamentary Detailed Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
          <div className="bg-white max-w-xl w-full p-6 border border-[#1a1a1a] space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-start border-b border-[#1a1a1a] pb-3">
              <div>
                <span className="text-[0.6875rem] uppercase font-bold tracking-widest text-[#c51118] font-sans">
                  French Institutional Analysis
                </span>
                <h3 className="text-2xl font-serif font-bold text-[#1a1a1a]">
                  National Assembly: The 577 Seats of the Palais Bourbon
                </h3>
                <p className="text-xs text-[#666] font-sans mt-0.5">
                  Composition and voting dynamics following parliamentary elections
                </p>
              </div>
              <button
                onClick={() => setShowModal(false)}
                className="text-[#1a1a1a] hover:text-[#666] p-1 font-bold text-xl cursor-pointer"
                aria-label="Close"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4 font-sans text-xs">
              <div className="bg-[#FAF8F5] p-3 border border-[#E5E5E5]">
                <h4 className="font-bold text-sm mb-2 text-[#1a1a1a]">Majority Threshold: 289 Seats</h4>
                <div className="flex h-5 rounded-none overflow-hidden border border-[#E5E5E5]">
                  <div className="bg-[#b91c1c] text-white flex items-center justify-center font-bold text-[0.625rem]" style={{ width: '33.4%' }} title="NFP (193)">
                    NFP 193
                  </div>
                  <div className="bg-[#eab308] text-black flex items-center justify-center font-bold text-[0.625rem]" style={{ width: '28.8%' }} title="Ensemble (166)">
                    Center 166
                  </div>
                  <div className="bg-[#1e40af] text-white flex items-center justify-center font-bold text-[0.625rem]" style={{ width: '8.1%' }} title="LR (47)">
                    LR 47
                  </div>
                  <div className="bg-[#1e293b] text-white flex items-center justify-center font-bold text-[0.625rem]" style={{ width: '24.6%' }} title="RN (142)">
                    RN 142
                  </div>
                  <div className="bg-[#94a3b8] text-white flex items-center justify-center font-bold text-[0.625rem]" style={{ width: '5.1%' }} title="Others (29)">
                    29
                  </div>
                </div>
                <div className="flex justify-between text-[0.6875rem] text-[#666] mt-1.5">
                  <span>No single bloc holds an absolute majority</span>
                  <span className="font-semibold text-[#1a1a1a]">Consensus required for budgetary passage</span>
                </div>
              </div>

              <div>
                <h4 className="font-bold text-sm mb-2 text-[#1a1a1a] font-serif">Key Parliamentary Blocs</h4>
                <div className="divide-y divide-[#E5E5E5] border border-[#E5E5E5]">
                  {[
                    { group: 'Nouveau Front Populaire (LFI, PS, Ecologists, PCF)', seats: 193, stance: 'Opposition / Alternative', lead: 'Left coalition' },
                    { group: 'Ensemble pour la République (Renaissance, MoDem, Horizons)', seats: 166, stance: 'Presidential Camp', lead: 'Center-Right' },
                    { group: 'Rassemblement National & Allied Deputies', seats: 142, stance: 'Opposition', lead: 'Far-right bloc' },
                    { group: 'Droite Républicaine (Les Républicains)', seats: 47, stance: 'Pivotal Majority Partner', lead: 'Traditional conservative' },
                    { group: 'LIOT & Independent Centrists', seats: 29, stance: 'Cross-bench swing votes', lead: 'Regional & Overseas' }
                  ].map((row) => (
                    <div key={row.group} className="p-2.5 flex items-center justify-between hover:bg-[#FAF8F5]">
                      <div>
                        <span className="font-bold text-[#1a1a1a] block">{row.group}</span>
                        <span className="text-[0.625rem] text-[#666]">{row.stance}</span>
                      </div>
                      <div className="text-right">
                        <span className="font-serif font-bold text-sm text-[#1a1a1a]">{row.seats} seats</span>
                        <span className="block text-[0.625rem] text-[#855B00]">{row.lead}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-1 text-[#666] text-[0.6875rem] leading-relaxed">
                * Analysis provided by Le Monde’s political bureau in Paris. Updates reflect certified parliamentary registrations at the Palais Bourbon.
              </div>
            </div>

            <div className="border-t border-[#E5E5E5] pt-3 flex justify-end">
              <button
                onClick={() => setShowModal(false)}
                className="bg-[#1a1a1a] text-white px-4 py-2 text-xs font-bold uppercase tracking-wider hover:bg-[#333] cursor-pointer"
              >
                Close Barometer
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
