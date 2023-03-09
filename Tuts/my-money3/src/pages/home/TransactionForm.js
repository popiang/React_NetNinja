import { useEffect, useState } from "react";
import { useFirestore } from "../../hooks/useFirestore";

export default function TransactionForm({uid}) {
    const [name, setName] = useState("");
    const [amount, setAmount] = useState("");
    const { addDocument, response } = useFirestore("transactions");

    const handleSubmit = (e) => {
        e.preventDefault();
        addDocument({ name, amount, uid });
    };

    useEffect(() => {
        if (response.isSuccess) {
            setName("");
            setAmount("");
        }
    }, [response.isSuccess]);

    return (
        <>
            <h3>Add A Transaction</h3>
            <form onSubmit={handleSubmit}>
                <label>
                    <span>Transaction Name:</span>
                    <input
                        type="text"
                        required
                        onChange={(e) => setName(e.target.value)}
                        value={name}
                    />
                </label>
                <label>
                    <span>Transaction Amount:</span>
                    <input
                        type="number"
                        required
                        onChange={(e) => setAmount(e.target.value)}
                        value={amount}
                    />
                </label>
                {!response.isPending && (
                    <button className="btn">Add Transaction</button>
                )}
                {response.isPending && (
                    <button className="btn">Loading...</button>
                )}
                {response.error && <p>{response.error}</p>}
            </form>
        </>
    );
}
