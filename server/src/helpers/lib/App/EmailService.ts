import nodemailer from 'nodemailer'
import ejs from 'ejs';
import { EMAIL_PASSWORD, EMAIL, EMAIL_HOST, EMAIL_PORT, UserRole } from '../../constants';
import path from 'path';

const transporter = nodemailer.createTransport({
  host: EMAIL_HOST,
  // host: 'mail.genzifyafrica.com',
  port: EMAIL_PORT,
  // port: 587,
  service: 'yahoo',
  secure: true,
  auth: {
    user: EMAIL,
    pass: EMAIL_PASSWORD
  },
})


export class EmailService {

  public async sendOTP(subject: string, recipient: string, name: string, otp: string) {
    const templatePath = path.join(__dirname, '../../../../../templates', 'verifyOTP.ejs');
    const htmlContent = await ejs.renderFile(templatePath, { otp, client_name: name });
    try {
      await transporter.sendMail({
        subject: subject,
        from: EMAIL,
        to: recipient,
        html: htmlContent
      })
      console.log('email sent successfully')
    }catch (e) {
      //do nth
      console.log(e, 'email error')
    }
  }

  public async welcome(subject: string, recipient: string, name: string,) {
    const templatePath = path.join(__dirname, '../../../../../templates', 'welcome.ejs');
    const htmlContent = await ejs.renderFile(templatePath, { client_name: name });
    try {
      await transporter.sendMail({
        subject: subject,
        from: EMAIL,
        to: recipient,
        html: htmlContent
      })
      console.log('email sent successfully')
    }catch (e) {
      //do nth
      console.log(e, 'email error')
    }
  }

  public async userCredentials(subject: string, recipient: string, name: string, username: string, password: string, role: UserRole) {
    const templatePath = path.join(__dirname, '../../../../../templates', 'userCredentials.ejs');
    const htmlContent = await ejs.renderFile(templatePath, { client_name: name, role, password, username });
    try {
      await transporter.sendMail({
        subject: subject,
        from: EMAIL,
        to: recipient,
        html: htmlContent
      })
      console.log('email sent successfully')
    }catch (e) {
      //do nth
      console.log(e, 'email error')
    }
  }

  public async meetCredentials(subject: string, recipient: string, name: string, meet_link: string, password: string, topic: string, date: string) {
    const templatePath = path.join(__dirname, '../../../../../templates', 'meetingBooked.ejs');
    const htmlContent = await ejs.renderFile(templatePath, { client_name: name, meet_link, password, topic, date });
    try {
      await transporter.sendMail({
        subject: subject,
        from: EMAIL,
        to: recipient,
        html: htmlContent
      })
      console.log('email sent successfully')
    }catch (e) {
      //do nth
      console.log(e, 'email error')
    }
  }
}
