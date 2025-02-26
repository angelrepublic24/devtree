/* eslint-disable prefer-const */
import { isAxiosError } from "axios";
import Api from "../global/Global";
import { IUser, UserName} from "../types";

export async function getUser() {
  try {
    const { data } = await Api<IUser>("auth/profile");
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response)
      throw new Error(error.response.data);
  }
}

export async function updateProfile(formData: IUser){
    try{
        const {data} = await Api.patch('auth/profile', formData);
        return data
    }   catch(error){
        if(isAxiosError(error) && error.response)
        throw new Error(error.response.data);
    }
}


export async function uploadImage(file: File) {
  let formData = new FormData();
  formData.append('file', file)

  try {
    const {data} = await Api.post('auth/upload', formData);
    return data
    
  } catch (error) {
    if(isAxiosError(error) && error.response)
      throw new Error(error.response.data);
  }
}

export async function getUsername(username: string) {
  try {
    const { data } = await Api(`/${username}`);
    const user: UserName = data.user;
    return user;
  } catch (error) {
    if (isAxiosError(error) && error.response)
      throw new Error(error.response.data);
  }
}
