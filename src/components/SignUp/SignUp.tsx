import { Anchor, AnchorVariant } from "../Shared/Anchor";
import { CurrentCircleHeader } from "./CurrentCircleHeader";
import { Form } from "@/components/ui/form";
import { FormButton } from "@/components/ui/FormButton";
import { InputFormField } from "@/components/ui/InputFormField";
import { Logo } from "../Nav/Logo";
import { ReadCircleSchemaType } from "@/schemas/Circle";
import { Separator } from "../ui/separator";
import { SignupSchema, SignupSchemaType } from "@/schemas/LoginSchema";
import { api } from "@/utils/api";
import { routes } from "@/globals/routes";
import { systemMessages } from "@/globals/systemMessages";
import { useCallback } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";

export type SignUpProps = {
  circle?: ReadCircleSchemaType;
};
export function SignUp({ circle }: SignUpProps) {
  const router = useRouter();
  const form = useForm<SignupSchemaType>({
    resolver: zodResolver(SignupSchema),
  });

  const { mutateAsync } = api.users.signUp.useMutation();

  const onSubmit = useCallback(
    async (data: SignupSchemaType) => {
      const result = await mutateAsync(data);
      if (result.status === 201) {
        await router.push(routes.login().href);
      }
    },
    [mutateAsync, router]
  );

  return (
    <div className="max-h-fit max-w-screen-sm bg-background p-4 shadow-outter">
      <Form
        form={form}
        className="flex w-full flex-col items-center justify-center gap-2"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        {circle ? (
          <CurrentCircleHeader circle={circle} />
        ) : (
          <Logo className="py-2" />
        )}
        <Separator />
        <InputFormField
          name="username"
          type="text"
          placeholder="Type your username..."
          className="my-2 w-full max-w-xs"
        />
        <InputFormField
          name="email"
          type="text"
          placeholder="Type your email..."
          className="my-2 w-full max-w-xs"
        />
        <InputFormField
          name="password"
          type="password"
          placeholder="Type your password..."
          className="my-2 w-full max-w-xs"
        />
        <Separator />
        <Anchor
          variant={AnchorVariant.AUTH}
          message={systemMessages.LOGIN}
          option={routes.login()}
        />
        <FormButton label="Sign Up" />
      </Form>
    </div>
  );
}
