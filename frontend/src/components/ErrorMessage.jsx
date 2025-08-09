import React, { useEffect, useState } from 'react';

const ErrorMessage = ({ message, onClose }) => {
  const [visible, setVisible] = useState(false); // start hidden

  useEffect(() => {
    // Trigger fade-in
    const fadeInTimer = setTimeout(() => setVisible(true), 50);

    // Trigger fade-out after 3 seconds
    const fadeOutTimer = setTimeout(() => {
      setVisible(false);
      setTimeout(() => {
        if (onClose) onClose();
      }, 500); // wait for fade-out animation
    }, 3050); // 50ms delay + 3000ms visible

    return () => {
      clearTimeout(fadeInTimer);
      clearTimeout(fadeOutTimer);
    };
  }, [onClose]);

  return (
    <div
      className={`transition-all duration-500 ease-in-out transform ${visible
        ? 'opacity-100 translate-y-0'
        : 'opacity-0 -translate-y-2'
        } bg-red-500 text-white px-4 py-2 rounded-md shadow-md mb-4 text-center`}
      role="alert"
    >
      {message}
    </div>
  );
};

export default ErrorMessage;
