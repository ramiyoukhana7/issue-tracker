"use client";

import { Button, Callout, TextField } from "@radix-ui/themes";
import dynamic from "next/dynamic";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import "easymde/dist/easymde.min.css";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { issueSchema } from "@/app/validationSchemas";
import { z } from "zod";
import ErrorMessage from "@/app/components/ErrorMessage";
import Spinner from "@/app/components/Spinner";
import { Issue } from "@prisma/client";

// Lazyloading SimpleMDE
const SimpleMDE = dynamic(
  () => import("react-simplemde-editor"),
  // Setting SSR to false to tell Next.JS to not render this component on server side
  { ssr: false }
);

type IssueFormData = z.infer<typeof issueSchema>;

const IssueForm = ({ issue }: { issue?: Issue }) => {
  const router = useRouter();

  // Destructuring the object returned by useForm hook, extracting the register and control functions
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IssueFormData>({
    // Validating the form data with Zod schema, defined in IssueSchema
    resolver: zodResolver(issueSchema),
  });

  const [error, setError] = useState("");
  const [isSubmitting, setIsSubbmitting] = useState(false);

  const onSubmit = handleSubmit(async (data) => {
    try {
      setIsSubbmitting(true);
      if (issue) await axios.patch("/api/issues/" + issue.id, data);
      else await axios.post("/api/issues", data);
      router.push("/issues");
      // Refreshing the content in the issues route, so the user can see their new issue right away
      router.refresh();
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
          <TextField.Input
            defaultValue={issue?.title}
            placeholder="Title"
            {...register("title")}
          />
        </TextField.Root>
        <ErrorMessage>{errors.title?.message}</ErrorMessage>

        {/* The Controller component allows data binding and validation between the form and the SimpleMDE component */}
        <Controller
          name="description"
          // Control function provides tools for managing the form state and validation
          control={control}
          defaultValue={issue?.description}
          // The render function renders the SimpleMDE component
          render={({ field }) => (
            // Renders SimpleMDE and spreads field object props onto it.
            <SimpleMDE placeholder="Description" {...field} />
          )}
        />
        <ErrorMessage>{errors.description?.message}</ErrorMessage>

        <Button disabled={isSubmitting}>
          {issue ? "Update Issue" : "Submit new issue"}{" "}
          {isSubmitting && <Spinner />}
        </Button>
      </form>
    </div>
  );
};

export default IssueForm;
