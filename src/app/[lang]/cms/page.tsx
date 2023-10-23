import { Language } from "src/types";
import { Dashboard } from "./Dashboard";

interface Props {
  params: {
    lang: Language;
  };
}

const DashboardPage: React.FC<Props> = ({ params: { lang } }) => {
  return <Dashboard lang={lang} />;
};

export default DashboardPage;
