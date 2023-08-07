import { Button } from "@/components/ui/button";
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
  faWeight,
  faWineGlass,
} from "@fortawesome/free-solid-svg-icons";
import React, { useMemo } from "react";
import dayjs from "dayjs";

export type ProfileCardProps = {
  profile: ProfileSchemaType;
};

export function ProfileCard({ profile }: ProfileCardProps) {
  const age = useMemo(() => {
    return dayjs().diff(profile.birthDate, "year");
  }, [profile.birthDate]);

  return (
    <div className="m-4 rounded-md border p-6 shadow-sm">
      <div className="mb-4 flex flex-col justify-between sm:flex-row">
        <div className="mb-2 flex flex-row gap-4">
          <ProfilePicture
            src="https://images.unsplash.com/photo-1542596768-5d1d21f1cf98"
            fallback={profile.username.substring(0, 1)}
            alt={profile.username + "_profile"}
          />
          <div className="flex-1 flex-col gap-1">
            <h1 className="text-lg">
              {profile.username} ({age})
            </h1>
            <ProfileAttribute
              icon={faLocationDot}
              label={`${profile.location.state}, ${profile.location.country}`}
            />
            <ProfileAttribute
              icon={faPray}
              attribute={profile.religion}
              showLabel={false}
              label={"Religion"}
            />
          </div>
        </div>
        <div className="flex flex-row gap-2">
          <Button>Message</Button>
          <Button variant="outline">Like</Button>
          <Button variant="destructive">Report</Button>
        </div>
      </div>
      <div className="grid gap-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        <ProfileAttribute
          icon={faRing}
          attribute={profile.maritalStatus}
          label="Marital Status"
        />
        <ProfileAttribute
          icon={faLandmark}
          attribute={profile.politicalBeliefs}
          label="Political Beliefs"
        />
        <ProfileAttribute
          icon={faPlane}
          attribute={profile.willingToRelocate}
          label="Willing to relocate"
        />
        <ProfileAttribute
          icon={faRuler}
          attribute={profile.height}
          isHeight
          label="Height"
        />
        <ProfileAttribute
          icon={faWeight}
          attribute={profile.weight}
          weightUnit={profile.weightUnit}
          label="Weight"
        />
        <ProfileAttribute
          icon={faDumbbell}
          attribute={profile.activity}
          label={"Activity Level"}
        />
        <ProfileAttribute
          icon={faWineGlass}
          attribute={profile.drinking}
          label="Drinking"
        />
        <ProfileAttribute
          icon={faSmoking}
          label={"Smoking/Recreational drugs"}
          attribute={profile.consumables}
        />
        <ProfileAttribute
          icon={faGraduationCap}
          attribute={profile.levelOfEducation}
          label={"Level of Education"}
        />
        <ProfileAttribute
          icon={faHandHoldingDroplet}
          attribute={profile.purity}
          label={"Purity"}
        />
        <ProfileAttribute
          icon={faBaby}
          attribute={profile.children}
          label={"Children"}
        />
        <ProfileAttribute
          icon={faDollarSign}
          attribute={profile.income}
          label={"Income"}
        />
      </div>
    </div>
  );
}
