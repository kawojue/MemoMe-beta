import { formatDistanceToNow, parseISO } from "date-fns"

const getPeriod = (timestamp: string): string => {
    let period: string = ''
    if (timestamp) {
        const date: Date = parseISO(timestamp)
        const timePeriod: string = formatDistanceToNow(date)
        period = `${timePeriod} ago..`
    }
    return period
}

export default getPeriod