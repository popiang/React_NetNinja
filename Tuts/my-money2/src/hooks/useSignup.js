import { useEffect, useState } from "react";
import { projectAuth } from "../firebase/config";
import { useAuthContext } from "./useAuthContext";

export const useSignup = () => {
    const [error, setError] = useState(null);
    const [isPending, setIsPending] = useState(false);
    const [isCancelled, setIsCancelled] = useState(false);
    const { dispatch } = useAuthContext();

    const signup = async (email, password, displayName) => {
        setError(null);
        setIsPending(true);

        try {
            const res = await projectAuth.createUserWithEmailAndPassword(
                email,
                password
            );

            if (!res) {
                throw new Error("Could not create user!!");
            }

            // add displayName to user
            await res.user.updateProfile({ displayName });

            // dispatch login action
            dispatch({ type: "LOGIN", payload: res.user });

            if (!isCancelled) {
                setError(null);
                setIsPending(false);
            }
        } catch (error) {
            if (!isCancelled) {
                console.log(error.message);
                setError(error.message);
                setIsPending(false);
            }
        }
    };

    useEffect(() => {
        return () => setIsCancelled;
    }, []);

    return { signup, error, isPending };
};
