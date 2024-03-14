import React from "react";

export type RequiredAsteriskProps = {
  required?: boolean;
};

export const RequiredAsterisk = ({
  required = true,
}: RequiredAsteriskProps) => {
  if (required) return <span className="text-red-600">*</span>;
};
