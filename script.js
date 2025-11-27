// ==================== GAME CONSTANTS ====================
const TARGET_FPS = 60;
const TARGET_FRAME_TIME = 1000 / TARGET_FPS;
const GRAVITY = 0.8;
const JUMP_FORCE = -19;
const SUPER_JUMP_FORCE = -26;
const JUMP_HOLD_BONUS = -0.6;
const MAX_HOLD_FRAMES = 25;
const ITEMS_PER_LEVEL = 13;
const COMBO_TIMEOUT = 180;
const POWERUP_DURATION = 600;

const PARTY_DATE = new Date('2025-12-13T12:00:00');
const FORMS_URL = 'https://docs.google.com/forms/d/e/1FAIpQLSf0bXMLZbsEKBpVuw0QlHtA4o5CSav_fFQByRv34g3oMIQEoQ/viewform';

// ==================== GAME STATE ====================
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

let gameState = 'menu';
let score = 0;
let coins = 0;
let level = 1;
let itemsCollected = 0;
let totalItemsCollected = 0;
let combo = 0;
let comboTimer = 0;
let streak = 0;
let perfectJumps = 0;
let sessionPerfectJumps = 0;
let frameCount = 0;
let lastTime = 0;
let deltaTime = 0;
let screenShake = 0;
let gameSpeed = 5;
let isPaused = false;

// ==================== PLAYER ====================
const player = {
    x: 50,
    y: 0,
    width: 40,
    height: 60,
    vy: 0,
    grounded: true,
    jumpPressed: false,
    jumpHoldTime: 0,
    animState: 'IDLE',
    animFrame: 0,
    model: 0,
    clothes: 0,
    accessory: 0,
    skin: 'PADRÃO'
};

const MODELS = ['HOMEM', 'MULHER'];
const CLOTHES = [
    { name: 'VINHO', color: '#8B0000' },
    { name: 'DOURADO', color: '#FFD700' },
    { name: 'AZUL', color: '#1E90FF' },
    { name: 'ROSA', color: '#FF1493' },
    { name: 'BRANCO', color: '#FFFFFF' },
    { name: 'VERDE NEON', color: '#00FF00' }
];
const ACCESSORIES = ['NENHUM', 'BONÉ', 'PERUCA', 'CARTOLA', 'ÓCULOS', 'COROA'];
const SKINS = [
    { name: 'PADRÃO', price: 0, color: null },
    { name: 'FESTEIRO', price: 50, color: '#FF1493' },
    { name: 'VIP GOLD', price: 100, color: '#FFD700' },
    { name: 'NEON', price: 150, color: '#00FFFF' },
    { name: 'FLAMEJANTE', price: 200, color: '#FF4500' },
    { name: 'GELO', price: 250, color: '#87CEEB' },
    { name: 'ARCO-ÍRIS', price: 300, color: 'rainbow' },
    { name: 'LENDÁRIO', price: 500, color: '#9370DB' }
];

// ==================== ARRAYS ====================
let obstacles = [];
let items = [];
let coinItems = [];
let powerups = [];
let particles = [];
let confetti = [];
let trails = [];
let clouds = [];
let trees = [];
let dancers = [];
let toasts = [];

// ==================== POWER-UPS STATE ====================
const activePowerups = {
    magnet: { active: false, timer: 0 },
    shield: { active: false, timer: 0 },
    superJump: { active: false, timer: 0 },
    slowMo: { active: false, timer: 0 },
    doublePoints: { active: false, timer: 0 }
};

const POWERUP_TYPES = [
    { type: 'magnet', emoji: '🧲', color: '#FF00FF', name: 'ÍMÃ' },
    { type: 'shield', emoji: '🛡️', color: '#00FFFF', name: 'ESCUDO' },
    { type: 'superJump', emoji: '⬆️', color: '#FFD700', name: 'SUPER PULO' },
    { type: 'slowMo', emoji: '🐌', color: '#87CEEB', name: 'SLOW MO' },
    { type: 'doublePoints', emoji: '2️⃣', color: '#00FF00', name: 'PONTOS X2' }
];

const ITEM_TYPES = [
    { image: 'images/cerveja.png', name: 'Cerveja', color: '#FFD700' },
    { image: 'images/chopp.png', name: 'Chopp', color: '#FFD700' },
    { image: 'images/drink.png', name: 'Coquetel', color: '#FF69B4' },
    { image: 'images/agua.png', name: 'Água', color: '#87CEEB' },
    { image: 'images/churrasco.png', name: 'Churrasco', color: '#8B4513' },
    { image: 'images/carne.png', name: 'Carne', color: '#8B4513' },
    { image: 'images/pizza.png', name: 'Pizza', color: '#FFA500' },
    { image: 'images/cachorro_quente.png', name: 'Hot Dog', color: '#FF4500' },
    { image: 'images/doce.png', name: 'Doce', color: '#FF69B4' },
    { image: 'images/salgados.png', name: 'Salgado', color: '#DAA520' },
    { image: 'images/refrigerante.png', name: 'Refri', color: '#FF0000' },
    { image: 'images/sanduiche.png', name: 'Sanduíche', color: '#F4A460' },
    { image: 'images/microfone.png', name: 'Karaokê', color: '#9370DB' },
    { image: 'images/musica.png', name: 'Música', color: '#1E90FF' },
    { image: 'images/tambor.png', name: 'Pagode', color: '#8B4513' }
];

const ITEM_IMAGES = {};
ITEM_TYPES.forEach(type => {
    const img = new Image();
    img.src = type.image;
    ITEM_IMAGES[type.image] = img;
});

const EXCUSES = [
    'TÔ CANSADO', 'VAI CHOVER', 'SEM GRANA', 'TÔ VELHO',
    'PREGUIÇA', 'TÔ OCUPADO', 'OUTRO DIA'
];

// ==================== MISSIONS & CHALLENGES ====================
let currentMission = null;
let missionProgress = 0;
let dailyChallenge = null;
let dailyChallengeProgress = 0;

const MISSION_TYPES = [
    { type: 'collect', desc: 'Colete {0} itens', target: 5, reward: 20 },
    { type: 'combo', desc: 'Combo de x{0}', target: 5, reward: 30 },
    { type: 'coins', desc: 'Pegue {0} moedas', target: 10, reward: 25 },
    { type: 'perfect', desc: '{0} pulos perfeitos', target: 3, reward: 40 },
    { type: 'powerup', desc: 'Use {0} power-ups', target: 3, reward: 35 }
];

// ==================== ACHIEVEMENTS ====================
const ACHIEVEMENTS = [
    { id: 'firstJump', name: 'Primeiro Salto', icon: '🦘', desc: 'Deu o primeiro pulo' },
    { id: 'collector', name: 'Colecionador', icon: '📦', desc: 'Coletou 50 itens' },
    { id: 'millionaire', name: 'Milionário', icon: '💰', desc: 'Acumulou 100 moedas' },
    { id: 'comboMaster', name: 'Mestre do Combo', icon: '🔥', desc: 'Combo x3' },
    { id: 'speedster', name: 'Velocista', icon: '⚡', desc: 'Chegou ao nível 5' },
    { id: 'survivor', name: 'Sobrevivente', icon: '💪', desc: 'Jogou 10 partidas' },
    { id: 'goldHunter', name: 'Caçador de Ouro', icon: '🌟', desc: 'Pegou item dourado' },
    { id: 'partyKing', name: 'Rei da Festa', icon: '👑', desc: 'Completou 3 níveis' },
    { id: 'perfectionist', name: 'Perfeccionista', icon: '🎯', desc: '10 pulos perfeitos' },
    { id: 'shopper', name: 'Comprador', icon: '🛍️', desc: 'Desbloqueou 3 skins' },
    { id: 'streaker', name: 'Streaker', icon: '🔥', desc: 'Streak de 30' },
    { id: 'powerUser', name: 'Power User', icon: '⚡', desc: 'Usou todos power-ups' }
];

