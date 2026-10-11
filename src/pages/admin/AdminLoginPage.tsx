import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, KeyRound, ShieldAlert, CheckCircle2, ArrowRight } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';

export const AdminLoginPage: React.FC = () => {
  const [passcode, setPasscode] = useState('');
  const { login } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (login(passcode)) {
      showToast('Admin session authorized successfully.', 'success');
      navigate('/admin/dashboard');
    } else {
      showToast('Invalid administrative passcode. Please try again.', 'error');
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl relative">
        <div className="text-center mb-8">
          <div className="w-14 h-14 rounded-2xl bg-brand-500/10 border border-brand-500/20 text-brand-400 mx-auto flex items-center justify-center mb-4">
            <Lock className="w-7 h-7" />
          </div>
          <h1 className="text-2xl font-bold text-white tracking-tight font-display">
            Admin CMS Portal
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            InstaHoliday Solutions Content & Lead Management
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
              Passcode
            </label>
            <div className="relative">
              <KeyRound className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
              <input
                type="password"
                required
                placeholder="Enter admin passcode"
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                className="w-full text-xs pl-10 pr-3.5 py-3 bg-slate-800/80 border border-slate-700 text-white rounded-xl focus:ring-2 focus:ring-brand-500 focus:outline-none placeholder:text-slate-500"
              />
            </div>
            <p className="text-[11px] text-slate-500 mt-1.5">
              Default Preview Passcode: <code className="text-amber-400 bg-slate-800 px-1.5 py-0.5 rounded">admin@insta2026</code>
            </p>
          </div>

          <button
            type="submit"
            className="btn-primary w-full py-3 text-xs font-bold"
          >
            <span>Unlock Dashboard</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-slate-800 text-center">
          <a
            href="/"
            className="text-xs text-slate-400 hover:text-white transition-colors"
          >
            ← Back to Public Website
          </a>
        </div>
      </div>
    </div>
  );
};
