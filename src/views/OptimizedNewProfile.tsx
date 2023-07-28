"use client";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { FormSectionHeading } from "@/components/ui/formsectionheading";
import { GenderSelectionValues } from "@/schemas/Gender";
import { InputFormField } from "@/components/ui/InputFormField";
import { ProfileSchema, ProfileSchemaType } from "@/schemas/Profile";
import { SelectFormField } from "@/components/ui/SelectFormField";
import { countries } from "@/globals/location";
import { memo, useCallback, useMemo } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import styles from "./OptimizedNewProfile.module.scss";

export type NewProfileProps = {
  communityName: string;
};

export const NewProfile = memo(function NewProfile({
  communityName,
}: NewProfileProps) {
  const form = useForm<ProfileSchemaType>({
    resolver: zodResolver(ProfileSchema),
    defaultValues: {},
  });

  // The forms type says this is always a string, but that is the defined case for the form. If no country is selected, it's undefined.
  const selectedCountry = form.watch("location.country") as string | undefined;

  // Memoized Values
  const countryValues = useMemo(
    () =>
      countries.map((country) => ({
        value: country.country,
        label: country.country,
      })),
    []
  );
  const stateValues = useMemo(() => {
    if (!selectedCountry) {
      return [];
    }

    const country = countries.find(
      (country) => country.country === selectedCountry
    );

    if (!country) {
      return [];
    }

    return country.states.map((state) => ({
      value: state,
      label: state,
    }));
  }, [selectedCountry]);

  // Callbacks
  // Todo type the function parameter
  const onInvalidData = useCallback(
    (errors: unknown) => {
      // Errors are presented in the errors object from the hook. the key is the name of the input and can be used to dynamically display the error message, see below for example
      console.error(errors);
      console.log(form.getValues());
    },
    [form]
  );

  const onValidData = useCallback((data: ProfileSchemaType) => {
    console.log(data);
    // Handle storing of the data here
  }, []);

  return (
    <div className={styles.newProfile}>
      <h1>{communityName} Singles Database</h1>
      <Form {...form}>
        <form onSubmit={void form.handleSubmit(onValidData, onInvalidData)}>
          <FormSectionHeading>General</FormSectionHeading>
          <InputFormField
            control={form.control}
            name="username"
            label="Reddit Username"
            description="This is the username you use to log into Reddit."
          />
          <InputFormField
            control={form.control}
            name="usersNotToBeMatchedWith"
            label="Users to not be matched with"
            description="List any reddit users you do not want to be matched with. (For example, have you matched with anyone before? Might want to right them down, unless you want to be rematched.) Please format in a comma separated list."
          />
          <SelectFormField<ProfileSchemaType, string>
            name="sex"
            control={form.control}
            label="Sex"
            options={GenderSelectionValues}
          />
          <InputFormField
            control={form.control}
            name="age"
            label="Age"
            description="Please enter your age."
            type="number"
          />
          <FormSectionHeading>Location</FormSectionHeading>
          <SelectFormField<ProfileSchemaType, string>
            name="location.country"
            control={form.control}
            label="Country"
            options={countryValues}
          />
          <SelectFormField<ProfileSchemaType, string>
            name="location.states"
            control={form.control}
            label="State"
            options={stateValues}
          />
          <Button className="mt-2" type="submit">
            Submit
          </Button>
        </form>
      </Form>
    </div>
  );
});
