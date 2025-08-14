// Portfolio Data Loader - Fetches and populates UI with API data
class PortfolioDataLoader {
    constructor() {
        this.api = window.portfolioAPI;
        this.isLoaded = false;
    }

    // Initialize and load all data
    async init() {
        try {
            console.log('Loading portfolio data from API...');
            await this.loadAllData();
            this.isLoaded = true;
            console.log('Portfolio data loaded successfully');
        } catch (error) {
            console.error('Error loading portfolio data:', error);
            this.showErrorMessage();
        }
    }

    // Load all sections
    async loadAllData() {
        await Promise.all([
            this.loadPersonalInfo(),
            this.loadAboutSection(),
            this.loadStatistics(),
            this.loadSkillsOverview(),
            this.loadTechnicalSkills(),
            this.loadExperience(),
            this.loadCertifications()
        ]);
    }

    // Load personal information
    async loadPersonalInfo() {
        try {
            const personalInfo = await this.api.getPersonalInfo();
            
            // Update professional summary only
            const aboutContent = document.querySelector('.about-content');
            if (aboutContent) {
                const summaryParagraph = aboutContent.querySelector('p');
                if (summaryParagraph) {
                    summaryParagraph.textContent = personalInfo.summary;
                }
            }

        } catch (error) {
            console.error('Error loading personal info:', error);
        }
    }

    // Load and populate about section
    async loadAboutSection() {
        try {
            const aboutData = await this.api.getAboutSection();
            console.log('About section data loaded:', aboutData);
            
            // Update section title and subtitle
            const sectionTitle = document.querySelector('#about .section-title h2');
            const sectionSubtitle = document.querySelector('#about .section-title p');
            
            if (sectionTitle) sectionTitle.textContent = aboutData.sectionTitle;
            if (sectionSubtitle) sectionSubtitle.textContent = aboutData.sectionSubtitle;
            
            // Update professional summary
            const professionalTitle = document.querySelector('.about-content h3');
            const paragraphs = document.querySelectorAll('.about-content p');
            
            if (professionalTitle) {
                professionalTitle.textContent = aboutData.professionalSummary.title;
            }
            
            if (paragraphs.length >= 2) {
                paragraphs[0].textContent = aboutData.professionalSummary.paragraph1;
                paragraphs[1].textContent = aboutData.professionalSummary.paragraph2;
            }
            
            // Update contact details
            const infoItems = document.querySelectorAll('.info-item');
            infoItems.forEach(item => {
                const strongElement = item.querySelector('strong');
                if (strongElement) {
                    const label = strongElement.textContent;
                    
                    if (label.includes('Location:')) {
                        const spanElement = strongElement.nextElementSibling;
                        if (spanElement && spanElement.tagName === 'SPAN') {
                            spanElement.textContent = aboutData.contactDetails.location;
                        }
                    } else if (label.includes('Experience:')) {
                        const spanElement = strongElement.nextElementSibling;
                        if (spanElement && spanElement.tagName === 'SPAN') {
                            spanElement.textContent = aboutData.contactDetails.experience;
                        }
                    } else if (label.includes('Email:')) {
                        const linkElement = strongElement.nextElementSibling;
                        if (linkElement && linkElement.tagName === 'A') {
                            linkElement.textContent = aboutData.contactDetails.email;
                            linkElement.href = `mailto:${aboutData.contactDetails.email}`;
                        }
                    } else if (label.includes('Phone:')) {
                        const linkElement = strongElement.nextElementSibling;
                        if (linkElement && linkElement.tagName === 'A') {
                            linkElement.textContent = aboutData.contactDetails.phone;
                            linkElement.href = `tel:${aboutData.contactDetails.phone.replace(/\s+/g, '')}`;
                        }
                    }
                }
            });

        } catch (error) {
            console.error('Error loading about section:', error);
        }
    }

