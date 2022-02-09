import React from 'react';

interface Props {
  text: string;
  disabled?: boolean;
  onClick?: () => void;
}

function Button({ text, disabled, onClick }: Props) {
  const borderColor = disabled ? 'border-gray-700' : 'border-gray-400';
  const bgColor = disabled ? 'bg-gray-500' : 'bg-gray-100';
  const bgColorHover = disabled ? '' : 'bg-gray-200';

  return (
    <button
      className={`border ${borderColor} ${bgColor} ${bgColorHover} active:bg-gray-300 transition px-5 py-1 rounded`}
      disabled={disabled}
      onClick={onClick}
    >
      {text}
    </button>
  );
}

export default Button;
