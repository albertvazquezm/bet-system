export const getSportEvents = async () => {
    const response = await fetch('http://localhost:4000/sport-events', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    return response.json();
};
