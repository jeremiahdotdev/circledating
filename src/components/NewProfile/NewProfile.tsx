"use client";
import { ActivitySelectionValues } from "@/schemas/Activity";
import { Button } from "@/components/ui/button";
import { ButtonRowFormField } from "../ui/ButtonRowFormField";
import { ChildrenButtonValues } from "@/schemas/Children";
import { ComboBoxFormField } from "@/components/ui/ComboboxFormField";
import { ConsumablesSelectionValues } from "@/schemas/Consumables";
import { DatepickerFormField } from "@/components/ui/DatePickerFormField";
import { DrinkingSelectionValues } from "@/schemas/Drinking";
import { DropdownFormField } from "@/components/ui/DropdownFormField";
import { EthnicityButtonValues } from "@/schemas/Ethnicity";
import { Form, FormLabel } from "@/components/ui/form";
import { FormSection } from "../ui/FormSection";
import { GenderSelectionButtonOptions } from "@/schemas/Gender";
import { HeightShapeSchemaButtonValues } from "@/schemas/BodyShape";
import { IncomeSelectionValues } from "@/schemas/Income";
import { LevelOfEducationSelectionValues } from "@/schemas/LevelOfEducation";
import { LightSelectionValues, formatTheme } from "@/schemas/Themes";
import {
  LocationSchemaType,
  WillingToRelocateButtonOptions,
} from "@/schemas/SelectedLocationSchema";
import { LocationSelectionValues, countries } from "@/globals/location";
import { MaritalStatusesButtonOptions } from "@/schemas/MaritalStatuses";
import {
  MutateProfileSchema,
  MutateProfileSchemaType,
} from "@/schemas/Profile";
import { PoliticalBeliefsSelectionValues } from "@/schemas/PoliticalBeliefs";
import { PuritySelectionValues } from "@/schemas/Purity";
import { ReadCircleSchemaType } from "@/schemas/Circle";
import { ReligionSelectionValues } from "@/schemas/Religion";
import { TextAreaFormField } from "@/components/ui/TextAreaFormField";
import { WeightShapeSchemaButtonValues } from "@/schemas/BodyShape";
import { WeightUnit } from "@prisma/client";
import { WeightUnitButtonOptions } from "@/schemas/Units";
import { api } from "@/utils/api";
import { handleError } from "@/utils/handleError";
import { memo, useCallback } from "react";
import { routes } from "@/globals/routes";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { useTheme } from "next-themes";
import { zodResolver } from "@hookform/resolvers/zod";
import ButtonRow from "../ui/button-row";
import React from "react";

export type NewProfileProps = {
  circle?: ReadCircleSchemaType;
};

