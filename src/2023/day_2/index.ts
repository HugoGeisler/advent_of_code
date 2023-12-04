import { showResultOfDay } from "../../helpers/show-result";
import input from "./input.json";

type ColorRules = Partial<{
    [key in "red" | "green" | "blue"]: number;
}>;

/**
 * Get sum of games identities when all dice respects rules
 */
const getSumOfGamesIdentities = (inputs: string[], colorRules: ColorRules) => {
    return inputs.reduce((accumulator, input) => {
        const diceRegExp = /(\s(?<COUNT>(\d*))\s(?<COLOR>\w+))/g;
        const colorIsValid = Array.from(input.matchAll(diceRegExp)).every(
            (dice) => {
                const color = dice.groups.COLOR;
                const count = Number(dice.groups.COUNT);

                return colorRules[color] && count <= colorRules[color];
            }
        );

        if (colorIsValid) {
            const gameRegExp = /Game\s(?<GAME_NUMBER>(\d*))/g;
            const gameNumber = gameRegExp.exec(input)?.groups?.GAME_NUMBER;
            return accumulator + Number(gameNumber);
        }

        return accumulator;
    }, 0);
};

/**
 * https://adventofcode.com/2023/day/2
 */
const main = () => {
    // Get sum of games identities
    const sumOfGamesIdentities = getSumOfGamesIdentities(input, {
        red: 12,
        green: 13,
        blue: 14,
    });

    // Show the results
    showResultOfDay(1, sumOfGamesIdentities); // 2268, ...
};

// Execute main function
main();
