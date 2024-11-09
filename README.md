# Web-logging-system

### Installation

1. **Clone the Repository**:
   Open your terminal and clone the repository using the following command:

   ```bash
   git clone <repository-url>
   ```

   Replace <repository-url> with the actual URL of your Git repository.

2. **Navigate to the Project Directory**:
   After cloning, move into the project directory:

   ```bash
   cd logging-system-client
   ```

3. **Install Dependencies**:
   Install all required dependencies for the frontend application by running:

   ```bash
   npm install
   ```

   This will install all packages listed in the package.json file.

## Running the Application

To run the application, follow the steps below. You’ll need two terminals: one for the Next frontend and one for Node Server.

### Step 1: Create Environment Variables

In the root directory of the project, create a `.env` file to store the API keys and URLs. Add the following content to your `.env` file:

```plaintext
NEXT_PUBLIC_API_URL=http://localhost:8080
```

### Step 2: Start the Frontend (Next)

**In your original terminal**:

1. Make sure you are in the main project directory (logging-system-client), and then start the Next application with:

   ```bash
   npm run dev
   ```

2. The app should open automatically in your default browser at http://localhost:3000. If it doesn’t, you can manually open this URL in your browser.
