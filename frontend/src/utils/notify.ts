import { toast } from "react-hot-toast"

const notify = (action: string, msg: string) => {
    if (action === "success") {
        toast.success(msg, {
            duration: 2300
        })
    }

    if (action === "error" || action === "warning") {
        toast.error(msg, {
            duration: 3200
        })
    }
}

export default notify