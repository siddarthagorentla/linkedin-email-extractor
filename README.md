🔍 LinkedIn Profile Extractor AI
License Version React TypeScript Vite

An AI-powered tool to find publicly available contact information from LinkedIn profiles using Google's Gemini AI with web search capabilities.

Demo • Features • Installation • Usage • Deployment • Legal

⚠️ IMPORTANT LEGAL DISCLAIMERS
Educational & Personal Use Only
This tool is provided strictly for educational and personal research purposes. By using this software, you acknowledge and agree to the following:

1. Compliance with Terms of Service
LinkedIn Terms of Service: You must comply with LinkedIn's User Agreement and Professional Community Policies
No Scraping: This tool does NOT scrape LinkedIn directly. It uses AI-powered web search to find publicly available information
Respect robots.txt: Always respect website robots.txt files and rate limits
Third-Party APIs: Usage of Google Gemini API is subject to Google's Terms of Service
2. Data Privacy & Protection
GDPR Compliance: If you're in the EU, ensure compliance with GDPR regulations
CCPA Compliance: California users must comply with CCPA requirements
Data Minimization: Only collect information necessary for your stated purpose
Right to Privacy: Respect individuals' privacy rights and data protection laws
Consent: Ensure you have proper consent before using extracted information
3. Prohibited Uses
You MAY NOT use this tool for:

❌ Unauthorized mass data collection or harvesting
❌ Spam, unsolicited marketing, or cold outreach at scale
❌ Harassment, stalking, or any malicious activity
❌ Commercial resale of extracted data
❌ Circumventing anti-scraping measures
❌ Violation of any applicable laws or regulations
❌ Identity theft or fraud
❌ Creating misleading or fake profiles
4. Liability & Warranty
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
In simple terms:

✅ Use at your own risk
✅ No guarantees on accuracy or availability
✅ You are responsible for your use of this tool
✅ The authors assume no liability for misuse
5. Acceptable Use Policy
Allowed Uses:

✅ Personal research and networking
✅ Verifying publicly available contact information
✅ Educational purposes and learning
✅ One-time lookups for legitimate professional reasons
✅ Academic research (with proper ethical approval)
Required Best Practices:

Respect rate limits (max 10 requests per minute)
Use responsibly and ethically
Obtain consent before contacting individuals
Honor opt-out requests immediately
Comply with anti-spam laws (CAN-SPAM, CASL, etc.)
📋 Features
🤖 AI-Powered Extraction: Uses Google Gemini 2.0 Flash with web search
🔍 Public Information Only: Finds only publicly available contact details
📧 Contact Details: Extracts name, email, phone, website, and LinkedIn URL
📊 Export to CSV: Download results in CSV format
🎨 Modern UI: Beautiful, responsive interface with Tailwind CSS
🔒 Secure: API key stored server-side, never exposed to clients
⚡ Fast: Serverless architecture with Vercel deployment
📱 Mobile-Friendly: Works on all devices
🚀 Quick Start
Prerequisites
Node.js 14+ and npm
Google Gemini API key (Get one here)
Basic understanding of React and TypeScript
Installation
# Clone the repository
git clone https://github.com/YOUR_USERNAME/linkedin-email-extractor.git
cd linkedin-email-extractor

# Install dependencies
npm install

# Configure environment variables
cp .env.local.example .env.local
# Edit .env.local and add your GEMINI_API_KEY
Development
# Run frontend only (API calls won't work)
npm run dev

# Run full stack with Vercel Dev (recommended)
npx vercel dev
Open http://localhost:3000 (or 5173 for frontend-only)

