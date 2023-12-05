import { showResultOfDay } from "../../helpers/show-result";
import { summarize } from "../../helpers/summarize";
import input from "./input.json";

// =====================================================
// Star 1
// =====================================================
type ColorRules = Partial<{
    [key in "red" | "green" | "blue"]: number;
}>;

/**
 * Get sum of games identities when all dice respects rules
 */
const getSumOfGamesIdentities = (inputs: string[], colorRules: ColorRules) => {
    return summarize(inputs, (input) => {
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
            return Number(gameNumber);
        }

        return 0;
    });
};

// =====================================================
// Star 2
// =====================================================
type DicePerGame = Partial<{
    [key in "red" | "green" | "blue"]: number;
}>;

/**
 * Get sum of games identities when all dice respects rules
 */
const getSumOfAllMinimumDice = (inputs: string[]) => {
    return summarize(inputs, (input) => {
        const diceRegExp = /(\s(?<COUNT>(\d*))\s(?<COLOR>\w+))/g;
        const dicePerGame = Array.from(
            input.matchAll(diceRegExp)
        ).reduce<DicePerGame>((diceAccumulator, dice) => {
            const color = dice.groups.COLOR;
            const count = Number(dice.groups.COUNT);
            const isSmaller = (diceAccumulator[color] ?? 0) <= count;

            return {
                ...diceAccumulator,
                [color]: isSmaller ? count : diceAccumulator[color],
            };
        }, {});

        // Return power of all minimum dice
        return Object.values(dicePerGame).reduce<number>(
            (colorAccumulator, color) => {
                return colorAccumulator * color;
            },
            1
        );
    });
};

// =====================================================
// Main
// =====================================================
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

    // Get sum of all minimum dice
    const SumOfAllMinimumDice = getSumOfAllMinimumDice(input);

    // Show the results
    showResultOfDay(1, sumOfGamesIdentities, SumOfAllMinimumDice); // 2268, 63542
};

// Execute main function
main();
