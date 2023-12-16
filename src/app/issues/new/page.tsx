"use client";
import axios from "axios";
import { Button, TextArea, TextField } from "@radix-ui/themes";
import SimpleMdeReact from "react-simplemde-editor";
import React from "react";
import { useForm, Controller } from "react-hook-form";
import "easymde/dist/easymde.min.css";
import { useRouter } from "next/navigation";

interface IIssueForm {
  title: string;
  description: string;
}

const NewIssuePage = () => {
  const router = useRouter();
  const { register, control, handleSubmit } = useForm<IIssueForm>();
  return (
    <form
      className="max-w-xl space-y-3"
      onSubmit={handleSubmit(async (data) => {
        await axios.post("/api/issues", data)
        router.push('/issues')
      })}
    >
      <TextField.Root>
        <TextField.Input placeholder="Title" {...register("title")} />
      </TextField.Root>
      <Controller
        name="description"
        control={control}
        render={({ field }) => (
          <SimpleMdeReact placeholder="Description" {...field} />
        )}
      />
      <Button>Submit new issue</Button>
    </form>
  );
};

export default NewIssuePage;