📖 Usage
Get API Key: Visit Google AI Studio
Add to Environment: Place your key in .env.local
Start App: Run npx vercel dev
Enter LinkedIn URL: Paste a LinkedIn profile URL
Extract: Click "Extract Information"
Export: Download results as CSV if needed
Example Usage
Input: https://www.linkedin.com/in/example-profile/
Output:
- Name: John Doe
- Email: john@example.com
- Phone: +1-555-0123
- Website: https://johndoe.com
- LinkedIn: https://www.linkedin.com/in/example-profile/
🏗️ Architecture
├── api/
│   └── extract.ts              # Vercel serverless function
├── netlify/functions/
│   └── extract.ts              # Netlify function (alternative)
├── components/
│   ├── ContactCard.tsx         # Display component
│   ├── Loader.tsx              # Loading state
│   └── icons.tsx               # SVG icons
├── services/
│   └── geminiService.ts        # API client with fallback
├── App.tsx                      # Main application
├── types.ts                     # TypeScript definitions
└── .env.local                  # Environment variables (not in git)
🌐 Deployment
Deploy to Vercel (Recommended)
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel

# Add environment variable
vercel env add GEMINI_API_KEY

# Deploy to production
vercel --prod
For detailed instructions, see DEPLOYMENT.md

🔒 Security & Privacy
Data Handling
✅ No Data Storage: We don't store any extracted information
✅ No Logging: Input/output data is not logged
✅ API Key Protection: Keys are stored server-side only
✅ HTTPS: All communications encrypted
✅ Client-Side Fallback: Direct API calls in development only
Security Best Practices
# Keep dependencies updated
npm audit fix

# Regenerate API key regularly
# Visit: https://aistudio.google.com/app/apikey

# Use environment variables (never hardcode keys)
echo "GEMINI_API_KEY=your_key" > .env.local
📄 License
This project is licensed under the MIT License - see the LICENSE file for details.

MIT License Summary
✅ Commercial use
✅ Modification
✅ Distribution
✅ Private use

⚠️ However: You must include the copyright notice and disclaimer in all copies.

⚖️ Terms of Use
By using this software, you agree to:

Comply with all applicable laws including but not limited to:

Computer Fraud and Abuse Act (CFAA)
General Data Protection Regulation (GDPR)
California Consumer Privacy Act (CCPA)
CAN-SPAM Act
Canada's Anti-Spam Legislation (CASL)
Respect LinkedIn's Terms: Not circumvent or violate LinkedIn's policies

Obtain Consent: Get proper consent before contacting individuals

Use Ethically: Only for legitimate, lawful purposes

No Guarantees: Understand that extracted information may be inaccurate or outdated

🚫 Content Policy
Prohibited Content
Do not use this tool to extract or process:

❌ Personal data of minors (under 18)
❌ Health/medical information
❌ Financial/payment information
❌ Sensitive personal data (race, religion, political views, etc.)
❌ Confidential or proprietary business information
🛡️ Ethical Guidelines
Our Commitment
This project follows these ethical principles:

Transparency: Clear about what data we collect and how
Consent: Encourage obtaining consent before contact
Privacy: Respect individuals' right to privacy
Accuracy: Verify information before use
Responsibility: Users are accountable for their actions
Responsible AI Use
Use AI-generated results as suggestions, not facts
Verify critical information through official sources
Be transparent when using AI tools
Respect individuals who don't want to be contacted
🤝 Contributing
Contributions are welcome! However, please ensure:

Legal Compliance: Your contributions don't violate any laws
Ethical Standards: Code follows ethical guidelines above
Code Quality: Write clean, documented, tested code
Security: Don't introduce vulnerabilities
See CONTRIBUTING.md for details.

📞 Contact & Support
Issues & Bugs
Report issues on GitHub Issues

Questions
Check SETUP.md for technical questions
Review DEPLOYMENT.md for deployment help
See FIXES_APPLIED.md for known issues
Legal Inquiries
For legal concerns, contact: [YOUR_EMAIL@example.com]

📚 Additional Resources
Legal References
LinkedIn User Agreement
GDPR Official Text
CCPA Information
CAN-SPAM Act
Google AI Terms
Technical Documentation
Google Gemini API Docs
Vercel Documentation
React Documentation
TypeScript Handbook
🙏 Acknowledgments
Google Gemini AI for powerful AI capabilities
Vercel for seamless serverless deployment
React & TypeScript communities
All contributors and users
📊 Project Status
GitHub stars GitHub forks GitHub issues

Current Version: 1.0.0
Last Updated: January 2025
Status: Active Development ✅

⭐ Star This Project
If you find this tool useful, please consider giving it a star on GitHub! It helps others discover the project.

