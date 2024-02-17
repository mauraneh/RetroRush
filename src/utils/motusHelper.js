export const fetchRandomWord = async () => {
    try {
        const response = await fetch('https://trouve-mot.fr/api/random');
        console.log(response);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        if (!data[0].name) {
            throw new Error('Word not found in response');
        }
        console.log(data[0].name);
        return data[0].name;
    } catch (error) {
        console.error("Error fetching random word:", error);
        return '';
    }
};
