"use client";

import { useState, useEffect, useCallback } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ApiClientError } from "@/lib/api-client";
import { userService } from "../services/user.service";
import {
  updateProfileSchema,
  type UpdateProfileFormValues,
} from "@/features/auth/validations/auth.schema";
import type { UserProfile } from "@/features/auth/types";

export function useProfile() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isLoadingProfile, setIsLoadingProfile] = useState(true);
  const [serverError, setServerError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const form = useForm<UpdateProfileFormValues>({
    resolver: zodResolver(updateProfileSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
    },
  });

  const isSubmitting = form.formState.isSubmitting;

  const fetchProfile = useCallback(async () => {
    setIsLoadingProfile(true);
    try {
      const res = await userService.getProfile();
      setProfile(res.data);
      form.reset({
        firstName: res.data.firstName,
        lastName: res.data.lastName,
      });
    } catch (err) {
      if (err instanceof ApiClientError) {
        setServerError(err.message);
      } else {
        setServerError("Failed to load profile.");
      }
    } finally {
      setIsLoadingProfile(false);
    }
  }, [form]);

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  const onSubmit = async (values: UpdateProfileFormValues) => {
    setServerError("");
    setSuccessMessage("");

    try {
      const res = await userService.updateProfile(values);
      setProfile(res.data);
      setSuccessMessage("Profile updated successfully!");
      // Clear success message after 3 seconds
      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (err) {
      if (err instanceof ApiClientError) {
        setServerError(err.message);
      } else {
        setServerError("Failed to update profile.");
      }
    }
  };

  return {
    profile,
    isLoadingProfile,
    form,
    isSubmitting,
    serverError,
    successMessage,
    onSubmit,
    refetchProfile: fetchProfile,
  };
}