let unlockedAchievements = {};
let usedPowerupTypes = new Set();
let levelsCompleted = 0;

// ==================== PERSISTENCE ====================
function loadData() {
    try {
        const hs = localStorage.getItem('beerRunnerHighScore');
        const c = localStorage.getItem('beerRunnerCoins');
        const a = localStorage.getItem('beerRunnerAchievements');
        const s = localStorage.getItem('beerRunnerSkins');
        const es = localStorage.getItem('beerRunnerEquippedSkin');
        const gp = localStorage.getItem('beerRunnerGamesPlayed');
        const ic = localStorage.getItem('beerRunnerItemsCollected');
        const pj = localStorage.getItem('beerRunnerPerfectJumps');

        if (hs) highScore = parseInt(hs);
        if (c) totalCoins = parseInt(c);
        if (a) unlockedAchievements = JSON.parse(a);
        if (s) unlockedSkins = JSON.parse(s);
        if (es) player.skin = es;
        if (gp) gamesPlayed = parseInt(gp);
        if (ic) totalItemsCollected = parseInt(ic);
        if (pj) perfectJumps = parseInt(pj);
    } catch (e) {
        console.log('Error loading data:', e);
    }
}

function saveData() {
    try {
        localStorage.setItem('beerRunnerHighScore', highScore);
        localStorage.setItem('beerRunnerCoins', totalCoins);
        localStorage.setItem('beerRunnerAchievements', JSON.stringify(unlockedAchievements));
        localStorage.setItem('beerRunnerSkins', JSON.stringify(unlockedSkins));
        localStorage.setItem('beerRunnerEquippedSkin', player.skin);
        localStorage.setItem('beerRunnerGamesPlayed', gamesPlayed);
        localStorage.setItem('beerRunnerItemsCollected', totalItemsCollected);
        localStorage.setItem('beerRunnerPerfectJumps', perfectJumps);
    } catch (e) {
        console.log('Error saving data:', e);
    }
}

function getTopScores() {
    try {
        const ts = localStorage.getItem('beerRunnerTopScores');
        return ts ? JSON.parse(ts) : [];
    } catch (e) {
        return [];
    }
}

function saveTopScore(name, score) {
    let scores = getTopScores();
    scores.push({ name, score, date: new Date().toLocaleDateString() });
    scores.sort((a, b) => b.score - a.score);
    scores = scores.slice(0, 5);
    localStorage.setItem('beerRunnerTopScores', JSON.stringify(scores));
}

let highScore = 0;
let totalCoins = 0;
let gamesPlayed = 0;
let unlockedSkins = ['PADRÃO'];
let groundY;

// ==================== AUDIO ====================
let audioCtx;
function initAudio() {
    if (!audioCtx) {
        audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
}

function playSound(type, freq, duration, wave = 'sine') {
    if (!audioCtx) return;
    try {
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.type = wave;
        osc.frequency.value = freq;
        gain.gain.value = 0.15;
        gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + duration);
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.start();
        osc.stop(audioCtx.currentTime + duration);
    } catch (e) { }
}

function vibrate(pattern) {
    if (navigator.vibrate) {
        navigator.vibrate(pattern);
    }
}

// ==================== RESIZE ====================
function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    groundY = canvas.height - (window.innerWidth < 768 ? 80 : 100);
    player.y = groundY - player.height;
}
window.addEventListener('resize', resize);
resize();

// ==================== INPUT HANDLING ====================
let inputDown = false;
let inputStartTime = 0;

function handleInputStart(e) {
    if (gameState !== 'playing' || isPaused) return;

    // Check if clicking on pause button area
    const rect = canvas.getBoundingClientRect();
    let x, y;
    if (e.touches) {
        x = e.touches[0].clientX - rect.left;
        y = e.touches[0].clientY - rect.top;
    } else {
        x = e.clientX - rect.left;
        y = e.clientY - rect.top;
    }

    // Pause button area (top right)
    if (x > canvas.width - 60 && y < 50) {
        togglePause();
        return;
    }

    e.preventDefault();
    initAudio();

    if (!inputDown && player.grounded) {
        inputDown = true;
        inputStartTime = Date.now();
        player.jumpPressed = true;
        player.jumpHoldTime = 0;

        // INSTANT jump
        player.vy = JUMP_FORCE;
        player.grounded = false;
        player.animState = 'JUMP';

        // Jump particles
        for (let i = 0; i < 8; i++) {
            particles.push({
                x: player.x + player.width / 2 + (Math.random() - 0.5) * 30,
                y: player.y + player.height,
                vx: (Math.random() - 0.5) * 4,
                vy: Math.random() * -3,
                life: 30,
                color: '#FFD700',
                size: 4 + Math.random() * 4
            });
        }

        playSound('jump', 350, 0.12, 'square');
        vibrate(20);

        checkAchievement('firstJump');
    }
}

function handleInputMove(e) {
    if (gameState !== 'playing' || isPaused) return;
    if (inputDown && player.jumpPressed && player.jumpHoldTime < MAX_HOLD_FRAMES) {
        e.preventDefault();
    }
}

function handleInputEnd(e) {
    inputDown = false;
    player.jumpPressed = false;
    player.jumpHoldTime = 0;
}

// Touch events
canvas.addEventListener('touchstart', handleInputStart, { passive: false });
canvas.addEventListener('touchmove', handleInputMove, { passive: false });
canvas.addEventListener('touchend', handleInputEnd, { passive: false });

// Mouse events
canvas.addEventListener('mousedown', handleInputStart, { passive: false });
canvas.addEventListener('mouseup', handleInputEnd, { passive: false });

// Keyboard events
document.addEventListener('keydown', (e) => {
    if (gameState !== 'playing' || isPaused) return;
    if (e.code === 'Space' || e.code === 'ArrowUp') {
        e.preventDefault();
        if (!inputDown && player.grounded) {
            inputDown = true;
            handleInputStart(e);
        }
    }
    if (e.code === 'Escape') {
        togglePause();
    }
});

document.addEventListener('keyup', (e) => {
    if (e.code === 'Space' || e.code === 'ArrowUp') {
        handleInputEnd(e);
    }
});

// ==================== GAME FUNCTIONS ====================
function resetGame() {
    score = 0;
    coins = 0;
    level = 1;
    itemsCollected = 0;
    combo = 0;
    comboTimer = 0;
    streak = 0;
    sessionPerfectJumps = 0;
    frameCount = 0;
    gameSpeed = 5;
    screenShake = 0;
    isPaused = false;

    player.y = groundY - player.height;
    player.vy = 0;
    player.grounded = true;
    player.animState = 'RUN';
    player.animFrame = 0;

    obstacles = [];
    items = [];
    coinItems = [];
    powerups = [];
    particles = [];
    confetti = [];
    trails = [];
    toasts = [];

    Object.keys(activePowerups).forEach(key => {
        activePowerups[key].active = false;
        activePowerups[key].timer = 0;
    });

    usedPowerupTypes.clear();
    generateMission();
    initBackground();
}

function initBackground() {
    clouds = [];
    trees = [];
    dancers = [];

    for (let i = 0; i < 4; i++) {
        clouds.push({
            x: Math.random() * canvas.width,
            y: 50 + Math.random() * 100,
            speed: 0.2 + Math.random() * 0.5,
            size: 40 + Math.random() * 30
        });
    }

    for (let i = 0; i < 5; i++) {
        trees.push({
            x: Math.random() * canvas.width,
            speed: 0.3
        });
    }

    for (let i = 0; i < 3; i++) {
        dancers.push({
            x: 200 + i * 150,
            color: ['#FF1493', '#00FFFF', '#FFD700', '#00FF00'][i % 4],
            phase: Math.random() * Math.PI * 2
        });
    }
}

function generateMission() {
    const m = MISSION_TYPES[Math.floor(Math.random() * MISSION_TYPES.length)];
    currentMission = { ...m };
    missionProgress = 0;
}

