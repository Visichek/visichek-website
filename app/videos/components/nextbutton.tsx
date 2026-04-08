"use client";

interface INextButtonProps {
  onClick: () => void;
  disabled?: boolean;
  children: React.ReactNode;
}

const NextButton: React.FC<INextButtonProps> = ({
  onClick,
  disabled,
  children,
}) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="disabled:bg-black/80 disabled:cursor-not-allowed bg-black/90 text-white font-semibold w-full lg:w-[31%] lg:max-w-[350px] py-3 cursor-pointer"
    >
      {children}
    </button>
  );
};

export default NextButton;
