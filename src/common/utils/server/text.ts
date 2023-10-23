import removeAccents from "remove-accents";

interface WithoutAccentsProps {
  text: string;
  lowerCase?: boolean;
}

const withoutAccents = ({ text, lowerCase }: WithoutAccentsProps) => {
  const textWithoutAccents = removeAccents(text);
  if (lowerCase) return textWithoutAccents.toLowerCase();
  return textWithoutAccents;
};

export { withoutAccents };
