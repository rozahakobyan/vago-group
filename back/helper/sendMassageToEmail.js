import nodemailer from "nodemailer";
import {SMTPClient} from "emailjs";
const { INFO_EMAIL, APP_PASS, MYSQL_HOST } = process.env;

async function sendMassageToEmail(from, pass, html) {
    try {

        console.log('Massage email sent successfully!');
    } catch (error) {
        console.error('Error sending massage:', error);
    }
}

export default sendMassageToEmail;