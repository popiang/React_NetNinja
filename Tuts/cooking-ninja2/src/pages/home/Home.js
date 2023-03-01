import { useEffect, useState } from "react";
import RecipeList from "../../components/RecipeList";
import { projectFirestore } from "../../firebase/config";
// import { useFetch } from "../../hooks/useFetch";

// styles
import "./Home.css";

export default function Home() {
    // const {
    //     data: recipes,
    //     isPending,
    //     error,
    // } = useFetch("http://localhost:3000/recipes");

    const [error, setError] = useState("");
    const [isPending, setIsPending] = useState(false);
    const [data, setData] = useState(null);

    useEffect(() => {
        setIsPending(true);

        const unsub = projectFirestore
            .collection("recipes")
            .onSnapshot((snapshot) => {
                if (snapshot.empty) {
                    setError("No recipes to load!");
                    setIsPending(false);
                } else {
                    let results = [];
                    snapshot.docs.forEach((doc) => {
                        results.push({ id: doc.id, ...doc.data() });
                    });
                    setData(results);
                    setIsPending(false);
                }
            }, (err) => {
				setError(err.message);
				setIsPending(false);
			});
		
		return () => unsub();
		
    }, []);

    return (
        <div className="home">
            {isPending && <p className="loading">Loading...</p>}
            {error && <p className="error">{error}</p>}
            {data && <RecipeList recipes={data} />}
        </div>
    );
}
