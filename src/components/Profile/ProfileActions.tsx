import { IconButton, IconButtonVariant } from "../Shared/IconButton";
import { InteractionSchemaType } from "@/schemas/Interaction";
import { ProfileSchemaType } from "@/schemas/Profile";
import React, { useCallback, useMemo } from "react";
import state from "@/utils/user.store";

export type ProfileActionsProps = {
  profile: ProfileSchemaType;
  interact: (
    interaction: InteractionSchemaType,
    profile: ProfileSchemaType
  ) => void;
};

export function ProfileActions({ profile, interact }: ProfileActionsProps) {
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
    <div className="flex max-w-full items-center justify-around py-6 text-sm ring-offset-background sm:p-6">
      <IconButton
        variant={isLiked ? IconButtonVariant.MAIL : IconButtonVariant.LIKE}
        onClick={likeThisProfile}
      />
      <IconButton
        variant={IconButtonVariant.TRASH}
        onClick={blockThisProfile}
      />
    </div>
  );
}
