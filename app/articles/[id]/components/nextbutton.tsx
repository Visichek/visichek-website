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
      className="inline-flex w-full items-center justify-center rounded-full bg-gradient-to-b from-[#43aa1a] to-[#2e7a11] px-6 py-3 text-[14px] font-semibold text-white shadow-sm shadow-green-700/15 transition-all duration-200 hover:-translate-y-px hover:shadow-md disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-sm lg:w-[31%] lg:max-w-[350px]"
    >
      {children}
    </button>
  );
};

export default NextButton;
