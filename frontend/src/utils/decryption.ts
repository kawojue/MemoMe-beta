const crypt = require('text-encryption')

const decrypt = (content: string) => {
    const text: string = crypt.decrypt(content, process.env.STRING_KEY)
    return text
}

export default decrypt