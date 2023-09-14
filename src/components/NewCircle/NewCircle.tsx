import { ActivitySelectionValues } from "@/schemas/Activity";
import { Button } from "../ui/button";
import { ChildrenSelectionValues } from "@/schemas/Children";
import { ConsumablesSelectionValues } from "@/schemas/Consumables";
import { CreateCircleSchema, CreateCircleSchemaType } from "@/schemas/Circle";
import { DrinkingSelectionValues } from "@/schemas/Drinking";
import { EthnicitySelectionValues } from "@/schemas/Ethnicity";
import { Form } from "../ui/form";
import { FormButton } from "../ui/FormButton";
import { FormSection } from "../ui/FormSection";
import { IncomeSelectionValues } from "@/schemas/Income";
import { InputFormField } from "../ui/InputFormField";
import { LevelOfEducationSelectionValues } from "@/schemas/LevelOfEducation";
import { MaritalStatusesSelectionValues } from "@/schemas/MaritalStatuses";
import { MultiSelectFormField } from "../ui/MultiSelectFormField";
import { PoliticalBeliefsSelectionValues } from "@/schemas/PoliticalBeliefs";
import { PuritySelectionValues } from "@/schemas/Purity";
import { RadioButtonFormField } from "../ui/RadioButtonFormField";
import { ReligionSelectionValues } from "@/schemas/Religion";
import { TextAreaFormField } from "../ui/TextAreaFormField";
import { api } from "@/utils/api";
import { countries } from "@/globals/location";
import { handleError } from "@/utils/handleError";
import { memo, useCallback, useMemo, useState } from "react";
import { routes } from "@/globals/routes";
import { systemMessages } from "@/globals/systemMessages";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import state from "@/utils/user.store";

// eslint-disable-next-line max-lines-per-function
export const NewCircle = memo(function NewProfile() {
  const router = useRouter();
  const [disabledState, setDisabledState] = useState(false);

  const form = useForm<CreateCircleSchemaType>({
    resolver: zodResolver(CreateCircleSchema),
    defaultValues: {
      isFeatured: false,
      isPrivate: false,
    },
  });

  const search = api.circles.isCircleNameUnique.useMutation();
  const create = api.circles.create.useMutation();

  const countryValues = useMemo(
    () =>
      countries.map((country) => ({
        value: country.country,
        label: country.country,
      })),
    []
  );

  // Callbacks
  // Todo type the function parameter
  const onInvalidData = useCallback(handleError, []);

  const onValidData = useCallback(
    (data: CreateCircleSchemaType) => {
      setDisabledState(true);
      create
        .mutateAsync({ circle: data, user: state.currentUser })
        .then((circle) => {
          router
            .push(routes.circleByCircleNameAsLabel(circle.name).href)
            .catch(handleError);
        })
        .catch((e) => {
          handleError(e);
          setDisabledState(false);
        });
    },
    [create, router]
  );

  const searchCircleName = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      search
        .mutateAsync({ label: e.target.value })
        .then((result) => {
          if (result) {
            form.clearErrors("name");
          } else {
            form.control.setError("name", {
              type: "non-unique-name",
              message: "That circle name is taken!",
            });
          }
        })
        .catch(handleError);
    },
    [search, form]
  );

  return (
    <div className="flex w-full flex-col items-center justify-center py-4">
      <span className="text-4xl">Create a new circle</span>
      <Form
        form={form}
        onSubmit={form.handleSubmit(onValidData, onInvalidData)}
        className="w-full sm:w-3/4"
      >
        <FormSection>
          <InputFormField
            control={form.control}
            name="label"
            label="What do you want to call this circle?"
            placeholder="New circle name"
            onChange={searchCircleName}
            required={true}
          />
          <TextAreaFormField
            control={form.control}
            name="description"
            label="Description"
            placeholder="What is this circle? Describe the underlying community."
            required={true}
          />
          <InputFormField
            control={form.control}
            name="links"
            label="Social Media / Website Link?"
            placeholder="Link"
          />
          <RadioButtonFormField
            control={form.control}
            name="isPrivate"
            type="boolean"
            options={[
              { value: "", label: "Public" },
              { value: "easteregg", label: "Private" },
            ]}
            selectedValue={""}
          />
        </FormSection>
        <FormSection
          heading="Restrictions"
          description={systemMessages.CREATE_CIRCLE_DESCRIPTION}
        >
          <MultiSelectFormField
            control={form.control}
            name="religionRestriction"
            label="Religion"
            placeholder="limit members to..."
            options={ReligionSelectionValues}
          />
          <MultiSelectFormField
            name="politicalBeliefsRestriction"
            control={form.control}
            label="Poltical Stance"
            placeholder="limit members to..."
            options={PoliticalBeliefsSelectionValues}
          />
          <MultiSelectFormField
            name="levelOfEducationRestriction"
            control={form.control}
            label="Education"
            placeholder="limit members to..."
            options={LevelOfEducationSelectionValues}
          />
          <MultiSelectFormField
            name="consumablesRestriction"
            control={form.control}
            label="Tobacco / Drugs"
            options={ConsumablesSelectionValues}
          />
          <MultiSelectFormField
            name="drinkingRestriction"
            control={form.control}
            label="Drinking"
            options={DrinkingSelectionValues}
          />
          <MultiSelectFormField
            name="activityRestriction"
            control={form.control}
            label="Activity Level"
            options={ActivitySelectionValues}
          />
          <MultiSelectFormField
            name="purityRestriction"
            control={form.control}
            label="Purity"
            options={PuritySelectionValues}
          />

          <MultiSelectFormField
            name="childrenRestriction"
            control={form.control}
            label="Children"
            options={ChildrenSelectionValues}
          />
          <MultiSelectFormField
            name="maritalStatusRestriction"
            control={form.control}
            label="Marital Status"
            options={MaritalStatusesSelectionValues}
          />
          <MultiSelectFormField
            name="incomeRestriction"
            control={form.control}
            label="Income"
            options={IncomeSelectionValues}
          />

          <MultiSelectFormField
            name="countryRestriction"
            control={form.control}
            label="Country"
            options={countryValues}
          />
          <MultiSelectFormField
            name="ethnicityRestriction"
            control={form.control}
            label="Ethnicity"
            options={EthnicitySelectionValues}
          />
        </FormSection>
        <FormButton disabled={disabledState} />
      </Form>
    </div>
  );
});
