import { showResultOfDay } from "../../helpers/show-result";
import input from "./input.json";

/**
 * Get the calibration value and summarize it
 */
const getCalibrationValue = (input: string[]): number => {
    return input.reduce((inputAccumulator, value) => {
        // Get all number contains in the input
        const inputNumbers = value.split("").filter(Number);

        // Concat first and last value to get the calibration value
        const calibrationValue = Number(
            [inputNumbers.at(0), inputNumbers.at(-1)].join("")
        );

        // Summarize
        return inputAccumulator + calibrationValue;
    }, 0);
};

const getCalibrationValueWithWordererNumber = (input: string[]): number => {
    const worderedNumber: string[] = [
        "zero",
        "one",
        "two",
        "three",
        "four",
        "five",
        "six",
        "seven",
        "eight",
        "nine",
    ];

    const getDigitsInWord = (word: string): number[] => {
        const numberPresentInWord: number[] = [];
        while (word.length > 0) {
            if (Number.isInteger(Number(word[0]))) {
                numberPresentInWord.push(Number(word[0]));
                word = word.substring(1);
            } else {
                const result = word.match(new RegExp(worderedNumber.join("|")));

                if (result && result.index === 0) {
                    const resultIndex = worderedNumber.indexOf(result[0]);
                    numberPresentInWord.push(resultIndex);
                    word = word.substring(result[0].length - 1);
                } else {
                    word = word.substring(1);
                }
            }
        }

        return numberPresentInWord;
    };

    // Get all number contains in the input
    return input.reduce<number>((inputAccumulator, value) => {
        const inputNumbers = getDigitsInWord(value);

        // Concat first and last value to get the calibration value
        const calibrationValue = Number(
            [inputNumbers.at(0), inputNumbers.at(-1)].join("")
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

    // Get calibration value with worderer number
    const calibrationValueWithWordererNumber =
        getCalibrationValueWithWordererNumber(input);

    // Show the results
    showResultOfDay(1, calibrationValues, calibrationValueWithWordererNumber); // 54974, 53340
};

// Execute main function
main();
