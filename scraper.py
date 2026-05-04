import json
import requests
from bs4 import BeautifulSoup
import datetime

# Configuration - Saving to root directory for GitHub Pages
JOBS_FILE = "jobs.json"

def scrape_jobs():
    """
    Main scraping function. 
    This script is configured to save directly to the root folder.
    """
    all_jobs = []
    
    print("Fetching latest Property & Remote jobs...")
    
    # -------------------------------------------------------------------------
    # PRO TIP: To get REAL live jobs, you can replace the list below with 
    # a request to a free API like Adzuna or Jooble.
    # -------------------------------------------------------------------------
    
    # Updated data to verify the script is working and overwriting placeholders
    updated_results = [
        {
            "id": "ref-" + str(int(datetime.datetime.now().timestamp())),
            "title": "Remote Property Manager (Live Update)",
            "company": "PropJobs Direct",
            "location": "Remote",
            "salary": "£35,000 - £50,000",
            "link": "https://www.linkedin.com/jobs/", 
            "posted": str(datetime.date.today()),
            "tags": ["Property", "Remote", "Management"]
        },
        {
            "id": "ref2-" + str(int(datetime.datetime.now().timestamp())),
            "title": "Real Estate Virtual Assistant",
            "company": "Global Property Partners",
            "location": "Remote",
            "salary": "Competitive",
            "link": "https://www.indeed.com/",
            "posted": str(datetime.date.today()),
            "tags": ["Real Estate", "Remote", "Admin"]
        }
    ]
    
    all_jobs.extend(updated_results)
    
    # Save to the root jobs.json file
    try:
        with open(JOBS_FILE, 'w') as f:
            json.dump(all_jobs, f, indent=2)
        print(f"✅ Successfully saved {len(all_jobs)} jobs to {JOBS_FILE}")
    except Exception as e:
        print(f"❌ Error saving file: {e}")

if __name__ == "__main__":
    scrape_jobs()
