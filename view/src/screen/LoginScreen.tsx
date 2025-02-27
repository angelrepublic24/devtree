import { Link, useNavigate} from "react-router-dom";
import { useForm } from "react-hook-form";
import { LoginForm } from "../types";
import ErrorMessage from "../components/ErrorMessage";
import Api from "../global/Global";
import { toast } from "sonner";
import { isAxiosError } from "axios";

export default function LoginScreen() {
  const initialData: LoginForm = {
    email: "",
    password: "",
  };

  const navigation = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: initialData });


  const handleLogin = async(formData:LoginForm) => {
    try{
      const {data} = await Api.post('/auth/login', formData);
      localStorage.setItem('AUTH_TOKEN', data.token);
      navigation('/admin')

    }catch(error){
      if(isAxiosError(error)){
        console.log(error)
        toast.error(error.response?.data.msg)
      }
    }

  }
  return (
    <>
      <h1 className="text-white text-3xl font-bold">Login</h1>
      <form
        onSubmit={handleSubmit(handleLogin)}
        className="bg-white px-5 py-20 rounded-lg space-y-10 mt-10"
        noValidate
      >
        <div className="grid grid-cols-1 space-y-3">
          <label htmlFor="email" className="text-2xl text-slate-500">
            E-mail
          </label>
          <input
            id="email"
            type="email"
            placeholder="Email"
            className="bg-slate-100 border-none p-3 rounded-lg placeholder-slate-400"
            {...register("email", {
              required: "The email is required",
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: "E-mail not valid",
              },
            })}
          />
          {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
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
            {...register("password", {
              required: "The password is required",
            })}
          />
          {errors.password && (
            <ErrorMessage>{errors.password.message}</ErrorMessage>
          )}
        </div>

        <input
          type="submit"
          className="bg-cyan-400 p-3 text-lg w-full uppercase text-slate-600 rounded-lg font-bold cursor-pointer"
          value="Iniciar Sesión"
        />
      </form>
      <nav className="font-semibold text-center text-white block mt-10">
        Doesn't have account? <strong><Link to="/auth/register">create one</Link></strong>
      </nav>
    </>
  );
}
