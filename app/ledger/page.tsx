"use client";

import { useState } from "react";
import { Chip, DistBar, Foot, Section, SheetHead, Unknown } from "@/components/ui";
import { ITEMS, REASONS } from "@/lib/data";

const NEIGHBOURS = [
  {
    a: "EUC · 스프레드시트 거버넌스 도구",
    b: "어떤 파일이 있고 무엇이 언제 바뀌었는가",
    c: "그 파일 안의 한 숫자가 무엇이며 왜 그 값인가",
  },
  {
    a: "엑셀 위험 점검 도구",
    b: "하드코딩된 값이 있다는 사실을 위험으로 표시",
    c: "그 값의 의미와 사유를 남겨 위험이 아니게 만든다",
  },
  {
    a: "통합문서 안에서 답하는 AI 보조",
    b: "지금 열려 있는 파일을 본다",
    c: "회사 전체를 가로질러 같은 항목의 값을 센다",
  },
];

export default function LedgerScreen() {
  const [sel, setSel] = useState(ITEMS[0].id);
  const item = ITEMS.find((i) => i.id === sel)!;
  const rows = REASONS[item.id] ?? [];
  const totalDistinct = ITEMS.reduce((a, b) => a + b.distinct, 0);

  return (
    <>
      <SheetHead
        title="사내 상수 분포 대장 — 가짓수와 층화 분포"
        lead="아무도 세어 본 적이 없는 정수 하나에서 시작합니다. 같은 항목에 회사가 실제로 쓰고 있는 값이 몇 가지인가, 그 가운데 사유가 기록된 값은 몇 건인가."
        marks={
          <>
            <Chip kind="ink">규칙 ① ②</Chip>
            <Chip kind="pencil">AI ② 사유 원문</Chip>
          </>
        }
      />

      {/* 1단계 1차 산출물 — 첫 화면은 한 줄로 연다 */}
      <div className="mt-7 border-t border-[var(--ink)] pt-3">
        <p className="text-[12px] text-[var(--pencil)]">
          계수 단위 = 프로젝트 × 항목 · 규칙 판본 v1 — 같은 값인지는 단위 환산 후
          유효숫자 규칙으로 판정합니다(여유율 15 % = 1.15). 규칙이 바뀌면 가짓수도
          바뀝니다.
        </p>
        <p className="mt-2 text-[12px] text-[var(--pencil)]">
          1단계 1차 산출물 — 첫 화면은 분포가 아니라 한 줄로 엽니다
        </p>
        <p className="mt-1.5 max-w-[760px] text-[24px] leading-[1.35] font-semibold">
          이 항목군에서 근거가 기록된 값은{" "}
          <span className="mono">{item.samples}</span>건 중{" "}
          <span className="mono">{item.withReason}</span>건입니다.
        </p>
        <div className="mt-3.5 flex flex-wrap gap-y-2">
          <div className="sm:pr-8">
            <p className="text-[12px] text-[var(--pencil)]">
              6개 항목군 값의 가짓수 합
            </p>
            <p className="mono mt-0.5 text-[24px] leading-none font-semibold">
              {totalDistinct}
              <span className="ml-1 text-[13px]">가지</span>
            </p>
          </div>
          <div className="sm:border-l sm:border-[var(--grid)] sm:pl-8">
            <p className="text-[12px] text-[var(--pencil)]">
              1단계 태깅 표본 (가상)
            </p>
            <p className="mono mt-0.5 text-[24px] leading-none font-semibold">
              40<span className="mx-1 text-[13px]">건</span>
              <span className="text-[13px] text-[var(--pencil)]">／</span>
              30<span className="ml-1 text-[13px]">종</span>
            </p>
            <p className="mt-1.5 text-[12px] leading-[1.5] text-[var(--pencil)]">
              대표 계산서 40건과 계산 도구 30종(그중 14종은 칸 보도가 전한 HDT
              계열). 아래 6개 항목군 표본 합계 261행으로, 목표 250~600행 안입니다.
            </p>
          </div>
        </div>
      </div>

      <div className="grid items-start gap-x-8 gap-y-7 xl:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)]">
        <div>
          <Section
            title="항목군별 대장"
            note="행을 누르면 오른쪽에 층화 분포가 펼쳐집니다"
          >
            <div className="tablewrap">
              <table className="sheet-table min-w-[560px] text-[13px]">
                <thead>
                  <tr className="text-[12px] text-[var(--pencil)]">
                    <th>본부 · 항목</th>
                    <th className="w-[62px] text-right">표본</th>
                    <th className="w-[86px] text-right">값의 가짓수</th>
                    <th className="w-[168px]">사유 부착률</th>
                  </tr>
                </thead>
                <tbody>
                  {ITEMS.map((it) => {
                    const on = it.id === sel;
                    const pct = Math.round((it.withReason / it.samples) * 100);
                    return (
                      <tr
                        key={it.id}
                        onClick={() => setSel(it.id)}
                        tabIndex={0}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" || e.key === " ") {
                            e.preventDefault();
                            setSel(it.id);
                          }
                        }}
                        className="cursor-pointer"
                      >
                        <td>
                          <span className="flex items-baseline gap-2">
                            <span
                              aria-hidden
                              className={[
                                "mt-[3px] inline-block h-[11px] w-[3px] shrink-0",
                                on ? "bg-[var(--ink)]" : "bg-transparent",
                              ].join(" ")}
                            />
                            <span
                              className={
                                on ? "font-semibold" : "text-[var(--pencil)]"
                              }
                            >
                              {it.name}
                            </span>
                            <span className="text-[11.5px] text-[var(--pencil)]">
                              {it.unit}
                            </span>
                          </span>
                          <span className="mt-0.5 block pl-[11px] text-[11.5px] text-[var(--pencil)]">
                            {it.bureau} — 이형 {it.aliases.length}종
                          </span>
                        </td>
                        <td className="mono text-right text-[var(--pencil)]">
                          {it.samples}
                        </td>
                        <td className="text-right">
                          <span
                            className={[
                              "mono text-[19px] font-semibold",
                              on
                                ? "text-[var(--ink)]"
                                : "text-[var(--pencil)]",
                            ].join(" ")}
                          >
                            {it.distinct}
                          </span>
                        </td>
                        <td>
                          <span className="flex items-center gap-2">
                            <span className="relative h-[10px] w-[76px] shrink-0 border-b border-[var(--grid)]">
                              <span
                                className="absolute bottom-0 left-0 block h-[7px]"
                                style={{
                                  width: `${pct}%`,
                                  background: on
                                    ? "var(--ink)"
                                    : "var(--ink-soft)",
                                }}
                              />
                            </span>
                            <span className="mono text-[12px] text-[var(--pencil)]">
                              {it.withReason}/{it.samples}
                            </span>
                          </span>
                          <span className="mt-1 block text-[11.5px] text-[var(--pencil)]">
                            근거 미상 {it.samples - it.withReason}건
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <p className="mt-3 max-w-[620px] text-[12px] leading-[1.65] text-[var(--pencil)]">
              값의 분산 축소는 목표로 걸지 않습니다. 값이 다른 데에는 프로젝트
              조건이 다르다는 정당한 이유가 있을 수 있고, 분산을 목표로 삼는
              순간 중앙값으로 수렴하라는 압력이 생깁니다.
            </p>
          </Section>

          <Section title="가장 가까운 것들과의 거리">
            <div className="tablewrap">
              <table className="sheet-table min-w-[560px] text-[13px]">
                <thead>
                  <tr className="text-[12px] text-[var(--pencil)]">
                    <th className="w-[27%]">가장 가까운 것</th>
                    <th className="w-[36%]">그들이 세는 것</th>
                    <th>이 대장이 세는 것</th>
                  </tr>
                </thead>
                <tbody>
                  {NEIGHBOURS.map((r) => (
                    <tr key={r.a}>
                      <td className="leading-[1.55] font-semibold">{r.a}</td>
                      <td className="leading-[1.55] text-[var(--pencil)]">
                        {r.b}
                      </td>
                      <td className="leading-[1.55]">{r.c}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-3 max-w-[620px] text-[12px] leading-[1.65] text-[var(--pencil)]">
              항목명, 단위, 정의, 표 구조가 전부 달라 같은 항목인지 판정하는
              일이 남습니다. 그 판정이 이 제안이 AI를 쓰는 이유입니다.
            </p>
          </Section>
        </div>

        {/* 층화 분포 + 사유 원문 */}
        <div>
          <Section
            title={`${item.name} — 층화 분포`}
            marks={<Chip kind="ink">규칙 ② 층화 · 표본 수</Chip>}
            note={
              <>이형 사전 : {item.aliases.join(", ")}</>
            }
          >
            <div className="grid gap-x-7 gap-y-5 sm:grid-cols-2">
              {item.strata.map((s) => (
                <div key={s.key}>
                  <p className="flex items-baseline gap-2 border-b border-[var(--hair-2)] pb-1 text-[13px] font-semibold">
                    {s.label}
                    <span className="mono ml-auto text-[12px] font-normal text-[var(--pencil)]">
                      표본 {s.n}건
                    </span>
                  </p>
                  <div className="mt-2">
                    {s.hidden ? (
                      <p className="text-[12.5px] leading-[1.6]">
                        <Chip kind="ink">표본 5건 미만</Chip>
                        <br />
                        <span className="mt-1 inline-block">
                          분포를 표시하지 않습니다. 해당 계산서 원문 링크 {s.n}
                          건만 제공합니다.
                        </span>
                      </p>
                    ) : (
                      <DistBar buckets={s.buckets} />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </Section>

          <Section
            title="값을 누르면 — 그 값을 쓴 프로젝트와 사유 문장 원문"
            note={
              <>
                {item.name} = <span className="mono">0.75</span> — 4건
              </>
            }
          >
            {rows.length === 0 ? (
              <p className="py-3 text-[13px] text-[var(--pencil)]">
                이 목업에서는 동시사용률 0.75의 원문만 예시로 펼쳐 둡니다.
              </p>
            ) : (
              <ul>
                {rows.map((r) => (
                  <li
                    key={r.project}
                    className="border-b border-[var(--hair)] py-2.5 last:border-b-[var(--hair-2)]"
                  >
                    <p className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                      <span className="text-[13px] font-semibold">
                        {r.project}
                      </span>
                      <span className="mono text-[11.5px] text-[var(--pencil)]">
                        {r.file}
                      </span>
                      <span className="mono border-l border-[var(--grid)] pl-3 text-[11.5px] text-[var(--pencil)]">
                        {r.sheet}!{r.cell}
                      </span>
                      <span className="mono ml-auto text-[11.5px] text-[var(--pencil)]">
                        {r.date} {r.author}
                      </span>
                    </p>
                    {r.reason ? (
                      <>
                        <p className="mt-1 text-[13px] leading-[1.6]">
                          “{r.reason}”
                        </p>
                        <p className="mt-0.5 text-[12px] text-[var(--pencil)]">
                          근거 문서 : {r.source}
                        </p>
                      </>
                    ) : (
                      <p className="mt-1.5 text-[13px] leading-[1.6]">
                        <Unknown>근거 미상</Unknown> 사유 문장을 찾지
                        못했습니다. 만들어 내지 않습니다.
                      </p>
                    )}
                  </li>
                ))}
              </ul>
            )}
            <p className="mt-3 max-w-[620px] text-[12px] leading-[1.65] text-[var(--pencil)]">
              대장에는 집계만 남기고, 작성자 식별자는 검토조서 첨부본에만
              남깁니다. 위 담당 표기는 팀 단위 가상 데이터입니다.
            </p>
          </Section>
        </div>
      </div>

      <Foot>
        가상 데이터입니다. 실제 값과 분포는 1단계 파일럿에서 처음 측정됩니다.
        대장은 사내 개선 목적에 한해 사용하고, 과거 산출물의 적정성 판단이나
        계약, 분쟁 자료로 쓰지 않습니다.
      </Foot>
    </>
  );
}
