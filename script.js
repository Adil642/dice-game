// Enhanced Dice Royale with Sound Effects and Visual Enhancements

class EnhancedDiceRoyale {
    constructor() {
        this.players = [];
        this.currentPlayerIndex = 0;
        this.currentRound = 1;
        this.maxRounds = 10;
        this.gameMode = 'classic';
        this.gameState = 'setup';
        this.soundEnabled = true;
        this.audioContext = null;
        
        // Enhanced dice rules with emojis
        this.diceRules = {
            1: { effect: 'penalty', value: -2, message: '💥 Ouch! Lost 2 points! 💥', emoji: '😵' },
            2: { effect: 'steal', value: 3, message: '🏴‍☠️ Steal 3 points from another player! 🏴‍☠️', emoji: '😈' },
            3: { effect: 'bonus', value: 3, message: '✨ Nice! Gained 3 points! ✨', emoji: '😊' },
            4: { effect: 'powerup', value: 0, message: '⚡ Power-up incoming! ⚡', emoji: '🤩' },
            5: { effect: 'bonus', value: 5, message: '🎉 Great! Gained 5 points! 🎉', emoji: '😄' },
            6: { effect: 'double', value: 0, message: '🍀 Lucky! Roll again! 🍀', emoji: '🤑' }
        };
        
        this.powerupEffects = [
            { name: '💰 Bonus Boost', effect: 'bonus', value: 5, emoji: '💰' },
            { name: '🧊 Frozen Turn', effect: 'freeze', value: 0, emoji: '🧊' },
            { name: '🔄 Forced Swap', effect: 'swap', value: 0, emoji: '🔄' },
            { name: '🕳️ Trap', effect: 'trap', value: 0, emoji: '🕳️' }
        ];
        
        this.init();
    }

    init() {
        this.initAudio();
        this.setupEventListeners();
        this.generatePlayerInputs();
        this.createParticleEffects();
    }

    initAudio() {
        try {
            this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
        } catch (e) {
            console.log('Audio not supported');
            this.soundEnabled = false;
        }
    }

