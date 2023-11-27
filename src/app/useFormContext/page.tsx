"use client";

import React from "react";
import { useForm, FormProvider, useFormContext } from "react-hook-form";
import { NestedInput } from "./testpage";

export default function App() {
  const methods = useForm();
  const onSubmit = (data: any) => console.log(data);

  return (
    // 자식 컴포넌트에서 useFormContext를 통해 부모 폼의 상태와 메서드에 접근할 수 있도록 합니다.
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <NestedInput />
        <input type="submit" />
      </form>
    </FormProvider>
  );
}
// NestedInput 컴포넌트에서 폼 컨텍스트를 사용하여 입력 필드를 부모 폼에 등록하고, 부모 폼에서는 FormProvider를 통해 자식 컴포넌트에서 폼 컨텍스트를 공유하여 중첩된 폼을 만들고 있습니다.
