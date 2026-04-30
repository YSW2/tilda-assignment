export type MedicalStats = {
    명세서청구건수: number;
    '보험자부담금(선별포함)': number;
    '요양급여비용총액(선별포함)': number;
    의료기관종별: string;
    입내원일수: number;
    '진료과목(표시과목)': string;
    진료년도: number;
    환자수: number;
};

export type Params = {
    page: number;
    perPage: number;
};