    // Load and update statistics
    async loadStatistics() {
        try {
            const stats = await this.api.getStatistics();
            console.log('Full stats object:', stats); // Debug log
            
            // Update main stats section (stat-item elements)
            const statItems = document.querySelectorAll('.stat-item');
            if (statItems.length >= 4) {
                // Use approxExperience with fallback to hardcoded value
                const experienceValue = stats.approxExperience || 3;
                console.log('Experience value used:', experienceValue); // Debug log
                
                this.updateStatItem(statItems[0], experienceValue, 'Years Experience', '+');
                this.updateStatItem(statItems[1], stats.majorProjects, 'Major Projects', '');
                this.updateStatItem(statItems[2], stats.certifications, 'Certifications', '');
                this.updateStatItem(statItems[3], stats.clientSatisfaction, 'Client Satisfaction', '%');
            }

            // Update experience summary section (experience-stat elements)
            const experienceStats = document.querySelectorAll('.experience-stat h3');
            if (experienceStats.length >= 4) {
                experienceStats[0].textContent = `${stats.yearsExperience}`;
                experienceStats[1].textContent = `3`; // Roles at Cognizant (fixed number)
                experienceStats[2].textContent = `${stats.majorProjects}`;
                
                // Calculate total technologies from all skill categories
                const skillsOverview = await this.api.getSkillsOverview();
                const totalTechnologies = skillsOverview.backendTechnologies + skillsOverview.frontendFrameworks + 
                                        skillsOverview.databases + skillsOverview.cloudPlatforms + 
                                        skillsOverview.aiMlTechnologies + skillsOverview.generalSkills;
                experienceStats[3].textContent = `${totalTechnologies}`;
            }

        } catch (error) {
            console.error('Error loading statistics:', error);
        }
    }

    // Update individual stat item
    updateStatItem(statElement, value, label, suffix = '') {
        const numberElement = statElement.querySelector('.stat-number');
        const labelElement = statElement.querySelector('.stat-label');
        
        if (numberElement) {
            numberElement.textContent = value + suffix;
            numberElement.setAttribute('data-target', value);
        }
        if (labelElement) {
            labelElement.textContent = label;
        }
    }

    // Load skills overview
    async loadSkillsOverview() {
        try {
            const skillsOverview = await this.api.getSkillsOverview();
            console.log('Skills Overview in loadSkillsOverview:', skillsOverview); // Debug log
            
            // Update skills overview numbers (6 categories)
            const skillStatNumbers = document.querySelectorAll('.skill-stat-number');
            if (skillStatNumbers.length >= 6) {
                skillStatNumbers[0].textContent = `${skillsOverview.backendTechnologies || 0}`;
                skillStatNumbers[1].textContent = `${skillsOverview.frontendFrameworks || 0}`;
                skillStatNumbers[2].textContent = `${skillsOverview.databases || 0}`;
                skillStatNumbers[3].textContent = `${skillsOverview.cloudPlatforms || 0}`;
                skillStatNumbers[4].textContent = `${skillsOverview.aiMlTechnologies || 0}`;
                skillStatNumbers[5].textContent = `${skillsOverview.generalSkills || 0}`;
            } else if (skillStatNumbers.length >= 4) {
                // Fallback for 4-stat layout
                skillStatNumbers[0].textContent = `${skillsOverview.backendTechnologies || 0}`;
                skillStatNumbers[1].textContent = `${skillsOverview.frontendFrameworks || 0}`;
                skillStatNumbers[2].textContent = `${skillsOverview.databases || 0}`;
                skillStatNumbers[3].textContent = `${skillsOverview.cloudPlatforms || 0}`;
            }

        } catch (error) {
            console.error('Error loading skills overview:', error);
        }
    }

    // Load and populate technical skills
    async loadTechnicalSkills() {
        try {
            const skills = await this.api.getTechnicalSkills();
            console.log('Technical Skills loaded:', skills); // Debug log
            
            // Update all skill categories using specific selectors based on their content
            this.updateSkillsCategoryByTitle('Backend &', skills.backend);
            this.updateSkillsCategoryByTitle('Frontend &', skills.frontend);
            this.updateSkillsCategoryByTitle('Databases &', skills.databases);
            this.updateSkillsCategoryByTitle('Cloud &', skills.cloudDevOps);
            this.updateSkillsCategoryByTitle('AI &', skills.aiMl);
            this.updateSkillsCategoryByTitle('General', skills.general);

        } catch (error) {
            console.error('Error loading technical skills:', error);
        }
    }

