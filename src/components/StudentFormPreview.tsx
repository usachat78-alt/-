import React, { useState } from 'react';
import { UserCheck, CheckCircle, Send, RotateCcw } from 'lucide-react';
import { EXAM_TITLE, EXAM_DESCRIPTION, EXAM_QUESTIONS } from '../data/examData';

export const StudentFormPreview: React.FC = () => {
  const [fullname, setFullname] = useState('');
  const [classroom, setClassroom] = useState<'4/7' | '4/14' | ''>('');
  const [studentNumber, setStudentNumber] = useState('');
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [submitted, setSubmitted] = useState(false);

  const handleSelectAnswer = (qId: number, opt: string) => {
    setAnswers((prev) => ({
      ...prev,
      [qId]: opt,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullname || !classroom || !studentNumber) {
      alert('กรุณากรอกข้อมูลส่วนตัว (ชื่อ-สกุล, ห้อง, เลขที่) ให้ครบถ้วน');
      return;
    }
    setSubmitted(true);
  };

  const handleReset = () => {
    setAnswers({});
    setSubmitted(false);
  };

  const answeredCount = Object.keys(answers).length;

  return (
    <div className="bg-white rounded-3xl border border-slate-200/80 shadow-sm p-6 sm:p-8">
      <div className="flex items-center justify-between pb-6 border-b border-slate-100">
        <div>
          <h3 className="text-lg font-bold text-slate-900">
            จำลองหน้าทำข้อสอบของนักเรียน (Student View Simulator)
          </h3>
          <p className="text-xs text-slate-500 mt-1">
            ทดลองทำข้อสอบเสมือนเปิดใน Google Forms เพื่อตรวจสอบประสบการณ์จริงของนักเรียน
          </p>
        </div>

        <div className="text-xs font-semibold text-violet-700 bg-violet-50 border border-violet-100 px-3 py-1.5 rounded-xl">
          ตอบแล้ว {answeredCount} / {EXAM_QUESTIONS.length} ข้อ
        </div>
      </div>

      {submitted ? (
        <div className="py-12 text-center space-y-4">
          <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-xs">
            <CheckCircle className="w-8 h-8" />
          </div>
          <div className="space-y-1">
            <h4 className="text-base font-bold text-slate-900">
              ส่งคำตอบการทดลองทำข้อสอบเรียบร้อยแล้ว
            </h4>
            <p className="text-xs text-slate-500">
              ผู้เข้าสอบ: {fullname} • ห้อง {classroom} • เลขที่ {studentNumber}
            </p>
            <p className="text-xs text-slate-500">
              ตอบคำถามครบ {answeredCount} จาก {EXAM_QUESTIONS.length} ข้อ (ไม่มีเฉลยตามที่ตั้งค่าไว้)
            </p>
          </div>
          <button
            onClick={handleReset}
            className="px-5 py-2.5 bg-slate-900 text-white text-xs font-semibold rounded-xl hover:bg-slate-800 transition-colors inline-flex items-center gap-2"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            ทดสอบใหม่
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-8 mt-6">
          {/* Section 1: Student Information */}
          <div className="p-6 rounded-2xl bg-slate-50/80 border border-slate-200/80 space-y-4">
            <div className="flex items-center gap-2 border-b border-slate-200/60 pb-3">
              <UserCheck className="w-4 h-4 text-violet-600" />
              <h4 className="text-sm font-bold text-slate-900">ข้อมูลผู้เข้าสอบ</h4>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Field 1: Fullname */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700">
                  1. ชื่อ-สกุล <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="เช่น ด.ช. รักเรียน ขยันยิ่ง"
                  value={fullname}
                  onChange={(e) => setFullname(e.target.value)}
                  className="w-full text-xs p-2.5 bg-white border border-slate-300 rounded-xl focus:outline-hidden focus:border-violet-500"
                />
              </div>

              {/* Field 2: Classroom */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700">
                  2. ห้อง <span className="text-rose-500">*</span>
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {(['4/7', '4/14'] as const).map((room) => (
                    <label
                      key={room}
                      className={`flex items-center justify-center gap-2 p-2.5 rounded-xl border text-xs font-bold cursor-pointer transition-all ${
                        classroom === room
                          ? 'bg-violet-600 border-violet-600 text-white shadow-xs'
                          : 'bg-white border-slate-300 text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      <input
                        type="radio"
                        name="classroom"
                        value={room}
                        checked={classroom === room}
                        onChange={() => setClassroom(room)}
                        className="sr-only"
                        required
                      />
                      <span>ห้อง {room}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Field 3: Number */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700">
                  3. เลขที่ <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="เช่น 15"
                  value={studentNumber}
                  onChange={(e) => setStudentNumber(e.target.value)}
                  className="w-full text-xs p-2.5 bg-white border border-slate-300 rounded-xl focus:outline-hidden focus:border-violet-500"
                />
              </div>
            </div>
          </div>

          {/* Section 2: Questions 1 - 20 */}
          <div className="space-y-6">
            {EXAM_QUESTIONS.map((q) => (
              <div
                key={q.id}
                className="p-5 rounded-2xl bg-white border border-slate-200 hover:border-slate-300 transition-colors space-y-3"
              >
                <div className="flex items-start gap-2.5">
                  <span className="px-2 py-0.5 rounded-md bg-violet-100 text-violet-800 text-xs font-bold shrink-0 mt-0.5">
                    ข้อ {q.questionNumber}
                  </span>
                  <div className="text-xs sm:text-sm font-semibold text-slate-900 whitespace-pre-line leading-relaxed">
                    {q.prompt}
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-2 pt-1">
                  {q.options.map((opt, idx) => {
                    const isSelected = answers[q.id] === opt;
                    return (
                      <label
                        key={idx}
                        className={`flex items-center gap-3 p-3 rounded-xl border text-xs cursor-pointer transition-all ${
                          isSelected
                            ? 'bg-violet-50 border-violet-500 text-violet-950 font-medium'
                            : 'bg-slate-50/60 border-slate-200/80 text-slate-700 hover:bg-slate-100/70'
                        }`}
                      >
                        <input
                          type="radio"
                          name={`question-${q.id}`}
                          value={opt}
                          checked={isSelected}
                          onChange={() => handleSelectAnswer(q.id, opt)}
                          className="w-4 h-4 text-violet-600 focus:ring-violet-500"
                        />
                        <span className="w-5 h-5 rounded-full bg-white border border-slate-300 flex items-center justify-center text-[11px] font-bold text-slate-600 shrink-0">
                          {idx + 1}
                        </span>
                        <span className="font-mono text-xs sm:text-sm">{opt}</span>
                      </label>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          {/* Submit Action */}
          <div className="pt-4 flex justify-end">
            <button
              type="submit"
              className="px-6 py-3 bg-violet-600 hover:bg-violet-700 active:bg-violet-800 text-white text-xs font-bold rounded-xl shadow-sm transition-all flex items-center gap-2"
            >
              <Send className="w-4 h-4" />
              <span>ส่งคำตอบจำลอง ({answeredCount}/{EXAM_QUESTIONS.length})</span>
            </button>
          </div>
        </form>
      )}
    </div>
  );
};
