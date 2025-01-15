import { useState, useEffect } from "react";

export type Product = {
    id: number;
    name: string;
    price: number;
    category: string;
    image: string;
};

const TermekKereso = () => {
    const [searchTermek, setSearchTermek] = useState<string>("");
    const [termek, setTermek] = useState<Product | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [termekData, setTermekData] = useState<Product[]>([]);

    useEffect(() => {
        const fetchTermekData = async () => {
            try {
                const response = await fetch("/products.json");
                const data = await response.json();
                setTermekData(data.products);
            } catch (err) {
                console.error("Error fetching termek data:", err);
            }
        };
        fetchTermekData();
    }, []);

    const handleSearch = () => {
        if (!termekData || termekData.length === 0) {
            setError("No termek data available.");
            return;
        }

        const foundTermek = termekData.find((t) =>
            t.name.toLowerCase().includes(searchTermek.toLowerCase())
        );

        if (foundTermek) {
            setTermek(foundTermek);
            setError(null);
        } else {
            setTermek(null);
            setError("No termek data found for the given name.");
        }
    };

    return (
        <div className="product-card">
            <div className="search-section">
                <input
                    type="text"
                    value={searchTermek}
                    onChange={(e) => setSearchTermek(e.target.value)}
                    placeholder="Enter product name..."
                />
                <button onClick={handleSearch}>Search</button>
            </div>
            <div className="results-section">
                {error && <p className="error">{error}</p>}
                {termek && (
                    <div className="product-info">
                        <img src={termek.image} alt={termek.name} className="product-image" />
                        <p>Id: {termek.id}</p>
                        <p>Name: {termek.name}</p>
                        <p>Price: ${termek.price}</p>
                        <p>Category: {termek.category}</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default TermekKereso;