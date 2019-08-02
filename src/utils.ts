export async function sleep(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

export const Second = 1000;
export const Seconds = Second;