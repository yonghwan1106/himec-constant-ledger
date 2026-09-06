import { Chip, Foot, Section, SheetHead, Unknown } from "@/components/ui";
import { APPROVAL, ITEMS, METRIC_TREND } from "@/lib/data";

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
              stroke="#c9d6c1"
              strokeWidth="1"
            />
          );
        })}
        <polyline
          points={line}
          fill="none"
          stroke="#1b2a41"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
        <text
          x={pad}
          y={11}
          fontSize="9.5"
          fontWeight="600"
          fill="#6b7a63"
        >
          예시 — 목표치가 아닙니다
        </text>
        {pts.map((p) => (
          <g key={p.label}>
            <circle cx={p.x} cy={p.y} r="2.6" fill="#1b2a41" />
            <text
              x={p.x}
              y={p.y - 8}
              textAnchor={
                p.x <= pad + 1 ? "start" : p.x >= w - pad - 1 ? "end" : "middle"
              }
              fontSize="10"
              fontWeight="600"
              fill="#1b2a41"
            >
              {p.pct}%
            </text>
          </g>
        ))}
      </svg>
      <div className="flex justify-between px-[5%]">
        {METRIC_TREND.map((p) => (
          <span key={p.label} className="text-[11.5px] text-[var(--pencil)]">
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
      <SheetHead
        title="결재 화면의 근거 미상 항목 수 — 그리고 「입력값 출처표」 1쪽"
        lead="차단하지 않습니다. 결재 화면에 한 칸이 늘어날 뿐입니다. 그러나 그 숫자가 보이는 것만으로 검토의 순서와 책임이 바뀝니다."
        marks={<Chip kind="ink">규칙 ④ 서식 출력 · 결재 표시</Chip>}
      />

      <div className="grid items-start gap-x-8 gap-y-0 xl:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)]">
        <Section title="검토조서 결재" note={APPROVAL.doc}>
          <div className="grid gap-6 md:grid-cols-[minmax(0,1fr)_186px]">
            <div>
              <div className="flex flex-wrap text-[12.5px]">
                {[
                  { r: "작성", who: APPROVAL.writer, done: true },
                  { r: "검토", who: "설계 2팀장", done: true },
                  { r: "승인", who: APPROVAL.engineer, done: false },
                ].map((s, i) => (
                  <span
                    key={s.r}
                    className={[
                      "py-1",
                      i === 0
                        ? "pr-3"
                        : "border-l border-[var(--grid)] px-3 last:pr-0",
                      s.done
                        ? "text-[var(--pencil)]"
                        : "font-semibold text-[var(--ink)]",
                    ].join(" ")}
                  >
                    {s.r} {s.who}
                    {s.done ? " 완료" : " 대기"}
                  </span>
                ))}
              </div>

              <ul className="mt-4 space-y-1.5 text-[13px] leading-[1.65]">
                <li>
                  첨부 : <b className="font-semibold">{APPROVAL.reviewSheet}</b>{" "}
                  — 법정 서식이 아니라 사내 검토조서에 붙는 신설 1쪽입니다.
                </li>
                <li>
                  입력 상수 <b className="mono">{APPROVAL.total}</b>건 중 근거가
                  기록된 값 <b className="mono">{APPROVAL.recorded}</b>건.
                </li>
                <li>
                  발주처 제출은{" "}
                  <b className="font-semibold">발주처가 요구할 때만</b> 합니다.
                </li>
              </ul>

              <div className="mt-4 flex flex-wrap gap-2">
                <button className="bg-[var(--stamp)] px-4 py-1.5 text-[13px] font-semibold text-[var(--sheet)]">
                  승인
                </button>
                <button className="border border-[var(--ink)] px-4 py-1.5 text-[13px] font-semibold">
                  반려
                </button>
                <button className="border border-[var(--ink)] px-4 py-1.5 text-[13px] font-semibold">
                  보류
                </button>
              </div>
            </div>

            {/* 근거 미상 카운터 */}
            <div>
              <Unknown>근거 미상 항목 수</Unknown>
              <p className="mono mt-2 text-[38px] leading-none font-semibold">
                {APPROVAL.unknown}
              </p>
              <p className="mt-2 text-[12px] leading-[1.55] text-[var(--pencil)]">
                이 숫자는{" "}
                <b className="font-semibold text-[var(--ink)]">
                  결재를 막지 않습니다.
                </b>{" "}
                보이는 것만으로 순서가 바뀝니다.
              </p>
            </div>
          </div>
        </Section>

        <Section
          title="지표 ① 같은 항목에 쓰는 서로 다른 값의 가짓수"
          note="정수"
        >
          <ul>
            {ITEMS.map((it) => (
              <li key={it.id} className="flex items-center gap-3 py-[3px]">
                <span className="w-[116px] shrink-0 text-[13px]">
                  {it.name}
                </span>
                <span className="relative h-[13px] flex-1 border-b border-[var(--grid)]">
                  <span
                    className="absolute bottom-0 left-0 block h-[9px] bg-[var(--ink)]"
                    style={{ width: `${(it.distinct / 12) * 100}%` }}
                  />
                </span>
                <span className="mono w-[46px] shrink-0 text-right text-[13px] font-semibold">
                  {it.distinct}가지
                </span>
              </li>
            ))}
          </ul>
          <p className="mt-3 text-[12px] leading-[1.65] text-[var(--pencil)]">
            세면 나오는 수입니다. 감소율을 미리 부르지 않습니다.
          </p>
        </Section>
      </div>

      {/* 출처표는 이 화면의 산출물이므로 지면 전폭을 쓴다 */}
      <Section
        title="「입력값 출처표」 1쪽 — 8칸 스키마"
        note="검토조서 첨부, 규칙 ④ 자동 채움"
      >
        <div className="tablewrap">
          <table className="sheet-table min-w-[820px] text-[12.5px]">
            <thead>
              <tr className="text-[12px] text-[var(--pencil)]">
                <th className="w-[15%]">항목</th>
                <th className="w-[68px] text-right">적용값</th>
                <th className="w-[56px]">단위</th>
                <th className="w-[27%]">사유 한 줄</th>
                <th className="w-[19%]">근거 문서</th>
                <th>회사 분포 내 위치</th>
              </tr>
            </thead>
            <tbody>
              {APPROVAL.rows.map((r) => (
                <tr key={r.item}>
                  <td className="leading-[1.5] font-semibold">{r.item}</td>
                  <td className="mono text-right font-semibold">{r.value}</td>
                  <td className="text-[var(--pencil)]">{r.unit}</td>
                  <td className="leading-[1.5]">
                    {r.reason ?? (
                      <Unknown>근거 미상 — 사유를 만들어 내지 않습니다</Unknown>
                    )}
                  </td>
                  <td className="leading-[1.5] text-[var(--pencil)]">
                    {r.source ?? "—"}
                  </td>
                  <td className="leading-[1.5] text-[var(--pencil)]">
                    {r.pos}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-3 flex flex-wrap items-end justify-between gap-4">
          <p className="max-w-[520px] text-[12px] leading-[1.6] text-[var(--pencil)]">
            남은 두 칸은 작성자와 확인자입니다. 작성자 식별자는 이 첨부본에만
            남고, 사내 대장에는 집계만 남습니다.
          </p>
          <div className="flex items-center gap-5">
            <span className="text-[12px] text-[var(--pencil)]">
              작성 {APPROVAL.writer}
            </span>
            <span className="flex items-center gap-2.5 text-[12px] text-[var(--stamp)]">
              확인 {APPROVAL.engineer}
              <span
                aria-hidden
                className="inline-block h-[30px] w-[30px] rounded-full border-[1.5px] border-[var(--stamp)]"
              />
            </span>
          </div>
        </div>
      </Section>

      <div className="grid items-start gap-x-8 gap-y-0 lg:grid-cols-2">
        <Section title="지표 ② 사유가 붙은 값의 비율" note="월별 추이, 파일럿 3개월">
          <div className="max-w-[420px]">
            <Trend />
          </div>
          <p className="mt-3 text-[12px] leading-[1.65] text-[var(--pencil)]">
            1단계의 이 지표는 40건 태깅에서 사유가 발견된 행의 비율(과거 소급
            계열)이고, 신규 입력 계열은 2단계 패널 가동일부터 셉니다. 착수 시점
            값이 기준선이 됩니다. 정확도를 목표로 걸지 않고, 값의 분산 축소도
            목표로 걸지 않습니다.
          </p>
        </Section>

        <Section title="이 화면이 넘지 않는 선">
          <ul className="space-y-2 text-[13px] leading-[1.65]">
            <li>
              <b className="font-semibold">차단하지 않습니다.</b> 근거 미상이
              남아도 결재는 진행됩니다.
            </li>
            <li>
              <b className="font-semibold">값을 제안하지 않습니다.</b> 화면
              어디에도 “이 값을 쓰십시오”가 없습니다.
            </li>
            <li>
              <b className="font-semibold">적정성을 판정하지 않습니다.</b> 과거
              산출물의 옳고 그름을 다루지 않습니다.
            </li>
            <li>
              <b className="font-semibold">사람을 세지 않습니다.</b> 대장에는
              집계만 남습니다.
            </li>
          </ul>
        </Section>
      </div>

      <Foot>
        수치는 전부 가상 데이터입니다. 추이 그래프는 화면 예시이며, 실제 값은
        파일럿 착수 시점에 처음 측정됩니다.
      </Foot>
    </>
  );
}
