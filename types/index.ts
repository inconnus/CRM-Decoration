interface UseSWRScrollOption {
    limit?: number
    onIntersection?: (number: number) => void
    params?: any
    pause?: boolean
}