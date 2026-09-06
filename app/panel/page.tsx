"use client";

import { useState } from "react";
import Link from "next/link";
import { Badge, Card, DistBar, Foot, PageHead } from "@/components/ui";
import { ITEMS, REASONS } from "@/lib/data";
import { Check, CircleHelp, PenLine, Sparkles, Ruler } from "lucide-react";

const ITEM = ITEMS[0]; // 동시사용률
const CURRENT = "0.75";

const SHEET_ROWS = [
  { r: 18, a: "사무 · 기준층", b: "=D8*E18", c: "0.70", d: "3,972 W" },
  { r: 19, a: "사무 · 기준층", b: "=D8*E19", c: "0.70", d: "4,110 W" },
  { r: 20, a: "회의 · 기준층", b: "=D8*E20", c: "0.65", d: "2,884 W" },
  { r: 21, a: "사무 · 지원동", b: "=D8*E21", c: "0.80", d: "5,014 W" },
];

export default function PanelScreen() {
  const [stratum, setStratum] = useState(ITEM.strata[0].key);
  const [reason, setReason] = useState(
    "발주처 설계지침(예시) 3.2절이 지원동 사무실 하한을 0.75로 정함",
  );
  const [signed, setSigned] = useState(false);
  const [unknown, setUnknown] = useState(false);

  const st = ITEM.strata.find((s) => s.key === stratum)!;
  const rows = REASONS.diversity;

  return (
    <>
      <PageHead
        n="1"
        title="입력 순간 패널 — 값 옆에 남는 한 줄"
        lead="검색하러 가지 않습니다. 계산서의 입력 칸에 값을 넣는 그 순간, 좁은 패널이 옆에 뜹니다. 회사가 그 값을 써 온 분포와 사유를 보여 주고, 사유 한 줄을 받아 「입력값 출처표」의 해당 행에 기입합니다."
        right={
          <div className="flex gap-1.5">
            <Badge kind="ai">AI ① · AI ②</Badge>
            <Badge kind="rule">규칙 ① ② ③</Badge>
          </div>
        }
      />

      <div className="grid gap-4 px-7 py-5 xl:grid-cols-[1fr_412px]">
        {/* 왼쪽 — 계산 시트 */}
        <div className="space-y-4">
          <Card
            title="예시 데이터센터 A · 실시설계 기계 부하계산서"
            tag={
              <span className="mono text-[11px] text-[var(--ink-3)]">
                부하계산서_예시DC-A_실시.xlsx · 사무실부하
              </span>
            }
          >
            <div className="overflow-hidden rounded-md border border-[var(--rule-2)]">
              <table className="w-full text-left text-[12px]">
                <thead className="mono bg-[#f2f1ec] text-[11px] text-[var(--ink-3)]">
                  <tr>
                    <th className="w-[38px] border-r border-[var(--rule)] px-2 py-1.5 text-center font-semibold">
                      #
                    </th>
                    <th className="border-r border-[var(--rule)] px-2 py-1.5 font-semibold">
                      B · 구역
                    </th>
                    <th className="border-r border-[var(--rule)] px-2 py-1.5 font-semibold">
                      G · 수식
                    </th>
                    <th className="w-[120px] border-r border-[var(--rule)] px-2 py-1.5 font-semibold">
                      H · 동시사용률
                    </th>
                    <th className="w-[92px] px-2 py-1.5 text-right font-semibold">
                      L · 부하
                    </th>
                  </tr>
                </thead>
                <tbody className="mono">
                  {SHEET_ROWS.map((r) => (
                    <tr
                      key={r.r}
                      className="border-t border-[var(--rule)] text-[var(--ink-2)]"
                    >
                      <td className="border-r border-[var(--rule)] bg-[#faf9f5] px-2 py-[6px] text-center text-[var(--ink-3)]">
                        {r.r}
                      </td>
                      <td className="border-r border-[var(--rule)] px-2 py-[6px]">
                        {r.a}
                      </td>
                      <td className="border-r border-[var(--rule)] px-2 py-[6px]">
                        {r.b}
                      </td>
                      <td className="border-r border-[var(--rule)] px-2 py-[6px]">
                        {r.c}
                      </td>
                      <td className="px-2 py-[6px] text-right">{r.d}</td>
                    </tr>
                  ))}
                  {/* 활성 셀 */}
                  <tr className="border-t border-[var(--rule)]">
                    <td className="border-r border-[var(--rule)] bg-[var(--sign)] px-2 py-[6px] text-center font-bold text-white">
                      22
                    </td>
                    <td className="border-r border-[var(--rule)] px-2 py-[6px]">
                      사무 · 지원동
                    </td>
                    <td className="border-r border-[var(--rule)] px-2 py-[6px]">
                      =D8*E22
                    </td>
                    <td className="border-r border-[var(--rule)] p-0">
                      <span className="flex items-center gap-1.5 bg-[var(--sign-bg)] px-2 py-[5px]">
                        <span className="rounded-[2px] border-2 border-[var(--sign)] bg-white px-2 py-[1px] font-bold text-[var(--sign)]">
                          0.75
                        </span>
                        <span className="text-[10.5px] text-[var(--sign)]">
                          입력 중
                        </span>
                      </span>
                    </td>
                    <td className="px-2 py-[6px] text-right">4,689 W</td>
                  </tr>
                  <tr className="border-t border-[var(--rule)] text-[var(--ink-2)]">
                    <td className="border-r border-[var(--rule)] bg-[#faf9f5] px-2 py-[6px] text-center text-[var(--ink-3)]">
                      23
                    </td>
                    <td className="border-r border-[var(--rule)] px-2 py-[6px]">
                      사무 · 지원동
                    </td>
                    <td className="border-r border-[var(--rule)] px-2 py-[6px]">
                      =D8*E23
                    </td>
                    <td className="border-r border-[var(--rule)] px-2 py-[6px]">
                      0.80
                    </td>
                    <td className="px-2 py-[6px] text-right">5,102 W</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="mt-2 text-[11.5px] text-[var(--ink-3)]">
              패널은 기존 시트를 밀어내지 않습니다. 값을 넣는 칸은 그대로 두고,
              그 옆에만 붙습니다.
            </p>
          </Card>

          {/* 이름 없는 숫자 — AI ① */}
          <Card
            title="같은 시트의 다른 칸 — 이름이 붙지 않은 숫자"
            tag={<Badge kind="ai">AI ① 의미 추정</Badge>}
          >
            <div className="grid gap-3 md:grid-cols-[240px_1fr]">
              <div className="rounded-md border border-[#e8c68a] bg-[var(--unknown-bg)] px-3 py-2.5">
                <p className="mono text-[11px] text-[var(--unknown)]">
                  사무실부하!J14
                </p>
                <p className="mono mt-1 text-[17px] font-bold text-[var(--ink)]">
                  = D8*E14*H14*
                  <span className="text-[var(--unknown)]">1.15</span>
                </p>
                <p className="mt-1.5 text-[11.5px] leading-snug text-[var(--ink-2)]">
                  셀 라벨 없음 · 셀 주석 없음 · 최초 작성자 확인 필요 (2011년
                  배포 시트)
                </p>
              </div>
              <div>
                <p className="text-[12px] text-[var(--ink-2)]">
                  AI가 셀 라벨 · 주변 수식 · 변수명 · 시트 문맥에서 물리량
                  후보와 확신 수준을 제시합니다.{" "}
                  <b>값을 제안하지는 않습니다.</b>
                </p>
                <ul className="mt-2 space-y-1.5">
                  {[
                    { t: "안전율 / 설계 여유", p: 41 },
                    { t: "환기 여유율", p: 23 },
                    { t: "장래 증설 대비 계수", p: 17 },
                  ].map((c) => (
                    <li key={c.t} className="flex items-center gap-2">
                      <span className="w-[150px] shrink-0 text-[12px]">
                        {c.t}
                      </span>
                      <span className="relative h-[11px] flex-1 rounded-[2px] bg-[#f0efe9]">
                        <span
                          className="absolute inset-y-0 left-0 rounded-[2px] bg-[var(--ai)]"
                          style={{ width: `${c.p}%` }}
                        />
                      </span>
                      <span className="mono w-[34px] text-right text-[11.5px] text-[var(--ink-3)]">
                        {c.p}%
                      </span>
                    </li>
                  ))}
                </ul>
                <div className="mt-2.5 rounded-md border border-[#e8c68a] bg-[var(--unknown-bg)] px-2.5 py-2">
                  <div className="flex items-center gap-2">
                    <Badge kind="unknown">
                      <CircleHelp size={12} /> 확신 낮음 → 기본값 「근거 미상」
                    </Badge>
                    <Link
                      href="/tools"
                      className="mono ml-auto rounded-[4px] border border-[var(--unknown)] px-2 py-1 text-[11px] font-bold text-[var(--unknown)]"
                    >
                      도구 근거표로 보내기 →
                    </Link>
                  </div>
                  <p className="mt-1.5 text-[11.5px] leading-snug text-[var(--ink)]">
                    이 도구가 낼 수 있는 답은 <b>근거 미상 하나</b>입니다. 사유를
                    만들어 내지 않습니다. 대신 이 라벨이 붙은 도구는 그 순간{" "}
                    <b>소유자와 재검증 기한이 지정되는 대상</b>이 됩니다 — 지금은
                    그 라벨조차 붙지 않아 아무도 그 시트를 회수하지 않습니다.
                  </p>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* 오른쪽 — 좁은 패널 */}
        <aside className="rounded-lg border-2 border-[var(--sign)] bg-white shadow-[0_2px_10px_rgba(31,58,95,0.10)]">
          <header className="flex items-center gap-2 rounded-t-[6px] bg-[var(--sign)] px-3.5 py-2">
            <Ruler size={15} className="text-white" strokeWidth={2.2} />
            <p className="text-[12.5px] font-bold text-white">
              이 값의 근거 — 입력 순간 패널
            </p>
            <span className="mono ml-auto text-[11px] text-[#c7d6e8]">H22</span>
          </header>

          <div className="px-3.5 py-3">
            {/* 항목 */}
            <div className="flex items-baseline gap-2">
              <span className="text-[15px] font-bold">{ITEM.name}</span>
              <span className="mono rounded-[3px] border-2 border-[var(--sign)] px-2 py-[1px] text-[15px] font-bold text-[var(--sign)]">
                {CURRENT}
              </span>
              <Badge kind="rule">규칙 ① 이형 사전</Badge>
            </div>
            <p className="mono mt-1 text-[11px] text-[var(--ink-3)]">
              {ITEM.aliases.join(" · ")} → 같은 물리량으로 묶임
            </p>

            {/* 층화 분포 */}
            <div className="mt-3 rounded-md border border-[#b9d9d5] bg-[var(--rule-bg)] px-2.5 py-2">
              <div className="flex items-center gap-1.5">
                <Badge kind="rule">규칙 ② 층화 분포</Badge>
                <span className="ml-auto text-[11px] text-[var(--ink-2)]">
                  회사 전체 {ITEM.samples}건 · 값 {ITEM.distinct}가지
                </span>
              </div>
              <div className="mt-2 flex flex-wrap gap-1">
                {ITEM.strata.map((s) => (
                  <button
                    key={s.key}
                    onClick={() => setStratum(s.key)}
                    className={[
                      "rounded-[4px] border px-1.5 py-[3px] text-[11px]",
                      s.key === stratum
                        ? "border-[var(--rule-c)] bg-[var(--rule-c)] font-bold text-white"
                        : "border-[#b9d9d5] bg-white text-[var(--ink-2)]",
                    ].join(" ")}
                  >
                    {s.label.replace("용도 · ", "")} {s.n}
                  </button>
                ))}
              </div>

              <div className="mt-2 rounded-[4px] bg-white px-2 py-2">
                {st.hidden ? (
                  <p className="text-[12px] leading-relaxed text-[var(--unknown)]">
                    표본 {st.n}건 — <b>5건 미만이므로 분포를 표시하지 않습니다.</b>{" "}
                    원문 링크만 제공합니다.
                  </p>
                ) : (
                  <>
                    <p className="mb-1.5 text-[11.5px] text-[var(--ink-3)]">
                      {st.label} · 표본 {st.n}건
                    </p>
                    <DistBar buckets={st.buckets} highlight={CURRENT} />
                  </>
                )}
              </div>
              <p className="mt-1.5 text-[11px] leading-snug text-[var(--ink-2)]">
                분포는 용도 · 연면적 구간 · 발주처 지침 계통으로 층화합니다.{" "}
                <b>이 분포는 권고가 아닙니다.</b> 회사가 써 온 이력입니다.
              </p>
            </div>

            {/* 사유 짝짓기 */}
            <div className="mt-2.5 rounded-md border border-[#d3c2ee] bg-[var(--ai-bg)] px-2.5 py-2">
              <div className="flex items-center gap-1.5">
                <Badge kind="ai">
                  <Sparkles size={11} /> AI ② 값과 사유의 짝 짓기
                </Badge>
                <span className="ml-auto text-[11px] text-[var(--ink-2)]">
                  0.75를 쓴 4건
                </span>
              </div>
              <ul className="mt-1.5 space-y-1">
                {rows.map((r) => (
                  <li
                    key={r.project}
                    className="rounded-[4px] bg-white px-2 py-1.5"
                  >
                    <p className="flex items-center gap-1.5 text-[11.5px]">
                      <span className="font-semibold">{r.project}</span>
                      <span className="mono ml-auto text-[10.5px] text-[var(--ink-3)]">
                        {r.sheet}!{r.cell}
                      </span>
                    </p>
                    {r.reason ? (
                      <p className="mt-0.5 text-[11.5px] leading-snug text-[var(--ink-2)]">
                        {r.reason}
                      </p>
                    ) : (
                      <p className="mt-0.5 text-[11.5px] font-semibold text-[var(--unknown)]">
                        근거 미상 — 사유 문장을 찾지 못했습니다
                      </p>
                    )}
                  </li>
                ))}
              </ul>
              <p className="mt-1.5 text-[11px] text-[var(--ink-2)]">
                발주처 지침 A 3건 · 특수 부하 1건 · 근거 미상 1건
              </p>
            </div>

            {/* 조합 빈도 */}
            <div className="mt-2.5 rounded-md border border-[#b9d9d5] bg-white px-2.5 py-2">
              <Badge kind="rule">규칙 ③ 조합 출현 빈도</Badge>
              <p className="mt-1 text-[11.5px] leading-snug text-[var(--ink)]">
                여유율 15 %와 동시사용률 0.75를 함께 쓴 사례는 회사 63건 중{" "}
                <b>0건</b>입니다. 의도하신 것입니까.
              </p>
              <p className="mt-1 text-[11px] text-[var(--ink-3)]">
                묻기만 하고 막지 않습니다.
              </p>
            </div>

            {/* 사유 한 줄 */}
            <div className="mt-3 rounded-md border border-[var(--rule-2)] bg-[#fbfaf7] px-2.5 py-2.5">
              <p className="flex items-center gap-1.5 text-[12px] font-bold">
                <PenLine size={13} /> 사유 한 줄 남기기
              </p>
              <textarea
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                rows={3}
                className="mt-1.5 w-full resize-none rounded-[4px] border border-[var(--rule-2)] bg-white px-2 py-1.5 text-[12px] leading-snug text-[var(--ink)] outline-none focus:border-[var(--sign)]"
              />
              <div className="mt-1.5 flex gap-1.5">
                <button
                  onClick={() => {
                    setSigned(true);
                    setUnknown(false);
                  }}
                  className="flex-1 rounded-[4px] bg-[var(--sign)] px-2 py-1.5 text-[12px] font-bold text-white"
                >
                  출처표에 기입하고 확인
                </button>
                <button
                  onClick={() => {
                    setUnknown(true);
                    setSigned(false);
                  }}
                  className="rounded-[4px] border border-[var(--unknown)] bg-white px-2 py-1.5 text-[12px] font-bold text-[var(--unknown)]"
                >
                  근거 미상으로 남기기
                </button>
              </div>
              {signed ? (
                <p className="mt-1.5 flex items-center gap-1 rounded-[4px] bg-[var(--sign-bg)] px-2 py-1 text-[11.5px] font-semibold text-[var(--sign)]">
                  <Check size={13} /> 「입력값 출처표」 3행에 기입되었습니다 ·
                  서명은 계산서 책임기술사
                </p>
              ) : null}
              {unknown ? (
                <p className="mt-1.5 rounded-[4px] bg-[var(--unknown-bg)] px-2 py-1 text-[11.5px] font-semibold text-[var(--unknown)]">
                  「근거 미상」으로 남았습니다 · 결재 화면의 항목 수에 더해집니다
                </p>
              ) : null}
            </div>

            <p className="mt-2 text-[11px] leading-snug text-[var(--ink-3)]">
              AI는 값을 제안하지 않습니다. 최종 판정과 서명은 지금과 똑같이
              계산서 책임기술사입니다.
            </p>
          </div>
        </aside>
      </div>

      <Foot>
        화면의 프로젝트명 · 파일명 · 수치는 전부 가상 데이터입니다. 층 안 표본이
        5건 미만인 층은 분포를 표시하지 않고 원문 링크만 제공합니다.
      </Foot>
    </>
  );
}
