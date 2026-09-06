import type { Metadata } from "next";
import { IBM_Plex_Sans_KR, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import Chrome from "@/components/Chrome";

const plexSans = IBM_Plex_Sans_KR({
  weight: ["400", "600"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-plex-sans",
  fallback: ["system-ui", "Segoe UI", "Malgun Gothic", "sans-serif"],
});

const plexMono = IBM_Plex_Mono({
  weight: ["400", "600"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-plex-mono",
  fallback: ["ui-monospace", "Consolas", "monospace"],
});

export const metadata: Metadata = {
  title: "사내 상수 분포 대장 — HIMEC AI 활용 아이디어 공모전 출품작 목업",
  description:
    "우리 회사는 그 숫자를 몇 가지로 쓰고 있습니까 — 사내 상수의 분포와 근거, 그리고 값 옆에 남는 한 줄. 제안자 박용환. 화면의 모든 수치·프로젝트명은 가상 데이터입니다.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="ko"
      className={`${plexSans.variable} ${plexMono.variable} h-full`}
    >
      <body className="min-h-full">
        <Chrome>{children}</Chrome>
      </body>
    </html>
  );
}
