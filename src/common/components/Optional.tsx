export interface Props {
  if?: boolean;
  then?: React.ReactNode | Function;
  else?: React.ReactNode | Function;
  data?: any;
  children?: React.ReactNode | Function;
}

const renderNode = (component: React.ReactNode | Function, data?: any) => {
  return component instanceof Function ? component(data) : component;
};

const Optional: React.FC<Props> = ({
  if: ifClause,
  then: thenClause,
  else: elseClause,
  data,
  children,
}) => {
  const dataExist = data instanceof Array ? data.length : data;

  if (ifClause || dataExist) return renderNode(children || thenClause, data);
  if (elseClause) return renderNode(elseClause, data);

  return null;
};

export { Optional };
