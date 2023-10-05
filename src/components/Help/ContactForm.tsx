import { EmailSchema, EmailSchemaType } from "@/schemas/Email";
import { Form } from "@/components/ui/form";
import { FormButton } from "@/components/ui/FormButton";
import { InputFormField } from "@/components/ui/InputFormField";
import { TextAreaFormField } from "../ui/TextAreaFormField";
import { api } from "@/utils/api";
import { handleError } from "@/utils/handleError";
import { useCallback } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";

export function ContactForm() {
  const { mutateAsync } = api.email.send.useMutation();
  const form = useForm<EmailSchemaType>({
    resolver: zodResolver(EmailSchema),
  });

  const onInvalidData = useCallback(handleError, []);
  const onValidData = useCallback(
    (data: EmailSchemaType) => {
      form.reset();
      mutateAsync(data).catch(handleError);
    },
    [mutateAsync, form]
  );

  return (
    <div className="max-h-fit w-full max-w-screen-md bg-white p-6 shadow-outter">
      <h1 className="flex w-full justify-center text-xl">Contact Us</h1>
      <Form
        form={form}
        className="flex w-full flex-wrap items-center justify-center gap-2"
        onSubmit={form.handleSubmit(onValidData, onInvalidData)}
      >
        <InputFormField
          control={form.control}
          name="email"
          type="text"
          placeholder="Type your email address..."
          className="my-2 w-full shadow-inner-xl sm:w-1/2"
        />
        <InputFormField
          control={form.control}
          name="subject"
          type="text"
          placeholder="Subject..."
          className="my-2 w-full shadow-inner-xl sm:w-1/2"
        />
        <TextAreaFormField
          control={form.control}
          name="body"
          placeholder="Body..."
          className="my-2 min-h-[250px] w-full shadow-inner-xl"
        />
        <FormButton label="Send" />
      </Form>
    </div>
  );
}
