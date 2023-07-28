"use client";
import React, { useState } from "react";
import styles from "./NewProfile.module.scss";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { DatePicker } from "@/components/ui/datepicker";
import { Combobox } from "@/components/ui/combobox";
import { LabeledInput } from "@/components/ui/labeled-input";
import { Dropdown } from "@/components/ui/dropdown";
import { Textarea } from "@/components/ui/textarea";
import { countries } from "@/globals/location";

// Types which are single use, are declared locally.
// Types which are used in multiple places, are declared in their own file.
type Community = {
  name: string;
};
type Country = {
  country: string;
  states: string[];
};
type ComboBoxOption = {
  value: any;
  label: string;
};
const defaultComboBoxOption: ComboBoxOption = { value: "", label: "" };

type Profile = {
  username: string;
  sex: number;
  height: { feet: number; inches: number };
  weight: number;
  location: { country: string; state: string };
  willRelocate: number;
  wantsKids: number;
  hasKids: number;
  exercise: string;
  drinking: string;
  substances: string;
  politic: string;
  education: string;
  bio: string;
  hasMoney: number;
  isTrad: number;
  isVirgin: number;
};

// When doing it this way, please type the object you create like the following
const defaultProfile = {
  username: "",
  sex: 0,
  height: { feet: 0, inches: 0 },
  weight: 0,
  location: { country: "", state: "" },
  willRelocate: 1,
  wantsKids: 1,
  hasKids: 1,
  exercise: "",
  drinking: "",
  substances: "",
  politic: "",
  education: "",
  bio: "",
  hasMoney: -1,
  isTrad: -1,
  isVirgin: -1,
} as Profile;

