/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/require-default-props */
import React from "react";

export interface ButtonProps {
  label: string;
  loading?: boolean;
  onClick?: () => void;
}

const Button = ({ label, loading, onClick }: ButtonProps): JSX.Element => (
  <button
    type="button"
    onClick={onClick}
    disabled={loading}
    className="text-7 font-normal px-4 py-2 rounded-lg bg-solid text-white w-full disabled:bg-disabled"
  >
    {!loading && label}
    {loading && "cargando..."}
  </button>
);

export default Button;
