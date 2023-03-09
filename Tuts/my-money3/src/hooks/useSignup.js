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
                throw new Error("Could not complete signup!");
            }

            await res.user.updateProfile({ displayName });

            dispatch({ type: "LOGIN", payload: res.user });

			if (!isCancelled) {
				setError(null);
				setIsPending(false);
			}
        } catch (error) {
			if (!isCancelled) {
				setError(error.message);
				setIsPending(false);
				console.log("Fail to login");
			}
        }
    };

	useEffect(() => {
		return () => setIsCancelled(true);
	}, []);

    return { signup, isPending, error };
};
