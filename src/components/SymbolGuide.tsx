import React from 'react';
import { CheckCheck } from 'lucide-react';

export const SymbolGuide: React.FC = () => {
  const symbols = [
    { symbol: '∧', name: 'และ (Conjunction)', example: 'p ∧ q' },
    { symbol: '∨', name: 'หรือ (Disjunction)', example: 'p ∨ q' },
    { symbol: '→', name: 'ถ้า...แล้ว... (Implication)', example: 'p → q' },
    { symbol: '↔', name: 'ก็ต่อเมื่อ (Biconditional)', example: 'p ↔ q' },
    { symbol: '~', name: 'นิเสธ (Negation)', example: '~p, ~q' },
    { symbol: '≡', name: 'สมมูล (Equivalence)', example: '~(p ∨ q) ≡ ~p ∧ ~q' },
    { symbol: '∀', name: 'สำหรับทุกตัว (Universal)', example: '∀x[x + y = y]' },
    { symbol: '∃', name: 'สำหรับบางตัว (Existential)', example: '∃x[x² + 1 = 0]' },
    { symbol: '∈', name: 'สมาชิกของเซต (Element of)', example: 'x ∈ {–1, 1}' },
    { symbol: '∅', name: 'เซตว่าง (Empty set)', example: '{∅}' },
    { symbol: 'x²', name: 'เลขยกกำลัง (Superscript)', example: 'x², 2⁵, 2ˣ' },
    { symbol: '≠, ≥, ≤', name: 'เครื่องหมายเปรียบเทียบ', example: 'x ≥ 0, x ≠ 0' },
  ];

  return (
    <div className="bg-emerald-50/70 border border-emerald-200/80 rounded-2xl p-4.5 mb-6">
      <div className="flex items-center gap-2 mb-3">
        <CheckCheck className="w-5 h-5 text-emerald-600" />
        <h3 className="text-sm font-bold text-emerald-900">
          ระบบรับรองความถูกต้องของสัญลักษณ์ตรรกศาสตร์ (ไม่เพี้ยน 100%)
        </h3>
      </div>
      <p className="text-xs text-emerald-800 mb-3.5 leading-relaxed">
        แปลงจากฟอนต์สัญลักษณ์ในเอกสาร PDF เดิม (เช่น Symbol font เดิมที่แสดงผลเป็น , , , , , ) ให้เป็น Unicode มาตรฐานสากล ทำให้ใน Google Forms บนคอมพิวเตอร์และโทรศัพท์มือถือของนักเรียนแสดงผลคมชัดถูกต้องทุกเครื่อง
      </p>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2">
        {symbols.map((item, idx) => (
          <div
            key={idx}
            className="bg-white/90 border border-emerald-200 rounded-xl p-2 text-center shadow-2xs"
          >
            <div className="text-lg font-bold text-emerald-950 font-mono">
              {item.symbol}
            </div>
            <div className="text-[11px] font-semibold text-emerald-800 line-clamp-1">
              {item.name}
            </div>
            <div className="text-[10px] text-emerald-600 font-mono mt-0.5">
              {item.example}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
