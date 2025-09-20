# Welcome to Legal Draft AI! 🚀

This app is like a magic helper that can write important-looking papers for you! You can choose a type of paper (we call them templates), fill in some blanks, and the app's AI brain will write the rest. It's great for learning and for fun!

## Getting Your App Running (Your Adventure Map!)

Follow these easy steps to start your magical paper-writing adventure.

### Step 1: Tell Your Computer Where to Find Your Secret Key 🗝️

Your app needs a special "secret key" to use its AI brain. You've already put this key in a file called `.env`. Now, we just need to tell your computer how to read it.

1.  **Open your computer's terminal.** This is a program where you can type commands. It might be called "Terminal", "Command Prompt", or "PowerShell".
2.  **Navigate to your project folder.** Use the `cd` command, which means "change directory". For example: `cd path/to/your/project`
3.  **Rename the secret key file.** Type this command and press Enter:

    ```bash
    cp .env .env.local
    ```

    This makes a copy of your secret key file that your app knows how to find.

### Step 2: Install the Magic Tools 🛠️

Your app needs some tools to work. We'll use a tool called `npm` (Node Package Manager) to get them.

1.  **In the same terminal**, make sure you are in your project's folder.
2.  **Type this command and press Enter:**

    ```bash
    npm install
    ```

    This might take a minute or two. It's like your computer is going to the store to get all the parts it needs to build your app.

### Step 3: Start the App! ✨

Now for the most exciting part!

1.  **In the same terminal**, type this command and press Enter:

    ```bash
    npm run dev
    ```

2.  You should see some text, and then a line that says something like:

    ```
    - ready started server on 0.0.0.0:9002, url: http://localhost:9002
    ```

3.  **Open your web browser** (like Chrome, Firefox, or Safari) and go to the address `http://localhost:9002`.

**🎉 You did it! Your app is running on your computer! 🎉**

Now you can play around with it, choose templates, and see what kind of amazing documents the AI can create. Have fun!
