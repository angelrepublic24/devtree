import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginScreen from "./screen/LoginScreen";
import RegisterScreen from "./screen/RegisterScreen";
import AuthLayout from "./layouts/AuthLayout";
import AppLayout from "./layouts/AppLayout";
import LinkTreeView from "./screen/LinkTreeView";
import ProfileView from "./screen/ProfileView";

export default function Router(){
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<AuthLayout/>}>
                    <Route path="/auth/login" element={<LoginScreen />} />
                    <Route path="/auth/register" element={<RegisterScreen />} />
                </Route>
                <Route path="/admin" element={<AppLayout/>}>
                    <Route index={true} element={<LinkTreeView/>}/>
                    <Route path="profile" element={<ProfileView/>}/>

                </Route>
            </Routes>
        </BrowserRouter>
    )
}