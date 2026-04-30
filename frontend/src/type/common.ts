export type OpenApiResponse<T> = {
    currentCount: Number;
    data: T[];
    matchCount: Number;
    page: Number;
    perPage: Number;
    totalCount: Number;
};
