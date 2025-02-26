/* eslint-disable @typescript-eslint/no-unused-vars */
export function classNames(...classes : string[]) {
    return classes.filter(Boolean).join(' ')
}

export function isValidUrl(url: string){
    try {
        new URL(url)
        return url
    } catch (error) {
        return false
    }
}