import { useLocation } from "react-router-dom";
import { useFetch } from "../../hooks/useFetch";
import { useTheme } from "../../hooks/useTheme";

// components
import RecipeList from "../../components/RecipeList";

// styles
import "./Search.css";

export default function Search() {
    const queryString = useLocation().search;
    const queryParams = new URLSearchParams(queryString);
    const query = queryParams.get("q");
	const { mode } = useTheme();

    const url = "http://localhost:3000/recipes?q=" + query;
    const { data: recipes, error, isPending } = useFetch(url);

    return (
        <div>
            <h2 className={`page-title ${mode}`}>Recipes including "{query}"</h2>
            {error && <p className="error">{error}</p>}
            {isPending && <p className="loading">Loading...</p>}
            {recipes && <RecipeList recipes={recipes} />}
        </div>
    );
}
