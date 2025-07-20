//make the browser wait before the entire(both pages) HTML is loaded to avoid crash
document.addEventListener("DOMContentLoaded", function () {

    const setupForm = document.getElementById("setupForm");
    const setupScreen = document.getElementById("setupScreen");
    const gameScreen = document.getElementById("gameScreen");
    const playerArea = document.getElementById("playerArea");
    const playerCountSelect = document.getElementById("playerCount");
    const rollBtn = document.getElementById("rollBtn");
    //to restart game after 1 round
    const restartBtn = document.getElementById("restartBtn");
    const diceImage = document.getElementById("diceImage");
    const turnIndicator = document.getElementById("turnIndicator");

    //-----------------------------sound effects----------------------------
  let musicStarted = false;

  // Start music on first user interaction 
  document.addEventListener("click", () => {
    if (!musicStarted) {
      introMusic.play().catch(err => console.log("Autoplay blocked:", err));
      musicStarted = true;
    }
  });

  // Mute button logic
  muteBtn.addEventListener("click", () => {
    introMusic.muted = !introMusic.muted;
    muteBtn.textContent = introMusic.muted ? "🔈 Unmute Music" : "🔇 Mute Music";
  });

  // Stop music when game starts
  setupForm.addEventListener("submit", function (e) {
    e.preventDefault();

    // Your form handling logic (switch screens, init game etc.)
    setupScreen.style.display = "none";
    gameScreen.style.display = "block";

    // Stop the music
    introMusic.pause();
    introMusic.currentTime = 0;
  });

    //roll sound 
    const rollSound = new Audio('./sound/diceRolling.mp3'); 
    rollSound.volume=0.70;
     
    //knowckout sound
    const knockoutSound = new Audio('./sound/punch.mp3');
    knockoutSound.volume=1;

    //gameover sound
    const victorySound = new Audio('./sound/gameOver.mp3');
    victorySound.volume = 1; 










// -----------------------------------------------------------------------------------------------------------------
  
    
    // Added player name functionality  
    const playerInputs = document.getElementById("playerInputs");
    let playerNames = {};

    // custom Alert Box System (
    function createCustomAlert(message, type = 'info') {
        // Remove any existing alert box
        const existingBox = document.getElementById('customAlertBox');
        if (existingBox) {
            existingBox.remove();
        }

        // Create overlay
        const overlay = document.createElement('div');
        overlay.id = 'customAlertBox';

        // Create alert box
        const alertBox = document.createElement('div');
        alertBox.className = `alert-box ${type}`;

        // Create alert content
        const iconMap = {
            'win': '🏆',
            'team-win': '🏆', 
            'elimination': '💀',
            'info': '🎮'
        };

        alertBox.innerHTML = `
            <div class="alert-icon">${iconMap[type] || '🎮'}</div>
            <div class="alert-message">${message}</div>
            <button class="alert-ok-btn" id="alertOkBtn">OK</button>
        `;

        overlay.appendChild(alertBox);
        document.body.appendChild(overlay);

        // Handle OK button click
        document.getElementById('alertOkBtn').addEventListener('click', function() {
            overlay.remove();
        });

        // Handle overlay click to close when we click outside the box
        overlay.addEventListener('click', function(e) {
            if (e.target === overlay) {
                overlay.remove();
            }
        });
    }
        
    // team mode-------------------------------------
    let teamA = [];
    let teamB = [];
    let teamAScore = 0;
    let teamBScore = 0;
    const teamScores = document.getElementById("teamScores");
//--------------------------------------------------------
    const WINNING_SCORE = 30;
    let gameMode = "classic";
    let remainingPlayers = []; //to track the remaining players in knockout mode
    let currentPlayer = 1;
    let activePlayers = []; // Declare activePlayers variable here
    
    //generate player name inputs when player count changes(increase or decrese the boxes of inpput)
    playerCountSelect.addEventListener("change", function () {
        generatePlayerNameInputs();
    });
//clear
    // function to generate player name input fields
    function generatePlayerNameInputs() {
        const playerCount = parseInt(playerCountSelect.value);
        playerInputs.innerHTML = ""; // Clear previous inputs
        
        for (let i = 1; i <= playerCount; i++) {
            //styling of the first appearance 
            const label = document.createElement("label");
            label.textContent = `👤 Player ${i} Name:`;
            label.style.display = "block";
            label.style.marginTop = "10px";
            label.style.marginBottom = "5px";
            //actual data entry
            const input = document.createElement("input");
            input.type = "text";
            input.id = `playerName${i}`;
            input.placeholder = `Enter Player ${i} name`;
            input.required = true;
            input.maxLength = 15;
            
            playerInputs.appendChild(label);
            playerInputs.appendChild(input);
        }
    }

    //  Function to collect and validate player names  //clear
    function collectPlayerNames() {
        const playerCount = parseInt(playerCountSelect.value);
        playerNames = {}; // Reset player names
        
        for (let i = 1; i <= playerCount; i++) {
            const nameInput = document.getElementById(`playerName${i}`);
            const name = nameInput.value.trim(); // to remove the spaces
            
            if (!name) {
                createCustomAlert(`❌ Please enter a name for Player ${i}!`, 'info'); //replaced alert
                nameInput.focus();
                return false;
            }
            //check for duplicate names
            const existingNames = Object.values(playerNames);
            if (existingNames.includes(name)) {
                createCustomAlert(`❌ "${name}" is already taken! Please choose a different name.`, 'info'); 
                nameInput.focus();
                return false;
            }
            
            playerNames[i] = name;
        }
        return true;
    }

    //  Initialize with default player count  clear
    generatePlayerNameInputs();
    
    //when we click on submit, this fucntion e will run
    setupForm.addEventListener("submit", function (e) {
        //select the game mode
  
        gameMode = document.getElementById("gameMode").value;
        e.preventDefault(); //this will stop the default behaviour of submit and refresh the page.We need the same page & switch to inGame screen
        
        //  Collect and validate player names first  clear
        if (!collectPlayerNames()) {
            return; // Stop if names are invalid
        }
        
        const playerCount = parseInt(playerCountSelect.value);
        playerArea.innerHTML = ""; //this will clear the prev record when we restart
        activePlayers = []; // reset if restarting
        //adding players dynamically
        for (let i = 1; i <= playerCount; i++) {
            activePlayers.push(i); // Add player i to the alive list(for elimination mode)
            const playerBox = document.createElement("div"); //creates a div like (<div class="playerBox" id="player1Box">...</div>) in memeory
            playerBox.classList.add("playerBox"); //this will add the styling elemnt
            playerBox.id = `player${i}Box`; //this will generate unique id like player1Box 
            //makes every box show Player name & a starting score of 0 
            
            //  Use custom player name instead of "Player X"  clear
            const playerName = playerNames[i] || `Player ${i}`;
            playerBox.innerHTML = `
              <h3>${playerName}</h3>
              <p>Score: <span class="score">0</span></p>
                `;
    //add the created box on the page.Withou this the box will stay in memory only.All these will be added
    //<div class="playerBox" id="player1Box">...</div>
       //<div class="playerBox" id="player2Box">...</div>
    //<div class="playerBox" id="player3Box">...</div>
            playerArea.appendChild(playerBox);
        }
//-------------------------Team Mode --------------------------------------------
        teamA = [];
        teamB = [];
        if (gameMode === "team") {
            teamScores.style.display = "block"; 
            for (let i = 0; i < activePlayers.length; i++) {
                if (i % 2 === 0) {
                    teamA.push(activePlayers[i]);
                } else {
                    teamB.push(activePlayers[i]);
                }
            }
        } else {
            //hiding the score of teams when not
            teamScores.style.display = "none";
        }
//hide the setup screen by affecting the html tag (<div id="setupScreen" style="display: none;">...</div>)
        setupScreen.style.display = "none";
        //show the ingame screen
        gameScreen.style.display = "block";
        
        //  Update turn indicator with player name and highlight first player
        updateTurnIndicator();
        highlightCurrentPlayer();
    });

    //  Function to update turn indicator with player name  clear
    function updateTurnIndicator() {
        const currentPlayerName = playerNames[currentPlayer] || `Player ${currentPlayer}`;
        turnIndicator.textContent = `🎲 ${currentPlayerName}'s Turn`;
    }

    //  Function to highlight current player
    function highlightCurrentPlayer() {
        // Remove active class from all players
        document.querySelectorAll(".playerBox").forEach((box) => {  //remove the highlisght from every player
            box.classList.remove("activePlayer");
        });
        
        // Add active class to current player
        const currentPlayerBox = document.getElementById(`player${currentPlayer}Box`);
        if (currentPlayerBox) {
            currentPlayerBox.classList.add("activePlayer");
        }
    }

// ----------------------------------live score update---------------------------------------
    function updateScoreboard() {
        const scoreList = document.getElementById("scoreList"); //fetch the unordred list 
        scoreList.innerHTML = ""; // clearing previous scoreboard
//select every player box that is made on the screen
        const playerBoxes = document.querySelectorAll(".playerBox");
//array.from takes the HTML element of the playerBoxes & converts it into JS array
//now .map will loop over every playerBox & store name which in h3 of HTML and score from the span class score of html
        const players = Array.from(playerBoxes).map((box, index) => {
            const name = box.querySelector("h3").textContent;
            const score = parseInt(box.querySelector(".score").textContent);
            return { name, score };
        });
        // sort players by score in  descending order
        players.sort((a, b) => b.score - a.score);
        // add sorted players to scoreboard
        players.forEach((player, index) => { //  Added medal emojis clear
            const li = document.createElement("li");
            const medal = index === 0 ? "🥇" : index === 1 ? "🥈" : index === 2 ? "🥉" : "🏅"; 
            //used template literal to convert name and score to string
            li.textContent = `${medal} ${player.name}: ${player.score}`; //  Added medal
            scoreList.appendChild(li); //this will add out li to the ul of html tag scorelist
        });
        
        //  Removed the reordering of player boxes to keep original layout
        // Original code was moving boxes around, but we want to keep them in place
    }

//-----------------------dice roll logic-------------------------------
    rollBtn.addEventListener("click", function () {
        const roll = Math.floor(Math.random() * 6) + 1;
        diceImage.src = `./Dice images/dice${roll}.png`; //this send randomised png to be fatched  

        //roll sound 
        rollSound.currentTime=0;    //mean to start music from start everytime
        rollSound.play().catch(err => console.log("Roll sound error:", err)); //means if we catch an error for some reason, we will return this

    
        //selecting the score of the player whose turn is ongoing
        const playerScoreSpan = document.querySelector(
            `#player${currentPlayer}Box .score`  //look for  score as a child of class Box
            //eg:
            // <div id="player2Box">
            // <span class="score">...</span>
            // </div>
        );
        let currentScore = parseInt(playerScoreSpan.textContent);
        playerScoreSpan.textContent = currentScore + roll; //converted-added and then pushed this new score to back to span
    
        //  Get current player name for messages
        const currentPlayerName = playerNames[currentPlayer] || `Player ${currentPlayer}`;
    
        //Team Mode logic
        if (gameMode === "team") {
            if (teamA.includes(currentPlayer)) {
                teamAScore += roll;
                document.getElementById("teamAScoreDisplay").textContent = teamAScore; //update the score card
            } else if (teamB.includes(currentPlayer)) {
                teamBScore += roll;
                document.getElementById("teamBScoreDisplay").textContent = teamBScore;
            }
            //check for the win
            if (teamAScore >= WINNING_SCORE) {
                //  Show team member names in win message    clear
                //we store the names in  a map so we iterate over the map and join the team members name like Adil & Rahul 
                const teamANames = teamA.map(p => playerNames[p] || `Player ${p}`).join(" & ");
                createCustomAlert(`🏆 Team A (${teamANames}) wins!`, 'team-win'); 
                victorySound.currentTime = 0;
                victorySound.play().catch(err => console.log("Victory sound error:", err));


                updateScoreboard(); //fix:update score board after winner
                rollBtn.disabled = true;
                restartBtn.style.display="inline-block";
                return;
            } else if (teamBScore >= WINNING_SCORE) {
                //  Show team member names in win message
                const teamBNames = teamB.map(p => playerNames[p] || `Player ${p}`).join(" & ");
                createCustomAlert(`🏆 Team B (${teamBNames}) wins!`, 'team-win');
                victorySound.currentTime = 0;
                victorySound.play().catch(err => console.log("Victory sound error:", err));

                updateScoreboard(); //fix:update score board after winner
                rollBtn.disabled = true;
                restartBtn.style.display="inline-block";
                return;
            }
        }
        if (currentScore + roll >= WINNING_SCORE && gameMode === "classic") {
            createCustomAlert(`🎉 ${currentPlayerName} wins!`, 'win');
            //victory sound
            victorySound.currentTime = 0; 
            victorySound.play().catch(err => console.log("Victory sound error:", err));

            //score update even when we have a winner fix
            updateScoreboard();  
            highlightCurrentPlayer(); //highlight last player standing  
            rollBtn.disabled = true; // stop the game
            restartBtn.style.display = "inline-block"; //restrat button
            return;
        }
        // Remove active class from all players
        document.querySelectorAll(".playerBox").forEach((box) => {
            box.classList.remove("activePlayer");
        });
        // Move to next player
        // currentPlayer++;
        // if (currentPlayer > parseInt(playerCountSelect.value)) {//means if player > 4 toh circle back to 1
        //   currentPlayer = 1;
        // }
        // -----------knockout mode----------------------
        if (gameMode === "knockout") {
            //note the index first to avoid error
            let currentIndex = activePlayers.indexOf(currentPlayer);
            //eliminate if rolled 1
            if (roll === 1) {
                //sound of elimination

                knockoutSound.currentTime = 0;
                knockoutSound.play().catch(err => console.log("Knockout sound error:", err));

                createCustomAlert(`💀 ${currentPlayerName} is eliminated!`, 'elimination'); 
                //elimonated players appearance logic 
                const eliminatedBox = document.getElementById(`player${currentPlayer}Box`);
                if (eliminatedBox) {
                    eliminatedBox.classList.add("eliminated");
                    eliminatedBox.querySelector("h3").innerHTML = `<s>${currentPlayerName}</s> is DEAD 💀`;
                }
                //filter() is an array method which will create a new array only with the elements which pass the conditio
//means let activPlay=[1,2,3] currPla=3 so filter will check for p!=3 by moving in array activPlay
                activePlayers = activePlayers.filter(p => p !== currentPlayer);
                                
                //  FIXED THE BUG HERE - Proper next player calculation after elimination
                if (activePlayers.length > 1) {
                    // If we eliminated the last player in the array, go back to first
                    if (currentIndex >= activePlayers.length) {
                        currentPlayer = activePlayers[0];
                    } else {
                        // Otherwise, the next player is now at the same index position
                        currentPlayer = activePlayers[currentIndex];
                    }
                }
                // END OF BUG FIX
                
            } else {
                //  Normal turn progression when no elimination  clear
                currentPlayer = activePlayers[(currentIndex + 1) % activePlayers.length];
            }
            
            //when 1 player is left
            if (activePlayers.length === 1) {
                //  Use player name in win message
                const winnerName = playerNames[activePlayers[0]] || `Player ${activePlayers[0]}`;
                createCustomAlert(`🏆 ${winnerName} wins!`, 'win'); 
                victorySound.currentTime = 0; // ensure it starts from beginning
                victorySound.play().catch(err => console.log("Victory sound error:", err));

                rollBtn.disabled = true;
                restartBtn.style.display = "inline-block"; //restart button 
                return;
            }
        } else {
            //classic mode
            currentPlayer++;
            if (currentPlayer > parseInt(playerCountSelect.value)) {
                currentPlayer = 1; //4->1 jump
            }
        }
        
        // Update turn heading
        //  Use player name in turn indicator
        updateTurnIndicator();
        // Add active highlight to the current player
        const currentPlayerBox = document.getElementById(
            `player${currentPlayer}Box`
        );
        //from above we will get player5Box and then we would add activePlayer class in this which is defined in css    
        if (currentPlayerBox) {
            currentPlayerBox.classList.add("activePlayer");
        }
        // calling the function to update and reorder the scoreboard + player boxes
        //
        updateScoreboard();


        


    });

    restartBtn.addEventListener("click", function () {
        // Reset game state
        gameScreen.style.display = "none";  //hide the game screen
        setupScreen.style.display = "block"; //show the setupscreen
        rollBtn.disabled = false; //we disabled it after the win, so now we again activate it
        restartBtn.style.display = "none"; //hide the playagaim button again
        currentPlayer = 1;

          // Restart intro music
          introMusic.currentTime = 0;
          introMusic.play().catch(err => console.log("Autoplay blocked:", err));
        
        // reset player names and regenerate inputs
        playerNames = {};
        document.querySelectorAll('#playerInputs input').forEach(input => {
            input.value = '';
        });
        generatePlayerNameInputs();
    });

// ---------------------------------------------------prebuild background theme ---------------------------------------------------------
        // Some random colors
const colors = ["#3CC157", "#2AA7FF", "#1B1B1B", "#FCBC0F", "#F85F36"];

const numBalls = 50;
const balls = [];

for (let i = 0; i < numBalls; i++) {
  let ball = document.createElement("div");
  ball.classList.add("ball");
  ball.style.background = colors[Math.floor(Math.random() * colors.length)];
  ball.style.left = `${Math.floor(Math.random() * 100)}vw`;
  ball.style.top = `${Math.floor(Math.random() * 100)}vh`;
  ball.style.transform = `scale(${Math.random()})`;
  ball.style.width = `${Math.random()}em`;
  ball.style.height = ball.style.width;
  
  balls.push(ball);
  document.body.append(ball);
}

// Keyframes
balls.forEach((el, i, ra) => {
  let to = {
    x: Math.random() * (i % 2 === 0 ? -11 : 11),
    y: Math.random() * 12
  };

  let anim = el.animate(
    [
      { transform: "translate(0, 0)" },
      { transform: `translate(${to.x}rem, ${to.y}rem)` }
    ],
    {
      duration: (Math.random() + 1) * 2000, // random duration
      direction: "alternate",
      fill: "both",
      iterations: Infinity,
      easing: "ease-in-out"
    }
  );
});
});










