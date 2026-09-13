import React, { useState, useEffect } from 'react';
import { User } from 'firebase/auth';
import {
  initAuth,
  googleSignIn,
  logout,
  getAccessToken,
} from './services/auth';
import { createGoogleFormExam } from './services/googleForms';
import { CreatedFormResult } from './types';
import { Header } from './components/Header';
import { FormCreatorCard } from './components/FormCreatorCard';
import { QuestionsPreview } from './components/QuestionsPreview';
import { StudentFormPreview } from './components/StudentFormPreview';
import { SymbolGuide } from './components/SymbolGuide';
import { QRCodeModal } from './components/QRCodeModal';
import {
  FileText,
  ListOrdered,
  Eye,
  CheckCircle2,
  Sparkles,
  School,
} from 'lucide-react';

const STORAGE_KEY = 'exam_logic_m4_created_form';

export default function App() {
  const [user, setUser] = useState<User | null>(null);
  const [isLoggingIn, setIsLoggingIn] = useState<boolean>(false);
  const [isCreating, setIsCreating] = useState<boolean>(false);
  const [creationStep, setCreationStep] = useState<string>('');
  const [createdForm, setCreatedForm] = useState<CreatedFormResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'create' | 'questions' | 'simulator'>('create');
  const [qrModalUrl, setQrModalUrl] = useState<string | null>(null);

  // Initialize auth and load saved form
  useEffect(() => {
    // Load previously created form from local storage if available
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        setCreatedForm(JSON.parse(saved));
      }
    } catch (e) {
      console.warn('Failed to parse saved form from localStorage', e);
    }

    const unsubscribe = initAuth(
      (authedUser) => {
        setUser(authedUser);
      },
      () => {
        setUser(null);
      }
    );

    return () => {
      if (typeof unsubscribe === 'function') {
        unsubscribe();
      }
    };
  }, []);

  const handleLogin = async () => {
    setIsLoggingIn(true);
    setError(null);
    try {
      const result = await googleSignIn();
      if (result) {
        setUser(result.user);
      }
    } catch (err: any) {
      console.error('Login error:', err);
      if (err?.code === 'auth/popup-closed-by-user') {
        // User closed popup, do nothing
      } else {
        setError(err.message || 'ไม่สามารถเข้าสู่ระบบด้วย Google ได้');
      }
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      setUser(null);
    } catch (err: any) {
      console.error('Logout error:', err);
    }
  };

  const handleCreateForm = async () => {
    setError(null);

    // If user is not logged in, prompt sign in first
    let token = await getAccessToken();
    if (!user || !token) {
      try {
        setIsLoggingIn(true);
        const loginRes = await googleSignIn();
        if (!loginRes) return;
        setUser(loginRes.user);
        token = loginRes.accessToken;
      } catch (err: any) {
        console.error('Sign in required for Google Forms:', err);
        setError('กรุณาเข้าสู่ระบบด้วย Google เพื่ออนุญาตให้สร้างแบบฟอร์มใน Google Drive ของคุณ');
        return;
      } finally {
        setIsLoggingIn(false);
      }
    }

    if (!token) {
      setError('ไม่พบสิทธิ์การเข้าถึง (Access Token) กรุณาลองเข้าสู่ระบบใหม่อีกครั้ง');
      return;
    }

    setIsCreating(true);
    setCreationStep('กำลังเชื่อมต่อ Google Forms API...');

    try {
      setCreationStep('กำลังสร้างแบบฟอร์มข้อสอบ...');
      await new Promise((r) => setTimeout(r, 400));

      setCreationStep('กำลังเพิ่มข้อมูลนักเรียน (ชื่อ, ห้อง 4/7 และ 4/14, เลขที่) และข้อสอบ 20 ข้อ...');
      const result = await createGoogleFormExam(token);

      setCreatedForm(result);
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(result));
      } catch (e) {
        console.warn('Could not save to localStorage', e);
      }

      setCreationStep('สร้างเสร็จสมบูรณ์!');
    } catch (err: any) {
      console.error('Failed to create form:', err);
      setError(err?.message || 'เกิดข้อผิดพลาดในการเชื่อมต่อ Google Forms API');
    } finally {
      setIsCreating(false);
      setCreationStep('');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col selection:bg-violet-100 selection:text-violet-900">
      <Header
        user={user}
        onLogin={handleLogin}
        onLogout={handleLogout}
        isLoggingIn={isLoggingIn}
      />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Navigation Tabs */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
          <div className="flex items-center gap-1.5 p-1 bg-slate-200/70 rounded-2xl">
            <button
              id="tab-create"
              onClick={() => setActiveTab('create')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'create'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <FileText className="w-4 h-4 text-violet-600" />
              <span>สร้าง Google Form</span>
            </button>

            <button
              id="tab-questions"
              onClick={() => setActiveTab('questions')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'questions'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <ListOrdered className="w-4 h-4 text-indigo-600" />
              <span>ตรวจข้อสอบ 20 ข้อ (สัญลักษณ์)</span>
            </button>

            <button
              id="tab-simulator"
              onClick={() => setActiveTab('simulator')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'simulator'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Eye className="w-4 h-4 text-emerald-600" />
              <span>จำลองมุมมองนักเรียน</span>
            </button>
          </div>

          <div className="text-xs text-slate-500 flex items-center gap-1.5">
            <School className="w-4 h-4 text-slate-400" />
            <span>กลุ่มสาระการเรียนรู้คณิตศาสตร์ • ชั้น ม.4</span>
          </div>
        </div>

        {/* Tab 1: Create Google Form */}
        {activeTab === 'create' && (
          <div>
            <SymbolGuide />
            <FormCreatorCard
              user={user}
              onLogin={handleLogin}
              onCreateForm={handleCreateForm}
              isCreating={isCreating}
              creationStep={creationStep}
              createdForm={createdForm}
              onOpenQRCode={(url) => setQrModalUrl(url)}
              error={error}
            />
            <QuestionsPreview />
          </div>
        )}

        {/* Tab 2: Questions List */}
        {activeTab === 'questions' && (
          <div>
            <SymbolGuide />
            <QuestionsPreview />
          </div>
        )}

        {/* Tab 3: Simulator */}
        {activeTab === 'simulator' && (
          <div>
            <StudentFormPreview />
          </div>
        )}
      </main>

      {/* QR Code Modal */}
      <QRCodeModal
        isOpen={Boolean(qrModalUrl)}
        url={qrModalUrl || ''}
        onClose={() => setQrModalUrl(null)}
      />

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white py-4 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-xs text-slate-500">
          แบบทดสอบออนไลน์ ตรรกศาสตร์เบื้องต้น ชั้น ม.4 • เชื่อมต่อ Google Forms API • สัญลักษณ์ตรรกศาสตร์สากล ∧, ∨, →, ↔, ~, ≡, ∀, ∃
        </div>
      </footer>
    </div>
  );
}
