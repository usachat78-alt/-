import React, { useState } from 'react';
import { User } from 'firebase/auth';
import {
  FileCheck2,
  Sparkles,
  Link,
  Copy,
  ExternalLink,
  QrCode,
  Edit3,
  CheckCircle2,
  AlertCircle,
  Users,
  Clock,
  Award,
  Layers,
  Check,
  RefreshCw,
} from 'lucide-react';
import { CreatedFormResult } from '../types';
import { EXAM_TITLE, EXAM_DESCRIPTION } from '../data/examData';

interface FormCreatorCardProps {
  user: User | null;
  onLogin: () => void;
  onCreateForm: () => Promise<void>;
  isCreating: boolean;
  creationStep: string;
  createdForm: CreatedFormResult | null;
  onOpenQRCode: (url: string) => void;
  error: string | null;
}

export const FormCreatorCard: React.FC<FormCreatorCardProps> = ({
  user,
  onLogin,
  onCreateForm,
  isCreating,
  creationStep,
  createdForm,
  onOpenQRCode,
  error,
}) => {
  const [copied, setCopied] = useState<boolean>(false);

  const handleCopyLink = () => {
    if (!createdForm?.responderUri) return;
    navigator.clipboard.writeText(createdForm.responderUri);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="bg-white rounded-3xl border border-slate-200/80 shadow-sm p-6 sm:p-8 mb-8">
      {/* Exam Header Overview */}
      <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6 pb-6 border-b border-slate-100">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-50 text-violet-700 text-xs font-semibold border border-violet-100">
            <Sparkles className="w-3.5 h-3.5" /> Google Forms Exam Builder
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            {EXAM_TITLE}
          </h2>
          <p className="text-sm text-slate-600 whitespace-pre-line leading-relaxed">
            {EXAM_DESCRIPTION}
          </p>
        </div>

        {/* Exam Badges */}
        <div className="flex flex-wrap lg:flex-nowrap items-center gap-3">
          <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200/80 text-slate-700 text-xs font-semibold">
            <Award className="w-4 h-4 text-amber-500" />
            <span>เต็ม 20 คะแนน</span>
          </div>
          <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200/80 text-slate-700 text-xs font-semibold">
            <Clock className="w-4 h-4 text-sky-500" />
            <span>เวลา 50 นาที</span>
          </div>
          <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200/80 text-slate-700 text-xs font-semibold">
            <Layers className="w-4 h-4 text-violet-500" />
            <span>ข้อสอบ 20 ข้อ</span>
          </div>
        </div>
      </div>

      {/* Required Form Structure Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 my-6">
        <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/70">
          <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">
            ส่วนที่ 1: ข้อมูลนักเรียน
          </div>
          <ul className="text-xs text-slate-700 space-y-1">
            <li className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-violet-600"></span>
              <strong>1. ชื่อ-สกุล:</strong> คำตอบสั้น (บังคับ)
            </li>
            <li className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-violet-600"></span>
              <strong>2. ห้อง:</strong> ตัวเลือก <strong>4/7</strong> หรือ <strong>4/14</strong>
            </li>
            <li className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-violet-600"></span>
              <strong>3. เลขที่:</strong> คำตอบสั้น (บังคับ)
            </li>
          </ul>
        </div>

        <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/70">
          <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">
            ส่วนที่ 2: ข้อสอบตรรกศาสตร์
          </div>
          <div className="text-xs text-slate-700 space-y-1">
            <p className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
              เรียงลำดับข้อ 1 – 20 ตามไฟล์ต้นฉบับ
            </p>
            <p className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
              ตัวเลือก 5 ตัวเลือกต่อข้อ (Multiple Choice)
            </p>
            <p className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
              <strong>ไม่ต้องเฉลย</strong> สำหรับใช้สอบจริง
            </p>
          </div>
        </div>

        <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/70">
          <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">
            ความแม่นยำของสัญลักษณ์
          </div>
          <div className="text-xs text-slate-700 space-y-1">
            <p className="text-emerald-700 font-medium">
              ✓ ประพจน์และการเชื่อม: ∧, ∨, →, ↔, ~
            </p>
            <p className="text-emerald-700 font-medium">
              ✓ สมมูลและตัวบ่งปริมาณ: ≡, ∀, ∃
            </p>
            <p className="text-emerald-700 font-medium">
              ✓ เซตและยกกำลัง: ∈, ∅, x², 2⁵, 2ˣ, R⁻
            </p>
          </div>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="mb-6 p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-start gap-3">
          <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <div className="font-semibold">เกิดข้อผิดพลาดในการสร้างแบบฟอร์ม</div>
            <div>{error}</div>
          </div>
        </div>
      )}

      {/* Form Creation Action or Result Banner */}
      {!createdForm ? (
        <div className="bg-gradient-to-br from-violet-50 via-indigo-50/40 to-slate-50 rounded-2xl border border-violet-100 p-6 text-center">
          {user ? (
            <div className="space-y-4 max-w-lg mx-auto">
              <div className="w-12 h-12 mx-auto rounded-2xl bg-violet-600 text-white flex items-center justify-center shadow-md shadow-violet-200">
                <FileCheck2 className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900">
                  พร้อมสร้างแบบทดสอบใน Google Drive ของคุณ
                </h3>
                <p className="text-xs text-slate-600 mt-1">
                  ระบบจะสร้าง Google Form ใหม่อัตโนมัติ พร้อมตั้งค่าคำถามส่วนตัวและข้อสอบ 20 ข้อครบถ้วน
                </p>
              </div>

              <button
                id="btn-create-google-form"
                onClick={onCreateForm}
                disabled={isCreating}
                className="w-full sm:w-auto px-8 py-3.5 bg-violet-600 hover:bg-violet-700 active:bg-violet-800 text-white text-sm font-bold rounded-xl shadow-md shadow-violet-200 transition-all flex items-center justify-center gap-2 mx-auto disabled:opacity-60 cursor-pointer"
              >
                {isCreating ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>{creationStep || 'กำลังสร้างแบบฟอร์ม...'}</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    <span>สร้าง Google Form สำหรับสอบจริงทันที</span>
                  </>
                )}
              </button>
            </div>
          ) : (
            <div className="space-y-4 max-w-md mx-auto">
              <div className="w-12 h-12 mx-auto rounded-2xl bg-slate-100 text-slate-600 flex items-center justify-center">
                <Users className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900">
                  เข้าสู่ระบบ Google เพื่อสร้าง Google Form
                </h3>
                <p className="text-xs text-slate-600 mt-1">
                  แบบฟอร์มจะถูกสร้างขึ้นในบัญชี Google ของคุณโดยตรง เพื่อให้คุณเป็นเจ้าของฟอร์ม ดูคำตอบ และคะแนนของนักเรียนได้
                </p>
              </div>
              <button
                id="btn-login-to-create"
                onClick={onLogin}
                className="px-6 py-3 bg-white hover:bg-slate-50 text-slate-800 font-semibold text-xs rounded-xl border border-slate-300 shadow-xs transition-all inline-flex items-center gap-2"
              >
                <svg className="w-4 h-4" viewBox="0 0 48 48">
                  <path
                    fill="#EA4335"
                    d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
                  />
                  <path
                    fill="#4285F4"
                    d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"
                  />
                  <path
                    fill="#34A853"
                    d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
                  />
                </svg>
                <span>เข้าสู่ระบบ Google เพื่อเริ่มสร้างฟอร์ม</span>
              </button>
            </div>
          )}
        </div>
      ) : (
        /* Result Banner with Real Working Links */
        <div className="bg-emerald-50/90 border-2 border-emerald-500/80 rounded-2xl p-6 sm:p-7 shadow-sm space-y-5 animate-in fade-in">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-sm">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-base font-bold text-emerald-950">
                  สร้าง Google Form สำเร็จเรียบร้อย พร้อมใช้สอบจริง!
                </h3>
                <p className="text-xs text-emerald-800">
                  ข้อสอบทั้ง 20 ข้อ พร้อมข้อมูล ชื่อ-สกุล, ห้อง (4/7, 4/14) และเลขที่ ถูกบันทึกแล้ว
                </p>
              </div>
            </div>

            <button
              id="btn-recreate-form"
              onClick={onCreateForm}
              disabled={isCreating}
              className="text-xs font-semibold text-emerald-800 hover:text-emerald-950 bg-emerald-100 hover:bg-emerald-200 py-1.5 px-3 rounded-lg transition-colors flex items-center gap-1.5 self-start sm:self-auto"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isCreating ? 'animate-spin' : ''}`} />
              <span>สร้างใหม่</span>
            </button>
          </div>

          {/* Shareable Link Box */}
          <div className="bg-white rounded-xl p-4 border border-emerald-200 shadow-2xs space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                <Link className="w-3.5 h-3.5 text-emerald-600" />
                ลิงก์ Google Form สำหรับส่งให้นักเรียนเข้าทำข้อสอบจริง:
              </span>
              <span className="text-[11px] font-medium text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md">
                Responder URL
              </span>
            </div>

            <div className="flex items-center gap-2">
              <input
                id="input-exam-link"
                type="text"
                readOnly
                value={createdForm.responderUri}
                className="w-full text-xs font-mono bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-800 select-all focus:outline-hidden"
              />
              <button
                id="btn-copy-exam-link"
                onClick={handleCopyLink}
                className="shrink-0 px-3.5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-white" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'คัดลอกแล้ว!' : 'คัดลอก'}</span>
              </button>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-2.5 pt-1">
              <a
                id="link-open-student-exam"
                href={createdForm.responderUri}
                target="_blank"
                rel="noreferrer noopener"
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold flex items-center gap-2 shadow-xs transition-colors"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>เปิดหน้าข้อสอบนักเรียน</span>
              </a>

              <button
                id="btn-show-qr"
                onClick={() => onOpenQRCode(createdForm.responderUri)}
                className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-semibold flex items-center gap-2 shadow-xs transition-colors cursor-pointer"
              >
                <QrCode className="w-3.5 h-3.5" />
                <span>แสดง QR Code สำหรับห้องเรียน</span>
              </button>

              <a
                id="link-open-teacher-edit"
                href={createdForm.editUri}
                target="_blank"
                rel="noreferrer noopener"
                className="px-4 py-2 bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 rounded-xl text-xs font-semibold flex items-center gap-2 transition-colors"
              >
                <Edit3 className="w-3.5 h-3.5 text-violet-600" />
                <span>แก้ไขแบบฟอร์ม / ดูผลคะแนนที่ตอบกลับ</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
