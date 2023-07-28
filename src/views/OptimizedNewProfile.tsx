"use client";

import { memo, useCallback, useMemo } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ProfileSchema, ProfileSchemaType } from "@/schemas/Profile";
import styles from "./OptimizedNewProfile.module.scss";
import { Button } from "@/components/ui/button";
import { Combobox } from "@/components/ui/combobox";
import { countries } from "@/globals/location";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { GenderSelectionValues } from "@/schemas/Gender";
import { FormSectionHeading } from "@/components/ui/formsectionheading";

export type NewProfileProps = {
  communityName: string;
};

export const NewProfile = memo(function NewProfile({
  communityName,
}: NewProfileProps) {
  const form = useForm<ProfileSchemaType>({
    resolver: zodResolver(ProfileSchema),
    defaultValues: {},
  });

  // The forms type says this is always a string, but that is the defined case for the form. If no country is selected, it's undefined.
  const selectedCountry = form.watch("location.country") as string | undefined;

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
  const onInvalidData = useCallback((errors: any) => {
    // Errors are presented in the errors object from the hook. the key is the name of the input and can be used to dynamically display the error message, see below for example
    console.error(errors);
    console.log(form.getValues());
  }, []);

  const onValidData = useCallback((data: ProfileSchemaType) => {
    console.log(data);
    // Handle storing of the data here
  }, []);

  return (
    <div className={styles.newProfile}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onValidData, onInvalidData)}>
          <FormSectionHeading>General</FormSectionHeading>
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem className="mb-2">
                {/* Todo: Automatically filter out u/ */}
                <FormLabel>Reddit Username</FormLabel>
                <FormControl>
                  <Input placeholder="username" {...field} />
                </FormControl>
                <FormDescription>
                  This is the username you use to log into Reddit.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="usersNotToBeMatchedWith"
            render={({ field }) => (
              <FormItem className="mb-2">
                {/* Todo: automatically remove u/ */}
                <FormLabel>Users to not be matched with</FormLabel>
                <FormControl>
                  <Input placeholder="Users..." {...field} />
                </FormControl>
                <FormDescription>
                  List any reddit users you do not want to be matched with. (For
                  example, have you matched with anyone before? Might want to
                  right them down, unless you want to be rematched.) Please
                  format in a comma separated list.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="sex"
            render={({ field }) => (
              <FormItem className="flex flex-col mb-2">
                <FormLabel>State your sex.</FormLabel>
                <FormControl>
                  <Combobox
                    name="Sex"
                    onSelect={field.onChange}
                    options={GenderSelectionValues}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="age"
            render={({ field }) => (
              <FormItem className="mb-2">
                <FormLabel>Age</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="Age" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormSectionHeading>Location</FormSectionHeading>
          <FormField
            control={form.control}
            name="location.country"
            render={({ field }) => (
              <FormItem className="flex flex-col mb-2">
                <FormLabel>Country</FormLabel>
                <FormControl>
                  <Combobox
                    onSelect={field.onChange}
                    name="Country"
                    options={countryValues}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="location.states"
            render={({ field }) => (
              <FormItem className="flex flex-col mb-2">
                <FormLabel>State</FormLabel>
                <FormControl>
                  <Combobox
                    onSelect={field.onChange}
                    name="State"
                    options={stateValues}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button className="mt-2" type="submit">
            Submit
          </Button>
        </form>
      </Form>
    </div>
  );
});
