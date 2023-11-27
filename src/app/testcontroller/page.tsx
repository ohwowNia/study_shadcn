"use client";
import * as React from "react";
import { useForm, useController, UseControllerProps } from "react-hook-form";

type FormValues = {
  FirstName: string;
};

function Input(props: UseControllerProps<FormValues>) {
  const { field, fieldState } = useController(props);

  return (
    <div>
      <input {...field} placeholder={props.name} />
      {/* isTouched : 변화가 일어난 모든 상태. 값이 기존값과 같아져도 달라진 순간이 있다면 true반환 */}
      <p>{fieldState.isTouched && "Touched"}</p>
      {/* 기존값과 같아지면 false반환 */}
      <p>{fieldState.isDirty && "Dirty"}</p>
      {/* rules에따라 규칙에 어긋나면 true 만족하면 false */}
      <p>{fieldState.invalid ? "invalid" : "valid"}</p>
    </div>
  );
}

export default function App() {
  const { handleSubmit, control } = useForm<FormValues>({
    defaultValues: {
      FirstName: "",
    },
    mode: "onChange",
  });
  const onSubmit = (data: FormValues) => console.log(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Input control={control} name="FirstName" rules={{ required: true }} />
      <input type="submit" />
    </form>
  );
}
