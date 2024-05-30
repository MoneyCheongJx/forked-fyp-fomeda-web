export class DateTimeUtils {
    static formatDate(date: Date): string {
        if(!date) return ""
        return new Date(date).toLocaleDateString("en-UK", {
            day: "numeric",
            month: "short",
            year: "numeric",
        })
    }
}