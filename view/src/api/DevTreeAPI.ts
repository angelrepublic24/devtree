import { isAxiosError } from "axios";
import Api from "../global/Global";
import { IUser, ProfileForm } from "../types";

export async function getUser() {
  try {
    const { data } = await Api<IUser>("auth/profile");
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response)
      throw new Error(error.response.data);
  }
}

export async function updateProfile(formData: ProfileForm){
    try{
        const {data} = await Api.patch('auth/profile', formData);
        return data
    }   catch(error){
        if(isAxiosError(error) && error.response)
        throw new Error(error.response.data);
    }
}
