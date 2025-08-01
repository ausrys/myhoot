export const formatZodErrors = (error) => {
    const formatted = {};
    for (const issue of error.issues) {
        const key = issue.path.join('');
        formatted[key] = issue.message;
    }
    return formatted;
};
