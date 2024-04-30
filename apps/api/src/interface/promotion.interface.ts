export interface IPromotion {
    promotion_name: string;
    discount: number;
    usage_limit: number;
    start_date: Date;
    end_date: Date;
}