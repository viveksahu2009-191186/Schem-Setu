
import React, { useState } from 'react';
import { UserProfile, Category, Occupation, Gender } from '../types';

interface ProfileFormProps {
  onSubmit: (profile: UserProfile) => void;
  isLoading: boolean;
}

const ProfileForm: React.FC<ProfileFormProps> = ({ onSubmit, isLoading }) => {
  const [formData, setFormData] = useState<UserProfile>({
    fullName: '',
    age: 25,
    gender: 'Male',
    state: 'Maharashtra',
    district: '',
    category: 'General',
    occupation: 'Farmer',
    annualIncome: 150000,
    landHolding: 0,
    isDisabled: false
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const val = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;
    setFormData(prev => ({ ...prev, [name]: val }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden max-w-2xl mx-auto">
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-6 text-white">
        <h2 className="text-2xl font-bold">Build Your Profile</h2>
        <p className="opacity-90 text-sm mt-1">We'll use this data to find schemes specifically for you.</p>
      </div>

      <form onSubmit={handleSubmit} className="p-8 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-1">
            <label className="text-sm font-semibold text-slate-700">Full Name</label>
            <input
              required
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="e.g. Rahul Sharma"
              className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all"
            />
          </div>

          <div className="space-y-1">
            <label className="text-sm font-semibold text-slate-700">Gender</label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg outline-none"
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div className="space-y-1">
            <label className="text-sm font-semibold text-slate-700">Age</label>
            <input
              required
              type="number"
              name="age"
              value={formData.age}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          <div className="space-y-1">
            <label className="text-sm font-semibold text-slate-700">Occupation</label>
            <select
              name="occupation"
              value={formData.occupation}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg outline-none"
            >
              <option value="Farmer">Farmer</option>
              <option value="Small Business Owner">Small Business Owner</option>
              <option value="Student">Student</option>
              <option value="Artisan">Artisan / Weaver</option>
              <option value="Unemployed">Unemployed</option>
            </select>
          </div>

          <div className="space-y-1">
            <label className="text-sm font-semibold text-slate-700">Caste Category</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg outline-none"
            >
              <option value="General">General</option>
              <option value="OBC">OBC</option>
              <option value="SC">SC</option>
              <option value="ST">ST</option>
              <option value="EWS">EWS</option>
            </select>
          </div>

          <div className="space-y-1">
            <label className="text-sm font-semibold text-slate-700">Annual Income (₹)</label>
            <input
              type="number"
              name="annualIncome"
              value={formData.annualIncome}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg outline-none"
            />
          </div>

          <div className="space-y-1">
            <label className="text-sm font-semibold text-slate-700">Land Holding (Acres)</label>
            <input
              type="number"
              step="0.1"
              name="landHolding"
              value={formData.landHolding}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg outline-none"
            />
          </div>
        </div>

        <div className="flex items-center gap-2">
            <input 
                type="checkbox" 
                name="isDisabled" 
                checked={formData.isDisabled} 
                onChange={handleChange}
                id="isDisabled"
                className="w-4 h-4 text-blue-600 rounded"
            />
            <label htmlFor="isDisabled" className="text-sm text-slate-600">Person with Disability (Divyangjan)</label>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl transition-all flex items-center justify-center gap-2 disabled:opacity-50"
        >
          {isLoading ? (
            <>
              <i className="fas fa-circle-notch fa-spin"></i>
              Analyzing Data...
            </>
          ) : (
            <>
              Find Matches <i className="fas fa-arrow-right"></i>
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default ProfileForm;