function checkMissionProgress(type, value = 1) {
    if (!currentMission) return;
    if (currentMission.type === type) {
        missionProgress += value;
        if (missionProgress >= currentMission.target) {
            completeMission();
        }
    }
}

function completeMission() {
    totalCoins += currentMission.reward;
    showToast(`MISSÃO COMPLETA! +${currentMission.reward}💰`, '#00FF00');
    playSound('mission', 900, 0.3);
    vibrate([50, 30, 50]);
    saveData();

    setTimeout(() => generateMission(), 3000);
    currentMission = null;
}

function spawnObstacle() {
    const text = EXCUSES[Math.floor(Math.random() * EXCUSES.length)];
    ctx.font = '14px "Press Start 2P"';
    const width = Math.max(80, ctx.measureText(text).width + 20);

    obstacles.push({
        x: canvas.width + 50,
        y: groundY - 40,
        width: width,
        height: 40,
        text: text,
        passed: false
    });
}

function spawnItem() {
    const type = ITEM_TYPES[Math.floor(Math.random() * ITEM_TYPES.length)];
    const isGolden = Math.random() < 0.03;

    items.push({
        x: canvas.width + 50,
        y: groundY - 100 - Math.random() * 80,
        width: isGolden ? 50 : 40,
        height: isGolden ? 60 : 50,
        type: type,
        golden: isGolden,
        phase: Math.random() * Math.PI * 2
    });
}

function spawnCoin() {
    coinItems.push({
        x: canvas.width + 50,
        y: groundY - 80 - Math.random() * 100,
        size: 20,
        rotation: 0,
        scale: 1,
        phase: Math.random() * Math.PI * 2
    });
}

function spawnPowerup() {
    // Filter out powerups that are already active
    const available = POWERUP_TYPES.filter(p => !activePowerups[p.type].active);
    if (available.length === 0) return;

    const type = available[Math.floor(Math.random() * available.length)];
    powerups.push({
        x: canvas.width + 50,
        y: groundY - 120 - Math.random() * 60,
        size: 35,
        ...type,
        phase: Math.random() * Math.PI * 2
    });
}

function activatePowerup(type) {
    activePowerups[type].active = true;
    activePowerups[type].timer = POWERUP_DURATION;
    usedPowerupTypes.add(type);

    if (usedPowerupTypes.size >= 5) {
        checkAchievement('powerUser');
    }

    checkMissionProgress('powerup');
    playSound('powerup', 1000, 0.25, 'square');
    vibrate([50, 30, 50]);

    const info = POWERUP_TYPES.find(p => p.type === type);
    showToast(`${info.emoji} ${info.name} ATIVADO!`, info.color);
}

function updatePowerups() {
    Object.keys(activePowerups).forEach(key => {
        if (activePowerups[key].active) {
            activePowerups[key].timer--;
            if (activePowerups[key].timer <= 0) {
                activePowerups[key].active = false;
                const info = POWERUP_TYPES.find(p => p.type === key);
                showToast(`${info.emoji} ${info.name} acabou`, '#888');
            }
        }
    });
}

function getComboMultiplier() {
    if (combo >= 12) return 3.0;
    if (combo >= 9) return 2.5;
    if (combo >= 6) return 2.0;
    if (combo >= 3) return 1.5;
    return 1.0;
}

function collectItem(item) {
    let points = 50;
    points *= getComboMultiplier();
    if (activePowerups.doublePoints.active) points *= 2;

    if (item.golden) {
        points += 500;
        totalCoins += 25;
        coins += 25;
        checkAchievement('goldHunter');
        screenShake = 12;

        for (let i = 0; i < 40; i++) {
            particles.push({
                x: item.x + item.width / 2,
                y: item.y + item.height / 2,
                vx: (Math.random() - 0.5) * 10,
                vy: (Math.random() - 0.5) * 10,
                life: 40,
                color: '#FFD700',
                size: 3 + Math.random() * 5
            });
        }

        playSound('golden', 1400, 0.6);
        vibrate([100, 50, 100, 50, 100]);
    } else {
        for (let i = 0; i < 12; i++) {
            particles.push({
                x: item.x + item.width / 2,
                y: item.y + item.height / 2,
                vx: (Math.random() - 0.5) * 6,
                vy: (Math.random() - 0.5) * 6,
                life: 25,
                color: item.type.color,
                size: 3 + Math.random() * 3
            });
        }

        playSound('item', 650 + score * 0.03, 0.12);
        vibrate(15);
    }

    score += Math.round(points);
    itemsCollected++;
    totalItemsCollected++;
    combo++;
    comboTimer = COMBO_TIMEOUT;

    checkMissionProgress('collect');

    if (combo >= 3) {
        const mult = getComboMultiplier();
        if (mult >= 3) checkAchievement('comboMaster');
        checkMissionProgress('combo', mult >= 1.5 ? 1 : 0);
    }

    if (totalItemsCollected >= 50) checkAchievement('collector');

    // Check level complete
    if (itemsCollected >= ITEMS_PER_LEVEL) {
        completeLevel();
    }
}

function collectCoin() {
    coins++;
    totalCoins++;

    particles.push({
        x: player.x + player.width / 2,
        y: player.y,
        vx: 0,
        vy: -3,
        life: 20,
        color: '#FFD700',
        size: 8,
        text: '+1💰'
    });

    playSound('coin', 900, 0.1);
    vibrate(15);

    checkMissionProgress('coins');
    if (totalCoins >= 100) checkAchievement('millionaire');
    saveData();
}

function checkPerfectJump(obstacle) {
    // Perfect jump: pass over obstacle with <10px margin, no collision
    const margin = player.y + player.height - (obstacle.y - 10);
    if (margin < 0 && margin > -30 && !player.grounded) {
        sessionPerfectJumps++;
        perfectJumps++;

        showToast('PERFECT! +10', '#FFD700');
        score += 10;

        for (let i = 0; i < 5; i++) {
            particles.push({
                x: player.x + player.width / 2,
                y: player.y + player.height,
                vx: (Math.random() - 0.5) * 4,
                vy: -2 - Math.random() * 2,
                life: 20,
                color: '#FFD700',
                size: 4
            });
        }

        playSound('perfect', 1000, 0.15);
        checkMissionProgress('perfect');

        if (perfectJumps >= 10) checkAchievement('perfectionist');
    }
}

function hitObstacle() {
    if (activePowerups.shield.active) {
        activePowerups.shield.active = false;
        activePowerups.shield.timer = 0;
        screenShake = 6;
        showToast('🛡️ ESCUDO USADO!', '#00FFFF');
        playSound('shield', 500, 0.2);
        return;
    }

    gameOver();
}

function gameOver() {
    gameState = 'gameover';
    gamesPlayed++;

    screenShake = 20;
    playSound('gameover', 180, 0.6, 'sawtooth');
    vibrate([100, 50, 100]);

    if (gamesPlayed >= 10) checkAchievement('survivor');

    const isNewRecord = score > highScore;
    if (isNewRecord) {
        highScore = score;
    }

    totalCoins += coins;
    saveData();

    // Check if score qualifies for top 5
    const topScores = getTopScores();
    const isTop5 = topScores.length < 5 || score > topScores[topScores.length - 1].score;

    showGameOverModal(isNewRecord, isTop5);
}

function completeLevel() {
    gameState = 'levelcomplete';
    score += 500;
    levelsCompleted++;

    if (levelsCompleted >= 3) checkAchievement('partyKing');

    for (let i = 0; i < 30; i++) {
        confetti.push(createConfetti());
    }

    playSound('level', 800, 0.4);
    vibrate([50, 30, 50, 30, 50]);

    showLevelCompleteModal();
}

function nextLevel() {
    level++;
    itemsCollected = 0;
    gameSpeed = 5 + (level - 1);

    if (level >= 5) checkAchievement('speedster');

    obstacles = [];
    items = [];
    coinItems = [];
    powerups = [];

    gameState = 'playing';
    hideLevelCompleteModal();
}

