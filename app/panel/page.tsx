"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Chip, DistBar, Foot, Section, SheetHead, Unknown } from "@/components/ui";
import { ITEMS, REASONS } from "@/lib/data";

const ITEM = ITEMS[0]; // 동시사용률
const CURRENT = "0.75";

const SHEET_ROWS = [
  { r: 18, a: "사무 · 기준층", b: "=D8*E18*H18", c: "0.70", d: "3,972 W" },
  { r: 19, a: "사무 · 기준층", b: "=D8*E19*H19", c: "0.70", d: "4,110 W" },
  { r: 20, a: "회의 · 기준층", b: "=D8*E20*H20", c: "0.65", d: "2,884 W" },
  { r: 21, a: "사무 · 지원동", b: "=D8*E21*H21", c: "0.80", d: "5,014 W" },
];

const AI_CANDIDATES = [
  { t: "안전율 / 설계 여유", p: 41 },
  { t: "환기 여유율", p: 23 },
  { t: "장래 증설 대비 계수", p: 17 },
];

export default function PanelScreen() {
  const [stratum, setStratum] = useState(ITEM.strata[0].key);
  const [reason, setReason] = useState(
    "발주처 설계지침(예시) 3.2절이 지원동 사무실 하한을 0.75로 정함",
  );
  const [signed, setSigned] = useState(false);
  const [unknown, setUnknown] = useState(false);
  // 이 화면의 유일한 모션 — 값을 넣은 셀 옆에 메모지가 붙는다
  const [attached, setAttached] = useState(false);

  useEffect(() => {
    const id = requestAnimationFrame(() => setAttached(true));
    return () => cancelAnimationFrame(id);
  }, []);

  const st = ITEM.strata.find((s) => s.key === stratum)!;
  const rows = REASONS.diversity;

  return (
    <>
      <SheetHead
        title="입력 순간 패널 — 값 옆에 남는 한 줄"
        lead="검색하러 가지 않습니다. 계산서의 입력 칸에 값을 넣는 그 순간, 좁은 패널이 옆에 뜹니다. 회사가 그 값을 써 온 분포와 사유를 보여 주고, 사유 한 줄을 받아 「입력값 출처표」의 해당 행에 기입합니다."
        marks={
          <>
            <Chip kind="pencil">AI ① 의미 추정</Chip>
            <Chip kind="pencil">AI ② 사유 짝 짓기</Chip>
            <Chip kind="ink">규칙 ① ② ③</Chip>
          </>
        }
      />

      <div className="grid items-start gap-x-8 gap-y-7 xl:grid-cols-[minmax(0,1fr)_392px]">
        {/* 왼쪽 — 계산 시트 */}
        <div>
          <Section
            title="예시 데이터센터 A 실시설계 기계 부하계산서"
            note={
              <span className="mono">
                부하계산서_예시DC-A_실시.xlsx 사무실부하
              </span>
            }
          >
            <div className="tablewrap">
              <table className="sheet-table min-w-[560px] text-[13px]">
                <thead>
                  <tr className="mono text-[12px] text-[var(--pencil)]">
                    <th className="w-[40px] text-right">#</th>
                    <th>B 구역</th>
                    <th>J 수식</th>
                    <th className="w-[132px]">H 동시사용률</th>
                    <th className="w-[92px] text-right">L 부하</th>
                  </tr>
                </thead>
                <tbody className="mono">
                  {SHEET_ROWS.map((r) => (
                    <tr key={r.r} className="text-[var(--pencil)]">
                      <td className="text-right">{r.r}</td>
                      <td>{r.a}</td>
                      <td>{r.b}</td>
                      <td>{r.c}</td>
                      <td className="text-right">{r.d}</td>
                    </tr>
                  ))}
                  {/* 값을 넣고 있는 셀 */}
                  <tr>
                    <td className="text-right font-semibold text-[var(--ink)]">
                      22
                    </td>
                    <td className="text-[var(--ink)]">사무 · 지원동</td>
                    <td className="text-[var(--ink)]">=D8*E22*H22</td>
                    <td>
                      <span className="inline-flex items-baseline gap-2">
                        <span className="border-2 border-[var(--ink)] px-2 py-[1px] font-semibold text-[var(--ink)]">
                          0.75
                        </span>
                        <span className="text-[11px] text-[var(--pencil)]">
                          입력 중
                        </span>
                      </span>
                    </td>
                    <td className="text-right text-[var(--ink)]">4,689 W</td>
                  </tr>
                  <tr className="text-[var(--pencil)]">
                    <td className="text-right">23</td>
                    <td>사무 · 지원동</td>
                    <td>=D8*E23*H23</td>
                    <td>0.80</td>
                    <td className="text-right">5,102 W</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="mt-3 text-[12px] text-[var(--pencil)]">
              패널은 기존 시트를 밀어내지 않습니다. 값을 넣는 칸은 그대로 두고,
              그 옆에만 붙습니다.
            </p>
          </Section>

          <Section
            title="같은 시트의 다른 칸 — 이름이 붙지 않은 숫자"
            marks={<Chip kind="pencil">AI ① 의미 추정</Chip>}
          >
            <div className="grid gap-5 md:grid-cols-[236px_minmax(0,1fr)]">
              <div className="border-[1.5px] border-dashed border-[var(--pencil)] px-3.5 py-3">
                <p className="mono text-[12px] text-[var(--pencil)]">
                  사무실부하!J14
                </p>
                <p className="mono mt-1.5 text-[19px] leading-tight font-semibold">
                  = D8*E14*H14*<span className="marker px-1">1.15</span>
                </p>
                <p className="mt-2 text-[12px] leading-[1.55] text-[var(--pencil)]">
                  셀 라벨 없음, 셀 주석 없음, 최초 작성자 확인 필요 (2011년 배포
                  시트)
                </p>
              </div>
              <div>
                <p className="text-[13px] leading-[1.65] text-[var(--pencil)]">
                  AI가 셀 라벨, 주변 수식, 변수명, 시트 문맥에서 물리량 후보와
                  확신 수준을 제시합니다.{" "}
                  <b className="font-semibold text-[var(--ink)]">
                    값을 제안하지는 않습니다.
                  </b>
                </p>
                <ul className="mt-3">
                  {AI_CANDIDATES.map((c) => (
                    <li key={c.t} className="flex items-center gap-3 py-[3px]">
                      <span className="w-[142px] shrink-0 text-[13px]">
                        {c.t}
                      </span>
                      <span className="relative h-[11px] flex-1 border-b border-[var(--grid)]">
                        <span
                          className="absolute bottom-0 left-0 block h-[7px]"
                          style={{
                            width: `${c.p}%`,
                            background: "rgba(79,90,99,0.55)",
                          }}
                        />
                      </span>
                      <span className="mono w-[36px] shrink-0 text-right text-[12px] text-[var(--pencil)]">
                        {c.p}%
                      </span>
                    </li>
                  ))}
                </ul>
                <div className="mt-4 border-t border-[var(--hair)] pt-3">
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                    <Unknown>확신 낮음 → 기본값 「근거 미상」</Unknown>
                    <Link
                      href="/tools"
                      className="text-[13px] font-semibold underline decoration-[var(--ink)] underline-offset-4"
                    >
                      도구 근거표로 보내기
                    </Link>
                  </div>
                  <p className="mt-2 text-[13px] leading-[1.6]">
                    이 도구가 낼 수 있는 답은{" "}
                    <b className="font-semibold">근거 미상 하나</b>입니다. 사유를
                    만들어 내지 않습니다. 대신 이 라벨이 붙은 도구는 그 순간{" "}
                    <b className="font-semibold">
                      소유자와 재검증 기한이 지정되는 대상
                    </b>
                    이 됩니다. 지금은 그 라벨조차 붙지 않아 아무도 그 시트를
                    회수하지 않습니다.
                  </p>
                </div>
              </div>
            </div>
          </Section>

          <Section title="왜 검색이 아니라 입력 순간인가">
            <ul className="grid gap-x-8 gap-y-2.5 text-[13px] leading-[1.65] md:grid-cols-3">
              <li>
                <b className="font-semibold">검색어를 입력하지 않습니다.</b> 지식을 연결해
                찾아가게 하는 것이 아니라, 값을 넣는 자리에 그 값의 이력이
                나타납니다.
              </li>
              <li>
                <b className="font-semibold">대시보드는 보러 가야 합니다.</b> 이
                패널은 오지 않는 사람에게 먼저 나타납니다. 바쁜 날 건너뛰지
                않도록 입력은 한 줄로 끝냅니다.
              </li>
              <li>
                <b className="font-semibold">기존 도구를 밀어내지 않습니다.</b>{" "}
                익숙한 엑셀 수식 툴 옆에 붙는 좁은 패널이고, 계산 자체에는
                손대지 않습니다.
              </li>
            </ul>
          </Section>
        </div>

        {/* 오른쪽 — 흰 메모지 하나 */}
        <aside
          className="memo memo-attach mt-7 px-4 py-4"
          style={{
            opacity: attached ? 1 : 0,
            transform: attached ? "translateX(0)" : "translateX(-8px)",
          }}
        >
          <div className="flex items-baseline gap-2 border-b border-[var(--ink)] pb-2">
            <p className="text-[15px] font-semibold">이 값의 근거</p>
            <span className="mono ml-auto text-[12px] text-[var(--pencil)]">
              H22
            </span>
          </div>

          <div className="mt-3 flex flex-wrap items-baseline gap-x-2.5 gap-y-1.5">
            <span className="text-[15px] font-semibold">{ITEM.name}</span>
            <span className="mono border-2 border-[var(--ink)] px-2 text-[15px] font-semibold">
              {CURRENT}
            </span>
            <Chip kind="ink">규칙 ① 이형 사전</Chip>
          </div>
          <p className="mt-1.5 text-[12px] leading-[1.5] text-[var(--pencil)]">
            {ITEM.aliases.join(", ")} → 같은 물리량으로 묶임
          </p>

          {/* 층화 분포 — 규칙 구간 */}
          <div className="mt-4 border-t border-[var(--hair)] pt-3">
            <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
              <Chip kind="ink">규칙 ② 층화 분포</Chip>
              <span className="ml-auto text-[12px] text-[var(--pencil)]">
                회사 전체 {ITEM.samples}건, 값 {ITEM.distinct}가지
              </span>
            </div>
            <div className="mt-2.5 flex flex-wrap gap-1.5">
              {ITEM.strata.map((s) => (
                <button
                  key={s.key}
                  onClick={() => setStratum(s.key)}
                  className={[
                    "border px-2 py-[2px] text-[12px]",
                    s.key === stratum
                      ? "border-[var(--ink)] font-semibold text-[var(--ink)]"
                      : "border-[var(--grid)] text-[var(--pencil)]",
                  ].join(" ")}
                >
                  {s.label.replace("용도 · ", "")}{" "}
                  <span className="mono">{s.n}</span>
                </button>
              ))}
            </div>

            <div className="mt-3">
              {st.hidden ? (
                <p className="text-[13px] leading-[1.6]">
                  표본 <span className="mono">{st.n}</span>건 —{" "}
                  <b className="font-semibold">
                    5건 미만이므로 분포를 그리지 않습니다.
                  </b>{" "}
                  원문 링크만 목록으로 제시합니다. 패널 자체는 뜹니다.
                </p>
              ) : (
                <>
                  <p className="mb-1.5 text-[12px] text-[var(--pencil)]">
                    {st.label} — 표본 <span className="mono">{st.n}</span>건
                  </p>
                  <DistBar buckets={st.buckets} highlight={CURRENT} />
                </>
              )}
            </div>
            <p className="mt-2 text-[12px] leading-[1.55] text-[var(--pencil)]">
              분포는 용도, 연면적 구간, 발주처 지침 계통으로 층화합니다.{" "}
              <b className="font-semibold text-[var(--ink)]">
                이 분포는 권고가 아닙니다.
              </b>{" "}
              회사가 써 온 이력입니다.
            </p>
          </div>

          {/* 사유 짝짓기 — AI 구간 */}
          <div className="mt-4 border-[1.5px] border-dashed border-[var(--pencil)] px-3 py-2.5">
            <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
              <Chip kind="pencil">AI ② 값과 사유의 짝 짓기</Chip>
              <span className="ml-auto text-[12px] text-[var(--pencil)]">
                <span className="mono">0.75</span>를 쓴 4건
              </span>
            </div>
            <ul className="mt-2">
              {rows.map((r) => (
                <li
                  key={r.project}
                  className="border-b border-[var(--hair)] py-1.5 last:border-0"
                >
                  <p className="flex flex-wrap items-baseline gap-x-2 text-[12.5px]">
                    <span className="font-semibold">{r.project}</span>
                    <span className="mono ml-auto text-[11.5px] text-[var(--pencil)]">
                      {r.sheet}!{r.cell}
                    </span>
                  </p>
                  {r.reason ? (
                    <p className="mt-0.5 text-[12px] leading-[1.5] text-[var(--pencil)]">
                      {r.reason}
                    </p>
                  ) : (
                    <p className="mt-1">
                      <Unknown>근거 미상 — 사유 문장을 찾지 못했습니다</Unknown>
                    </p>
                  )}
                </li>
              ))}
            </ul>
            <p className="mt-2 text-[12px] text-[var(--pencil)]">
              발주처 지침 A 2건, 특수 부하 1건, 근거 미상 1건 — 회사 전체 63건 가운데 0.75를 쓴 4건의 사유 전부입니다
            </p>
          </div>

          {/* 조합 빈도 — 규칙 구간 */}
          <div className="mt-4 border border-[var(--ink)] px-3 py-2.5">
            <Chip kind="ink">규칙 ③ 조합 출현 빈도</Chip>
            <p className="mt-2 text-[13px] leading-[1.6]">
              여유율 15 %와 동시사용률 0.75를 함께 쓴 사례는 회사 63건 중{" "}
              <b className="mono font-semibold">0건</b>입니다. 의도하신
              것입니까.
            </p>
            <p className="mt-1 text-[12px] text-[var(--pencil)]">
              묻기만 하고 막지 않습니다.
            </p>
          </div>

          {/* 사유 한 줄 — 사람의 서명 */}
          <div className="mt-4 border-t border-[var(--ink)] pt-3">
            <p className="text-[13px] font-semibold">사유 한 줄 남기기</p>
            <textarea
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              rows={3}
              aria-label="사유 한 줄"
              className="mt-2 w-full resize-none border border-[var(--grid)] px-2 py-1.5 text-[13px] leading-[1.5] outline-none focus:border-[var(--ink)]"
            />
            <div className="mt-2 flex flex-wrap gap-2">
              <button
                onClick={() => {
                  setSigned(true);
                  setUnknown(false);
                }}
                className="flex-1 bg-[var(--stamp)] px-3 py-1.5 text-[13px] font-semibold text-[var(--sheet)]"
              >
                출처표에 기입하고 확인
              </button>
              <button
                onClick={() => {
                  setUnknown(true);
                  setSigned(false);
                }}
                className="border border-[var(--ink)] px-3 py-1.5 text-[13px] font-semibold"
              >
                근거 미상으로 남기기
              </button>
            </div>
            {signed ? (
              <p className="mt-2 border-l-2 border-[var(--stamp)] pl-2 text-[12.5px] leading-[1.5] text-[var(--stamp)]">
                「입력값 출처표」 3행에 기입되었습니다. 서명은 계산서
                책임기술사입니다.
              </p>
            ) : null}
            {unknown ? (
              <p className="mt-2 text-[12.5px] leading-[1.6]">
                <Unknown>근거 미상</Unknown> 으로 남았습니다. 결재 화면의 항목
                수에 더해집니다.
              </p>
            ) : null}
          </div>

          <p className="mt-3 text-[12px] leading-[1.55] text-[var(--pencil)]">
            AI는 값을 제안하지 않습니다. 최종 판정과 서명은 지금과 똑같이
            계산서 책임기술사입니다.
          </p>
        </aside>
      </div>

      <Foot>
        화면의 프로젝트명, 파일명, 수치는 전부 가상 데이터입니다. 같은 묶음 표본이
        5건 미만이면 분포를 그리지 않고 원문 링크만 목록으로 제시합니다. 패널은 뜹니다.
      </Foot>
    </>
  );
}
