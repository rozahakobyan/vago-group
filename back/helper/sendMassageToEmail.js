import nodemailer from "nodemailer";

const { INFO_EMAIL, APP_PASS } = process.env;

async function sendMassageToEmail(from, html) {
    try {
        let transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: INFO_EMAIL,
                pass: APP_PASS,
            },
        });

        // Email content
        let mailOptions = {
            from: from,
            to: INFO_EMAIL,
            subject: 'History to Our Application',
            html: html
        };
   
        await transporter.sendMail(mailOptions);
        console.log('Massage email sent successfully!');
    } catch (error) {
        console.error('Error sending massage:', error);
    }
}

export default sendMassageToEmail;