
export const camelCaseSpaceToHyphen = (str: string): string => {
    return str
        .replace(/\s+/g, '')
        .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
        .toLowerCase();
}

export const formatDate = (isoString: string): string => {
  const date = new Date(isoString);
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
}
