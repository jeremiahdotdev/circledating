import { Form } from "@/components/ui/form";
import { Gender } from ".prisma/client";
import { IconButton, IconButtonVariant } from "../../schemas/IconButton";
import { MessageSchema, MessageSchemaType } from "@/schemas/Message";
import { TextAreaFormField } from "@/components/ui/TextAreaFormField";
import { api } from "@/utils/api";
import { cn } from "@/lib/utils";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useCallback } from "react";
import state from "@/utils/user.store";

export type NewMessageBarProps = {
  gender: Gender;
  recipientUsername?: string;
  conversationId?: string;
  onSend: (message: MessageSchemaType) => void;
};

export function NewMessageForm({
  gender,
  recipientUsername,
  conversationId,
  onSend,
}: NewMessageBarProps) {
  const { mutateAsync } = api.messages.create.useMutation();
  const form = useForm<MessageSchemaType>({
    resolver: zodResolver(MessageSchema),
    defaultValues: {
      authorUsername: state.currentUser.username,
      recipientUsername: "<USER>",
      conversationId: "<ID>",
    },
  });
  const onInvalidData = useCallback((errors: unknown) => {
    console.error(errors);
  }, []);
  const onValidData = useCallback(
    (data: MessageSchemaType) => {
      data.recipientUsername = recipientUsername ?? "";
      data.conversationId = conversationId ?? "";
      mutateAsync(data)
        .then(() => {
          onSend(data);
          form.reset();
        })
        .catch((e) => console.log(e));
    },
    [conversationId, recipientUsername, mutateAsync, onSend, form]
  );

  return (
    <Form {...form}>
      <form
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
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
      </form>
    </Form>
  );
}
