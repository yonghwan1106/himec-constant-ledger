import type { ReactNode } from "react";

export function PageHead({
  n,
  title,
  lead,
  right,
}: {
  n: string;
  title: string;
  lead: string;
  right?: ReactNode;
}) {
  return (
    <div className="border-b border-[var(--rule)] bg-[#fbfaf7] px-7 py-5">
      <div className="flex items-start gap-4">
        <div>
          <p className="mono text-[11.5px] font-bold tracking-wider text-[var(--ink-3)]">
            화면 {n}
          </p>
          <h1 className="mt-1 text-[21px] font-bold leading-tight text-[var(--ink)]">
            {title}
          </h1>
          <p className="mt-1.5 max-w-[860px] text-[13px] leading-relaxed text-[var(--ink-2)]">
            {lead}
          </p>
        </div>
        {right ? <div className="ml-auto shrink-0">{right}</div> : null}
      </div>
    </div>
  );
}

export function Card({
  title,
  tag,
  children,
  className = "",
  foot,
}: {
  title?: ReactNode;
  tag?: ReactNode;
  children: ReactNode;
  className?: string;
  foot?: ReactNode;
}) {
  return (
    <section
      className={
        "rounded-lg border border-[var(--rule)] bg-white shadow-[0_1px_2px_rgba(23,24,26,0.04)] " +
        className
      }
    >
      {title ? (
        <header className="flex items-center gap-2 border-b border-[var(--rule)] px-4 py-2.5">
          <h2 className="text-[13.5px] font-bold text-[var(--ink)]">{title}</h2>
          {tag ? <div className="ml-auto">{tag}</div> : null}
        </header>
      ) : null}
      <div className="px-4 py-3.5">{children}</div>
      {foot ? (
        <footer className="border-t border-[var(--rule)] bg-[#fbfaf7] px-4 py-2.5 text-[12px] text-[var(--ink-2)]">
          {foot}
        </footer>
      ) : null}
    </section>
  );
}

type Kind = "ai" | "rule" | "unknown" | "sign" | "plain";

const KIND: Record<Kind, string> = {
  ai: "border-[#d3c2ee] bg-[var(--ai-bg)] text-[var(--ai)]",
  rule: "border-[#b9d9d5] bg-[var(--rule-bg)] text-[var(--rule-c)]",
  unknown: "border-[#e8c68a] bg-[var(--unknown-bg)] text-[var(--unknown)]",
  sign: "border-[#bccee4] bg-[var(--sign-bg)] text-[var(--sign)]",
  plain: "border-[var(--rule-2)] bg-[#f2f1ec] text-[var(--ink-2)]",
};

export function Badge({
  kind = "plain",
  children,
  mono = false,
}: {
  kind?: Kind;
  children: ReactNode;
  mono?: boolean;
}) {
  return (
    <span
      className={[
        "inline-flex items-center gap-1 rounded-[4px] border px-1.5 py-[2px] text-[11px] font-semibold whitespace-nowrap",
        KIND[kind],
        mono ? "mono" : "",
      ].join(" ")}
    >
      {children}
    </span>
  );
}

/** 가로 막대 분포 — 외부 차트 라이브러리 없이 CSS로 그린다 */
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
    <ul className="space-y-[3px]">
      {buckets.map((b) => {
        const on = b.value === highlight;
        return (
          <li key={b.value} className="flex items-center gap-2">
            <span
              className={[
                "mono w-[46px] shrink-0 text-right text-[12px]",
                on ? "font-bold text-[var(--sign)]" : "text-[var(--ink-2)]",
              ].join(" ")}
            >
              {b.value}
            </span>
            <span className="relative h-[13px] flex-1 rounded-[2px] bg-[#f0efe9]">
              <span
                className={[
                  "absolute inset-y-0 left-0 rounded-[2px]",
                  on ? "bg-[var(--sign)]" : "bg-[#9fb4c9]",
                ].join(" ")}
                style={{ width: `${(b.count / m) * 100}%` }}
              />
            </span>
            <span
              className={[
                "mono w-[30px] shrink-0 text-[11.5px]",
                on ? "font-bold text-[var(--sign)]" : "text-[var(--ink-3)]",
              ].join(" ")}
            >
              {b.count}건
            </span>
          </li>
        );
      })}
    </ul>
  );
}

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
    <div className="flex gap-2 border-b border-dashed border-[var(--rule)] py-[5px] last:border-0">
      <span className="w-[86px] shrink-0 text-[12px] text-[var(--ink-3)]">
        {k}
      </span>
      <span
        className={[
          "flex-1 text-[12.5px] leading-relaxed text-[var(--ink)]",
          mono ? "mono" : "",
        ].join(" ")}
      >
        {v}
      </span>
    </div>
  );
}

export function Foot({ children }: { children: ReactNode }) {
  return (
    <p className="px-7 pb-8 pt-1 text-[11.5px] leading-relaxed text-[var(--ink-3)]">
      {children}
    </p>
  );
}
