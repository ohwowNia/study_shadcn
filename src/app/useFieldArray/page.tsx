"use client";
//장바구니 구현

import * as React from "react";
import { useForm, useFieldArray, useWatch, Control } from "react-hook-form";
import ArrayManipulationExample from "./arrayManipulationExample";

type FormValues = {
  cart: {
    name: string;
    price: number;
    quantity: number;
  }[];
};

const Total = ({ control }: { control: Control<FormValues> }) => {
  const formValues = useWatch({
    // cart 필드 값 감시
    name: "cart",
    control,
  });
  const total = formValues.reduce(
    (acc, current) => acc + (current.price || 0) * (current.quantity || 0),
    0
  );
  console.log("cart 필드의 값", formValues);
  return <p>총 금액: {total}</p>;
};

export default function App() {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      cart: [{ name: "test", quantity: 1, price: 23 }],
    },
    mode: "onBlur",
    // mode를 "onBlur"로 설정하여 필드가 블러될 때 에러를 표시하도록 설정
  });

  // useFieldArray 훅을 사용하여 동적인 배열을 다루는데 필요한 메서드와 상태를 가져옵니다.
  const { fields, append, remove } = useFieldArray({
    name: "cart",
    control,
  });

  // 폼이 제출될 때 호출되는 함수
  const onSubmit = (data: FormValues) => console.log(data);

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* 동적으로 생성된 카트 항목들을 매핑하여 렌더링 */}
        {fields.map((field, index) => {
          return (
            // useFieldArray는 index대신 key로 사용할 수 있는 uniq id를 자동으로 생성
            <div key={field.id}>
              <section className={"section"} key={field.id}>
                {/* 구매할물품의 이름*/}
                <input
                  placeholder="name"
                  // 타입스크립트 사용시, register 할 때 as const 를 사용해야 하며 nested field array인 경우에는 각각의 이름으로 캐스팅해야함.
                  // 해당 값과 해당 값이 포함된 객체의 모든 속성이 상수로 취급
                  {...register(`cart.${0}.name` as const, {
                    required: true,
                  })}
                  className={`${
                    errors?.cart?.[index]?.name ? "error" : ""
                  } border border-slate-400`}
                />
                {/* 수량 */}
                <input
                  placeholder="quantity"
                  type="number"
                  {...register(`cart.${index}.quantity` as const, {
                    valueAsNumber: true,
                    required: true,
                  })}
                  className={`${
                    errors?.cart?.[index]?.name ? "error" : ""
                  } border border-slate-400`}
                />
                {/* 가격 */}
                <input
                  placeholder="value"
                  type="number"
                  {...register(`cart.${index}.price` as const, {
                    valueAsNumber: true,
                    required: true,
                  })}
                  className={`${
                    errors?.cart?.[index]?.name ? "error" : ""
                  } border border-slate-400`}
                />
                <button
                  type="button"
                  onClick={() => remove(index)}
                  className="bg-slate-300 px-2"
                >
                  DELETE
                </button>
              </section>
            </div>
          );
        })}

        {/* 총 금액을 보여주는 Total 컴포넌트 */}
        <Total control={control} />

        {/* 항목 추가 버튼 */}
        <button
          className="bg-orange-300 px-2"
          type="button"
          onClick={() =>
            append({
              name: "",
              quantity: 0,
              price: 0,
            })
          }
        >
          APPEND
        </button>
        <input type="submit" className="border px-2" />
      </form>
      <ArrayManipulationExample />
    </div>
  );
}
// 각 useFieldArray는 고유하며 자체 상태 업데이트가 있습니다. 즉, 동일한 이름을 가진 여러 개의 useFieldArray가 있어서는 안됨. (동일한 이름의 확인란이나 라디오를 빌드해야 하는 경우 useController 또는 Controller와 함께 사용.)
// 필드 배열을 추가, 앞에 추가, 삽입 및 업데이트할 때 obj는 빈 객체일 수 없으며 모든 입력의 defaultValues를 제공해야 함.
