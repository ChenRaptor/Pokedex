const errorPossibilities = {
    "401": "Unauthorized",
    "403": "Forbidden",
    "404": "Not found",
    "405": "Method not allowed",
    "409": "Conflict, the resource already exists",
    "415": "Problems in the request headers",
    "500": "Internal server error",
}

export const handleApiFetchErrors = async<T>(fn: () => Promise<T>) => {
    try {
        return await fn();
    } catch (error: unknown) {
        if (error instanceof Error) {
            const errorText = errorPossibilities[error.message as keyof typeof errorPossibilities] ?? error.message;
            return { error: errorText };
        }

        if (typeof error === "string") {
            return { error: error };
        }

        return { error: "Unknown error" };
    }
}

export default handleApiFetchErrors;