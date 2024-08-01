interface ButtonProps {
  text: string;
  target: string;
}

function Button({ text }: ButtonProps) {
  return (
    <>
      <button>{text}</button>
    </>
  );
}

export default Button;
