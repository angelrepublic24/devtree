import { Link, useLocation, useNavigate } from "react-router-dom";
import {useForm} from 'react-hook-form'
import ErrorMessage from "../components/ErrorMessage";
import { RegisterForm } from "../types";
import { toast } from "sonner";
import {isAxiosError} from 'axios';
import Api from "../global/Global";

export default function RegisterScreen() {
  const navigation = useNavigate()
  const location = useLocation();
  const initialValues: RegisterForm = {
    name: '',
    email: '',
    username: location?.state?.username|| '',
    password: '',
    password_confirmation: ''

  }
  const {register, watch, reset, handleSubmit, formState: {errors}} = useForm({defaultValues: initialValues});

  const password = watch('password')

  const handleRegister = async(formData: RegisterForm) => {
    try{
      const response  = await Api.post('/auth/register', formData);
      toast.success('Account registered successfully')
      reset()
      navigation('/auth/login')
    } catch (error) {
      if(isAxiosError(error)){
        toast.error(error.response?.data.error)
      }
      
    }
  }
  return (
    <>
      <h1 className="text-white text-3xl font-bold">Register</h1>
      <form
        onSubmit={handleSubmit(handleRegister)}
        className="bg-white px-5 py-20 rounded-lg space-y-10 mt-10"
      >
        <div className="grid grid-cols-1 space-y-3">
          <label htmlFor="name" className="text-2xl text-slate-500">
            Name
          </label>
          <input
            id="name"
            type="text"
            placeholder="Name"
            className="bg-slate-100 border-none p-3 rounded-lg placeholder-slate-400"
            {...register('name', {
              required: "The name is required"
            })}
          />
          {errors.name && <ErrorMessage>{errors.name.message}</ErrorMessage>}

        </div>
        <div className="grid grid-cols-1 space-y-3">
          <label htmlFor="email" className="text-2xl text-slate-500">
            E-mail
          </label>
          <input
            id="email"
            type="email"
            placeholder="Email"
            className="bg-slate-100 border-none p-3 rounded-lg placeholder-slate-400"
            {...register('email', {
              required: "The email is required",
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: "E-mail no válido",
            },
            },
          )}
          />
          {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
        </div>
        <div className="grid grid-cols-1 space-y-3">
          <label htmlFor="username" className="text-2xl text-slate-500">
            Username
          </label>
          <input
            id="username"
            type="text"
            placeholder="Username: without spaces"
            className="bg-slate-100 border-none p-3 rounded-lg placeholder-slate-400"
            {...register('username', {
              required: "The username is required"
            })}
          />
          {errors.username && <ErrorMessage>{errors.username.message}</ErrorMessage>}
        </div>
        <div className="grid grid-cols-1 space-y-3">
          <label htmlFor="password" className="text-2xl text-slate-500">
            Password
          </label>
          <input
            id="password"
            type="password"
            placeholder="Password"
            className="bg-slate-100 border-none p-3 rounded-lg placeholder-slate-400"
            {...register('password', {
              required: "The password is required",
              minLength: {
                value: 6,
                message: "The password must be at least 8 characters"
              }
            })}
          />
          {errors.password && <ErrorMessage>{errors.password.message}</ErrorMessage>}
        </div>

        <div className="grid grid-cols-1 space-y-3">
          <label
            htmlFor="password_confirmation"
            className="text-2xl text-slate-500"
          >
            Password Confirmation
          </label>
          <input
            id="password_confirmation"
            type="password"
            placeholder="Password Confirmation"
            className="bg-slate-100 border-none p-3 rounded-lg placeholder-slate-400"
            {...register('password_confirmation', {
              required: "The passsword confirmation is required",
              validate: (value) => value === password || 'The password confirmation does not match the password'
            })}
          />
          {errors.password_confirmation && <ErrorMessage>{errors.password_confirmation.message}</ErrorMessage>}
        </div>

        <input
          type="submit"
          className="bg-cyan-400 p-3 text-lg w-full uppercase text-slate-600 rounded-lg font-bold cursor-pointer"
          value="Create account"
        />
      </form>
      <nav className="font-semibold text-center text-white block mt-10">
        Do you already have an account, please{" "}
        <strong><Link to="/auth/login">Sign in</Link></strong>
        
      </nav>
    </>
  );
}
