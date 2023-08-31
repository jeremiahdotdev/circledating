import { IconButton, IconButtonVariant } from "../../schemas/IconButton";
import { InteractionSchemaType } from "@/schemas/Interaction";
import { ProfileAttribute } from "./ProfileAttribute";
import { ProfileCardSubheading } from "@/components/ui/ProfileCardSubheading";
import { ProfileLocation } from "./ProfileCardLocation";
import { ProfilePicture } from "./ProfilePicture";
import { ProfileSchemaType } from "@/schemas/Profile";
import { cn } from "@/lib/utils";
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
import React, { useCallback, useMemo } from "react";
import dayjs from "dayjs";
import state from "@/utils/user.store";

export type ProfileCardProps = {
  profile: ProfileSchemaType;
  interact: (
    interaction: InteractionSchemaType,
    profile: ProfileSchemaType
  ) => void;
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
  const age = useMemo(() => {
    return dayjs().diff(profile.birthDate, "year");
  }, [profile.birthDate]);
  const isProfilePerfectMatch = useMemo(() => {
    return IsProfilePerfectMatch(profile);
  }, [profile]);
  const isLiked = useMemo(() => {
    return state.currentUser.affections?.find(
      (i) => i.initiatedUserId === profile.userId && i.isLiked
    );
  }, [profile]);
  const interaction = useCallback(
    (isLiked: boolean, isBlocked: boolean) => {
      return {
        initiatedUserId: state.currentUser.userId,
        affectedUserId: profile.userId,
        isLiked: isLiked,
        isBlocked: isBlocked,
      } as InteractionSchemaType;
    },
    [profile.userId]
  );
  const likeThisProfile = useCallback(() => {
    interact(interaction(true, false), profile);
  }, [interaction, interact, profile]);
  const blockThisProfile = useCallback(() => {
    interact(interaction(false, true), profile);
  }, [interaction, interact, profile]);
  return (
    <div>
      <em className="bg-gradient-to-r from-cyan-400 to-fuchsia-300 bg-clip-text font-extrabold text-transparent">
        {isProfilePerfectMatch && "Perfect Match"}&nbsp;
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
            <ProfilePicture
              // TODO: Replace with actual picture.
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
          {isLiked ? (
            <Link href={`/messages/${profile.username}`}>
              <IconButton
                variant={IconButtonVariant.MAIL}
                label={"They like you! Start a conversation."}
                onClick={likeThisProfile}
              />
            </Link>
          ) : (
            <IconButton
              variant={IconButtonVariant.LIKE}
              label={"Like!"}
              onClick={likeThisProfile}
            />
          )}
          <IconButton
            variant={IconButtonVariant.TRASH}
            label={"Hide this user"}
            onClick={blockThisProfile}
          />
        </div>
      </div>
    </div>
  );
}
