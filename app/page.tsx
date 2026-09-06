import { Chip, Foot, Section } from "@/components/ui";
import Link from "next/link";

const BUREAU = [
  {
    b: "기계본부",
    c: "인체발열 원단위, (급수·급탕 기구) 동시사용률",
    ask: "그 원단위를 어느 설계기준·어느 발주처 지침에서 골랐는가",
  },
  {
    b: "전기본부",
    c: "수용률, 부등률(및 부하율)",
    ask: "변압기 용량 산정에 넣은 수용률을 무엇을 보고 정했는가",
  },
  {
    b: "소방본부",
    c: "헤드 방출계수 K, 여유율",
    ask: "그 수리계산에 넣은 K와 여유율을 무엇으로 골랐는가",
  },
];

/** 계산 용지 위의 스프레드시트 행 13~15 */
function Strip() {
  return (
    <div className="tablewrap">
      <table className="mono w-full min-w-[430px] border-collapse text-[15px]">
        <tbody>
          <tr>
            <td className="w-[40px] border-r border-[var(--grid)] py-[5px] pr-2.5 text-right text-[var(--pencil)]">
              13
            </td>
            <td className="py-[5px] pl-3 text-[var(--pencil)]">=D8*E13*H13</td>
            <td className="py-[5px] pl-3 text-right whitespace-nowrap text-[var(--pencil)]">
              4,182 W
            </td>
          </tr>
          <tr>
            <td className="border-r border-[var(--grid)] py-1 pr-2.5 text-right align-bottom text-[var(--pencil)]">
              14
            </td>
            <td className="py-1 pl-3">
              <span className="flex flex-wrap items-baseline gap-x-1">
                <span className="text-[15px] text-[var(--pencil)]">
                  =D8*E14*H14*
                </span>
                <span className="text-[48px] leading-[1.05] font-semibold text-[var(--ink)]">
                  1.15
                </span>
              </span>
            </td>
            <td className="py-1 pl-3 text-right align-bottom whitespace-nowrap text-[var(--pencil)]">
              5,309 W
            </td>
          </tr>
          <tr>
            <td className="border-r border-[var(--grid)] py-[5px] pr-2.5 text-right text-[var(--pencil)]">
              15
            </td>
            <td className="py-[5px] pl-3 text-[var(--pencil)]">=D8*E15*H15</td>
            <td className="py-[5px] pl-3 text-right whitespace-nowrap text-[var(--pencil)]">
              3,970 W
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

function Flow({
  material,
  title,
  children,
}: {
  material: "pencil" | "ink" | "stamp" | "ledger";
  title: string;
  children: React.ReactNode;
}) {
  const skin: Record<string, string> = {
    pencil: "border-[1.5px] border-dashed border-[var(--pencil)]",
    ink: "border border-[var(--ink)]",
    stamp: "border border-[var(--stamp)]",
    ledger: "border-2 border-[var(--ink)]",
  };
  return (
    <div className={"flex-1 px-3.5 py-3 " + skin[material]}>
      <p
        className={[
          "text-[15px] leading-snug font-semibold",
          material === "pencil"
            ? "text-[var(--pencil)]"
            : material === "stamp"
              ? "text-[var(--stamp)]"
              : "text-[var(--ink)]",
        ].join(" ")}
      >
        {title}
      </p>
      <div className="mt-2 space-y-1.5 text-[13px] leading-[1.55]">
        {children}
      </div>
    </div>
  );
}

export default function Overview() {
  return (
    <>
      {/* 히어로 — 가장 크게 보이는 것은 숫자 하나와 그 옆의 빈 줄 */}
      <div className="grid items-center gap-6 pt-8 lg:grid-cols-[minmax(0,1fr)_296px]">
        <Strip />
        <aside className="memo px-4 py-4">
          <p className="text-[15px] font-semibold">이 값의 근거</p>
          <div className="mt-5 border-b border-[var(--ink)]" />
        </aside>
      </div>

      <h1 className="mt-8 max-w-[900px] text-[30px] leading-[1.22] font-semibold tracking-[-0.02em] md:text-[38px]">
        우리 회사는 그 숫자를 몇 가지로 쓰고 있습니까
      </h1>
      <p className="mt-2.5 text-[19px] leading-[1.45] text-[var(--pencil)]">
        사내 상수의 분포와 근거, 그리고 값 옆에 남는 한 줄
      </p>
      <p className="mt-3.5 max-w-[660px] text-[15px] leading-[1.7]">
        이 제안은 계산서를 만들지 않고, AI가 값을 제안하지도 않습니다. 이미
        만드는 계산서의 입력 칸 하나에, 회사가 그 값을 써 온 이력과 사유 한
        줄을 붙입니다.
      </p>
      <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2">
        <Chip kind="ink">③ 업무 혁신(공통)</Chip>
        <span className="text-[12px] text-[var(--pencil)]">
          산출물 = 분포 대장, 출처표 1쪽, 도구 근거표
        </span>
      </div>

      <Section title="현안 — 15년 된 시트의 J열에 박힌 ×1.15">
        <div className="grid gap-x-10 gap-y-4 lg:grid-cols-2">
          <p className="max-w-[640px] text-[15px] leading-[1.75]">
            입사 3년차가 사무실 부하계산서를 씁니다. 선배가 물려준 시트에는
            인체발열 원단위와 동시사용률이 이미 박혀 있습니다.{" "}
            <b className="font-semibold">
              왜 그 값인지는 시트 어디에도 남아 있지 않습니다.
            </b>{" "}
            그 값을 처음 넣은 선배는 작년에 퇴직했습니다. 같은 시트 J열에는
            ×1.15가 박혀 있는데, 무엇을 위한 1.15인지 아는 사람이 남아 있지
            않습니다. 3년차는 그대로 씁니다. 옆 팀은 다른 값을 씁니다.
          </p>
          <div className="max-w-[640px]">
            <p className="text-[15px] leading-[1.75]">
              두 계산 모두 정확합니다.{" "}
              <b className="font-semibold">
                틀릴 수 있는 것은 계산이 아니라 전제이고, 그 전제는 매번 각자의
                기억 속에서 다시 정해집니다.
              </b>
            </p>
            <p className="mono mt-3 text-[12px] leading-[1.6] text-[var(--pencil)]">
              부하계산서_예시DC-A_실시.xlsx 사무실부하!J14
            </p>
            <p className="mt-1 text-[13px] leading-[1.6]">
              셀 주석 없음, 라벨 없음, 최초 작성자 확인 필요
            </p>
          </div>
        </div>
      </Section>

      <Section title="세 본부의 계산서에 같은 구조가 있습니다">
        <div className="tablewrap">
          <table className="sheet-table min-w-[640px] text-[13px]">
            <thead>
              <tr className="text-[12px] text-[var(--pencil)]">
                <th className="w-[110px]">본부</th>
                <th className="w-[38%]">대표 입력 상수</th>
                <th>법이 묻지 않는 것</th>
              </tr>
            </thead>
            <tbody>
              {BUREAU.map((r) => (
                <tr key={r.b}>
                  <td className="font-semibold whitespace-nowrap">{r.b}</td>
                  <td className="leading-[1.55] text-[var(--pencil)]">{r.c}</td>
                  <td className="leading-[1.55]">{r.ask}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-3 max-w-[720px] text-[13px] leading-[1.65] text-[var(--pencil)]">
          법은 결과를 정하고, 그 결과에 이르기 위해 무슨 값을 넣었는지는 묻지
          않습니다. 그래서 이 제안의 대상은 한 공종이 아니라{" "}
          <b className="font-semibold text-[var(--ink)]">회사 전체의 일관성</b>
          입니다.
        </p>
      </Section>

      <Section
        title="흐름 — 입력에서 AI 구간과 규칙 구간을 지나 판정과 서명, 그리고 대장까지"
        note="들어오는 것은 사내 계산서(엑셀, PDF)와 사내 개발 계산 도구, 매크로입니다. 다루는 것은 항목명, 값, 단위, 사유 문장, 근거 문서명과 그 값이 놓인 파일·시트·셀 좌표뿐입니다. 도면과 발주처 원문은 대상이 아닙니다."
      >
        <div className="flex flex-col gap-3 xl:flex-row">
          <Flow material="pencil" title="AI 구간 — 추정하고 제시만 한다">
            <p>
              <b className="font-semibold">AI ①</b> 이름 없는 숫자의 의미 추정 —
              셀 라벨, 주변 수식, 변수명, 시트 문맥
            </p>
            <p>
              <b className="font-semibold">AI ②</b> 값과 사유의 짝 짓기 — 찾지
              못하면 <b className="font-semibold">「근거 미상」</b>으로 남긴다
            </p>
          </Flow>
          <Flow material="ink" title="규칙 구간 — 결정론 계산이다">
            <p>
              <b className="font-semibold">규칙 ①</b> 항목 이형 사전{" "}
              <b className="font-semibold">②</b> 층화 분포와 표본 수
            </p>
            <p>
              <b className="font-semibold">규칙 ③</b> 조합 출현 빈도{" "}
              <b className="font-semibold">④</b> 서식 출력과 결재 표시
            </p>
          </Flow>
          <Flow material="stamp" title="판정과 서명">
            <p className="font-semibold">항목 확정, 사유 한 줄 입력</p>
            <p className="text-[var(--pencil)]">
              확신이 낮으면 「근거 미상」이 기본값
            </p>
            <p className="text-[12px] text-[var(--pencil)]">
              최종 판정과 서명은 지금과 똑같이 계산서 책임기술사입니다. AI가
              값을 제안하지 않으므로 책임이 이동하지 않습니다.
            </p>
          </Flow>
          <Flow material="ledger" title="대장 — 기록">
            <p className="font-semibold">「사내 상수 분포 대장」</p>
            <p className="font-semibold">「입력값 출처표」 1쪽</p>
            <p className="font-semibold">「도구 근거표」 1쪽</p>
            <p className="text-[12px] text-[var(--pencil)]">
              출처표는 법정 서식이 아니라 사내 검토조서에 첨부하는 신설
              1쪽입니다.
            </p>
          </Flow>
        </div>

        <div className="mt-4 flex flex-wrap items-baseline gap-x-5 gap-y-2 border-t border-[var(--hair)] pt-3">
          <p className="max-w-[720px] text-[14px] leading-[1.6]">
            <b className="font-semibold">
              앞사람의 한 줄이 다음 사람의 분포가 됩니다.
            </b>{" "}
            한 사람의 판단이 그 자리에서 회사의 통계가 되는 구조입니다.
          </p>
          <Link
            href="/panel"
            className="text-[13px] font-semibold text-[var(--ink)] underline decoration-[var(--ink)] underline-offset-4"
          >
            시트 1 입력 순간 패널 보기
          </Link>
        </div>
      </Section>

      <Section title="지표는 둘뿐입니다">
        <div className="grid gap-x-10 gap-y-5 md:grid-cols-2">
          <div>
            <p className="mono text-[12px] text-[var(--pencil)]">지표 ①</p>
            <p className="mt-1 text-[19px] leading-snug font-semibold">
              같은 항목에 회사가 쓰는 서로 다른 값의 가짓수
            </p>
            <p className="mt-1.5 text-[13px] text-[var(--pencil)]">
              세면 나오는 정수입니다.
            </p>
          </div>
          <div>
            <p className="mono text-[12px] text-[var(--pencil)]">지표 ②</p>
            <p className="mt-1 text-[19px] leading-snug font-semibold">
              사유가 붙은 값의 비율 (월별 추이)
            </p>
            <p className="mt-1.5 text-[13px] text-[var(--pencil)]">
              정확도도 분산 축소도 목표로 걸지 않습니다.
            </p>
          </div>
        </div>
      </Section>

      <Section title="검증 설계 — 틀렸을 때 어떻게 아나">
        <div className="grid gap-x-10 gap-y-6 lg:grid-cols-3">
          <ul className="space-y-2 text-[13px] leading-[1.65]">
            <li>
              <b className="font-semibold">정답셋</b> — 각 본부 기술사가 대표
              계산서 40건과 도구 30종을 수기 태깅합니다(약 300~600행).
            </li>
            <li>
              <b className="font-semibold">반대 방향 표본</b> — 깔끔한 최신
              엑셀만 고르면 전건 통과가 나옵니다. 구형 서식, 단위 혼재, 해외
              프로젝트, 남의 회사 서식을 일부러 섞습니다.
            </li>
            <li>
              <b className="font-semibold">오탐 처리</b> — 잘못 묶인 항목은
              기술사가 사전에서 분리하고 그 이력이 남습니다. 층 안 표본이 5건
              미만이면 패널을 띄우지 않습니다.
            </li>
            <li>
              <b className="font-semibold">중단 조건</b> — 항목 확정률 미달 시
              항목군을 하나로 좁혀 다시 시작하고, 사유 칸이 무의미 문자열로
              채워지면 선택지형으로 바꿉니다.
            </li>
          </ul>

          <div>
            <p className="text-[15px] font-semibold">로드맵 3단계</p>
            <ol className="mt-2 space-y-2.5 text-[13px] leading-[1.65]">
              <li className="flex gap-2.5">
                <span className="mono shrink-0 border border-[var(--ink)] px-1.5 text-[12px] font-semibold">
                  1
                </span>
                <span>
                  <b className="font-semibold">0~3개월 · 대장 v1</b> — 패널 없이
                  대장만 만들어 편차가 실재하는지부터 증명합니다. 첫 화면은{" "}
                  <b className="font-semibold">
                    「이 항목군에서 근거가 기록된 값은 N건 중 M건입니다」
                  </b>{" "}
                  한 줄입니다.
                </span>
              </li>
              <li className="flex gap-2.5">
                <span className="mono shrink-0 border border-[var(--ink)] px-1.5 text-[12px] font-semibold">
                  2
                </span>
                <span>
                  <b className="font-semibold">4~9개월 · 패널과 서식</b> — 입력
                  순간 패널, 출처표 편철, 결재 카운터, 3개 본부 확대. 붙이기
                  어려운 도구는 「도구 1건당 근거표 1쪽」이라는 비실시간 경로로
                  대체합니다.
                </span>
              </li>
              <li className="flex gap-2.5">
                <span className="mono shrink-0 border border-[var(--ink)] px-1.5 text-[12px] font-semibold">
                  3
                </span>
                <span>
                  <b className="font-semibold">10~18개월 · 접합과 계승</b> —
                  표준자료, 표준 WBS와 접합하고 신입 교육 교재를 대장에서 자동
                  파생합니다.
                </span>
              </li>
            </ol>
          </div>

          <div>
            <p className="text-[15px] font-semibold">
              운영 규정 — 이 조항이 없으면 제도가 먼저 죽습니다
            </p>
            <ul className="mt-2 space-y-2 text-[13px] leading-[1.65]">
              <li>
                대장은{" "}
                <b className="font-semibold">사내 개선 목적에 한해</b> 사용하고,
                과거 산출물의 적정성 판단이나 계약, 분쟁 자료로 쓰지 않습니다.
              </li>
              <li>
                대장에는 <b className="font-semibold">집계만</b> 남기고,
                작성자 식별자는 검토조서 첨부본에만 남깁니다. 열람은 로그로
                남깁니다.
              </li>
              <li>
                항목 사전과 알림 임계값은{" "}
                <b className="font-semibold">각 본부 기술사가 직접</b>{" "}
                편집합니다. 프로그래머를 거치지 않습니다.
              </li>
              <li>
                1단계는 외부 API 없이 사내에서 완결되는 구조로 설계하고, 도구는
                MIT 계열로 한정합니다.
              </li>
            </ul>
          </div>
        </div>
      </Section>

      <Foot>
        이 목업의 프로젝트명, 도구명, 수치는{" "}
        <b className="font-semibold">전부 가상 데이터</b>입니다. 실제 기업의
        실적, 보유 도구, 사내 값이 아닙니다. 확인되지 않은 사항은 화면에서도
        「확인 필요」로 표시하며, 1단계 보유 현황 실사 과업으로 다룹니다.
      </Foot>
    </>
  );
}
