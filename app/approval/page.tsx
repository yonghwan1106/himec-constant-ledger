import { Badge, Card, Foot, PageHead } from "@/components/ui";
import { APPROVAL, ITEMS, METRIC_TREND } from "@/lib/data";
import { CircleAlert, FileCheck2, Stamp } from "lucide-react";

function Trend() {
  const w = 300;
  const h = 100;
  const pad = 22;
  const padY = 16;
  const max = 60;
  const pts = METRIC_TREND.map((p, i) => {
    const x = pad + (i * (w - pad * 2)) / (METRIC_TREND.length - 1);
    const y = h - padY - (p.pct / max) * (h - padY * 2);
    return { ...p, x, y };
  });
  const line = pts.map((p) => `${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(" ");
  const area = `${pad},${h - padY} ${line} ${w - pad},${h - padY}`;

  return (
    <div>
      <svg
        viewBox={`0 0 ${w} ${h}`}
        className="w-full"
        role="img"
        aria-label="사유가 붙은 값의 비율 월별 추이"
      >
        {[0, 20, 40, 60].map((g) => {
          const y = h - padY - (g / max) * (h - padY * 2);
          return (
            <line
              key={g}
              x1={pad}
              x2={w - pad}
              y1={y}
              y2={y}
              stroke="#e0ded6"
              strokeWidth="1"
            />
          );
        })}
        <polygon points={area} fill="rgba(15,107,102,0.10)" />
        <polyline
          points={line}
          fill="none"
          stroke="#0f6b66"
          strokeWidth="2"
          strokeLinejoin="round"
        />
        {pts.map((p) => (
          <g key={p.label}>
            <circle cx={p.x} cy={p.y} r="3.4" fill="#0f6b66" />
            <text
              x={p.x}
              y={p.y - 8}
              textAnchor={
                p.x <= pad + 1 ? "start" : p.x >= w - pad - 1 ? "end" : "middle"
              }
              fontSize="10.5"
              fontWeight="700"
              fill="#0f6b66"
            >
              {p.pct}%
            </text>
          </g>
        ))}
      </svg>
      <div className="flex justify-between px-[5%]">
        {METRIC_TREND.map((p) => (
          <span key={p.label} className="text-[10.5px] text-[var(--ink-3)]">
            {p.label}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function ApprovalScreen() {
  return (
    <>
      <PageHead
        n="4"
        title="결재 화면의 근거 미상 항목 수 — 그리고 「입력값 출처표」 1쪽"
        lead="차단하지 않습니다. 결재 화면에 한 칸이 늘어날 뿐입니다. 그러나 그 숫자가 보이는 것만으로 검토의 순서와 책임이 바뀝니다."
        right={<Badge kind="rule">규칙 ④ 서식 출력 · 결재 표시</Badge>}
      />

      <div className="grid gap-4 px-7 py-5 xl:grid-cols-[1.45fr_1fr]">
        <div className="space-y-4">
          {/* 결재 카드 */}
          <Card
            title="검토조서 결재"
            tag={
              <span className="mono text-[11px] text-[var(--ink-3)]">
                {APPROVAL.doc}
              </span>
            }
          >
            <div className="grid gap-3 md:grid-cols-[1fr_212px]">
              <div>
                <div className="flex items-center gap-2 text-[12px]">
                  {[
                    { r: "작성", who: APPROVAL.writer, on: true },
                    { r: "검토", who: "설계 2팀장", on: true },
                    { r: "승인", who: APPROVAL.engineer, on: false },
                  ].map((s, i) => (
                    <span key={s.r} className="flex items-center gap-2">
                      {i > 0 ? (
                        <span className="text-[var(--rule-2)]">›</span>
                      ) : null}
                      <span
                        className={[
                          "rounded-[4px] border px-2 py-1",
                          s.on
                            ? "border-[var(--rule-2)] bg-[#f2f1ec] text-[var(--ink-2)]"
                            : "border-[var(--sign)] bg-[var(--sign-bg)] font-bold text-[var(--sign)]",
                        ].join(" ")}
                      >
                        {s.r} · {s.who}
                        {s.on ? " ✓" : " · 대기"}
                      </span>
                    </span>
                  ))}
                </div>

                <ul className="mt-3 space-y-1 text-[12.5px] leading-relaxed text-[var(--ink)]">
                  <li>
                    첨부 : <b>{APPROVAL.reviewSheet}</b> — 법정 서식이 아니라
                    사내 검토조서에 붙는 신설 1쪽입니다.
                  </li>
                  <li>
                    입력 상수 <b className="mono">{APPROVAL.total}</b>건 중 근거가
                    기록된 값 <b className="mono">{APPROVAL.recorded}</b>건.
                  </li>
                  <li>
                    발주처 제출은 <b>발주처가 요구할 때만</b> 합니다.
                  </li>
                </ul>

                <div className="mt-3 flex gap-2">
                  <button className="rounded-[4px] bg-[var(--sign)] px-3 py-1.5 text-[12.5px] font-bold text-white">
                    승인
                  </button>
                  <button className="rounded-[4px] border border-[var(--rule-2)] bg-white px-3 py-1.5 text-[12.5px] font-semibold text-[var(--ink-2)]">
                    반려
                  </button>
                  <button className="rounded-[4px] border border-[var(--rule-2)] bg-white px-3 py-1.5 text-[12.5px] font-semibold text-[var(--ink-2)]">
                    보류
                  </button>
                </div>
              </div>

              {/* 카운터 */}
              <div className="rounded-md border-2 border-[#e8c68a] bg-[var(--unknown-bg)] px-3 py-3 text-center">
                <p className="flex items-center justify-center gap-1 text-[12px] font-bold text-[var(--unknown)]">
                  <CircleAlert size={13} /> 근거 미상 항목 수
                </p>
                <p className="mono mt-1 text-[46px] font-bold leading-none text-[var(--unknown)]">
                  {APPROVAL.unknown}
                </p>
                <p className="mt-1.5 text-[11.5px] leading-snug text-[var(--ink-2)]">
                  이 숫자는 <b>결재를 막지 않습니다.</b>
                  <br />
                  보이는 것만으로 순서가 바뀝니다.
                </p>
              </div>
            </div>
          </Card>

          {/* 출처표 */}
          <Card
            title="「입력값 출처표」 1쪽 — 8칸 스키마"
            tag={
              <span className="flex items-center gap-1.5">
                <FileCheck2 size={13} className="text-[var(--ink-3)]" />
                <span className="mono text-[11px] text-[var(--ink-3)]">
                  검토조서 첨부 · 자동 채움
                </span>
              </span>
            }
          >
            <div className="overflow-x-auto">
              <table className="w-full min-w-[720px] text-left text-[11.5px]">
                <thead>
                  <tr className="border-y border-[var(--ink)] bg-[#f7f6f1] text-[10.5px] text-[var(--ink-2)]">
                    <th className="px-1.5 py-1.5 font-semibold">항목</th>
                    <th className="px-1.5 py-1.5 font-semibold">적용값</th>
                    <th className="px-1.5 py-1.5 font-semibold">단위</th>
                    <th className="px-1.5 py-1.5 font-semibold">사유 한 줄</th>
                    <th className="px-1.5 py-1.5 font-semibold">근거 문서</th>
                    <th className="px-1.5 py-1.5 font-semibold">
                      회사 분포 내 위치
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {APPROVAL.rows.map((r) => {
                    const bad = r.state === "근거 미상";
                    return (
                      <tr
                        key={r.item}
                        className={[
                          "border-b border-[var(--rule)] align-top",
                          bad ? "bg-[var(--unknown-bg)]" : "",
                        ].join(" ")}
                      >
                        <td className="px-1.5 py-1.5 font-semibold">{r.item}</td>
                        <td className="mono px-1.5 py-1.5 font-bold">
                          {r.value}
                        </td>
                        <td className="mono px-1.5 py-1.5 text-[var(--ink-3)]">
                          {r.unit}
                        </td>
                        <td className="px-1.5 py-1.5 leading-snug">
                          {r.reason ?? (
                            <span className="font-bold text-[var(--unknown)]">
                              근거 미상 — 사유를 만들어 내지 않습니다
                            </span>
                          )}
                        </td>
                        <td className="px-1.5 py-1.5 leading-snug text-[var(--ink-2)]">
                          {r.source ?? "—"}
                        </td>
                        <td className="px-1.5 py-1.5 leading-snug text-[var(--ink-2)]">
                          {r.pos}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <div className="mt-2.5 flex flex-wrap items-end justify-between gap-3">
              <p className="max-w-[430px] text-[11px] leading-relaxed text-[var(--ink-3)]">
                남은 두 칸은 작성자 · 확인자입니다. 작성자 식별자는 이 첨부본에만
                남고, 사내 대장에는 집계만 남습니다.
              </p>
              <div className="flex items-end gap-3">
                <span className="text-[11px] text-[var(--ink-3)]">
                  작성 {APPROVAL.writer}
                </span>
                <span className="flex items-center gap-1.5 text-[11px] text-[var(--ink-3)]">
                  확인 {APPROVAL.engineer}
                  <Stamp size={22} className="text-[var(--rule-2)]" />
                </span>
              </div>
            </div>
          </Card>
        </div>

        {/* 지표 2개 */}
        <div className="space-y-4">
          <Card
            title="지표 ① 같은 항목에 쓰는 서로 다른 값의 가짓수"
            tag={<span className="text-[11px] text-[var(--ink-3)]">정수</span>}
          >
            <ul className="space-y-[5px]">
              {ITEMS.map((it) => (
                <li key={it.id} className="flex items-center gap-2">
                  <span className="w-[112px] shrink-0 text-[12px]">
                    {it.name}
                  </span>
                  <span className="relative h-[13px] flex-1 rounded-[2px] bg-[#f0efe9]">
                    <span
                      className="absolute inset-y-0 left-0 rounded-[2px] bg-[var(--sign)]"
                      style={{ width: `${(it.distinct / 12) * 100}%` }}
                    />
                  </span>
                  <span className="mono w-[46px] shrink-0 text-right text-[12px] font-bold">
                    {it.distinct}가지
                  </span>
                </li>
              ))}
            </ul>
            <p className="mt-2 text-[11.5px] leading-relaxed text-[var(--ink-3)]">
              세면 나오는 수입니다. 감소율을 미리 부르지 않습니다.
            </p>
          </Card>

          <Card
            title="지표 ② 사유가 붙은 값의 비율"
            tag={
              <span className="text-[11px] text-[var(--ink-3)]">
                월별 추이 · 파일럿 3개월
              </span>
            }
          >
            <Trend />
            <p className="mt-2 text-[11.5px] leading-relaxed text-[var(--ink-3)]">
              착수 시점 값이 기준선이 됩니다. 정확도를 목표로 걸지 않고, 값의
              분산 축소도 목표로 걸지 않습니다.
            </p>
          </Card>

          <Card title="이 화면이 넘지 않는 선">
            <ul className="space-y-1.5 text-[12px] leading-relaxed text-[var(--ink)]">
              <li>
                <b>차단하지 않습니다.</b> 근거 미상이 남아도 결재는 진행됩니다.
              </li>
              <li>
                <b>값을 제안하지 않습니다.</b> 화면 어디에도 “이 값을 쓰십시오”가
                없습니다.
              </li>
              <li>
                <b>적정성을 판정하지 않습니다.</b> 과거 산출물의 옳고 그름을
                다루지 않습니다.
              </li>
              <li>
                <b>사람을 세지 않습니다.</b> 대장에는 집계만 남습니다.
              </li>
            </ul>
          </Card>
        </div>
      </div>

      <Foot>
        수치는 전부 가상 데이터입니다. 추이 그래프는 화면 예시이며, 실제 값은
        파일럿 착수 시점에 처음 측정됩니다.
      </Foot>
    </>
  );
}
