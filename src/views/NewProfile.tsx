"use client";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { FormSectionHeading } from "@/components/ui/FormSectionHeading";
import { GenderSelectionValues } from "@/schemas/Gender";
import {
  YesAndNoAndUnknownSelectionValues,
  YesAndNoSelectionValues,
} from "@/schemas/YesAndNo";
import { InputFormField } from "@/components/ui/InputFormField";
import { ProfileSchema, ProfileSchemaType } from "@/schemas/Profile";
import { DropdownFormField } from "@/components/ui/DropdownFormField";
import { countries } from "@/globals/location";
import { memo, useCallback, useMemo } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import styles from "./NewProfile.module.scss";
import { LabeledInputFormField } from "@/components/ui/LabeledInputFormField";
import { ComboBoxFormField } from "@/components/ui/ComboboxFormField";
import { MaritalStatusesSelectionValues } from "@/schemas/MaritalStatuses";
import { ConsumablesSelectionValues } from "@/schemas/Consumables";
import { DrinkingSelectionValues } from "@/schemas/Drinking";
import { ActivitiySelectionValues } from "@/schemas/Activity";
import { PoliticalBeliefsSelectionValues } from "@/schemas/PoliticalBeliefs";
import { LevelOfEducationSelectionValues } from "@/schemas/LevelOfEducation";

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
          <LabeledInputFormField
            control={form.control}
            name="username"
            label="What is your reddit username?"
            placeholder="username"
            inlineLabel="u/"
            description="This is the username you use to log into Reddit."
          />
          <InputFormField
            control={form.control}
            name="usersNotToBeMatchedWith"
            label="Are there any users you do not want to be matched with?"
            placeholder="Users1, User2, User3... "
            description="List any reddit users you do not want to be matched with. (For example, have you matched with anyone before? Might want to right them down, unless you want to be rematched.) Please format in a comma separated list."
          />
          <DropdownFormField<ProfileSchemaType, string>
            name="sex"
            control={form.control}
            label="What is your sex?"
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
          <ComboBoxFormField<ProfileSchemaType, string>
            name="location.country"
            control={form.control}
            label="Country"
            options={countryValues}
          />
          <ComboBoxFormField<ProfileSchemaType, string>
            name="location.states"
            control={form.control}
            label="State"
            options={stateValues}
          />
          <FormSectionHeading>Family</FormSectionHeading>
          <DropdownFormField<ProfileSchemaType, string>
            name="wantsKids"
            control={form.control}
            label="Do you want kids?"
            options={YesAndNoSelectionValues}
          />
          <DropdownFormField<ProfileSchemaType, string>
            name="hasKids"
            control={form.control}
            label="Do you have kids?"
            options={YesAndNoSelectionValues}
          />
          <DropdownFormField<ProfileSchemaType, string>
            name="maritalStatus"
            control={form.control}
            label="Have you ever been married?"
            options={MaritalStatusesSelectionValues}
          />
          <FormSectionHeading>Lifestyle</FormSectionHeading>
          <DropdownFormField<ProfileSchemaType, string>
            name="consumables"
            control={form.control}
            label="Do you consume any of the following?"
            options={ConsumablesSelectionValues}
          />
          <DropdownFormField<ProfileSchemaType, string>
            name="consumables"
            control={form.control}
            label="How often do you drink?"
            options={DrinkingSelectionValues}
          />
          <DropdownFormField<ProfileSchemaType, string>
            name="activity"
            control={form.control}
            label="How often do you excercise?"
            options={ActivitiySelectionValues}
          />
          <FormSectionHeading>About You</FormSectionHeading>
          <DropdownFormField<ProfileSchemaType, string>
            name="politicalBeliefs"
            control={form.control}
            label="What is your political stance?"
            options={PoliticalBeliefsSelectionValues}
          />
          <DropdownFormField<ProfileSchemaType, string>
            name="levelOfEducation"
            control={form.control}
            label="What is the highest level of education to have obtained?"
            options={LevelOfEducationSelectionValues}
          />
          <FormSectionHeading>
            Sensitive Information (Optional)
          </FormSectionHeading>
          <DropdownFormField<ProfileSchemaType, string>
            name="isVirgin"
            control={form.control}
            label="Are you a virgin?"
            options={YesAndNoAndUnknownSelectionValues}
          />
          <DropdownFormField<ProfileSchemaType, string>
            name="onlyLookingForTraditionalHousehold"
            control={form.control}
            label="Are you looking for a traditional household? (Stay-at-home-mom, one source of income, et cetera.)"
            options={YesAndNoAndUnknownSelectionValues}
          />
          <DropdownFormField<ProfileSchemaType, string>
            name="canSupportFamilyOnCurrentIncome"
            control={form.control}
            label="Can you support a family on your current income alone?"
            options={YesAndNoAndUnknownSelectionValues}
          />
          <Button className="mt-2" type="submit">
            Submit
          </Button>
        </form>
      </Form>
    </div>
  );
});
