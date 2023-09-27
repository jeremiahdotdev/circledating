import { Form } from "@/components/ui/form";
import { Gender } from ".prisma/client";
import { IconButton, IconButtonVariant } from "../Shared/IconButton";
import {
  MutateMessageSchema,
  MutateMessageSchemaType,
} from "@/schemas/Message";
import { TextAreaFormField } from "@/components/ui/TextAreaFormField";
import { api } from "@/utils/api";
import { cn } from "@/lib/utils";
import { handleError } from "@/utils/handleError";
import { useForm } from "react-hook-form";
import { useSession } from "next-auth/react";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useCallback } from "react";

export type NewMessageBarProps = {
  gender: Gender;
  recipientUsername?: string;
  conversationId?: string;
  onSend: (message: MutateMessageSchemaType) => void;
};

export function NewMessageForm({
  gender,
  recipientUsername,
  conversationId,
  onSend,
}: NewMessageBarProps) {
  const { data: session } = useSession();

  const { mutateAsync } = api.messages.create.useMutation();
  const form = useForm<MutateMessageSchemaType>({
    resolver: zodResolver(MutateMessageSchema),
    defaultValues: {
      authorUsername: session?.user?.name ?? "",
      recipientUsername: "<USER>",
      conversationId: "<ID>",
    },
  });
  const onInvalidData = useCallback(handleError, []);
  const onValidData = useCallback(
    (data: MutateMessageSchemaType) => {
      data.recipientUsername = recipientUsername ?? "";
      data.conversationId = conversationId ?? "";
      mutateAsync(data)
        .then(() => {
          onSend(data);
          form.reset();
        })
        .catch(handleError);
    },
    [conversationId, recipientUsername, mutateAsync, onSend, form]
  );

  return (
    <Form
      form={form}
      onSubmit={form.handleSubmit(onValidData, onInvalidData)}
      className="flex items-center gap-3 sm:mx-12"
    >
      <TextAreaFormField
        name="content"
        className={cn(
          "resize-none rounded-full border px-8 text-xl outline-none ring-offset-background",
          gender == Gender.MALE ? "bg-cyan-50" : "bg-fuchsia-100"
        )}
        disabled={!recipientUsername}
      ></TextAreaFormField>
      <IconButton
        variant={IconButtonVariant.MESSAGE}
        type="submit"
        disabled={!recipientUsername}
      />
    </Form>
  );
}
