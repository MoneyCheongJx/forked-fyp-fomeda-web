import dayjs from "dayjs";

export class DateTimeUtils {
    static readonly DEFAULT_DATE_FORMAT = "YYYY-MM-DD";
    static readonly DEFAULT_DATE_TIME_FORMAT = "YYYY-MM-DD HH:mm:ss";
    static readonly CATEGORY_DATE_FORMAT = "DD MMM YYYY"

    static formatDate(date: Date, format: string = DateTimeUtils.DEFAULT_DATE_FORMAT): string {
        if (!date) return "";
        return dayjs(date).format(format);
    }
}
