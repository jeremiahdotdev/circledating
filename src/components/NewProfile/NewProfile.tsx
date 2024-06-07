"use client";
import { ActivityButtonValues } from "@/schemas/Activity";
import { Button } from "@/components/ui/button";
import { ButtonRowFormField } from "../ui/ButtonRowFormField";
import {
  ChildrenHasButtonValues,
  ChildrenWantsButtonValues,
} from "@/schemas/Children";
import { ComboBoxFormField } from "@/components/ui/ComboboxFormField";
import { ConsumablesButtonValues } from "@/schemas/Consumables";
import { DatepickerFormField } from "@/components/ui/DatePickerFormField";
import { DrinkingButtonValues } from "@/schemas/Drinking";
import { EthnicityButtonValues } from "@/schemas/Ethnicity";
import { Form, FormLabel } from "@/components/ui/form";
import { Gender } from "@prisma/client";
import { GenderSelectionButtonOptions } from "@/schemas/Gender";
import {
  HeightShapeSchemaButtonValues,
  WeightShapeSchemaButtonValuesMen,
  WeightShapeSchemaButtonValuesWomen,
} from "@/schemas/BodyShape";
import { IncomeButtonValues } from "@/schemas/Income";
import { LevelOfEducationButtonValues } from "@/schemas/LevelOfEducation";
import {
  LightSelectionValues,
  formatTheme,
  getThemeFromGender,
} from "@/schemas/Themes";
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
import { PaneQueue } from "../ui/PaneQueue";
import { PoliticalBeliefsButtonValues } from "@/schemas/PoliticalBeliefs";
import { PurityButtonValues } from "@/schemas/Purity";
import { ReadCircleSchemaType } from "@/schemas/Circle";
import { ReligionButtonValues } from "@/schemas/Religion";
import { RequiredAsterisk } from "../ui/RequiredAsterisk";
import { TextAreaFormField } from "@/components/ui/TextAreaFormField";
import { api } from "@/utils/api";
import { handleError } from "@/utils/handleError";
import { memo, useCallback, useState } from "react";
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

