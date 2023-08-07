import { ProfileAttribute } from "./ProfileAttribute";
import { ProfilePicture } from "./ProfilePicture";
import { ProfileSchemaType } from "@/schemas/Profile";
import {
  faBaby,
  faDollarSign,
  faDumbbell,
  faGraduationCap,
  faHandHoldingDroplet,
  faLandmark,
  faLocationDot,
  faPlane,
  faPray,
  faRing,
  faRuler,
  faSmoking,
  faWineGlass,
} from "@fortawesome/free-solid-svg-icons";
import { heightValueMap } from "@/schemas/Height";
import React, { useMemo } from "react";
import dayjs from "dayjs";

export type ProfileCardProps = {
  profile: ProfileSchemaType;
};

export function ProfileCard({ profile }: ProfileCardProps) {
  const age = useMemo(() => {
    return dayjs().diff(profile.birthDate, "year");
  }, [profile.birthDate]);

  const height = useMemo(() => {
    return heightValueMap[profile.height];
  }, [profile.height]);

  return (
    <div className="m-4 rounded-md border p-6 shadow-sm">
      <div className="mb-4 flex flex-row gap-4">
        <ProfilePicture
          fallback={profile.username.substring(0, 1)}
          alt={profile.username + "_profile"}
        />
        <div className="flex flex-col gap-1">
          <h1 className="text-lg">
            {profile.username} ({age})
          </h1>
          <ProfileAttribute
            icon={faLocationDot}
            label={`${profile.location.state}, ${profile.location.country}`}
            tooltip={"Location"}
          />
          <ProfileAttribute
            icon={faPray}
            attribute={profile.religion}
            tooltip={"Religion"}
          />
          <ProfileAttribute
            icon={faRing}
            label={`${profile.maritalStatus}`}
            tooltip={"Marital Status"}
          />
        </div>
      </div>
      <div className="grid gap-2">
        <ProfileAttribute
          icon={faLandmark}
          label={profile.politicalBeliefs}
          tooltip={"Political Beliefs"}
        />
        <ProfileAttribute
          icon={faPlane}
          label={profile.willingToRelocate}
          tooltip={"Willing to relocate:"}
        />
        <ProfileAttribute
          icon={faRuler}
          label={`${height}; ${
            profile.weight
          } ${profile.weightUnit.toLowerCase()}`}
          tooltip={"Height"}
        />
        <ProfileAttribute
          icon={faDumbbell}
          label={`${profile.activity}`}
          tooltip={"Activity Level"}
        />
        <ProfileAttribute
          icon={faWineGlass}
          label={profile.drinking}
          tooltip={"Drinking Level"}
        />
        <ProfileAttribute
          icon={faSmoking}
          label={profile.consumables}
          tooltip={"Smoking/Recreational drugs"}
        />
        <ProfileAttribute
          icon={faGraduationCap}
          label={profile.levelOfEducation}
          tooltip={"Level of Education"}
        />
        <ProfileAttribute
          icon={faHandHoldingDroplet}
          label={profile.purity}
          tooltip={"Purity"}
        />
        <ProfileAttribute
          icon={faBaby}
          label={profile.children}
          tooltip={"Children"}
        />
        <ProfileAttribute
          icon={faDollarSign}
          label={profile.income}
          tooltip={"Income"}
        />
      </div>
    </div>
  );
}
