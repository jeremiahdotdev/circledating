import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { handleError } from "@/utils/handleError";
import { routes } from "@/globals/routes";
import { useCallback, useRef, useState } from "react";
import Image from "next/image";
import React from "react";
import type { PutBlobResult } from "@vercel/blob";

export type AvatarUploadProps = {
  imageHandler: (imageURL: string) => void;
};

export default function AvatarUpload({ imageHandler }: AvatarUploadProps) {
  const inputFileRef = useRef<HTMLInputElement>(null);
  const [blob, setBlob] = useState<PutBlobResult | null>(null);
  const [image, setImage] = useState("");
  const [buttonText, setButtonText] = useState("Upload");

  const toBase64 = useCallback(
    async (file: File) =>
      new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;
      }),
    []
  );

  const onSubmit = useCallback(
    (event: React.FormEvent) => {
      const file = inputFileRef?.current?.files?.[0];
      event.preventDefault();
      if (file)
        toBase64(file)
          .then(async (fileAsBase64) => {
            const responseFromServer = await fetch(
              routes.uploadAvatar(file.name).href,
              {
                method: "POST",
                body: fileAsBase64 as string,
              }
            );
            const newBlob = (await responseFromServer.json()) as PutBlobResult;
            setBlob(newBlob);
            imageHandler(newBlob.url);
            const imageResponse = await fetch(newBlob.url, {
              method: "GET",
            });
            const newImage = await imageResponse.text();
            setImage(newImage);
            setButtonText("Uploaded");
          })
          .catch(handleError);
    },
    [toBase64, imageHandler]
  );

  return (
    <form onSubmit={onSubmit} className="flex w-full flex-col gap-2">
      <div className="rounded-md border">
        <Input name="file" ref={inputFileRef} type="file" required />
        {blob && (
          <Image src={image} width={375} height={375} alt={blob.pathname} />
        )}
      </div>

      <Button
        disabled={buttonText !== "Upload"}
        type="submit"
        className="w-full bg-purple-600"
      >
        {buttonText}
      </Button>
    </form>
  );
}
