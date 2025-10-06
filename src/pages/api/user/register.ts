import type { APIContext } from "astro";
import { prisma } from "../../../lib/db";
import { z } from "zod";
import { create_cookie, create_response, generate_id, generate_verification_token } from "../../../lib/api_helper";
import nodemailer from "nodemailer";

const PostType = z.object({
  email: z.string(),
});

export async function POST({ request }: APIContext): Promise<Response> {
  // Get the body response
  const body = await (async () => {
    try {
      return await request.json();
    } catch (err) {
      return false;
    }
  })();

  if (!body) return create_response({ status: 400 });

  // Verify the body;
  const result = PostType.safeParse(body);
  if (!result.success) {
    return create_response({ status: 400 });
  }

  // Get the email from user
  const email = result.data.email;

  // Check into the database
  const user_data = await prisma.users.findUnique({
    where: {
      email: email,
    },
  });

  // Verify if the user exists
  if (user_data) return create_response({ status: 409 });

  //? If the email is not exists, progress to verification process
  // Create user ID and verification token
  const generated_id: string = generate_id();
  const generated_verification_token: string = generate_verification_token();

  // Send the email
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: import.meta.env.GMAIL_APP_EMAIL, // app email
      pass: import.meta.env.GMAIL_APP_PASSWORD, // app password
    },
  });

  const mailOptions = {
    from: 'G.A.I.A TEAM <no-reply@gaia.com>',
    to: email,
    subject: "Action Required: confirm to continue registration process",
    html: `
      <div style="font-family: Arial, sans-serif; color: #333; padding-top: 48px; padding-bottom: 48px; background-color: #ccc">
        <div style="background-color: #eee; max-width: 480px; padding: 24px; margin: auto; border-radius: 8px;">
          <h2 style="color: #00c252;">Verify your email</h2>
          <p>We, GAIA team, welcome you to use our system!</p>
          <p>Thanks for signing up for <strong>GAIA</strong>! Please, confirm your email address by using the token below:</p>
          <div style="font-size: 28px; font-weight: bold; letter-spacing: 5px; background: #f4f4f4; padding: 16px; text-align: center; border-radius: 8px; margin: 20px 0;">
            ${generated_verification_token}
          </div>
          <p>If you didn't request this, you can safely ignore this message.</p>
          <hr style="margin-top: 24px;">
          <p style="font-size: 12px; color: #888;">© ${new Date().getFullYear()} GAIA. All rights reserved.</p>
        </div>
      </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error("Error sending email:", error);
  }

  // Save the token to the database
  await prisma.users.create({
    data: {
      id: generated_id,
      email: email,
      verification_token: generated_verification_token
    },
  });

  // Save the token to the cookie
  const generated_cookie = create_cookie({ name: "email_token", value: email });

  // Return the result with the genrated cookie
  return create_response({
    body: {
      email: email,
    },
    cookie: generated_cookie,
  });
}
