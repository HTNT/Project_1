


export default interface IPagintion<T> {
    total: number;
    page: number;
    pageSize: number;
    item: T[];
}


