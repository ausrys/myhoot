export type Quiz = {
    title: string;
    description: string;
    createdAt: Date;
    id: number;
};

export type QuizFullInfo = Quiz & {
    questions?: QuizQuestion[];
};
export type QuizQuestion = {
    id: number;
    text: string;
    timeLimit: number;
    options: QuizQuestionOption[];
};

export type QuizQuestionOption = {
    id: number;
    text: string;
    isCorrect: boolean;
};
