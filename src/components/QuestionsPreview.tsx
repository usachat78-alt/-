import React, { useState } from 'react';
import { Search, HelpCircle, CheckCircle2, ChevronDown, ChevronUp, Check, Layers } from 'lucide-react';
import { EXAM_QUESTIONS } from '../data/examData';

export const QuestionsPreview: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [expandedAll, setExpandedAll] = useState<boolean>(true);
  const [collapsedQuestions, setCollapsedQuestions] = useState<Record<number, boolean>>({});

  const toggleCollapse = (id: number) => {
    setCollapsedQuestions((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const filteredQuestions = EXAM_QUESTIONS.filter((q) => {
    if (!searchTerm.trim()) return true;
    const term = searchTerm.toLowerCase();
    return (
      q.prompt.toLowerCase().includes(term) ||
      q.options.some((opt) => opt.toLowerCase().includes(term)) ||
      `ข้อ ${q.questionNumber}`.includes(term) ||
      `${q.questionNumber}` === term
    );
  });

  return (
    <div className="bg-white rounded-3xl border border-slate-200/80 shadow-sm p-6 sm:p-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-lg font-bold text-slate-900">
              รายการข้อสอบทั้งหมด 20 ข้อ (ตรวจสอบความถูกต้องของสัญลักษณ์)
            </h3>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-violet-50 text-violet-700 border border-violet-100">
              {EXAM_QUESTIONS.length} ข้อ
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            เรียงลำดับตามไฟล์ต้นฉบับ 100% ตัวเลือก 5 ข้อต่อข้อ ไม่มีเฉลย พร้อมส่งให้นักเรียน
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* Search box */}
          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="ค้นหาข้อสอบ หรือ สัญลักษณ์..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-violet-500 focus:outline-hidden transition-colors"
            />
          </div>

          <button
            onClick={() => {
              if (expandedAll) {
                const allCollapsed: Record<number, boolean> = {};
                EXAM_QUESTIONS.forEach((q) => {
                  allCollapsed[q.id] = true;
                });
                setCollapsedQuestions(allCollapsed);
                setExpandedAll(false);
              } else {
                setCollapsedQuestions({});
                setExpandedAll(true);
              }
            }}
            className="text-xs font-medium text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 py-1.5 px-3 rounded-xl transition-colors shrink-0"
          >
            {expandedAll ? 'ย่อทั้งหมด' : 'ขยายทั้งหมด'}
          </button>
        </div>
      </div>

      {/* Questions List */}
      <div className="divide-y divide-slate-100 mt-2">
        {filteredQuestions.map((q) => {
          const isCollapsed = collapsedQuestions[q.id];

          return (
            <div key={q.id} className="py-5 first:pt-4 last:pb-0">
              <div
                className="flex items-start justify-between gap-4 cursor-pointer group"
                onClick={() => toggleCollapse(q.id)}
              >
                <div className="space-y-1.5 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-lg bg-violet-100 text-violet-800 text-xs font-bold flex items-center justify-center shrink-0">
                      {q.questionNumber}
                    </span>
                    <span className="text-xs font-semibold text-slate-400">
                      ข้อที่ {q.questionNumber}
                    </span>
                  </div>

                  <h4 className="text-sm font-semibold text-slate-900 whitespace-pre-line leading-relaxed font-sans pl-8">
                    {q.prompt}
                  </h4>
                </div>

                <button className="text-slate-400 group-hover:text-slate-600 p-1 rounded-lg transition-colors mt-1">
                  {isCollapsed ? (
                    <ChevronDown className="w-4 h-4" />
                  ) : (
                    <ChevronUp className="w-4 h-4" />
                  )}
                </button>
              </div>

              {/* Choices */}
              {!isCollapsed && (
                <div className="pl-8 pt-3 grid grid-cols-1 gap-2">
                  {q.options.map((opt, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-3 p-2.5 rounded-xl bg-slate-50/80 hover:bg-slate-100/70 border border-slate-200/60 text-xs text-slate-800 transition-colors"
                    >
                      <span className="w-5 h-5 rounded-full bg-white border border-slate-300 flex items-center justify-center text-[11px] font-bold text-slate-600 shrink-0">
                        {idx + 1}
                      </span>
                      <span className="font-mono text-xs sm:text-sm font-medium tracking-tight">
                        {opt}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}

        {filteredQuestions.length === 0 && (
          <div className="py-12 text-center text-slate-400 text-xs">
            ไม่พบข้อสอบที่ตรงกับคำค้นหา "{searchTerm}"
          </div>
        )}
      </div>
    </div>
  );
};
