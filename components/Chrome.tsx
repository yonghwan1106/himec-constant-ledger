"use client";

import { useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const SHEETS = [
  { href: "/", n: "0", label: "개요" },
  { href: "/panel", n: "1", label: "입력 순간" },
  { href: "/ledger", n: "2", label: "분포 대장" },
  { href: "/tools", n: "3", label: "도구 근거표" },
  { href: "/approval", n: "4", label: "결재" },
];

function Legend() {
  return (
    <div className="flex flex-wrap items-center gap-y-1 pt-2 text-[12px] leading-tight text-[var(--pencil)]">
      <span className="flex items-center gap-2 pr-4">
        <span
          aria-hidden
          className="inline-block h-0 w-6 border-t-[1.5px] border-dashed border-[var(--pencil)]"
        />
        연필 = AI 구간, 추정하고 제시만 한다
      </span>
      <span className="flex items-center gap-2 border-l border-[var(--grid)] px-4">
        <span
          aria-hidden
          className="inline-block h-0 w-6 border-t border-[var(--ink)]"
        />
        <span className="text-[var(--ink)]">잉크 = 규칙 구간, 결정론 계산</span>
      </span>
      <span className="flex items-center gap-2 border-l border-[var(--grid)] pl-4">
        <span
          aria-hidden
          className="inline-block h-[9px] w-[9px] rounded-full border-[1.5px] border-[var(--stamp)]"
        />
        <span className="text-[var(--stamp)]">인주 = 사람의 서명</span>
      </span>
    </div>
  );
}

export default function Chrome({ children }: { children: React.ReactNode }) {
  const path = usePathname();
  const sheet = SHEETS.find((s) => s.href === path) ?? SHEETS[0];

  // 캡처용 인쇄 모드 — ?print=1 이면 시트 탭을 문서 끝에 한 번만 정적으로 둔다.
  // 일반 방문에는 아무 변화가 없다.
  useEffect(() => {
    const on = new URLSearchParams(window.location.search).has("print");
    const root = document.documentElement;
    if (on) root.setAttribute("data-print", "1");
    else root.removeAttribute("data-print");
  }, [path]);

  return (
    <div className="flex min-h-screen flex-col">
      {/* 표제란 — 도면·계산서의 title block */}
      <header className="pt-5">
        <div className="sheetwrap">
          <div className="tb">
            <div className="tb-cell">
              제1회 HIMEC AI 활용 아이디어 공모전 출품작 목업
            </div>
            <div className="tb-cell">
              시트 <span className="mono">{sheet.n}</span> {sheet.label}
            </div>
            <div className="tb-cell">작성 출품자</div>
            <div className="tb-cell">
              가상 데이터 — 실제 프로젝트·실적이 아닙니다
            </div>
          </div>
          <Legend />
        </div>
      </header>

      <main className="flex-1 pb-24">
        <div className="sheetwrap">{children}</div>
      </main>

      {/* 시트 탭 */}
      <nav
        aria-label="시트"
        className="fixed inset-x-0 bottom-0 z-40 border-t border-[var(--ink)] bg-[var(--pad)]"
      >
        <div className="sheetwrap">
          <ul className="flex overflow-x-auto">
            {SHEETS.map((s) => {
              const on = s.href === path;
              return (
                <li key={s.href} className="shrink-0">
                  <Link
                    href={s.href}
                    aria-current={on ? "page" : undefined}
                    className={on ? "tab tab-on" : "tab"}
                  >
                    <span className="mono text-[11px]">{s.n}</span>
                    {s.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </nav>
    </div>
  );
}
