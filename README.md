<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Memory Card Game README</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            margin: 20px;
        }
        h1, h2 {
            color: #333;
        }
        code {
            background: #f4f4f4;
            padding: 5px;
            border-radius: 3px;
        }
        pre {
            background: #f4f4f4;
            padding: 10px;
            border-radius: 3px;
            overflow-x: auto;
        }
        .section {
            margin-bottom: 20px;
        }
        ul {
            list-style-type: disc;
            margin-left: 20px;
        }
    </style>
</head>
<body>

    <h1>Memory Card Game</h1>

    <div class="section">
        <h2>Overview</h2>
        <p>This is a Memory Card Game developed using React Native. In this game, users can customize the number of cards and the duration of the game according to their preferences. The goal is to match pairs of cards, and the game ends when all pairs are matched or when the time runs out. Users can also restart the game or adjust the settings through a settings modal.</p>
    </div>

    <div class="section">
        <h2>Features</h2>
        <ul>
            <li>Customizable number of cards (10, 20, 30, 40)</li>
            <li>Adjustable timer duration (10 to 120 seconds)</li>
            <li>Animated card flips</li>
            <li>Win and time-up notifications</li>
            <li>Settings modal for game configuration</li>
        </ul>
    </div>

    <div class="section">
        <h2>Getting Started</h2>
        <ol>
            <li><strong>Clone the Repository</strong>
                <pre><code>git clone https://github.com/your-username/memory-card-game.git
cd memory-card-game</code></pre>
            </li>
            <li><strong>Install Dependencies</strong>
                <pre><code>npm install</code></pre>
            </li>
            <li><strong>Run the Application</strong>
                <pre><code>npm start</code></pre>
            </li>
            <li><strong>Customize</strong>
                <p>Replace the images in <code>assets/images</code> with your own images to customize the appearance of the cards.</p>
            </li>
        </ol>
    </div>

    <div class="section">
        <h2>Customization</h2>
        <p>To change the images used in the game, replace the image files in the <code>assets/images</code> folder with your own images. Ensure the new images have the same names as the existing ones or update the <code>images</code> array in the code to reflect the new names.</p>
    </div>

    <div class="section">
        <h2>Contributing</h2>
        <p>Feel free to contribute to this project by submitting issues or pull requests. Any improvements, bug fixes, or new features are welcome.</p>
    </div>

</body>
</html>
