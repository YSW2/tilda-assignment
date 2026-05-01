export type OpenApiResponse<T> = {
    currentCount: number;
    data: T[];
    matchCount: number;
    page: number;
    perPage: number;
    totalCount: number;
};
