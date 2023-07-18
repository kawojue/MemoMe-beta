import jwt, { Secret } from 'jsonwebtoken'

const genToken = (user: string): Secret => {
    const token: Secret = jwt.sign(
        { "user": user },
        process.env.JWT_SECRET as string,
        { expiresIn: '90d' }
    )
    return token
}

export default genToken