export function generateOtp() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

export function getOtpHtml(otp,username) {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Verify Your Email</title>
</head>
<body style="margin:0; padding:0; background-color:#0a0a0a; font-family: Arial, Helvetica, sans-serif;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#0a0a0a; padding:40px 0;">
    <tr>
      <td align="center">
        <table role="presentation" width="480" cellpadding="0" cellspacing="0" style="background-color:#141414; border:1px solid #262626; border-radius:16px; overflow:hidden;">

          <!-- Header -->
          <tr>
            <td style="padding:36px 40px 8px; text-align:center;">
              <table role="presentation" cellpadding="0" cellspacing="0" style="margin:0 auto 20px;">
                <tr>
                  <td style="width:52px; height:52px; border-radius:14px; background:linear-gradient(135deg, #2dd4bf 0%, #22c55e 100%); text-align:center; vertical-align:middle;">
                    <span style="font-size:24px; line-height:52px;">🔒</span>
                  </td>
                </tr>
              </table>
              <h1 style="margin:0; color:#ffffff; font-size:26px; font-weight:700;">Welcome back</h1>
              <p style="margin:8px 0 0; color:#a3a3a3; font-size:14px;">Verify your email to continue</p>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:32px 40px 8px;">
              <p style="margin:0 0 24px; font-size:15px; line-height:22px; color:#a3a3a3;">
                Hi ${username},<br><br>
                Use the one-time code below to verify your email address. This code will expire in <strong style="color:#e5e5e5;">10 minutes</strong>.
              </p>

              <!-- OTP -->
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td align="center" style="padding:8px 0 24px;">
                    <span style="font-size:36px; font-weight:700; letter-spacing:10px; color:#ffffff;">
                      ${otp}
                    </span>
                  </td>
                </tr>
              </table>

              <p style="margin:0 0 8px; font-size:13px; line-height:20px; color:#737373;">
                If you didn't request this code, you can safely ignore this email — no changes will be made to your account.
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding:20px 40px 32px; text-align:center; border-top:1px solid #262626;">
              <p style="margin:16px 0 0; font-size:12px; color:#525252;">
                &copy; 2026 Chetan Ravish, Inc. All rights reserved.<br>
                123 Business Street, Haryana, India
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>

`;
}

