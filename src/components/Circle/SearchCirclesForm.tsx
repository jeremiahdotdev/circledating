import { Input } from "@/components/ui/input";
import React, { useCallback } from "react";

export type SearchCirclesFormProps = {
  handleSearch: (searchText: string) => void;
};

export function SearchCirclesForm({ handleSearch }: SearchCirclesFormProps) {
  const onChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      handleSearch(e.target.value);
    },
    [handleSearch]
  );
  return <Input placeholder="Search..." name="search" onChange={onChange} />;
}
