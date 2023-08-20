import { ProfileAttribute } from "./ProfileAttribute";
import { ProfileCardButton } from "./ProfileCardButton";
import { ProfileCardSubheading } from "@/components/ui/ProfileCardSubheading";
import { ProfileLocation } from "./ProfileCardLocation";
import { ProfilePicture } from "./ProfilePicture";
import { ProfileSchemaType } from "@/schemas/Profile";
import { cn } from "@/lib/utils";
import { currentUser } from "@/utils/user.store";
import {
  faBaby,
  faDollarSign,
  faDumbbell,
  faGraduationCap,
  faHandHoldingDroplet,
  faLandmark,
  faLocationDot,
  faPray,
  faRing,
  faRuler,
  faSmoking,
  faWeight,
  faWineGlass,
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import React, { useMemo } from "react";
import dayjs from "dayjs";

export type ProfileCardProps = {
  profile: ProfileSchemaType;
};

function IsPerfectMatch(profile: ProfileSchemaType) {
  if (profile.religion !== currentUser.religion) return false;
  if (profile.drinking !== currentUser.drinking) return false;
  if (profile.activity !== currentUserProfile.activity) return false;
  if (profile.children !== currentUserProfile.children) return false;
  if (profile.income !== currentUserProfile.income) return false;
  if (profile.maritalStatus !== currentUserProfile.maritalStatus) return false;
  if (profile.purity !== currentUserProfile.purity) return false;
  if (profile.politicalBeliefs !== currentUserProfile.politicalBeliefs)
    return false;

  return true;
}

export function ProfileCard({ profile }: ProfileCardProps) {
  const age = useMemo(() => {
    return dayjs().diff(profile.birthDate, "year");
  }, [profile.birthDate]);
  const isPerfectMatch = useMemo(() => {
    return IsPerfectMatch(profile);
  }, [profile]);

  return (
    <div className="pt-4">
      <em className="bg-gradient-to-r from-cyan-400 to-fuchsia-300 bg-clip-text font-extrabold text-transparent">
        {isPerfectMatch && "Perfect Match"}&nbsp;
      </em>
      <div
        className={cn(
          "flex h-full max-w-3xl flex-col rounded-md border bg-background p-3 ",
          isPerfectMatch ? "bg-gradient-to-r from-cyan-100 to-fuchsia-100" : ""
        )}
      >
        <div className="mx-6 flex h-full max-w-full flex-wrap items-center justify-center text-sm ring-offset-background sm:justify-between sm:pt-6 ">
          <h1 className="flex w-full justify-center text-lg sm:w-auto">
            {profile.username} ({age})
          </h1>
          <span className="flex flex-row items-center">
            <ProfileAttribute
              icon={faLocationDot}
              label={`${profile.location.state}, ${profile.location.country}`}
              overrideShowLabel={true}
            />
            <ProfileLocation
              willingToRelocate={profile.willingToRelocate === "YES"}
            />
          </span>
        </div>
        <div className="flex h-full max-w-full flex-wrap items-center justify-around border-b p-6 text-sm ring-offset-background">
          <div className="flex w-3/4 items-center justify-center sm:w-1/4 ">
            {/*  DNR: profile.username needs to be changed to an ID or display name, to prevent doxxing */}
            <ProfilePicture
              src="https://images.unsplash.com/photo-1542596768-5d1d21f1cf98"
              fallback={profile.username.substring(0, 1)}
              alt={profile.username + "_profile"}
            />
          </div>
          <div className="flex w-full  min-w-fit flex-col gap-2 p-1 sm:w-1/4 sm:border-l ">
            <ProfileCardSubheading title={"General"} />
            <ProfileAttribute
              icon={faPray}
              attribute={`${profile.religion}`}
              label={"Religion"}
            />
            <ProfileAttribute
              icon={faRing}
              attribute={`${profile.maritalStatus}`}
              label={"Marital Status"}
            />
            <ProfileAttribute
              icon={faLandmark}
              attribute={profile.politicalBeliefs}
              label={"Political Beliefs"}
            />
            <ProfileAttribute
              icon={faGraduationCap}
              attribute={profile.levelOfEducation}
              label={"Level of Education"}
            />
          </div>
          <div className="flex w-full min-w-fit flex-col gap-2 p-1 sm:w-1/4 sm:border-l">
            <ProfileCardSubheading title={"Lifestyle"} />
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
              icon={faWineGlass}
              attribute={profile.drinking}
              label={"Drinking Level"}
            />
            <ProfileAttribute
              icon={faSmoking}
              attribute={profile.consumables}
              label={"Smoking/Recreational drugs"}
            />
          </div>
          <div className="flex w-full min-w-fit flex-col gap-2 p-1  sm:w-1/4 sm:border-l">
            <ProfileAttribute
              icon={faDumbbell}
              attribute={`${profile.activity}`}
              label={"Activity Level"}
            />
            <ProfileCardSubheading title={"Family"} />
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
        <div className="mx-6 flex max-w-full items-center py-6 text-sm ring-offset-background sm:p-6">
          {profile.bio}
        </div>
        <div className="flex max-w-full items-center justify-around py-6 text-sm ring-offset-background sm:p-6">
          <Link href={`/messages/${profile.username}`}>
            <ProfileCardButton
              variant={"green"}
              label={"Start a conversation"}
            />
          </Link>
          <ProfileCardButton variant={"red"} label={"Hide this user"} />
        </div>
      </div>
    </div>
  );
}
