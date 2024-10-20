# Tetris Game
![2024-10-20_11-56-17 (1)](https://github.com/user-attachments/assets/8ec2d5f8-452f-4848-b8c0-e9392b1d5327)

## Project Overview
This is a simple Tetris game built using Node.js, HTML, CSS, and Tailwind. The game can be run locally, and it offers standard Tetris functionality with intuitive controls and a game-over popup to display the final score.

## Project Structure

```
- tetris-game/
  - index.html
  - styles.css
  - script.js
  - server.js
  - package.json
```

### Files Description
- **index.html**: Contains the main structure of the webpage and HTML elements.
- **styles.css**: Contains the styling for the game, including the grid, preview, and modal styling.
- **script.js**: Contains the main logic for the Tetris game, including movement, collision detection, scoring, and game-over conditions.
- **server.js**: The server-side code to serve the game using Node.js and Socket.io.
- **package.json**: Node.js package file containing project dependencies.

## Prerequisites
Make sure you have the following installed:
- Node.js

## Getting Started

1. **Clone the Repository**
   ```sh
   git clone https://github.com/BitSparkCode/tetris.git
   cd tetris
   ```

2. **Install Dependencies**
   Install the necessary Node.js packages with:
   ```sh
   npm install
   ```

3. **Start the Server**
   Run the server using:
   ```sh
   npm start
   ```

4. **Play the Game**
   Open your browser and navigate to `http://localhost:3000` to start playing the game.

## How to Play
- **Arrow Left (`←`)**: Move the tetromino to the left.
- **Arrow Right (`→`)**: Move the tetromino to the right.
- **Arrow Down (`↓`)**: Move the tetromino down faster.
- **Space**: Rotate the tetromino.
- **Enter**: Drop the tetromino to the bottom immediately.

## Features
- **Real-Time Preview**: See the next tetromino that will appear in a 4x2 grid.
- **Leveling Up**: The level increases as the score increases, speeding up the game.
- **Game Over Popup**: A modal pops up to show your final score with a celebratory message.

## Dependencies
- **Express**: For serving the static files.
- **Socket.io**: For real-time interaction (future potential multiplayer feature).
- **Tailwind CSS**: For easy and responsive styling.

## Customization
You can modify the tetromino shapes, colors, or the grid size by editing the `script.js` file. Simply adjust the `tetrominos` array or the `width` and `height` constants to achieve different gameplay styles.

## Future Enhancements
- Add a high-score leaderboard.
- Implement multiplayer functionality with Socket.io.
- Improve mobile compatibility.

## Acknowledgments
- Inspired by classic Tetris and modern web development technologies.