function createConfetti() {
    return {
        x: Math.random() * canvas.width,
        y: -20,
        vx: (Math.random() - 0.5) * 4,
        vy: 2 + Math.random() * 3,
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 10,
        color: ['#FF1493', '#FFD700', '#00FFFF', '#00FF00', '#FF4500', '#9370DB'][Math.floor(Math.random() * 6)],
        size: 8 + Math.random() * 8,
        life: 120
    };
}

function showToast(text, color) {
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = text;
    toast.style.background = color;
    toast.style.color = color === '#FFD700' || color === '#00FF00' || color === '#FFFF00' ? '#000' : '#FFF';
    document.body.appendChild(toast);

    setTimeout(() => toast.remove(), 1500);
}

function checkAchievement(id) {
    if (unlockedAchievements[id]) return;

    unlockedAchievements[id] = true;
    saveData();

    const ach = ACHIEVEMENTS.find(a => a.id === id);
    if (!ach) return;

    playSound('achievement', 1200, 0.4);
    vibrate([100, 50, 100]);

    const popup = document.getElementById('achievementPopup');
    document.getElementById('achievementIcon').textContent = ach.icon;
    document.getElementById('achievementName').textContent = ach.name;

    // Remove and re-add class to restart animation
    popup.classList.remove('show');
    // Force reflow to restart animation
    void popup.offsetWidth;
    popup.classList.add('show');

    // Remove class after animation completes (3.5s)
    setTimeout(() => {
        popup.classList.remove('show');
    }, 3500);
}

function togglePause() {
    if (gameState !== 'playing' && gameState !== 'paused') return;

    isPaused = !isPaused;
    gameState = isPaused ? 'paused' : 'playing';

    if (isPaused) {
        document.getElementById('pauseModal').classList.remove('hidden');
    } else {
        document.getElementById('pauseModal').classList.add('hidden');
    }
}

// ==================== UPDATE ====================
function update(dt) {
    if (gameState !== 'playing') return;

    const speedMod = activePowerups.slowMo.active ? 0.6 : 1;
    const adjustedSpeed = gameSpeed * speedMod;

    // Player physics
    if (player.jumpPressed && player.jumpHoldTime < MAX_HOLD_FRAMES && !player.grounded) {
        player.vy += JUMP_HOLD_BONUS * dt;
        player.jumpHoldTime++;
    }

    player.vy += GRAVITY * dt;
    if (activePowerups.superJump.active && player.jumpPressed && player.jumpHoldTime < 5) {
        player.vy = Math.min(player.vy, SUPER_JUMP_FORCE);
    }

    player.y += player.vy * dt;

    if (player.y >= groundY - player.height) {
        player.y = groundY - player.height;
        player.vy = 0;
        player.grounded = true;
        player.animState = 'RUN';
    } else {
        player.animState = 'JUMP';
    }

    // Animation
    if (frameCount % 8 === 0) {
        player.animFrame = (player.animFrame + 1) % 8;
    }

    // Scoring
    if (frameCount % 10 === 0) {
        score++;
    }

    // Streak
    streak += dt * 0.016;
    if (streak >= 30) checkAchievement('streaker');

    // Combo timer
    if (comboTimer > 0) {
        comboTimer--;
        if (comboTimer <= 0) {
            combo = 0;
        }
    }

    // Update powerups
    updatePowerups();

    // Spawn entities
    const obstacleRate = Math.max(60, 120 - level * 5);
    if (frameCount % obstacleRate === 0) {
        spawnObstacle();
    }

    if (frameCount % 75 === 0) {
        spawnItem();
    }

    if (frameCount % 120 === 0 && Math.random() < 0.6) {
        spawnCoin();
    }

    if (frameCount % 550 === 0) {
        spawnPowerup();
    }

    // Background spawning
    if (frameCount % 200 === 0) {
        clouds.push({
            x: canvas.width + 50,
            y: 50 + Math.random() * 100,
            speed: 0.2 + Math.random() * 0.5,
            size: 40 + Math.random() * 30
        });
    }

    // Update obstacles
    obstacles.forEach((obs, i) => {
        obs.x -= adjustedSpeed * dt;

        // Check perfect jump
        if (!obs.passed && obs.x + obs.width < player.x) {
            obs.passed = true;
            checkPerfectJump(obs);
        }

        // Collision detection
        const margin = 8;
        if (
            player.x + margin < obs.x + obs.width &&
            player.x + player.width - margin > obs.x &&
            player.y + margin < obs.y + obs.height &&
            player.y + player.height - margin > obs.y
        ) {
            hitObstacle();
        }
    });
    obstacles = obstacles.filter(o => o.x > -150);

    // Update items
    items.forEach((item, i) => {
        item.x -= adjustedSpeed * dt;
        item.phase += 0.05;
        const floatY = Math.sin(item.phase) * 5;

        // Magnet effect
        if (activePowerups.magnet.active) {
            const dx = player.x + player.width / 2 - item.x;
            const dy = player.y + player.height / 2 - item.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 250) {
                item.x += dx * 0.08;
                item.y += dy * 0.08;
            }
        }

        // Collision
        if (
            player.x < item.x + item.width &&
            player.x + player.width > item.x &&
            player.y < item.y + floatY + item.height &&
            player.y + player.height > item.y + floatY
        ) {
            collectItem(item);
            items.splice(i, 1);
        }
    });
    items = items.filter(item => item.x > -100);

    // Update coins
    coinItems.forEach((coin, i) => {
        coin.x -= adjustedSpeed * dt;
        coin.rotation += 5;
        coin.phase += 0.1;
        coin.scale = 1 + Math.sin(coin.phase) * 0.1;

        if (activePowerups.magnet.active) {
            const dx = player.x + player.width / 2 - coin.x;
            const dy = player.y + player.height / 2 - coin.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 250) {
                coin.x += dx * 0.1;
                coin.y += dy * 0.1;
            }
        }

        const dist = Math.sqrt(
            Math.pow(player.x + player.width / 2 - coin.x, 2) +
            Math.pow(player.y + player.height / 2 - coin.y, 2)
        );
        if (dist < 30) {
            collectCoin();
            coinItems.splice(i, 1);
        }
    });
    coinItems = coinItems.filter(c => c.x > -50);

    // Update powerups
    powerups.forEach((pu, i) => {
        pu.x -= adjustedSpeed * dt;
        pu.phase += 0.08;

        const dist = Math.sqrt(
            Math.pow(player.x + player.width / 2 - pu.x, 2) +
            Math.pow(player.y + player.height / 2 - pu.y, 2)
        );
        if (dist < 40) {
            activatePowerup(pu.type);
            powerups.splice(i, 1);
        }
    });
    powerups = powerups.filter(p => p.x > -50);

    // Update particles
    particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.1;
        p.life--;
    });
    particles = particles.filter(p => p.life > 0);

    // Update confetti
    confetti.forEach(c => {
        c.x += c.vx;
        c.y += c.vy;
        c.rotation += c.rotationSpeed;
        c.life--;
    });
    confetti = confetti.filter(c => c.life > 0);

    // Update trails
    if (Object.values(activePowerups).some(p => p.active)) {
        trails.push({
            x: player.x + player.width / 2,
            y: player.y + player.height / 2,
            life: 20
        });
    }
    trails.forEach(t => t.life--);
    trails = trails.filter(t => t.life > 0);

    // Update background
    clouds.forEach(c => c.x -= c.speed * adjustedSpeed * 0.1);
    clouds = clouds.filter(c => c.x > -100);

    trees.forEach(t => t.x -= adjustedSpeed * 0.3);
    trees = trees.filter(t => t.x > -100);
    if (trees.length < 3) {
        trees.push({ x: canvas.width + 100, speed: 0.3 });
    }

    dancers.forEach(d => {
        d.phase += 0.1;
    });

    // Screen shake decay
    if (screenShake > 0) {
        screenShake *= 0.9;
        if (screenShake < 0.5) screenShake = 0;
    }

    frameCount++;
}

