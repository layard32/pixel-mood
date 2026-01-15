export function getApiUrl(): string {
    const baseUrl = import.meta.env.VITE_API_BASE_URL || '';
    return `${baseUrl}/entries`;
}

export function handleApiError(response: Response): void {
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
}