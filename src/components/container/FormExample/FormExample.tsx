import React from "react";
import useFormExample from "./useFormExample";

const FormExample: React.FC = () => {
  const { register, handleSubmit, errors, onSubmit } = useFormExample();

  return (
    <div>
      <form action="" onSubmit={handleSubmit(onSubmit)} className="">
        <div>
          <label htmlFor="username">username</label>
          <input {...register("email")} type="email" />
          {errors.email && <p className="text-red">{errors.email.message}</p>}
        </div>
        <div>
          <label htmlFor="password">password</label>
          <input {...register("password")} type="password" />
          {errors.password && (
            <p className="text-red">{errors.password.message}</p>
          )}
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  );
};

export default FormExample;
