"use client";

import { ActivitySelectionValues } from "@/schemas/Activity";
import { Button } from "@/components/ui/button";
import { ChildrenSelectionValues } from "@/schemas/Children";
import { CircleSchemaType } from "@/schemas/Circle";
import { ComboBoxFormField } from "@/components/ui/ComboboxFormField";
import { ConsumablesSelectionValues } from "@/schemas/Consumables";
import { DatepickerFormField } from "@/components/ui/DatePickerFormField";
import { DrinkingSelectionValues } from "@/schemas/Drinking";
import { DropdownFormField } from "@/components/ui/DropdownFormField";
import { EthnicitySelectionValues } from "@/schemas/Ethnicity";
import { Form } from "@/components/ui/form";
import { FormSectionHeading } from "@/components/ui/formsectionheading";
import { GenderSelectionValues } from "@/schemas/Gender";
import { HeightStringSelectOptions } from "@/schemas/Height";
import { IncomeSelectionValues } from "@/schemas/Income";
import { LabeledInputFormField } from "@/components/ui/LabeledInputFormField";
import { LevelOfEducationSelectionValues } from "@/schemas/LevelOfEducation";
import { MaritalStatusesSelectionValues } from "@/schemas/MaritalStatuses";
import { PoliticalBeliefsSelectionValues } from "@/schemas/PoliticalBeliefs";
import { ProfileSchema, ProfileSchemaType } from "@/schemas/Profile";
import { PuritySelectionValues } from "@/schemas/Purity";
import { ReligionSelectionValues } from "@/schemas/Religion";
import { TextAreaFormField } from "@/components/ui/TextAreaFormField";
import { WeightUnit } from "@prisma/client";
import { WeightUnitOptions } from "@/schemas/Units";
import { YesAndNoSelectionValues } from "@/schemas/YesAndNo";
import { api } from "@/utils/api";
import { countries } from "@/globals/location";
import { memo, useCallback, useMemo } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import styles from "./NewProfile.module.scss";

export type NewProfileProps = {
  circle: CircleSchemaType;
};

// eslint-disable-next-line max-lines-per-function
export const NewProfile = memo(function NewProfile({
  circle,
}: NewProfileProps) {
  const form = useForm<ProfileSchemaType>({
    resolver: zodResolver(ProfileSchema),
    defaultValues: {
      weightUnit: WeightUnit.LBS,
    },
  });

  const { mutateAsync } = api.profiles.create.useMutation();

  // The forms type says this is always a string, but that is the defined case for the form. If no country is selected, it's undefined.
  const selectedCountry = form.watch("location.country") as string | undefined;

  const selectedWeightUnit = form.watch("weightUnit");

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

  const onValidData = useCallback(
    (data: ProfileSchemaType) => {
      console.log(data);
      // TODO: Handle the promise correctly here!
      void mutateAsync(data);
    },
    [mutateAsync]
  );

  return (
    <div className={styles.newProfile}>
      <h1>{circle.name}</h1>
      <Form {...form}>
        {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
        <form onSubmit={form.handleSubmit(onValidData, onInvalidData)}>
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
            <DropdownFormField<ProfileSchemaType>
              name="sex"
              control={form.control}
              label="What is your sex?"
              options={GenderSelectionValues}
            />
            <DatepickerFormField
              control={form.control}
              name="birthDate"
              label="birth date"
              description="This is used to calculate your age."
            />
            <DropdownFormField<ProfileSchemaType>
              name="weightUnit"
              control={form.control}
              label="Whigh unit do you use?"
              options={WeightUnitOptions}
            />
            <LabeledInputFormField
              control={form.control}
              name="weight"
              label="What is your current weight?"
              placeholder="...be honest!"
              inlineLabel={selectedWeightUnit}
              labelPosition="right"
              type="number"
            />
            <DropdownFormField<ProfileSchemaType>
              name="height"
              control={form.control}
              label="What is your height?"
              options={HeightStringSelectOptions}
              type="number"
            />
            <DropdownFormField<ProfileSchemaType>
              name="ethnicity"
              control={form.control}
              label="What is your ethnicity?"
              options={EthnicitySelectionValues}
            />
          </section>
          <FormSectionHeading>Location</FormSectionHeading>
          <section className={styles.section}>
            <ComboBoxFormField<ProfileSchemaType, string>
              name="location.country"
              control={form.control}
              label="What is your country of residence?"
              options={countryValues}
            />
            <ComboBoxFormField<ProfileSchemaType, string>
              name="location.state"
              control={form.control}
              label="What is your state/province of residence?"
              options={stateValues}
            />
            <ComboBoxFormField<ProfileSchemaType, string>
              name="willingToRelocate"
              control={form.control}
              label="Are you willing to relocate?"
              options={YesAndNoSelectionValues}
            />
          </section>
          <FormSectionHeading>Family</FormSectionHeading>
          <section>
            <DropdownFormField<ProfileSchemaType>
              name="children"
              control={form.control}
              label="Do you have/want kids?"
              options={ChildrenSelectionValues}
            />
            <DropdownFormField<ProfileSchemaType>
              name="maritalStatus"
              control={form.control}
              label="Have you ever been married?"
              options={MaritalStatusesSelectionValues}
            />
            <DropdownFormField<ProfileSchemaType>
              name="onlyLookingForTraditionalHousehold"
              control={form.control}
              label="Are you only looking for a traditional household?"
              options={YesAndNoSelectionValues}
            />
            <DropdownFormField<ProfileSchemaType>
              name="income"
              control={form.control}
              label="What type of houshold are you looking for?"
              options={IncomeSelectionValues}
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
              name="drinking"
              control={form.control}
              label="How often do you drink?"
              options={DrinkingSelectionValues}
            />
            <DropdownFormField<ProfileSchemaType>
              name="activity"
              control={form.control}
              label="How often do you excercise?"
              options={ActivitySelectionValues}
            />
            <DropdownFormField<ProfileSchemaType>
              name="purity"
              control={form.control}
              label="What is your stance on purity?"
              options={PuritySelectionValues}
            />
          </section>
          <FormSectionHeading>About You</FormSectionHeading>
          <section>
            <DropdownFormField<ProfileSchemaType>
              control={form.control}
              name="religion"
              label="What is your religion?"
              options={ReligionSelectionValues}
            />
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
          <Button className="mt-2 w-20 px-12" type="submit">
            Submit
          </Button>
        </form>
      </Form>
    </div>
  );
});
