import { Refresh } from "@common/components/auth/Refresh";

interface Props {
  searchParams: {
    redirectPath: string;
    loginPath: string;
  };
}

const RecipesPage: React.FC<Props> = ({ searchParams }) => {
  return <Refresh searchParams={searchParams} />;
};

export default RecipesPage;
