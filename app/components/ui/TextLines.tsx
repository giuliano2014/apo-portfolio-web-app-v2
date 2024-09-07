const TextLines = ({ text }: { text: string }): JSX.Element => {
  const symbol = "\n";
  const hasLineBreaks = text.includes(symbol);

  return (
    <>
      {hasLineBreaks ? (
        text
          .split(symbol)
          .map((line: string, index: number) => <p key={index}>{line}</p>)
      ) : (
        <p>{text}</p>
      )}
    </>
  );
};

export default TextLines;
