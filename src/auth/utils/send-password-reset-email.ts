import * as nodemailer from 'nodemailer';
import * as config from 'config';
import {Base64} from 'js-base64';
import {Logger} from '@nestjs/common';

const emailConfig = config.get('emailConfig');

export const sendPasswordResetEmail = async (email: string, token: string, link?: string): Promise<boolean> => {
    try {
        const transporter = nodemailer.createTransport({
            host: emailConfig.host,
            port: emailConfig.port,
            auth: {
                user: emailConfig.hostUser,
                pass: emailConfig.hostPassword,
            },
        });

        await transporter.sendMail({
            from: emailConfig.from,
            to: email,
            subject: 'Active Citizen - Password Reset',
            html: passwordResetEmailHtml(Base64.encode(email, true), token, link)
        });

        return true;

    } catch (e) {
        new Logger().error(e);
        return false;
    }

};


/** HTML */
const passwordResetEmailHtml = (email:string, token: string, link?: string): string => {
    return `<!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8"/>
                <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
                <meta http-equiv="X-UA-Compatible" content="ie=edge"/>
                <title>Active Citizen</title>
            </head>
            
            <body style="text-align: center; color: #717070; font-weight: bold;">
            
            <h1>Active Citizen</h1>
            
            <h2>Password reset</h2>
            
            <h3>Click the button to reset your password</h3>
            
            <!-- Button -->
            <table width="100%" border="0" cellspacing="0" cellpadding="0">
                <tr>
                    <td>
                        <div>
                            <a href="http://localhost:4200/auth/password/reset/confirm/${email}/${token}"
                               style="background-color: #334A7C; color: #ffffff; display:inline-block; font-family:sans-serif; font-size:14px;
                                       line-height:50px; text-align:center; text-decoration:none; width:200px; -webkit-text-size-adjust:none; mso-hide:all;">
                                Reset Password
                            </a>
                        </div>
                    </td>
                </tr>
            </table>
            
            <p>
                If you are unable to click the button, please copy and paste the below link into the address bar of your web browser.
            </p>
            
            <p id='link' style="color: #1f5cce; font-size: 14px;">
                http://localhost:4200/auth/password/reset/confirm/${email}/${token}
            </p>
            
            <br><br>
            
            <p>
                If you didn't registering with this address, you can ignore this email.
            </p>
            <p>
                Thanks!
            </p>
            
            </body>
            </html>`;
};

