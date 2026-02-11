
import React from 'react';
import { SchemeMatch } from '../types';

interface MatchResultsProps {
  matches: SchemeMatch[];
  onReset: () => void;
}

const MatchResults: React.FC<MatchResultsProps> = ({ matches, onReset }) => {
  const sortedMatches = [...matches].sort((a, b) => b.matchPercentage - a.matchPercentage);

  // Helper to identify women-focused schemes (could also be part of the Scheme type)
  const isWomenFocused = (id: string) => 
    ['lakhpati-didi', 'mahila-samman', 'pmmvy', 'sukanya-samriddhi', 'stand-up-india'].includes(id);

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Your Matches</h2>
          <p className="text-slate-500">We found {matches.filter(m => m.matchPercentage > 0).length} valid matches for your profile.</p>
        </div>
        <button 
          onClick={onReset}
          className="px-6 py-2 border border-slate-200 rounded-full text-slate-600 hover:bg-slate-50 transition-colors"
        >
          <i className="fas fa-undo mr-2"></i> Update Profile
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {sortedMatches.map((scheme) => (
          scheme.matchPercentage > 0 && (
            <div key={scheme.id} className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden flex flex-col group hover:shadow-md transition-all relative">
              {isWomenFocused(scheme.id) && (
                <div className="absolute top-4 right-20 z-10">
                   <span className="bg-pink-100 text-pink-600 text-[10px] font-bold px-2 py-1 rounded-full border border-pink-200 uppercase tracking-tighter">
                     <i className="fas fa-female mr-1"></i> Women Focused
                   </span>
                </div>
              )}
              
              <div className="p-6 flex-1">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1 pr-12">
                    <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">{scheme.provider}</span>
                    <h3 className="text-xl font-bold text-slate-900 mt-1">{scheme.name}</h3>
                  </div>
                  <div className={`px-4 py-2 rounded-xl flex flex-col items-center ${scheme.matchPercentage >= 80 ? 'bg-green-50 text-green-700' : 'bg-blue-50 text-blue-700'}`}>
                    <span className="text-lg font-bold">{scheme.matchPercentage}%</span>
                    <span className="text-[10px] uppercase font-bold opacity-70">Match</span>
                  </div>
                </div>

                <p className="text-slate-600 text-sm mb-4">{scheme.description}</p>

                <div className="bg-slate-50 p-4 rounded-xl mb-4">
                  <h4 className="text-xs font-bold text-slate-500 uppercase mb-2">Why this match?</h4>
                  <p className="text-sm text-slate-700 italic">"{scheme.reasoning}"</p>
                </div>

                {scheme.missingCriteria.length > 0 && (
                  <div className="mb-4">
                    <h4 className="text-xs font-bold text-slate-500 uppercase mb-2">Check these details:</h4>
                    <ul className="flex flex-wrap gap-2">
                      {scheme.missingCriteria.map((c, i) => (
                        <li key={i} className="text-[10px] bg-amber-50 text-amber-700 px-2 py-1 rounded border border-amber-100 flex items-center gap-1">
                          <i className="fas fa-info-circle"></i> {c}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="text-xs font-bold text-slate-500 uppercase mb-2">Benefits</h4>
                    <ul className="text-xs space-y-1">
                      {scheme.benefits.map((b, i) => (
                        <li key={i} className="flex items-start gap-1">
                          <i className="fas fa-check text-green-500 mt-0.5"></i>
                          {b}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-500 uppercase mb-2">Eligibility</h4>
                    <p className="text-xs text-slate-600 leading-relaxed">{scheme.eligibilitySummary}</p>
                  </div>
                </div>
              </div>

              <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
                <a 
                  href={scheme.officialLink} 
                  target="_blank" 
                  rel="noreferrer"
                  className="text-blue-600 font-bold text-sm hover:underline"
                >
                  Official Guidelines <i className="fas fa-external-link-alt text-[10px]"></i>
                </a>
                <button className="bg-blue-600 text-white px-6 py-2 rounded-lg text-sm font-bold shadow-sm hover:bg-blue-700 transition-colors">
                  Apply Now
                </button>
              </div>
            </div>
          )
        ))}
      </div>
    </div>
  );
};

export default MatchResults;
