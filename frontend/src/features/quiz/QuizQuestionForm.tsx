import { useForm, useFieldArray } from 'react-hook-form';
import {
    CreateQuizQuestionFormSchema,
    type CreateQuizQuestionForm,
} from '../../validators/zod/quiz.validator';
import { zodResolver } from '@hookform/resolvers/zod';

export default function AddQuestionPage() {
    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
        // watch,
    } = useForm<CreateQuizQuestionForm>({
        defaultValues: {
            text: '',
            timeLimit: 30,
            options: [
                { text: '', isCorrect: false },
                { text: '', isCorrect: false },
            ],
        },
        resolver: zodResolver(CreateQuizQuestionFormSchema),
    });

    const { fields, append, remove } = useFieldArray({
        control,
        name: 'options',
    });

    const onSubmit = (data: CreateQuizQuestionForm) => {
        console.log({
            ...data,
            // In case the backend expects correctOptions as indexes only
            // correctOptions: data.correctOptions,
        });
        console.log(errors);
    };

    // const selectedCorrectOptions = watch('correctOptions', []);

    return (
        <div className="max-w-xl mx-auto p-4">
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
                        <div key={field.id} className="flex items-center gap-2 mb-2">
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
                    ))}
                    {errors.options && (
                        <p className="text-red-500">{errors.options.message as string}</p>
                    )}
                    {/* {errors.correctOptions && (
                        <p className="text-red-500">{errors.correctOptions.message}</p>
                    )} */}
                    {errors.options && (
                        <p className="text-red-500">{errors?.options?.root?.message as string}</p>
                    )}
                    <button
                        type="button"
                        onClick={() => append({ text: '', isCorrect: false })}
                        className="btn"
                    >
                        Add Option
                    </button>
                </div>

                <button type="submit" className="btn-primary" onClick={() => console.log(errors)}>
                    Save
                </button>
            </form>
        </div>
    );
}
