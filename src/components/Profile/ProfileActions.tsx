import { DialogModal } from "../ui/DialogModal";
import { Form } from "../ui/form";
import { IconButton, IconButtonVariant } from "../Shared/IconButton";
import { InteractionSchemaType } from "@/schemas/Interaction";
import { ProfileSchemaType } from "@/schemas/Profile";
import { ReportProfileForm } from "./ReportProfileForm";
import { TextAreaFormField } from "../ui/TextAreaFormField";
import React, { useCallback, useMemo, useState } from "react";
import state from "@/utils/user.store";

export type ProfileActionsProps = {
  profile: ProfileSchemaType;
  interact: (
    interaction: InteractionSchemaType,
    profile: ProfileSchemaType
  ) => Promise<void>;
};

export function ProfileActions({ profile, interact }: ProfileActionsProps) {
  const isLiked = useMemo(() => {
    const affections = state.currentUser.affections;
    return affections?.find(
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
  }, [interaction, interact, profile]);

  return (
    <>
      <div className="flex max-w-full items-center justify-around py-6 text-sm ring-offset-background sm:p-6">
        <IconButton
          variant={isLiked ? IconButtonVariant.MAIL : IconButtonVariant.LIKE}
          action={likeThisProfile}
        />
        <IconButton
          variant={IconButtonVariant.TRASH}
          action={blockThisProfile}
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
