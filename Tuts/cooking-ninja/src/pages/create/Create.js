import { useEffect, useRef, useState } from "react";
import { useFetch } from "../../hooks/useFetch";
import { useHistory } from "react-router-dom";

// styles
import "./Create.css";
import { useTheme } from "../../hooks/useTheme";

export default function Create() {
    const [title, setTitle] = useState("");
    const [method, setMethod] = useState("");
    const [cookingTime, setCookingTime] = useState("");
    const [newIngredient, setNewIngredient] = useState("");
    const [ingredients, setIngredients] = useState([]);
    const ingredientInput = useRef(null);
    const history = useHistory();
    const { mode } = useTheme();

    const { postData, data } = useFetch(
        "http://localhost:3000/recipes",
        "POST"
    );

    const handleSubmit = (e) => {
        e.preventDefault();
        postData({
            title,
            ingredients,
            method,
            cookingTime: cookingTime + " minutes",
        });
    };

    const handleAdd = (e) => {
        e.preventDefault();
        const ing = newIngredient.trim();

        if (ing && !ingredients.includes(ing)) {
            setIngredients((prevIngredients) => [...prevIngredients, ing]);
        }

        setNewIngredient("");
        ingredientInput.current.focus();
    };

    // redirect the user when we get data response
    useEffect(() => {
        if (data) {
            history.push("/");
        }
    }, [data, history]);

    return (
        <div className={`create ${mode}`}>
            <h2 className="page-title">Add A New Recipe</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    <span>Recipe title:</span>
                    <input
                        type="text"
                        onChange={(e) => setTitle(e.target.value)}
                        value={title}
                        required
                    />
                </label>

                <label>
                    <span>Recipe ingredients:</span>
                    <div className="ingredients">
                        <input
                            type="text"
                            onChange={(e) => setNewIngredient(e.target.value)}
                            value={newIngredient}
                            ref={ingredientInput}
                        />
                        <button className="btn" onClick={handleAdd}>
                            Add
                        </button>
                    </div>
                </label>
                <p>
                    Current ingredients:{" "}
                    {ingredients.map((ing) => (
                        <em key={ing}>{ing}, </em>
                    ))}
                </p>

                <label>
                    <span>Recipe method:</span>
                    <textarea
                        onChange={(e) => setMethod(e.target.value)}
                        value={method}
                        required
                    />
                </label>

                <label>
                    <span>Cooking time (minutes)</span>
                    <input
                        type="number"
                        onChange={(e) => setCookingTime(e.target.value)}
                        value={cookingTime}
                        required
                    />
                </label>
                <button className="btn">Submit</button>
            </form>
        </div>
    );
}
