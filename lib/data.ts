/**
 * 전부 가상 데이터입니다.
 * 실제 기업·프로젝트·도구·수치가 아니며, 화면 흐름을 보이기 위한 예시입니다.
 */

export type Bucket = { value: string; count: number };

export type Stratum = {
  key: string;
  label: string;
  n: number;
  buckets: Bucket[];
  /** 표본 5건 미만이면 분포를 표시하지 않고 원문 링크만 준다 */
  hidden?: boolean;
};

export type Item = {
  id: string;
  name: string;
  unit: string;
  bureau: "기계본부" | "전기본부" | "소방본부";
  /** 회사가 실제로 쓰고 있는 서로 다른 값의 가짓수(정수) */
  distinct: number;
  samples: number;
  withReason: number;
  aliases: string[];
  strata: Stratum[];
  note?: string;
};

export const ITEMS: Item[] = [
  {
    id: "diversity",
    name: "동시사용률",
    unit: "—",
    bureau: "기계본부",
    distinct: 9,
    samples: 63,
    withReason: 21,
    aliases: ["동시사용률", "동시부하율", "이용률", "diversity factor"],
    strata: [
      {
        key: "dc",
        label: "용도 · 데이터센터 지원동",
        n: 18,
        buckets: [
          { value: "0.65", count: 2 },
          { value: "0.70", count: 6 },
          { value: "0.75", count: 3 },
          { value: "0.80", count: 5 },
          { value: "0.85", count: 2 },
        ],
      },
      {
        key: "office",
        label: "용도 · 업무시설",
        n: 27,
        buckets: [
          { value: "0.60", count: 3 },
          { value: "0.65", count: 6 },
          { value: "0.70", count: 9 },
          { value: "0.75", count: 1 },
          { value: "0.80", count: 5 },
          { value: "0.90", count: 3 },
        ],
      },
      {
        key: "logi",
        label: "용도 · 물류시설",
        n: 4,
        buckets: [],
        hidden: true,
      },
      {
        key: "etc",
        label: "용도 · 그 밖",
        n: 14,
        buckets: [
          { value: "0.60", count: 1 },
          { value: "0.65", count: 1 },
          { value: "0.70", count: 2 },
          { value: "0.80", count: 4 },
          { value: "0.85", count: 4 },
          { value: "0.95", count: 2 },
        ],
      },
    ],
  },
  {
    id: "occupant",
    name: "인체발열 원단위",
    unit: "W/인",
    bureau: "기계본부",
    distinct: 6,
    samples: 41,
    withReason: 11,
    aliases: ["인체발열", "재실자 발열", "인체부하 원단위"],
    strata: [
      {
        key: "dc",
        label: "용도 · 데이터센터 지원동",
        n: 12,
        buckets: [
          { value: "119", count: 4 },
          { value: "125", count: 5 },
          { value: "130", count: 3 },
        ],
      },
      {
        key: "office",
        label: "용도 · 업무시설",
        n: 21,
        buckets: [
          { value: "115", count: 6 },
          { value: "119", count: 7 },
          { value: "125", count: 5 },
          { value: "132", count: 3 },
        ],
      },
      { key: "etc", label: "용도 · 그 밖", n: 8, buckets: [
        { value: "115", count: 2 },
        { value: "125", count: 3 },
        { value: "140", count: 3 },
      ] },
    ],
  },
  {
    id: "demand",
    name: "수용률",
    unit: "—",
    bureau: "전기본부",
    distinct: 11,
    samples: 58,
    withReason: 17,
    aliases: ["수용률", "수요율", "demand factor"],
    strata: [
      {
        key: "dc",
        label: "용도 · 데이터센터",
        n: 22,
        buckets: [
          { value: "0.70", count: 4 },
          { value: "0.75", count: 5 },
          { value: "0.80", count: 7 },
          { value: "0.85", count: 4 },
          { value: "1.00", count: 2 },
        ],
      },
      {
        key: "office",
        label: "용도 · 업무시설",
        n: 24,
        buckets: [
          { value: "0.55", count: 3 },
          { value: "0.60", count: 5 },
          { value: "0.65", count: 6 },
          { value: "0.70", count: 7 },
          { value: "0.80", count: 3 },
        ],
      },
      { key: "etc", label: "용도 · 그 밖", n: 12, buckets: [
        { value: "0.50", count: 2 },
        { value: "0.60", count: 3 },
        { value: "0.72", count: 3 },
        { value: "0.90", count: 4 },
      ] },
    ],
  },
  {
    id: "diversityE",
    name: "부등률",
    unit: "—",
    bureau: "전기본부",
    distinct: 5,
    samples: 37,
    withReason: 9,
    aliases: ["부등률", "부등계수"],
    strata: [
      { key: "dc", label: "용도 · 데이터센터", n: 15, buckets: [
        { value: "1.00", count: 5 },
        { value: "1.10", count: 6 },
        { value: "1.15", count: 4 },
      ] },
      { key: "office", label: "용도 · 업무시설", n: 18, buckets: [
        { value: "1.10", count: 7 },
        { value: "1.20", count: 8 },
        { value: "1.30", count: 3 },
      ] },
      { key: "etc", label: "용도 · 그 밖", n: 4, buckets: [], hidden: true },
    ],
  },
  {
    id: "kfactor",
    name: "헤드 방출계수 K",
    unit: "L/min·㎫^0.5",
    bureau: "소방본부",
    distinct: 4,
    samples: 29,
    withReason: 14,
    aliases: ["방출계수", "K-factor", "K값"],
    strata: [
      { key: "dc", label: "용도 · 데이터센터", n: 11, buckets: [
        { value: "80", count: 6 },
        { value: "115", count: 5 },
      ] },
      { key: "office", label: "용도 · 업무시설", n: 14, buckets: [
        { value: "80", count: 9 },
        { value: "115", count: 4 },
        { value: "161", count: 1 },
      ] },
      { key: "etc", label: "용도 · 그 밖", n: 4, buckets: [], hidden: true },
    ],
  },
  {
    id: "margin",
    name: "여유율",
    unit: "%",
    bureau: "소방본부",
    distinct: 7,
    samples: 33,
    withReason: 8,
    aliases: ["여유율", "안전율", "설계여유", "safety margin"],
    strata: [
      { key: "dc", label: "용도 · 데이터센터", n: 13, buckets: [
        { value: "5", count: 3 },
        { value: "10", count: 6 },
        { value: "15", count: 4 },
      ] },
      { key: "office", label: "용도 · 업무시설", n: 16, buckets: [
        { value: "5", count: 4 },
        { value: "10", count: 7 },
        { value: "20", count: 5 },
      ] },
      { key: "etc", label: "용도 · 그 밖", n: 4, buckets: [], hidden: true },
    ],
  },
];

