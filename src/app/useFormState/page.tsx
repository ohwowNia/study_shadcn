"use client";

import * as React from "react";
import { useForm, useFormState } from "react-hook-form";

function Child({ control }: { control: any }) {
  const { dirtyFields } = useFormState({
    control,
  });

  return dirtyFields.firstName ? <p>Field is dirty.</p> : null;
}

export default function App() {
  const { register, handleSubmit, control } = useForm({
    defaultValues: {
      firstName: "firstName",
    },
  });
  const onSubmit = (data: any) => console.log(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        {...register("firstName")}
        placeholder="First Name"
        className="border border-slate-400"
      />
      <Child control={control} />

      <input type="submit" />
    </form>
  );
}
