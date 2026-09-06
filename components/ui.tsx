import type { ReactNode } from "react";

/** 시트 머리 — 눈썹 라벨 없이 제목과 리드만 */
export function SheetHead({
  title,
  lead,
  marks,
}: {
  title: string;
  lead: string;
  marks?: ReactNode;
}) {
  return (
    <div className="pt-7">
      <h1 className="max-w-[900px] text-[30px] leading-[1.28] font-semibold tracking-[-0.02em]">
        {title}
      </h1>
      <p className="mt-2.5 max-w-[680px] text-[15px] leading-[1.65] text-[var(--pencil)]">
        {lead}
      </p>
      {marks ? <div className="mt-3 flex flex-wrap gap-1.5">{marks}</div> : null}
    </div>
  );
}

/** 구획 — 카드가 아니라 잉크 가로선 + 소제목 */
export function Section({
  title,
  note,
  marks,
  children,
  className = "",
}: {
  title?: string;
  note?: ReactNode;
  marks?: ReactNode;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section className={"pt-7 " + className}>
      {title ? (
        <div className="border-t border-[var(--ink)] pt-2.5">
          <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1.5">
            <h2 className="text-[19px] leading-snug font-semibold">{title}</h2>
            {marks ? (
              <span className="flex flex-wrap gap-1.5">{marks}</span>
            ) : null}
          </div>
          {note ? (
            <p className="mt-1 text-[12px] text-[var(--pencil)]">{note}</p>
          ) : null}
        </div>
      ) : null}
      <div className={title ? "mt-3.5" : ""}>{children}</div>
    </section>
  );
}

/** 재료 칩 — 연필(AI) / 잉크(규칙) / 인주(서명) / 형광펜(근거 미상) */
export type ChipKind = "pencil" | "ink" | "stamp" | "marker";

const CHIP: Record<ChipKind, string> = {
  pencil:
    "border-[1.5px] border-dashed border-[var(--pencil)] text-[var(--pencil)]",
  ink: "border border-[var(--ink)] text-[var(--ink)]",
  stamp: "border border-[var(--stamp)] text-[var(--stamp)]",
  marker: "border border-[var(--marker)] bg-[var(--marker)] text-[var(--ink)]",
};

export function Chip({
  kind = "ink",
  children,
  mono = false,
}: {
  kind?: ChipKind;
  children: ReactNode;
  mono?: boolean;
}) {
  return (
    <span
      className={[
        "inline-flex items-center gap-1 px-[7px] py-[1px] text-[12px] leading-[1.5] font-semibold whitespace-nowrap",
        CHIP[kind],
        mono ? "mono" : "",
      ].join(" ")}
    >
      {children}
    </span>
  );
}

/** 분포 막대 — 잉크 단색. 강조는 두께와 잉크, 비강조는 옅은 잉크 톤 */
export function DistBar({
  buckets,
  highlight,
  max,
}: {
  buckets: { value: string; count: number }[];
  highlight?: string;
  max?: number;
}) {
  const m = max ?? Math.max(...buckets.map((b) => b.count), 1);
  return (
    <ul>
      {buckets.map((b) => {
        const on = b.value === highlight;
        return (
          <li key={b.value} className="flex items-center gap-2 py-[3px]">
            <span
              className={[
                "mono w-[42px] shrink-0 text-right text-[12px]",
                on ? "font-semibold text-[var(--ink)]" : "text-[var(--pencil)]",
              ].join(" ")}
            >
              {b.value}
            </span>
            <span className="relative h-[13px] flex-1 border-b border-[var(--grid)]">
              <span
                className="absolute bottom-0 left-0 block"
                style={{
                  width: `${(b.count / m) * 100}%`,
                  height: on ? 12 : 7,
                  background: on ? "var(--ink)" : "var(--ink-soft)",
                }}
              />
            </span>
            <span
              className={[
                "mono w-[30px] shrink-0 text-right text-[12px]",
                on ? "font-semibold text-[var(--ink)]" : "text-[var(--pencil)]",
              ].join(" ")}
            >
              {b.count}
            </span>
          </li>
        );
      })}
    </ul>
  );
}

/** 서식의 항목 줄 — 세로선 격자색, 가로선 잉크 */
export function KeyVal({
  k,
  v,
  mono = false,
}: {
  k: string;
  v: ReactNode;
  mono?: boolean;
}) {
  return (
    <div className="flex gap-3 border-b border-[var(--hair)] py-[6px] last:border-0">
      <span className="w-[92px] shrink-0 border-r border-[var(--grid)] pr-3 text-[12px] text-[var(--pencil)]">
        {k}
      </span>
      <span
        className={[
          "min-w-0 flex-1 text-[13px] leading-[1.55]",
          mono ? "mono" : "",
        ].join(" ")}
      >
        {v}
      </span>
    </div>
  );
}

/** 시트 바닥의 주석 */
export function Foot({ children }: { children: ReactNode }) {
  return (
    <p className="mt-8 border-t border-[var(--hair-2)] pt-2.5 text-[12px] leading-[1.6] text-[var(--pencil)]">
      {children}
    </p>
  );
}

/** 「근거 미상」 — 형광펜으로만 표시한다 */
export function Unknown({ children = "근거 미상" }: { children?: ReactNode }) {
  return <Chip kind="marker">{children}</Chip>;
}
