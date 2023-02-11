import { useFetch } from "../../hooks/useFetch";

// components
import RecipeList from "../../components/RecipeList";

// styles
import "./Home.css";

export default function Home() {
    const { data, isPending, error } = useFetch(
        "  http://localhost:3000/recipes"
    );

    return (
        <div className="home">
            {isPending && <p className="loading">Loading...</p>}
            {error && <p className="error">{error}</p>}
            {data && <RecipeList recipes={data} />}
        </div>
    );
}
