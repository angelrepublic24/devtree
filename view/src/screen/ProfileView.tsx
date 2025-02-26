import { useForm } from "react-hook-form";
import ErrorMessage from "../components/ErrorMessage";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { IUser, ProfileForm } from "../types";
import { updateProfile, uploadImage } from "../api/DevTreeAPI";
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

  const imageMutation = useMutation({
    mutationFn: uploadImage,
    onError: (error) => {
      console.log(error)
    },
    onSuccess: (data) => {
      queryClient.setQueryData(['user'], (prevData: IUser) => {
        return {...prevData, image: data.image }
      })}
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if(e.target.files)
      imageMutation.mutate(e.target.files[0])
  }
  const useProfileForm = (formData: ProfileForm) => {
    const user: IUser = queryClient.getQueryData(['user'])!;
    user.description = formData.description;
    user.username = formData.username;
    updateProfileMutation.mutate(user)
    return
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
          onChange={handleChange}
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