export const NewProfile = memo(function NewProfile({
  circle,
}: NewProfileProps) {
  const { data: session } = useSession();
  const router = useRouter();
  const form = useForm<MutateProfileSchemaType>({
    resolver: zodResolver(MutateProfileSchema),

    defaultValues: {
      username: session?.user?.name ?? "",
      weightUnit: WeightUnit.LBS,
      location: { continent: "Earth" },
    },
  });

  const create = api.profiles.create.useMutation();

  const onInvalidData = useCallback(handleError, []);
  const onValidData = useCallback(
    (data: MutateProfileSchemaType) => {
      if (circle) data.circles = [circle];
      data.location.continent = countries.filter(
        (c) => c.country == data.location.country
      )?.[0].continent;
      create
        .mutateAsync(data)
        .then(() => {
          router.push(routes.dashboard().href).catch(handleError);
        })
        .catch(handleError);
    },
    [create, circle, router]
  );

  const { theme, setTheme } = useTheme();

  const handleSelectGenderTheme = useCallback(
    (value: string | undefined) => {
      setTheme(formatTheme(theme, undefined, value));
    },
    [setTheme, theme]
  );
  const handleSelectDarkTheme = useCallback(
    (value: string | undefined) => {
      setTheme(formatTheme(theme, value, undefined));
    },
    [setTheme, theme]
  );
  const handleUnselect = useCallback(() => {
    setTheme(formatTheme(theme, undefined, undefined));
  }, [setTheme, theme]);

  return (
    <div className="flex w-full flex-col items-center justify-center p-4">
      <Form
        form={form}
        onSubmit={form.handleSubmit(onValidData, onInvalidData)}
        className="w-full sm:w-3/4"
      >
        <FormSection heading="General">
          <FormLabel className="pb-2 text-xl">Day or night?</FormLabel>
          <ButtonRow
            options={LightSelectionValues}
            onSelect={handleSelectDarkTheme}
            onUnselect={handleUnselect}
          />
          <DatepickerFormField
            control={form.control}
            name="birthDate"
            label="What is your birth date?"
            description="This is only used to calculate your age."
            required={true}
          />
          <ButtonRowFormField
            name="sex"
            label="What is your sex?"
            description="Note: CircleDating is only oriented towards heterosexual relationships."
            required={true}
            control={form.control}
            options={GenderSelectionButtonOptions}
            onSelect={handleSelectGenderTheme}
            onUnselect={handleUnselect}
          />
          <ButtonRowFormField
            name="weightUnit"
            label="Which unit do you use?"
            required={true}
            control={form.control}
            options={WeightUnitButtonOptions}
          />
          <ButtonRowFormField
            name="weight"
            label="What is your weight?"
            control={form.control}
            options={WeightShapeSchemaButtonValues}
          />
          <ButtonRowFormField
            name="heightShape"
            control={form.control}
            label="What is your height?"
            options={HeightShapeSchemaButtonValues}
          />
          <ButtonRowFormField
            name="ethnicity"
            control={form.control}
            label="What is your ethnicity?"
            options={EthnicityButtonValues}
          />
        </FormSection>
        <FormSection heading="Location">
          <ComboBoxFormField<MutateProfileSchemaType, LocationSchemaType>
            options={LocationSelectionValues()}
            name="location"
            control={form.control}
            label="Where are you located?"
          />
          <ButtonRowFormField
            name="willingToRelocate"
            label="Are you willing to relocate?"
            control={form.control}
            options={WillingToRelocateButtonOptions}
          />
        </FormSection>
        <FormSection heading="Family">
          <ButtonRowFormField
            name="children"
            control={form.control}
            label="Do you have/want kids?"
            options={ChildrenButtonValues}
            required={true}
          />
          <ButtonRowFormField
            name="maritalStatus"
            control={form.control}
            label="Have you ever been married?"
            options={MaritalStatusesButtonOptions}
            required={true}
          />
          <DropdownFormField<MutateProfileSchemaType>
            name="income"
            control={form.control}
            label="What type of houshold are you looking for?"
            options={IncomeSelectionValues}
            filterOn={circle?.incomeRestriction}
            required={true}
          />
        </FormSection>
        <FormSection heading="Lifestyle">
          <DropdownFormField<MutateProfileSchemaType>
            name="consumables"
            control={form.control}
            label="Do you consume any of the following?"
            options={ConsumablesSelectionValues}
            filterOn={circle?.consumablesRestriction}
            required={true}
          />
          <DropdownFormField<MutateProfileSchemaType>
            name="drinking"
            control={form.control}
            label="How often do you drink?"
            options={DrinkingSelectionValues}
            filterOn={circle?.drinkingRestriction}
            required={true}
          />
          <DropdownFormField<MutateProfileSchemaType>
            name="activity"
            control={form.control}
            label="How often do you excercise?"
            options={ActivitySelectionValues}
            filterOn={circle?.activityRestriction}
            required={true}
          />
          <DropdownFormField<MutateProfileSchemaType>
            name="purity"
            control={form.control}
            label="What is your stance on purity?"
            options={PuritySelectionValues}
            filterOn={circle?.purityRestriction}
          />
        </FormSection>
        <FormSection heading="About You">
          <DropdownFormField<MutateProfileSchemaType>
            control={form.control}
            name="religion"
            label="What is your religion?"
            options={ReligionSelectionValues}
            filterOn={circle?.religionRestriction}
            required={true}
          />
          <DropdownFormField<MutateProfileSchemaType>
            name="politicalBeliefs"
            control={form.control}
            label="What is your political stance?"
            options={PoliticalBeliefsSelectionValues}
            filterOn={circle?.politicalBeliefsRestriction}
            required={true}
          />
          <DropdownFormField<MutateProfileSchemaType>
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
