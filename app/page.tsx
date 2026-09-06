import { Badge, Card, Foot, PageHead } from "@/components/ui";
import { ArrowRight, CornerLeftUp } from "lucide-react";
import Link from "next/link";

const BUREAU = [
  {
    b: "기계본부",
    c: "인체발열 원단위, (급수·급탕 기구) 동시사용률",
    law: "실시설계 단계에 「부하계산서」를 기본업무로 요구",
    ask: "그 원단위를 어느 설계기준·어느 발주처 지침에서 골랐는가",
  },
  {
    b: "전기본부",
    c: "수용률, 부등률(및 부하율)",
    law: "실시설계 단계에 「각종부하계산서」를 기본업무로 요구",
    ask: "변압기 용량 산정에 넣은 수용률을 무엇을 보고 정했는가",
  },
  {
    b: "소방본부",
    c: "헤드 방출계수 K, 여유율",
    law: "방수압력·방수량은 정하고, 배관 구경은 수리계산에 의함",
    ask: "그 수리계산에 넣은 K와 여유율을 무엇으로 골랐는가",
  },
];

function Arrow() {
  return (
    <div className="hidden shrink-0 items-center self-center px-1 xl:flex">
      <ArrowRight size={18} className="text-[var(--rule-2)]" strokeWidth={2.4} />
    </div>
  );
}

function FlowBox({
  cap,
  children,
  tone = "plain",
}: {
  cap: string;
  children: React.ReactNode;
  tone?: "plain" | "ai" | "rule" | "sign";
}) {
  const tones: Record<string, string> = {
    plain: "border-[var(--rule-2)] bg-[#fbfaf7]",
    ai: "border-[#d3c2ee] bg-[var(--ai-bg)]",
    rule: "border-[#b9d9d5] bg-[var(--rule-bg)]",
    sign: "border-[#bccee4] bg-[var(--sign-bg)]",
  };
  return (
    <div className={`flex-1 rounded-md border px-3 py-2.5 ${tones[tone]}`}>
      <p className="mono text-[10.5px] font-bold tracking-wider text-[var(--ink-3)]">
        {cap}
      </p>
      <div className="mt-1.5 space-y-1 text-[12px] leading-snug text-[var(--ink)]">
        {children}
      </div>
    </div>
  );
}

