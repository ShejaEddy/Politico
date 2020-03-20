import sgMail from '@sendgrid/mail';
import { sendVerificationEmail } from '../../src/utils/verificationHelpers';

require('dotenv').config();

const dynamicTemplateData = {
	entity_name: 'Students safety',
	entity_title: 'TCM',
	entity_platform: 'ShuriBus',
  subject: 'Shuri account activation'
}
const to = 'shejaeddy50@gmail.com';
const data = {
  to,
  from: process.env.SHURI_EMAIL || "shuribuscompany@gmail.com",
  subject: dynamicTemplateData.subject,
  templateId: process.env.SHURI_EMAIL_TEMPLATE_ID ||  'd-215821c91662452f985b69b872e060b7',
  dynamicTemplateData,
  mail_settings: {
    sandbox_mode: {
      enable: true
    }
  },
  hideWarnings : true
}

jest.mock('@sendgrid/mail', () => {
  return {
    setApiKey: jest.fn(),
    send: jest.fn()
  };
});

describe("SendVerificationEmail", ()=>{
  afterEach(() => {
    jest.resetAllMocks();
    jest.restoreAllMocks();
  });
  it('should send Message and with specific values', async () => {
    const mResponse = 'Message successfully sent!';
    sgMail.send.mockResolvedValueOnce(mResponse);
    await sendVerificationEmail(to, dynamicTemplateData)
    .then(response=>expect(response).toEqual(mResponse))
    expect(sgMail.send).toBeCalledWith(data);
  });

  it('should not send Message and reject error', () => {
    const mError = new Error('Message not sent!');
    sgMail.send.mockRejectedValueOnce(mError);
    return sendVerificationEmail(to, dynamicTemplateData)
    .catch(error=>expect(error).toEqual(expect.objectContaining({error: mError.toString()})))
  });
})
