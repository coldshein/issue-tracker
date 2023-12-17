"use client";
import axios from "axios";
import { Button, Callout, Text, TextArea, TextField,} from "@radix-ui/themes";
import SimpleMdeReact from "react-simplemde-editor";
import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import "easymde/dist/easymde.min.css";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { createIssueSchema } from "@/app/validationSchema";
import {z} from 'zod'
import ErrorMessage from "@/app/api/components/ErrorMessage";
import Spinner from "@/app/api/components/Spinner";

type IssueForm = z.infer<typeof createIssueSchema>

interface IIssueForm {
  title: string;
  description: string;
}

const NewIssuePage = () => {
  const router = useRouter();
  const { register, control, handleSubmit, formState: {errors} } = useForm<IIssueForm>({
    resolver: zodResolver(createIssueSchema)
  });
  const [error, setError] = useState("");
  const [isSubmit, setIsSubmit] = useState(false);
  return (
    <div className="max-w-xl space-y-3">
        {error && <Callout.Root color="red"><Callout.Text>{error}</Callout.Text></Callout.Root>}
      <form
        className="space-y-3"
        onSubmit={handleSubmit(async (data) => {
          try {
            setIsSubmit(true)
            await axios.post("/api/issues", data);
            router.push("/issues");
          } catch (error) {
            setIsSubmit(false)
            setError("The error has occurred");
          }
        })}
      >
        <TextField.Root>
          <TextField.Input placeholder="Title" {...register("title")} />
        </TextField.Root>
        <ErrorMessage>{errors.title?.message}</ErrorMessage>
        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <SimpleMdeReact placeholder="Description" {...field} />
          )}
        />
        <ErrorMessage>{errors.description?.message}</ErrorMessage>
        <Button disabled={isSubmit}>Submit new issue {isSubmit && <Spinner />}</Button>
      </form>
    </div>
  );
};

export default NewIssuePage;
