import Link from "next/link";
import { useTranslation } from "../../i18n";
import { Footer } from "@molecules/Footer";

import { Lng } from "@models/Lng";

type PageProps = {
  params: {
    lng: Lng;
  };
};

export default async function Page({ params: { lng } }: PageProps) {
  const { t } = await useTranslation(lng, "second-page");
  return (
    <>
      <h1>{t("title")}</h1>
      <Link href={`/${lng}`}>{t("back-to-home")}</Link>
      <Footer lng={lng} />
    </>
  );
}
