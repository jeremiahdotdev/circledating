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
import React from "react";

export type ProfileCardProps = {
  profile: ProfileSchemaType;
};

export function ProfileCard({ profile }: ProfileCardProps) {
  // DNR Replace these with actual values
  const age = Math.floor(
    (Date.now() - profile.birthDate.getTime()) / (1000 * 60 * 60 * 24 * 365)
  );
  const height = 6;
  const weight = 600;
  return (
    <div className="flex  h-full w-3/4 max-w-2xl flex-col rounded-md border bg-background ">
      <div className="mx-6 flex h-full max-w-full items-center border-b py-6 text-sm ring-offset-background">
        <div className="flex w-1/4 flex-col gap-2">
          {/* DNR: profile.username needs to be changed to an ID or display name, to prevent doxxing */}
          <ProfilePicture
            fallback={profile.username.substring(0, 1)}
            alt={profile.username + "_profile"}
          />
          <span>
            <h1 className="text-lg">
              {profile.username} ({age})
            </h1>
            <ProfileAttribute
              icon={faLocationDot}
              label={profile.location.country}
              tooltip={"Location"}
            />
          </span>
        </div>
        <div className="flex w-1/4 flex-col gap-2 border-l p-3">
          <ProfileAttribute
            icon={faPray}
            label={`${profile.religion}`}
            tooltip={"Religion"}
          />
          <ProfileAttribute
            icon={faRing}
            label={`${profile.maritalStatus}`}
            tooltip={"Marital Status"}
          />
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
        </div>
        <div className="flex w-1/4 flex-col gap-2 border-l p-3">
          <ProfileAttribute
            icon={faRuler}
            label={`${height} ${profile.height.unit}; ${weight} ${profile.weight.unit}`}
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
        </div>
        <div className="flex w-1/4 flex-col gap-2 border-l p-3">
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
      <div className="mx-6 flex max-w-full items-center p-6 text-sm ring-offset-background">
        {profile.bio}
      </div>
    </div>
  );
}
