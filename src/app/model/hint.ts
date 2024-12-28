export interface Hint {
    id: number;
    description: string;
    date: string;
    number: number;
    weeklyBeerId: number;
    userId: number;
}
export const defaultHint: Hint = {
    id: 0,
    description: '',
    date: '',
    number: 0,
    weeklyBeerId: 0,
    userId: 0
}
