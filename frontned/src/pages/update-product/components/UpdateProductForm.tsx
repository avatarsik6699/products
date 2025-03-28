import type { FC } from "react";
import type { SubmitHandler } from "react-hook-form";
import { Controller, useForm } from "react-hook-form";

// Понять как работает react-hook-form в сыром виде
// Понять как работают компоненты form из библиотеки shadcn/ui в связке с react-hook-form

enum GenderEnum {
  female = "female",
  male = "male",
  other = "other",
}

type Inputs = {
  name: string;
  requiredName: string;
  gender: GenderEnum;
  age: number;
};

const UpdateProductFormV2: FC = () => {
  const form = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data) => console.log("data", data);

  console.log(form.formState.errors);

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <Controller
        control={form.control}
        name="age"
        render={(props) => (

          <input
            className="border-2 border-gray-300 rounded-md p-2"
            type="number"
            placeholder="Enter your age"
            value={props.field.value}
            onChange={(e) => {

              console.log("e", props);
              props.field.onChange({
                target: { value: +e.target.value + 99 },
              });
            }}
            // {...field}
          />
        )}
      />
      <input
        className="border-2 border-gray-300 rounded-md p-2"
        type="text"
        {...form.register("name")}
      />
      <input
        className="border-2 border-gray-300 rounded-md p-2"
        type="text"
        {...form.register("requiredName", { required: true })}
      />
      {form.formState.errors.requiredName && (
        <span>This field is required</span>
      )}

      <select {...form.register("gender")}>
        <option value={GenderEnum.female}>female</option>
        <option value={GenderEnum.male}>male</option>
        <option value={GenderEnum.other}>other</option>
      </select>
      <button type="submit">Submit</button>
    </form>
  );
};

export default UpdateProductFormV2;
