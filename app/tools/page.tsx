import { Chip, Foot, KeyVal, Section, SheetHead, Unknown } from "@/components/ui";
import type { ChipKind } from "@/components/ui";
import { TOOLS } from "@/lib/data";

const CONF: Record<string, ChipKind> = {
  확정: "ink",
  "추정 · 확신 중간": "pencil",
  "추정 · 확신 낮음": "pencil",
};

export default function ToolsScreen() {
  const orphan = TOOLS.filter((t) => !t.owner);
  const unknownConsts = TOOLS.flatMap((t) =>
    t.consts.filter((c) => !c.basis),
  ).length;
  const focus = TOOLS[0];

  const FIGURES = [
    {
      k: "등재된 사내 계산 도구",
      v: "6",
      s: "가상 데이터. 1단계 태깅 목표는 30종",
    },
    {
      k: "근거가 적히지 않은 상수",
      v: String(unknownConsts),
      s: "「근거 미상」 라벨이 붙은 상수의 수",
    },
    {
      k: "소유자 미지정 도구",
      v: String(orphan.length),
      s: "라벨이 붙는 그 순간 지정 대상이 됩니다",
    },
    {
      k: "재검증 기한 없는 도구",
      v: String(TOOLS.filter((t) => !t.recheck).length),
      s: "지금은 아무도 이 시트를 회수하지 않습니다",
    },
  ];

  return (
    <>
      <SheetHead
        title="도구 근거표 — 도구 1건당 1쪽, 소유자와 재검증 기한"
        lead="자동화가 진행될수록 상수는 더 깊이 숨습니다. 시트에서 코드로 들어간 숫자에는 라벨조차 붙지 않습니다. 도구 1건당 한 쪽을 만들어, 박혀 있는 상수와 그 근거, 소유자, 재검증 기한을 적습니다."
        marks={
          <>
            <Chip kind="pencil">AI ① 의미 추정</Chip>
            <Chip kind="ink">규칙 ④ 서식 출력</Chip>
          </>
        }
      />

      <div className="mt-7 grid gap-y-4 border-t border-[var(--ink)] pt-3 sm:grid-cols-2 xl:grid-cols-4">
        {FIGURES.map((c, i) => (
          <div
            key={c.k}
            className={
              i === 0
                ? "sm:pr-6"
                : "sm:border-l sm:border-[var(--grid)] sm:pl-6 xl:pr-6 xl:last:pr-0"
            }
          >
            <p className="text-[12px] text-[var(--pencil)]">{c.k}</p>
            <p className="mono mt-1 text-[30px] leading-none font-semibold">
              {c.v}
            </p>
            <p className="mt-1.5 text-[12px] leading-[1.5] text-[var(--pencil)]">
              {c.s}
            </p>
          </div>
        ))}
      </div>

      <div className="grid items-start gap-x-8 gap-y-7 xl:grid-cols-[minmax(0,1.95fr)_minmax(0,1fr)]">
        <Section title="사내 계산 도구에 박혀 있는 상수">
          <div className="tablewrap">
            <table className="sheet-table w-full min-w-[690px] table-fixed text-[12.5px]">
              <thead>
                <tr className="text-[12px] text-[var(--pencil)]">
                  <th className="w-[22%]">도구 · 버전</th>
                  <th className="w-[17%]">상수 · 위치</th>
                  <th className="w-[22%]">추정 또는 확정된 의미</th>
                  <th className="w-[20%]">근거</th>
                  <th className="w-[19%]">소유자 · 재검증</th>
                </tr>
              </thead>
              <tbody>
                {TOOLS.map((t) =>
                  t.consts.map((c, i) => (
                    <tr key={t.id + c.symbol}>
                      {i === 0 ? (
                        <td rowSpan={t.consts.length}>
                          <span className="mono text-[11.5px] text-[var(--pencil)]">
                            {t.id}
                          </span>
                          <p className="leading-[1.5] font-semibold">
                            {t.name}
                          </p>
                          <p className="mono text-[11.5px] leading-[1.5] text-[var(--pencil)]">
                            {t.version}
                          </p>
                          <p className="text-[11.5px] text-[var(--pencil)]">
                            {t.kind}
                          </p>
                        </td>
                      ) : null}
                      <td>
                        <span className="mono border border-[var(--ink)] px-1.5 font-semibold">
                          {c.symbol}
                        </span>
                        <p className="mono mt-1 text-[11.5px] leading-[1.5] text-[var(--pencil)]">
                          {c.where}
                        </p>
                      </td>
                      <td className="leading-[1.5]">
                        {c.meaning}
                        <p className="mt-1.5">
                          <Chip kind={CONF[c.confidence]}>{c.confidence}</Chip>
                        </p>
                      </td>
                      <td className="leading-[1.5]">
                        {c.basis ? (
                          <span className="text-[var(--pencil)]">
                            {c.basis}
                          </span>
                        ) : (
                          <Unknown />
                        )}
                      </td>
                      {i === 0 ? (
                        <td rowSpan={t.consts.length}>
                          {t.owner ? (
                            <>
                              <p className="text-[12px] leading-[1.5]">
                                {t.owner}
                              </p>
                              <p className="mono mt-1 text-[12px] text-[var(--pencil)]">
                                재검증 {t.recheck}
                              </p>
                            </>
                          ) : (
                            <>
                              <Chip kind="ink">소유자 지정 대상</Chip>
                              <p className="mt-1.5 text-[12px] leading-[1.5] text-[var(--pencil)]">
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
          </div>
          <p className="mt-3 max-w-[720px] text-[12px] leading-[1.65] text-[var(--pencil)]">
            도구의 내부 구조가 파악된 것부터 붙이고, 나머지는 「도구 1건당
            근거표 1쪽」이라는 비실시간 경로로 대체합니다. 등재 심사 시점에
            근거표를 제출하는 방식이므로 실시간 연동이 필요하지 않습니다.
          </p>
        </Section>

        {/* 서식 1쪽 */}
        <Section
          title="「도구 근거표」 1쪽 서식(안)"
          marks={<Chip kind="ink">규칙 ④ 자동 채움</Chip>}
        >
          <div className="border border-[var(--ink)] px-4 py-3.5">
            <p className="border-b-[1.5px] border-[var(--ink)] pb-2 text-center text-[15px] font-semibold tracking-[0.3em]">
              도구 근거표
            </p>
            <div className="mt-2.5">
              <KeyVal k="도구명" v={focus.name} />
              <KeyVal k="버전" v={focus.version} mono />
              <KeyVal k="형태" v={focus.kind} />
              <KeyVal
                k="박혀 있는 상수"
                v={focus.consts.map((c) => c.symbol).join("   ")}
                mono
              />
              <KeyVal
                k="추정 의미"
                v={
                  <>
                    <span className="mono">×1.15</span> 안전율로 보이나 대상이
                    특정되지 않음 <Chip kind="pencil">확신 낮음</Chip>
                    <br />
                    <span className="mono">119</span> 인체발열 원단위(W/인){" "}
                    <Chip kind="ink">확정</Chip>
                  </>
                }
              />
              <KeyVal
                k="근거"
                v={
                  <>
                    <span className="mono">×1.15</span> <Unknown />
                    <br />
                    <span className="mono">119</span> 항목 확정 2026-05-04,
                    기계본부 기술사
                  </>
                }
              />
              <KeyVal
                k="소유자"
                v={
                  <>
                    미지정 → <b className="font-semibold">지정 대상</b>(근거
                    미상 상수 보유)
                  </>
                }
              />
              <KeyVal
                k="재검증 기한"
                v="미지정 → 소유자 지정과 동시에 부여"
              />
            </div>
            <div className="mt-4 flex flex-wrap items-end justify-between gap-3 border-t border-[var(--hair-2)] pt-3">
              <p className="text-[12px] text-[var(--pencil)]">
                도구 등재 심사 제출본, 사내 검토조서 첨부
              </p>
              <div className="flex items-center gap-2.5">
                <span className="text-[12px] text-[var(--stamp)]">
                  확인 (본부 기술사)
                </span>
                <span
                  aria-hidden
                  className="inline-block h-[30px] w-[30px] rounded-full border-[1.5px] border-[var(--stamp)]"
                />
              </div>
            </div>
          </div>

          <p className="mt-4 text-[13px] leading-[1.65]">
            <b className="font-semibold">간판 장면에 대한 정직한 답.</b> J열의
            1.15에 대해 이 도구가 낼 수 있는 답은{" "}
            <b className="font-semibold">근거 미상 하나</b>입니다. 그리고 근거
            미상 라벨이 붙은 도구는 그 순간{" "}
            <b className="font-semibold">
              소유자와 재검증 기한이 지정되는 대상
            </b>
            이 됩니다. 지금은 그 라벨조차 붙지 않아 아무도 그 시트를 회수하지
            않습니다.
          </p>
        </Section>
      </div>

      <Foot>
        도구명, 버전, 상수, 담당 표기는 전부 가상 데이터입니다. 실제 사내
        도구의 내부 구조는 <b className="font-semibold">확인 필요</b>이며,
        1단계 보유 현황 실사 과업으로 다룹니다.
      </Foot>
    </>
  );
}
