import { useQuery } from '@tanstack/react-query';
import { getMedicalStats } from '../api/medical';

interface Params {
    year: number;
    page: number;
    perPage: number;
}

const useMedicalStats = ({ page, perPage, year }: Params) => {
    const query = useQuery({
        queryKey: ['medicalStats', year, page, perPage],
        queryFn: () => getMedicalStats(page, perPage, year),
        //차트 깜빡임 방지용
        placeholderData: (prev) => prev,
    });

    return {
        data: query.data?.data || [],
        isLoading: query.isLoading,
        isError: query.isError,
        totalCount: Number(query.data?.totalCount || 0),
    };
};

export default useMedicalStats;
