"use client";
import { ProfileSchemaType, ProfileSchema } from "@/schemas/Profile";
import { zodResolver } from "@hookform/resolvers/zod";
import { memo } from "react";
import { useForm } from "react-hook-form";

export const NewProfile = memo(function NewProfile() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProfileSchemaType>({
    resolver: zodResolver(ProfileSchema),
  });

  return (
    <>
      {/* <Input placeholder="Reddit Username" {...register("username")} /> */}
    </>
  );
});
