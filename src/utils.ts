export const clamp = (value: number, min: number, max: number) =>
    Math.round(Math.min(Math.max(value, min), max));


export const convertToFloat = (
    value: number, limit: number, offset: number): number =>
    value / (limit - offset) * 2 - 1


export const convertToRelative = (
    value: number, limit: number, offset: number): number =>
    Math.round((value + 1) / 2 * (limit - offset));
