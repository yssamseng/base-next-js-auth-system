"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ApiClientError } from "@/lib/api-client";
import { authService } from "../services/auth.service";
import {
  registerSchema,
  type RegisterFormValues,
} from "../validations/auth.schema";

export function useRegister() {
  const router = useRouter();
  const [serverError, setServerError] = useState("");

  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      firstName: "",
      lastName: "",
    },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: RegisterFormValues) => {
    setServerError("");

    try {
      await authService.register(values);
      router.push("/home");
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
