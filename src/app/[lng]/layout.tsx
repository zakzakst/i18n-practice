import { dir } from "i18next";
import { languages } from "../i18n/settings";
import { Lng } from "@models/Lng";

type LayoutProps = {
  children: React.ReactNode;
  params: {
    lng: Lng;
  };
};

export async function generateStaticParams() {
  return languages.map((lng) => ({ lng }));
}

export default function RootLayout({ children, params: { lng } }: LayoutProps) {
  return (
    <html lang={lng} dir={dir(lng)}>
      <head />
      <body>{children}</body>
    </html>
  );
}
