import React from "react";
import Spinner from "./Spinner";

const Button = ({
  children,
  onClick,
  disabled = false,
  type = "button",
  loading = false,
  className = "",
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`btn ${className}`}
    >
      {loading ? <Spinner size="small" /> : children}
    </button>
  );
};

export default Button;
