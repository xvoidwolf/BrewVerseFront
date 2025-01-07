export interface Answer {
    id: number;
    userId: number;
    beerId: number;
    weeklyBeerId: number;
    date: string;
}
export const defaultAnswer: Answer = {
    id: 0,
    userId: 0,
    beerId: 0,
    weeklyBeerId: 0,
    date: ''
}
export interface AnswerDto {
    date: string;
    beerId: number;
    weeklyBeerId: number;
}
export const defaultAnswerDto: AnswerDto = {
    date: '',
    beerId: 0,
    weeklyBeerId: 0
}
  
