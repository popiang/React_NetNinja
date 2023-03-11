import { useEffect, useReducer, useState } from "react";
import { projectFirestore, timestamp } from "../firebase/config";

const initialState = {
    documents: null,
    error: null,
    isPending: false,
    success: false,
};

const firestoreReducer = (state, action) => {
    switch (action.type) {
        case "PENDING":
            return {
                documents: null,
                error: null,
                isPending: true,
                success: false,
            };
        case "ADDED_DOCUMENT":
            return {
                documents: action.payload,
                error: null,
                isPending: false,
                success: true,
            };
        case "DELETED_DOCUMENT":
            return {
                documents: null,
                error: null,
                isPending: false,
                success: true,
            };
        case "ERROR":
            return {
                documents: null,
                error: action.payload,
                isPending: false,
                success: false,
            };
        default:
            return state;
    }
};

export const useFirestore = (collection) => {
    const [response, dispatch] = useReducer(firestoreReducer, initialState);
    const [isCancelled, setIsCancelled] = useState(false);

    const ref = projectFirestore.collection(collection);

    const addDocument = async (doc) => {
        dispatch({ type: "PENDING" });

        try {
            const createAt = timestamp.fromDate(new Date());
            const addedDocument = await ref.add({ ...doc, createAt });
            if (!isCancelled)
                dispatch({ type: "ADDED_DOCUMENT", payload: addedDocument });
        } catch (error) {
            if (!isCancelled)
                dispatch({ type: "ERROR", payload: error.message });
        }
    };

    const deleteDocument = async (id) => {
        dispatch({ type: "PENDING" });

        try {
            await ref.doc(id).delete();

            if (!isCancelled) dispatch({ type: "DELETED_DOCUMENT" });
        } catch (error) {
            if (!isCancelled)
                dispatch({ type: "ERROR", payload: error.message });
        }
    };

    useEffect(() => {
        return () => setIsCancelled(true);
    }, []);

    return { addDocument, deleteDocument, response };
};
