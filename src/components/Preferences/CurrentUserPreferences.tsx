import { Button } from "../ui/button";
import { ComboboxOption } from "../ui/combobox";
import { ConsumablesSelectionValues } from "@/schemas/Consumables";
import { DrinkingSelectionValues } from "@/schemas/Drinking";
import { Form } from "../ui/form";
import { FormButton } from "../ui/FormButton";
import { IncomeSelectionValues } from "@/schemas/Income";
import { MultiSelectFormField } from "../ui/MultiSelectFormField";
import {
  MutateUserPreferencesSchema,
  MutateUserPreferencesSchemaType,
  ReadUserPreferencesSchemaType,
} from "@/schemas/UserPreferences";
import { PoliticalBeliefsSelectionValues } from "@/schemas/PoliticalBeliefs";
import { Preference } from "./Preference";
import { ReligionSelectionValues } from "@/schemas/Religion";
import { SelectedLocationType } from "@/schemas/SelectedLocationSchema";
import { SliderFormField } from "../ui/SliderFormField";
import { api } from "@/utils/api";
import { countries } from "@/globals/location";
import { handleError } from "@/utils/handleError";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useCallback, useMemo } from "react";

export type CurrentUserPreferencesProps = {
  preferences?: ReadUserPreferencesSchemaType;
};
export function CurrentUserPreferences({
  preferences,
}: CurrentUserPreferencesProps) {
  const { mutateAsync } = api.preferences.save.useMutation();

  const form = useForm<MutateUserPreferencesSchemaType>({
    resolver: zodResolver(MutateUserPreferencesSchema),
    defaultValues: {
      userId: "<RESOLVED-ON-SERVER>",
      sex: preferences?.sex,
    },
  });

  const selectedContinentsState = form.watch("searchContinents");
  const selectedCountriesState = form.watch("searchCountries");

  const continentValues: ComboboxOption<SelectedLocationType>[] =
    useMemo(() => {
      const result: ComboboxOption<SelectedLocationType>[] = [];
      countries.forEach(({ continent }) => {
        if (!result.map((r) => r.value).includes(continent)) {
          result.push({
            value: continent,
            label: continent,
          });
        }
      });
      return result;
    }, []);
  const countryValues: ComboboxOption<SelectedLocationType>[] = useMemo(() => {
    const result: ComboboxOption<SelectedLocationType>[] = [];
    countries.forEach(({ continent, country }) => {
      if (selectedContinentsState?.includes(continent)) {
        result.push({
          value: country,
          label: country,
        });
      }
    });
    return result;
  }, [selectedContinentsState]);
  const stateValues: ComboboxOption<SelectedLocationType>[] = useMemo(() => {
    const result: ComboboxOption<SelectedLocationType>[] = [];
    countries.forEach(({ states, country }) => {
      if (selectedCountriesState?.includes(country)) {
        states.forEach((state) => {
          result.push({
            value: state,
            label: state,
          });
        });
      }
    });
    return result;
  }, [selectedCountriesState]);

  const onInvalidData = useCallback(handleError, []);
  const onValidData = useCallback(
    (data: MutateUserPreferencesSchemaType) => {
      mutateAsync(data).catch(handleError);
    },
    [mutateAsync]
  );

  return (
    <Form
      form={form}
      onSubmit={form.handleSubmit(onValidData, onInvalidData)}
      className="flex h-full max-h-navless w-full flex-col justify-between pt-4 shadow-inner"
    >
      <div className="flex h-full w-full flex-col overflow-y-scroll px-4">
        <Preference name="Age">
          <SliderFormField
            name="ageRange"
            control={form.control}
            defaultValue={preferences?.ageRange ?? [18, 99]}
            step={1}
            min={18}
            max={99}
            className="w-full"
          />
        </Preference>
        <Preference name="Religion">
          <MultiSelectFormField
            name="religion"
            control={form.control}
            options={ReligionSelectionValues}
            selected={preferences?.religion ?? []}
          />
        </Preference>
        <Preference name="Politcal Beliefs">
          <MultiSelectFormField
            name="politicalBeliefs"
            control={form.control}
            options={PoliticalBeliefsSelectionValues}
            selected={preferences?.politicalBeliefs ?? []}
          />
        </Preference>
        <Preference name="Alcohol">
          <MultiSelectFormField
            name="drinking"
            control={form.control}
            options={DrinkingSelectionValues}
            selected={preferences?.drinking ?? []}
          />
        </Preference>
        <Preference name="Tobacco / Drugs">
          <MultiSelectFormField
            name="consumables"
            control={form.control}
            options={ConsumablesSelectionValues}
            selected={preferences?.consumables ?? []}
          />
        </Preference>
        <Preference name="Income">
          <MultiSelectFormField
            name="income"
            control={form.control}
            options={IncomeSelectionValues}
            selected={preferences?.income ?? []}
            placeholder="Select preferred income level..."
          />
        </Preference>
        <Preference name="Location">
          <MultiSelectFormField
            name="searchContinents"
            control={form.control}
            options={continentValues}
            selected={preferences?.searchContinents ?? []}
            placeholder="Select continent..."
          />
          <MultiSelectFormField
            name="searchCountries"
            control={form.control}
            options={countryValues}
            selected={preferences?.searchCountries ?? []}
            placeholder="Select countries..."
          />
          <MultiSelectFormField
            name="searchStates"
            control={form.control}
            options={stateValues}
            selected={preferences?.searchStates ?? []}
            placeholder="Select states/provinces..."
          />
        </Preference>
      </div>
      <FormButton label="Save" className="m-4 mb-0" />
    </Form>
  );
}
