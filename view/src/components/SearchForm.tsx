import { useMutation } from "@tanstack/react-query";
import ErrorMessage from "./ErrorMessage";
import { useForm } from "react-hook-form";
import slugify from 'react-slugify'
import { checkAvailable } from "../api/DevTreeAPI";
import { Link } from "react-router-dom";

export default function SearchForm() {

    const {register, handleSubmit, watch, formState: {errors}} = useForm({
        defaultValues: {
            username: ''
        }
    })

    const availableMutate = useMutation({
      mutationFn: checkAvailable,
    })

    const username = watch('username')
    const handleSearch = () => {
        const slug = slugify(username)
        availableMutate.mutate(slug)
    }
  return (
    <form onSubmit={handleSubmit(handleSearch)} className="space-y-5">
      <div className="relative flex items-center  bg-white  px-2">
        <label htmlFor="username">devtree.com/</label>
        <input
          type="text"
          id="username"
          className="border-none bg-transparent p-2 focus:ring-0 flex-1"
          placeholder="elonmusk, zuck, jeffbezos"
          {...register("username", {
            required: "Un Nombre de Usuario es obligatorio",
          })}
        />
      </div>
      {errors.username && <ErrorMessage>{errors.username.message}</ErrorMessage>}

      <div className="mt-4">
        {availableMutate.isPending && <p className="text-center">Loading...</p>}
        {availableMutate.isError && <p className="text-center text-red-600 font-black">{availableMutate.error?.message}</p>}
        {availableMutate.data && 
          <p className="text-center text-cyan-500 font-black">
            {availableMutate.data} go to <Link to="/auth/register" state={{username: slugify(username)}}>Register</Link>
          </p>}


      </div>

      <input
        type="submit"
        className="bg-cyan-400 p-3 text-lg w-full capitalize text-slate-600 rounded-lg font-bold cursor-pointer"
        value="Get my username"
      />
    </form>
  );
}
