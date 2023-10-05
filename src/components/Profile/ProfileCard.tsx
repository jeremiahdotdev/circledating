import { InteractionSchemaType } from "@/schemas/Interaction";
import { ProfileActions } from "./ProfileActions";
import { ProfileAttribute, ProfileAttributeVariant } from "./ProfileAttribute";
import { ProfileAttributeOptions } from "./ProfileAttributeOptions";
import { ProfileCardSubheading } from "@/components/ui/ProfileCardSubheading";
import { ProfileLocation } from "./ProfileLocation";
import { ProfilePicture } from "./ProfilePicture";
import { ReadProfileSchemaType } from "@/schemas/Profile";
import { Separator } from "../ui/separator";
import { cn } from "@/lib/utils";
import { getSystemMessage } from "@/globals/systemMessages";
import { routes } from "@/globals/routes";
import React from "react";

export type ProfileCardProps = {
  profile: ReadProfileSchemaType;
  interact: (
    interaction: InteractionSchemaType,
    profile: ReadProfileSchemaType
  ) => Promise<void>;
};

export function ProfileCard({ profile, interact }: ProfileCardProps) {
  return (
    <div className="flex w-full flex-col sm:h-[650px] sm:w-[700px]">
      <em className="bg-gradient-to-r from-cyan-400 to-fuchsia-300 bg-clip-text font-extrabold text-transparent">
        {profile.isPerfectMatch && "Perfect Match"} &nbsp;
      </em>
      <div
        className={cn(
          "flex w-full h-full flex-col rounded-md shadow-outter-soft bg-background p-8 ",
          profile.isPerfectMatch
            ? "bg-gradient-to-r from-cyan-100 to-fuchsia-100"
            : ""
        )}
      >
<<<<<<< Updated upstream
        <div className="flex h-full w-full max-w-full flex-wrap items-center justify-center px-6 text-sm ring-offset-background sm:justify-between sm:pt-6 ">
          <RouteOptionLink option={routes.profileByUsername(profile.username)}>
            <h1 className="flex w-full justify-center text-lg sm:w-auto">
              {profile.username} ({profile.age})
            </h1>
          </RouteOptionLink>
=======
        <div className="flex w-full max-w-full flex-wrap items-center justify-center text-sm ring-offset-background sm:justify-between">
          <Anchor
            variant={AnchorVariant.PROFILE}
            message={getSystemMessage(`${profile.username} (${profile.age})`)}
            option={routes.profileByUsername(profile.username)}
          />
>>>>>>> Stashed changes
          <span className="flex justify-end">
            <ProfileLocation
              country={profile.location?.country}
              state={profile.location?.state}
              willingToRelocate={profile.willingToRelocate === "YES"}
            />
          </span>
        </div>
        <div className="flex h-full flex-wrap items-center justify-around border-b py-6 text-sm ring-offset-background">
          <div className="flex w-3/4 items-center justify-center sm:w-1/4 ">
            <ProfilePicture
              src={profile.image}
              fallback={profile.username.substring(0, 1)}
              alt={profile.username + "_profile"}
            />
          </div>
          <div className="grid h-full w-full sm:w-3/4 sm:grid-cols-32 ">
            <div className="flex flex-col items-center sm:col-span-10 sm:my-3">
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
            <div className="flex flex-col sm:col-span-10 sm:my-3">
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
            <div className="flex flex-col sm:col-span-10 sm:my-3">
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
        <div className="relative h-full max-h-[400px] overflow-y-hidden pt-6 text-sm sm:max-h-[200px]">
          {profile.bio}
          <div className="absolute top-0 h-full w-full bg-gradient-to-b from-white/0 from-80% to-white"></div>
        </div>
        {interact && <ProfileActions profile={profile} interact={interact} />}
      </div>
    </div>
  );
}
