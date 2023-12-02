import input from "./input.json";

/**
 * Get the calibration value and summarize it
 */
const getCalibrationValue = (input: string[]): number => {
    return input.reduce((inputAccumulator, value) => {
        // Get all number contains in the input
        const numberContainsInInput = value
            .split("")
            .reduce((valueAccumulator, currentValue) => {
                if (Number.isInteger(Number(currentValue)))
                    return [...valueAccumulator, currentValue];
                return valueAccumulator;
            }, []);

        // Concat first and last value to get the calibration value
        const calibrationValue = Number(
            [numberContainsInInput.at(0), numberContainsInInput.at(-1)].join("")
        );

        // Summarize
        return inputAccumulator + calibrationValue;
    }, 0);
};

/**
 * https://adventofcode.com/2023/day/1
 */
const main = () => {
    // Get calibration value
    const calibrationValues = getCalibrationValue(input);

    // Show the result
    console.log(`Result of day 1 :`, calibrationValues);
};

// Execute main function
main();
