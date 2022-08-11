export const getAbsoluteUrl = (url: string) => {

    if (url.startsWith('http')) return url
    else if (url.startsWith('/')) return `${process.env['BASE_URL']}${url}`
    else return `${process.env['BASE_URL']}/${url}`
}