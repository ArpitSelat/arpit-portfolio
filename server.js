const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');
const querystring = require('querystring');
const nodemailer = require('nodemailer');

const port = process.env.PORT || 3000;

// Email configuration - UPDATE THESE WITH YOUR CREDENTIALS
const emailConfig = {
  service: 'gmail',
  auth: {
    user: 'selatarpit@gmail.com', // Your Gmail address
    pass: 'ozsc vorq kbwp gpbw'     // Generate this from Google Account Settings
  }
};

// Create nodemailer transporter
let transporter = null;
try {
  transporter = nodemailer.createTransporter(emailConfig);
  console.log('✅ Email transporter configured successfully');
  
  // Test email connection
  transporter.verify((error, success) => {
    if (error) {
      console.log('❌ Email verification failed:', error.message);
    } else {
      console.log('✅ Email server is ready to send messages');
    }
  });
} catch (error) {
  console.log('❌ Email transporter not configured:', error.message);
}

const mimeTypes = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'application/javascript',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.pdf': 'application/pdf',
  '.ico': 'image/x-icon'
};

const server = http.createServer((req, res) => {
  // Add CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.writeHead(200);
    res.end();
    return;
  }

  const parsedUrl = url.parse(req.url);
  let pathname = parsedUrl.pathname;

  // Handle contact form submission
  if (req.method === 'POST' && pathname === '/send-email') {
    let body = '';
    
    req.on('data', chunk => {
      body += chunk.toString();
    });
    
    req.on('end', () => {
      try {
        const formData = querystring.parse(body);
        
        // Email options
        const mailOptions = {
          from: formData.email,
          to: 'selatarpit@gmail.com',
          subject: `Portfolio Contact: ${formData.subject}`,
          html: `
            <h3>New message from your portfolio website</h3>
            <p><strong>Name:</strong> ${formData.name}</p>
            <p><strong>Email:</strong> ${formData.email}</p>
            <p><strong>Subject:</strong> ${formData.subject}</p>
            <p><strong>Message:</strong></p>
            <p>${formData.message.replace(/\n/g, '<br>')}</p>
            <hr>
            <p><small>Sent from your portfolio contact form</small></p>
          `
        };
        
        // Save message to file (backup method)
        const messageData = {
          timestamp: new Date().toISOString(),
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          message: formData.message
        };
        
        const messagesFile = path.join(__dirname, 'contact-messages.json');
        let messages = [];
        
        // Read existing messages
        try {
          if (fs.existsSync(messagesFile)) {
            const data = fs.readFileSync(messagesFile, 'utf8');
            messages = JSON.parse(data);
          }
        } catch (error) {
          console.log('Creating new messages file');
        }
        
        // Add new message
        messages.push(messageData);
        
        // Save to file
        fs.writeFileSync(messagesFile, JSON.stringify(messages, null, 2));
        console.log('Message saved to contact-messages.json');
        
        // Try to send email if configured
        if (transporter && emailConfig.auth.pass !== 'your-app-password') {
          transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
              console.error('Email sending failed:', error);
              res.writeHead(200, { 'Content-Type': 'application/json' });
              res.end(JSON.stringify({ 
                success: true, 
                message: 'Thank you for your message! It has been saved and I will get back to you soon. (Email delivery pending setup)' 
              }));
            } else {
              console.log('Email sent successfully:', info.response);
              res.writeHead(200, { 'Content-Type': 'application/json' });
              res.end(JSON.stringify({ 
                success: true, 
                message: 'Thank you for your message! I will get back to you soon.' 
              }));
            }
          });
        } else {
          // Email not configured, but message is saved
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ 
            success: true, 
            message: 'Thank you for your message! It has been received and saved. I will get back to you soon.' 
          }));
        }
        
      } catch (error) {
        console.error('Form processing error:', error);
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ 
          success: false, 
          message: 'Invalid form data' 
        }));
      }
    });
    
    return;
  }

  // Handle visitor tracking
  if (req.method === 'POST' && pathname === '/track-visitor') {
    let body = '';
    
    req.on('data', chunk => {
      body += chunk.toString();
    });
    
    req.on('end', () => {
      try {
        const visitorData = JSON.parse(body);
        
        // Save visitor data to file
        const visitorsFile = path.join(__dirname, 'visitors.json');
        let visitors = [];
        
        // Read existing visitors
        try {
          if (fs.existsSync(visitorsFile)) {
            const data = fs.readFileSync(visitorsFile, 'utf8');
            visitors = JSON.parse(data);
          }
        } catch (error) {
          console.log('Creating new visitors file');
        }
        
        // Add new visitor
        visitors.push(visitorData);
        
        // Keep only last 100 visitors to avoid large files
        if (visitors.length > 100) {
          visitors = visitors.slice(-100);
        }
        
        // Save to file
        fs.writeFileSync(visitorsFile, JSON.stringify(visitors, null, 2));
        console.log('Visitor tracked:', {
          timestamp: visitorData.timestamp,
          location: visitorData.location?.city + ', ' + visitorData.location?.country,
          browser: getBrowserInfo(visitorData.userAgent)
        });
        
        // Send email notification about new visitor
        if (transporter && emailConfig.auth.pass !== 'your-app-password') {
          const visitorMailOptions = {
            from: 'selatarpit@gmail.com',
            to: 'selatarpit@gmail.com',
            subject: '🔔 New Portfolio Visitor Alert!',
            html: `
              <h2>🎯 Someone visited your portfolio!</h2>
              
              <div style="background: #e8f5e8; padding: 15px; border-radius: 8px; margin: 10px 0; border-left: 4px solid #4caf50;">
                <h3>📍 Location Information:</h3>
                <p><strong>🌍 Country:</strong> ${visitorData.location?.country || 'Unknown'}</p>
                <p><strong>🏙️ City:</strong> ${visitorData.location?.city || 'Unknown'}</p>
                <p><strong>🌐 IP Address:</strong> ${visitorData.location?.ip || 'Unknown'}</p>
                <p><strong>🏢 ISP:</strong> ${visitorData.location?.isp || 'Unknown'}</p>
              </div>
              
              <div style="background: #e3f2fd; padding: 15px; border-radius: 8px; margin: 10px 0;">
                <h3>💻 Device Information:</h3>
                <p><strong>🖥️ Browser:</strong> ${getBrowserInfo(visitorData.userAgent)}</p>
                <p><strong>🌐 Language:</strong> ${visitorData.language}</p>
                <p><strong>📱 Platform:</strong> ${visitorData.platform}</p>
                <p><strong>📺 Screen:</strong> ${visitorData.screen.width}x${visitorData.screen.height}</p>
                <p><strong>🔗 Referrer:</strong> ${visitorData.referrer}</p>
              </div>
              
              <div style="background: #fff3e0; padding: 15px; border-radius: 8px; margin: 10px 0;">
                <h3>⏰ Visit Details:</h3>
                <p><strong>🕒 Time:</strong> ${new Date(visitorData.timestamp).toLocaleString()}</p>
                <p><strong>🌍 Timezone:</strong> ${visitorData.timezone}</p>
                <p><strong>📱 Online:</strong> ${visitorData.onlineStatus ? 'Yes' : 'No'}</p>
                <p><strong>🍪 Cookies:</strong> ${visitorData.cookiesEnabled ? 'Enabled' : 'Disabled'}</p>
              </div>
              
              <div style="background: #f3e5f5; padding: 15px; border-radius: 8px; margin: 10px 0;">
                <h3>📊 Portfolio Analytics:</h3>
                <p><strong>📈 Total Visitors:</strong> ${visitors.length}</p>
                <p>🤝 This might be a potential client or collaborator!</p>
              </div>
              
              <p style="margin-top: 20px; color: #666; font-size: 12px;">
                📊 This notification was sent automatically from your portfolio visitor tracking system.
              </p>
            `
          };
          
          transporter.sendMail(visitorMailOptions, (error, info) => {
            if (error) {
              console.error('Visitor notification email failed:', error);
            } else {
              console.log('Visitor notification email sent successfully');
            }
          });
        }
        
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ 
          success: true,
          totalVisitors: visitors.length
        }));
        
      } catch (error) {
        console.error('Visitor tracking error:', error);
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ 
          success: false, 
          message: 'Invalid visitor data' 
        }));
      }
    });
    
    return;
  }

  // Handle visitor count request
  if (req.method === 'GET' && pathname === '/visitor-count') {
    try {
      const visitorsFile = path.join(__dirname, 'visitors.json');
      let visitorCount = 0;
      
      if (fs.existsSync(visitorsFile)) {
        const data = fs.readFileSync(visitorsFile, 'utf8');
        const visitors = JSON.parse(data);
        visitorCount = visitors.length;
      }
      
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ 
        count: visitorCount,
        success: true
      }));
      
    } catch (error) {
      console.error('Error getting visitor count:', error);
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ 
        count: 0,
        success: false
      }));
    }
    
    return;
  }

  // Default to index.html for root path
  if (pathname === '/') {
    pathname = '/index.html';
  }

  const filePath = path.join(__dirname, pathname);
  const extname = path.extname(filePath);
  const contentType = mimeTypes[extname] || 'text/plain';

  fs.readFile(filePath, (error, content) => {
    if (error) {
      if (error.code === 'ENOENT') {
        res.writeHead(404, { 'Content-Type': 'text/html' });
        res.end('<h1>404 - File Not Found</h1>', 'utf-8');
      } else {
        res.writeHead(500);
        res.end(`Server Error: ${error.code}`, 'utf-8');
      }
    } else {
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content, 'utf-8');
    }
  });
});

server.listen(port, () => {
  console.log(`Portfolio server running at http://localhost:${port}`);
  console.log('Press Ctrl+C to stop the server');
});

// Helper function to get browser info from user agent
function getBrowserInfo(userAgent) {
  if (userAgent.includes('Chrome')) return '🌐 Chrome';
  if (userAgent.includes('Firefox')) return '🦊 Firefox';
  if (userAgent.includes('Safari') && !userAgent.includes('Chrome')) return '🧭 Safari';
  if (userAgent.includes('Edge')) return '🔷 Edge';
  if (userAgent.includes('Opera')) return '🎭 Opera';
  return '🌐 Unknown Browser';
}

process.on('SIGINT', () => {
  console.log('\nServer stopped.');
  process.exit(0);
});
