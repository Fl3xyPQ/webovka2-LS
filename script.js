// ==============================================
// RADANKY BEZPEČNÉ MÍSTO - JAVASCRIPT
// Complete Interactive Features
// ==============================================

// ==============================================
// FIREBASE CONFIGURATION
// ==============================================

// IMPORTANT: Replace this with your Firebase config from Firebase Console
const firebaseConfig = {
    apiKey: "AIzaSyDH_1n93MTuqFiBbXQj0J8HFQXgbvDnZow",
  authDomain: "super-c5fc1.firebaseapp.com",
  projectId: "super-c5fc1",
  storageBucket: "super-c5fc1.firebasestorage.app",
  messagingSenderId: "372408116638",
  appId: "1:372408116638:web:0ae4a2f5e2ac648a0da28f",
};

// Initialize Firebase
let db = null;
let isBoardUnlocked = false;

// Check if Firebase is loaded
if (typeof firebase !== 'undefined') {
    try {
        firebase.initializeApp(firebaseConfig);
        db = firebase.firestore();
        console.log('🔥 Firebase initialized successfully!');
    } catch (error) {
        console.error('Firebase initialization error:', error);
    }
} else {
    console.warn('Firebase SDK not loaded. Board features will be disabled.');
}

// ==============================================
// PAGE NAVIGATION
// ==============================================

let currentPage = 'home';

function navigateToPage(pageName) {
    // Hide all pages
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });
    
    // Show selected page
    const targetPage = document.querySelector(`[data-page="${pageName}"]`);
    if (targetPage) {
        targetPage.classList.add('active');
        currentPage = pageName;
        
        // Update nav buttons
        document.querySelectorAll('.nav-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        const activeBtn = document.querySelector(`[data-target="${pageName}"]`);
        if (activeBtn) {
            activeBtn.classList.add('active');
        }
        
        // Scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
}

// Nav button click handlers
document.addEventListener('DOMContentLoaded', function() {
    // Initialize navigation
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const target = this.getAttribute('data-target');
            navigateToPage(target);
        });
    });
    
    // Logo clicks return home
    document.querySelector('.logo').addEventListener('click', () => {
        navigateToPage('home');
    });
    
    // Mood card navigation
    document.querySelectorAll('.mood-card').forEach(card => {
        card.addEventListener('click', function() {
            const target = this.getAttribute('data-navigate');
            navigateToPage(target);
        });
    });
    
    // Initialize features
    initParticles();
    initComplimentGenerator();
    initQuotesCarousel();
    initMemoryWall();
    initCounter();
    initPlacesMap();
    initPuzzle();
    initLetters();
    initNotes();
    initMoodTracker();
    initFloatingButton();
    initThemeSwitcher();
    initBoard(); // Firebase board
    initWellness(); // Wellness features
    initGames(); // Mini games
    
    // Show homepage by default
    navigateToPage('home');
});

// ==============================================
// PARTICLE BACKGROUND
// ==============================================

function initParticles() {
    const particlesContainer = document.querySelector('.particles');
    if (!particlesContainer) return;
    
    const particleCount = 30;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        const size = Math.random() * 80 + 30;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.top = `${Math.random() * 100}%`;
        particle.style.animationDelay = `${Math.random() * 20}s`;
        particle.style.animationDuration = `${Math.random() * 15 + 15}s`;
        
        particlesContainer.appendChild(particle);
    }
}

// ==============================================
// COMPLIMENT GENERATOR
// ==============================================

const compliments = [
    "Jsi nejzajímavější člověk, kterého znám.",
    "Tvůj úsměv dokáže rozjasnit i ten nejšednivější den.",
    "Máš úžasnou schopnost dělat lidi okolo sebe šťastnými.",
    "Tvoje kreativita je naprosto fascinující.",
    "Jsi silnější, než si myslíš.",
    "Tvoje odvaha inspiruje ostatní.",
    "Máš dar rozumět lidem způsobem, jakým málokdo dokáže.",
    "Tvoje přítomnost je jako teplé objetí v chladný den.",
    "Svět je díky tobě lepší místo.",
    "Máš nádhernou duši a ještě krásnější srdce.",
    "Tvoje inteligence a vtip jsou úchvatné.",
    "Dokážeš najít krásu i v těch nejobvyklejších věcech.",
    "Tvoje empatie je tvoje superschopnost.",
    "Jsi důležitá více, než si dokážeš představit.",
    "Tvoje energie je nakažlivá v tom nejlepším slova smyslu.",
    "Máš unikátní schopnost udělat z obyčejných chvil nezapomenutelné vzpomínky."
];

let complimentCount = 0;

function initComplimentGenerator() {
    const btn = document.getElementById('generateCompliment');
    const display = document.getElementById('complimentDisplay');
    const counter = document.getElementById('complimentCount');
    
    if (!btn || !display || !counter) return;
    
    // Load count from localStorage
    const savedCount = localStorage.getItem('complimentCount');
    if (savedCount) {
        complimentCount = parseInt(savedCount);
        counter.textContent = complimentCount;
    }
    
    // Show random compliment on load
    showRandomCompliment();
    
    btn.addEventListener('click', showRandomCompliment);
}

function showRandomCompliment() {
    const display = document.getElementById('complimentDisplay');
    const counter = document.getElementById('complimentCount');
    
    const randomIndex = Math.floor(Math.random() * compliments.length);
    const complimentText = display.querySelector('.compliment-text');
    if (complimentText) {
        complimentText.textContent = compliments[randomIndex];
    }
    
    complimentCount++;
    localStorage.setItem('complimentCount', complimentCount);
    counter.textContent = complimentCount;
}

// ==============================================
// QUOTES CAROUSEL
// ==============================================

const quotes = [
    {
        text: "V každém okamžiku máme možnost začít znovu.",
        author: "― Tvé pevné místo"
    },
    {
        text: "Někdy stačí jen dýchat. To je taky úspěch.",
        author: "― Pro tebe"
    },
    {
        text: "Jsi silnější než si myslíš, a milejší než si dokážeš představit.",
        author: "― Pravda o tobě"
    },
    {
        text: "Smutek je jen důkaz, že tvé srdce umí cítit. A to je krásné.",
        author: "― Připomínka"
    },
    {
        text: "Nemusíš být dokonalá. Stačí být ty.",
        author: "― Vždycky"
    }
];

let currentQuoteIndex = 0;

function initQuotesCarousel() {
    const quoteCards = document.querySelectorAll('.quote-card');
    const prevBtn = document.getElementById('prevQuote');
    const nextBtn = document.getElementById('nextQuote');
    const dots = document.querySelectorAll('.quote-dot');
    
    if (!quoteCards.length || !prevBtn || !nextBtn) return;
    
    function showQuote(index) {
        quoteCards.forEach((card, i) => {
            card.classList.toggle('active', i === index);
        });
        
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === index);
        });
        
        currentQuoteIndex = index;
    }
    
    prevBtn.addEventListener('click', () => {
        const newIndex = currentQuoteIndex > 0 ? currentQuoteIndex - 1 : quotes.length - 1;
        showQuote(newIndex);
    });
    
    nextBtn.addEventListener('click', () => {
        const newIndex = currentQuoteIndex < quotes.length - 1 ? currentQuoteIndex + 1 : 0;
        showQuote(newIndex);
    });
    
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => showQuote(index));
    });
    
    showQuote(0);
}

// ==============================================
// MEMORY WALL
// ==============================================

function initMemoryWall() {
    const memoryItems = document.querySelectorAll('.memory-item');
    
    memoryItems.forEach(item => {
        item.addEventListener('click', function() {
            this.classList.toggle('revealed');
        });
    });
}

// ==============================================
// COUNTER (Days/Hours/Minutes)
// ==============================================

function initCounter() {
    // Fixed date: 5. září 2024
    const fixedDate = '2024-09-05';
    startCountdown(fixedDate);
}

function startCountdown(targetDate) {
    const target = new Date(targetDate).getTime();
    
    function updateCounter() {
        const now = new Date().getTime();
        const distance = now - target;
        
        if (distance < 0) {
            const daysEl = document.getElementById('days');
            const hoursEl = document.getElementById('hours');
            const minutesEl = document.getElementById('minutes');
            const secondsEl = document.getElementById('seconds');
            
            if (daysEl) daysEl.textContent = '0';
            if (hoursEl) hoursEl.textContent = '0';
            if (minutesEl) minutesEl.textContent = '0';
            if (secondsEl) secondsEl.textContent = '0';
            return;
        }
        
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        const daysEl = document.getElementById('days');
        const hoursEl = document.getElementById('hours');
        const minutesEl = document.getElementById('minutes');
        const secondsEl = document.getElementById('seconds');
        
        if (daysEl) daysEl.textContent = days;
        if (hoursEl) hoursEl.textContent = hours;
        if (minutesEl) minutesEl.textContent = minutes;
        if (secondsEl) secondsEl.textContent = seconds;
    }
    
    updateCounter();
    setInterval(updateCounter, 1000);
}

