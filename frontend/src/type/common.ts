import type { MedicalStats } from './medicalStats';

export type OpenApiResponse = {
    currentCount: Number;
    data: MedicalStats[];
    matchCount: Number;
    page: Number;
    perPage: Number;
    totalCount: Number;
};
