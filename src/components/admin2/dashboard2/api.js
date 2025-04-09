export const fetchForwardedRequests = async () => {
    try {
        const response = await fetch('/api/forwarded-requests'); // Adjust the endpoint as necessary
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching forwarded requests:', error);
        return [];
    }
};