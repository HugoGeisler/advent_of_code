import { showResultOfDay } from "../../helpers/show-result";
import input from "./input.json";

type ColorRules = Partial<{
    [key in "red" | "green" | "blue"]: number;
}>;

const getSumOfGameIdentity = (inputs: string[], colorRules: ColorRules) => {
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
    // Get sum of game identity
    const sumOfGameIdentity = getSumOfGameIdentity(input, {
        red: 12,
        green: 13,
        blue: 14,
    });

    // Show the results
    showResultOfDay(1, sumOfGameIdentity); // 2268, ...
};

// Execute main function
main();
