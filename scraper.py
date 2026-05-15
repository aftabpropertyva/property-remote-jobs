import json
import datetime
import os

# Configuration
JOBS_FILE = "jobs.json"
REAL_JOBS_FILE = "real_jobs.json"

def get_real_jobs():
    """Load real jobs from the real_jobs.json file."""
    if os.path.exists(REAL_JOBS_FILE):
        with open(REAL_JOBS_FILE, 'r') as f:
            return json.load(f)
    return []

def scrape_jobs():
    print(f"[{datetime.datetime.now()}] Starting job refresh...")
    
    # In this version, we use the real_jobs.json as the source of truth
    # and filter them based on the current time.
    raw_jobs = get_real_jobs()
    
    # Filter for jobs posted within the last 50 hours
    now = datetime.datetime.now()
    filtered_jobs = []
    
    for job in raw_jobs:
        # Parse the posted_at time
        try:
            posted_at = datetime.datetime.fromisoformat(job['posted_at'])
            age_hours = (now - posted_at).total_seconds() / 3600
            
            if age_hours <= 50:
                # Update the human-readable "posted" string
                if age_hours < 1:
                    job['posted_display'] = "Just now"
                elif age_hours < 24:
                    job['posted_display'] = f"{int(age_hours)}h ago"
                else:
                    job['posted_display'] = "Yesterday"
                filtered_jobs.append(job)
        except Exception as e:
            print(f"Error processing job {job.get('id')}: {e}")
    
    # Sort by newest first
    filtered_jobs.sort(key=lambda x: x['posted_at'], reverse=True)
    
    # Save to jobs.json
    try:
        with open(JOBS_FILE, 'w') as f:
            json.dump(filtered_jobs, f, indent=2)
        print(f"✅ Successfully saved {len(filtered_jobs)} fresh jobs (under 50h old) to {JOBS_FILE}.")
    except Exception as e:
        print(f"❌ Error saving file: {e}")

if __name__ == "__main__":
    scrape_jobs()
