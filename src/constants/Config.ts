import "reflect-metadata";
const dotenv = require("dotenv").config();

export let PORT = process.env.SERVER_PORT;
export let HOST = process.env.HOST;
export let API_URL = process.env.API_URL;

export const otpExpiry = 300000;

export let mailOptions: any = {
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  user: process.env.SMTP_USER,
  pass: process.env.SMTP_PASS,
};

export const setEnvConfig = () => {
  let envData: any = process.env.ENV_TEST;
  if (envData) {
    envData = JSON.parse(envData);
  }
};
