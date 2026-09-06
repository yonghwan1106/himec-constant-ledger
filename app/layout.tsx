import type { Metadata } from "next";
import "./globals.css";
import Chrome from "@/components/Chrome";

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
    <html lang="ko" className="h-full antialiased">
      <body className="min-h-full">
        <Chrome>{children}</Chrome>
      </body>
    </html>
  );
}
