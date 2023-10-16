"use client";

import { Button, TextField } from "@radix-ui/themes";
import SimpleMDE from "react-simplemde-editor";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import "easymde/dist/easymde.min.css";
import { useRouter } from "next/navigation";

interface IssueForm {
  title: string;
  description: string;
}

const NewIssuePage = () => {
  const router = useRouter();

  // Destructuring the object returned by useForm hook, extracting the register and control functions
  const { register, control, handleSubmit } = useForm<IssueForm>();

  return (
    <form
      className="max-w-xl space-y-3"
      onSubmit={handleSubmit(async (data) => {
        await axios.post("/api/issues", data);
        router.push("/issues");
      })}
    >
      <TextField.Root>
        {/* creates a text input field and connects it to the form state and validate it with 
        the register function*/}
        <TextField.Input placeholder="Title" {...register("title")} />
      </TextField.Root>

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
      <Button>Submit new issue</Button>
    </form>
  );
};

export default NewIssuePage;
