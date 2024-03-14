import { IconButton } from "./IconButton";
import { IconButtonVariant } from "@/schemas/Button";
import { LinkInput } from "./LinkInput";
import { LinkSchemaType } from "@/schemas/Link";
import React, { useCallback, useMemo, useState } from "react";

export type LinksEditorProps = {
  list: LinkSchemaType[];
  max?: number;
  setList: (links: LinkSchemaType[]) => void;
};

export function LinksEditor({ list, setList, max }: LinksEditorProps) {
  const blankLink: LinkSchemaType = useMemo(() => ({ href: "https://" }), []);
  const [localList, setLocalList] = useState(list);
  const hasMax = max && localList.length >= max;
  const hasMin = localList.length == 0;
  const addListItem = useCallback(() => {
    if (hasMax) return;
    setLocalList([...localList, blankLink]);
    setList([...localList, blankLink]);
  }, [hasMax, blankLink, localList, setList]);
  const removeListItem = useCallback(() => {
    if (hasMin) return;
    localList.pop();
    setLocalList([...localList]);
    setList([...localList]);
  }, [hasMin, localList, setLocalList, setList]);

  const setAtIndex = useCallback(
    (index: number, link: LinkSchemaType) => {
      localList[index] = link;
      setLocalList([...localList]);
      setList([...localList]);
    },
    [localList, setLocalList, setList]
  );

  const renderInputList = useMemo(() => {
    return localList.map((listValue, index) => (
      <LinkInput
        key={`list${index}`}
        index={index}
        setLinkAtIndex={setAtIndex}
        link={listValue}
      />
    ));
  }, [setAtIndex, localList]);

  return (
    <div className="flex w-full flex-col items-center justify-center gap-2">
      <h3 className="text-2xl">Social Media Links</h3>
      {renderInputList}
      <span className="flex">
        <IconButton
          variant={IconButtonVariant.MINUS}
          onClick={removeListItem}
        />
        {!hasMax && (
          <IconButton variant={IconButtonVariant.PLUS} onClick={addListItem} />
        )}
      </span>
    </div>
  );
}
