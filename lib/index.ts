export const fetcher = async (params: any) => {
    const { url, body, headers, options } = typeof (params) === 'object' ? params : { url: params, body: undefined, headers: undefined, options: undefined }
    const res = await fetch(url, {
        method: body ? 'POST' : 'GET',
        body: body ? JSON.stringify(body) : undefined,
        headers: headers,
        ...options
    })
    const data = await res.json()
    return data?.data ?? data?.hits
}

export const toLocale = (number: number, digit = 2) => {
    return Number(number)?.toLocaleString(undefined, { minimumFractionDigits: digit, maximumFractionDigits: digit })
}

export const api = async (input: RequestInfo | URL, init?: RequestInit | undefined, mode?: '' | 'raw') => {
    const response = await fetch(input, init)
    const json = await response.json()
    if (mode === 'raw') return json
    if (json?.resCode !== '200') return { data: {}, error: json?.resCode || 'EXX', resDesc: json?.resDesc }
    return { data: json?.data, resCode: json?.resCode }
}

export const addDashes = (f: string) => {
    const f_val = f?.replace(/\D[^\.]/g, "");
    f = f_val?.slice(0, 3) + "-" + f_val?.slice(3, 6) + "-" + f_val?.slice(6)
    return f
}