    // Update skills category by finding the container based on title content
    updateSkillsCategoryByTitle(titleText, skills) {
        console.log(`Looking for category with title containing: "${titleText}"`);
        console.log(`Skills to add:`, skills?.length || 0);
        
        // Find the category by its title
        const categoryTitles = document.querySelectorAll('.skills-category-title');
        let targetContainer = null;
        
        categoryTitles.forEach(titleElement => {
            console.log(`Checking title: "${titleElement.textContent}"`);
            if (titleElement.textContent.includes(titleText)) {
                console.log(`Found matching title for: "${titleText}"`);
                // Find the skills grid container in this category
                const categoryDiv = titleElement.closest('.skills-category-enhanced');
                if (categoryDiv) {
                    targetContainer = categoryDiv.querySelector('.skills-grid-enhanced');
                    console.log(`Found target container for: "${titleText}"`);
                }
            }
        });
        
        if (targetContainer && skills) {
            console.log(`Updating category "${titleText}" with ${skills.length} skills`);
            this.updateSkillsCategory(targetContainer, skills);
        } else {
            console.warn(`Could not find category for "${titleText}" or no skills provided`);
            console.warn(`Target container found:`, !!targetContainer);
            console.warn(`Skills provided:`, !!skills);
        }
    }

    // Update skills category
    updateSkillsCategory(container, skills) {
        if (!container || !skills) {
            console.warn('Container or skills not provided to updateSkillsCategory');
            return;
        }

        console.log(`Updating skills category with ${skills.length} skills`);
        container.innerHTML = '';
        
        skills.forEach(skill => {
            const skillElement = document.createElement('div');
            skillElement.className = `skill-item-enhanced ${skill.color}`;
            skillElement.innerHTML = `
                <i class="${skill.icon}"></i>
                <span>${skill.name}</span>
            `;
            container.appendChild(skillElement);
        });
    }

    // Load and populate experience
    async loadExperience() {
        try {
            const experiences = await this.api.getExperience();
            const timelineItems = document.querySelectorAll('.timeline-item');
            
            if (!timelineItems || !experiences) return;

            // Update each timeline item with corresponding experience data
            timelineItems.forEach((timelineItem, index) => {
                if (index < experiences.length) {
                    this.updateTimelineItem(timelineItem, experiences[index]);
                }
            });

        } catch (error) {
            console.error('Error loading experience:', error);
        }
    }

    // Update timeline item with experience data
    updateTimelineItem(timelineItem, experience) {
        const periodElement = timelineItem.querySelector('.timeline-period');
        const titleElement = timelineItem.querySelector('.timeline-title');
        const companyElement = timelineItem.querySelector('.timeline-company');
        const descriptionElement = timelineItem.querySelector('.timeline-description');
        const techListElement = timelineItem.querySelector('.tech-list');

        if (periodElement) periodElement.textContent = experience.duration || '';
        if (titleElement) titleElement.textContent = experience.position || '';
        if (companyElement) companyElement.textContent = experience.company || '';
        
        if (descriptionElement && experience.responsibilities) {
            descriptionElement.innerHTML = '';
            experience.responsibilities.forEach(resp => {
                const li = document.createElement('li');
                li.textContent = resp;
                descriptionElement.appendChild(li);
            });
        }
        
        if (techListElement && experience.technologies) {
            techListElement.innerHTML = experience.technologies
                .map(tech => `<span class="tech-tag">${tech}</span>`)
                .join('');
        }
    }

    // Load and populate certifications
    async loadCertifications() {
        try {
            const certifications = await this.api.getCertifications();
            const certificationsContainer = document.querySelector('.certifications-section');
            
            if (!certificationsContainer || !certifications) return;

            // Clear existing certifications (keep the title)
            const title = certificationsContainer.querySelector('h3');
            certificationsContainer.innerHTML = '';
            if (title) certificationsContainer.appendChild(title);

            // Add certifications from API
            certifications.forEach(cert => {
                const certElement = this.createCertificationElement(cert);
                certificationsContainer.appendChild(certElement);
            });

        } catch (error) {
            console.error('Error loading certifications:', error);
        }
    }

