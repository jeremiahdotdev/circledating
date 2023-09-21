"use client";

import { ActivitySelectionValues } from "@/schemas/Activity";
import { Button } from "@/components/ui/button";
import { ChildrenSelectionValues } from "@/schemas/Children";
import { CircleSchemaType } from "@/schemas/Circle";
import { ComboBoxFormField } from "@/components/ui/ComboboxFormField";
import { ConsumablesSelectionValues } from "@/schemas/Consumables";
import {
  CreateProfileSchema,
  CreateProfileSchemaType,
} from "@/schemas/Profile";
import { CurrentCircleHeader } from "./CurrentCircleHeader";
import { DatepickerFormField } from "@/components/ui/DatePickerFormField";
import { DrinkingSelectionValues } from "@/schemas/Drinking";
import { DropdownFormField } from "@/components/ui/DropdownFormField";
import { EthnicitySelectionValues } from "@/schemas/Ethnicity";
import { Form } from "@/components/ui/form";
import { FormSection } from "../ui/FormSection";
import { GenderSelectionValues } from "@/schemas/Gender";
import { HeightStringSelectOptions } from "@/schemas/Height";
import { IncomeSelectionValues } from "@/schemas/Income";
import { InputFormField } from "../ui/InputFormField";
import { LabeledInputFormField } from "@/components/ui/LabeledInputFormField";
import { LevelOfEducationSelectionValues } from "@/schemas/LevelOfEducation";
import { MaritalStatusesSelectionValues } from "@/schemas/MaritalStatuses";
import { PoliticalBeliefsSelectionValues } from "@/schemas/PoliticalBeliefs";
import { PuritySelectionValues } from "@/schemas/Purity";
import { ReligionSelectionValues } from "@/schemas/Religion";
import { TextAreaFormField } from "@/components/ui/TextAreaFormField";
import { WeightUnit } from "@prisma/client";
import { WeightUnitOptions } from "@/schemas/Units";
import { YesAndNoSelectionValues } from "@/schemas/YesAndNo";
import { api } from "@/utils/api";
import { countries } from "@/globals/location";
import { handleError } from "@/utils/handleError";
import { memo, useCallback, useMemo } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";

export type NewProfileProps = {
  circle?: CircleSchemaType;
};

