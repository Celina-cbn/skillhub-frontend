const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const getProfile = async (id: number) => {
    try {
        const response = await fetch(`${API_BASE_URL}/user/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        });

        if (!response.ok) {
            throw new Error('Error getProfile');
        }

        return await response.json(); 

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
        throw new Error("Error connecting to API");
    }
};