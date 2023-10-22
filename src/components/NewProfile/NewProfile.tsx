"use client";

import { ActivitySelectionValues } from "@/schemas/Activity";
import { Button } from "@/components/ui/button";
import { ChildrenSelectionValues } from "@/schemas/Children";
import { ComboBoxFormField } from "@/components/ui/ComboboxFormField";
import { ConsumablesSelectionValues } from "@/schemas/Consumables";
import { CurrentCircleHeader } from "../SignUp/CurrentCircleHeader";
import { DatepickerFormField } from "@/components/ui/DatePickerFormField";
import { DrinkingSelectionValues } from "@/schemas/Drinking";
import { DropdownFormField } from "@/components/ui/DropdownFormField";
import { EthnicitySelectionValues } from "@/schemas/Ethnicity";
import { Form } from "@/components/ui/form";
import { FormSection } from "../ui/FormSection";
import { GenderSelectionValues } from "@/schemas/Gender";
import { HeightStringSelectOptions } from "@/schemas/Height";
import { IncomeSelectionValues } from "@/schemas/Income";
import { LabeledInputFormField } from "@/components/ui/LabeledInputFormField";
import { LevelOfEducationSelectionValues } from "@/schemas/LevelOfEducation";
import { LocationSchemaType } from "@/schemas/SelectedLocationSchema";
import { LocationSelectionValues, countries } from "@/globals/location";
import { MaritalStatusesSelectionValues } from "@/schemas/MaritalStatuses";
import {
  MutateProfileSchema,
  MutateProfileSchemaType,
} from "@/schemas/Profile";
import { PoliticalBeliefsSelectionValues } from "@/schemas/PoliticalBeliefs";
import { PuritySelectionValues } from "@/schemas/Purity";
import { ReadCircleSchemaType } from "@/schemas/Circle";
import { ReligionSelectionValues } from "@/schemas/Religion";
import { TextAreaFormField } from "@/components/ui/TextAreaFormField";
import { WeightUnit } from "@prisma/client";
import { WeightUnitOptions } from "@/schemas/Units";
import { YesAndNoSelectionValues } from "@/schemas/YesAndNo";
import { api } from "@/utils/api";
import { handleError } from "@/utils/handleError";
import { memo, useCallback } from "react";
import { routes } from "@/globals/routes";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { zodResolver } from "@hookform/resolvers/zod";
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
  const selectedWeightUnit = form.watch("weightUnit");

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

  return (
    <div className="flex w-full flex-col items-center justify-center p-4">
      <CurrentCircleHeader circle={circle} />
      <Form
        form={form}
        onSubmit={form.handleSubmit(onValidData, onInvalidData)}
        className="w-full sm:w-3/4"
      >
        <FormSection heading="General">
          <DropdownFormField<MutateProfileSchemaType>
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
          <DropdownFormField<MutateProfileSchemaType>
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
          <DropdownFormField<MutateProfileSchemaType>
            name="height"
            control={form.control}
            label="What is your height?"
            options={HeightStringSelectOptions}
            type="number"
          />
          <DropdownFormField<MutateProfileSchemaType>
            name="ethnicity"
            control={form.control}
            label="What is your ethnicity?"
            options={EthnicitySelectionValues}
            filterOn={circle?.ethnicityRestriction}
          />
        </FormSection>
        <FormSection heading="Location">
          <ComboBoxFormField<MutateProfileSchemaType, LocationSchemaType>
            options={LocationSelectionValues()}
            name="location"
            control={form.control}
            label="Where are you located?"
          />
          <ComboBoxFormField<MutateProfileSchemaType, string>
            name="willingToRelocate"
            control={form.control}
            label="Are you willing to relocate?"
            options={YesAndNoSelectionValues}
            required={true}
          />
        </FormSection>
        <FormSection heading="Family">
          <DropdownFormField<MutateProfileSchemaType>
            name="children"
            control={form.control}
            label="Do you have/want kids?"
            options={ChildrenSelectionValues}
            filterOn={circle?.childrenRestriction}
            required={true}
          />
          <DropdownFormField<MutateProfileSchemaType>
            name="maritalStatus"
            control={form.control}
            label="Have you ever been married?"
            options={MaritalStatusesSelectionValues}
            filterOn={circle?.maritalStatusRestriction}
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
