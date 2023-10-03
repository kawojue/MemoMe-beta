import { IMailer } from '../type'
import transporter from '../config/mailTransport'

export default async function mailer({ senderName, to, subject, text }: IMailer): Promise<void> {
  await transporter.sendMail({
    from: `${senderName} <${process.env.EMAIL}>`,
    to,
    subject,
    html: text,
  })
}