// Props should have their own type which is named accordingly
function NewProfile(props: Community) {
  // This is really bad practise. Every time the profile object is changed, the whole component will re-render, because the subcomponents depend on it. using react-hook-form will mitigate this.
  const [profile, setProfile] = useState(defaultProfile);
  // See above
  const [states, setStates] = useState([defaultComboBoxOption]);

  // These properties are "calculated" on every render of the component. This is also a bad practise. Prefer Enums or so.
  const YES_AND_NO = [
    { value: 1, label: "Yes" },
    { value: 0, label: "No" },
  ];
  const STATUSES = [
    { value: 0, label: "Single; Never Married" },
    { value: 1, label: "Divorced" },
    { value: 0, label: "Widowed" },
  ];
  const YES_AND_NO_OPTIONAL = [
    { value: -1, label: "Rather not say" },
    ...YES_AND_NO,
  ];
  const MALE_AND_FEMALE = [
    { value: 1, label: "Male" },
    { value: 0, label: "Female" },
  ];
  const AGES = [];
  // This should just be a number input field with form validation
  for (let i = 18; i <= 99; i++) {
    AGES.push({ value: i, label: i });
  }
  // This should just be a field which converts feet and inches to cm and vice versa.
  const HEIGHT = [];
  for (let feet = 4; feet <= 7; feet++) {
    for (let inches = 0; inches <= 11; inches++) {
      HEIGHT.push({ value: feet * 12 + inches, label: `${feet}'${inches}"` });
    }
  }
  // using the countries.ts file solves this.
  const COUNTRIES: any = [];
  countries.forEach((element: Country, index: number) => {
    COUNTRIES.push({ value: element.country, label: element.country });
  });
  // Using a string enum fixes this. Should also be declared outside of the component.
  const EXCERCISE_FREQUENCY = [
    { value: "Absentee", label: "Absentee (Never)" },
    { value: "Infrequent", label: "Infrequent (0-1 days per week)" },
    { value: "Mild", label: "Mildly (2-3 days per week)" },
    { value: "Frequent", label: "Rarely (3-4 days per week)" },
    { value: "Heavy", label: "Heavy (5+ days per week)" },
  ];
  const DRINKING_FREQUENCY = [
    { value: "Never", label: "Never" },
    { value: "Infrequently", label: "Infrequently (A few times per year)" },
    { value: "Occasionally", label: "Occasionally (A few times per month)" },
    {
      value: "Socially",
      label: "Socially (Events and special occasions, a few times per month)",
    },
    { value: "Frequent", label: "Frequent (Weekly to daily drinking)" },
  ];
  const SMOKING_TYPES = [
    { value: "Never", label: "Never" },
    { value: "Cigars", label: "Cigars" },
    { value: "Vape", label: "Vape" },
    { value: "Cigarettes", label: "Cigarettes" },
    { value: "Edibles", label: "Edibles" },
    { value: "Other", label: "Other/Various" },
  ];
  const POLITICAL_STANCES = [
    { value: "Conservative", label: "Conservative" },
    { value: "Conservative-leaning", label: "Conservative-leaning Moderate" },
    { value: "Moderate", label: "Moderate" },
    { value: "Liberal-leaning", label: "Liberal-leaning Moderate" },
    { value: "Liberal", label: "Liberal" },
    { value: "Independent", label: "Independent" },
    { value: "Apolitical", label: "Apolitical" },
    { value: "Other", label: "Other" },
  ];
  const EDUCATION_LEVELS = [
    { value: "Doctorate", label: "Doctorate" },
    { value: "Masters", label: "Masters" },
    { value: "Bacholers", label: "Bacholers" },
    { value: "Masters", label: "Masters" },
    { value: "Associates", label: "Associates" },
    { value: "Diploma", label: "High School Diploma" },
    { value: "None", label: "None" },
  ];

  // This should use useCallback if the component is to be memoized (which is the case), also the value can be typed safely so it should be done
  const onCountrySelect = (value: any) => {
    let states: any = countries.find((country: Country) => {
      return country.country === value;
    })?.states;
    let result: [ComboBoxOption] = [{ value: "N/A", label: "Rather not say." }];
    states.forEach((element: string, index: number) => {
      result.push({ value: `${index}`, label: element });
    });
    setStates(result);
  };

  return (
    <div className={styles.newProfile}>
      <h1 className={[styles.heading1].join(" ")}>
        {/* props can be deconstructed, see the optimized version */}
        {props.name} Singles Database
      </h1>
      <span className={[styles.sectionHeader].join(" ")}>
        <h2>General</h2>
      </span>
      <section className={[styles.section].join(" ")}>
        <Label>What is your reddit username?</Label>
        <LabeledInput placeholder={"username"}>u/</LabeledInput>
        <Label>
          What is your birth date? This is only used to calculate age.
        </Label>
        <DatePicker prompt={"Select your birth date."} />
        <Label>What is your height and weight?</Label>
        <Combobox name={"your height"} options={HEIGHT} />
        <LabeledInput type={"number"} placeholder={"lbs."}>
          weight
        </LabeledInput>
      </section>
      <span className={[styles.sectionHeader].join(" ")}>
        <h2>Location</h2>
      </span>
      <section className={[styles.section].join(" ")}>
        <Label>Where are you currently residing?</Label>
        <Combobox
          name={"Country"}
          options={COUNTRIES}
          onSelect={onCountrySelect}
        />
        <Combobox name={"State"} options={states} />
        <Label>Are you willing to relocate?</Label>
        <Dropdown options={YES_AND_NO} />
      </section>
      <span className={[styles.sectionHeader].join(" ")}>
        <h2>Family</h2>
      </span>
      <section className={[styles.section].join(" ")}>
        <Label>Do you want kids?</Label>
        <Dropdown options={YES_AND_NO} />
        <Label>Do you currently have kids?</Label>
        <Dropdown options={YES_AND_NO} />
        <Label>Which of the following applies to you?</Label>
        <Dropdown options={STATUSES} />
      </section>
      <span className={[styles.sectionHeader].join(" ")}>
        <h2>Lifestyle</h2>
      </span>
      <section className={[styles.section].join(" ")}>
        <Label>What is your fitness level?</Label>
        <Dropdown options={EXCERCISE_FREQUENCY} />
        <Label>How often do you drink?</Label>
        <Dropdown options={DRINKING_FREQUENCY} />
        <Label>Which of the following applies to you?</Label>
        <Dropdown options={SMOKING_TYPES} />
      </section>
      <span className={[styles.sectionHeader].join(" ")}>
        <h2>About You</h2>
      </span>
      <section className={[styles.section].join(" ")}>
        <Label>What is the highest level of education you have achieved?</Label>
        <Dropdown options={EDUCATION_LEVELS} />
        <Label>What is your political affiliation?</Label>
        <Dropdown options={POLITICAL_STANCES} />
        <Label>Bio</Label>
        <Textarea
          placeholder={
            "Describe yourself: faith, career, interests, hobbies, goals, et cetera."
          }
        />
      </section>
      <span className={[styles.sectionHeader].join(" ")}>
        <h2>Sensitive Information (Optional)</h2>
      </span>
      <section className={[styles.section].join(" ")}>
        <Label>
          Are you *only* looking for a traditional household? Stay-at-home Mom,
          Father is the primary breadwinner?
        </Label>
        <Dropdown options={YES_AND_NO_OPTIONAL} />
        <Label>Can you support a family on your current income alone?</Label>
        <Dropdown options={YES_AND_NO_OPTIONAL} />
        <Label>Are you a virgin?</Label>
        <Dropdown options={YES_AND_NO_OPTIONAL} />
      </section>
      <div className={styles.submit}>
        <Button>Submit</Button>
      </div>
    </div>
  );
}

async function createProfile(profile: Profile) {
  console.log(profile);
}

export default NewProfile;