    // Create certification element
    createCertificationElement(cert) {
        const certDiv = document.createElement('div');
        certDiv.className = 'certification-item';
        certDiv.innerHTML = `
            <div class="certification-icon">
                <i class="${cert.icon} text-${cert.color}"></i>
            </div>
            <div class="certification-content">
                <h4>${cert.name}</h4>
                <p class="certification-issuer">${cert.issuer}</p>
                ${cert.date ? `<p class="certification-date text-muted">${cert.date}</p>` : ''}
                <p class="certification-link mt-2">
                    <a href="${cert.credentialUrl}" 
                       target="_blank" 
                       class="btn btn-sm btn-outline-${cert.color}">
                        <i class="fas fa-external-link-alt me-1"></i>${cert.buttonText}
                    </a>
                </p>
            </div>
        `;
        return certDiv;
    }

    // Show error message
    showErrorMessage() {
        const errorDiv = document.createElement('div');
        errorDiv.className = 'alert alert-warning alert-dismissible fade show';
        errorDiv.innerHTML = `
            <strong>Notice:</strong> Unable to load dynamic data. Displaying cached information.
            <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        `;
        
        const container = document.querySelector('.container');
        if (container) {
            container.insertBefore(errorDiv, container.firstChild);
        }
    }

    // Method to refresh all data
    async refreshData() {
        await this.api.refreshData();
        await this.loadAllData();
    }
}

// Initialize data loader when DOM is ready
document.addEventListener('DOMContentLoaded', async function() {
    console.log('Data loader DOM ready, checking for API service...');
    
    // Wait for API service to be available
    let attempts = 0;
    while (!window.portfolioAPI && attempts < 10) {
        console.log(`Waiting for API service... attempt ${attempts + 1}`);
        await new Promise(resolve => setTimeout(resolve, 100));
        attempts++;
    }
    
    if (window.portfolioAPI) {
        console.log('Portfolio API service found, initializing data loader...');
        const dataLoader = new PortfolioDataLoader();
        await dataLoader.init();
        
        // Make it globally available for manual refresh
        window.portfolioDataLoader = dataLoader;
        console.log('Data loader initialization complete');
        
        // Manual debug test
        setTimeout(async () => {
            console.log('Running manual debug test...');
            try {
                const skills = await window.portfolioAPI.getTechnicalSkills();
                console.log('Manual test - skills loaded:', skills);
                console.log('Skills counts:', {
                    backend: skills.backend?.length,
                    frontend: skills.frontend?.length,
                    databases: skills.databases?.length,
                    cloudDevOps: skills.cloudDevOps?.length,
                    aiMl: skills.aiMl?.length,
                    general: skills.general?.length
                });
                
                // Check if skill containers exist
                const containers = document.querySelectorAll('.skills-grid-enhanced');
                console.log('Found skill containers:', containers.length);
                
                containers.forEach((container, index) => {
                    const parent = container.closest('.skills-category-enhanced');
                    const title = parent?.querySelector('.skills-category-title')?.textContent || 'Unknown';
                    console.log(`Container ${index}: "${title}" - has ${container.children.length} skills`);
                });
                
                // Try to manually add one skill to test
                if (containers.length > 0 && skills.backend && skills.backend.length > 0) {
                    console.log('Manually adding first skill to test...');
                    const testSkill = document.createElement('div');
                    testSkill.className = 'skill-item-enhanced primary';
                    testSkill.innerHTML = `
                        <i class="fas fa-code"></i>
                        <span>TEST SKILL</span>
                    `;
                    containers[0].appendChild(testSkill);
                    console.log('Test skill added to first container');
                }
            } catch (error) {
                console.error('Manual debug test failed:', error);
            }
        }, 2000);
        
    } else {
        console.error('Portfolio API service not available after waiting');
    }
});
