'use client';

import { useState } from 'react';

export default function Home() {
  const [formData, setFormData] = useState({
    lead_name: '',
    company: '',
    email: '',
    phone: '',
    industry: 'Technology',
    message: '',
    source: 'Web Form',
  });

  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    try {
      const response = await fetch('/api/lead', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus('success');
        setFormData({
          lead_name: '',
          company: '',
          email: '',
          phone: '',
          industry: 'Technology',
          message: '',
          source: 'Web Form',
        });
        
        setTimeout(() => setStatus('idle'), 5000);
      } else {
        setStatus('error');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setStatus('error');
    }
  };

  return (
    <div className="h-screen overflow-hidden bg-[#FBF9F5] font-sans selection:bg-amber-100 selection:text-amber-900 text-stone-800 flex flex-col">
      {/* Navigation Header */}
      <header className="bg-white/80 backdrop-blur-md py-3 shadow-sm border-b border-stone-200/80 flex-shrink-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-gradient-to-br from-amber-600 to-orange-700 rounded-xl flex items-center justify-center shadow-md">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
            </div>
            <div>
              <h1 className="text-lg font-bold tracking-tight text-stone-900 leading-tight">
                ClientBridge <span className="text-amber-700 font-medium text-xs">AI</span>
              </h1>
              <p className="text-stone-500 text-[10px] font-semibold tracking-widest uppercase">
                Smart CRM Synchronizer
              </p>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <div className="hidden md:flex items-center gap-6 text-xs font-medium text-stone-600">
              <span className="hover:text-amber-700 cursor-pointer transition-colors"></span>
              <span className="hover:text-amber-700 cursor-pointer transition-colors"></span>
              <span className="hover:text-amber-700 cursor-pointer transition-colors"></span>
            </div>
            <div className="text-right bg-stone-100/80 px-3 py-1.5 rounded-xl border border-stone-200/60">
              <p className="font-bold text-xs text-stone-900 leading-none">Sulisumen Peter</p>
              <p className="text-amber-700 text-[9px] font-mono tracking-wider mt-0.5">#IT_Preacher</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Container locked to viewport height */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-full items-stretch">
          
          {/* Form Container */}
          <div className="lg:col-span-5 bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl shadow-stone-200/40 border border-stone-200/70 p-6 flex flex-col justify-between overflow-y-auto">
            <div>
              <div className="mb-4">
                <h2 className="text-xl font-bold text-stone-900">Capture New Lead</h2>
                <p className="text-stone-500 text-xs mt-1">Enter the prospect's details below to automatically route them through the AI CRM pipeline.</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-3.5">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[10px] font-bold text-stone-600 uppercase tracking-wider mb-1">Full Name</label>
                    <input required type="text" name="lead_name" value={formData.lead_name} onChange={handleChange} className="w-full px-3 py-2 bg-stone-50/80 border border-stone-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-amber-500/20 focus:border-amber-600 outline-none text-stone-800 text-xs" placeholder="John Doe" />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-stone-600 uppercase tracking-wider mb-1">Company</label>
                    <input required type="text" name="company" value={formData.company} onChange={handleChange} className="w-full px-3 py-2 bg-stone-50/80 border border-stone-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-amber-500/20 focus:border-amber-600 outline-none text-stone-800 text-xs" placeholder="Acme Corp" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[10px] font-bold text-stone-600 uppercase tracking-wider mb-1">Email Address</label>
                    <input required type="email" name="email" value={formData.email} onChange={handleChange} className="w-full px-3 py-2 bg-stone-50/80 border border-stone-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-amber-500/20 focus:border-amber-600 outline-none text-stone-800 text-xs" placeholder="john@acme.com" />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-stone-600 uppercase tracking-wider mb-1">Phone Number</label>
                    <input required type="tel" name="phone" value={formData.phone} onChange={handleChange} className="w-full px-3 py-2 bg-stone-50/80 border border-stone-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-amber-500/20 focus:border-amber-600 outline-none text-stone-800 text-xs" placeholder="+1 234 567" />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-stone-600 uppercase tracking-wider mb-1">Industry</label>
                  <select name="industry" value={formData.industry} onChange={handleChange} className="w-full px-3 py-2 bg-stone-50/80 border border-stone-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-amber-500/20 focus:border-amber-600 outline-none text-stone-800 text-xs cursor-pointer">
                    <option value="Technology">Technology</option>
                    <option value="Logistics">Logistics</option>
                    <option value="Real Estate">Real Estate</option>
                    <option value="Finance">Finance</option>
                    <option value="Healthcare">Healthcare</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-stone-600 uppercase tracking-wider mb-1">Message / Request</label>
                  <textarea required name="message" value={formData.message} onChange={handleChange} rows={2} className="w-full px-3 py-2 bg-stone-50/80 border border-stone-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-amber-500/20 focus:border-amber-600 outline-none text-stone-800 text-xs resize-none" placeholder="Enter requirements..."></textarea>
                </div>

                <button 
                  type="submit" 
                  disabled={status === 'loading'}
                  className={`w-full py-2.5 px-4 rounded-xl text-white font-bold text-xs tracking-wide shadow-md transition-all flex justify-center items-center gap-2 ${
                    status === 'loading' ? 'bg-amber-400 cursor-not-allowed' : 'bg-gradient-to-r from-amber-700 to-orange-600 hover:from-amber-800 hover:to-orange-700 active:scale-[0.98]'
                  }`}
                >
                  {status === 'loading' ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Processing Data...
                    </>
                  ) : 'Submit Lead'}
                </button>
              </form>
            </div>

            {/* Status alerts neatly nested at the bottom */}
            <div className="mt-3">
              {status === 'success' && (
                <div className="p-3 bg-emerald-50 text-emerald-800 rounded-xl border border-emerald-200/50 flex items-center gap-2 animate-pulse">
                  <div className="bg-emerald-100 p-1.5 rounded-full">
                    <svg className="w-4 h-4 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                  </div>
                  <p className="text-xs font-semibold">Lead captured! AI processing initiated.</p>
                </div>
              )}
              {status === 'error' && (
                <div className="p-3 bg-red-50 text-red-800 rounded-xl border border-red-200/50 flex items-center gap-2">
                  <div className="bg-red-100 p-1.5 rounded-full">
                    <svg className="w-4 h-4 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                  </div>
                  <p className="text-xs font-semibold">System Error: Unable to route lead.</p>
                </div>
              )}
            </div>
          </div>

          {/* Right Status / Preview Panel */}
          <div className="lg:col-span-7 flex flex-col h-full">
            <div className="bg-stone-900 rounded-2xl shadow-2xl overflow-hidden border border-stone-800 h-full flex flex-col relative">
              <div className="bg-stone-950 px-5 py-3 flex justify-between items-center border-b border-stone-800/80">
                <div className="flex items-center gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-stone-800"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-stone-800"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-stone-800"></div>
                </div>
                <div className="flex items-center gap-2 text-stone-400">
                  <div className="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></div>
                  <span className="font-mono text-[10px] tracking-widest uppercase">System Online</span>
                </div>
              </div>
              
              <div className="p-8 flex-grow flex flex-col items-center justify-center text-center relative overflow-hidden bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-950/30 via-stone-900 to-stone-950">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:24px_24px]"></div>
                
                <div className="z-10 max-w-sm flex flex-col items-center">
                  <div className="w-14 h-14 mb-4 rounded-full bg-stone-800/80 border border-stone-700/60 flex items-center justify-center shadow-inner">
                    <svg className="w-7 h-7 text-amber-500/80" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"></path></svg>
                  </div>
                  <h3 className="text-lg font-bold text-stone-200 mb-1.5">System Online</h3>
                  <p className="text-stone-400 text-xs leading-relaxed">
                    Inbound submissions will automatically route through the processor and appear in your secure workspace.
                  </p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}
