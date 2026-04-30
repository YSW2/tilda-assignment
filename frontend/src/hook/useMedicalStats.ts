import { useQuery } from '@tanstack/react-query';
import type { Params } from '../type/medicalStats';
import { getMedicalStats } from '../api/medical';

const useMedicalStats = ({ page, perPage }: Params) => {
    const query2023 = useQuery({
        queryKey: ['medicalStats', 2023, page, perPage],
        queryFn: () => getMedicalStats(page, perPage, 2023),
    });

    const query2024 = useQuery({
        queryKey: ['medicalStats', 2024, page, perPage],
        queryFn: () => getMedicalStats(page, perPage, 2024),
    });

    const combinedData = [...(query2023.data?.data || []), ...(query2024.data?.data || [])];

    return {
        data: combinedData,
        isLoading: query2023.isLoading || query2024.isLoading,
        isError: query2023.isError || query2024.isError,
    };
};

export default useMedicalStats;