export default function Overview() {
  return (
    <>
      <PageHead
        n="0 · 개요"
        title="입력 → AI 구간 · 규칙 구간 → 판정 · 서명 → 대장"
        lead="이 제안은 계산서를 만들지 않고, AI가 값을 제안하지도 않습니다. 이미 만드는 계산서의 입력 칸 하나에, 회사가 그 값을 써 온 이력과 사유 한 줄을 붙입니다."
        right={
          <div className="flex flex-col items-end gap-1.5">
            <Badge kind="sign">③ 업무 혁신(공통)</Badge>
            <span className="text-[11px] text-[var(--ink-3)]">
              산출물 = 분포 대장 · 출처표 1쪽 · 도구 근거표
            </span>
          </div>
        }
      />

      <div className="space-y-4 px-7 py-5">
        {/* 현안 장면 */}
        <div className="grid gap-4 xl:grid-cols-[1.35fr_1fr]">
          <Card title="현안 — 15년 된 시트의 J열에 박힌 ×1.15">
            <p className="text-[13px] leading-[1.75] text-[var(--ink)]">
              입사 3년차가 사무실 부하계산서를 씁니다. 선배가 물려준 시트에는
              인체발열 원단위와 동시사용률이 이미 박혀 있습니다.{" "}
              <b>왜 그 값인지는 시트 어디에도 남아 있지 않습니다.</b> 그 값을
              처음 넣은 선배는 작년에 퇴직했습니다. 같은 시트 J열에는 ×1.15가
              박혀 있는데, 무엇을 위한 1.15인지 아는 사람이 남아 있지 않습니다.
              3년차는 그대로 씁니다. 옆 팀은 다른 값을 씁니다.
            </p>
            <p className="mt-2 text-[13px] leading-[1.75] text-[var(--ink)]">
              두 계산 모두 정확합니다.{" "}
              <b>틀릴 수 있는 것은 계산이 아니라 전제이고, 그 전제는 매번 각자의
              기억 속에서 다시 정해집니다.</b>
            </p>

            <div className="mt-3 overflow-hidden rounded-md border border-[var(--rule-2)]">
              <div className="flex items-center gap-2 border-b border-[var(--rule)] bg-[#f2f1ec] px-2.5 py-1.5">
                <span className="mono text-[11px] text-[var(--ink-3)]">
                  부하계산서_예시DC-A_실시.xlsx · 사무실부하
                </span>
              </div>
              <div className="gridpaper bg-white px-2.5 py-2.5">
                <table className="mono w-full text-[12px]">
                  <tbody>
                    <tr>
                      <td className="w-[34px] py-[3px] text-[var(--ink-3)]">
                        13
                      </td>
                      <td className="py-[3px] text-[var(--ink-2)]">
                        =D8*E13*H13
                      </td>
                      <td className="py-[3px] text-right text-[var(--ink-3)]">
                        4,182 W
                      </td>
                    </tr>
                    <tr>
                      <td className="py-[3px] text-[var(--ink-3)]">14</td>
                      <td className="py-[3px]">
                        <span className="rounded-[3px] border border-[#e8c68a] bg-[var(--unknown-bg)] px-1.5 py-[2px] font-bold text-[var(--unknown)]">
                          =D8*E14*H14*1.15
                        </span>
                      </td>
                      <td className="py-[3px] text-right text-[var(--ink-3)]">
                        5,309 W
                      </td>
                    </tr>
                    <tr>
                      <td className="py-[3px] text-[var(--ink-3)]">15</td>
                      <td className="py-[3px] text-[var(--ink-2)]">
                        =D8*E15*H15
                      </td>
                      <td className="py-[3px] text-right text-[var(--ink-3)]">
                        3,970 W
                      </td>
                    </tr>
                  </tbody>
                </table>
                <p className="mt-1.5 text-[11.5px] text-[var(--unknown)]">
                  ⌜J14⌟ 셀 주석 없음 · 라벨 없음 · 최초 작성자 확인 필요
                </p>
              </div>
            </div>
          </Card>

          <div className="space-y-4">
            <Card title="세 본부의 계산서에 같은 구조가 있습니다">
              <table className="w-full text-left text-[12px]">
                <thead>
                  <tr className="border-b border-[var(--rule-2)] text-[11px] text-[var(--ink-3)]">
                    <th className="pb-1.5 font-semibold">본부</th>
                    <th className="pb-1.5 font-semibold">대표 입력 상수</th>
                    <th className="pb-1.5 font-semibold">법이 묻지 않는 것</th>
                  </tr>
                </thead>
                <tbody>
                  {BUREAU.map((r) => (
                    <tr
                      key={r.b}
                      className="border-b border-dashed border-[var(--rule)] align-top last:border-0"
                    >
                      <td className="py-2 pr-2 font-bold whitespace-nowrap">
                        {r.b}
                      </td>
                      <td className="py-2 pr-2 leading-snug text-[var(--ink-2)]">
                        {r.c}
                      </td>
                      <td className="py-2 leading-snug text-[var(--ink)]">
                        {r.ask}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <p className="mt-2 text-[12px] leading-relaxed text-[var(--ink-2)]">
                법은 결과를 정하고, 그 결과에 이르기 위해 무슨 값을 넣었는지는
                묻지 않습니다. 그래서 이 제안의 대상은 한 공종이 아니라{" "}
                <b>회사 전체의 일관성</b>입니다.
              </p>
            </Card>

            <Card title="지표는 둘뿐입니다">
              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-md border border-[var(--rule)] bg-[#fbfaf7] px-3 py-2.5">
                  <p className="text-[11.5px] text-[var(--ink-3)]">지표 ①</p>
                  <p className="mt-0.5 text-[13px] font-bold leading-snug">
                    같은 항목에 회사가 쓰는 서로 다른 값의 가짓수
                  </p>
                  <p className="mt-1 text-[11.5px] text-[var(--ink-2)]">
                    세면 나오는 정수입니다.
                  </p>
                </div>
                <div className="rounded-md border border-[var(--rule)] bg-[#fbfaf7] px-3 py-2.5">
                  <p className="text-[11.5px] text-[var(--ink-3)]">지표 ②</p>
                  <p className="mt-0.5 text-[13px] font-bold leading-snug">
                    사유가 붙은 값의 비율 (월별 추이)
                  </p>
                  <p className="mt-1 text-[11.5px] text-[var(--ink-2)]">
                    정확도도 분산 축소도 목표로 걸지 않습니다.
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* 흐름도 */}
        <Card
          title="흐름 — 값 하나가 회사의 통계가 되기까지"
          tag={
            <span className="flex gap-1.5">
              <Badge kind="ai">AI 구간 2개</Badge>
              <Badge kind="rule">규칙 구간 4개</Badge>
            </span>
          }
        >
          <div className="flex flex-col gap-2 xl:flex-row">
            <FlowBox cap="INPUT · 입력">
              <p className="font-semibold">사내 계산서 (엑셀 · PDF)</p>
              <p className="text-[var(--ink-2)]">
                사내 개발 계산 도구 · 매크로
              </p>
              <p className="mt-1 text-[11.5px] text-[var(--ink-3)]">
                다루는 것은 항목명 · 값 · 단위 · 사유 문장 · 근거 문서명과 그
                값이 놓인 파일 · 시트 · 셀 좌표뿐입니다. 도면과 발주처 원문은
                대상이 아닙니다.
              </p>
            </FlowBox>
            <Arrow />
            <div className="flex flex-1 flex-col gap-2">
              <FlowBox cap="AI 구간 · 추정하고 제시만 한다" tone="ai">
                <p>
                  <b>AI ①</b> 이름 없는 숫자의 의미 추정 — 셀 라벨 · 주변 수식 ·
                  변수명 · 시트 문맥
                </p>
                <p>
                  <b>AI ②</b> 값과 사유의 짝 짓기 — 찾지 못하면{" "}
                  <b>「근거 미상」</b>으로 남긴다
                </p>
              </FlowBox>
              <FlowBox cap="규칙 구간 · 결정론 계산이다" tone="rule">
                <p>
                  <b>규칙 ①</b> 항목 이형 사전 · <b>②</b> 층화 분포와 표본 수
                </p>
                <p>
                  <b>규칙 ③</b> 조합 출현 빈도 · <b>④</b> 서식 출력과 결재 표시
                </p>
              </FlowBox>
            </div>
            <Arrow />
            <FlowBox cap="JUDGE · 판정과 서명" tone="sign">
              <p className="font-semibold">항목 확정 · 사유 한 줄 입력</p>
              <p className="text-[var(--ink-2)]">
                확신이 낮으면 「근거 미상」이 기본값
              </p>
              <p className="mt-1 text-[11.5px] text-[var(--ink-3)]">
                최종 판정과 서명은 지금과 똑같이 계산서 책임기술사입니다. AI가
                값을 제안하지 않으므로 책임이 이동하지 않습니다.
              </p>
            </FlowBox>
            <Arrow />
            <FlowBox cap="RECORD · 기록">
              <p className="font-semibold">「사내 상수 분포 대장」</p>
              <p className="font-semibold">「입력값 출처표」 1쪽</p>
              <p className="font-semibold">「도구 근거표」 1쪽</p>
              <p className="mt-1 text-[11.5px] text-[var(--ink-3)]">
                출처표는 법정 서식이 아니라 사내 검토조서에 첨부하는 신설
                1쪽입니다.
              </p>
            </FlowBox>
          </div>

          <div className="mt-2 flex items-center gap-2 rounded-md border border-dashed border-[var(--rule-2)] bg-[#fbfaf7] px-3 py-2">
            <CornerLeftUp size={16} className="text-[var(--ink-3)]" />
            <p className="text-[12px] text-[var(--ink)]">
              <b>앞사람의 한 줄이 다음 사람의 분포가 됩니다.</b> 한 사람의
              판단이 그 자리에서 회사의 통계가 되는 구조입니다.
            </p>
            <Link
              href="/panel"
              className="mono ml-auto rounded-[4px] border border-[var(--sign)] bg-[var(--sign)] px-2.5 py-1 text-[11.5px] font-bold text-white"
            >
              화면 1 · 입력 순간 패널 보기 →
            </Link>
          </div>
        </Card>

        {/* 검증·로드맵 */}
        <div className="grid gap-4 xl:grid-cols-3">
          <Card title="검증 설계 — 틀렸을 때 어떻게 아나">
            <ul className="space-y-1.5 text-[12.5px] leading-relaxed text-[var(--ink)]">
              <li>
                <b>정답셋</b> — 각 본부 기술사가 대표 계산서 40건과 도구 30종을
                수기 태깅합니다(약 300~600행).
              </li>
              <li>
                <b>반대 방향 표본</b> — 깔끔한 최신 엑셀만 고르면 전건 통과가
                나옵니다. 구형 서식 · 단위 혼재 · 해외 프로젝트 · 남의 회사
                서식을 일부러 섞습니다.
              </li>
              <li>
                <b>오탐 처리</b> — 잘못 묶인 항목은 기술사가 사전에서 분리하고
                그 이력이 남습니다. 층 안 표본이 5건 미만이면 패널을 띄우지
                않습니다.
              </li>
              <li>
                <b>중단 조건</b> — 항목 확정률 미달 시 항목군을 하나로 좁혀 다시
                시작하고, 사유 칸이 무의미 문자열로 채워지면 선택지형으로
                바꿉니다.
              </li>
            </ul>
          </Card>

          <Card title="로드맵 3단계">
            <ol className="space-y-2 text-[12.5px] leading-relaxed">
              <li className="flex gap-2">
                <span className="mono mt-[2px] h-[18px] shrink-0 rounded-[3px] bg-[var(--sign)] px-1.5 text-[11px] font-bold leading-[18px] text-white">
                  1
                </span>
                <span>
                  <b>0~3개월 · 대장 v1</b> — 패널 없이 대장만 만들어 편차가
                  실재하는지부터 증명합니다. 첫 화면은{" "}
                  <b>「이 항목군에서 근거가 기록된 값은 N건 중 M건입니다」</b>{" "}
                  한 줄입니다.
                </span>
              </li>
              <li className="flex gap-2">
                <span className="mono mt-[2px] h-[18px] shrink-0 rounded-[3px] bg-[var(--sign)] px-1.5 text-[11px] font-bold leading-[18px] text-white">
                  2
                </span>
                <span>
                  <b>4~9개월 · 패널과 서식</b> — 입력 순간 패널, 출처표 편철,
                  결재 카운터, 3개 본부 확대. 붙이기 어려운 도구는 「도구 1건당
                  근거표 1쪽」이라는 비실시간 경로로 대체합니다.
                </span>
              </li>
              <li className="flex gap-2">
                <span className="mono mt-[2px] h-[18px] shrink-0 rounded-[3px] bg-[var(--sign)] px-1.5 text-[11px] font-bold leading-[18px] text-white">
                  3
                </span>
                <span>
                  <b>10~18개월 · 접합과 계승</b> — 표준자료 · 표준 WBS와 접합하고
                  신입 교육 교재를 대장에서 자동 파생합니다.
                </span>
              </li>
            </ol>
          </Card>

          <Card title="운영 규정 — 이 조항이 없으면 제도가 먼저 죽습니다">
            <ul className="space-y-1.5 text-[12.5px] leading-relaxed text-[var(--ink)]">
              <li>
                대장은 <b>사내 개선 목적에 한해</b> 사용하고, 과거 산출물의
                적정성 판단이나 계약 · 분쟁 자료로 쓰지 않습니다.
              </li>
              <li>
                대장에는 <b>집계만</b> 남기고, 작성자 식별자는 검토조서
                첨부본에만 남깁니다. 열람은 로그로 남깁니다.
              </li>
              <li>
                항목 사전과 알림 임계값은 <b>각 본부 기술사가 직접</b>{" "}
                편집합니다. 프로그래머를 거치지 않습니다.
              </li>
              <li>
                1단계는 외부 API 없이 사내에서 완결되는 구조로 설계하고, 도구는
                MIT 계열로 한정합니다.
              </li>
            </ul>
          </Card>
        </div>
      </div>

      <Foot>
        이 목업의 프로젝트명 · 도구명 · 수치는 <b>전부 가상 데이터</b>입니다.
        실제 기업의 실적 · 보유 도구 · 사내 값이 아닙니다. 확인되지 않은 사항은
        화면에서도 「확인 필요」로 표시하며, 1단계 보유 현황 실사 과업으로
        다룹니다.
      </Foot>
    </>
  );
}
