import { InteractionSchemaType } from "@/schemas/Interaction";
import { ItemList, ItemType, ParseItem } from "../Shared/ItemList";
import { ProfileActions } from "./ProfileActions";
import { ProfileAttribute, ProfileAttributeVariant } from "./ProfileAttribute";
import { ProfileAttributeList } from "../Shared/ProfileAttributeList";
import { ProfileAttributeOptions } from "./ProfileAttributeOptions";
import { ProfileCardSubheading } from "@/components/ui/ProfileCardSubheading";
import { ProfileHeader } from "../Shared/ProfileHeader";
import { ProfileLinks } from "../Shared/ProfileLinks";
import { ProfileLocation } from "./ProfileCardLocation";
import { ProfileSchemaType } from "@/schemas/Profile";
import { ProfileSection } from "./ProfileSection";
import { handleError } from "@/utils/handleError";
import { routes } from "@/globals/routes";
import { useRouter } from "next/router";
import React, { useCallback, useMemo } from "react";
import dayjs from "dayjs";

export type ProfileProps = {
  profile: ProfileSchemaType;
  interact?: (
    interaction: InteractionSchemaType,
    profile: ProfileSchemaType
  ) => Promise<void>;
};

export function Profile({ profile, interact }: ProfileProps) {
  const router = useRouter();
  const age = useMemo(() => {
    return dayjs().diff(profile.birthDate, "year");
  }, [profile.birthDate]);

  const handleRoute = useCallback(
    (circleNameItem: ItemType) => {
      const route = routes.circleByCircleNameAsLabel(circleNameItem.value);

      router.push(route.href, route.as).catch(handleError);
    },
    [router]
  );
  return (
    <div className="mx-auto flex w-full max-w-screen-xl flex-col items-center justify-center gap-6">
      <ProfileHeader
        // TODO: Replace with actual picture.
        image="https://images.unsplash.com/photo-1542596768-5d1d21f1cf98"
        header={`${profile.username} (${age})`}
      />
      <ProfileLocation
        country={profile.location.country}
        state={profile.location.state}
        willingToRelocate={profile.willingToRelocate === "YES"}
      />
      {profile.links && (
        <ProfileAttributeList>
          <ProfileLinks links={profile.links} />
        </ProfileAttributeList>
      )}
      <ProfileSection heading={"About"}>
        <p>{profile.bio}</p>
      </ProfileSection>
      <ProfileSection heading={"Attributes"}>
        <div className="grid h-full w-full items-center justify-around md:grid-cols-2 lg:grid-cols-3">
          <ProfileCardSubheading title={"General"} />
          <ProfileAttribute
            option={ProfileAttributeOptions.religion}
            variant={ProfileAttributeVariant.PROFILE}
            attribute={`${profile.religion}`}
          />
          <ProfileAttribute
            option={ProfileAttributeOptions.maritalStatus}
            variant={ProfileAttributeVariant.PROFILE}
            attribute={`${profile.maritalStatus}`}
          />
          <ProfileAttribute
            option={ProfileAttributeOptions.politicalBeliefs}
            variant={ProfileAttributeVariant.PROFILE}
            attribute={profile.politicalBeliefs}
          />
          <ProfileAttribute
            option={ProfileAttributeOptions.education}
            variant={ProfileAttributeVariant.PROFILE}
            attribute={profile.levelOfEducation}
          />

          <ProfileCardSubheading title={"Lifestyle"} />
          <ProfileAttribute
            option={ProfileAttributeOptions.height}
            variant={ProfileAttributeVariant.PROFILE}
            attribute={profile.height}
          />
          <ProfileAttribute
            option={ProfileAttributeOptions.weight}
            variant={ProfileAttributeVariant.PROFILE}
            attribute={profile.weight}
            weightUnit={profile.weightUnit}
          />
          <ProfileAttribute
            option={ProfileAttributeOptions.drinking}
            variant={ProfileAttributeVariant.PROFILE}
            attribute={profile.drinking}
          />
          <ProfileAttribute
            option={ProfileAttributeOptions.consumables}
            variant={ProfileAttributeVariant.PROFILE}
            attribute={profile.consumables}
          />
          <ProfileAttribute
            option={ProfileAttributeOptions.activityLevel}
            variant={ProfileAttributeVariant.PROFILE}
            attribute={`${profile.activity}`}
          />
          <ProfileCardSubheading title={"Family"} />
          <ProfileAttribute
            option={ProfileAttributeOptions.purity}
            variant={ProfileAttributeVariant.PROFILE}
            attribute={profile.purity}
          />
          <ProfileAttribute
            option={ProfileAttributeOptions.children}
            variant={ProfileAttributeVariant.PROFILE}
            attribute={profile.children}
          />
          <ProfileAttribute
            option={ProfileAttributeOptions.income}
            variant={ProfileAttributeVariant.PROFILE}
            attribute={profile.income}
          />
        </div>
      </ProfileSection>
      <ProfileSection heading={`Circles`}>
        <div className="grid w-full sm:grid-cols-2">
          {profile.circles && (
            <ItemList
              items={profile.circles.map(ParseItem)}
              clickAction={handleRoute}
            />
          )}
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
