import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import React from "react";

export function handleError(error: unknown) {
  console.error(error);
  return (
    <Alert>
      <AlertTitle>Something went wrong,</AlertTitle>
      <AlertDescription>Please try again later.</AlertDescription>
    </Alert>
  );
}