// ==============================================
// PLACES MAP - MAPA NAŠICH MÍST
// ==============================================

function initPlacesMap() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const placeItems = document.querySelectorAll('.place-item');
    
    if (!filterButtons.length) return;
    
    // Initialize real interactive map
    initRealMap();
    
    // Filter button click handlers
    filterButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            // Update active state
            filterButtons.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            const filter = this.getAttribute('data-filter');
            
            // Filter places
            placeItems.forEach(place => {
                if (filter === 'all') {
                    place.style.display = 'flex';
                    setTimeout(() => {
                        place.style.opacity = '1';
                        place.style.transform = 'translateY(0)';
                    }, 10);
                } else {
                    const category = place.getAttribute('data-category');
                    if (category === filter) {
                        place.style.display = 'flex';
                        setTimeout(() => {
                            place.style.opacity = '1';
                            place.style.transform = 'translateY(0)';
                        }, 10);
                    } else {
                        place.style.opacity = '0';
                        place.style.transform = 'translateY(20px)';
                        setTimeout(() => {
                            place.style.display = 'none';
                        }, 300);
                    }
                }
            });
        });
    });
    
    // Add hover animation to places
    placeItems.forEach(place => {
        place.addEventListener('mouseenter', function() {
            this.style.transform = 'translateX(5px)';
        });
        
        place.addEventListener('mouseleave', function() {
            this.style.transform = 'translateX(0)';
        });
    });
}

// Initialize real interactive map with Leaflet
function initRealMap() {
    const mapContainer = document.getElementById('realMap');
    if (!mapContainer || typeof L === 'undefined') return;
    
    // Center map on Czech Republic to show all cities
    const map = L.map('realMap').setView([49.5, 16.0], 7);
    
    // Add OpenStreetMap tiles
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors',
        maxZoom: 18,
    }).addTo(map);
    
    // Custom icon style
    const customIcon = L.divIcon({
        className: 'custom-map-marker',
        html: '<div class="marker-pin">📍</div>',
        iconSize: [40, 40],
        iconAnchor: [20, 40],
        popupAnchor: [0, -40]
    });
    
    // Define places with coordinates
    const places = [
        {
            name: 'Praha',
            coords: [50.0755, 14.4378],
            description: 'Nádherná, noční procházka z nádraží byla moc pěkná, mekáč chutnal',
            emoji: '🏰'
        },
        {
            name: 'Vídeň',
            coords: [48.2082, 16.3738],
            description: 'Teplo, hudba, pivo, pokec a památky - NĚKDY TO ZOPAKUJEME!, tehdy jsi pila pod zákonem..',
            emoji: '🏛️'
        },
        {
            name: 'Brno (2x)',
            coords: [49.1951, 16.6068],
            description: 'Dokonce dvakrát..jůů, Špilberk, VIDA!, deep talks, mekáč nesměl chybět a čaj za 40,-',
            emoji: '🏙️'
        },
        {
            name: 'Ostrava',
            coords: [49.8209, 18.2625],
            description: 'Hlavně teda cesta busem zpěěět, to jsme spolu byli tak poprvéé..Johanka nechápala hihi',
            emoji: '🏭'
        },
        {
            name: 'Olomouc',
            coords: [49.5938, 17.2509],
            description: 'No joo, teréňáák, sice jsme se nějak moc extra nebavili, ale byli jsme tam spolu..',
            emoji: '🏛️'
        },
        {
            name: 'Uherské Hradiště',
            coords: [49.0697, 17.4600],
            description: 'Juuu, všimni si že jsme měli zase mekáč..hihi..něco na tom bude, náhodou pěkná atmoška a deeptalks..',
            emoji: '🏰'
        },
        {
            name: 'Bukovany',
            coords: [49.0500, 17.1300],
            description: 'Jižíkův domečééék',
            emoji: '🏘️'
        },
        {
            name: 'Vracov',
            coords: [48.9736, 17.2119],
            description: 'Jadanky domečéééék',
            emoji: '🏡'
        },
        {
            name: 'Kyjov',
            coords: [49.0133, 17.1222],
            description: 'Stužkáč, kolotočééé, společná škola...tam jsme se poznali',
            emoji: '🏘️'
        },
        {
            name: 'Hodonín',
            coords: [48.8489, 17.1325],
            description: 'Město které je spojené s mnoha vzpomínkami a momentkami ✨',
            emoji: '🏙️'
        }
    ];
    
    // Add markers for each place
    places.forEach(place => {
        const marker = L.marker(place.coords, { icon: customIcon }).addTo(map);
        
        // Create popup content
        const popupContent = `
            <div class="map-popup">
                <div class="popup-emoji">${place.emoji}</div>
                <h4 class="popup-title">${place.name}</h4>
                <p class="popup-description">${place.description}</p>
            </div>
        `;
        
        marker.bindPopup(popupContent);
        
        // Open popup on hover
        marker.on('mouseover', function() {
            this.openPopup();
        });
    });
    
    // Adjust map size after initialization
    setTimeout(() => {
        map.invalidateSize();
    }, 100);
}

// ==============================================
// PUZZLE & SECRET MESSAGE
// ==============================================

function initPuzzle() {
    const pieces = document.querySelectorAll('.puzzle-piece');
    const riddleInput = document.getElementById('riddleAnswer');
    const checkBtn = document.getElementById('checkAnswer');
    const secretMessage = document.getElementById('secretMessage');
    
    if (!checkBtn || !riddleInput || !secretMessage) return;
    
    // Puzzle piece click
    pieces.forEach(piece => {
        piece.addEventListener('click', function() {
            this.classList.toggle('revealed');
        });
    });
    
    // Check riddle answer
    checkBtn.addEventListener('click', checkRiddle);
    riddleInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') checkRiddle();
    });
    
    function checkRiddle() {
        const answer = riddleInput.value.trim().toLowerCase();
        
        // CUSTOMIZE THIS - změň správnou odpověď
        const correctAnswer = "řeže se smíchy";
        
        if (answer === correctAnswer) {
            secretMessage.classList.remove('hidden');
            riddleInput.disabled = true;
            checkBtn.disabled = true;
            
            // Unlock all puzzle pieces
            pieces.forEach(piece => {
                piece.classList.add('revealed');
            });
        } else {
            // Wrong answer shake
            riddleInput.style.animation = 'none';
            setTimeout(() => {
                riddleInput.style.animation = 'shake 0.5s';
            }, 10);
        }
    }
}

// ==============================================
// LETTERS / ENVELOPES
// ==============================================

function initLetters() {
    const envelopes = document.querySelectorAll('.letter-envelope');
    
    envelopes.forEach(envelope => {
        const closeBtn = envelope.querySelector('.close-letter');
        
        envelope.addEventListener('click', function(e) {
            if (!e.target.classList.contains('close-letter')) {
                this.classList.add('opened');
            }
        });
        
        if (closeBtn) {
            closeBtn.addEventListener('click', function(e) {
                e.stopPropagation();
                envelope.classList.remove('opened');
            });
        }
    });
}

// ==============================================
// NOTES SYSTEM
// ==============================================

