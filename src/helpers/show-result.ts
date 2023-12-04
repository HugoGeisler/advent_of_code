export const showResultOfDay = (day: number, ...results: any[]) => {
    results.forEach((result, star) => {
        console.log(`Result of day ${day} - Star ${star + 1} :`, result);
    });
};
