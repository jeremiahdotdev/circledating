import { DialogModal } from "../ui/DialogModal";
import { IconButton, IconButtonVariant } from "../Shared/IconButton";
import { InteractionSchemaType } from "@/schemas/Interaction";
import { ProfileSchemaType } from "@/schemas/Profile";
import { ReportProfileForm } from "./ReportProfileForm";
import React, { useCallback, useState } from "react";

export type ProfileActionsProps = {
  profile: ProfileSchemaType;
  interact: (
    interaction: InteractionSchemaType,
    profile: ProfileSchemaType
  ) => Promise<void>;
};

export function ProfileActions({ profile, interact }: ProfileActionsProps) {
  const interaction = useCallback(
    (isLiked: boolean, isBlocked: boolean) => {
      return {
        affectedUserId: profile.userId,
        isLiked: isLiked,
        isBlocked: isBlocked,
      } as InteractionSchemaType;
    },
    [profile.userId]
  );

  const [openState, setOpenState] = useState(false);
  const handleOpen = useCallback(() => setOpenState(true), []);

  const likeThisProfile = useCallback(() => {
    return interact(interaction(true, false), profile);
  }, [interaction, interact, profile]);
  const blockThisProfile = useCallback(() => {
    return interact(interaction(false, true), profile);
  }, [interaction, interact, profile]);
  const reportThisProfile = useCallback(() => {
    handleOpen();
  }, [handleOpen]);

  return (
    <>
      <div className="flex max-w-full items-center justify-around py-6 text-sm ring-offset-background sm:p-6">
        <IconButton
          variant={
            profile.likesYou ? IconButtonVariant.MAIL : IconButtonVariant.LIKE
          }
          action={likeThisProfile}
          className={"h-16 w-16"}
        />
        <IconButton
          variant={IconButtonVariant.TRASH}
          action={blockThisProfile}
          className={"h-16 w-16"}
        />
      </div>
      <IconButton
        variant={IconButtonVariant.REPORT}
        action={reportThisProfile}
      />
      <DialogModal setOpen={setOpenState} open={openState}>
        <ReportProfileForm profile={profile} onSubmit={blockThisProfile} />
      </DialogModal>
    </>
  );
}
