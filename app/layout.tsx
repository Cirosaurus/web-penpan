import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Pancasila, Nilai yang Menuntun | Ruang Belajar",
  description:
    "Media belajar interaktif tentang Pancasila sebagai ideologi terbuka, globalisasi, westernisasi, dan perubahan sosial.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body>
        <a className="skip-link" href="#main">
          Lewati navigasi
        </a>
        <div className="reading-progress" aria-hidden="true">
          <span id="reading-progress" />
        </div>
        {children}
      </body>
    </html>
  );
}