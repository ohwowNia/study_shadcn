import React from "react";
import { useForm, useFieldArray } from "react-hook-form";

type FormValues = {
  items: {
    id: number;
    name: string;
  }[];
};

const ArrayManipulationExample: React.FC = () => {
  const { register, control, handleSubmit, setValue, getValues } =
    useForm<FormValues>({
      //초기데이터
      defaultValues: {
        items: [
          { id: 1, name: "Item 1" },
          { id: 2, name: "Item 2" },
          { id: 3, name: "Item 3" },
        ],
      },
    });

  // 해당 배열의 요소를 뒤바꾸기(swap), 이동하기(move), 추가하기(insert), 업데이트하기(update), 대치하기(replace)
  // useFieldArray 훅을 사용하여 control 객체와 배열의 이름인 items를 연결합니다.
  const { fields, swap, move, insert, update, replace } = useFieldArray({
    control,
    name: "items",
  });

  const onSubmit = (data: FormValues) => {
    console.log("Submitted Data:", data);
  };

  // 조작 함수(handleSwap, handleMove, handleInsert, handleUpdate, handleReplace)를 정의
  const handleSwap = (from: number, to: number) => {
    // 다음요소와 요소를 뒤바꾸기(swap)
    swap(from, to);
  };

  const handleMove = (from: number, to: number) => {
    //이동하기(move)
    move(from, to);
  };

  const handleInsert = (index: number, value: { id: number; name: string }) => {
    //추가하기(insert)
    insert(index, value);
  };

  const handleUpdate = (index: number, value: { id: number; name: string }) => {
    //업데이트하기(update)
    update(index, value);
  };

  const handleReplace = (newItems: { id: number; name: string }[]) => {
    //대치하기(replace)
    replace(newItems);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* 각 요소는 숨겨진 id 필드와 수정 가능한 name 필드를 포함 */}
      {fields.map((field, index) => (
        <div key={field.id}>
          <input {...register(`items.${index}.id` as const)} type="hidden" />
          <input
            {...register(`items.${index}.name` as const)}
            defaultValue={field.name}
          />
          <button
            type="button"
            onClick={() => handleSwap(index, (index + 1) % fields.length)}
            className="bg-slate-400"
          >
            Swap
          </button>
          <button
            type="button"
            onClick={() => handleMove(index, (index + 1) % fields.length)}
            className="bg-orange-400"
          >
            Move
          </button>
          <button
            type="button"
            onClick={() => handleInsert(index, { id: Date.now(), name: "New" })}
            className="bg-lime-400"
          >
            Insert
          </button>
          <button
            type="button"
            onClick={() =>
              handleUpdate(index, { id: field.id, name: "Updated" })
            }
            className="bg-sky-400"
          >
            Update
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={() =>
          handleReplace([
            { id: 4, name: "Item 4" },
            { id: 5, name: "Item 5" },
            { id: 6, name: "Item 6" },
          ])
        }
      >
        Replace
      </button>
      <input type="submit" value="Submit" />
    </form>
  );
};

export default ArrayManipulationExample;
