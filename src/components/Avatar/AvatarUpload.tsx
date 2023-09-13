import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { handleError } from "@/utils/handleError";
import { routes } from "@/globals/routes";
import { useCallback, useRef, useState } from "react";
import Image from "next/image";
import React from "react";
import type { PutBlobResult } from "@vercel/blob";

export default function AvatarUpload() {
  const inputFileRef = useRef<HTMLInputElement>(null);
  const [blob, setBlob] = useState<PutBlobResult | null>(null);

  const file = inputFileRef?.current?.files?.[0];
  const onSubmit = useCallback(
    (event: React.FormEvent) => {
      event.preventDefault();
      if (!file) return;
      const options = {
        method: "POST",
        body: file,
      };

      fetch(routes.uploadAvatar(file.name).href, options)
        .then(async (response) => {
          const newBlob = (await response.json()) as PutBlobResult;
          setBlob(newBlob);
        })
        .catch(handleError);
    },
    [file]
  );

  return (
    <form onSubmit={onSubmit} className="flex w-full flex-col gap-2">
      <div className="rounded-md border">
        <Input name="file" ref={inputFileRef} type="file" required />
        {blob && (
          <Image
            src={`${blob.url}`}
            width={375}
            height={375}
            alt={file?.name ?? ""}
          />
        )}
      </div>

      <Button type="submit" className="w-full bg-purple-600">
        Upload
      </Button>
    </form>
  );
}
