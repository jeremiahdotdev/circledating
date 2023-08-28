import { Button } from "../ui/button";
import { CheckboxList } from "../ui/CheckboxList";
import { GenderSelectionValues } from "@/schemas/Gender";
import { Preference } from "./preference";
import { PreferencesSection } from "./preferencesSection";
import { RadioButtonGroup } from "../ui/RadioButtonGroup";
import { Slider } from "@/components/ui/slider";
import React from "react";
import state from "@/utils/user.store";

export function CurrentUserPreferences() {
  return (
    <div className="flex h-full max-h-navless w-full flex-col">
      <form className="flex h-full flex-col ">
        <PreferencesSection name="Active Circles">
          <CheckboxList
            options={state.currentUser.circles.map((circle) => ({
              value: circle.name,
              label: circle.label,
              checked:
                state.currentUserPreferences.selectedCircles.includes(circle),
            }))}
          />
        </PreferencesSection>
        <PreferencesSection name="Filters">
          <Preference name="Sex">
            <RadioButtonGroup
              options={[
                ...GenderSelectionValues,
                { value: "", label: "Either" },
              ]}
              disabled={true}
              selectedValue={state.currentUserPreferences.sex}
            />
          </Preference>
          <Preference name="Age">
            <Slider
              defaultValue={[
                state.currentUserPreferences.minAge ?? 18,
                state.currentUserPreferences.maxAge ?? 99,
              ]}
              step={1}
              className="w-full"
              min={18}
              max={99}
            />
          </Preference>
        </PreferencesSection>
        <Button type="submit">Save</Button>
      </form>
    </div>
  );
}
