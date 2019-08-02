import {not} from "./functional";

export function randInt(max: number): number {
    return Math.ceil(Math.random() * Math.floor(max));
}

export function shuffle<T>(xs: T[]): T[] {
    function shuffleIter(shuffled: T[], remaining: T[]): T[] {
        if (not(remaining.length)) {
            return shuffled;
        }
        const randomIndex = randInt(remaining.length - 1);
        return shuffleIter(shuffled.concat(remaining[randomIndex]), remaining.filter((x, i) => i !== randomIndex));
    }
    return shuffleIter([], xs);
}
