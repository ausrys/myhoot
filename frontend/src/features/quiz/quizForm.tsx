import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { CreateQuizSchema, type CreateQuizInput } from '../../validators/zod/quiz.validator';
import { useNavigate } from 'react-router';
import { createQuiz } from './quizAPI';

const QuizForm = () => {
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<CreateQuizInput>({
        resolver: zodResolver(CreateQuizSchema),
    });
    const onSubmit: SubmitHandler<CreateQuizInput> = async (data) => {
        try {
            await createQuiz(data);
            navigate('/quiz'); // redirect to quiz list
        } catch (err) {
            console.error('Failed to create quiz', err);
        }
    };
    return (
        <div className="max-w-xl mx-auto p-4">
            <h1 className="text-2xl font-semibold mb-4">Create New Quiz</h1>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div>
                    <label className="block font-medium">Title</label>
                    <input {...register('title')} className="w-full border p-2 rounded" />
                    {errors.title && <p className="text-red-500">{errors.title.message}</p>}
                </div>

                <div>
                    <label className="block font-medium">Description</label>
                    <textarea {...register('description')} className="w-full border p-2 rounded" />
                    {errors.description && (
                        <p className="text-red-500">{errors.description.message}</p>
                    )}
                </div>
                <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
                    Create Quiz
                </button>
            </form>
        </div>
    );
};

export default QuizForm;
