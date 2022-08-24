export const capitalizeFirstLetter = ([first, ...rest]: any, locale = navigator.language) =>
    first === undefined ? '' : first.toLocaleUpperCase(locale) + rest.join('')