import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginScreen from "./screen/LoginScreen";
import RegisterScreen from "./screen/RegisterScreen";
import AuthLayout from "./layouts/AuthLayout";
import AppLayout from "./layouts/AppLayout";
import LinkTreeView from "./screen/LinkTreeView";
import ProfileView from "./screen/ProfileView";
import UserView from "./screen/UserView";
import NotFoundView from "./screen/NotFoundView";

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

                <Route path="/:username" element={<AuthLayout/>}>
                    <Route element={<UserView />}  index={true} />
                </Route>
                <Route path="/404" element={<AuthLayout />}>
                    <Route  element={<NotFoundView/>} index={true}/>
                </Route>
            </Routes>
        </BrowserRouter>
    )
}