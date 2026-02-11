
import React, { useState } from 'react';
import { searchNewSchemes } from '../services/geminiService';
import { UserProfile } from '../types';

interface AISearchProps {
    profile: UserProfile | null;
}

const AISearch: React.FC<AISearchProps> = ({ profile }) => {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState<{ text: string; sources: any[] } | null>(null);
    const [loading, setLoading] = useState(false);

    const handleSearch = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!query.trim() || !profile) return;
        setLoading(true);
        try {
            const res = await searchNewSchemes(query, profile);
            setResults(res);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 mt-12">
            <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                <i className="fas fa-search text-blue-500"></i>
                Can't find a specific scheme? Ask AI
            </h3>
            <form onSubmit={handleSearch} className="flex gap-2 mb-6">
                <input 
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="e.g. Subsidy for tractors in Chhattisgarh..."
                    className="flex-1 px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button 
                    disabled={loading || !profile}
                    type="submit"
                    className="bg-slate-900 text-white px-6 py-3 rounded-xl font-bold disabled:opacity-50"
                >
                    {loading ? <i className="fas fa-spinner fa-spin"></i> : 'Ask'}
                </button>
            </form>

            {results && (
                <div className="bg-blue-50 rounded-xl p-6 border border-blue-100 animate-in fade-in duration-300">
                    <div className="prose prose-slate prose-sm max-w-none mb-4">
                        {results.text.split('\n').map((line, i) => (
                            <p key={i} className="mb-2 text-slate-700 leading-relaxed">{line}</p>
                        ))}
                    </div>
                    {results.sources.length > 0 && (
                        <div>
                            <h4 className="text-xs font-bold text-slate-500 uppercase mb-2">Sources Found:</h4>
                            <div className="flex flex-wrap gap-2">
                                {results.sources.map((src, i) => (
                                    <a 
                                        key={i} 
                                        href={src.web?.uri} 
                                        target="_blank" 
                                        rel="noreferrer"
                                        className="text-[10px] bg-white text-blue-600 px-2 py-1 rounded border border-blue-200 hover:bg-blue-600 hover:text-white transition-colors"
                                    >
                                        {src.web?.title || 'External Source'}
                                    </a>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default AISearch;
