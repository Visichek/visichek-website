import clsx from "clsx";
import React from "react";
import ReactDOM from "react-dom";

interface IModal {
  open: boolean;
  children: React.ReactNode;
  ref?: any;
}

const Modal: React.FC<IModal> = ({ children, open, ref }) => {
  const [mounted, setMounted] = React.useState(false);
  const [isVisible, setIsVisible] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);

    if (open) {
      document.body.style.overflow = "hidden";
      setTimeout(() => setIsVisible(true), 4);
    } else {
      setIsVisible(false);
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  React.useEffect(() => {
    if (!open && mounted) {
      const timer = setTimeout(() => setMounted(false), 300);
      return () => clearTimeout(timer);
    }
  }, [open, mounted]);

  if (!mounted) return null;

  return ReactDOM.createPortal(
    <div
      className={clsx(
        "fixed inset-0 bg-black/70 backdrop-blur-sm z-9999 flex justify-center items-start pt-10 transition-all duration-300 ease-out",
        isVisible ? "opacity-100" : "opacity-0 pointer-events-none"
      )}
    >
      <div
        ref={ref}
        className={clsx(
          "bg-black text-white w-full max-w-xl p-6 rounded-lg shadow-lg transform transition-all duration-300 ease-out",
          isVisible
            ? "translate-y-0 opacity-100 scale-100"
            : "-translate-y-10 opacity-0 scale-95"
        )}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>,
    document.body
  );
};

export default Modal;