/** 값 하나를 클릭했을 때 펼쳐지는 사유 문장 원문 (가상) */
export type ReasonRow = {
  project: string;
  file: string;
  sheet: string;
  cell: string;
  value: string;
  reason: string | null;
  source: string | null;
  author: string;
  date: string;
};

export const REASONS: Record<string, ReasonRow[]> = {
  diversity: [
    {
      project: "예시 데이터센터 A",
      file: "부하계산서_예시DC-A_실시.xlsx",
      sheet: "사무실부하",
      cell: "J14",
      value: "0.75",
      reason:
        "발주처 설계지침(예시) 3.2절이 지원동 사무실 동시사용률 하한을 0.75로 정함",
      source: "예시 발주처 설계지침 A · 3.2절",
      author: "기계본부 설계 2팀",
      date: "2026-03-11",
    },
    {
      project: "예시 데이터센터 B",
      file: "부하계산서_예시DC-B_실시.xlsx",
      sheet: "지원동_사무",
      cell: "H22",
      value: "0.75",
      reason: "발주처 설계지침(예시) 3.2절 준용 — A 현장과 동일 계통",
      source: "예시 발주처 설계지침 A · 3.2절",
      author: "기계본부 설계 2팀",
      date: "2026-04-02",
    },
    {
      project: "예시 오피스 D",
      file: "부하계산서_예시오피스D.xlsx",
      sheet: "기준층",
      cell: "J14",
      value: "0.75",
      reason: "24시간 교대 근무로 재실이 겹치는 구간이 있어 상향 적용",
      source: "설계 검토회의 결과(예시) 2026-02-19",
      author: "기계본부 설계 1팀",
      date: "2026-02-20",
    },
    {
      project: "예시 반도체 지원동 E",
      file: "부하계산서_예시E_기본.xlsx",
      sheet: "Sheet1",
      cell: "K9",
      value: "0.75",
      reason: null,
      source: null,
      author: "확인 필요",
      date: "2025-11-27",
    },
  ],
};

/** 도구 근거표 (가상 사내 도구) */
export type ToolConst = {
  symbol: string;
  where: string;
  meaning: string;
  confidence: "확정" | "추정 · 확신 중간" | "추정 · 확신 낮음";
  basis: string | null;
};

export type Tool = {
  id: string;
  name: string;
  version: string;
  kind: string;
  owner: string | null;
  recheck: string | null;
  consts: ToolConst[];
};

