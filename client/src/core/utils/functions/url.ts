export const getAbsoluteUrl = (url: string) => {

    if (url.startsWith('http')) return url

    if(typeof window === 'undefined') return `${process.env['BASE_URL']}/${url}`
    else return `${window.location.origin}/${url}`
}