function initNotes() {
    const noteTextarea = document.getElementById('quickNote');
    const saveBtn = document.getElementById('saveQuickNote');
    const clearBtn = document.getElementById('clearQuickNote');
    const notesList = document.getElementById('savedNotes');
    
    if (!noteTextarea || !saveBtn || !notesList) return;
    
    loadNotes();
    
    saveBtn.addEventListener('click', saveNote);
    
    if (clearBtn) {
        clearBtn.addEventListener('click', () => {
            noteTextarea.value = '';
        });
    }
    
    function saveNote() {
        const content = noteTextarea.value.trim();
        if (!content) return;
        
        const notes = JSON.parse(localStorage.getItem('notes') || '[]');
        
        const newNote = {
            id: Date.now(),
            content: content,
            date: new Date().toLocaleDateString('cs-CZ'),
            time: new Date().toLocaleTimeString('cs-CZ', { hour: '2-digit', minute: '2-digit' })
        };
        
        notes.unshift(newNote);
        localStorage.setItem('notes', JSON.stringify(notes));
        
        noteTextarea.value = '';
        loadNotes();
    }
    
    function loadNotes() {
        const notes = JSON.parse(localStorage.getItem('notes') || '[]');
        
        if (notes.length === 0) {
            notesList.innerHTML = '<div class="empty-state">Zatím žádné poznámky. Začni psát!</div>';
            return;
        }
        
        notesList.innerHTML = notes.map(note => `
            <div class="saved-note-item" data-id="${note.id}">
                <div class="note-meta">
                    <span>${note.date} v ${note.time}</span>
                    <button class="delete-note-btn" onclick="deleteNote(${note.id})">🗑️</button>
                </div>
                <div class="note-content-text">${escapeHtml(note.content)}</div>
            </div>
        `).join('');
    }
    
    window.deleteNote = function(id) {
        let notes = JSON.parse(localStorage.getItem('notes') || '[]');
        notes = notes.filter(note => note.id !== id);
        localStorage.setItem('notes', JSON.stringify(notes));
        loadNotes();
    };
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// ==============================================
// MOOD TRACKER
// ==============================================

function initMoodTracker() {
    const moodBtns = document.querySelectorAll('.mood-btn');
    const moodHistory = document.getElementById('moodHistory');
    
    if (!moodBtns.length) return;
    
    loadMoodHistory();
    
    moodBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const mood = this.getAttribute('data-mood');
            saveMood(mood);
            
            // Visual feedback
            moodBtns.forEach(b => b.classList.remove('selected'));
            this.classList.add('selected');
            
            setTimeout(() => {
                this.classList.remove('selected');
            }, 1000);
        });
    });
    
    function saveMood(mood) {
        const moods = JSON.parse(localStorage.getItem('moods') || '[]');
        
        const newMood = {
            mood: mood,
            date: new Date().toLocaleDateString('cs-CZ'),
            time: new Date().toLocaleTimeString('cs-CZ', { hour: '2-digit', minute: '2-digit' })
        };
        
        moods.unshift(newMood);
        
        // Keep only last 30 entries
        if (moods.length > 30) {
            moods.pop();
        }
        
        localStorage.setItem('moods', JSON.stringify(moods));
        loadMoodHistory();
    }
    
    function loadMoodHistory() {
        const moods = JSON.parse(localStorage.getItem('moods') || '[]');
        
        if (!moodHistory) return;
        
        if (moods.length === 0) {
            moodHistory.innerHTML = '<div class="empty-state">Zatím žádná nálada zaznamenána</div>';
            return;
        }
        
        moodHistory.innerHTML = moods.slice(0, 10).map(m => `
            <div class="mood-entry">
                <span>${getMoodEmoji(m.mood)} ${m.mood}</span>
                <span>${m.date} v ${m.time}</span>
            </div>
        `).join('');
    }
    
    function getMoodEmoji(mood) {
        const emojis = {
            'Šťastná': '😊',
            'Smutná': '😢',
            'Naštvaná': '😠',
            'Klidná': '😌',
            'Unavená': '😴',
            'Motivovaná': '💪'
        };
        return emojis[mood] || '💭';
    }
}

// ==============================================
// FLOATING QUICK ACCESS BUTTON
// ==============================================

