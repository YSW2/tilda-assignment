import type { OpenApiResponse } from '../type/common';
import type { MedicalStats } from '../type/medicalStats';
import { openapiClient } from '../utils/axios';

const yearApiUrlMap = new Map([
    [2023, '/15139382/v1/uddi:5a09990b-4f58-43ea-a59d-fae7b5ec72a3'],
    [2024, '/15139382/v1/uddi:638707af-cc4b-48e5-9ff8-938aae8b637a'],
]);

export const getMedicalStats = async (
    page: number,
    perPage: number,
    year: number,
): Promise<OpenApiResponse<MedicalStats>> => {
    const url = yearApiUrlMap.get(year);
    if (!url) throw new Error(`Invalid year: ${year}`);

    const res = await openapiClient.get(url, {
        params: { page, perPage },
    });

    return res.data;
};
