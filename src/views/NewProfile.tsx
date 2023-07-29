"use client";

import { ActivitiySelectionValues } from "@/schemas/Activity";
import { Button } from "@/components/ui/button";
import { ComboBoxFormField } from "@/components/ui/ComboboxFormField";
import { ConsumablesSelectionValues } from "@/schemas/Consumables";
import { DrinkingSelectionValues } from "@/schemas/Drinking";
import { DropdownFormField } from "@/components/ui/DropdownFormField";
import { Form } from "@/components/ui/form";
import { FormSectionHeading } from "@/components/ui/formsectionheading";
import { GenderSelectionValues } from "@/schemas/Gender";
import { InputFormField } from "@/components/ui/InputFormField";
import { LabeledInputFormField } from "@/components/ui/LabeledInputFormField";
import { LevelOfEducationSelectionValues } from "@/schemas/LevelOfEducation";
import { MaritalStatusesSelectionValues } from "@/schemas/MaritalStatuses";
import { PoliticalBeliefsSelectionValues } from "@/schemas/PoliticalBeliefs";
import { ProfileSchema, ProfileSchemaType } from "@/schemas/Profile";
import { TextAreaFormField } from "@/components/ui/TextAreaFormField";
import {
  YesAndNoAndUnknownSelectionValues,
  YesAndNoSelectionValues,
} from "@/schemas/YesAndNo";
import { countries } from "@/globals/location";
import { memo, useCallback, useMemo } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import styles from "./NewProfile.module.scss";

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
          <section>
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
            <DropdownFormField<ProfileSchemaType>
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
          </section>
          <FormSectionHeading>Location</FormSectionHeading>
          <section className={styles.section}>
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
          </section>
          <FormSectionHeading>Family</FormSectionHeading>
          <section>
            <DropdownFormField<ProfileSchemaType>
              name="wantsKids"
              control={form.control}
              label="Do you want kids?"
              options={YesAndNoSelectionValues}
            />
            <DropdownFormField<ProfileSchemaType>
              name="hasKids"
              control={form.control}
              label="Do you have kids?"
              options={YesAndNoSelectionValues}
            />
            <DropdownFormField<ProfileSchemaType>
              name="maritalStatus"
              control={form.control}
              label="Have you ever been married?"
              options={MaritalStatusesSelectionValues}
            />
          </section>
          <FormSectionHeading>Lifestyle</FormSectionHeading>
          <section className={styles.section}>
            <DropdownFormField<ProfileSchemaType>
              name="consumables"
              control={form.control}
              label="Do you consume any of the following?"
              options={ConsumablesSelectionValues}
            />
            <DropdownFormField<ProfileSchemaType>
              name="consumables"
              control={form.control}
              label="How often do you drink?"
              options={DrinkingSelectionValues}
            />
            <DropdownFormField<ProfileSchemaType>
              name="activity"
              control={form.control}
              label="How often do you excercise?"
              options={ActivitiySelectionValues}
            />
          </section>
          <FormSectionHeading>About You</FormSectionHeading>
          <section>
            <DropdownFormField<ProfileSchemaType>
              name="politicalBeliefs"
              control={form.control}
              label="What is your political stance?"
              options={PoliticalBeliefsSelectionValues}
            />
            <DropdownFormField<ProfileSchemaType>
              name="levelOfEducation"
              control={form.control}
              label="What is the highest level of education to have obtained?"
              options={LevelOfEducationSelectionValues}
            />
            <TextAreaFormField
              control={form.control}
              name="bio"
              label="Bio"
              placeholder="Describe yourself! Passions, faith, career, hobbies, et cetera."
            />
          </section>
          <FormSectionHeading>
            Sensitive Information (Optional)
          </FormSectionHeading>
          <section className={styles.section}>
            <DropdownFormField<ProfileSchemaType>
              name="isVirgin"
              control={form.control}
              label="Are you a virgin?"
              options={YesAndNoAndUnknownSelectionValues}
            />
            <DropdownFormField<ProfileSchemaType>
              name="onlyLookingForTraditionalHousehold"
              control={form.control}
              label="Are you looking for a traditional household? (Stay-at-home-mom, one source of income, et cetera.)"
              options={YesAndNoAndUnknownSelectionValues}
            />
            <DropdownFormField<ProfileSchemaType>
              name="canSupportFamilyOnCurrentIncome"
              control={form.control}
              label="Can you support a family on your current income alone?"
              options={YesAndNoAndUnknownSelectionValues}
            />
          </section>
          <Button className="mt-2 w-20 px-12" type="submit">
            Submit
          </Button>
        </form>
      </Form>
    </div>
  );
});
