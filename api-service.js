// API Service for Portfolio Data
class PortfolioAPI {
    constructor() {
        this.baseUrl = './api-data.json'; // In production, this would be your actual API endpoint
        this.cache = null;
        this.cacheExpiry = 5 * 60 * 1000; // 5 minutes cache
        this.lastFetch = null;
    }

    // Main method to fetch all portfolio data
    async fetchPortfolioData() {
        try {
            // Check cache first
            if (this.cache && this.lastFetch && (Date.now() - this.lastFetch < this.cacheExpiry)) {
                console.log('Returning cached data');
                return this.cache;
            }

            console.log('Fetching fresh data from API');
            const response = await fetch(this.baseUrl);
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const data = await response.json();
            
            // Cache the data
            this.cache = data;
            this.lastFetch = Date.now();
            
            return data;
        } catch (error) {
            console.error('Error fetching portfolio data:', error);
            // Return fallback data or throw error
            return this.getFallbackData();
        }
    }

    // Get specific sections of data
    async getPersonalInfo() {
        const data = await this.fetchPortfolioData();
        return data.personalInfo;
    }

    async getAboutSection() {
        const data = await this.fetchPortfolioData();
        return data.aboutSection;
    }

    async getStatistics() {
        const data = await this.fetchPortfolioData();
        return data.statistics;
    }

    async getSkillsOverview() {
        const data = await this.fetchPortfolioData();
        return data.skillsOverview;
    }

    async getTechnicalSkills() {
        const data = await this.fetchPortfolioData();
        return data.technicalSkills;
    }

    async getExperience() {
        const data = await this.fetchPortfolioData();
        return data.experience;
    }

    async getCertifications() {
        const data = await this.fetchPortfolioData();
        return data.certifications;
    }

    async getProjects() {
        const data = await this.fetchPortfolioData();
        return data.projects;
    }

    // Fallback data in case API fails
    getFallbackData() {
        return {
            personalInfo: {
                name: "Arpit Kumar Selat",
                title: ".NET Full Stack Developer",
                location: "Hatta, India",
                email: "arpitselat@gmail.com",
                phone: "+91 7999564548",
                experience: "3+",
                summary: "Experienced .NET Full Stack Developer"
            },
            aboutSection: {
                sectionTitle: "About Me",
                sectionSubtitle: "Passionate about creating innovative solutions",
                professionalSummary: {
                    title: "Professional Summary",
                    paragraph1: "Experienced .NET Full Stack Developer with expertise in building scalable web applications.",
                    paragraph2: "Skilled in modern technologies and development practices."
                },
                contactDetails: {
                    location: "Hatta, India",
                    experience: "3+ Years",
                    email: "arpitselat@gmail.com",
                    phone: "+91 7999564548"
                }
            },
            statistics: {
                yearsExperience: 3,
                majorProjects: 4,
                certifications: 5,
                clientSatisfaction: 100
            },
            skillsOverview: {
                coreTechnologies: 6,
                databases: 4,
                frontendFrameworks: 5,
                cloudPlatforms: 3
            },
            technicalSkills: {
                backend: [],
                frontend: [],
                databases: [],
                cloudDevOps: []
            },
            experience: [],
            certifications: [],
            projects: []
        };
    }

    // Method to refresh cache
    async refreshData() {
        this.cache = null;
        this.lastFetch = null;
        return await this.fetchPortfolioData();
    }
}

// Create global instance
window.portfolioAPI = new PortfolioAPI();
