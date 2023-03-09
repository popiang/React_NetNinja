import { projectFirestore, timestamp } from "../firebase/config";
import { useEffect, useReducer, useState } from "react";

let initalState = {
    document: null,
    isPending: false,
    error: null,
    success: null,
};

const firestoreReducer = (state, action) => {
    switch (action.type) {
        case "IS_PENDING":
            return {
                document: null,
                isPending: true,
                error: null,
                success: null,
            };
        case "ADDED_DOCUMENT":
            return {
                document: action.payload,
                isPending: false,
                error: null,
                success: true,
            };
		case "DELETE_DOCUMENT":
			return {
                document: null,
                isPending: false,
                error: null,
                success: true,
            };
        case "ERROR":
            return {
                document: null,
                isPending: false,
                error: action.payload,
                success: false,
            };
        default:
            return state;
    }
};

export const useFirestore = (collection) => {
    const [response, dispatch] = useReducer(firestoreReducer, initalState);
    const [isCancelled, setIsCancelled] = useState(false);

    const ref = projectFirestore.collection(collection);

    const addDocument = async (doc) => {
        dispatch({ type: "IS_PENDING" });

        try {
            const createdAt = timestamp.fromDate(new Date());
            const addedDocument = await ref.add({ ...doc, createdAt });
            if (!isCancelled) {
                dispatch({ type: "ADDED_DOCUMENT", payload: addedDocument });
            }
        } catch (error) {
            if (!isCancelled) {
                dispatch({ type: "ERROR", payload: error.message });
            }
        }
    };

    const deleteDocument = async (id) => {
        dispatch({ type: "IS_PENDING" });
        try {
            await ref.doc(id).delete();
            if (!isCancelled) {
                dispatch({ type: "DELETE_DOCUMENT" });
            }
        } catch (error) {
            if (!isCancelled) {
                dispatch({
                    type: "ERROR",
                    payload: "Could not delete document!",
                });
            }
        }
    };

    useEffect(() => {
        return () => setIsCancelled(true);
    }, []);

    return { addDocument, deleteDocument, response };
};
