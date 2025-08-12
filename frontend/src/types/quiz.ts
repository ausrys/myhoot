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
    text: string;
    timeLimit: number;
    options: string[];
};

export type QuizQuestionPayloadFull = QuizQuestion & {
    quizId: number;
};

export type OptionsFromBackEnd = {
    id: number;
    text: string;
    isCorrect: boolean;
};
export type QuizQuestionFromBackend = {
    id: number;
    quizId: number;
    text: string;
    timeLimit: number;
    options: OptionsFromBackEnd[];
};
export type QuizFromBackend = {
    title: string;
    description: string;
    createdAt: Date;
    id: number;
    questions?: QuizQuestionFromBackend[];
};
