export const sorting = (field: string, value: string) => {
    const formatField = [`1${field}`, `0${field}`, `${field}`];
    return value === formatField[0] ? formatField[1] : value === formatField[1] ? formatField[2] : formatField[0];
}

export const sortingView = (field: string, sort: string): string | undefined => {
    const format = sort.replace(field,'');

    if(format.length < 2) {
        return format
    }

    return undefined;
};
