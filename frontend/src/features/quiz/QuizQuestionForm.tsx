import { useForm, useFieldArray } from 'react-hook-form';
import {
    CreateQuizQuestionFormSchema,
    CreateQuizQuestionPayloadSchema,
    type CreateQuizQuestionForm,
} from '../../validators/zod/quiz.validator';
import { zodResolver } from '@hookform/resolvers/zod';
import { useCreateQuizQuestion } from './mutations';
import { useParams } from 'react-router';

export default function AddQuestionForm() {
    const { id } = useParams<{ id: string }>();
    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
    } = useForm<CreateQuizQuestionForm>({
        defaultValues: {
            text: '',
            timeLimit: 30,
            options: [
                { text: '', isCorrect: true },
                { text: '', isCorrect: false },
            ],
        },
        resolver: zodResolver(CreateQuizQuestionFormSchema),
    });

    const { fields, append, remove } = useFieldArray({
        control,
        name: 'options',
    });
    const { mutate: addQuestion, isPending } = useCreateQuizQuestion(id!);
    const onSubmit = (data: CreateQuizQuestionForm) => {
        const payload = CreateQuizQuestionPayloadSchema.safeParse(data);
        if (payload.success) addQuestion({ ...payload.data, quizId: Number(id) });
        return;
    };
    if (isPending) return <div>Loading...</div>;
    return (
        <div className="mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Add Question</h1>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div>
                    <label className="block font-medium">Question Text</label>
                    <input {...register('text')} className="input" />
                    {errors.text && <p className="text-red-500">{errors.text.message}</p>}
                </div>

                <div>
                    <label className="block font-medium">Time Limit (seconds)</label>
                    <input type="number" {...register('timeLimit')} className="input" />
                    {errors.timeLimit && <p className="text-red-500">{errors.timeLimit.message}</p>}
                </div>

                <div>
                    <label className="block font-medium mb-2">Options</label>
                    {fields.map((field, index) => (
                        <div key={field.id}>
                            <div className="flex items-center gap-2 mb-2">
                                <input
                                    {...register(`options.${index}.text` as const)}
                                    className="input flex-1"
                                    placeholder={`Option ${index + 1}`}
                                />

                                <label className="flex items-center gap-1">
                                    <input
                                        type="checkbox"
                                        {...register(`options.${index}.isCorrect`)}
                                    />
                                    Correct
                                </label>
                            </div>
                            <div>
                                {fields.length > 2 && (
                                    <button
                                        type="button"
                                        onClick={() => remove(index)}
                                        className="text-red-500"
                                    >
                                        Remove
                                    </button>
                                )}
                                {errors.options && (
                                    <p className="text-red-500">
                                        {errors?.options[index]?.text?.message as string}
                                    </p>
                                )}
                            </div>
                        </div>
                    ))}
                    {errors.options && (
                        <p className="text-red-500">{errors?.options?.root?.message as string}</p>
                    )}
                    {fields.length < 4 ? (
                        <button
                            type="button"
                            onClick={() => append({ text: '', isCorrect: false })}
                            className="btn"
                        >
                            Add Option
                        </button>
                    ) : null}
                </div>

                <button type="submit" className="btn-primary">
                    Save
                </button>
            </form>
        </div>
    );
}