// eslint-disable-next-line max-lines-per-function
export const NewProfile = memo(function NewProfile({
  circle,
}: NewProfileProps) {
  const { data: session } = useSession();
  const router = useRouter();

  const [isDisabledState, setIsDisabledState] = useState<boolean>(false);
  const form = useForm<MutateProfileSchemaType>({
    resolver: zodResolver(MutateProfileSchema),

    defaultValues: {
      username: session?.user?.name ?? "",
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

      setIsDisabledState(true);
      create
        .mutateAsync(data)
        .then(() => {
          router.push(routes.dashboard().href).catch(handleError);
        })
        .catch((error) => {
          setIsDisabledState(false);
          handleError(error);
        });
    },
    [create, circle, router]
  );

  const { theme, setTheme } = useTheme();

  const handleSelectGenderTheme = useCallback(
    (value: string | undefined) => {
      setTheme(formatTheme(theme, undefined, getThemeFromGender(value)));
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

  const selectedGender = form.watch("sex");
  const currentFormValues = form.watch();

  return (
    <div className="flex w-full flex-col items-center justify-center p-4">
      <Form
        form={form}
        onSubmit={form.handleSubmit(onValidData, onInvalidData)}
        className="w-full"
      >
        <PaneQueue
          panes={[
            {
              paneId: "DayOrNight",
              isRequired: false,
              component: (
                <>
                  <FormLabel className="pb-2 text-xl">Day or night?</FormLabel>
                  <ButtonRow
                    options={LightSelectionValues}
                    onSelect={handleSelectDarkTheme}
                    onUnselect={handleUnselect}
                  />
                </>
              ),
            },
            {
              paneId: "birthDate",
              isRequired: true,
              isDisabled: !currentFormValues.birthDate,
              component: (
                <>
                  <FormLabel className="pb-2 text-xl">
                    What is your birth date?
                  </FormLabel>
                  <DatepickerFormField
                    control={form.control}
                    name="birthDate"
                    description="This is only used to calculate your age."
                    required={true}
                    className="flex flex-col justify-center sm:w-3/4"
                  />
                </>
              ),
            },
            {
              paneId: "sex",
              isRequired: true,
              isDisabled: !currentFormValues.sex,
              component: (
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
              ),
            },
            {
              paneId: "weightShape",
              isRequired: true,
              isDisabled: !currentFormValues.weightShape,
              component: (
                <ButtonRowFormField
                  name="weightShape"
                  label="What is your weight?"
                  control={form.control}
                  options={
                    selectedGender === Gender.MALE
                      ? WeightShapeSchemaButtonValuesMen
                      : WeightShapeSchemaButtonValuesWomen
                  }
                />
              ),
            },
            {
              paneId: "heightShape",
              isRequired: true,
              isDisabled: !currentFormValues.heightShape,
              component: (
                <ButtonRowFormField
                  key="heightShape"
                  name="heightShape"
                  control={form.control}
                  label="What is your height?"
                  options={HeightShapeSchemaButtonValues}
                />
              ),
            },
            {
              paneId: "ethnicity",
              isRequired: true,
              isDisabled: !currentFormValues.ethnicity,
              component: (
                <ButtonRowFormField
                  name="ethnicity"
                  control={form.control}
                  label="What is your ethnicity?"
                  options={EthnicityButtonValues}
                  filterOn={circle?.ethnicityRestriction}
                />
              ),
            },
            {
              paneId: "location",
              isRequired: true,
              isDisabled: !currentFormValues.location,
              component: (
                <>
                  <FormLabel className="pb-2 text-xl">
                    Where are you located?
                    <RequiredAsterisk />
                  </FormLabel>
                  <ComboBoxFormField<
                    MutateProfileSchemaType,
                    LocationSchemaType
                  >
                    options={LocationSelectionValues()}
                    name="location"
                    control={form.control}
                    className="flex flex-col justify-center sm:w-3/4"
                  />
                </>
              ),
            },
            {
              paneId: "willingToRelocate",
              isRequired: true,
              isDisabled: !currentFormValues.willingToRelocate,
              component: (
                <ButtonRowFormField
                  name="willingToRelocate"
                  label="Are you willing to relocate?"
                  control={form.control}
                  options={WillingToRelocateButtonOptions}
                />
              ),
            },
            {
              paneId: "hasChildren",
              isRequired: true,
              isDisabled: !currentFormValues.hasChildren,
              component: (
                <ButtonRowFormField
                  name="hasChildren"
                  control={form.control}
                  label="Do you have kids?"
                  options={ChildrenHasButtonValues}
                  required={true}
                  filterOn={circle?.purityRestriction}
                />
              ),
            },
            {
              paneId: "wantsChildren",
              isRequired: true,
              isDisabled: !currentFormValues.wantsChildren,
              component: (
                <ButtonRowFormField
                  name="wantsChildren"
                  control={form.control}
                  label="Do you want kids?"
                  options={ChildrenWantsButtonValues}
                  required={true}
                />
              ),
            },
            {
              paneId: "maritalStatus",
              isRequired: true,
              isDisabled: !currentFormValues.maritalStatus,
              component: (
                <ButtonRowFormField
                  name="maritalStatus"
                  control={form.control}
                  label="Have you ever been married?"
                  options={MaritalStatusesButtonOptions}
                  required={true}
                  filterOn={circle?.maritalStatusRestriction}
                />
              ),
            },
            {
              paneId: "income",
              isRequired: true,
              isDisabled: !currentFormValues.income,
              component: (
                <ButtonRowFormField
                  name="income"
                  control={form.control}
                  label="What type of houshold are you looking for?"
                  options={IncomeButtonValues}
                  required={true}
                  filterOn={circle?.incomeRestriction}
                />
              ),
            },
            {
              paneId: "consumables",
              isRequired: true,
              isDisabled: !currentFormValues.consumables,
              component: (
                <ButtonRowFormField
                  name="consumables"
                  control={form.control}
                  label="Do you consume any of the following?"
                  options={ConsumablesButtonValues}
                  required={true}
                  filterOn={circle?.consumablesRestriction}
                />
              ),
            },
            {
              paneId: "drinking",
              isRequired: true,
              isDisabled: !currentFormValues.drinking,
              component: (
                <ButtonRowFormField
                  name="drinking"
                  control={form.control}
                  label="How often do you drink?"
                  options={DrinkingButtonValues}
                  required={true}
                  filterOn={circle?.drinkingRestriction}
                />
              ),
            },
            {
              paneId: "activity",
              isRequired: true,
              isDisabled: !currentFormValues.activity,
              component: (
                <ButtonRowFormField
                  name="activity"
                  control={form.control}
                  label="How often do you excercise?"
                  options={ActivityButtonValues}
                  required={true}
                  filterOn={circle?.activityRestriction}
                />
              ),
            },
            {
              paneId: "purity",
              isRequired: true,
              isDisabled: !currentFormValues.purity,
              component: (
                <ButtonRowFormField
                  name="purity"
                  control={form.control}
                  label="What is your stance on purity?"
                  options={PurityButtonValues}
                />
              ),
            },
            {
              paneId: "religion",
              isRequired: true,
              isDisabled: !currentFormValues.religion,
              component: (
                <ButtonRowFormField
                  name="religion"
                  control={form.control}
                  label="What is your religion?"
                  options={ReligionButtonValues}
                  required={true}
                  filterOn={circle?.religionRestriction}
                />
              ),
            },
            {
              paneId: "politicalBeliefs",
              isRequired: true,
              isDisabled: !currentFormValues.politicalBeliefs,
              component: (
                <ButtonRowFormField
                  name="politicalBeliefs"
                  control={form.control}
                  label="What is your political stance?"
                  options={PoliticalBeliefsButtonValues}
                  required={true}
                  filterOn={circle?.politicalBeliefsRestriction}
                />
              ),
            },
            {
              paneId: "levelOfEducation",
              isRequired: true,
              isDisabled: !currentFormValues.levelOfEducation,
              component: (
                <ButtonRowFormField
                  name="levelOfEducation"
                  control={form.control}
                  label="What is the highest level of education to have obtained?"
                  options={LevelOfEducationButtonValues}
                  required={true}
                  filterOn={circle?.levelOfEducationRestriction}
                />
              ),
            },
            {
              paneId: "bio",
              isRequired: true,
              isDisabled: !currentFormValues.bio,
              component: (
                <>
                  <FormLabel className="pb-2 text-xl">
                    Describe yourself!
                  </FormLabel>
                  <TextAreaFormField
                    control={form.control}
                    name="bio"
                    placeholder="Passions, faith, career, hobbies, et cetera."
                    className="flex flex-col items-center justify-center sm:w-3/4"
                  />
                  <Button
                    className="mt-2 w-20 px-12"
                    type="submit"
                    disabled={isDisabledState}
                  >
                    Submit
                  </Button>
                </>
              ),
            },
          ]}
        />
      </Form>
    </div>
  );
});
