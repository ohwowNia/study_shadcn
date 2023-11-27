import React from "react";
import { useFormContext } from "react-hook-form";

export function NestedInput() {
  // useFormContext 훅을 사용하여 부모 폼 컨텍스트에서 register 메서드를 가져오고
  const { register } = useFormContext();
  //   "test"라는 이름으로 입력 필드를 등록해서 해당 입력 필드 렌더링
  return <input {...register("test")} className="border border-slate-400" />;
}
