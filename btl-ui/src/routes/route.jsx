import {
    createBrowserRouter,
    createRoutesFromElements,
    Navigate,
    // Navigate,
    Route,
} from "react-router-dom";
import {
    NotFound,
    Login,
    HomePage,
    MyProfile,
    UserProfile,
    SignUp,
} from "../pages";
import { PrivateRoutes } from "./private-route";
import { LoginRoutes } from "./login";
import { UserRoutes } from "./user-route";

export const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/">
            <Route path="*" element={<NotFound />} />
            <Route index element={<Navigate to={'/login'}></Navigate>} />

            <Route path="/" element={<LoginRoutes />}>
                <Route path="login" element={<Login />} />
                <Route path="signup" >
                    <Route index element={<SignUp />} />
                </Route>
            </Route>

            <Route element={<PrivateRoutes />} path="/" >
                <Route path="home-page" element={<HomePage />} />
            </Route>
            <Route path="/" element={<UserRoutes />}>
                <Route path="my-profile" element={<MyProfile />} />
                <Route path="user-profile/:_id" element={<UserProfile />} />
            </Route>
        </Route>

    )

);
