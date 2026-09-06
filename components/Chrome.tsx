"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutList,
  PanelRightOpen,
  Table2,
  Wrench,
  Stamp,
  TriangleAlert,
} from "lucide-react";

const NAV = [
  { href: "/", n: "0", label: "개요 · 흐름", sub: "문제 장면과 구간 경계", icon: LayoutList },
  { href: "/panel", n: "1", label: "입력 순간 패널", sub: "값 옆에 남는 한 줄", icon: PanelRightOpen },
  { href: "/ledger", n: "2", label: "상수 분포 대장", sub: "가짓수와 층화 분포", icon: Table2 },
  { href: "/tools", n: "3", label: "도구 근거표", sub: "소유자와 재검증 기한", icon: Wrench },
  { href: "/approval", n: "4", label: "결재 · 출처표", sub: "근거 미상 항목 수", icon: Stamp },
];

export default function Chrome({ children }: { children: React.ReactNode }) {
  const path = usePathname();

  return (
    <div className="min-h-screen">
      {/* 공모전 머리띠 */}
      <header className="sticky top-0 z-30 border-b border-[var(--rule-2)] bg-[#17181a] text-[#f3f2ee]">
        <div className="flex h-11 items-center gap-3 px-5">
          <span className="text-[12.5px] font-semibold tracking-tight">
            제1회 HIMEC AI 활용 아이디어 공모전 출품작 목업
          </span>
          <span className="text-[12px] text-[#a7a9a4]">제안자 박용환</span>
          <span className="hidden text-[12px] text-[#a7a9a4] lg:inline">
            · 「우리 회사는 그 숫자를 몇 가지로 쓰고 있습니까」
          </span>
          <span className="ml-auto inline-flex items-center gap-1.5 rounded-sm border border-[#b98a3a] bg-[#3a2f16] px-2 py-[3px] text-[11.5px] font-semibold text-[#f0c975]">
            <TriangleAlert size={13} strokeWidth={2.2} />
            가상 데이터 — 실제 프로젝트·실적이 아닙니다
          </span>
        </div>
      </header>

      <div className="flex">
        {/* 좌측 화면 목록 */}
        <nav className="sticky top-11 hidden h-[calc(100vh-2.75rem)] w-[232px] shrink-0 border-r border-[var(--rule)] bg-[#efeee9] px-3 py-4 md:block">
          <p className="px-2 pb-2 text-[11px] font-semibold tracking-wide text-[var(--ink-3)]">
            화면 5종
          </p>
          <ul className="space-y-1">
            {NAV.map((it) => {
              const on = path === it.href;
              const Icon = it.icon;
              return (
                <li key={it.href}>
                  <Link
                    href={it.href}
                    className={[
                      "block rounded-md border px-2.5 py-2 transition-colors",
                      on
                        ? "border-[var(--rule-2)] bg-white shadow-[0_1px_0_rgba(0,0,0,0.04)]"
                        : "border-transparent hover:bg-white/60",
                    ].join(" ")}
                  >
                    <span className="flex items-center gap-2">
                      <span
                        className={[
                          "mono flex h-[18px] w-[18px] items-center justify-center rounded-[3px] text-[11px] font-bold",
                          on
                            ? "bg-[var(--sign)] text-white"
                            : "bg-[var(--rule-2)] text-[#4a4d52]",
                        ].join(" ")}
                      >
                        {it.n}
                      </span>
                      <span className="text-[13px] font-semibold text-[var(--ink)]">
                        {it.label}
                      </span>
                      <Icon
                        size={14}
                        className="ml-auto text-[var(--ink-3)]"
                        strokeWidth={1.8}
                      />
                    </span>
                    <span className="mt-0.5 block pl-[26px] text-[11.5px] text-[var(--ink-3)]">
                      {it.sub}
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="mt-5 rounded-md border border-[var(--rule)] bg-white/70 px-2.5 py-2.5">
            <p className="text-[11px] font-semibold text-[var(--ink-2)]">
              구간 표시 규칙
            </p>
            <p className="mt-1.5 flex items-center gap-1.5 text-[11.5px] text-[var(--ink-2)]">
              <span className="inline-block h-2.5 w-2.5 rounded-[2px] bg-[var(--ai)]" />
              AI 구간 — 추정하고 제시만 한다
            </p>
            <p className="mt-1 flex items-center gap-1.5 text-[11.5px] text-[var(--ink-2)]">
              <span className="inline-block h-2.5 w-2.5 rounded-[2px] bg-[var(--rule-c)]" />
              규칙 구간 — 결정론 계산이다
            </p>
            <p className="mt-1 flex items-center gap-1.5 text-[11.5px] text-[var(--ink-2)]">
              <span className="inline-block h-2.5 w-2.5 rounded-[2px] bg-[var(--unknown)]" />
              「근거 미상」 — 만들어 내지 않는다
            </p>
          </div>

          <p className="mt-4 px-2 text-[11px] leading-relaxed text-[var(--ink-3)]">
            AI는 값을 제안하지 않습니다.
            <br />
            최종 판정과 서명은 계산서 책임기술사입니다.
          </p>
        </nav>

        <main className="min-w-0 flex-1">{children}</main>
      </div>
    </div>
  );
}
