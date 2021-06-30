import nodemailer from 'nodemailer'

class MailService {
    transporter;

    constructor() {
        console.log(process.env.SMTP_HOST)
        this.transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: 587,
            secure: false,
            auth: {
                user: "grant213212132@gmail.com",
                pass: "31102000g",
            },
        })
    }


    async sendActivationMail(to, link) {
        try {
            await this.transporter.sendMail({
                from: process.env.SMTP_USER,
                to,
                subject: "Активация аккаунта на: " + process.env.API_URL,
                html:
                    `
                    <div>
                        <h1>Для активации перейдите по ссылке</h1>
                        <a href="${link}">${link}</a>
                    </div>
                `
            })
        }  catch(e) {
            console.log(e)
        }

    }
}

export default new MailService()