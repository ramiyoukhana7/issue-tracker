"use client";

import { Button, Callout, Text, TextField } from "@radix-ui/themes";
import dynamic from "next/dynamic";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import "easymde/dist/easymde.min.css";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { createIssueSchema } from "@/app/validationSchemas";
import { z } from "zod";
import ErrorMessage from "@/app/components/ErrorMessage";
import Spinner from "@/app/components/Spinner";

// Lazyloading SimpleMDE
const SimpleMDE = dynamic(
  () => import("react-simplemde-editor"),
  // Setting SSR to false to tell Next.JS to not render this component on server side
  { ssr: false }
);

type IssueForm = z.infer<typeof createIssueSchema>;

const NewIssuePage = () => {
  const router = useRouter();

  // Destructuring the object returned by useForm hook, extracting the register and control functions
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IssueForm>({
    // Validating the form data with Zod schema, defined in createIssueSchema
    resolver: zodResolver(createIssueSchema),
  });

  const [error, setError] = useState("");
  const [isSubmitting, setIsSubbmitting] = useState(false);

  const onSubmit = handleSubmit(async (data) => {
    try {
      setIsSubbmitting(true);
      await axios.post("/api/issues", data);
      router.push("/issues");
    } catch (error) {
      setIsSubbmitting(false);
      setError("An unexpected error occured.");
    }
  });

  return (
    <div className="max-w-xl">
      {error && (
        <Callout.Root color="red" className="mb-5">
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      )}
      <form className="space-y-3" onSubmit={onSubmit}>
        <TextField.Root>
          {/* creates a text input field and connects it to the form state and validate it with 
        the register function*/}
          <TextField.Input placeholder="Title" {...register("title")} />
        </TextField.Root>
        <ErrorMessage>{errors.title?.message}</ErrorMessage>

        {/* The Controller component allows data binding and validation between the form and the SimpleMDE component */}
        <Controller
          name="description"
          // Control function provides tools for managing the form state and validation
          control={control}
          // The render function renders the SimpleMDE component
          render={({ field }) => (
            // Renders SimpleMDE and spreads field object props onto it.
            <SimpleMDE placeholder="Description" {...field} />
          )}
        />
        <ErrorMessage>{errors.description?.message}</ErrorMessage>

        <Button disabled={isSubmitting}>
          Submit new issue {isSubmitting && <Spinner />}
        </Button>
      </form>
    </div>
  );
};

export default NewIssuePage;
