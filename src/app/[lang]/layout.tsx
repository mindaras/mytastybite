import "@common/styles/global.scss";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { config as faConfig } from "@fortawesome/fontawesome-svg-core";
import { Layout as AppLayout } from "@common/components/layout/Layout";
import { GoogleAnalytics } from "@common/components/tracking/GoogleAnalytics";
import { Metadata } from "next";
import { Language } from "@types";
import { getDefaultMetadata } from "@common/components/metadata/metadata";
import { Optional } from "@common/components/Optional";
import { CMSLayout } from "@common/components/layout/CMSLayout";
import { isCMS } from "@common/utils/server/path";

faConfig.autoAddCss = false;

interface Params {
  lang: Language;
}

interface Props {
  children: React.ReactNode;
  params: Params;
}

const Layout: React.FC<Props> = ({ children, params: { lang } }) => {
  return (
    <Optional
      if={isCMS()}
      then={<CMSLayout lang={lang}>{children}</CMSLayout>}
      else={
        <>
          <GoogleAnalytics />
          <AppLayout lang={lang}>{children}</AppLayout>
        </>
      }
    />
  );
};

interface GenerateMetadataProps {
  params: Params;
}

export const generateMetadata = async ({
  params: { lang },
}: GenerateMetadataProps): Promise<Metadata> => {
  return getDefaultMetadata({ lang });
};

export default Layout;
