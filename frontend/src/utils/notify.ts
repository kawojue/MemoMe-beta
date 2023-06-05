import { toast } from "react-hot-toast"

const notify = (action: string, msg: string) => {
    if (action === "success") {
        toast.success(msg, {
            duration: 1900
        })
    }

    if (action === "error" || action === "warning") {
        toast.error(msg, {
            duration: 2300
        })
    }
}

export default notify