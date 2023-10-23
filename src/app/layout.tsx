import "@common/styles/global.scss";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { config as faConfig } from "@fortawesome/fontawesome-svg-core";
import { getLanguage } from "@common/utils/server/getLanguage";

faConfig.autoAddCss = false;

interface Props {
  children: React.ReactNode;
  params: any;
}

const RootLayout: React.FC<Props> = ({ children }) => {
  const lang = getLanguage();

  return (
    <html lang={lang}>
      <body>{children}</body>
    </html>
  );
};

export default RootLayout;

export const fetchCache = "default-no-store";
