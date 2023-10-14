import { useEffect, useState } from "react";
import Cookies from 'js-cookie';
import decode from 'jwt-decode';
import { useAppDispatch } from "./helpers";
import { userLoggedIn, userLoggedOut } from "@/redux-rtk/features/auth/authSlice";
import { loginUrl } from "@/configs/constants";
import { useRouter } from "next/router";

export default function useAuthCheck() {

    const router = useRouter();
    const dispatch = useAppDispatch();

    // states
    const [authChecked, setAuthChecked] = useState(false);
    const [authenticated, setAuthenticated] = useState(false);

    useEffect(() => {
        if (authChecked) return;

        const accessToken = Cookies.get('accessToken');
        const _id = Cookies.get('_id');
        const headers = { Authorization: `Bearer ${accessToken}` };

        if (accessToken && _id) {
            const decodedToken: any = decode(accessToken);

            if (decodedToken.exp * 1000 < new Date().getTime()) {
                dispatch(userLoggedOut());
                router.push(loginUrl);
            } else {
                // Check if already authenticated
                if (!authenticated) {
                    // Fetch user data from the server
                    fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}auth/profile`, { headers })
                        .then(response => response.json())
                        .then(data => {
                            dispatch(
                                userLoggedIn({
                                    accessToken: accessToken,
                                    isAuthenticated: true,
                                    _id: _id,
                                    user: data.data
                                })
                            );
                            setAuthenticated(true); // Mark as authenticated
                        })
                        .catch(error => {
                            console.error(error);
                            dispatch(userLoggedOut());
                            router.push(loginUrl);
                        });
                }
                setAuthChecked(true);
            }
        } else {
            router.push(loginUrl);
            setAuthChecked(true);
            setAuthenticated(true);
        }

        // Set authChecked to true after processing
        setAuthChecked(true);
    }, [dispatch, router, authChecked, authenticated]);

    // console.log(authenticated);
    return authenticated; // Return the authenticated state
}