import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppStore } from '../../../store/appStore';
import { GeographyService, StateData, DistrictData, BlockData } from '../../../services/geographyService';

type SignupStep = 'identity' | 'location' | 'interests';

const Signup: React.FC = () => {
  const [step, setStep] = useState<SignupStep>('identity');
  const navigate = useNavigate();
  const setAuth = useAppStore((state) => state.setAuth);
  const updateLocation = useAppStore((state) => state.updateLocation);

  // Geographic Data Lists
  const [states, setStates] = useState<StateData[]>([]);
  const [districts, setDistricts] = useState<DistrictData[]>([]);
  const [blocks, setBlocks] = useState<BlockData[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Form States
  const [formData, setFormData] = useState({
    fullName: '',
    username: '',
    mobile: '',
    password: '',
    stateId: '',
    stateName: '',
    districtId: '',
    districtName: '',
    blockId: '',
    blockName: '',
    village: '',
    interests: [] as string[]
  });

  // Fetch States on Mount
  useEffect(() => {
    const fetchStates = async () => {
      const data = await GeographyService.getStates();
      setStates(data);
    };
    fetchStates();
  }, []);

  // Fetch Districts when State changes
  useEffect(() => {
    if (formData.stateId) {
      const fetchDistricts = async () => {
        setIsLoading(true);
        const data = await GeographyService.getDistricts(formData.stateId);
        setDistricts(data);
        setIsLoading(false);
      };
      fetchDistricts();
    } else {
      setDistricts([]);
    }
  }, [formData.stateId]);

  // Fetch Blocks when District changes
  useEffect(() => {
    if (formData.districtId) {
      const fetchBlocks = async () => {
        setIsLoading(true);
        const data = await GeographyService.getBlocks(formData.districtId);
        setBlocks(data);
        setIsLoading(false);
      };
      fetchBlocks();
    } else {
      setBlocks([]);
    }
  }, [formData.districtId]);

  const handleNext = () => {
    if (step === 'identity') setStep('location');
    else if (step === 'location') setStep('interests');
    else {
      setAuth(true);
      updateLocation({ 
        state: formData.stateName, 
        district: formData.districtName, 
        block: formData.blockName,
        village: formData.village 
      });
      navigate('/');
    }
  };

  const toggleInterest = (interest: string) => {
    setFormData(prev => ({
      ...prev,
      interests: prev.interests.includes(interest) 
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest]
    }));
  };

  const renderIdentity = () => (
    <div className="space-y-6 animate-in slide-in-from-right-4 duration-300">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-black text-white tracking-tighter uppercase italic">Identity</h2>
        <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.3em] mt-2">Personal Credentials</p>
      </div>
      
      <div className="space-y-4">
        {[
          { label: 'Full Name', key: 'fullName', type: 'text', placeholder: 'Rahul Sharma' },
          { label: 'Username', key: 'username', type: 'text', placeholder: 'rahul_01', prefix: '@' },
          { label: 'Mobile Number', key: 'mobile', type: 'tel', placeholder: '+91' },
          { label: 'Password', key: 'password', type: 'password', placeholder: '••••••••' }
        ].map(field => (
          <div key={field.key}>
            <label className="block text-[9px] font-black text-slate-500 uppercase tracking-[0.2em] mb-2 px-1">{field.label}</label>
            <div className="relative">
              {field.prefix && <span className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-500 font-bold">{field.prefix}</span>}
              <input 
                type={field.type} 
                placeholder={field.placeholder}
                className={`w-full bg-slate-900/50 border border-slate-800 rounded-[20px] ${field.prefix ? 'pl-10' : 'pl-6'} pr-6 py-4 text-white focus:border-accent outline-none transition-all shadow-inner`}
                value={(formData as any)[field.key]}
                onChange={(e) => setFormData({...formData, [field.key]: e.target.value})}
              />
            </div>
          </div>
        ))}
      </div>

      <button 
        onClick={handleNext}
        className="w-full py-4 bg-accent text-white font-black uppercase tracking-[0.2em] rounded-2xl shadow-xl shadow-accent/20 hover:scale-[1.02] active:scale-95 transition-all mt-8"
      >
        Continue <i className="fi fi-rr-arrow-right ml-2 inline-flex items-center"></i>
      </button>
    </div>
  );

  const renderLocation = () => (
    <div className="space-y-6 animate-in slide-in-from-right-4 duration-300">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-black text-white tracking-tighter uppercase italic">Governance</h2>
        <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.3em] mt-2">Administrative Area</p>
      </div>

      <div className="space-y-5">
        <div>
          <label className="block text-[9px] font-black text-slate-500 uppercase tracking-[0.2em] mb-2 px-1">Select State</label>
          <select 
            className="w-full bg-slate-900 border border-slate-800 rounded-[20px] px-6 py-4 text-white focus:border-accent outline-none appearance-none cursor-pointer"
            value={formData.stateId}
            onChange={(e) => {
              const name = states.find(s => s.id === e.target.value)?.name || '';
              setFormData({...formData, stateId: e.target.value, stateName: name, districtId: '', districtName: '', blockId: '', blockName: ''});
            }}
          >
            <option value="">Choose State</option>
            {states.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
          </select>
        </div>
        
        <div>
          <label className="block text-[9px] font-black text-slate-500 uppercase tracking-[0.2em] mb-2 px-1">Select District</label>
          <select 
            className="w-full bg-slate-900 border border-slate-800 rounded-[20px] px-6 py-4 text-white focus:border-accent outline-none appearance-none cursor-pointer disabled:opacity-30"
            disabled={!formData.stateId || isLoading}
            value={formData.districtId}
            onChange={(e) => {
              const name = districts.find(d => d.id === e.target.value)?.name || '';
              setFormData({...formData, districtId: e.target.value, districtName: name, blockId: '', blockName: ''});
            }}
          >
            <option value="">Choose District</option>
            {districts.map(d => <option key={d.id} value={d.id}>{d.name}</option>)}
          </select>
        </div>

        <div>
          <label className="block text-[9px] font-black text-slate-500 uppercase tracking-[0.2em] mb-2 px-1">Select Block</label>
          <select 
            className="w-full bg-slate-900 border border-slate-800 rounded-[20px] px-6 py-4 text-white focus:border-accent outline-none appearance-none cursor-pointer disabled:opacity-30"
            disabled={!formData.districtId || isLoading}
            value={formData.blockId}
            onChange={(e) => {
              const name = blocks.find(b => b.id === e.target.value)?.name || '';
              setFormData({...formData, blockId: e.target.value, blockName: name});
            }}
          >
            <option value="">Choose Block</option>
            {blocks.map(b => <option key={b.id} value={b.id}>{b.name}</option>)}
          </select>
        </div>

        <div>
          <label className="block text-[9px] font-black text-slate-500 uppercase tracking-[0.2em] mb-2 px-1">Village / Ward</label>
          <input 
            type="text" 
            placeholder="e.g. Arera Colony"
            className="w-full bg-slate-900 border border-slate-800 rounded-[20px] px-6 py-4 text-white focus:border-accent outline-none transition-all"
            value={formData.village}
            onChange={(e) => setFormData({...formData, village: e.target.value})}
          />
        </div>
      </div>

      <div className="flex gap-4 mt-8">
        <button 
          onClick={() => setStep('identity')}
          className="flex-1 py-4 bg-slate-900 text-slate-400 font-black uppercase tracking-[0.15em] text-[10px] rounded-2xl border border-slate-800 hover:text-white transition-all"
        >
          Back
        </button>
        <button 
          onClick={handleNext}
          disabled={!formData.stateId || !formData.districtId}
          className="flex-[2] py-4 bg-accent text-white font-black uppercase tracking-[0.15em] text-[10px] rounded-2xl shadow-xl shadow-accent/20 hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50 disabled:scale-100"
        >
          Next Step
        </button>
      </div>
    </div>
  );

  const renderInterests = () => (
    <div className="space-y-6 animate-in slide-in-from-right-4 duration-300">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-black text-white tracking-tighter uppercase italic">Interests</h2>
        <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.3em] mt-2">Personalize Feed</p>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {['Politics', 'Education', 'Schemes', 'Technology', 'Agriculture', 'Healthcare', 'Infrastructure', 'Environment'].map(interest => {
          const isSelected = formData.interests.includes(interest);
          return (
            <button
              key={interest}
              onClick={() => toggleInterest(interest)}
              className={`p-4 rounded-[24px] border font-bold text-[10px] uppercase tracking-widest transition-all ${
                isSelected 
                  ? 'bg-accent border-accent text-white shadow-lg shadow-accent/20' 
                  : 'bg-slate-900 border-slate-800 text-slate-500 hover:border-accent/30'
              }`}
            >
              {interest}
            </button>
          );
        })}
      </div>

      <div className="flex gap-4 mt-8">
        <button 
          onClick={() => setStep('location')}
          className="flex-1 py-4 bg-slate-900 text-slate-400 font-black uppercase tracking-[0.15em] text-[10px] rounded-2xl border border-slate-800 hover:text-white transition-all"
        >
          Back
        </button>
        <button 
          onClick={handleNext}
          className="flex-[2] py-4 bg-green-600 text-white font-black uppercase tracking-[0.15em] text-[10px] rounded-2xl shadow-xl shadow-green-600/20 hover:scale-[1.02] active:scale-95 transition-all"
        >
          Finish Setup
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-[85vh] flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-slate-950/80 backdrop-blur-2xl border border-slate-900 p-8 md:p-12 rounded-[48px] shadow-2xl relative overflow-hidden">
        {/* Glow Effect */}
        <div className="absolute -top-24 -left-24 w-48 h-48 bg-accent/20 rounded-full blur-[80px]"></div>
        
        {/* Progress Bar */}
        <div className="flex gap-3 mb-12 relative z-10">
          {[1, 2, 3].map((s, i) => {
            const isActive = (step === 'identity' && i === 0) || (step === 'location' && i <= 1) || (step === 'interests' && i <= 2);
            return <div key={s} className={`h-1 flex-1 rounded-full transition-all duration-700 ${isActive ? 'bg-accent shadow-[0_0_10px_rgba(170,59,255,0.5)]' : 'bg-slate-800'}`}></div>
          })}
        </div>

        <div className="relative z-10">
          {step === 'identity' && renderIdentity()}
          {step === 'location' && renderLocation()}
          {step === 'interests' && renderInterests()}
        </div>
      </div>
    </div>
  );
};

export default Signup;
