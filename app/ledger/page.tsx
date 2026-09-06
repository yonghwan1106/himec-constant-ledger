"use client";

import { useState } from "react";
import { Badge, Card, DistBar, Foot, PageHead } from "@/components/ui";
import { ITEMS, REASONS } from "@/lib/data";
import { FileSpreadsheet, MousePointerClick } from "lucide-react";

export default function LedgerScreen() {
  const [sel, setSel] = useState(ITEMS[0].id);
  const item = ITEMS.find((i) => i.id === sel)!;
  const rows = REASONS[item.id] ?? [];
  const totalDistinct = ITEMS.reduce((a, b) => a + b.distinct, 0);

  return (
    <>
      <PageHead
        n="2"
        title="사내 상수 분포 대장 — 가짓수와 층화 분포"
        lead="아무도 세어 본 적이 없는 정수 하나에서 시작합니다. 같은 항목에 회사가 실제로 쓰고 있는 값이 몇 가지인가, 그 가운데 사유가 기록된 값은 몇 건인가."
        right={
          <div className="flex gap-1.5">
            <Badge kind="rule">규칙 ① ②</Badge>
            <Badge kind="ai">AI ② 사유 원문</Badge>
          </div>
        }
      />

      <div className="px-7 py-5">
        {/* 1차 산출물 한 줄 */}
        <div className="mb-4 flex flex-wrap items-center gap-4 rounded-lg border border-[var(--sign)] bg-[var(--sign-bg)] px-5 py-3.5">
          <div>
            <p className="text-[11.5px] font-semibold tracking-wide text-[var(--sign)]">
              1단계 1차 산출물 · 첫 화면은 분포가 아니라 한 줄로 엽니다
            </p>
            <p className="mt-1 text-[19px] font-bold leading-tight text-[var(--ink)]">
              이 항목군에서 근거가 기록된 값은{" "}
              <span className="mono text-[var(--sign)]">{item.samples}</span>건
              중 <span className="mono text-[var(--sign)]">{item.withReason}</span>
              건입니다.
            </p>
          </div>
          <div className="ml-auto flex items-stretch gap-4">
            <div className="rounded-md border border-[#bccee4] bg-white px-3.5 py-2 text-right">
              <p className="text-[11px] text-[var(--ink-2)]">
                6개 항목군 값의 가짓수 합
              </p>
              <p className="mono text-[24px] font-bold leading-tight text-[var(--ink)]">
                {totalDistinct}
                <span className="text-[12px] font-semibold">가지</span>
              </p>
            </div>
            <div className="rounded-md border border-[#bccee4] bg-white px-3.5 py-2 text-right">
              <p className="text-[11px] text-[var(--ink-2)]">
                1단계 태깅 표본 (가상)
              </p>
              <p className="mono text-[24px] font-bold leading-tight text-[var(--ink)]">
                40<span className="text-[12px] font-semibold">건</span>
                <span className="px-1 text-[12px] text-[var(--ink-3)]">/</span>
                30<span className="text-[12px] font-semibold">종</span>
              </p>
            </div>
          </div>
        </div>

        <div className="grid items-start gap-4 xl:grid-cols-[1.05fr_1fr]">
          {/* 항목군 표 */}
          <Card
            title="항목군별 대장"
            tag={
              <span className="text-[11px] text-[var(--ink-3)]">
                행을 누르면 오른쪽에 층화 분포가 펼쳐집니다
              </span>
            }
          >
            <table className="w-full text-left text-[12.5px]">
              <thead>
                <tr className="border-b border-[var(--rule-2)] text-[11px] text-[var(--ink-3)]">
                  <th className="pb-1.5 font-semibold">본부 · 항목</th>
                  <th className="pb-1.5 text-center font-semibold">표본</th>
                  <th className="pb-1.5 text-center font-semibold">
                    값의 가짓수
                  </th>
                  <th className="pb-1.5 font-semibold">사유 부착률</th>
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
                      className={[
                        "cursor-pointer border-b border-dashed border-[var(--rule)] last:border-0",
                        on ? "bg-[var(--sign-bg)]" : "hover:bg-[#faf9f5]",
                      ].join(" ")}
                    >
                      <td className="py-2.5 pr-2">
                        <span className="flex items-center gap-1.5">
                          {on ? (
                            <MousePointerClick
                              size={13}
                              className="text-[var(--sign)]"
                            />
                          ) : (
                            <span className="w-[13px]" />
                          )}
                          <span className="font-bold">{it.name}</span>
                          <span className="mono text-[10.5px] text-[var(--ink-3)]">
                            {it.unit}
                          </span>
                        </span>
                        <span className="mt-0.5 block pl-[19px] text-[11px] text-[var(--ink-3)]">
                          {it.bureau} · 이형 {it.aliases.length}종
                        </span>
                      </td>
                      <td className="mono py-2.5 text-center text-[var(--ink-2)]">
                        {it.samples}
                      </td>
                      <td className="py-2.5 text-center">
                        <span
                          className={[
                            "mono inline-block min-w-[30px] rounded-[4px] px-1.5 py-[2px] text-[15px] font-bold",
                            on
                              ? "bg-[var(--sign)] text-white"
                              : "bg-[#f0efe9] text-[var(--ink)]",
                          ].join(" ")}
                        >
                          {it.distinct}
                        </span>
                      </td>
                      <td className="py-2.5 pl-2">
                        <span className="flex items-center gap-1.5">
                          <span className="relative h-[10px] w-[74px] rounded-[2px] bg-[#f0efe9]">
                            <span
                              className="absolute inset-y-0 left-0 rounded-[2px] bg-[var(--rule-c)]"
                              style={{ width: `${pct}%` }}
                            />
                          </span>
                          <span className="mono text-[11.5px] text-[var(--ink-2)]">
                            {it.withReason}/{it.samples}
                          </span>
                        </span>
                        <span className="mt-0.5 block text-[10.5px] text-[var(--unknown)]">
                          근거 미상 {it.samples - it.withReason}건
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <p className="mt-2.5 text-[11.5px] leading-relaxed text-[var(--ink-3)]">
              값의 분산 축소는 목표로 걸지 않습니다. 값이 다른 데에는 프로젝트
              조건이 다르다는 정당한 이유가 있을 수 있고, 분산을 목표로 삼는
              순간 중앙값으로 수렴하라는 압력이 생깁니다.
            </p>
          </Card>

          {/* 층화 분포 + 사유 원문 */}
          <div className="space-y-4">
            <Card
              title={`${item.name} — 층화 분포`}
              tag={<Badge kind="rule">규칙 ② 층화 · 표본 수</Badge>}
            >
              <p className="mono mb-2 text-[11px] text-[var(--ink-3)]">
                이형 사전 : {item.aliases.join(" · ")}
              </p>
              <div className="grid gap-3 sm:grid-cols-2">
                {item.strata.map((s) => (
                  <div
                    key={s.key}
                    className="rounded-md border border-[var(--rule)] bg-[#fbfaf7] px-2.5 py-2"
                  >
                    <p className="flex items-baseline gap-1.5 text-[11.5px] font-semibold text-[var(--ink)]">
                      {s.label}
                      <span className="mono ml-auto text-[11px] font-normal text-[var(--ink-3)]">
                        표본 {s.n}건
                      </span>
                    </p>
                    <div className="mt-1.5">
                      {s.hidden ? (
                        <p className="rounded-[4px] border border-dashed border-[#e8c68a] bg-[var(--unknown-bg)] px-2 py-2 text-[11.5px] leading-snug text-[var(--unknown)]">
                          표본 5건 미만 — <b>분포를 표시하지 않습니다.</b>
                          <br />
                          해당 계산서 원문 링크 {s.n}건만 제공합니다.
                        </p>
                      ) : (
                        <DistBar buckets={s.buckets} />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            <Card
              title="값을 누르면 — 그 값을 쓴 프로젝트와 사유 문장 원문"
              tag={
                <span className="mono text-[11px] text-[var(--ink-3)]">
                  {item.name} = 0.75 · 4건
                </span>
              }
            >
              {rows.length === 0 ? (
                <p className="py-3 text-center text-[12px] text-[var(--ink-3)]">
                  이 목업에서는 동시사용률 0.75의 원문만 예시로 펼쳐 둡니다.
                </p>
              ) : (
                <ul className="space-y-1.5">
                  {rows.map((r) => (
                    <li
                      key={r.project}
                      className="rounded-md border border-[var(--rule)] px-2.5 py-2"
                    >
                      <p className="flex flex-wrap items-center gap-1.5">
                        <FileSpreadsheet
                          size={13}
                          className="text-[var(--ink-3)]"
                        />
                        <span className="text-[12.5px] font-bold">
                          {r.project}
                        </span>
                        <span className="mono rounded-[3px] bg-[#f2f1ec] px-1.5 py-[1px] text-[10.5px] text-[var(--ink-2)]">
                          {r.file} · {r.sheet}!{r.cell}
                        </span>
                        <span className="mono ml-auto text-[10.5px] text-[var(--ink-3)]">
                          {r.date} · {r.author}
                        </span>
                      </p>
                      {r.reason ? (
                        <>
                          <p className="mt-1 text-[12px] leading-snug text-[var(--ink)]">
                            “{r.reason}”
                          </p>
                          <p className="mt-0.5 text-[11px] text-[var(--ink-3)]">
                            근거 문서 : {r.source}
                          </p>
                        </>
                      ) : (
                        <p className="mt-1 flex items-center gap-1.5 text-[12px] font-semibold text-[var(--unknown)]">
                          <Badge kind="unknown">근거 미상</Badge>
                          사유 문장을 찾지 못했습니다 — 만들어 내지 않습니다
                        </p>
                      )}
                    </li>
                  ))}
                </ul>
              )}
              <p className="mt-2 text-[11.5px] leading-relaxed text-[var(--ink-3)]">
                대장에는 집계만 남기고, 작성자 식별자는 검토조서 첨부본에만
                남깁니다. 위 담당 표기는 팀 단위 가상 데이터입니다.
              </p>
            </Card>
          </div>
        </div>
      </div>

      <Foot>
        가상 데이터입니다. 실제 값과 분포는 1단계 파일럿에서 처음 측정됩니다.
        대장은 사내 개선 목적에 한해 사용하고, 과거 산출물의 적정성 판단이나
        계약 · 분쟁 자료로 쓰지 않습니다.
      </Foot>
    </>
  );
}
