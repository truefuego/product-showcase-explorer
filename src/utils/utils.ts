
export const camelCaseSpaceToHyphen = (str: string): string => {
    return str
        .replace(/\s+/g, '')
        .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
        .toLowerCase();
}