// ==================== RENDER ====================
function render() {
    ctx.save();

    // Screen shake
    if (screenShake > 0) {
        ctx.translate(
            (Math.random() - 0.5) * screenShake,
            (Math.random() - 0.5) * screenShake
        );
    }

    // Background
    const isNight = level >= 5;
    const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
    if (isNight) {
        gradient.addColorStop(0, '#1a0033');
        gradient.addColorStop(1, '#330066');
    } else {
        gradient.addColorStop(0, '#87CEEB');
        gradient.addColorStop(1, '#E0F6FF');
    }
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Night lights
    if (isNight && frameCount % 15 < 8) {
        ctx.fillStyle = `rgba(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255}, 0.1)`;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }

    // Clouds
    ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
    clouds.forEach(cloud => {
        ctx.beginPath();
        ctx.arc(cloud.x, cloud.y, cloud.size * 0.6, 0, Math.PI * 2);
        ctx.arc(cloud.x + cloud.size * 0.5, cloud.y - 10, cloud.size * 0.4, 0, Math.PI * 2);
        ctx.arc(cloud.x + cloud.size, cloud.y, cloud.size * 0.5, 0, Math.PI * 2);
        ctx.fill();
    });

    // Trees
    trees.forEach(tree => {
        // Trunk
        ctx.fillStyle = '#8B4513';
        ctx.fillRect(tree.x - 12, groundY - 100, 24, 100);
        // Leaves
        ctx.fillStyle = '#228B22';
        ctx.beginPath();
        ctx.arc(tree.x, groundY - 120, 45, 0, Math.PI * 2);
        ctx.fill();
    });

    // Dancers
    dancers.forEach(d => {
        ctx.globalAlpha = 0.5;
        const bounce = Math.sin(d.phase) * 5;

        // Body
        ctx.fillStyle = d.color;
        ctx.fillRect(d.x - 10, groundY - 50 + bounce, 20, 30);

        // Head
        ctx.fillStyle = '#FFDAB9';
        ctx.beginPath();
        ctx.arc(d.x, groundY - 60 + bounce, 10, 0, Math.PI * 2);
        ctx.fill();

        // Arms
        ctx.strokeStyle = d.color;
        ctx.lineWidth = 4;
        ctx.beginPath();
        ctx.moveTo(d.x - 10, groundY - 40 + bounce);
        ctx.lineTo(d.x - 20, groundY - 50 + Math.sin(d.phase * 2) * 10);
        ctx.moveTo(d.x + 10, groundY - 40 + bounce);
        ctx.lineTo(d.x + 20, groundY - 50 + Math.cos(d.phase * 2) * 10);
        ctx.stroke();

        ctx.globalAlpha = 1;
    });

    // Music bars
    ctx.globalAlpha = 0.3;
    for (let i = 0; i < 10; i++) {
        const height = 20 + Math.sin(frameCount * 0.1 + i) * 15 + Math.random() * 10;
        ctx.fillStyle = ['#FF1493', '#FFD700', '#00FFFF', '#00FF00'][i % 4];
        ctx.fillRect(canvas.width - 30 - i * 15, groundY - height, 10, height);
    }
    ctx.globalAlpha = 1;

    // Ground
    const groundGradient = ctx.createLinearGradient(0, groundY, 0, canvas.height);
    groundGradient.addColorStop(0, '#228B22');
    groundGradient.addColorStop(1, '#1a6b1a');
    ctx.fillStyle = groundGradient;
    ctx.fillRect(0, groundY, canvas.width, canvas.height - groundY);

    // Sidewalk
    ctx.fillStyle = '#888';
    ctx.fillRect(0, groundY, canvas.width, 5);

    // Grass tufts
    ctx.strokeStyle = '#32CD32';
    ctx.lineWidth = 2;
    for (let i = 0; i < canvas.width; i += 30) {
        const wave = Math.sin(frameCount * 0.05 + i * 0.1) * 3;
        ctx.beginPath();
        ctx.moveTo(i, groundY + 10);
        ctx.lineTo(i + wave, groundY + 5);
        ctx.stroke();
    }

    // Trails
    trails.forEach(t => {
        const alpha = t.life / 20;
        let color = '#FFD700';
        if (activePowerups.magnet.active) color = '#FF00FF';
        if (activePowerups.shield.active) color = '#00FFFF';
        if (activePowerups.slowMo.active) color = '#87CEEB';
        if (activePowerups.doublePoints.active) color = '#00FF00';

        ctx.globalAlpha = alpha * 0.5;
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.arc(t.x, t.y, 8, 0, Math.PI * 2);
        ctx.fill();
    });
    ctx.globalAlpha = 1;

    // Obstacles
    obstacles.forEach(obs => {
        const distToPlayer = obs.x - player.x;
        const isClose = distToPlayer < 150 && distToPlayer > 0;

        ctx.fillStyle = '#333';
        ctx.strokeStyle = isClose ? '#FF0000' : '#666';
        ctx.lineWidth = isClose ? 3 + Math.sin(frameCount * 0.3) * 2 : 2;

        ctx.beginPath();
        ctx.roundRect(obs.x, obs.y, obs.width, obs.height, 5);
        ctx.fill();
        ctx.stroke();

        ctx.fillStyle = '#FFF';
        ctx.font = '10px "Press Start 2P"';
        ctx.textAlign = 'center';
        ctx.fillText(obs.text, obs.x + obs.width / 2, obs.y + 25);
    });

    // Items
    items.forEach(item => {
        const floatY = Math.sin(item.phase) * 5;
        const y = item.y + floatY;

        if (item.golden) {
            // Golden aura
            ctx.shadowColor = '#FFD700';
            ctx.shadowBlur = 20 + Math.sin(item.phase) * 10;

            // Orbital particles
            for (let i = 0; i < 4; i++) {
                const angle = item.phase + i * Math.PI / 2;
                const ox = item.x + item.width / 2 + Math.cos(angle) * 25;
                const oy = y + item.height / 2 + Math.sin(angle) * 25;
                ctx.fillStyle = '#FFD700';
                ctx.beginPath();
                ctx.arc(ox, oy, 3, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        const img = ITEM_IMAGES[item.type.image];
        if (img && img.complete) {
            ctx.drawImage(img, item.x, y, item.width, item.height);
        } else {
            // Fallback if image not loaded
            ctx.fillStyle = item.type.color;
            ctx.fillRect(item.x, y, item.width, item.height);
        }

        ctx.shadowBlur = 0;
    });

    // Coins
    coinItems.forEach(coin => {
        ctx.save();
        ctx.translate(coin.x, coin.y);
        ctx.scale(coin.scale * Math.cos(coin.rotation * Math.PI / 180), coin.scale);

        ctx.fillStyle = '#FFD700';
        ctx.strokeStyle = '#B8860B';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(0, 0, coin.size / 2, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();

        ctx.fillStyle = '#B8860B';
        ctx.font = '10px "Press Start 2P"';
        ctx.textAlign = 'center';
        ctx.fillText('$', 0, 4);

        ctx.restore();
    });

    // Powerups
    powerups.forEach(pu => {
        const pulse = 1 + Math.sin(pu.phase) * 0.1;
        const y = pu.y + Math.sin(pu.phase) * 5;

        ctx.shadowColor = pu.color;
        ctx.shadowBlur = 15;

        ctx.fillStyle = pu.color;
        ctx.beginPath();
        ctx.arc(pu.x, y, pu.size * pulse / 2, 0, Math.PI * 2);
        ctx.fill();

        ctx.font = `${pu.size - 5}px serif`;
        ctx.textAlign = 'center';
        ctx.fillText(pu.emoji, pu.x, y + 8);

        ctx.shadowBlur = 0;
    });

    // Player
    const skinData = SKINS.find(s => s.name === player.skin);
    let bodyColor = CLOTHES[player.clothes].color;
    if (skinData && skinData.color && skinData.color !== 'rainbow') {
        bodyColor = skinData.color;
    }

    // Shield effect
    if (activePowerups.shield.active) {
        ctx.strokeStyle = '#00FFFF';
        ctx.lineWidth = 4;
        ctx.globalAlpha = 0.5 + Math.sin(frameCount * 0.2) * 0.3;
        ctx.beginPath();
        ctx.arc(player.x + player.width / 2, player.y + player.height / 2, 38, 0, Math.PI * 2);
        ctx.stroke();
        ctx.globalAlpha = 1;
    }

    // Body
    if (skinData && skinData.color === 'rainbow') {
        const hue = (frameCount * 3) % 360;
        bodyColor = `hsl(${hue}, 100%, 50%)`;
    }

    ctx.fillStyle = bodyColor;
    ctx.fillRect(player.x + 5, player.y + 15, 30, 30);

    // Head
    ctx.fillStyle = '#FFDAB9';
    ctx.beginPath();
    ctx.arc(player.x + player.width / 2, player.y + 12, 12, 0, Math.PI * 2);
    ctx.fill();

    // Hair (for woman)
    if (player.model === 1) {
        ctx.fillStyle = '#8B4513';
        ctx.fillRect(player.x + 8, player.y + 5, 24, 5);
        ctx.fillRect(player.x + 5, player.y + 10, 5, 20);
        ctx.fillRect(player.x + 30, player.y + 10, 5, 20);
    }

    // Accessory
    ctx.fillStyle = '#333';
    switch (ACCESSORIES[player.accessory]) {
        case 'BONÉ':
            ctx.fillRect(player.x + 5, player.y, 30, 8);
            ctx.fillRect(player.x, player.y + 5, 15, 5);
            break;
        case 'CARTOLA':
            ctx.fillRect(player.x + 10, player.y - 15, 20, 20);
            ctx.fillRect(player.x + 5, player.y + 2, 30, 5);
            break;
        case 'PERUCA':
            ctx.fillStyle = '#FF69B4';
            ctx.beginPath();
            ctx.arc(player.x + player.width / 2, player.y + 5, 18, 0, Math.PI * 2);
            ctx.fill();
            break;
        case 'ÓCULOS':
            ctx.strokeStyle = '#000';
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.arc(player.x + 13, player.y + 10, 6, 0, Math.PI * 2);
            ctx.arc(player.x + 27, player.y + 10, 6, 0, Math.PI * 2);
            ctx.stroke();
            ctx.beginPath();
            ctx.moveTo(player.x + 19, player.y + 10);
            ctx.lineTo(player.x + 21, player.y + 10);
            ctx.stroke();
            break;
        case 'COROA':
            ctx.fillStyle = '#FFD700';
            ctx.beginPath();
            ctx.moveTo(player.x + 8, player.y + 3);
            ctx.lineTo(player.x + 12, player.y - 8);
            ctx.lineTo(player.x + 16, player.y);
            ctx.lineTo(player.x + 20, player.y - 10);
            ctx.lineTo(player.x + 24, player.y);
            ctx.lineTo(player.x + 28, player.y - 8);
            ctx.lineTo(player.x + 32, player.y + 3);
            ctx.closePath();
            ctx.fill();
            break;
    }

    // Legs animation
    ctx.fillStyle = '#1a1a2e';
    if (player.animState === 'RUN') {
        const legOffset = Math.sin(player.animFrame * 0.8) * 8;
        ctx.fillRect(player.x + 8, player.y + 45, 8, 15 + legOffset);
        ctx.fillRect(player.x + 24, player.y + 45, 8, 15 - legOffset);
    } else {
        // Jump pose
        ctx.fillRect(player.x + 5, player.y + 45, 10, 12);
        ctx.fillRect(player.x + 25, player.y + 45, 10, 12);
    }

    // Running particles
    if (player.grounded && frameCount % 5 === 0) {
        particles.push({
            x: player.x + player.width / 2,
            y: player.y + player.height,
            vx: -gameSpeed * 0.3,
            vy: -1,
            life: 10,
            color: '#CCC',
            size: 3
        });
    }

    // Particles
    particles.forEach(p => {
        ctx.globalAlpha = p.life / 30;
        ctx.fillStyle = p.color;
        if (p.text) {
            ctx.font = '12px "Press Start 2P"';
            ctx.fillText(p.text, p.x, p.y);
        } else {
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx.fill();
        }
    });
    ctx.globalAlpha = 1;

    // Confetti
    confetti.forEach(c => {
        ctx.save();
        ctx.translate(c.x, c.y);
        ctx.rotate(c.rotation * Math.PI / 180);
        ctx.globalAlpha = c.life / 120;
        ctx.fillStyle = c.color;
        ctx.fillRect(-c.size / 2, -c.size / 4, c.size, c.size / 2);
        ctx.restore();
    });
    ctx.globalAlpha = 1;

    // HUD
    ctx.fillStyle = '#FFF';
    ctx.font = '12px "Press Start 2P"';
    ctx.textAlign = 'left';
    ctx.shadowColor = '#000';
    ctx.shadowBlur = 4;

    ctx.fillText(`NÍVEL ${level}`, 15, 30);
    ctx.fillText(`PONTOS: ${score}`, 15, 50);
    ctx.fillStyle = '#FFD700';
    ctx.fillText(`💰 ${coins}`, 15, 70);

    if (streak >= 5) {
        ctx.fillStyle = '#FF4500';
        ctx.fillText(`🔥 ${Math.floor(streak)}`, 15, 90);
    }

    if (combo >= 3) {
        ctx.fillStyle = '#00FF00';
        ctx.font = '16px "Press Start 2P"';
        ctx.textAlign = 'center';
        ctx.fillText(`COMBO x${getComboMultiplier()}`, canvas.width / 2, canvas.height / 2);
    }

    ctx.shadowBlur = 0;

    // Power-up HUD
    let puY = 25;
    Object.entries(activePowerups).forEach(([key, data]) => {
        if (data.active) {
            const info = POWERUP_TYPES.find(p => p.type === key);
            const seconds = Math.ceil(data.timer / 60);

            ctx.fillStyle = 'rgba(0,0,0,0.7)';
            ctx.strokeStyle = info.color;
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.roundRect(canvas.width - 90, puY - 12, 80, 24, 5);
            ctx.fill();
            ctx.stroke();

            ctx.fillStyle = info.color;
            ctx.font = '10px "Press Start 2P"';
            ctx.textAlign = 'left';
            ctx.fillText(`${info.emoji} ${seconds}s`, canvas.width - 85, puY + 4);

            puY += 30;
        }
    });

    // Mission display
    if (currentMission) {
        const missionY = puY + 10;
        ctx.fillStyle = 'rgba(0, 100, 0, 0.7)';
        ctx.beginPath();
        ctx.roundRect(canvas.width - 180, missionY, 170, 35, 5);
        ctx.fill();

        ctx.fillStyle = '#00FF00';
        ctx.font = '8px "Press Start 2P"';
        ctx.textAlign = 'left';
        const missionText = currentMission.desc.replace('{0}', currentMission.target);
        ctx.fillText(missionText, canvas.width - 175, missionY + 15);
        ctx.fillText(`${missionProgress}/${currentMission.target}`, canvas.width - 175, missionY + 28);
    }

    // Progress bar
    const barWidth = canvas.width - 40;
    const barHeight = 25;
    const barY = canvas.height - 40;
    const progress = itemsCollected / ITEMS_PER_LEVEL;

    ctx.fillStyle = 'rgba(0,0,0,0.5)';
    ctx.beginPath();
    ctx.roundRect(20, barY, barWidth, barHeight, 8);
    ctx.fill();

    const progGrad = ctx.createLinearGradient(20, barY, 20 + barWidth * progress, barY);
    progGrad.addColorStop(0, '#FFD700');
    progGrad.addColorStop(1, '#FFA500');
    ctx.fillStyle = progGrad;
    ctx.beginPath();
    ctx.roundRect(20, barY, barWidth * progress, barHeight, 8);
    ctx.fill();

    // Shimmer effect
    ctx.fillStyle = `rgba(255,255,255,${0.2 + Math.sin(frameCount * 0.1) * 0.1})`;
    ctx.fillRect(20 + (frameCount * 3) % barWidth, barY, 30, barHeight);

    ctx.fillStyle = '#FFF';
    ctx.font = '10px "Press Start 2P"';
    ctx.textAlign = 'center';
    ctx.fillText(`${itemsCollected}/${ITEMS_PER_LEVEL} ITENS`, canvas.width / 2, barY + 17);

    // Pause button
    ctx.fillStyle = 'rgba(0,0,0,0.5)';
    ctx.beginPath();
    ctx.roundRect(canvas.width - 50, 10, 40, 35, 5);
    ctx.fill();

    ctx.fillStyle = '#FFF';
    ctx.font = '20px serif';
    ctx.textAlign = 'center';
    ctx.fillText(isPaused ? '▶' : '⏸', canvas.width - 30, 35);

    ctx.restore();
}

// ==================== GAME LOOP ====================
function gameLoop(currentTime) {
    deltaTime = currentTime - lastTime;
    lastTime = currentTime;

    const dt = Math.min(deltaTime / TARGET_FRAME_TIME, 2);

    if (gameState === 'playing' && !isPaused) {
        update(dt);
    }

    if (gameState === 'playing' || gameState === 'paused') {
        render();
    }

    requestAnimationFrame(gameLoop);
}

// ==================== UI FUNCTIONS ====================
function showGameOverModal(isNewRecord, isTop5) {
    const modal = document.getElementById('gameOverModal');
    document.getElementById('finalScore').textContent = score;
    document.getElementById('finalCoins').textContent = `💰 ${coins}`;
    document.getElementById('finalLevel').textContent = level;
    document.getElementById('finalItems').textContent = totalItemsCollected;

    if (isNewRecord) {
        document.getElementById('newRecordBanner').classList.remove('hidden');
    } else {
        document.getElementById('newRecordBanner').classList.add('hidden');
    }

    if (isTop5) {
        document.getElementById('nameInput').classList.remove('hidden');
        document.getElementById('saveScoreBtn').classList.remove('hidden');
        setTimeout(() => document.getElementById('nameInput').focus(), 100);
    } else {
        document.getElementById('nameInput').classList.add('hidden');
        document.getElementById('saveScoreBtn').classList.add('hidden');
    }

    modal.classList.remove('hidden');
}

function hideGameOverModal() {
    document.getElementById('gameOverModal').classList.add('hidden');
}

function showLevelCompleteModal() {
    document.getElementById('levelCompleteModal').classList.remove('hidden');
}

function hideLevelCompleteModal() {
    document.getElementById('levelCompleteModal').classList.add('hidden');
}

function showToast(msg, color = '#FFD700') {
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = msg;
    toast.style.borderLeft = `5px solid ${color}`;
    document.body.appendChild(toast);

    setTimeout(() => {
        toast.classList.add('show');
    }, 10);

    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

function updateMenuStats() {
    document.getElementById('menuHighScore').textContent = highScore;
    document.getElementById('menuCoins').textContent = `💰 ${totalCoins}`;
    document.getElementById('menuGames').textContent = gamesPlayed;
    document.getElementById('menuItems').textContent = totalItemsCollected;
    document.getElementById('shopCoins').textContent = totalCoins;

    updateCountdown();
    updateLeaderboard();
    updateAchievementsList();
    updateShop();
}

function updateCountdown() {
    const now = new Date();
    const diff = PARTY_DATE - now;

    if (diff <= 0) {
        document.getElementById('countdown').innerHTML = '🎉 A FESTA É HOJE! 🎉';
        return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

    document.getElementById('countdown').innerHTML =
        `⏰ FALTAM: ${days}d ${hours}h ${mins}m<br>📅 13/DEZ | 12H | SÁBADO`;
}

function updateLeaderboard() {
    const container = document.getElementById('leaderboard');
    const scores = getTopScores();

    if (scores.length === 0) {
        container.innerHTML = '<div style="color:#888;font-size:10px;text-align:center;">Nenhum score ainda!</div>';
        return;
    }

    const medals = ['🥇', '🥈', '🥉', '4️⃣', '5️⃣'];
    container.innerHTML = scores.map((s, i) => `
        <div class="leaderboard-entry">
            <span>${medals[i]} ${s.name}</span>
            <span style="color:#FFD700">${s.score}</span>
        </div>
    `).join('');
}

function updateAchievementsList() {
    const container = document.getElementById('achievementsList');
    container.innerHTML = ACHIEVEMENTS.map(a => `
        <div class="achievement ${unlockedAchievements[a.id] ? 'unlocked' : 'locked'}">
            <span class="achievement-icon">${a.icon}</span>
            <div>
                <div style="color:${unlockedAchievements[a.id] ? '#FFD700' : '#888'}">${a.name}</div>
                <div style="color:#aaa;font-size:7px">${a.desc}</div>
            </div>
        </div>
    `).join('');
}

function updateShop() {
    const container = document.getElementById('shopGrid');
    container.innerHTML = SKINS.map(skin => {
        const unlocked = unlockedSkins.includes(skin.name);
        const equipped = player.skin === skin.name;

        return `
            <div class="skin-card ${unlocked ? 'unlocked' : 'locked'} ${equipped ? 'equipped' : ''}" 
                 data-skin="${skin.name}">
                <canvas class="skin-preview" width="60" height="60" data-skin="${skin.name}" 
                        style="background:${skin.color === 'rainbow' ? 'linear-gradient(45deg,red,orange,yellow,green,blue,purple)' : (skin.color || '#8B0000')}"></canvas>
                <div class="skin-name">${skin.name}</div>
                <div class="skin-price">
                    ${unlocked ? (equipped ? '✅ EQUIPADA' : '👆 EQUIPAR') : `🔒 ${skin.price}💰`}
                </div>
            </div>
        `;
    }).join('');

    // Add click handlers
    container.querySelectorAll('.skin-card').forEach(card => {
        const handler = (e) => {
            e.preventDefault();
            const skinName = card.dataset.skin;
            const skin = SKINS.find(s => s.name === skinName);

            if (unlockedSkins.includes(skinName)) {
                player.skin = skinName;
                showToast(`${skinName} equipada!`, '#00FF00');
            } else if (totalCoins >= skin.price) {
                totalCoins -= skin.price;
                unlockedSkins.push(skinName);
                player.skin = skinName;
                showToast(`${skinName} comprada!`, '#FFD700');

                if (unlockedSkins.length >= 3) checkAchievement('shopper');
            } else {
                showToast('Moedas insuficientes!', '#FF0000');
            }

            saveData();
            updateShop();
            updateMenuStats();
        };

        card.addEventListener('click', handler);
        card.addEventListener('touchend', handler);
    });
}

function updatePreview() {
    const previewCanvas = document.getElementById('previewCanvas');
    const pctx = previewCanvas.getContext('2d');

    pctx.clearRect(0, 0, 80, 80);

    // Ground
    pctx.fillStyle = '#228B22';
    pctx.fillRect(0, 60, 80, 20);

    const skinData = SKINS.find(s => s.name === player.skin);
    let bodyColor = CLOTHES[player.clothes].color;
    if (skinData && skinData.color && skinData.color !== 'rainbow') {
        bodyColor = skinData.color;
    } else if (skinData && skinData.color === 'rainbow') {
        bodyColor = `hsl(${(Date.now() / 10) % 360}, 100%, 50%)`;
    }

    // Body
    pctx.fillStyle = bodyColor;
    pctx.fillRect(30, 25, 20, 20);

    // Head
    pctx.fillStyle = '#FFDAB9';
    pctx.beginPath();
    pctx.arc(40, 18, 10, 0, Math.PI * 2);
    pctx.fill();

    // Hair for woman
    if (player.model === 1) {
        pctx.fillStyle = '#8B4513';
        pctx.fillRect(32, 10, 16, 4);
        pctx.fillRect(28, 14, 4, 15);
        pctx.fillRect(48, 14, 4, 15);
    }

    // Legs
    pctx.fillStyle = '#1a1a2e';
    pctx.fillRect(32, 45, 6, 12);
    pctx.fillRect(42, 45, 6, 12);

    // Accessory
    pctx.fillStyle = '#333';
    switch (ACCESSORIES[player.accessory]) {
        case 'BONÉ':
            pctx.fillRect(30, 5, 20, 6);
            pctx.fillRect(25, 9, 12, 4);
            break;
        case 'COROA':
            pctx.fillStyle = '#FFD700';
            pctx.beginPath();
            pctx.moveTo(30, 10);
            pctx.lineTo(33, 2);
            pctx.lineTo(36, 8);
            pctx.lineTo(40, 0);
            pctx.lineTo(44, 8);
            pctx.lineTo(47, 2);
            pctx.lineTo(50, 10);
            pctx.closePath();
            pctx.fill();
            break;
    }

    document.getElementById('modelValue').textContent = MODELS[player.model];
    document.getElementById('clothesValue').textContent = CLOTHES[player.clothes].name;
    document.getElementById('accessoryValue').textContent = ACCESSORIES[player.accessory];
}

function shareHighScore() {
    const text = `Meu recorde no Jogo da Festa da Galera é de ${highScore} pontos. Será que você consegue superar? Clica aqui:`;
    const url = window.location.href;

    if (navigator.share) {
        navigator.share({ title: 'Festa da Galera', text, url });
    } else {
        navigator.clipboard.writeText(`${text} ${url}`).then(() => {
            showToast('Link copiado!', '#00FF00');
        });
    }
}

// ==================== EVENT LISTENERS ====================
// Tab navigation
document.querySelectorAll('.tab-btn').forEach(btn => {
    const handler = (e) => {
        e.preventDefault();
        document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
        document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));

        btn.classList.add('active');
        document.getElementById(`${btn.dataset.tab}Tab`).classList.add('active');

        if (btn.dataset.tab === 'visual') {
            updatePreview();
        }
    };
    btn.addEventListener('click', handler);
    btn.addEventListener('touchend', handler);
});

// Customizer arrows
document.querySelectorAll('.arrow-btn').forEach(btn => {
    const handler = (e) => {
        e.preventDefault();
        const type = btn.dataset.custom;
        const dir = parseInt(btn.dataset.dir);

        if (type === 'model') {
            player.model = (player.model + dir + MODELS.length) % MODELS.length;
        } else if (type === 'clothes') {
            player.clothes = (player.clothes + dir + CLOTHES.length) % CLOTHES.length;
        } else if (type === 'accessory') {
            player.accessory = (player.accessory + dir + ACCESSORIES.length) % ACCESSORIES.length;
        }

        updatePreview();
        playSound('click', 500, 0.1);
    };
    btn.addEventListener('click', handler);
    btn.addEventListener('touchend', handler);
});

// Start button
document.getElementById('startBtn').addEventListener('click', startGame);
document.getElementById('startBtn').addEventListener('touchend', startGame);

function startGame(e) {
    e.preventDefault();
    initAudio();
    document.getElementById('menuOverlay').classList.add('hidden');
    gameState = 'playing';
    resetGame();
}

// Tutorial
const toggleTutorial = (show) => {
    const overlay = document.getElementById('tutorialOverlay');
    if (show) overlay.classList.remove('hidden');
    else overlay.classList.add('hidden');
};

document.getElementById('tutorialBtn').addEventListener('click', (e) => {
    e.preventDefault();
    toggleTutorial(true);
});
document.getElementById('tutorialBtn').addEventListener('touchend', (e) => {
    e.preventDefault();
    toggleTutorial(true);
});

document.getElementById('closeTutorialBtn').addEventListener('click', (e) => {
    e.preventDefault();
    toggleTutorial(false);
});
document.getElementById('closeTutorialBtn').addEventListener('touchend', (e) => {
    e.preventDefault();
    toggleTutorial(false);
});

// Game over buttons
document.getElementById('retryBtn').addEventListener('click', (e) => {
    e.preventDefault();
    hideGameOverModal();
    gameState = 'playing';
    resetGame();
});
document.getElementById('retryBtn').addEventListener('touchend', (e) => {
    e.preventDefault();
    hideGameOverModal();
    gameState = 'playing';
    resetGame();
});

document.getElementById('menuBtn').addEventListener('click', (e) => {
    e.preventDefault();
    hideGameOverModal();
    gameState = 'menu';
    document.getElementById('menuOverlay').classList.remove('hidden');
    updateMenuStats();
});
document.getElementById('menuBtn').addEventListener('touchend', (e) => {
    e.preventDefault();
    hideGameOverModal();
    gameState = 'menu';
    document.getElementById('menuOverlay').classList.remove('hidden');
    updateMenuStats();
});

document.getElementById('saveScoreBtn').addEventListener('click', (e) => {
    e.preventDefault();
    const name = document.getElementById('nameInput').value.trim() || 'ANÔNIMO';
    saveTopScore(name, score);
    document.getElementById('nameInput').classList.add('hidden');
    document.getElementById('saveScoreBtn').classList.add('hidden');
    showToast('Score salvo!', '#00FF00');
});
document.getElementById('saveScoreBtn').addEventListener('touchend', (e) => {
    e.preventDefault();
    const name = document.getElementById('nameInput').value.trim() || 'ANÔNIMO';
    saveTopScore(name, score);
    document.getElementById('nameInput').classList.add('hidden');
    document.getElementById('saveScoreBtn').classList.add('hidden');
    showToast('Score salvo!', '#00FF00');
});

// Level complete buttons
document.getElementById('nextLevelBtn').addEventListener('click', (e) => {
    e.preventDefault();
    nextLevel();
});
document.getElementById('nextLevelBtn').addEventListener('touchend', (e) => {
    e.preventDefault();
    nextLevel();
});

document.getElementById('levelMenuBtn').addEventListener('click', (e) => {
    e.preventDefault();
    hideLevelCompleteModal();
    gameState = 'menu';
    document.getElementById('menuOverlay').classList.remove('hidden');
    updateMenuStats();
});
document.getElementById('levelMenuBtn').addEventListener('touchend', (e) => {
    e.preventDefault();
    hideLevelCompleteModal();
    gameState = 'menu';
    document.getElementById('menuOverlay').classList.remove('hidden');
    updateMenuStats();
});

// Pause buttons
document.getElementById('continueBtn').addEventListener('click', (e) => {
    e.preventDefault();
    togglePause();
});
document.getElementById('continueBtn').addEventListener('touchend', (e) => {
    e.preventDefault();
    togglePause();
});

document.getElementById('pauseMenuBtn').addEventListener('click', (e) => {
    e.preventDefault();
    document.getElementById('pauseModal').classList.add('hidden');
    gameState = 'menu';
    isPaused = false;
    document.getElementById('menuOverlay').classList.remove('hidden');
    updateMenuStats();
});
document.getElementById('pauseMenuBtn').addEventListener('touchend', (e) => {
    e.preventDefault();
    document.getElementById('pauseModal').classList.add('hidden');
    gameState = 'menu';
    isPaused = false;
    document.getElementById('menuOverlay').classList.remove('hidden');
    updateMenuStats();
});

// Share button
document.getElementById('shareBtn').addEventListener('click', (e) => {
    e.preventDefault();
    shareHighScore();
});
document.getElementById('shareBtn').addEventListener('touchend', (e) => {
    e.preventDefault();
    shareHighScore();
});

// ==================== INITIALIZATION ====================
loadData();
updateMenuStats();
initBackground();

// Preview animation loop
setInterval(updatePreview, 100);

// Start game loop
requestAnimationFrame(gameLoop);

// Prevent default touch behaviors on body during gameplay
document.body.addEventListener('touchmove', (e) => {
    if (gameState === 'playing') {
        e.preventDefault();
    }
}, { passive: false });
