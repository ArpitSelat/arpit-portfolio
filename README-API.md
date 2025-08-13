# Portfolio Website - API-Driven Version

This portfolio website has been enhanced to fetch data dynamically from an API instead of using hardcoded values. This makes it easy to update your information without modifying the HTML/CSS code directly.

## Features

### API-Driven Content
- **Personal Information**: Name, title, location, experience, summary
- **Statistics**: Years experience, major projects, certifications count
- **Technical Skills**: Organized by categories (Backend, Frontend, Database, Cloud/DevOps)
- **Experience**: Work history with detailed responsibilities and achievements
- **Certifications**: Professional certifications with links
- **Projects**: Portfolio projects (future enhancement)

### Data Sources
- Local JSON file (`api-data.json`) for development/testing
- Can be easily configured to use real API endpoints

## Files Structure

```
├── index.html              # Main HTML file
├── styles.css              # Styling
├── script.js               # Main JavaScript functionality
├── api-service.js          # API service for data fetching
├── data-loader.js          # UI population logic
├── api-data.json           # Sample API data
├── server.py               # Python development server
├── server.js               # Node.js development server (alternative)
├── start-server.bat        # Windows batch file to start server
└── package.json            # Node.js dependencies
```

## Setup and Usage

### Option 1: Python Server (Recommended)
1. Make sure Python is installed on your system
2. Double-click `start-server.bat` or run:
   ```bash
   python server.py
   ```
3. Open your browser and go to `http://localhost:8000`

### Option 2: Node.js Server
1. Make sure Node.js is installed
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the server:
   ```bash
   npm start
   ```
4. Open your browser and go to `http://localhost:8000`

### Option 3: Use any HTTP Server
You can use any static file server like:
- Python: `python -m http.server 8000`
- Node.js: `npx http-server`
- PHP: `php -S localhost:8000`

## Updating Your Information

### Method 1: Edit api-data.json (Recommended for testing)
1. Open `api-data.json` in a text editor
2. Update the values you want to change:
   - Personal information in `personalInfo` section
   - Statistics in `statistics` section
   - Skills in `technicalSkills` section
   - Experience in `experience` section
   - Certifications in `certifications` section
3. Save the file and refresh your browser

### Method 2: Use Real API (Production)
1. Create or use an existing API endpoint that returns data in the same format as `api-data.json`
2. Update the `baseUrl` in `api-service.js`:
   ```javascript
   this.baseUrl = 'https://your-api-endpoint.com/portfolio-data';
   ```

## API Data Format

The API should return JSON data in the following structure:

```json
{
  "personalInfo": {
    "name": "Your Name",
    "title": "Your Title",
    "location": "Your Location",
    "email": "your.email@example.com",
    "phone": "+1234567890",
    "experience": "X+",
    "summary": "Your professional summary..."
  },
  "statistics": {
    "yearsExperience": 5,
    "majorProjects": 10,
    "certifications": 8,
    "clientSatisfaction": 100
  },
  "technicalSkills": {
    "backend": [...],
    "frontend": [...],
    "databases": [...],
    "cloudDevOps": [...]
  },
  "experience": [...],
  "certifications": [...],
  "projects": [...]
}
```

## Customization

### Adding New Skills
1. Open `api-data.json`
2. Add new skill objects to the appropriate category:
   ```json
   {
     "name": "New Technology",
     "icon": "fas fa-code",
     "level": "Advanced",
     "color": "primary"
   }
   ```

### Adding New Certifications
1. Add certification objects to the `certifications` array:
   ```json
   {
     "id": 6,
     "name": "Certification Name",
     "issuer": "Issuing Organization",
     "date": "2024",
     "credentialUrl": "https://link-to-certificate.com",
     "icon": "fas fa-certificate",
     "color": "success",
     "buttonText": "View Certificate"
   }
   ```

### Updating Experience
1. Modify or add entries in the `experience` array with work history details

## Troubleshooting

### CORS Issues
If you encounter CORS (Cross-Origin Resource Sharing) errors:
- Use one of the provided local servers instead of opening the HTML file directly
- The servers include CORS headers to allow API requests

### Data Not Loading
1. Check browser console for error messages
2. Verify the API endpoint is accessible
3. Check that `api-data.json` is in the correct format
4. Make sure the server is running on the correct port

### Browser Caching
If changes aren't showing up:
1. Hard refresh: Ctrl+F5 (Windows) or Cmd+Shift+R (Mac)
2. Clear browser cache
3. Use browser developer tools to disable cache during development

## Production Deployment

### For Static Hosting (GitHub Pages, Netlify, etc.)
1. Replace API calls with static JSON files
2. Upload all files to your hosting service

### For Dynamic API
1. Deploy your API endpoint
2. Update `baseUrl` in `api-service.js`
3. Deploy the frontend files

## Benefits of API-Driven Approach

1. **Easy Updates**: Change data without touching code
2. **Scalability**: Can connect to any backend system
3. **Maintainability**: Separation of data and presentation
4. **Flexibility**: Easy to add new sections or modify existing ones
5. **Professional**: More realistic approach for real-world applications

## Future Enhancements

- Add admin panel for easier data management
- Implement real-time updates
- Add form validation for contact form
- Add more interactive features
- Connect to a headless CMS

---

For any questions or issues, please check the browser console for error messages and ensure all files are properly loaded.
