import { useForm } from "react-hook-form";
import ErrorMessage from "../components/ErrorMessage";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { IUser, ProfileForm } from "../types";
import { updateProfile } from "../api/DevTreeAPI";
import { toast } from "sonner";

export default function ProfileView() {
    const queryClient = useQueryClient();
    const data: IUser = queryClient.getQueryData(['user'])!;
  const {register,handleSubmit,formState: { errors },} = useForm({
    defaultValues: {
      username: data.username,
      description: data.description
    },
  });

  const updateProfileMutation = useMutation({
    mutationFn: updateProfile,
    onError: (error) => {
      toast.error(error.message)
    },
    onSuccess: (data) => {
      toast.success(data.msg)
      queryClient.invalidateQueries({queryKey: ['user']})
    }
  })

  const useProfileForm = (formData: ProfileForm) => {
    console.log('first');
    updateProfileMutation.mutate(formData)
  }

  return (
    <form className="bg-white p-10 rounded-lg space-y-5" onSubmit={handleSubmit(useProfileForm)}>
      <legend className="text-2xl text-slate-800 text-center">
        Edit information
      </legend>
      <div className="grid grid-cols-1 gap-2">
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          className="border-none bg-slate-100 rounded-lg p-2"
          placeholder="User name"
          {...register("username", {
            required: "The username is required",
          })}
        />
        {errors.username && <ErrorMessage>{errors.username.message}</ErrorMessage>}
      </div>

      <div className="grid grid-cols-1 gap-2">
        <label htmlFor="description">Description:</label>
        <textarea
          className="border-none bg-slate-100 rounded-lg p-2"
          placeholder="Description"
          {...register("description", {
            required: "The description is required",
          })}
        />
        {errors.description && <ErrorMessage>{errors.description.message}</ErrorMessage>}
      </div>

      <div className="grid grid-cols-1 gap-2">
        <label htmlFor="handle">Imagen:</label>
        <input
          id="image"
          type="file"
          name="handle"
          className="border-none bg-slate-100 rounded-lg p-2"
          accept="image/*"
          onChange={() => {}}
        />
      </div>

      <input
        type="submit"
        className="bg-cyan-400 p-2 text-lg w-full uppercase text-slate-600 rounded-lg font-bold cursor-pointer"
        value="Save Changes"
      />
    </form>
  );
}
