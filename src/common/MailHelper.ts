import { createTransport } from "nodemailer";
import * as Config from "../constants/Config";
import { HandlebarHelper } from "./HandlebarHelper";
import { Props } from "../constants/Props";
export class MailHelper {
  public static async SendMail(
    to: string,
    subject: string,
    htmlPage: string,
    renderData?: any
  ) {
    let transporter = MailHelper.CreateEmailAccount();
    const mailOptions = {
      from: Config.mailOptions.user,
      to: to,
      subject: subject,
      html: HandlebarHelper.HtmlRender(htmlPage, {
        data: renderData,
      }),
    };
    return new Promise((resolve, reject) => {
      transporter.sendMail(mailOptions, (err: any, info: any) => {
        console.log(info);
        if (err) {
          reject(err);
        }
        resolve({
          message: Props.EMAIL_SENT_SUCCESSFULLY,
        });
      });
    });
  }

  private static transport: any = null;
  public static CreateEmailAccount() {
    if (!this.transport) {
      this.transport = createTransport({
        host: Config.mailOptions.host,
        port: Config.mailOptions.port,
        secure: true,
        requireTLS: true,
        auth: {
          user: Config.mailOptions.user,
          pass: Config.mailOptions.pass,
        },
      });
    }
    return this.transport;
  }
}