export const TOOLS: Tool[] = [
  {
    id: "예시 가",
    name: "사내 계산 시트 「사무실 부하」",
    version: "v7.3 (2011 배포)",
    kind: "엑셀 시트",
    owner: null,
    recheck: null,
    consts: [
      {
        symbol: "×1.15",
        where: "사무실부하!J14 수식 끝",
        meaning: "안전율로 보이나 대상이 특정되지 않음",
        confidence: "추정 · 확신 낮음",
        basis: null,
      },
      {
        symbol: "119",
        where: "사무실부하!D8",
        meaning: "인체발열 원단위 (W/인)",
        confidence: "확정",
        basis: "항목 확정 2026-05-04 · 기계본부 기술사",
      },
    ],
  },
  {
    id: "예시 나",
    name: "사내 도구 「급수 기구 동시사용」",
    version: "v2.1",
    kind: "엑셀 추가 기능",
    owner: "기계본부 설계 1팀",
    recheck: "2027-03-31",
    consts: [
      {
        symbol: "0.62",
        where: "모듈 CalcDemand 12행",
        meaning: "기구 동시사용률 기본값",
        confidence: "확정",
        basis: "사내 표준자료(예시) 표 4-2",
      },
    ],
  },
  {
    id: "예시 다",
    name: "사내 도구 「변압기 용량 산정」",
    version: "v1.4",
    kind: "사내 웹 도구",
    owner: "전기본부 설계 3팀",
    recheck: "2026-12-31",
    consts: [
      {
        symbol: "0.80",
        where: "demand_default 상수",
        meaning: "수용률 기본값",
        confidence: "확정",
        basis: "예시 발주처 설계지침 A · 5.1절",
      },
      {
        symbol: "1.10",
        where: "div_default 상수",
        meaning: "부등률 기본값으로 추정",
        confidence: "추정 · 확신 중간",
        basis: null,
      },
    ],
  },
  {
    id: "예시 라",
    name: "사내 도구 「수리계산 보조」",
    version: "v3.0",
    kind: "사내 웹 도구",
    owner: "소방본부 설계 1팀",
    recheck: "2027-01-31",
    consts: [
      {
        symbol: "80",
        where: "K_DEFAULT",
        meaning: "헤드 방출계수 K 기본값 (L/min/(㎫)^0.5)",
        confidence: "확정",
        basis: "제품 승인 사양(예시) · 항목 확정 2026-05-11",
      },
      {
        symbol: "1.10",
        where: "MARGIN",
        meaning: "수리계산 여유율 10 %",
        confidence: "확정",
        basis: "사내 검토기준(예시) 2-3항",
      },
    ],
  },
  {
    id: "예시 마",
    name: "AutoLISP 매크로 「덕트 치수 자동기입」",
    version: "v0.9",
    kind: "AutoLISP 소스",
    owner: null,
    recheck: null,
    consts: [
      {
        symbol: "0.85",
        where: "(setq kk 0.85) 41행",
        meaning: "변수명이 kk 뿐이어서 물리량을 특정하지 못함",
        confidence: "추정 · 확신 낮음",
        basis: null,
      },
    ],
  },
  {
    id: "예시 바",
    name: "사내 도구 「외기 설계조건 조회」",
    version: "v1.0",
    kind: "사내 웹 도구",
    owner: "기계본부 설계 2팀",
    recheck: "2026-10-31",
    consts: [
      {
        symbol: "0.4 %",
        where: "cooling_percentile",
        meaning: "냉방 설계 외기조건 초과확률",
        confidence: "확정",
        basis: "사내 표준자료(예시) 표 2-1",
      },
    ],
  },
];

/** 결재 화면 (가상) */
export const APPROVAL = {
  doc: "예시 데이터센터 A · 실시설계 기계 부하계산서",
  reviewSheet: "검토조서 첨부 「입력값 출처표」 1쪽",
  writer: "기계본부 설계 2팀",
  engineer: "책임기술사(기계)",
  total: 12,
  recorded: 9,
  unknown: 3,
  rows: [
    {
      item: "동시사용률",
      value: "0.75",
      unit: "—",
      reason: "발주처 설계지침(예시) 3.2절이 지원동 사무실 하한을 0.75로 정함",
      source: "예시 발주처 설계지침 A · 3.2절",
      pos: "회사 63건 중 4건 · 같은 층 18건 중 3건",
      state: "기록",
    },
    {
      item: "인체발열 원단위",
      value: "119",
      unit: "W/인",
      reason: "사내 표준자료(예시) 표 3-1의 사무 작업 기준값 적용",
      source: "사내 표준자료(예시) 표 3-1",
      pos: "회사 41건 중 11건 · 같은 층 12건 중 4건",
      state: "기록",
    },
    {
      item: "외기 설계조건(냉방)",
      value: "0.4",
      unit: "%",
      reason: "발주처 요구 초과확률 0.4 % 적용",
      source: "예시 발주처 설계지침 A · 2.1절",
      pos: "회사 55건 중 38건",
      state: "기록",
    },
    {
      item: "미상 계수 (J14 ×1.15)",
      value: "1.15",
      unit: "—",
      reason: null,
      source: null,
      pos: "회사 47건 중 31건에서 같은 자리에 등장",
      state: "근거 미상",
    },
    {
      item: "환기 여유율",
      value: "10",
      unit: "%",
      reason: null,
      source: null,
      pos: "회사 33건 중 13건",
      state: "근거 미상",
    },
    {
      item: "급탕 동시사용률",
      value: "0.55",
      unit: "—",
      reason: null,
      source: null,
      pos: "같은 층 표본 4건 — 분포 미표시",
      state: "근거 미상",
    },
  ],
};

/** 지표 2개 (가상 관측치) */
export const METRIC_TREND = [
  { label: "착수", pct: 22 },
  { label: "1개월", pct: 31 },
  { label: "2개월", pct: 40 },
  { label: "3개월", pct: 47 },
];
