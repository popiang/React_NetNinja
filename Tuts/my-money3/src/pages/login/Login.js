import { useState } from "react";
import { useLogin } from "../../hooks/useLogin";

// styles
import styles from "./Login.module.css";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
	const { login, isPending, error } = useLogin();

	const handleSubmit = (e) => {
		e.preventDefault();
		login(email, password);
	};

    return (
        <form className={styles["login-form"]} onSubmit={handleSubmit}>
            <h2>Login</h2>
            <label>
                <span>email:</span>
                <input
                    type="text"
                    required
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                />
            </label>
            <label>
                <span>passwaord:</span>
                <input
                    type="password"
                    required
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                />
            </label>
            {!isPending && <button className="btn">Login</button>}
            {isPending && <button className="btn">Loading...</button>}
            {error && <p>{error}</p>}
        </form>
    );
}