function initFloatingButton() {
    const floatingBtn = document.querySelector('.floating-btn');
    
    if (!floatingBtn) return;
    
    floatingBtn.addEventListener('click', () => {
        navigateToPage('home');
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// ==============================================
// THEME SWITCHER
// ==============================================

function initThemeSwitcher() {
    const themeToggle = document.querySelector('.theme-toggle');
    const colorSchemeBtn = document.querySelector('.floating-color-btn');
    const themes = [
        '', 
        'ocean-theme', 
        'sunset-theme', 
        'forest-theme', 
        'cherry-theme',
        'lavender-theme',
        'mint-theme',
        'autumn-theme',
        'aurora-theme',
        'dark-mode'
    ];
    let currentThemeIndex = 0;
    
    // Load saved theme from localStorage
    const savedTheme = localStorage.getItem('selectedTheme') || '';
    if (savedTheme) {
        document.body.className = savedTheme;
        currentThemeIndex = themes.indexOf(savedTheme);
        updateThemeToggleIcon(savedTheme);
        updateColorButtonIcon(savedTheme);
    }
    
    // Header theme toggle - toggles dark mode on/off
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            if (document.body.classList.contains('dark-mode')) {
                // Switch from dark to light
                document.body.className = '';
                currentThemeIndex = 0;
                localStorage.setItem('selectedTheme', '');
                updateThemeToggleIcon('');
                updateColorButtonIcon('');
            } else {
                // Switch to dark mode
                document.body.className = 'dark-mode';
                currentThemeIndex = 9;
                localStorage.setItem('selectedTheme', 'dark-mode');
                updateThemeToggleIcon('dark-mode');
                updateColorButtonIcon('dark-mode');
            }
        });
    }
    
    // Floating color scheme button - cycles through all themes
    if (colorSchemeBtn) {
        colorSchemeBtn.addEventListener('click', () => {
            currentThemeIndex = (currentThemeIndex + 1) % themes.length;
            const newTheme = themes[currentThemeIndex];
            
            document.body.className = newTheme;
            localStorage.setItem('selectedTheme', newTheme);
            updateThemeToggleIcon(newTheme);
            updateColorButtonIcon(newTheme);
            
            // Show brief notification of current theme
            showThemeNotification(getThemeName(newTheme));
        });
    }
    
    function updateThemeToggleIcon(theme) {
        if (themeToggle) {
            themeToggle.textContent = theme === 'dark-mode' ? '☀️' : '🌙';
        }
    }
    
    function updateColorButtonIcon(theme) {
        if (colorSchemeBtn) {
            const icons = {
                '': '☀️',
                'ocean-theme': '🌊',
                'sunset-theme': '🌅',
                'forest-theme': '🌲',
                'cherry-theme': '🌸',
                'lavender-theme': '💜',
                'mint-theme': '🍃',
                'autumn-theme': '🍂',
                'aurora-theme': '✨',
                'dark-mode': '🌙'
            };
            colorSchemeBtn.textContent = icons[theme] || '🎨';
        }
    }
    
    function getThemeName(theme) {
        const themeNames = {
            '': 'Světlý režim',
            'ocean-theme': 'Oceán',
            'sunset-theme': 'Západ slunce',
            'forest-theme': 'Les',
            'cherry-theme': 'Třešňový květ',
            'lavender-theme': 'Levandulový sen',
            'mint-theme': 'Mátový svěží',
            'autumn-theme': 'Podzimní nálada',
            'aurora-theme': 'Polární záře',
            'dark-mode': 'Tmavý režim'
        };
        return themeNames[theme] || 'Světlý režim';
    }
    
    function showThemeNotification(themeName) {
        // Remove existing notification if any
        const existingNotif = document.querySelector('.theme-notification');
        if (existingNotif) {
            existingNotif.remove();
        }
        
        // Create and show new notification
        const notification = document.createElement('div');
        notification.className = 'theme-notification';
        notification.textContent = themeName;
        notification.style.cssText = `
            position: fixed;
            top: 80px;
            right: 20px;
            background: rgba(102, 126, 234, 0.95);
            backdrop-filter: blur(10px);
            color: #ffffff;
            padding: 12px 24px;
            border-radius: 12px;
            font-weight: 600;
            font-size: 0.95rem;
            text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
            z-index: 10000;
            animation: slideIn 0.3s ease-out;
            box-shadow: 0 4px 16px rgba(102, 126, 234, 0.4), 0 2px 8px rgba(0, 0, 0, 0.2);
            border: 1px solid rgba(255, 255, 255, 0.3);
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease-out';
            setTimeout(() => notification.remove(), 300);
        }, 2000);
    }
}

// ==============================================
// KEYBOARD SHORTCUTS
// ==============================================

document.addEventListener('keydown', (e) => {
    // Ctrl/Cmd + Number = navigate to page
    if (e.ctrlKey || e.metaKey) {
        switch(e.key) {
            case '1':
                e.preventDefault();
                navigateToPage('home');
                break;
            case '2':
                e.preventDefault();
                navigateToPage('comfort');
                break;
            case '3':
                e.preventDefault();
                navigateToPage('memories');
                break;
            case '4':
                e.preventDefault();
                navigateToPage('fun');
                break;
            case '5':
                e.preventDefault();
                navigateToPage('notes');
                break;
        }
    }
});

// ==============================================
// BOARD - NÁSTĚNKA (FIREBASE)
// ==============================================

const ACCESS_CODE = "About You"//ZMĚŇ NA VLASTNÍ KÓD!
let selectedMessageColor = 'pink';

function initBoard() {
    const unlockBtn = document.getElementById('unlockBtn');
    const accessCode = document.getElementById('accessCode');
    const accessGate = document.getElementById('accessGate');
    const boardContent = document.getElementById('boardContent');
    
    if (!unlockBtn || !accessCode) return;
    
    // Check if already unlocked in session
    if (sessionStorage.getItem('boardUnlocked') === 'true') {
        unlockBoard();
    }
    
    // Unlock button
    unlockBtn.addEventListener('click', checkAccess);
    accessCode.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') checkAccess();
    });
    
    function checkAccess() {
        if (accessCode.value.trim() === ACCESS_CODE) {
            sessionStorage.setItem('boardUnlocked', 'true');
            unlockBoard();
        } else {
            accessCode.value = '';
            accessCode.placeholder = '❌ Zkus to znovu...';
            accessCode.style.animation = 'shake 0.5s';
            setTimeout(() => {
                accessCode.style.animation = '';
                accessCode.placeholder = 'Zadej přístupový kód';
            }, 500);
        }
    }
    
    function unlockBoard() {
        isBoardUnlocked = true;
        if (accessGate) accessGate.style.display = 'none';
        if (boardContent) boardContent.classList.remove('hidden');
        
        // Initialize board features
        initMessages();
        initDrawing();
        loadMessages();
        loadDrawings();
    }
}

// ==============================================
// TEXTOVÉ VZKAZY
// ==============================================

function initMessages() {
    const postBtn = document.getElementById('postMessageBtn');
    const authorInput = document.getElementById('authorName');
    const messageInput = document.getElementById('messageText');
    const colorBtns = document.querySelectorAll('.color-btn');
    
    if (!postBtn || !authorInput || !messageInput) return;
    
    // Color selection
    colorBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            colorBtns.forEach(b => b.classList.remove('selected'));
            this.classList.add('selected');
            selectedMessageColor = this.getAttribute('data-color');
        });
    });
    
    // Select pink by default
    colorBtns[0]?.classList.add('selected');
    
    // Post message
    postBtn.addEventListener('click', postMessage);
    
    async function postMessage() {
        const author = authorInput.value.trim();
        const text = messageInput.value.trim();
        
        if (!author || !text) {
            alert('Vyplň jméno i vzkaz! 💌');
            return;
        }
        
        if (!db) {
            alert('Firebase není připojeno. Zkontroluj konfiguraci.');
            return;
        }
        
        try {
            await db.collection('messages').add({
                author: author,
                text: text,
                color: selectedMessageColor,
                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                createdAt: new Date().toISOString()
            });
            
            // Clear inputs
            messageInput.value = '';
            
            // Success feedback
            postBtn.textContent = '✅ Odesláno!';
            setTimeout(() => {
                postBtn.textContent = '📮 Poslat vzkaz';
            }, 2000);
            
        } catch (error) {
            console.error('Error posting message:', error);
            alert('Chyba při odesílání vzkazu: ' + error.message);
        }
    }
}

function loadMessages() {
    const messagesBoard = document.getElementById('messagesBoard');
    if (!messagesBoard || !db) return;
    
    // Real-time listener
    db.collection('messages')
        .orderBy('createdAt', 'desc')
        .limit(50)
        .onSnapshot(snapshot => {
            if (snapshot.empty) {
                messagesBoard.innerHTML = '<p class="empty-state">Zatím žádné vzkazy. Buď první! 💌</p>';
                return;
            }
            
            messagesBoard.innerHTML = '';
            
            snapshot.forEach(doc => {
                const data = doc.data();
                const messageCard = createMessageCard(data);
                messagesBoard.appendChild(messageCard);
            });
        }, error => {
            console.error('Error loading messages:', error);
        });
}

function createMessageCard(data) {
    const card = document.createElement('div');
    card.className = `message-card ${data.color || 'pink'}`;
    
    const timestamp = data.timestamp 
        ? new Date(data.timestamp.toDate()).toLocaleString('cs-CZ', {
            day: 'numeric',
            month: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        })
        : new Date(data.createdAt).toLocaleString('cs-CZ', {
            day: 'numeric',
            month: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    
    card.innerHTML = `
        <div class="message-author">✨ ${escapeHtml(data.author)}</div>
        <div class="message-content">${escapeHtml(data.text)}</div>
        <div class="message-timestamp">${timestamp}</div>
    `;
    
    return card;
}

// ==============================================
// MALŮVKY - CANVAS
// ==============================================

function initDrawing() {
    const canvas = document.getElementById('drawingCanvas');
    const postBtn = document.getElementById('postDrawingBtn');
    const authorInput = document.getElementById('drawingAuthor');
    const brushColor = document.getElementById('brushColor');
    const brushSize = document.getElementById('brushSize');
    const brushSizeDisplay = document.getElementById('brushSizeDisplay');
    const eraserBtn = document.getElementById('eraserBtn');
    const clearBtn = document.getElementById('clearCanvasBtn');
    const presetColors = document.querySelectorAll('.preset-color');
    
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    let isDrawing = false;
    let isEraser = false;
    
    // Set canvas size
    canvas.width = 800;
    canvas.height = 500;
    
    // Fill white background
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Drawing settings
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    
    // Brush size display
    if (brushSize && brushSizeDisplay) {
        brushSize.addEventListener('input', () => {
            brushSizeDisplay.textContent = brushSize.value + 'px';
        });
    }
    
    // Preset colors
    presetColors.forEach(btn => {
        btn.addEventListener('click', function() {
            const color = this.getAttribute('data-color');
            if (brushColor) brushColor.value = color;
            isEraser = false;
            if (eraserBtn) eraserBtn.classList.remove('active');
        });
    });
    
    // Eraser toggle
    if (eraserBtn) {
        eraserBtn.addEventListener('click', () => {
            isEraser = !isEraser;
            eraserBtn.classList.toggle('active');
        });
    }
    
    // Clear canvas
    if (clearBtn) {
        clearBtn.addEventListener('click', () => {
            if (confirm('Smazat celou malůvku?')) {
                ctx.fillStyle = 'white';
                ctx.fillRect(0, 0, canvas.width, canvas.height);
            }
        });
    }
    
    // Mouse events
    canvas.addEventListener('mousedown', startDrawing);
    canvas.addEventListener('mousemove', draw);
    canvas.addEventListener('mouseup', stopDrawing);
    canvas.addEventListener('mouseout', stopDrawing);
    
    // Touch events
    canvas.addEventListener('touchstart', handleTouch);
    canvas.addEventListener('touchmove', handleTouch);
    canvas.addEventListener('touchend', stopDrawing);
    
    function startDrawing(e) {
        isDrawing = true;
        const rect = canvas.getBoundingClientRect();
        const scaleX = canvas.width / rect.width;
        const scaleY = canvas.height / rect.height;
        const x = (e.clientX - rect.left) * scaleX;
        const y = (e.clientY - rect.top) * scaleY;
        
        ctx.beginPath();
        ctx.moveTo(x, y);
    }
    
    function draw(e) {
        if (!isDrawing) return;
        
        const rect = canvas.getBoundingClientRect();
        const scaleX = canvas.width / rect.width;
        const scaleY = canvas.height / rect.height;
        const x = (e.clientX - rect.left) * scaleX;
        const y = (e.clientY - rect.top) * scaleY;
        
        ctx.lineWidth = brushSize ? brushSize.value : 3;
        ctx.strokeStyle = isEraser ? 'white' : (brushColor ? brushColor.value : '#667eea');
        
        ctx.lineTo(x, y);
        ctx.stroke();
    }
    
    function stopDrawing() {
        isDrawing = false;
        ctx.beginPath();
    }
    
    function handleTouch(e) {
        e.preventDefault();
        const touch = e.touches[0];
        const mouseEvent = new MouseEvent(e.type === 'touchstart' ? 'mousedown' : 'mousemove', {
            clientX: touch.clientX,
            clientY: touch.clientY
        });
        canvas.dispatchEvent(mouseEvent);
    }
    
    // Post drawing
    if (postBtn && authorInput) {
        postBtn.addEventListener('click', async () => {
            const author = authorInput.value.trim();
            
            if (!author) {
                alert('Vyplň své jméno! 🎨');
                return;
            }
            
            if (!db) {
                alert('Firebase není připojeno.');
                return;
            }
            
            try {
                // Convert canvas to base64
                const imageData = canvas.toDataURL('image/png');
                
                await db.collection('drawings').add({
                    author: author,
                    image: imageData,
                    timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                    createdAt: new Date().toISOString()
                });
                
                // Clear canvas
                ctx.fillStyle = 'white';
                ctx.fillRect(0, 0, canvas.width, canvas.height);
                authorInput.value = '';
                
                // Success feedback
                postBtn.textContent = '✅ Sdíleno!';
                setTimeout(() => {
                    postBtn.textContent = '🖼️ Sdílet malůvku';
                }, 2000);
                
            } catch (error) {
                console.error('Error posting drawing:', error);
                alert('Chyba při sdílení malůvky: ' + error.message);
            }
        });
    }
}

function loadDrawings() {
    const gallery = document.getElementById('drawingsGallery');
    if (!gallery || !db) return;
    
    // Real-time listener
    db.collection('drawings')
        .orderBy('createdAt', 'desc')
        .limit(20)
        .onSnapshot(snapshot => {
            if (snapshot.empty) {
                gallery.innerHTML = '<p class="empty-state">Zatím žádné malůvky. Buď první umělec! 🎨</p>';
                return;
            }
            
            gallery.innerHTML = '';
            
            snapshot.forEach(doc => {
                const data = doc.data();
                const drawingItem = createDrawingItem(data);
                gallery.appendChild(drawingItem);
            });
        }, error => {
            console.error('Error loading drawings:', error);
        });
}

function createDrawingItem(data) {
    const item = document.createElement('div');
    item.className = 'drawing-item';
    
    const timestamp = data.timestamp 
        ? new Date(data.timestamp.toDate()).toLocaleString('cs-CZ', {
            day: 'numeric',
            month: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        })
        : new Date(data.createdAt).toLocaleString('cs-CZ', {
            day: 'numeric',
            month: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    
    item.innerHTML = `
        <img src="${data.image}" alt="Malůvka" class="drawing-preview">
        <div class="drawing-info">
            <span class="drawing-author">🎨 ${escapeHtml(data.author)}</span>
            <span class="drawing-timestamp">${timestamp}</span>
        </div>
    `;
    
    // Click to view fullscreen
    item.addEventListener('click', () => {
        const fullscreen = window.open('', '_blank');
        fullscreen.document.write(`
            <html>
                <head><title>Malůvka od ${escapeHtml(data.author)}</title></head>
                <body style="margin:0;display:flex;align-items:center;justify-content:center;background:#000;">
                    <img src="${data.image}" style="max-width:100%;max-height:100vh;">
                </body>
            </html>
        `);
    });
    
    return item;
}

// ==============================================
// UTILITY: Shake Animation
// ==============================================

const style = document.createElement('style');
style.textContent = `
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        25% { transform: translateX(-10px); }
        75% { transform: translateX(10px); }
    }
`;
document.head.appendChild(style);

// ==============================================
// WELLNESS FEATURES
// ==============================================

function initWellness() {
    initVirtualHug();
    initBreathing();
    initMoodMeter();
    initDailyAffirmation();
    initEmergencyKit();
}

// ==============================================
// VIRTUAL HUG
// ==============================================

function initVirtualHug() {
    const hugBtn = document.getElementById('hugBtn');
    const hugCountDisplay = document.getElementById('hugCount');
    
    if (!hugBtn) return;
    
    let hugCount = parseInt(localStorage.getItem('hugCount') || '0');
    hugCountDisplay.textContent = hugCount;
    
    hugBtn.addEventListener('click', () => {
        showVirtualHug();
        hugCount++;
        localStorage.setItem('hugCount', hugCount);
        hugCountDisplay.textContent = hugCount;
    });
}

function showVirtualHug() {
    const overlay = document.createElement('div');
    overlay.className = 'virtual-hug-overlay';
    
    const messages = [
        "Myslím na tebe bobe... 💙",
        "Nejsi sama... 💜",
        "Jsem tu pro tebe 24/7... 💖",
        "Napiš miii, nebo voleej... 🌟"
    ];
    
    const randomMessage = messages[Math.floor(Math.random() * messages.length)];
    
    overlay.innerHTML = `
        <div class="hug-animation">
            <div class="arm left">🤗</div>
            <div class="message">${randomMessage}</div>
            <div class="arm right">🤗</div>
        </div>
    `;
    
    document.body.appendChild(overlay);
    
    // Vibrate if supported
    if (navigator.vibrate) {
        navigator.vibrate([200, 100, 200, 100, 200]);
    }
    
    // Remove after 5 seconds
    setTimeout(() => {
        overlay.style.opacity = '0';
        setTimeout(() => overlay.remove(), 500);
    }, 5000);
}

// ==============================================
// BREATHING EXERCISE
// ==============================================

let breathingInterval = null;
let breathingCycles = 0;

function initBreathing() {
    const circle = document.getElementById('breathingCircle');
    const text = document.getElementById('breathingText');
    const startBtn = document.getElementById('startBreathing');
    const stopBtn = document.getElementById('stopBreathing');
    const cyclesDisplay = document.getElementById('breathingCycles');
    
    if (!circle || !startBtn || !stopBtn) return;
    
    breathingCycles = parseInt(localStorage.getItem('breathingCycles') || '0');
    cyclesDisplay.textContent = breathingCycles;
    
    startBtn.addEventListener('click', () => startBreathing(circle, text, cyclesDisplay));
    stopBtn.addEventListener('click', () => stopBreathing(circle, text));
}

function startBreathing(circle, text, cyclesDisplay) {
    if (breathingInterval) return;
    
    let phase = 0;
    const phases = [
        { name: 'inhale', text: 'Vdech...', class: 'inhale' },
        { name: 'hold1', text: 'Zadrž...', class: 'hold' },
        { name: 'exhale', text: 'Výdech...', class: 'exhale' },
        { name: 'hold2', text: 'Zadrž...', class: 'hold' }
    ];
    
    function nextPhase() {
        circle.className = 'breathing-circle ' + phases[phase].class;
        text.textContent = phases[phase].text;
        
        phase++;
        if (phase >= phases.length) {
            phase = 0;
            breathingCycles++;
            localStorage.setItem('breathingCycles', breathingCycles);
            cyclesDisplay.textContent = breathingCycles;
        }
    }
    
    nextPhase();
    breathingInterval = setInterval(nextPhase, 4000);
}

function stopBreathing(circle, text) {
    if (breathingInterval) {
        clearInterval(breathingInterval);
        breathingInterval = null;
        circle.className = 'breathing-circle';
        text.textContent = 'Zastaveno';
    }
}

// ==============================================
// MOOD METER
// ==============================================

function initMoodMeter() {
    const slider = document.getElementById('moodSlider');
    const valueDisplay = document.getElementById('moodValue');
    const labelDisplay = document.getElementById('moodLabel');
    const saveBtn = document.getElementById('saveMoodMeter');
    const canvas = document.getElementById('moodChart');
    
    if (!slider || !saveBtn || !canvas) return;
    
    const moodLabels = ['Hrozně', 'Špatně', 'Smutně', 'Tak tak', 'Neutrální', 
                        'Docela dobře', 'Dobře', 'Skvěle', 'Úžasně', 'Fantasticky'];
    
    slider.addEventListener('input', () => {
        const value = slider.value;
        valueDisplay.textContent = value;
        labelDisplay.textContent = moodLabels[value - 1];
    });
    
    saveBtn.addEventListener('click', () => {
        const value = parseInt(slider.value);
        const moods = JSON.parse(localStorage.getItem('moodMeterHistory') || '[]');
        
        moods.push({
            value: value,
            date: new Date().toLocaleDateString('cs-CZ'),
            timestamp: Date.now()
        });
        
        // Keep last 30 entries
        if (moods.length > 30) moods.shift();
        
        localStorage.setItem('moodMeterHistory', JSON.stringify(moods));
        drawMoodChart(canvas, moods);
        
        saveBtn.textContent = '✅ Uloženo!';
        setTimeout(() => {
            saveBtn.textContent = '💾 Uložit náladu';
        }, 2000);
    });
    
    // Load and draw chart
    const moods = JSON.parse(localStorage.getItem('moodMeterHistory') || '[]');
    if (moods.length > 0) {
        drawMoodChart(canvas, moods);
    }
}

function drawMoodChart(canvas, moods) {
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    if (moods.length === 0) return;
    
    const width = canvas.width;
    const height = canvas.height;
    const padding = 40;
    const graphWidth = width - 2 * padding;
    const graphHeight = height - 2 * padding;
    
    // Draw axes
    ctx.strokeStyle = '#ccc';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(padding, padding);
    ctx.lineTo(padding, height - padding);
    ctx.lineTo(width - padding, height - padding);
    ctx.stroke();
    
    // Draw line
    ctx.strokeStyle = '#667eea';
    ctx.lineWidth = 3;
    ctx.beginPath();
    
    moods.forEach((mood, i) => {
        const x = padding + (i / (moods.length - 1 || 1)) * graphWidth;
        const y = height - padding - ((mood.value - 1) / 9) * graphHeight;
        
        if (i === 0) {
            ctx.moveTo(x, y);
        } else {
            ctx.lineTo(x, y);
        }
    });
    
    ctx.stroke();
    
    // Draw points
    moods.forEach((mood, i) => {
        const x = padding + (i / (moods.length - 1 || 1)) * graphWidth;
        const y = height - padding - ((mood.value - 1) / 9) * graphHeight;
        
        ctx.fillStyle = '#667eea';
        ctx.beginPath();
        ctx.arc(x, y, 5, 0, Math.PI * 2);
        ctx.fill();
    });
}

// ==============================================
// DAILY AFFIRMATION
// ==============================================

const affirmations = [
    "Jsem dostatečně dobrá přesně taková, jaká jsem.",
    "Moje pocity jsou platné a důležité.",
    "Zasloužím si lásku a respekt.",
    "Jsem silnější než si myslím.",
    "Můj hlas má hodnotu.",
    "Jsem hrdá na svůj pokrok.",
    "Odpouštím si své chyby.",
    "Jsem schopná velkých věcí.",
    "Má cesta je jedinečná a cenná.",
    "Důvěřuji svému vnitřnímu hlasu.",
    "Jsem obklopená láskou.",
    "Každý den rostu a učím se.",
    "Jsem vděčná za svou jedinečnost.",
    "Mám právo být šťastná.",
    "Jsem dostatečně odvážná čelit výzvám.",
    "Má přítomnost má význam.",
    "Jsem hrdá na to, kým jsem.",
    "Zasloužím si odpočinek a péči.",
    "Moje sny jsou důležité.",
    "Jsem nádherná zevnitř i zvenčí."
];

function initDailyAffirmation() {
    const display = document.getElementById('dailyAffirmation');
    const btn = document.getElementById('newAffirmation');
    
    if (!display || !btn) return;
    
    btn.addEventListener('click', () => {
        const random = affirmations[Math.floor(Math.random() * affirmations.length)];
        display.textContent = `"${random}"`;
        display.style.animation = 'none';
        setTimeout(() => {
            display.style.animation = 'fadeInScale 0.5s ease';
        }, 10);
    });
}

// ==============================================
// EMERGENCY COMFORT KIT
// ==============================================

function initEmergencyKit() {
    const btn = document.getElementById('emergencyBtn');
    
    if (!btn) return;
    
    btn.addEventListener('click', showEmergencyKit);
}

function showEmergencyKit() {
    const overlay = document.createElement('div');
    overlay.className = 'emergency-overlay';
    
    // CUSTOMIZE: Upravte si texty podle sebe
    const emergencyMessage = "Okamžitě mi napiš, zavolej, cokoliv, ať dělám co dělám, položím to a pomůžu ti, budu s tebou ať tím neprocházíš sama. DISTURB ME, BUDU JEN RÁD, že budu moct být s tebou a pomoct ti.";
    
    const emergencyQuote = {
        text: "Nezapomeň si odpočinout. Někdy je největší odvaha dovolit si být slabý.",
        author: "― Random občan Polygonie"
    };
    
    const emergencyReminder = "Ať si procházíš čímkoliv, přejde to, každé špatné období se jednou přehoupne do toho lepšího. Na světe máš spoustu lidí, kteří te podporují a já budu navždy napříč všemu jedním z nich - mám tě moc rád ❤️";
    
    overlay.innerHTML = `
        <div class="emergency-content">
            <button class="emergency-close">✕</button>
            <h1 style="font-size: 3rem; margin-bottom: 2rem;">❤️ I am here Radyyy ❤️</h1>
            
            <div class="emergency-section">
                <h3>✨ REACH OUT</h3>
                <p style="font-size: 1.3rem; line-height: 1.8;">${emergencyMessage}</p>
            </div>
            
            <div class="emergency-section">
                <h3>💭 Motivační citát</h3>
                <p style="font-size: 1.2rem; font-style: italic;">"${emergencyQuote.text}"</p>
                <p style="color: #718096; margin-top: 0.5rem;">${emergencyQuote.author}</p>
            </div>
            
            <div class="emergency-section">
                <h3>💨 Rychlé dýchání</h3>
                <p style="font-size: 1.1rem;">Vdech (4s) → Zadrž (4s) → Výdech (4s)</p>
                <div id="emergencyBreathing" style="width: 200px; height: 200px; margin: 1rem auto; border-radius: 50%; background: linear-gradient(135deg, #4facfe, #00f2fe); transition: transform 4s; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold;">Dýchej</div>
            </div>
            
            <div class="emergency-section" style="background: linear-gradient(135deg, rgba(168, 237, 234, 0.2), rgba(254, 214, 227, 0.2));">
                <h3>💙 Připomínka</h3>
                <p style="font-size: 1.5rem; font-weight: 300;">${emergencyReminder}</p>
            </div>
        </div>
    `;
    
    document.body.appendChild(overlay);
    
    // Close button
    overlay.querySelector('.emergency-close').addEventListener('click', () => {
        overlay.remove();
    });
    
    // Simple breathing animation
    const breathingCircle = overlay.querySelector('#emergencyBreathing');
    let phase = 0;
    setInterval(() => {
        if (phase === 0) {
            breathingCircle.style.transform = 'scale(1.8)';
            breathingCircle.textContent = 'Vdech';
        } else if (phase === 1) {
            breathingCircle.textContent = 'Zadrž';
        } else if (phase === 2) {
            breathingCircle.style.transform = 'scale(1)';
            breathingCircle.textContent = 'Výdech';
        } else {
            breathingCircle.textContent = 'Zadrž';
        }
        phase = (phase + 1) % 4;
    }, 4000);
}

// ==============================================
// MINI GAMES
// ==============================================

function initGames() {
    const gameCards = document.querySelectorAll('.game-card');
    const closeButtons = document.querySelectorAll('.close-game-btn');
    
    gameCards.forEach(card => {
        card.addEventListener('click', function() {
            const gameName = this.getAttribute('data-game');
            openGame(gameName);
        });
    });
    
    closeButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const gameContainer = this.closest('.game-container');
            gameContainer.classList.add('hidden');
            
            // Stop game loops
            if (gameContainer.id === 'starsGame') {
                starsGameRunning = false;
            } else if (gameContainer.id === 'affirmationGame') {
                affirmationGameRunning = false;
            } else if (gameContainer.id === 'bubblesGame' && bubblesInterval) {
                clearInterval(bubblesInterval);
                bubblesInterval = null;
            }
        });
    });
}

function openGame(gameName) {
    // Hide all games
    document.querySelectorAll('.game-container').forEach(g => g.classList.add('hidden'));
    
    // Show selected game
    const gameMap = {
        'memory': 'memoryGame',
        'bubbles': 'bubblesGame',
        'colors': 'colorsGame',
        'stars': 'starsGame',
        'affirmation': 'affirmationGame'
    };
    
    const gameId = gameMap[gameName];
    const gameContainer = document.getElementById(gameId);
    
    if (gameContainer) {
        gameContainer.classList.remove('hidden');
        
        // Initialize the specific game
        switch(gameName) {
            case 'memory':
                initMemoryGame();
                break;
            case 'bubbles':
                initBubblesGame();
                break;
            case 'colors':
                initColorsGame();
                break;
            case 'stars':
                initStarsGame();
                break;
            case 'affirmation':
                initAffirmationRain();
                break;
        }
    }
}

// ==============================================
// MEMORY GAME
// ==============================================

let memoryCards = [];
let flippedCards = [];
let matchedPairs = 0;
let memoryMoves = 0;
let memoryTimer = null;
let memorySeconds = 0;

function initMemoryGame() {
    const board = document.getElementById('memoryBoard');
    const movesDisplay = document.getElementById('memoryMoves');
    const timeDisplay = document.getElementById('memoryTime');
    const restartBtn = document.getElementById('memoryRestart');
    
    if (!board) return;
    
    const emojis = ['🌟', '💖', '🌈', '🎨', '🎵', '🌸', '🦋', '✨'];
    const cards = [...emojis, ...emojis].sort(() => Math.random() - 0.5);
    
    memoryCards = [];
    flippedCards = [];
    matchedPairs = 0;
    memoryMoves = 0;
    memorySeconds = 0;
    
    board.innerHTML = '';
    movesDisplay.textContent = '0';
    timeDisplay.textContent = '0:00';
    
    // Create cards
    cards.forEach((emoji, index) => {
        const card = document.createElement('div');
        card.className = 'memory-card';
        card.dataset.emoji = emoji;
        card.dataset.index = index;
        card.addEventListener('click', flipMemoryCard);
        board.appendChild(card);
        memoryCards.push(card);
    });
    
    // Start timer
    if (memoryTimer) clearInterval(memoryTimer);
    memoryTimer = setInterval(() => {
        memorySeconds++;
        const mins = Math.floor(memorySeconds / 60);
        const secs = memorySeconds % 60;
        timeDisplay.textContent = `${mins}:${secs.toString().padStart(2, '0')}`;
    }, 1000);
    
    restartBtn.addEventListener('click', initMemoryGame);
}

function flipMemoryCard() {
    if (this.classList.contains('flipped') || this.classList.contains('matched')) return;
    if (flippedCards.length >= 2) return;
    
    this.classList.add('flipped');
    this.textContent = this.dataset.emoji;
    flippedCards.push(this);
    
    if (flippedCards.length === 2) {
        memoryMoves++;
        document.getElementById('memoryMoves').textContent = memoryMoves;
        checkMemoryMatch();
    }
}

function checkMemoryMatch() {
    const [card1, card2] = flippedCards;
    
    if (card1.dataset.emoji === card2.dataset.emoji) {
        // Match!
        card1.classList.add('matched');
        card2.classList.add('matched');
        matchedPairs++;
        flippedCards = [];
        
        if (matchedPairs === memoryCards.length / 2) {
            clearInterval(memoryTimer);
            setTimeout(() => {
                alert(`🎉 Vyhrál jsi! Tahy: ${memoryMoves}, Čas: ${document.getElementById('memoryTime').textContent}`);
            }, 500);
        }
    } else {
        // No match
        setTimeout(() => {
            card1.classList.remove('flipped');
            card2.classList.remove('flipped');
            card1.textContent = '';
            card2.textContent = '';
            flippedCards = [];
        }, 1000);
    }
}

// ==============================================
// BUBBLES GAME
// ==============================================

let bubblesInterval = null;
let bubbleScore = 0;

function initBubblesGame() {
    const container = document.getElementById('bubblesContainer');
    const scoreDisplay = document.getElementById('bubbleScore');
    const recordDisplay = document.getElementById('bubbleRecord');
    
    if (!container) return;
    
    bubbleScore = 0;
    scoreDisplay.textContent = '0';
    
    const record = parseInt(localStorage.getItem('bubbleRecord') || '0');
    recordDisplay.textContent = record;
    
    container.innerHTML = '';
    
    if (bubblesInterval) clearInterval(bubblesInterval);
    
    // Spawn bubbles
    bubblesInterval = setInterval(() => {
        createBubble(container);
    }, 800);
    
    // Initial bubbles
    for (let i = 0; i < 5; i++) {
        createBubble(container);
    }
}

function createBubble(container) {
    const bubble = document.createElement('div');
    bubble.className = 'bubble';
    
    const size = Math.random() * 60 + 40;
    const colors = ['rgba(255, 182, 193, 0.7)', 'rgba(173, 216, 230, 0.7)', 
                    'rgba(255, 218, 185, 0.7)', 'rgba(221, 160, 221, 0.7)',
                    'rgba(152, 251, 152, 0.7)'];
    
    bubble.style.width = size + 'px';
    bubble.style.height = size + 'px';
    bubble.style.left = Math.random() * (container.offsetWidth - size) + 'px';
    bubble.style.top = Math.random() * (container.offsetHeight - size) + 'px';
    bubble.style.background = colors[Math.floor(Math.random() * colors.length)];
    
    bubble.addEventListener('click', function() {
        this.classList.add('bubble-pop');
        bubbleScore++;
        document.getElementById('bubbleScore').textContent = bubbleScore;
        
        // Update record
        const currentRecord = parseInt(localStorage.getItem('bubbleRecord') || '0');
        if (bubbleScore > currentRecord) {
            localStorage.setItem('bubbleRecord', bubbleScore);
            document.getElementById('bubbleRecord').textContent = bubbleScore;
        }
        
        setTimeout(() => this.remove(), 300);
        
        // Spawn new bubble
        createBubble(container);
    });
    
    container.appendChild(bubble);
    
    // Auto remove after 6 seconds
    setTimeout(() => {
        if (bubble.parentNode) bubble.remove();
    }, 6000);
}

// ==============================================
// COLOR MATCH GAME
// ==============================================

let colorGrid = [];
let selectedTiles = [];
let colorLevel = 1;
let colorMoves = 0;

function initColorsGame() {
    const grid = document.getElementById('colorGrid');
    const levelDisplay = document.getElementById('colorLevel');
    const movesDisplay = document.getElementById('colorMoves');
    
    if (!grid) return;
    
    colorMoves = 0;
    movesDisplay.textContent = '0';
    levelDisplay.textContent = colorLevel;
    
    const colors = ['#667eea', '#f093fb', '#4facfe', '#fa709a', '#fee140', '#a8edea'];
    const gridSize = 6;
    
    grid.innerHTML = '';
    colorGrid = [];
    selectedTiles = [];
    
    // Create grid
    for (let i = 0; i < gridSize * gridSize; i++) {
        const tile = document.createElement('div');
        tile.className = 'color-tile';
        tile.style.background = colors[Math.floor(Math.random() * colors.length)];
        tile.dataset.index = i;
        tile.addEventListener('click', selectColorTile);
        grid.appendChild(tile);
        colorGrid.push(tile);
    }
}

function selectColorTile() {
    if (this.classList.contains('selected')) {
        this.classList.remove('selected');
        selectedTiles = selectedTiles.filter(t => t !== this);
    } else {
        this.classList.add('selected');
        selectedTiles.push(this);
        
        if (selectedTiles.length === 2) {
            colorMoves++;
            document.getElementById('colorMoves').textContent = colorMoves;
            checkColorMatch();
        }
    }
}

function checkColorMatch() {
    const [tile1, tile2] = selectedTiles;
    
    if (tile1.style.background === tile2.style.background) {
        // Match - change both to random new color
        const colors = ['#667eea', '#f093fb', '#4facfe', '#fa709a', '#fee140', '#a8edea'];
        const newColor = colors[Math.floor(Math.random() * colors.length)];
        
        setTimeout(() => {
            tile1.style.background = newColor;
            tile2.style.background = newColor;
            tile1.classList.remove('selected');
            tile2.classList.remove('selected');
            selectedTiles = [];
            
            // Check if all same color (win)
            const allColors = colorGrid.map(t => t.style.background);
            if (allColors.every(c => c === allColors[0])) {
                colorLevel++;
                setTimeout(() => {
                    alert(`🎉 Level ${colorLevel - 1} dokončen! Tahy: ${colorMoves}`);
                    initColorsGame();
                }, 500);
            }
        }, 500);
    } else {
        setTimeout(() => {
            tile1.classList.remove('selected');
            tile2.classList.remove('selected');
            selectedTiles = [];
        }, 500);
    }
}

// ==============================================
// STAR COLLECTOR GAME
// ==============================================

let starsGameRunning = false;
let starsCollected = 0;
let starsLives = 3;
let stars = [];
let player = { x: 300, y: 350, width: 60, height: 20 };
let starsGameSpeed = 1.0;
let starsGameFrames = 0;

function initStarsGame() {
    const canvas = document.getElementById('starsCanvas');
    if (!canvas) return;
    
    // Clone canvas to remove old event listeners
    const newCanvas = canvas.cloneNode(true);
    newCanvas.id = 'starsCanvas'; // Keep the ID
    canvas.parentNode.replaceChild(newCanvas, canvas);
    const ctx = newCanvas.getContext('2d');
    
    starsCollected = 0;
    starsLives = 3;
    stars = [];
    starsGameSpeed = 1.0;
    starsGameFrames = 0;
    player = { x: 300, y: 350, width: 60, height: 20 };
    
    document.getElementById('starsCollected').textContent = '0';
    document.getElementById('starsLives').textContent = '❤️❤️❤️';
    document.getElementById('starsSpeed').textContent = '1.0x';
    
    starsGameRunning = true;
    
    // Mouse/touch movement
    newCanvas.addEventListener('mousemove', (e) => {
        const rect = newCanvas.getBoundingClientRect();
        player.x = e.clientX - rect.left - player.width / 2;
    });
    
    newCanvas.addEventListener('touchmove', (e) => {
        e.preventDefault();
        const rect = newCanvas.getBoundingClientRect();
        const touch = e.touches[0];
        player.x = touch.clientX - rect.left - player.width / 2;
    });
    
    loadLeaderboard('stars', 'starsLeaderboard');
    gameLoopStars(ctx, newCanvas);
}

function gameLoopStars(ctx, canvas) {
    if (!starsGameRunning) return;
    
    starsGameFrames++;
    
    // Progressive difficulty - increase speed every 5 stars collected
    starsGameSpeed = 1.0 + (Math.floor(starsCollected / 5) * 0.05);
    document.getElementById('starsSpeed').textContent = starsGameSpeed.toFixed(1) + 'x';
    
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Spawn stars - frequency increases with speed (much slower)
    const spawnChance = 0.008 + (starsGameSpeed - 1.0) * 0.005;
    if (Math.random() < spawnChance) {
        stars.push({
            x: Math.random() * (canvas.width - 30),
            y: -30,
            speed: (1.2 + Math.random() * 1.2) * starsGameSpeed
        });
    }
    
    // Update and draw stars
    for (let i = stars.length - 1; i >= 0; i--) {
        const star = stars[i];
        star.y += star.speed;
        
        // Draw star
        ctx.font = '30px Arial';
        ctx.fillText('⭐', star.x, star.y);
        
        // Check collision
        if (star.x < player.x + player.width &&
            star.x + 30 > player.x &&
            star.y < player.y + player.height &&
            star.y + 30 > player.y) {
            // Caught!
            starsCollected++;
            document.getElementById('starsCollected').textContent = starsCollected;
            stars.splice(i, 1);
        } else if (star.y > canvas.height) {
            // Missed
            starsLives--;
            const hearts = '❤️'.repeat(Math.max(0, starsLives));
            document.getElementById('starsLives').textContent = hearts;
            stars.splice(i, 1);
            
            if (starsLives <= 0) {
                starsGameRunning = false;
                saveGameScore('stars', starsCollected);
                setTimeout(() => {
                    alert(`💫 Hra skončila! Chytil jsi ${starsCollected} hvězdiček! Klikni znovu na ikonu hry pro opětovné hraní.`);
                    loadLeaderboard('stars', 'starsLeaderboard');
                }, 100);
                return;
            }
        }
    }
    
    // Draw player
    ctx.fillStyle = '#667eea';
    ctx.fillRect(player.x, player.y, player.width, player.height);
    ctx.fillRect(player.x + 10, player.y - 10, 40, 10);
    
    requestAnimationFrame(() => gameLoopStars(ctx, canvas));
}

// ==============================================
// AFFIRMATION RAIN GAME
// ==============================================

let affirmationGameRunning = false;
let affirmationsCaught = 0;
let affirmationBoost = 0;
let fallingAffirmations = [];
let affirmationGameSpeed = 1.0;
let affirmationGameFrames = 0;
let affirmationLives = 5;

function initAffirmationRain() {
    const canvas = document.getElementById('affirmationCanvas');
    if (!canvas) return;
    
    // Clone canvas to remove old event listeners
    const newCanvas = canvas.cloneNode(true);
    newCanvas.id = 'affirmationCanvas'; // Keep the ID
    canvas.parentNode.replaceChild(newCanvas, canvas);
    const ctx = newCanvas.getContext('2d');
    
    affirmationsCaught = 0;
    affirmationBoost = 0;
    fallingAffirmations = [];
    affirmationGameSpeed = 1.0;
    affirmationGameFrames = 0;
    affirmationLives = 5;
    
    document.getElementById('affirmationCount').textContent = '0';
    document.getElementById('affirmationLives').textContent = '💛💛💛💛💛';
    document.getElementById('affirmationBoost').textContent = '+0%';
    document.getElementById('affirmationSpeed').textContent = '1.0x';
    
    const basket = { x: 300, y: 350, width: 80, height: 20 };
    
    affirmationGameRunning = true;
    
    // Mouse/touch movement
    newCanvas.addEventListener('mousemove', (e) => {
        const rect = newCanvas.getBoundingClientRect();
        basket.x = e.clientX - rect.left - basket.width / 2;
    });
    
    newCanvas.addEventListener('touchmove', (e) => {
        e.preventDefault();
        const rect = newCanvas.getBoundingClientRect();
        const touch = e.touches[0];
        basket.x = touch.clientX - rect.left - basket.width / 2;
    });
    
    const shortAffirmations = [
        "Tralalero Tralala", "Tung Tung Tung Sahur", "A din din dun", 
        "Boberito Bandito", "Capuccina Ballerina", "Brr Brr Patapim",
        "Jiřík", "Radanka", "Glorbo"
    ];
    
    loadLeaderboard('affirmations', 'affirmationLeaderboard');
    gameLoopAffirmations(ctx, newCanvas, basket, shortAffirmations);
}

function gameLoopAffirmations(ctx, canvas, basket, affirmations) {
    if (!affirmationGameRunning) return;
    
    affirmationGameFrames++;
    
    // Progressive difficulty - increase speed every 10 affirmations
    affirmationGameSpeed = 1.0 + (Math.floor(affirmationsCaught / 10) * 0.04);
    document.getElementById('affirmationSpeed').textContent = affirmationGameSpeed.toFixed(1) + 'x';
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Spawn affirmations - frequency increases with speed (much slower)
    const spawnChance = 0.006 + (affirmationGameSpeed - 1.0) * 0.004;
    if (Math.random() < spawnChance) {
        fallingAffirmations.push({
            text: affirmations[Math.floor(Math.random() * affirmations.length)],
            x: Math.random() * (canvas.width - 100),
            y: -20,
            speed: (0.9 + Math.random() * 0.8) * affirmationGameSpeed
        });
    }
    
    // Update and draw affirmations
    ctx.fillStyle = 'white';
    ctx.font = '14px Arial';
    
    for (let i = fallingAffirmations.length - 1; i >= 0; i--) {
        const aff = fallingAffirmations[i];
        aff.y += aff.speed;
        
        ctx.fillText(aff.text, aff.x, aff.y);
        
        // Check collision
        if (aff.x < basket.x + basket.width &&
            aff.x + ctx.measureText(aff.text).width > basket.x &&
            aff.y > basket.y &&
            aff.y < basket.y + basket.height) {
            // Caught!
            affirmationsCaught++;
            affirmationBoost = Math.min(100, affirmationBoost + 5);
            document.getElementById('affirmationCount').textContent = affirmationsCaught;
            document.getElementById('affirmationBoost').textContent = `+${affirmationBoost}%`;
            fallingAffirmations.splice(i, 1);
        } else if (aff.y > canvas.height) {
            // Missed - lose a life
            affirmationLives--;
            const hearts = '💛'.repeat(Math.max(0, affirmationLives));
            document.getElementById('affirmationLives').textContent = hearts;
            fallingAffirmations.splice(i, 1);
            
            if (affirmationLives <= 0) {
                affirmationGameRunning = false;
                saveGameScore('affirmations', affirmationsCaught);
                setTimeout(() => {
                    alert(`✨ Hra skončila! Chytil jsi ${affirmationsCaught} brain rotu! Klikni znovu na ikonu hry pro opětovné hraní.`);
                    loadLeaderboard('affirmations', 'affirmationLeaderboard');
                }, 100);
                return;
            }
        }
    }
    
    // Draw basket
    ctx.fillStyle = '#f093fb';
    ctx.fillRect(basket.x, basket.y, basket.width, basket.height);
    ctx.fillRect(basket.x + 10, basket.y - 10, 60, 10);
    
    requestAnimationFrame(() => gameLoopAffirmations(ctx, canvas, basket, affirmations));
}

// ==============================================
// FIREBASE LEADERBOARD
// ==============================================

function saveGameScore(gameName, score) {
    if (!db) return;
    
    // Ask for player name if not set
    let playerName = localStorage.getItem('playerName');
    if (!playerName) {
        playerName = prompt('🌟 Zadej své jméno pro žebříček:', 'Radanka') || 'Radanka';
        localStorage.setItem('playerName', playerName);
    }
    
    db.collection('leaderboard').add({
        game: gameName,
        player: playerName,
        score: score,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        date: new Date().toLocaleDateString('cs-CZ')
    }).then(() => {
        console.log('✅ Skóre uloženo!');
    }).catch(err => {
        console.error('❌ Chyba při ukládání skóre:', err);
    });
}

function loadLeaderboard(gameName, elementId) {
    if (!db) {
        console.log('⚠️ Firebase není inicializováno');
        return;
    }
    
    const leaderboardEl = document.getElementById(elementId);
    if (!leaderboardEl) return;
    
    leaderboardEl.innerHTML = '<p style="opacity: 0.6;">Načítání...</p>';
    
    // Fetch all from game, then sort client-side (no index needed)
    db.collection('leaderboard')
        .where('game', '==', gameName)
        .get()
        .then(snapshot => {
            if (snapshot.empty) {
                leaderboardEl.innerHTML = '<p style="opacity: 0.6;">Zatím žádná skóre...</p>';
                return;
            }
            
            // Sort client-side
            const scores = [];
            snapshot.forEach(doc => {
                scores.push(doc.data());
            });
            scores.sort((a, b) => b.score - a.score);
            const topScores = scores.slice(0, 5);
            
            let html = '<ol class="leaderboard-items">';
            topScores.forEach((data, index) => {
                const medal = ['🥇', '🥈', '🥉'][index] || '🏅';
                html += `
                    <li>
                        <span class="medal">${medal}</span>
                        <span class="player-name">${data.player}</span>
                        <span class="score">${data.score} bodů</span>
                    </li>
                `;
            });
            html += '</ol>';
            leaderboardEl.innerHTML = html;
        })
        .catch(err => {
            console.error('❌ Chyba při načítání leaderboardu:', err);
            console.error('Detail chyby:', err.message);
            leaderboardEl.innerHTML = `<p style="color: #f56565;">Chyba načítání<br><small>${err.message}</small></p>`;
        });
}

console.log('🌸 Radanky bezpečné místo initialized! 🌸');