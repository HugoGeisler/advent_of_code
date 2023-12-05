/**
 * Summarize result of a callback on an array
 */
export const summarize = <T>(input: T[], cb: (value: T) => number) => {
    return input.reduce<number>((accumulator, value) => {
        return accumulator + (cb(value) ?? 0);
    }, 0);
};
