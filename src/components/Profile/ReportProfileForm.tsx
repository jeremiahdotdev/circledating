import { DropdownFormField } from "../ui/DropdownFormField";
import { Form } from "../ui/form";
import { FormButton } from "../ui/FormButton";
import { ReadProfileSchemaType } from "@/schemas/Profile";
import { ReportSchema, ReportSchemaType } from "@/schemas/Report";
import { TextAreaFormField } from "../ui/TextAreaFormField";
import { api } from "@/utils/api";
import { handleError } from "@/utils/handleError";
import { useForm } from "react-hook-form";
import { useSession } from "next-auth/react";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useCallback, useMemo } from "react";

export type ReportProfileFormProps = {
  profile: ReadProfileSchemaType;
  onSubmit: (report: ReportSchemaType) => Promise<void>;
};

export function ReportProfileForm({
  profile,
  onSubmit,
}: ReportProfileFormProps) {
  const { data: session } = useSession();
  const { mutateAsync } = api.reports.create.useMutation();
  const form = useForm<ReportSchemaType>({
    resolver: zodResolver(ReportSchema),
    defaultValues: {
      reporterUsername: session?.user?.name ?? "",
      reportedUsername: profile.username,
    },
  });
  const onInvalidData = useCallback(handleError, []);
  const onValidData = useCallback(
    (data: ReportSchemaType) => {
      mutateAsync(data)
        .then(() => {
          form.reset();
          return onSubmit(data);
        })
        .catch(handleError);
    },
    [mutateAsync, onSubmit, form]
  );
  const relevantCircles = useMemo(() => {
    return profile?.circles?.map((c) => ({ label: c.label, value: c.id }));
  }, [profile]);
  return (
    <Form
      form={form}
      onSubmit={form.handleSubmit(onValidData, onInvalidData)}
      className="flex flex-col gap-2"
    >
      {relevantCircles && (
        <DropdownFormField
          control={form.control}
          options={relevantCircles}
          label="Circle? (Leave blank if user is breaking CircleDating site policy)"
          name="circleId"
        />
      )}
      <TextAreaFormField
        name="message"
        label="Reason for report:"
        placeholder="Reason..."
        control={form.control}
      />
      <FormButton label="Submit Report" />
    </Form>
  );
}
