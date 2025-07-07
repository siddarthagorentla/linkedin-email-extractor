
LinkedIn Email Extractor
<!-- It's a good idea to add a screenshot of the tool in action and replace this URL -->
A simple yet powerful browser extension to help you extract email addresses from your LinkedIn connections. This tool is designed for sales professionals, recruiters, and anyone looking to streamline the process of gathering contact information from their professional network.
Why I Built This
I often found myself manually sifting through my LinkedIn connections to find email addresses. It was tedious, time-consuming, and prone to errors. I wanted a simple tool that could automate this process, allowing me to focus on building relationships rather than just collecting data. This project is the result—a straightforward, no-fuss extension that gets the job done.
Features
One-Click Extraction: Easily pull email addresses from the "My Network" > "Connections" page on LinkedIn.
Simple Interface: A clean and minimal popup UI that's easy to use.
CSV Export: Downloads the collected emails neatly into a .csv file, ready for you to use in your favorite spreadsheet or CRM software.
Lightweight & Secure: The extension runs entirely in your browser. Your data is your own and is never sent to any external servers.
How to Install and Use
Since this is not on the Chrome Web Store, you'll need to install it manually. It only takes a minute!
1. Download the Code
Click the green < > Code button on this GitHub page.
Select Download ZIP.
Unzip the downloaded file on your computer. You'll have a folder named linkedin-email-extractor-main.
2. Install the Extension in Your Browser
Open Google Chrome (or any Chromium-based browser like Brave, Edge, etc.).
Navigate to the extensions page by typing chrome://extensions in your address bar and pressing Enter.
In the top right corner, turn on "Developer mode".
Now, you'll see a button appear on the left that says "Load unpacked". Click it.
A file dialog will open. Navigate to and select the linkedin-email-extractor-main folder you unzipped earlier.
That's it! The "LinkedIn Email Extractor" will now appear in your list of extensions and in your browser's toolbar.
3. Using the Extractor
Log in to your LinkedIn account.
Navigate to the My Network page.
Click on Connections. This will take you to a URL like https://www.linkedin.com/mynetwork/invite-connect/connections/.
Click the LinkedIn Email Extractor icon in your browser's toolbar.
In the popup, click the "Extract Emails" button.
The extension will start scanning the page for connections and their email addresses. Once it's done, it will automatically download a file named emails.csv for you.
How It Works
This extension is built with standard web technologies:
manifest.json: The core file that tells Chrome how the extension should behave, what permissions it needs (like accessing the active tab), and where its files are located.
popup.html & popup.js: These files create the small popup you see when you click the extension's icon. The JavaScript here listens for the button click and sends a message to the content script to start its job.
content.js: This is the main workhorse. When you click the "Extract Emails" button, this script is injected into the LinkedIn connections page. It carefully scans the page's HTML to find the names and email addresses of your connections and collects them into a list.
background.js: This script runs in the background. Its primary job here is to listen for the data sent from content.js and convert it into a downloadable CSV file.
A Note on Responsible Use
This tool is intended for personal use to manage your own professional network. Please be respectful of people's data and privacy. Avoid spamming and always adhere to LinkedIn's terms of service.
