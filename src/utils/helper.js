const truncateMiddle = (str, start = 7, end = 7, ellipsis = '...') => {
    if (!str || typeof str !== 'string') return ''

    const startStr = str.slice(0, start)
    const endStr = str.slice(-end)

    return `${startStr}${ellipsis}${endStr}`
}

export { truncateMiddle }