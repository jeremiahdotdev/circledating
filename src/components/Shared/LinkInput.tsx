import { Input } from "../ui/input";
import { LinkSchemaType, Url } from "@/schemas/Link";
import React, { useCallback, useState } from "react";

export type LinksEditorProps = {
  index: number;
  link: LinkSchemaType;
  setLinkAtIndex: (index: number, link: LinkSchemaType) => void;
};

export function LinkInput({ index, link, setLinkAtIndex }: LinksEditorProps) {
  const [inputState, setInputState] = useState<LinkSchemaType>(link);
  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = { href: event.target.value as Url };
      setInputState({ ...inputState, ...value });
      setLinkAtIndex(index, value);
    },
    [setLinkAtIndex, inputState, index]
  );
  return <Input defaultValue={link.href} onChange={handleChange} />;
}
