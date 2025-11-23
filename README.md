YEF - Youth Empower Finance (TYE App)

Overview:
This project contains a React + TypeScript frontend (Vite) and a Node/Express + TypeScript backend that uses MongoDB.

Owner / CEO: You (project owner)

Quick Start (PowerShell):
1) Install dependencies in repo root:
npm install
2) Install backend dependencies:
Set-Location '.\backend'
npm install
3) Ensure MongoDB is running (local or Docker)
4) Seed the database:
Set-Location '.\backend'
npm run seed
5) Run backend and frontend in two terminals:
Set-Location '.\backend'
npm run dev
Set-Location '..'
npm run dev

Environment variables:
- backend/.env: MONGODB_URI, PORT, JWT_SECRET, NODE_ENV
- frontend: .env.local -> VITE_API_BASE_URL

Logo / assets:
Place logo at src/assets/logo.png or src/assets/logo.svg. Alternatively use public/logo.png.

Test credentials (from seed):
Admin: admin@yef.local / admin123
User: user@yef.local / user123

Troubleshooting:
- If ts-node not found, run npm install in backend
- If fetch blocked by CSP, update index.html meta or server headers
- If Vite import error, ensure asset path exists

If you want me to include your real name/title in this README, tell me and I will update it.
# Welcome to your Lovable project

## Project info

**URL**: https://lovable.dev/projects/3f352b26-0863-4307-93e9-8adf7196ce40

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/3f352b26-0863-4307-93e9-8adf7196ce40) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/3f352b26-0863-4307-93e9-8adf7196ce40) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/features/custom-domain#custom-domain)
