import { useEffect, useReducer, useState } from "react";
import { projectFirestore, timestamps } from "../firebase/config";

const initialState = {
    documents: null,
    isPending: false,
    error: null,
    isSuccess: null,
};

const firestoreReducer = (state, action) => {
    switch (action.type) {
        case "IS_PENDING":
            return {
                documents: null,
                isPending: true,
                error: null,
                isSuccess: null,
            };
        case "ADDED_DOCUMENT":
            return {
                documents: action.payload,
                isPending: false,
                error: null,
                isSuccess: true,
            };
        case "DELETED_DOCUMENT":
            return {
                documents: null,
                isPending: false,
                error: null,
                isSuccess: true,
            };
        case "ERROR":
            return {
                documents: null,
                isPending: false,
                error: action.payload,
                isSuccess: false,
            };

        default:
            return state;
    }
};

export const useFirestore = (collection) => {
    const [isCancelled, setIsCancelled] = useState(false);

    const [response, dispatch] = useReducer(firestoreReducer, initialState);

    const createdAt = timestamps.fromDate(new Date());
    let ref = projectFirestore.collection(collection);

    const addDocument = async (doc) => {
        dispatch({ type: "IS_PENDING" });

        try {
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
                dispatch({ type: "DELETED_DOCUMENT" });
            }
        } catch (error) {
            if (!isCancelled) {
                dispatch({ type: "ERROR", payload: error.message });
            }
        }
    };

    useEffect(() => {
        return () => setIsCancelled(true);
    }, []);

    return { addDocument, deleteDocument, response };
};
