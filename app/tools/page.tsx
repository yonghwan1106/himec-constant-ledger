import { Badge, Card, Foot, KeyVal, PageHead } from "@/components/ui";
import { TOOLS } from "@/lib/data";
import { CalendarClock, ShieldAlert, UserRound } from "lucide-react";

const CONF: Record<string, "plain" | "ai" | "unknown"> = {
  확정: "plain",
  "추정 · 확신 중간": "ai",
  "추정 · 확신 낮음": "unknown",
};

export default function ToolsScreen() {
  const orphan = TOOLS.filter((t) => !t.owner);
  const unknownConsts = TOOLS.flatMap((t) =>
    t.consts.filter((c) => !c.basis),
  ).length;
  const focus = TOOLS[0];

  return (
    <>
      <PageHead
        n="3"
        title="도구 근거표 — 도구 1건당 1쪽, 소유자와 재검증 기한"
        lead="자동화가 진행될수록 상수는 더 깊이 숨습니다. 시트에서 코드로 들어간 숫자에는 라벨조차 붙지 않습니다. 도구 1건당 한 쪽을 만들어, 박혀 있는 상수와 그 근거, 소유자, 재검증 기한을 적습니다."
        right={
          <div className="flex gap-1.5">
            <Badge kind="ai">AI ① 의미 추정</Badge>
            <Badge kind="rule">규칙 ④ 서식 출력</Badge>
          </div>
        }
      />

      <div className="px-7 py-5">
        {/* 요약 */}
        <div className="mb-4 grid gap-3 sm:grid-cols-4">
          {[
            {
              k: "등재된 사내 계산 도구",
              v: "6",
              s: "가상 데이터 · 1단계 태깅 목표는 30종",
              tone: "",
            },
            {
              k: "근거가 적히지 않은 상수",
              v: String(unknownConsts),
              s: "「근거 미상」 라벨이 붙은 상수의 수",
              tone: "unknown",
            },
            {
              k: "소유자 미지정 도구",
              v: String(orphan.length),
              s: "라벨이 붙는 그 순간 지정 대상이 됩니다",
              tone: "unknown",
            },
            {
              k: "재검증 기한 없는 도구",
              v: String(TOOLS.filter((t) => !t.recheck).length),
              s: "지금은 아무도 이 시트를 회수하지 않습니다",
              tone: "unknown",
            },
          ].map((c) => (
            <div
              key={c.k}
              className={[
                "rounded-lg border bg-white px-3.5 py-3",
                c.tone === "unknown"
                  ? "border-[#e8c68a]"
                  : "border-[var(--rule)]",
              ].join(" ")}
            >
              <p className="text-[11.5px] text-[var(--ink-2)]">{c.k}</p>
              <p
                className={[
                  "mono mt-0.5 text-[26px] font-bold leading-none",
                  c.tone === "unknown"
                    ? "text-[var(--unknown)]"
                    : "text-[var(--ink)]",
                ].join(" ")}
              >
                {c.v}
              </p>
              <p className="mt-1 text-[11px] leading-snug text-[var(--ink-3)]">
                {c.s}
              </p>
            </div>
          ))}
        </div>

        <div className="grid items-start gap-4 xl:grid-cols-[1.72fr_1fr]">
          <Card title="사내 계산 도구에 박혀 있는 상수">
            <table className="w-full table-fixed text-left text-[12px]">
              <thead>
                <tr className="border-b border-[var(--rule-2)] text-[11px] text-[var(--ink-3)]">
                  <th className="w-[23%] pb-1.5 font-semibold">도구 · 버전</th>
                  <th className="w-[17%] pb-1.5 font-semibold">상수 · 위치</th>
                  <th className="w-[22%] pb-1.5 font-semibold">추정 또는 확정된 의미</th>
                  <th className="w-[19%] pb-1.5 font-semibold">근거</th>
                  <th className="w-[19%] pb-1.5 font-semibold">소유자 · 재검증</th>
                </tr>
              </thead>
              <tbody>
                {TOOLS.map((t) =>
                  t.consts.map((c, i) => (
                    <tr
                      key={t.id + c.symbol}
                      className={[
                        "align-top",
                        i === t.consts.length - 1
                          ? "border-b border-[var(--rule)]"
                          : "",
                        !c.basis ? "bg-[var(--unknown-bg)]/60" : "",
                      ].join(" ")}
                    >
                      {i === 0 ? (
                        <td
                          rowSpan={t.consts.length}
                          className="border-r border-dashed border-[var(--rule)] py-2 pr-2"
                        >
                          <span className="mono text-[10.5px] text-[var(--ink-3)]">
                            {t.id}
                          </span>
                          <p className="text-[12px] font-bold leading-snug">
                            {t.name}
                          </p>
                          <p className="mono text-[10.5px] text-[var(--ink-3)]">
                            {t.version} · {t.kind}
                          </p>
                        </td>
                      ) : null}
                      <td className="py-2 pr-2">
                        <span className="mono rounded-[3px] border border-[var(--rule-2)] bg-[#f7f6f1] px-1.5 py-[1px] text-[12px] font-bold">
                          {c.symbol}
                        </span>
                        <p className="mono mt-0.5 text-[10.5px] leading-snug text-[var(--ink-3)]">
                          {c.where}
                        </p>
                      </td>
                      <td className="py-2 pr-2 leading-snug">
                        {c.meaning}
                        <p className="mt-0.5">
                          <Badge kind={CONF[c.confidence]}>
                            {c.confidence}
                          </Badge>
                        </p>
                      </td>
                      <td className="py-2 pr-2 leading-snug">
                        {c.basis ? (
                          <span className="text-[var(--ink-2)]">{c.basis}</span>
                        ) : (
                          <Badge kind="unknown">근거 미상</Badge>
                        )}
                      </td>
                      {i === 0 ? (
                        <td rowSpan={t.consts.length} className="py-2">
                          {t.owner ? (
                            <>
                              <p className="flex items-center gap-1 text-[11.5px]">
                                <UserRound
                                  size={12}
                                  className="text-[var(--ink-3)]"
                                />
                                {t.owner}
                              </p>
                              <p className="mono mt-0.5 flex items-center gap-1 text-[11px] text-[var(--ink-2)]">
                                <CalendarClock
                                  size={12}
                                  className="text-[var(--ink-3)]"
                                />
                                {t.recheck}
                              </p>
                            </>
                          ) : (
                            <>
                              <Badge kind="unknown">
                                <ShieldAlert size={11} /> 소유자 지정 대상
                              </Badge>
                              <p className="mt-1 text-[11px] leading-snug text-[var(--ink-2)]">
                                재검증 기한 미지정
                              </p>
                            </>
                          )}
                        </td>
                      ) : null}
                    </tr>
                  )),
                )}
              </tbody>
            </table>
            <p className="mt-2.5 text-[11.5px] leading-relaxed text-[var(--ink-3)]">
              도구의 내부 구조가 파악된 것부터 붙이고, 나머지는 「도구 1건당
              근거표 1쪽」이라는 비실시간 경로로 대체합니다. 등재 심사 시점에
              근거표를 제출하는 방식이므로 실시간 연동이 필요하지 않습니다.
            </p>
          </Card>

          {/* 서식 1쪽 */}
          <Card
            title="「도구 근거표」 1쪽 서식(안)"
            tag={
              <span className="mono text-[11px] text-[var(--ink-3)]">
                규칙 ④ 자동 채움
              </span>
            }
          >
            <div className="rounded-md border-2 border-[var(--rule-2)] bg-[#fbfaf7] px-3.5 py-3">
              <p className="border-b border-[var(--ink)] pb-1.5 text-center text-[13.5px] font-bold tracking-wide">
                도 구 근 거 표
              </p>
              <div className="mt-2">
                <KeyVal k="도구명" v={focus.name} />
                <KeyVal k="버전" v={focus.version} mono />
                <KeyVal k="형태" v={focus.kind} />
                <KeyVal
                  k="박혀 있는 상수"
                  v={focus.consts.map((c) => c.symbol).join(" · ")}
                  mono
                />
                <KeyVal
                  k="추정 의미"
                  v={
                    <>
                      ×1.15 — 안전율로 보이나 대상이 특정되지 않음{" "}
                      <Badge kind="unknown">확신 낮음</Badge>
                      <br />
                      119 — 인체발열 원단위(W/인) <Badge>확정</Badge>
                    </>
                  }
                />
                <KeyVal
                  k="근거"
                  v={
                    <>
                      ×1.15 : <b className="text-[var(--unknown)]">근거 미상</b>
                      <br />
                      119 : 항목 확정 2026-05-04 · 기계본부 기술사
                    </>
                  }
                />
                <KeyVal
                  k="소유자"
                  v={
                    <span className="text-[var(--unknown)]">
                      미지정 → <b>지정 대상</b>(근거 미상 상수 보유)
                    </span>
                  }
                />
                <KeyVal
                  k="재검증 기한"
                  v={
                    <span className="text-[var(--unknown)]">
                      미지정 → 소유자 지정과 동시에 부여
                    </span>
                  }
                />
              </div>
              <div className="mt-3 flex items-end justify-between border-t border-dashed border-[var(--rule-2)] pt-2">
                <p className="text-[11px] text-[var(--ink-3)]">
                  도구 등재 심사 제출본 · 사내 검토조서 첨부
                </p>
                <div className="flex items-end gap-2">
                  <span className="text-[11px] text-[var(--ink-3)]">
                    확인 (본부 기술사)
                  </span>
                  <span className="inline-block h-[26px] w-[26px] rounded-full border border-dashed border-[var(--rule-2)]" />
                </div>
              </div>
            </div>

            <div className="mt-3 rounded-md border border-[#e8c68a] bg-[var(--unknown-bg)] px-3 py-2.5">
              <p className="text-[12px] leading-relaxed text-[var(--ink)]">
                <b>간판 장면에 대한 정직한 답.</b> J열의 1.15에 대해 이 도구가
                낼 수 있는 답은 <b>근거 미상 하나</b>입니다. 그리고 근거 미상
                라벨이 붙은 도구는 그 순간{" "}
                <b>소유자와 재검증 기한이 지정되는 대상</b>이 됩니다 — 지금은 그
                라벨조차 붙지 않아 아무도 그 시트를 회수하지 않습니다.
              </p>
            </div>
          </Card>
        </div>
      </div>

      <Foot>
        도구명 · 버전 · 상수 · 담당 표기는 전부 가상 데이터입니다. 실제 사내
        도구의 내부 구조는 <b>확인 필요</b>이며, 1단계 보유 현황 실사 과업으로
        다룹니다.
      </Foot>
    </>
  );
}
