export class StringUtils {
    /**
     * convert string to Title Case (E.g. Fomeda System)
     * @param str string to be converted to Title case
     * @param separator default as space
     */
    static formatTitleCase(str: string, separator = " "): string {
        if (!str) return ""
        return str.toLowerCase()
            .split(separator)
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" ");
    }

    static formatLowerCase(str: string, separator = " "): string {
        if (!str) return ""
        return str.toLowerCase()
            .split(separator)
            .join(" ");
    }
}