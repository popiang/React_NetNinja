import { useParams } from "react-router-dom";
import { useTheme } from "../../hooks/useTheme";
import { projectFirestore } from "../../firebase/config";

// import { useFetch } from "../../hooks/useFetch";

// styles
import "./Recipe.css";
import { useEffect, useState } from "react";

export default function Recipe() {
    // const url = "http://localhost:3000/recipes/" + id;
    // const { data: recipe, isPending, error } = useFetch(url);

    const { id } = useParams();
	const {  mode } = useTheme();

	const [error, setError] = useState("");
	const [isPending, setIsPending] = useState(false);
	const [recipe, setRecipe] = useState(null);

	useEffect(() => {
		setIsPending(true);

		const unsub = projectFirestore.collection('recipes')
			.doc(id)
			.onSnapshot((doc) => {
				if (doc.exists) {
					setIsPending(false);
					setRecipe(doc.data());
				} else {
					setIsPending(false);
					setError("Could not find the recepi!");
				}
			});
		
		return () => unsub();

	}, [id]);
	
	const handleClick = () => {
		projectFirestore.collection('recipes').doc(id).update({
			title: 'Something completely new'
		});
	};

    return (
        <div className={`recipe ${mode}`}>
            {isPending && <p className="loading">Loading...</p>}
            {error && <p className="error">{error}</p>}
            {recipe && (
                <>
                    <h2 className="page-title">{recipe.title}</h2>
                    <p>Takes {recipe.cookingTime} to cook</p>
                    <ul>
                        {recipe.ingredients.map((ing) => (
                            <li key={ing}>{ing}</li>
                        ))}
                    </ul>
                    <p className="method">{recipe.method}</p>
					<button onClick={handleClick}>Update me</button>
                </>
            )}
        </div>
    );
}
