# 🎲 Dice Royale - Interactive Multiplayer Dice Game

A fun, interactive web-based dice game with multiple game modes, animated backgrounds, sound effects, and mobile-responsive design. Built with vanilla HTML, CSS, and JavaScript.

## 🎮 Game Features

### Game Modes
- **Classic Mode**: First player to reach 30 points wins
- **Knockout Mode**: Roll a 1 and you're eliminated! Last player standing wins
- **Team Mode**: Players are automatically divided into teams using a parity system

### Interactive Elements
- 🎵 Background music with mute/unmute functionality
- 🔊 Sound effects for dice rolling, eliminations, and victories
- 🎨 Animated floating background with colorful balls
- 📱 Fully responsive design for all screen sizes
- 🏆 Live scoreboard with medal rankings
- 💀 Visual elimination effects
- ✨ Hover effects and animations

### Player Features
- Custom player names (up to 15 characters)
- Support for 2-4 players
- Real-time score tracking
- Turn-based gameplay with visual indicators
- Custom alert system with different styles

## 🚀 Getting Started

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)
- No additional software required!

### Installation
1. Clone or download the repository
2. Ensure you have the following file structure:dice-royale/
├── index.html
├── styles.css
├── script.js
├── Dice images/
│   ├── dice1.png
│   ├── dice2.png
│   ├── dice3.png
│   ├── dice4.png
│   ├── dice5.png
│   └── dice6.png
└── sound/
├── intro.mp3
├── diceRolling.mp3
├── punch.mp3
└── gameOver.mp3

3. Open `index.html` in your web browser
4. Start playing!

## 🎯 How to Play

### Setup
1. Choose your preferred game mode
2. Select number of players (2-4)
3. Enter custom names for each player
4. Click "🚀 Start Game" to begin

### Gameplay
1. Players take turns rolling the dice
2. Your score increases by the number rolled
3. The current player is highlighted with a special border
4. Watch the live scoreboard update in real-time

### Game Mode Rules

#### Classic Mode
- First player to reach exactly 30 points wins
- Simple and straightforward gameplay

#### Knockout Mode
- Roll a 1 and you're eliminated from the game
- Eliminated players are visually marked and cannot continue
- Last player remaining wins

#### Team Mode
- Players are automatically divided into Team A and Team B
- Team assignment uses parity system (even/odd player numbers)
- First team to reach 30 points wins
- Team scores are displayed separately

## 🎨 Features & Effects

### Visual Effects
- **Animated Background**: Floating colored balls with smooth animations
- **Hover Effects**: Interactive dice with scaling and rotation
- **Player Highlighting**: Active player gets special visual treatment
- **Elimination Effects**: Crossed-out names and faded appearance for eliminated players

### Audio System
- **Background Music**: Looping intro music during setup
- **Sound Effects**: 
  - Dice rolling sound
  - Elimination/knockout sound
  - Victory fanfare
- **Mute Control**: Toggle button in top-right corner

### Responsive Design
- **Mobile Optimized**: Works perfectly on smartphones and tablets
- **Touch Friendly**: Large buttons and touch targets
- **Adaptive Layout**: Scoreboard repositions for mobile screens
- **Cross-Browser**: Compatible with all modern browsers

## 🛠️ Technical Details

### Technologies Used
- **HTML5**: Semantic markup and structure
- **CSS3**: Advanced styling, animations, and responsive design
- **Vanilla JavaScript**: Game logic, DOM manipulation, and event handling
- **Bootstrap 5**: Modal components for instructions
- **Web Audio API**: Sound effects and music playback

### Browser Compatibility
- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+
- Mobile browsers (iOS Safari, Chrome Mobile)

### Performance Features
- Optimized animations using CSS transforms
- Efficient DOM manipulation
- Minimal external dependencies
- Lightweight asset loading

## 📱 Mobile Support

The game is fully optimized for mobile devices with:
- Touch-friendly interface
- Responsive breakpoints for different screen sizes
- Optimized font sizes and spacing
- Prevented zoom on form inputs
- Proper touch target sizes (44px minimum)

### Supported Screen Sizes
- Desktop: 1200px and above
- Tablet: 768px - 1199px
- Mobile: 320px - 767px
- Small Mobile: 320px and below

## 🎵 Audio Assets

### Required Audio Files
Place these files in the `sound/` directory:
- `intro.mp3` - Background music during setup
- `diceRolling.mp3` - Sound when dice is rolled
- `punch.mp3` - Sound when player is eliminated
- `gameOver.mp3` - Victory sound when game ends

### Audio Features
- Autoplay prevention compliance
- Volume controls
- Error handling for unsupported formats
- Mute/unmute functionality

## 🖼️ Image Assets

### Required Dice Images
Place these files in the `Dice images/` directory:
- `dice1.png` through `dice6.png`
- Recommended size: 120x120 pixels
- Format: PNG with transparency support

## 🎮 Game Controls

### Setup Screen
- **Game Mode Dropdown**: Select Classic, Knockout, or Team mode
- **Player Count**: Choose 2-4 players
- **Name Inputs**: Enter custom player names
- **Start Button**: Begin the game

### Game Screen
- **Roll Dice Button**: Roll the dice for current player
- **Restart Button**: Return to setup (appears after game ends)
- **Mute Button**: Toggle background music
- **Instructions Button**: View game rules

## 🏆 Scoring System

### Points
- Players earn points equal to the dice roll (1-6)
- Scores are displayed in real-time
- Live scoreboard shows rankings with medal emojis

### Win Conditions
- **Classic**: First to 30 points
- **Knockout**: Last player remaining
- **Team**: First team to 30 points

## 🐛 Troubleshooting

### Common Issues

**Audio not playing:**
- Check if browser allows autoplay
- Ensure audio files are in correct directory
- Try clicking anywhere to enable audio context

**Images not loading:**
- Verify dice images are in `Dice images/` folder
- Check file names match exactly (case-sensitive)
- Ensure images are in PNG format

**Mobile display issues:**
- Clear browser cache
- Ensure viewport meta tag is present
- Check for JavaScript errors in console

## 🤝 Contributing

Feel free to contribute to this project! Areas for improvement:
- Additional game modes
- More sound effects
- Enhanced animations
- Multiplayer online support
- Score persistence

## 📄 License

This project is open source.

## 🎉 Credits

- Game concept and development: Original creation
- Sound effects: Various sources (ensure you have proper licenses)
- Icons: Emoji characters for cross-platform compatibility
- Animations: CSS3 transforms and keyframes

---

**Enjoy playing Dice Royale! 🎲🏆**

*For support or questions, please open an issue in the repository.*
