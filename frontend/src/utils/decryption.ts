const crypt = require('text-encryption')

const decrypt = (content: string): string => crypt.decrypt(content, process.env.NEXT_PUBLIC_STRING_KEY)

export default decrypt