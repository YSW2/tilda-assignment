import type { OpenApiResponse } from '../type/common';
import type { MedicalStats } from '../type/medicalStats';
import { openapiClient } from '../utils/axios';

export const getMedicalStats2023 = async (
    page: number,
    perPage: number,
): Promise<OpenApiResponse<MedicalStats>> => {
    const res = await openapiClient.get('/15139382/v1/uddi:5a09990b-4f58-43ea-a59d-fae7b5ec72a3', {
        params: { page, perPage },
    });

    return res.data;
};

export const getMedicalStats2024 = async (
    page: number,
    perPage: number,
): Promise<OpenApiResponse<MedicalStats>> => {
    const res = await openapiClient.get('/15139382/v1/uddi:638707af-cc4b-48e5-9ff8-938aae8b637a', {
        params: { page, perPage },
    });

    return res.data;
};
