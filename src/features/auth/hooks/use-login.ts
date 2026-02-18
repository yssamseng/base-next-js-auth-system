"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ApiClientError } from "@/lib/api-client";
import { authService } from "../services/auth.service";
import { loginSchema, type LoginFormValues } from "../validations/auth.schema";

export function useLogin() {
  const router = useRouter();
  const [serverError, setServerError] = useState("");

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: LoginFormValues) => {
    setServerError("");

    try {
      await authService.login(values);
      router.push("/");
      router.refresh();
    } catch (err) {
      if (err instanceof ApiClientError) {
        setServerError(err.message);
      } else {
        setServerError("Something went wrong. Please try again.");
      }
    }
  };

  return { form, isLoading, serverError, onSubmit };
}
