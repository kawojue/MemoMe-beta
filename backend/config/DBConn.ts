import mongooose from 'mongoose'

const dbConn = async (DB_URI: string) => {
    try {
        await mongooose.connect(DB_URI)
    } catch (err: any) {
        console.log(new Error('Connection failed!'))
    }
}

export default dbConn