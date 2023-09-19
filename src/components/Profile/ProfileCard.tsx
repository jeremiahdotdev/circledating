import { IconButton, IconButtonVariant } from "../Shared/IconButton";
import { InteractionSchemaType } from "@/schemas/Interaction";
import { ProfileActions } from "./ProfileActions";
import { ProfileAttribute, ProfileAttributeVariant } from "./ProfileAttribute";
import { ProfileAttributeOptions } from "./ProfileAttributeOptions";
import { ProfileCardSubheading } from "@/components/ui/ProfileCardSubheading";
import { ProfileLocation } from "./ProfileLocation";
import { ProfilePicture } from "./ProfilePicture";
import { ProfileSchemaType } from "@/schemas/Profile";
import { RouteOptionLink } from "@/utils/RouteOptionLink";
import { Separator } from "../ui/separator";
import { cn } from "@/lib/utils";
import { routes } from "@/globals/routes";
import React, { useMemo } from "react";
import dayjs from "dayjs";
import state from "@/utils/user.store";

export type ProfileCardProps = {
  profile: ProfileSchemaType;
  interact: (
    interaction: InteractionSchemaType,
    profile: ProfileSchemaType
  ) => Promise<void>;
};

function IsProfilePerfectMatch(profile: ProfileSchemaType) {
  if (profile.religion !== state.currentUser.religion) return false;
  if (profile.drinking !== state.currentUser.drinking) return false;
  if (profile.activity !== state.currentUser.activity) return false;
  if (profile.children !== state.currentUser.children) return false;
  if (profile.income !== state.currentUser.income) return false;
  if (profile.maritalStatus !== state.currentUser.maritalStatus) return false;
  if (profile.purity !== state.currentUser.purity) return false;
  if (profile.politicalBeliefs !== state.currentUser.politicalBeliefs)
    return false;

  return true;
}

export function ProfileCard({ profile, interact }: ProfileCardProps) {
  const isProfilePerfectMatch = useMemo(() => {
    return IsProfilePerfectMatch(profile);
  }, [profile]);

  const age = useMemo(() => {
    return dayjs().diff(profile.birthDate, "year");
  }, [profile.birthDate]);

  return (
    <div>
      <em className="bg-gradient-to-r from-cyan-400 to-fuchsia-300 bg-clip-text font-extrabold text-transparent">
        {isProfilePerfectMatch && "Perfect Match"} &nbsp;
      </em>
      <div
        className={cn(
          "flex h-full max-w-3xl flex-col rounded-md shadow-outter-soft bg-background p-3 ",
          isProfilePerfectMatch
            ? "bg-gradient-to-r from-cyan-100 to-fuchsia-100"
            : ""
        )}
      >
        <div className="mx-6 flex h-full max-w-full flex-wrap items-center justify-center text-sm ring-offset-background sm:justify-between sm:pt-6 ">
          <RouteOptionLink option={routes.profileByUsername(profile.username)}>
            <h1 className="flex w-full justify-center text-lg sm:w-auto">
              {profile.username} ({age})
            </h1>
          </RouteOptionLink>
          <ProfileLocation
            country={profile.location.country}
            state={profile.location.state}
            willingToRelocate={profile.willingToRelocate === "YES"}
          />
        </div>
        <div className="flex h-full flex-wrap items-center justify-around border-b py-6 text-sm ring-offset-background sm:px-4">
          <div className="flex w-3/4 items-center justify-center pl-4 sm:w-1/4 ">
            <ProfilePicture
              // TODO: Replace with actual picture.
              src="https://res.cloudinary.com/dqpbm3xll/image/upload/v1694616299/samples/smile.jpg"
              fallback={profile.username.substring(0, 1)}
              alt={profile.username + "_profile"}
            />
          </div>
          <div className="grid h-full w-full px-6 sm:w-3/4 sm:grid-cols-32 ">
            <div className="flex flex-col gap-3 sm:col-span-10 sm:my-3">
              <ProfileCardSubheading title={"General"} />
              <ProfileAttribute
                option={ProfileAttributeOptions.religion}
                variant={ProfileAttributeVariant.PROFILE_CARD}
                attribute={`${profile.religion}`}
              />
              <ProfileAttribute
                option={ProfileAttributeOptions.maritalStatus}
                variant={ProfileAttributeVariant.PROFILE_CARD}
                attribute={`${profile.maritalStatus}`}
              />
              <ProfileAttribute
                option={ProfileAttributeOptions.politicalBeliefs}
                variant={ProfileAttributeVariant.PROFILE_CARD}
                attribute={profile.politicalBeliefs}
              />
              <ProfileAttribute
                option={ProfileAttributeOptions.education}
                variant={ProfileAttributeVariant.PROFILE_CARD}
                attribute={profile.levelOfEducation}
              />
            </div>
            <Separator
              orientation="vertical"
              className="mx-auto hidden sm:block"
            />
            <div className="flex flex-col gap-3 sm:col-span-10 sm:my-3">
              <ProfileCardSubheading title={"Lifestyle"} />
              <ProfileAttribute
                option={ProfileAttributeOptions.height}
                variant={ProfileAttributeVariant.PROFILE_CARD}
                attribute={profile.height}
              />
              <ProfileAttribute
                option={ProfileAttributeOptions.weight}
                variant={ProfileAttributeVariant.PROFILE_CARD}
                attribute={profile.weight}
                weightUnit={profile.weightUnit}
              />
              <ProfileAttribute
                option={ProfileAttributeOptions.drinking}
                variant={ProfileAttributeVariant.PROFILE_CARD}
                attribute={profile.drinking}
              />
              <ProfileAttribute
                option={ProfileAttributeOptions.consumables}
                variant={ProfileAttributeVariant.PROFILE_CARD}
                attribute={profile.consumables}
              />
            </div>
            <Separator
              orientation="vertical"
              className="mx-auto hidden sm:block"
            />
            <div className="flex flex-col gap-3 sm:col-span-10 sm:my-3">
              <ProfileAttribute
                option={ProfileAttributeOptions.activityLevel}
                variant={ProfileAttributeVariant.PROFILE_CARD}
                attribute={`${profile.activity}`}
              />
              <ProfileCardSubheading title={"Family"} />
              <ProfileAttribute
                option={ProfileAttributeOptions.purity}
                variant={ProfileAttributeVariant.PROFILE_CARD}
                attribute={profile.purity}
              />
              <ProfileAttribute
                option={ProfileAttributeOptions.children}
                variant={ProfileAttributeVariant.PROFILE_CARD}
                attribute={profile.children}
              />
              <ProfileAttribute
                option={ProfileAttributeOptions.income}
                variant={ProfileAttributeVariant.PROFILE_CARD}
                attribute={profile.income}
              />
            </div>
          </div>
        </div>
        <div className="mx-6 flex max-w-full items-center py-6 text-sm ring-offset-background sm:p-6">
          {profile.bio}
        </div>
        {interact && <ProfileActions profile={profile} interact={interact} />}
      </div>
    </div>
  );
}
