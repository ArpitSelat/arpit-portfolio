# Gmail App Password Setup Guide

Follow these steps to enable email functionality for your portfolio contact form.

## Step 1: Enable 2-Factor Authentication

1. **Go to Google Account Settings**
   - Visit: https://myaccount.google.com/
   - Or go to Gmail → Click your profile picture → "Manage your Google Account"

2. **Navigate to Security**
   - Click on "Security" in the left sidebar
   - Or go directly to: https://myaccount.google.com/security

3. **Enable 2-Step Verification**
   - Look for "2-Step Verification" section
   - Click "2-Step Verification"
   - Follow the setup process:
     - Enter your phone number
     - Choose verification method (SMS or Voice call)
     - Enter the verification code you receive
     - Confirm setup

## Step 2: Generate App Password

1. **Access App Passwords**
   - After enabling 2-Step Verification, go back to Security page
   - Look for "App passwords" section
   - Click "App passwords"
   - You may need to sign in again

2. **Create New App Password**
   - Click "Select app" dropdown → Choose "Other (Custom name)"
   - Type: "Portfolio Website" or "Contact Form"
   - Click "Generate"

3. **Copy the App Password**
   - Google will show a 16-character password (like: abcd efgh ijkl mnop)
   - **IMPORTANT**: Copy this password immediately - you won't see it again!

## Step 3: Update Your Server Configuration

1. **Open server.js file**
2. **Find this section around line 12:**
   ```javascript
   const emailConfig = {
     service: 'gmail',
     auth: {
       user: 'arpitselat@gmail.com',
       pass: 'your-app-password'     // Replace this line
     }
   };
   ```

3. **Replace the password:**
   - Change `'your-app-password'` to your actual app password
   - Example: `pass: 'abcd efgh ijkl mnop'`
   - Keep the quotes around the password

4. **Save the file**

## Step 4: Test Your Contact Form

1. **Restart your server:**
   - Stop current server (Ctrl+C in terminal)
   - Run: `node server.js`

2. **Test the contact form:**
   - Go to http://localhost:8000
   - Fill out the contact form
   - Submit the form
   - Check your Gmail inbox for the message

## Security Notes

- ✅ App passwords are safer than using your regular Gmail password
- ✅ You can revoke app passwords anytime from Google Account settings
- ✅ Each app password is unique and tied to a specific application
- ⚠️ Never share your app password with anyone
- ⚠️ Don't commit the app password to version control (GitHub, etc.)

## Troubleshooting

### "Username and Password not accepted" Error
- Double-check the app password (no spaces, correct characters)
- Make sure 2-Step Verification is enabled
- Try generating a new app password

### Still Not Working?
- Check if "Less secure app access" is disabled (it should be)
- Verify the email address is correct: arpitselat@gmail.com
- Check server console for detailed error messages

### Alternative: Use EmailJS (No Server Setup Required)
If you prefer not to use server-side email, you can use EmailJS:
- Visit: https://www.emailjs.com/
- Create free account
- Follow their setup guide for contact forms
- No app passwords or server configuration needed

---

**Need Help?** 
- If you encounter any issues, check the console output when starting your server
- All contact messages are saved to `contact-messages.json` regardless of email setup
