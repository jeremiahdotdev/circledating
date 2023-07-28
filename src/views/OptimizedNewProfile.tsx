"use client";

import { memo, useMemo } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ProfileSchema, ProfileSchemaType } from "@/schemas/Profile";
import styles from "./OptimizedNewProfile.module.scss";
import { Label } from "@radix-ui/react-label";
import { Button } from "@/components/ui/button";
import { Combobox } from "@/components/ui/combobox";
import { countries } from "@/globals/location";

export type NewProfileProps = {
  communityName: string;
};

export const NewProfile = memo(function NewProfile({
  communityName,
}: NewProfileProps) {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    watch,
  } = useForm<ProfileSchemaType>({
    resolver: zodResolver(ProfileSchema),
    defaultValues: {},
  });

  const countryValues = useMemo(
    () =>
      countries.map((country) => ({
        value: country,
        label: country.country,
      })),
    []
  );

  return (
    <div className={styles.newProfile}>
      <h1 className="text-2xl">{communityName} Singles Database</h1>
      <span className={"w-3/4"}>
        <h2>General</h2>
      </span>
      {/* <section className={[styles.section].join(" ")}>
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
      </section> */}
      <span className={"w-3/4"}>
        <h2>Location</h2>
      </span>
      <section className={[styles.section].join(" ")}>
        <Label>Where are you currently residing?</Label>
        <Combobox options={countryValues} {...register("location.country")} />
        {/* <Combobox options={statesValues} {...register("location.states")} /> */}
        {/* <Label>Are you willing to relocate?</Label> */}
        {/* <Dropdown options={YES_AND_NO} /> */}
      </section>
      {/* <span className={"w-3/4"}>
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
      <span className={"w-3/4"}>
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
      <span className={"w-3/4"}>
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
      <span className={"w-3/4"}>
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
      </section> */}
      <div className={styles.submit}>
        <Button>Submit</Button>
      </div>
    </div>
  );
});
