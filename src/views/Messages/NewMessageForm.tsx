import { Form } from "@/components/ui/form";
import { Gender } from ".prisma/client";
import { IconButton, IconButtonVarient } from "../../schemas/IconButton";
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
  recipient: string;
  onSend: (message: MessageSchemaType) => void;
};

export function NewMessageForm({
  gender,
  recipient,
  onSend,
}: NewMessageBarProps) {
  const { mutateAsync } = api.messages.create.useMutation();
  const form = useForm<MessageSchemaType>({
    resolver: zodResolver(MessageSchema),
    defaultValues: {
      id: "<ID>",
      createdAt: new Date(),
      updatedAt: null,
      authorUsername: state.currentUser.username,
      recipientUsername: recipient,
    },
  });
  const onInvalidData = useCallback((errors: unknown) => {
    console.error(errors);
  }, []);
  const onValidData = useCallback(
    (data: MessageSchemaType) => {
      data.createdAt = new Date();
      data.id = [
        data.authorUsername,
        data.recipientUsername,
        new Date().toISOString(),
      ].join("-");

      mutateAsync(data)
        .then(() => {
          onSend(data);
          form.reset();
        })
        .catch((e) => console.log(e));
    },
    [mutateAsync, onSend, form]
  );

  return (
    <Form {...form}>
      <form
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        onSubmit={form.handleSubmit(onValidData, onInvalidData)}
        className="flex w-full flex-row items-center gap-3 sm:w-3/4"
      >
        <TextAreaFormField
          name="content"
          className={cn(
            "flex min-h-fit w-full resize-none flex-col flex-wrap justify-center rounded-full border px-8 text-xl outline-none ring-offset-background",
            gender == Gender.MALE ? "bg-cyan-50" : "bg-fuchsia-100"
          )}
        ></TextAreaFormField>
        <IconButton
          label="Send"
          variant={IconButtonVarient.MESSAGE}
          type="submit"
        />
      </form>
    </Form>
  );
}
