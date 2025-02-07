import React, { useEffect, useState } from "react";

interface AlertProps {
  variant: "Success" | "Danger";
  message: string;
  duration?: number;
  onClose?: () => void;
}

const Alert: React.FC<AlertProps> = ({
  variant,
  message,
  duration = 3000,
  onClose,
}) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      if (onClose) onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  if (!isVisible) return null;

  return (
    <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50">
      <div
        className={`${
          variant === "Success" ? "bg-green-500" : "bg-red-500"
        } text-white p-4 rounded-lg shadow-lg flex items-center justify-center`}
      >
        <p className="font-semibold">{message}</p>
      </div>
    </div>
  );
};

export default Alert;
