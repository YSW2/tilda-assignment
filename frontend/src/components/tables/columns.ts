import type { ColumnDef } from '@tanstack/react-table';
import type { MedicalStats } from '../../type/medicalStats';

const columns: ColumnDef<MedicalStats>[] = [
    {
        accessorKey: '진료년도',
        header: '진료년도',
    },
    {
        accessorKey: '의료기관종별',
        header: '의료기관종별',
    },
    {
        accessorKey: '진료과목(표시과목)',
        header: '진료과목',
    },
    {
        accessorKey: '명세서청구건수',
        header: '명세서청구건수',
        cell: (info) => Number(info.getValue()).toLocaleString(),
    },
    {
        accessorKey: '보험자부담금(선별포함)',
        header: '보험자부담금',
        cell: (info) => Number(info.getValue()).toLocaleString(),
    },
    {
        accessorKey: '요양급여비용총액(선별포함)',
        header: '요양급여비용총액',
        cell: (info) => Number(info.getValue()).toLocaleString(),
    },
    {
        accessorKey: '환자수',
        header: '환자수',
        cell: (info) => Number(info.getValue()).toLocaleString(),
    },
    {
        accessorKey: '입내원일수',
        header: '입내원일수',
        cell: (info) => Number(info.getValue()).toLocaleString(),
    },
];
export default columns;
