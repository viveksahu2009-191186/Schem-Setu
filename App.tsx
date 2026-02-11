
import React, { useState } from 'react';
import Layout from './components/Layout';
import ProfileForm from './components/ProfileForm';
import MatchResults from './components/MatchResults';
import AISearch from './components/AISearch';
import { UserProfile, SchemeMatch } from './types';
import { matchSchemesWithAI } from './services/geminiService';

const App: React.FC = () => {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [matches, setMatches] = useState<SchemeMatch[]>([]);
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState<'form' | 'results'>('form');

  const handleProfileSubmit = async (newProfile: UserProfile) => {
    setLoading(true);
    setProfile(newProfile);
    
    try {
      const matchedResults = await matchSchemesWithAI(newProfile);
      setMatches(matchedResults);
      setStep('results');
    } catch (error) {
      alert("Something went wrong while matching. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setStep('form');
    setMatches([]);
  };

  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        {step === 'form' ? (
          <div className="space-y-12 py-10">
            <div className="text-center space-y-4">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-100 text-blue-700 text-xs font-bold uppercase tracking-wider">
                <span className="w-2 h-2 bg-blue-600 rounded-full animate-pulse"></span>
                AI-Powered GovTech
              </div>
              <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight">
                Get the Benefits You <span className="text-blue-600 italic underline decoration-blue-200">Deserve</span>.
              </h1>
              <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                Stop digging through 50-page PDFs. Scheme-Setu uses AI to match your profile to hundreds of Indian government loans, grants, and <span className="text-pink-600 font-semibold">Women-centric schemes (Ladies Yojana)</span> in seconds.
              </p>
            </div>
            
            <ProfileForm onSubmit={handleProfileSubmit} isLoading={loading} />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-12">
              <div className="bg-white p-6 rounded-2xl border border-slate-100 text-center">
                <div className="w-12 h-12 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center mx-auto mb-4 text-xl">
                  <i className="fas fa-user-check"></i>
                </div>
                <h3 className="font-bold mb-1">Privacy First</h3>
                <p className="text-sm text-slate-500">Your profile data is only used for real-time matching.</p>
              </div>
              <div className="bg-white p-6 rounded-2xl border border-slate-100 text-center">
                <div className="w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4 text-xl">
                  <i className="fas fa-female"></i>
                </div>
                <h3 className="font-bold mb-1">Ladies Yojana</h3>
                <p className="text-sm text-slate-500">Prioritized matching for women-only benefits and subsidies.</p>
              </div>
              <div className="bg-white p-6 rounded-2xl border border-slate-100 text-center">
                <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 text-xl">
                  <i className="fas fa-brain"></i>
                </div>
                <h3 className="font-bold mb-1">RAG Analysis</h3>
                <p className="text-sm text-slate-500">Our AI scans complex guidelines to ensure eligibility.</p>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <MatchResults matches={matches} onReset={reset} />
            <AISearch profile={profile} />
          </div>
        )}
      </div>
    </Layout>
  );
};

export default App;
