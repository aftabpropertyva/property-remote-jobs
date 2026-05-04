# PropJobs Remote: Automated Job Board

This project is an automated job board for the Property Sector and Remote roles. It uses a Python scraper and GitHub Actions to refresh job data every 24 hours.

## How to Set Up on GitHub

1.  **Create a New Repository**: Create a new public or private repository on GitHub.
2.  **Upload Files**: Push all the files in this project to your repository.
    *   `index.html` (The frontend)
    *   `jobs.json` (The data store)
    *   `scraper.py` (The scraper logic)
    *   `requirements.txt` (Python dependencies)
    *   `.github/workflows/main.yml` (The automation workflow)
3.  **Enable GitHub Pages**:
    *   Go to your repository **Settings** > **Pages**.
    *   Select **Deploy from a branch**.
    *   Choose the `main` branch and the root directory (or `/docs`).
4.  **GitHub Actions Permissions**:
    *   Go to **Settings** > **Actions** > **General**.
    *   Under "Workflow permissions", select **Read and write permissions**. This allows the action to commit `jobs.json` back to your repo.
5.  **Configure Scraper (Optional)**:
    *   Open `scraper.py` to add your specific API keys or more complex scraping logic for sites like Adzuna or LinkedIn.

## Technology Stack

*   **Frontend**: React + Tailwind CSS (served via Vite in dev, static build for Pages).
*   **Automation**: GitHub Actions.
*   **Scraper**: Python (BeautifulSoup / Requests).
*   **Design**: Elegant Dark / Obsidian theme with Emerald accents.

## Development

The project uses Vite for local development.
```bash
npm install
npm run dev
```

The site will be available at `http://localhost:3000`.
