import sendGrid from "@sendgrid/mail";
import dotenv from "dotenv";
import { okResponse } from "./response"

dotenv.config();
const { SENDGRID_KEY } = process.env;

sendGrid.setApiKey(SENDGRID_KEY);

export default (res, to, data) => {
  const msg = {
    method: "POST",
    path: "/v3/mail/send",
    to,
    from: "politico@gmail.com",
    subject: "Politico sent you a Reset Password token",
    text: `Hello ${data.name}, <br> http://localhost:3000/api/v1/auth/reset_password?token=${data.token}&email=${to} You requested for a password reset click here
       <button type="submit" style="background:black; color:white; padding:0.5em; border:0; border-radius:4px">Reset My password</button></form>`,
    mail_settings: {
      sandbox_mode: {
        enable: process.env.NODE_ENV === "test"
      }
    },
    // hideWarnings: true
  };
  return sendGrid.send(msg).then(()=>
    okResponse(res, email, "Check your email for password reset link"))
  .catch(err => {
    // eslint-disable-next-line no-throw-literal
    throw { error: err.toString(), message: "Verification not sent" };
  });
};
