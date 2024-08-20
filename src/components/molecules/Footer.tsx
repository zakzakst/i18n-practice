import Link from "next/link";
import { Trans } from "react-i18next/TransWithoutContext";
import { languages } from "@i18n/settings";
import { useTranslation } from "@i18n/index";
import { Lng } from "@models/Lng";

type Props = {
  lng: Lng;
};

export const Footer = async ({ lng }: Props) => {
  const { t } = await useTranslation(lng, "footer");
  return (
    <footer style={{ marginTop: 50 }}>
      <Trans i18nKey="languageSwitcher" t={t}>
        Switch from <strong>TODO: エラー解消</strong> to:{" "}
        {/* Switch from <strong>{{lng}}</strong> to:{" "} */}
      </Trans>
      {languages
        .filter((l) => lng !== l)
        .map((l, index) => {
          return (
            <span key={l}>
              {index > 0 && " or "}
              <Link href={`/${l}`}>{l}</Link>
            </span>
          );
        })}
    </footer>
  );
};
