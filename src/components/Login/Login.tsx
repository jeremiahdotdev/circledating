import { Anchor } from "../Shared/Anchor";
import { Form } from "@/components/ui/form";
import { FormButton } from "@/components/ui/FormButton";
import { InputFormField } from "@/components/ui/InputFormField";
import { LoginSchema, LoginSchemaType } from "@/schemas/LoginSchema";
import { Logo } from "../Nav/Logo";
import { RouteOptionLink } from "@/utils/RouteOptionLink";
import { Separator } from "../ui/separator";
import { routes } from "@/globals/routes";
import { signIn } from "next-auth/react";
import { useCallback } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";

export function Login() {
  const form = useForm<LoginSchemaType>({
    resolver: zodResolver(LoginSchema),
  });

  const onSubmit = useCallback(async (data: LoginSchemaType) => {
    await signIn("credentials", { ...data, callbackUrl: "/dashboard" });
  }, []);

  return (
    <div className="max-h-fit max-w-screen-sm bg-white p-4 shadow-outter">
      <Form
        form={form}
        className="flex w-full flex-col items-center justify-center gap-2"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <Logo className="py-2" />
        <Separator />
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
        <RouteOptionLink option={routes.signup()}>
          <Anchor>- Sign Up -</Anchor>
        </RouteOptionLink>
        <FormButton label="Login" />
      </Form>
    </div>
  );
}