    // Enhanced Sound Effects
    playSound(type, frequency = 440, duration = 200) {
        if (!this.soundEnabled || !this.audioContext) return;

        const oscillator = this.audioContext.createOscillator();
        const gainNode = this.audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(this.audioContext.destination);
        
        switch(type) {
            case 'roll':
                this.playRollSound();
                break;
            case 'success':
                this.playSuccessSound();
                break;
            case 'penalty':
                this.playPenaltySound();
                break;
            case 'powerup':
                this.playPowerupSound();
                break;
            case 'victory':
                this.playVictorySound();
                break;
            case 'click':
                this.playClickSound();
                break;
            case 'lifeline':
                this.playLifelineSound();
                break;
            default:
                oscillator.frequency.setValueAtTime(frequency, this.audioContext.currentTime);
                oscillator.type = 'sine';
                gainNode.gain.setValueAtTime(0.1, this.audioContext.currentTime);
                gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + duration / 1000);
                oscillator.start();
                oscillator.stop(this.audioContext.currentTime + duration / 1000);
        }
    }

    playRollSound() {
        if (!this.audioContext) return;
        
        // Create a rolling dice sound effect
        for (let i = 0; i < 5; i++) {
            setTimeout(() => {
                const oscillator = this.audioContext.createOscillator();
                const gainNode = this.audioContext.createGain();
                
                oscillator.connect(gainNode);
                gainNode.connect(this.audioContext.destination);
                
                oscillator.frequency.setValueAtTime(200 + Math.random() * 400, this.audioContext.currentTime);
                oscillator.type = 'square';
                gainNode.gain.setValueAtTime(0.1, this.audioContext.currentTime);
                gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.1);
                
                oscillator.start();
                oscillator.stop(this.audioContext.currentTime + 0.1);
            }, i * 50);
        }
    }

    playSuccessSound() {
        if (!this.audioContext) return;
        
        const frequencies = [523, 659, 784]; // C, E, G
        frequencies.forEach((freq, index) => {
            setTimeout(() => {
                const oscillator = this.audioContext.createOscillator();
                const gainNode = this.audioContext.createGain();
                
                oscillator.connect(gainNode);
                gainNode.connect(this.audioContext.destination);
                
                oscillator.frequency.setValueAtTime(freq, this.audioContext.currentTime);
                oscillator.type = 'sine';
                gainNode.gain.setValueAtTime(0.15, this.audioContext.currentTime);
                gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.3);
                
                oscillator.start();
                oscillator.stop(this.audioContext.currentTime + 0.3);
            }, index * 100);
        });
    }

    playPenaltySound() {
        if (!this.audioContext) return;
        
        const oscillator = this.audioContext.createOscillator();
        const gainNode = this.audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(this.audioContext.destination);
        
        oscillator.frequency.setValueAtTime(200, this.audioContext.currentTime);
        oscillator.frequency.exponentialRampToValueAtTime(100, this.audioContext.currentTime + 0.5);
        oscillator.type = 'sawtooth';
        gainNode.gain.setValueAtTime(0.2, this.audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.5);
        
        oscillator.start();
        oscillator.stop(this.audioContext.currentTime + 0.5);
    }

    playPowerupSound() {
        if (!this.audioContext) return;
        
        const frequencies = [440, 554, 659, 880];
        frequencies.forEach((freq, index) => {
            setTimeout(() => {
                const oscillator = this.audioContext.createOscillator();
                const gainNode = this.audioContext.createGain();
                
                oscillator.connect(gainNode);
                gainNode.connect(this.audioContext.destination);
                
                oscillator.frequency.setValueAtTime(freq, this.audioContext.currentTime);
                oscillator.type = 'triangle';
                gainNode.gain.setValueAtTime(0.1, this.audioContext.currentTime);
                gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.2);
                
                oscillator.start();
                oscillator.stop(this.audioContext.currentTime + 0.2);
            }, index * 80);
        });
    }

    playVictorySound() {
        if (!this.audioContext) return;
        
        const melody = [523, 659, 784, 1047]; // Victory fanfare
        melody.forEach((freq, index) => {
            setTimeout(() => {
                const oscillator = this.audioContext.createOscillator();
                const gainNode = this.audioContext.createGain();
                
                oscillator.connect(gainNode);
                gainNode.connect(this.audioContext.destination);
                
                oscillator.frequency.setValueAtTime(freq, this.audioContext.currentTime);
                oscillator.type = 'sine';
                gainNode.gain.setValueAtTime(0.2, this.audioContext.currentTime);
                gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.4);
                
                oscillator.start();
                oscillator.stop(this.audioContext.currentTime + 0.4);
            }, index * 200);
        });
    }

    playClickSound() {
        if (!this.audioContext) return;
        
        const oscillator = this.audioContext.createOscillator();
        const gainNode = this.audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(this.audioContext.destination);
        
        oscillator.frequency.setValueAtTime(800, this.audioContext.currentTime);
        oscillator.type = 'square';
        gainNode.gain.setValueAtTime(0.1, this.audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.1);
        
        oscillator.start();
        oscillator.stop(this.audioContext.currentTime + 0.1);
    }

    playLifelineSound() {
        if (!this.audioContext) return;
        
        // Magical lifeline sound
        const frequencies = [659, 784, 988, 1175];
        frequencies.forEach((freq, index) => {
            setTimeout(() => {
                const oscillator = this.audioContext.createOscillator();
                const gainNode = this.audioContext.createGain();
                
                oscillator.connect(gainNode);
                gainNode.connect(this.audioContext.destination);
                
                oscillator.frequency.setValueAtTime(freq, this.audioContext.currentTime);
                oscillator.type = 'sine';
                gainNode.gain.setValueAtTime(0.15, this.audioContext.currentTime);
                gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.3);
                
                oscillator.start();
                oscillator.stop(this.audioContext.currentTime + 0.3);
            }, index * 100);
        });
    }

    setupEventListeners() {
        // Setup form
        document.getElementById('setupForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.playClickSound();
            this.startGame();
        });

        document.getElementById('playerCount').addEventListener('change', () => {
            this.playClickSound();
            this.generatePlayerInputs();
        });

        document.getElementById('gameMode').addEventListener('change', () => {
            this.playClickSound();
        });

        // Game controls
        document.getElementById('rollBtn').addEventListener('click', () => {
            this.rollDice();
        });

        document.getElementById('useLifelineBtn').addEventListener('click', () => {
            this.playClickSound();
            this.showLifelineModal();
        });

        // Sound toggle
        document.getElementById('soundToggle').addEventListener('click', () => {
            this.toggleSound();
        });

        // Lifeline selection
        document.querySelectorAll('.lifeline-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.playLifelineSound();
                this.useLifeline(e.target.closest('.lifeline-btn').dataset.lifeline);
            });
        });

        // Results screen
        document.getElementById('playAgainBtn').addEventListener('click', () => {
            this.playClickSound();
            this.resetGame();
        });

        document.getElementById('newGameBtn').addEventListener('click', () => {
            this.playClickSound();
            this.newGame();
        });

        // Add click sounds to all buttons
        document.addEventListener('click', (e) => {
            if (e.target.matches('button, .btn')) {
                this.playClickSound();
            }
        });
    }

    toggleSound() {
        this.soundEnabled = !this.soundEnabled;
        const btn = document.getElementById('soundToggle');
        btn.textContent = this.soundEnabled ? '🔊 Sound ON' : '🔇 Sound OFF';
        btn.classList.toggle('btn-outline-light');
        btn.classList.toggle('btn-outline-danger');
    }

    createParticleEffects() {
        const particles = document.getElementById('particles');
        
        // Create floating emojis
        const emojis = ['✨', '🌟', '💫', '⭐', '🎆', '🎇'];
        
        setInterval(() => {
            if (this.gameState === 'playing') {
                const emoji = emojis[Math.floor(Math.random() * emojis.length)];
                this.createFloatingParticle(emoji);
            }
        }, 3000);
    }

    createFloatingParticle(emoji) {
        const particle = document.createElement('div');
        particle.className = 'particle-effect';
        particle.textContent = emoji;
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = '100%';
        particle.style.position = 'fixed';
        particle.style.zIndex = '1';
        
        document.getElementById('floatingEffects').appendChild(particle);
        
        setTimeout(() => {
            particle.remove();
        }, 4000);
    }

    generatePlayerInputs() {
        const count = parseInt(document.getElementById('playerCount').value);
        const container = document.getElementById('playerInputs');
        container.innerHTML = '';

        const playerEmojis = ['🦸‍♂️', '🦸‍♀️', '🧙‍♂️', '🧙‍♀️'];

        for (let i = 0; i < count; i++) {
            const div = document.createElement('div');
            div.className = 'mb-3';
            div.innerHTML = `
                <label class="form-label fw-bold game-label">
                    ${playerEmojis[i]} Player ${i + 1} Name
                </label>
                <input type="text" class="form-control enhanced-select" id="player${i}" 
                       placeholder="Enter warrior ${i + 1} name" required>
            `;
            container.appendChild(div);
        }
    }

    startGame() {
        const playerCount = parseInt(document.getElementById('playerCount').value);
        this.gameMode = document.getElementById('gameMode').value;
        this.players = [];

        for (let i = 0; i < playerCount; i++) {
            const name = document.getElementById(`player${i}`).value.trim();
            if (!name) {
                alert(`Please enter a name for Player ${i + 1}! 🎮`);
                return;
            }
            
            this.players.push({
                name: name,
                score: 0,
                lifeline: null,
                lifelineUsed: false,
                effects: [],
                eliminated: false,
                team: this.gameMode === 'team' ? (i < 2 ? 'A' : 'B') : null,
                emoji: ['🦸‍♂️', '🦸‍♀️', '🧙‍♂️', '🧙‍♀️'][i]
            });
        }

        this.gameState = 'playing';
        this.showGameScreen();
        this.updateDisplay();
        this.showLifelineSelection();
        this.playSuccessSound();
    }

    showLifelineSelection() {
        this.selectLifelinesForAllPlayers(0);
    }

    selectLifelinesForAllPlayers(playerIndex) {
        if (playerIndex >= this.players.length) {
            this.startFirstTurn();
            return;
        }

        const player = this.players[playerIndex];
        const modal = new bootstrap.Modal(document.getElementById('lifelineModal'));
        
        document.querySelector('#lifelineModal .modal-title').innerHTML = 
            `${player.emoji} ${player.name}, choose your lifeline power! 🛡️`;
        
        document.querySelectorAll('.lifeline-btn').forEach(btn => {
            btn.replaceWith(btn.cloneNode(true));
        });

        document.querySelectorAll('.lifeline-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const lifeline = e.currentTarget.dataset.lifeline;
                player.lifeline = lifeline;
                modal.hide();
                this.playLifelineSound();
                this.selectLifelinesForAllPlayers(playerIndex + 1);
            });
        });

        modal.show();
    }

    startFirstTurn() {
        this.currentPlayerIndex = 0;
        this.updateDisplay();
        this.showMessage("🎮 Epic battle started! Click 'ROLL DICE' to begin your legendary turn! ⚔️");
    }

    showGameScreen() {
        document.getElementById('setupScreen').classList.add('d-none');
        document.getElementById('gameScreen').classList.remove('d-none');
        document.getElementById('currentGameMode').textContent = this.getGameModeText();
    }

    getGameModeText() {
        switch(this.gameMode) {
            case 'classic': return '🏆 Classic (10 rounds)';
            case 'knockout': return '⚔️ Knockout (eliminate < 0)';
            case 'team': return '🤝 Team Mode (2v2)';
            default: return '🏆 Classic';
        }
    }

    rollDice() {
        if (this.gameState !== 'playing') return;

        const currentPlayer = this.players[this.currentPlayerIndex];
        
        if (currentPlayer.effects.includes('frozen')) {
            this.showMessage(`🧊 ${currentPlayer.name} is frozen and skips this turn! ❄️`);
            currentPlayer.effects = currentPlayer.effects.filter(e => e !== 'frozen');
            this.playPenaltySound();
            this.nextTurn();
            return;
        }

        document.getElementById('rollBtn').disabled = true;
        this.playRollSound();
        this.animateDice(() => {
            const roll = Math.floor(Math.random() * 6) + 1;
            this.processDiceRoll(roll);
        });
    }

    animateDice(callback) {
        const dice = document.getElementById('dice');
        dice.classList.add('rolling');
        
        // Add screen shake effect
        document.body.classList.add('screen-shake');
        setTimeout(() => {
            document.body.classList.remove('screen-shake');
        }, 500);
        
        let animationCount = 0;
        const animationInterval = setInterval(() => {
            const randomFace = Math.floor(Math.random() * 6) + 1;
            this.updateDiceFace(randomFace);
            animationCount++;
            
            if (animationCount >= 15) {
                clearInterval(animationInterval);
                dice.classList.remove('rolling');
                callback();
            }
        }, 100);
    }

    updateDiceFace(number) {
        const dice = document.getElementById('dice');
        const faceClasses = [
            'fa-dice-one', 'fa-dice-two', 'fa-dice-three',
            'fa-dice-four', 'fa-dice-five', 'fa-dice-six'
        ];
        
        dice.innerHTML = `<i class="fas ${faceClasses[number - 1]}"></i>`;
    }

    processDiceRoll(roll) {
        const currentPlayer = this.players[this.currentPlayerIndex];
        const rule = this.diceRules[roll];
        
        this.updateDiceFace(roll);
        
        if (currentPlayer.effects.includes('trapped')) {
            this.showMessage(`🕳️ ${currentPlayer.name} is trapped! Automatic penalty of -3 points! 💥`);
            currentPlayer.score -= 3;
            currentPlayer.effects = currentPlayer.effects.filter(e => e !== 'trapped');
            this.createFloatingText('-3', 'negative', '💥');
            this.playPenaltySound();
        } else {
            this.applyDiceEffect(roll, rule, currentPlayer);
        }

        // Random power-up chance (20%)
        if (Math.random() < 0.2) {
            setTimeout(() => this.triggerRandomPowerup(), 1500);
        }

        this.updateDisplay();
        
        if (this.checkGameEnd()) {
            setTimeout(() => this.endGame(), 2000);
            return;
        }

        setTimeout(() => {
            if (rule.effect !== 'double') {
                this.nextTurn();
            } else {
                this.showMessage("🍀 Roll again, lucky warrior! 🎲");
                document.getElementById('rollBtn').disabled = false;
            }
        }, 2000);
    }

    applyDiceEffect(roll, rule, player) {
        switch(rule.effect) {
            case 'penalty':
                player.score += rule.value;
                this.createFloatingText(rule.value.toString(), 'negative', rule.emoji);
                this.playPenaltySound();
                break;
                
            case 'bonus':
                player.score += rule.value;
                this.createFloatingText(`+${rule.value}`, 'positive', rule.emoji);
                this.playSuccessSound();
                break;
                
            case 'steal':
                this.handleSteal(player, rule.value);
                break;
                
            case 'powerup':
                this.triggerRandomPowerup();
                this.playPowerupSound();
                break;
                
            case 'double':
                this.playSuccessSound();
                break;
        }
        
        this.showMessage(rule.message);
    }

    handleSteal(stealingPlayer, amount) {
        const otherPlayers = this.players.filter((p, i) => 
            i !== this.currentPlayerIndex && !p.eliminated && p.score > 0
        );
        
        if (otherPlayers.length === 0) {
            this.showMessage("🤷‍♂️ No one to steal from! 🤷‍♀️");
            return;
        }
        
        const targetPlayer = otherPlayers[Math.floor(Math.random() * otherPlayers.length)];
        const actualSteal = Math.min(amount, targetPlayer.score);
        
        targetPlayer.score -= actualSteal;
        stealingPlayer.score += actualSteal;
        
        this.showMessage(`🏴‍☠️ ${stealingPlayer.name} stole ${actualSteal} points from ${targetPlayer.name}! 💰`);
        this.createFloatingText(`+${actualSteal}`, 'positive', '💰');
        this.playSuccessSound();
    }

    triggerRandomPowerup() {
        const powerup = this.powerupEffects[Math.floor(Math.random() * this.powerupEffects.length)];
        this.applyPowerup(powerup);
    }

    applyPowerup(powerup) {
        const currentPlayer = this.players[this.currentPlayerIndex];
        
        switch(powerup.effect) {
            case 'bonus':
                currentPlayer.score += powerup.value;
                this.showPowerupMessage(`${powerup.name}: +${powerup.value} points! 🎉`);
                this.createFloatingText(`+${powerup.value}`, 'gold', powerup.emoji);
                this.playPowerupSound();
                break;
                
            case 'freeze':
                const otherPlayers = this.players.filter((p, i) => 
                    i !== this.currentPlayerIndex && !p.eliminated
                );
                if (otherPlayers.length > 0) {
                    const target = otherPlayers[Math.floor(Math.random() * otherPlayers.length)];
                    target.effects.push('frozen');
                    this.showPowerupMessage(`${powerup.name}: ${target.name} is frozen for next turn! 🧊`);
                    this.playPowerupSound();
                }
                break;
                
            case 'swap':
                this.handleForcedSwap();
                break;
                
            case 'trap':
                const trapTargets = this.players.filter((p, i) => 
                    i !== this.currentPlayerIndex && !p.eliminated
                );
                if (trapTargets.length > 0) {
                    const target = trapTargets[Math.floor(Math.random() * trapTargets.length)];
                    target.effects.push('trapped');
                    this.showPowerupMessage(`${powerup.name}: ${target.name} is trapped for next roll! 🕳️`);
                    this.playPowerupSound();
                }
                break;
        }
    }

    handleForcedSwap() {
        const otherPlayers = this.players.filter((p, i) => 
            i !== this.currentPlayerIndex && !p.eliminated
        );
        
        if (otherPlayers.length === 0) return;
        
        const targetPlayer = otherPlayers[Math.floor(Math.random() * otherPlayers.length)];
        const currentPlayer = this.players[this.currentPlayerIndex];
        
        const tempScore = currentPlayer.score;
        currentPlayer.score = targetPlayer.score;
        targetPlayer.score = tempScore;
        
        this.showPowerupMessage(`🔄 Forced Swap: ${currentPlayer.name} and ${targetPlayer.name} swapped scores! 🔄`);
        this.playPowerupSound();
    }

    showLifelineModal() {
        const currentPlayer = this.players[this.currentPlayerIndex];
        
        if (currentPlayer.lifelineUsed) {
            this.showMessage("🚫 You've already used your lifeline! 🚫");
            return;
        }
        
        this.useLifeline(currentPlayer.lifeline);
    }

    useLifeline(lifelineType) {
        const currentPlayer = this.players[this.currentPlayerIndex];
        
        if (currentPlayer.lifelineUsed) {
            this.showMessage("🚫 Lifeline already used! 🚫");
            return;
        }
        
        currentPlayer.lifelineUsed = true;
        
        switch(lifelineType) {
            case 'shield':
                currentPlayer.effects = [];
                this.showMessage(`🛡️ ${currentPlayer.name} used Shield! All negative effects blocked! 🛡️`);
                this.playLifelineSound();
                break;
                
            case 'double':
                this.handleDoubleRoll();
                break;
                
            case 'steal':
                this.handleSafeSteal();
                break;
                
            case 'retry':
                this.showMessage(`🔄 ${currentPlayer.name} used Retry! Roll again! 🔄`);
                document.getElementById('rollBtn').disabled = false;
                this.playLifelineSound();
                break;
        }
        
        this.updateDisplay();
    }

    handleDoubleRoll() {
        const currentPlayer = this.players[this.currentPlayerIndex];
        this.showMessage(`🎲🎲 ${currentPlayer.name} used Double Roll! Rolling twice... 🎲🎲`);
        this.playLifelineSound();
        
        const roll1 = Math.floor(Math.random() * 6) + 1;
        const roll2 = Math.floor(Math.random() * 6) + 1;
        
        const rule1 = this.diceRules[roll1];
        const rule2 = this.diceRules[roll2];
        
        let betterRoll = roll1;
        if (rule2.value > rule1.value) {
            betterRoll = roll2;
        }
        
        setTimeout(() => {
            this.updateDiceFace(betterRoll);
            this.applyDiceEffect(betterRoll, this.diceRules[betterRoll], currentPlayer);
            this.showMessage(`🎯 Chose the better roll: ${betterRoll}! 🎯`);
        }, 1000);
    }

    handleSafeSteal() {
        const currentPlayer = this.players[this.currentPlayerIndex];
        const otherPlayers = this.players.filter((p, i) => 
            i !== this.currentPlayerIndex && !p.eliminated && p.score > 0
        );
        
        if (otherPlayers.length === 0) {
            this.showMessage("🤷‍♂️ No one to steal from! 🤷‍♀️");
            return;
        }
        
        const targetPlayer = otherPlayers[Math.floor(Math.random() * otherPlayers.length)];
        const stealAmount = Math.min(5, targetPlayer.score);
        
        targetPlayer.score -= stealAmount;
        currentPlayer.score += stealAmount;
        
        this.showMessage(`💰 ${currentPlayer.name} safely stole ${stealAmount} points from ${targetPlayer.name}! 💰`);
        this.createFloatingText(`+${stealAmount}`, 'positive', '💰');
        this.playLifelineSound();
    }

    nextTurn() {
        do {
            this.currentPlayerIndex = (this.currentPlayerIndex + 1) % this.players.length;
        } while (this.players[this.currentPlayerIndex].eliminated);
        
        if (this.currentPlayerIndex === 0) {
            this.currentRound++;
        }
        
        document.getElementById('rollBtn').disabled = false;
        this.updateDisplay();
        
        const currentPlayer = this.players[this.currentPlayerIndex];
        this.showMessage(`⚡ It's ${currentPlayer.name}'s turn! Click 'ROLL DICE' to continue your epic journey! ⚡`);
    }

    checkGameEnd() {
        if (this.gameMode === 'classic') {
            return this.currentRound > this.maxRounds;
        } else if (this.gameMode === 'knockout') {
            const activePlayers = this.players.filter(p => !p.eliminated && p.score >= 0);
            this.players.forEach(p => {
                if (p.score < 0 && !p.eliminated) {
                    p.eliminated = true;
                }
            });
            return activePlayers.length <= 1;
        } else if (this.gameMode === 'team') {
            return this.currentRound > this.maxRounds;
        }
        
        return false;
    }

    endGame() {
        this.gameState = 'ended';
        this.playVictorySound();
        this.showResultsScreen();
    }

    showResultsScreen() {
        document.getElementById('gameScreen').classList.add('d-none');
        document.getElementById('resultsScreen').classList.remove('d-none');
        
        this.generateFinalRankings();
    }

    generateFinalRankings() {
        const container = document.getElementById('finalRankings');
        let rankings;
        
        if (this.gameMode === 'team') {
            rankings = this.getTeamRankings();
        } else {
            rankings = this.getPlayerRankings();
        }
        
        container.innerHTML = rankings;
    }

    getPlayerRankings() {
        const sortedPlayers = [...this.players]
            .filter(p => !p.eliminated)
            .sort((a, b) => b.score - a.score);
        
        const medals = ['🥇', '🥈', '🥉'];
        
        return sortedPlayers.map((player, index) => `
            <div class="d-flex align-items-center justify-content-between p-3 mb-2 border rounded ranking-card">
                <div class="d-flex align-items-center">
                    <span class="medal ${index < 3 ? ['gold', 'silver', 'bronze'][index] : ''}" 
                          style="font-size: 3rem; margin-right: 20px;">
                        ${index < 3 ? medals[index] : `#${index + 1}`}
                    </span>
                    <div>
                        <h5 class="mb-0">${player.emoji} ${player.name}</h5>
                        <small class="text-muted">Final Score: ${player.score} points</small>
                    </div>
                </div>
            </div>
        `).join('');
    }

    getTeamRankings() {
        const teamA = this.players.filter(p => p.team === 'A');
        const teamB = this.players.filter(p => p.team === 'B');
        
        const scoreA = teamA.reduce((sum, p) => sum + p.score, 0);
        const scoreB = teamB.reduce((sum, p) => sum + p.score, 0);
        
        const winner = scoreA > scoreB ? 'A' : 'B';
        const winnerScore = Math.max(scoreA, scoreB);
        const loserScore = Math.min(scoreA, scoreB);
        
        return `
            <div class="text-center mb-4">
                <h3>🏆 Team ${winner} Wins! 🏆</h3>
            </div>
            <div class="d-flex align-items-center justify-content-between p-3 mb-2 border rounded bg-success text-white">
                <div>
                    <h5 class="mb-0">🥇 Team ${winner}</h5>
                    <small>Final Score: ${winnerScore} points</small>
                </div>
            </div>
            <div class="d-flex align-items-center justify-content-between p-3 mb-2 border rounded">
                <div>
                    <h5 class="mb-0">🥈 Team ${winner === 'A' ? 'B' : 'A'}</h5>
                    <small>Final Score: ${loserScore} points</small>
                </div>
            </div>
        `;
    }

    updateDisplay() {
        this.updatePlayersPanel();
        this.updateGameInfo();
        this.updateLifelineButton();
    }

    updatePlayersPanel() {
        const container = document.getElementById('playersPanel');
        container.innerHTML = this.players.map((player, index) => {
            const isActive = index === this.currentPlayerIndex;
            const lifelineIcon = this.getLifelineIcon(player.lifeline, player.lifelineUsed);
            const statusEffects = this.getStatusEffects(player);
            
            return `
                <div class="player-card ${isActive ? 'active' : ''} ${player.eliminated ? 'eliminated' : ''} ${statusEffects.class}">
                    ${player.team ? `<div class="team-indicator team-${player.team.toLowerCase()}">${player.team}</div>` : ''}
                    <div class="d-flex justify-content-between align-items-center">
                        <div>
                            <h6 class="mb-1">${player.emoji} ${player.name}</h6>
                            <div class="player-score ${player.score < 0 ? 'negative' : ''}">${player.score}</div>
                        </div>
                        <div class="text-end">
                            <div class="lifeline-icon ${player.lifelineUsed ? 'used' : 'unused'}">
                                ${lifelineIcon}
                            </div>
                            ${statusEffects.text}
                        </div>
                    </div>
                </div>
            `;
        }).join('');
    }

    getLifelineIcon(lifeline, used) {
        const icons = {
            shield: '🛡️',
            double: '🎲🎲',
            steal: '💰',
            retry: '🔄'
        };
        return icons[lifeline] || '❓';
    }

    getStatusEffects(player) {
        if (player.effects.includes('frozen')) {
            return { class: 'status-frozen', text: '<small class="text-primary">🧊 Frozen</small>' };
        }
        if (player.effects.includes('trapped')) {
            return { class: 'status-trapped', text: '<small class="text-danger">🕳️ Trapped</small>' };
        }
        return { class: '', text: '' };
    }

    updateGameInfo() {
        document.getElementById('currentRound').textContent = this.currentRound;
        document.getElementById('currentPlayerName').textContent = this.players[this.currentPlayerIndex].name;
        document.getElementById('turnPlayerName').textContent = this.players[this.currentPlayerIndex].name;
    }

    updateLifelineButton() {
        const btn = document.getElementById('useLifelineBtn');
        const currentPlayer = this.players[this.currentPlayerIndex];
        
        if (currentPlayer.lifelineUsed) {
            btn.disabled = true;
            btn.innerHTML = '<i class="fas fa-shield-alt"></i> 🚫 Lifeline Used';
        } else {
            btn.disabled = false;
            btn.innerHTML = `<i class="fas fa-shield-alt"></i> 🛡️ Use ${this.getLifelineName(currentPlayer.lifeline)}`;
        }
    }

    getLifelineName(lifeline) {
        const names = {
            shield: 'Shield',
            double: 'Double Roll',
            steal: 'Safe Steal',
            retry: 'Retry Turn'
        };
        return names[lifeline] || 'Lifeline';
    }

    showMessage(message) {
        document.getElementById('gameMessages').innerHTML = message;
    }

    showPowerupMessage(message) {
        const display = document.getElementById('powerupsDisplay');
        document.getElementById('powerupText').textContent = message;
        display.classList.remove('d-none');
        
        setTimeout(() => {
            display.classList.add('d-none');
        }, 3000);
    }

    createFloatingText(text, type, emoji = '') {
        const diceContainer = document.getElementById('diceContainer');
        const floatingText = document.createElement('div');
        floatingText.className = `floating-text ${type}`;
        floatingText.textContent = `${emoji} ${text}`;
        floatingText.style.left = '50%';
        floatingText.style.top = '50%';
        floatingText.style.transform = 'translateX(-50%)';
        floatingText.style.position = 'absolute';
        
        diceContainer.style.position = 'relative';
        diceContainer.appendChild(floatingText);
        
        setTimeout(() => {
            if (floatingText.parentNode) {
                floatingText.remove();
            }
        }, 2000);
    }

    resetGame() {
        this.players.forEach(player => {
            player.score = 0;
            player.lifelineUsed = false;
            player.effects = [];
            player.eliminated = false;
        });
        
        this.currentPlayerIndex = 0;
        this.currentRound = 1;
        this.gameState = 'playing';
        
        document.getElementById('resultsScreen').classList.add('d-none');
        document.getElementById('gameScreen').classList.remove('d-none');
        
        this.showLifelineSelection();
    }

    newGame() {
        this.players = [];
        this.currentPlayerIndex = 0;
        this.currentRound = 1;
        this.gameState = 'setup';
        
        document.getElementById('resultsScreen').classList.add('d-none');
        document.getElementById('setupScreen').classList.remove('d-none');
    }
}

// Initialize the game when page loads
document.addEventListener('DOMContentLoaded', () => {
    new EnhancedDiceRoyale();
});