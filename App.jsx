import React, { useEffect, useState } from 'react';
import { apiFetch } from '../utils/api'; // Adjust the import path as needed

const MyComponent = () => {
    const [data, setData] = useState(null);

    useEffect(() => {
        const loadData = async () => {
            try {
                // This will automatically request http://localhost:5000/api/users (using your .env variable)
                const result = await apiFetch('/api/users');
                setData(result);
            } catch (error) {
                console.error("Failed to load users", error);
            }
        };

        loadData();
    }, []);

    return (
        <div>
            {/* display data */}
        </div>
    );
}

export default MyComponent;
