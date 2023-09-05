import { InteractionSchemaType } from "@/schemas/Interaction";
import { ListItemCircle } from "../Circle/ListItemCircle";
import { ProfileActions } from "./ProfileActions";
import { ProfileAttribute, ProfileAttributeVariant } from "./ProfileAttribute";
import { ProfileAttributeOptions } from "./ProfileAttributeOptions";
import { ProfileCardSubheading } from "@/components/ui/ProfileCardSubheading";
import { ProfileLocation } from "./ProfileCardLocation";
import { ProfilePicture } from "./ProfilePicture";
import { ProfileSchemaType } from "@/schemas/Profile";
import { ProfileSection } from "./ProfileSection";
import React, { useMemo } from "react";
import dayjs from "dayjs";

export type ProfileProps = {
  profile: ProfileSchemaType;
  interact?: (
    interaction: InteractionSchemaType,
    profile: ProfileSchemaType
  ) => void;
};

export function Profile({ profile, interact }: ProfileProps) {
  const age = useMemo(() => {
    return dayjs().diff(profile.birthDate, "year");
  }, [profile.birthDate]);

  return (
    <div className="mx-2 flex max-w-screen-xl flex-col items-center justify-center gap-6">
      <div className="w-3/4 flex-1 justify-center sm:w-1/3">
        <ProfilePicture
          // TODO: Replace with actual picture.
          src="https://images.unsplash.com/photo-1542596768-5d1d21f1cf98"
          fallback={profile.username.substring(0, 1)}
          alt={profile.username + "_profile"}
          className="md:m-2"
        />
      </div>
      <h1 className="flex w-full justify-center text-4xl sm:w-auto">
        {profile.username} ({age})
      </h1>
      <ProfileLocation
        country={profile.location.country}
        state={profile.location.state}
        willingToRelocate={profile.willingToRelocate === "YES"}
      />

      <ProfileSection>
        <div className="grid h-full w-full items-center justify-around md:grid-cols-2 lg:grid-cols-3">
          <ProfileCardSubheading title={"General"} />
          <ProfileAttribute
            option={ProfileAttributeOptions.religion}
            variant={ProfileAttributeVariant.LARGE}
            attribute={`${profile.religion}`}
          />
          <ProfileAttribute
            option={ProfileAttributeOptions.maritalStatus}
            variant={ProfileAttributeVariant.LARGE}
            attribute={`${profile.maritalStatus}`}
          />
          <ProfileAttribute
            option={ProfileAttributeOptions.politicalBeliefs}
            variant={ProfileAttributeVariant.LARGE}
            attribute={profile.politicalBeliefs}
          />
          <ProfileAttribute
            option={ProfileAttributeOptions.education}
            variant={ProfileAttributeVariant.LARGE}
            attribute={profile.levelOfEducation}
          />

          <ProfileCardSubheading title={"Lifestyle"} />
          <ProfileAttribute
            option={ProfileAttributeOptions.height}
            variant={ProfileAttributeVariant.LARGE}
            attribute={profile.height}
          />
          <ProfileAttribute
            option={ProfileAttributeOptions.weight}
            variant={ProfileAttributeVariant.LARGE}
            attribute={profile.weight}
            weightUnit={profile.weightUnit}
          />
          <ProfileAttribute
            option={ProfileAttributeOptions.drinking}
            variant={ProfileAttributeVariant.LARGE}
            attribute={profile.drinking}
          />
          <ProfileAttribute
            option={ProfileAttributeOptions.consumables}
            variant={ProfileAttributeVariant.LARGE}
            attribute={profile.consumables}
          />
          <ProfileAttribute
            option={ProfileAttributeOptions.activityLevel}
            variant={ProfileAttributeVariant.LARGE}
            attribute={`${profile.activity}`}
          />
          <ProfileCardSubheading title={"Family"} />
          <ProfileAttribute
            option={ProfileAttributeOptions.purity}
            variant={ProfileAttributeVariant.LARGE}
            attribute={profile.purity}
          />
          <ProfileAttribute
            option={ProfileAttributeOptions.children}
            variant={ProfileAttributeVariant.LARGE}
            attribute={profile.children}
          />
          <ProfileAttribute
            option={ProfileAttributeOptions.income}
            variant={ProfileAttributeVariant.LARGE}
            attribute={profile.income}
          />
        </div>
      </ProfileSection>
      <ProfileSection>
        <p>{profile.bio}</p>
      </ProfileSection>
      <ProfileSection>
        <div className="grid w-full sm:grid-cols-2">
          {profile.circles?.map((circle) => (
            <ListItemCircle key={circle.name} circle={circle} />
          ))}
        </div>
      </ProfileSection>
      {interact && (
        <ProfileSection>
          <ProfileActions profile={profile} interact={interact} />
        </ProfileSection>
      )}
    </div>
  );
}
