const TextLines = ({ text }: { text: string } ): JSX.Element => {
  return (
    <>
      {text.split("\n").map((line: string, index: number) => (
        <p key={index}>{line}</p>
      ))}
    </>
  );
};

export default TextLines;
