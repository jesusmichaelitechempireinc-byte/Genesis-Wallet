# Firebase Studio

This is a NextJS starter in Firebase Studio.

To get started, take a look at src/app/page.tsx.

## Deploying to Netlify

To deploy this project to Netlify for free, follow these steps:

### 1. Push to GitHub

First, you need to get your code into a GitHub repository.

a. Create a new repository on [GitHub](https://github.com/new).

b. In your local project terminal, initialize Git and push your code:
   ```bash
   # Initialize git
   git init

   # Add all your files to be tracked
   git add .

   # Commit the files
   git commit -m "Initial commit"

   # Rename the branch to 'main'
   git branch -M main

   # Add your new GitHub repository URL
   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPOSITORY_NAME.git

   # Push your code to GitHub
   git push -u origin main
   ```
   > **Note:** Replace `YOUR_USERNAME` and `YOUR_REPOSITORY_NAME` with your actual GitHub details.

### 2. Deploy on Netlify

Now, you can connect your GitHub repository to Netlify.

a. [Log in to Netlify](https://app.netlify.com/login) (or sign up for free).

b. Click on **"Add new site"** -> **"Import an existing project"**.

c. Connect to **GitHub** as your provider.

d. Select the repository you just created.

e. Netlify will automatically detect the `netlify.toml` file in your project. The build settings should be pre-filled. Simply click **"Deploy site"**.

That's it! Netlify will build and deploy your application. Any future pushes to your `main` branch on GitHub will automatically trigger a new deployment.