// eslint-disable-next-line max-lines-per-function
export const NewProfile = memo(function NewProfile({
  circle,
}: NewProfileProps) {
  const form = useForm<CreateProfileSchemaType>({
    resolver: zodResolver(CreateProfileSchema),
    defaultValues: {
      weightUnit: WeightUnit.LBS,
    },
  });

  const search = api.profiles.isUsernameUnique.useMutation();
  const create = api.profiles.create.useMutation();

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
    if (!selectedCountry) return [];
    const country = countries.find(
      (country) => country.country === selectedCountry
    );
    if (!country) return [];
    return country.states.map((state) => ({
      value: state,
      label: state,
    }));
  }, [selectedCountry]);

  // Callbacks
  // Todo type the function parameter
  const onInvalidData = useCallback(handleError, []);

  const onValidData = useCallback(
    (data: CreateProfileSchemaType) => {
      // TODO: Handle the promise correctly here!
      if (circle) data.circles = [circle];
      void create.mutateAsync(data);
    },
    [create, circle]
  );

  const searchUsername = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      search
        .mutateAsync({ username: e.target.value })
        .then((result) => {
          if (result) {
            form.clearErrors("username");
          } else {
            form.control.setError("username", {
              type: "non-unique-username",
              message: "That username is taken!",
            });
          }
        })
        .catch(handleError);
    },
    [search, form]
  );

  return (
    <div className="flex w-full flex-col items-center justify-center py-4">
      <CurrentCircleHeader circle={circle} />
      <Form
        form={form}
        onSubmit={form.handleSubmit(onValidData, onInvalidData)}
        className="w-full sm:w-3/4"
      >
        <FormSection heading="General">
          <InputFormField
            control={form.control}
            name="username"
            label="What is your reddit username?"
            placeholder="username"
            onChange={searchUsername}
            required={true}
          />
          <DropdownFormField<CreateProfileSchemaType>
            name="sex"
            control={form.control}
            label="What is your sex?"
            options={GenderSelectionValues}
            required={true}
          />
          <DatepickerFormField
            control={form.control}
            name="birthDate"
            label="What is your birth date?"
            description="This is only used to calculate your age."
            required={true}
          />
          <DropdownFormField<CreateProfileSchemaType>
            name="weightUnit"
            control={form.control}
            label="Which unit do you use?"
            options={WeightUnitOptions}
          />
          <LabeledInputFormField
            control={form.control}
            name="weight"
            label="What is your current weight?"
            placeholder="Input..."
            inlineLabel={selectedWeightUnit}
            labelPosition="right"
            type="number"
          />
          <DropdownFormField<CreateProfileSchemaType>
            name="height"
            control={form.control}
            label="What is your height?"
            options={HeightStringSelectOptions}
            type="number"
          />
          <DropdownFormField<CreateProfileSchemaType>
            name="ethnicity"
            control={form.control}
            label="What is your ethnicity?"
            options={EthnicitySelectionValues}
            filterOn={circle?.ethnicityRestriction}
          />
        </FormSection>
        <FormSection heading="Location">
          <ComboBoxFormField<CreateProfileSchemaType, string>
            name="location.country"
            control={form.control}
            label="What is your country of residence?"
            options={countryValues}
            filterOn={circle?.countryRestriction}
            required={true}
          />
          <ComboBoxFormField<CreateProfileSchemaType, string>
            name="location.state"
            control={form.control}
            label="What is your state/province of residence?"
            options={stateValues}
            required={true}
          />
          <ComboBoxFormField<CreateProfileSchemaType, string>
            name="willingToRelocate"
            control={form.control}
            label="Are you willing to relocate?"
            options={YesAndNoSelectionValues}
            required={true}
          />
        </FormSection>
        <FormSection heading="Family">
          <DropdownFormField<CreateProfileSchemaType>
            name="children"
            control={form.control}
            label="Do you have/want kids?"
            options={ChildrenSelectionValues}
            filterOn={circle?.childrenRestriction}
            required={true}
          />
          <DropdownFormField<CreateProfileSchemaType>
            name="maritalStatus"
            control={form.control}
            label="Have you ever been married?"
            options={MaritalStatusesSelectionValues}
            filterOn={circle?.maritalStatusRestriction}
            required={true}
          />
          <DropdownFormField<CreateProfileSchemaType>
            name="income"
            control={form.control}
            label="What type of houshold are you looking for?"
            options={IncomeSelectionValues}
            filterOn={circle?.incomeRestriction}
            required={true}
          />
        </FormSection>
        <FormSection heading="Lifestyle">
          <DropdownFormField<CreateProfileSchemaType>
            name="consumables"
            control={form.control}
            label="Do you consume any of the following?"
            options={ConsumablesSelectionValues}
            filterOn={circle?.consumablesRestriction}
            required={true}
          />
          <DropdownFormField<CreateProfileSchemaType>
            name="drinking"
            control={form.control}
            label="How often do you drink?"
            options={DrinkingSelectionValues}
            filterOn={circle?.drinkingRestriction}
            required={true}
          />
          <DropdownFormField<CreateProfileSchemaType>
            name="activity"
            control={form.control}
            label="How often do you excercise?"
            options={ActivitySelectionValues}
            filterOn={circle?.activityRestriction}
            required={true}
          />
          <DropdownFormField<CreateProfileSchemaType>
            name="purity"
            control={form.control}
            label="What is your stance on purity?"
            options={PuritySelectionValues}
            filterOn={circle?.purityRestriction}
            required={true}
          />
        </FormSection>
        <FormSection heading="About You">
          <DropdownFormField<CreateProfileSchemaType>
            control={form.control}
            name="religion"
            label="What is your religion?"
            options={ReligionSelectionValues}
            filterOn={circle?.religionRestriction}
            required={true}
          />
          <DropdownFormField<CreateProfileSchemaType>
            name="politicalBeliefs"
            control={form.control}
            label="What is your political stance?"
            options={PoliticalBeliefsSelectionValues}
            filterOn={circle?.politicalBeliefsRestriction}
            required={true}
          />
          <DropdownFormField<CreateProfileSchemaType>
            name="levelOfEducation"
            control={form.control}
            label="What is the highest level of education to have obtained?"
            options={LevelOfEducationSelectionValues}
            filterOn={circle?.levelOfEducationRestriction}
            required={true}
          />
          <TextAreaFormField
            control={form.control}
            name="bio"
            label="Bio"
            placeholder="Describe yourself! Passions, faith, career, hobbies, et cetera."
            required={true}
          />
        </FormSection>
        <Button className="mt-2 w-20 px-12" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
});
