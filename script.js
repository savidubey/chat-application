// XML data structure for users
const usersXML = `
<users>
    <user>
        <id>1</id>
        <n>Savi</n>
        <status>Online</status>
        <avatar>SV</avatar>
        <color>#3498db</color>
        <image>savi.jpg</image>
    </user>
    <user>
        <id>2</id>
        <n>Shilpa</n>
        <status>Online</status>
        <avatar>SH</avatar>
        <color>#2ecc71</color>
        <image>shilpa.jpg</image>
    </user>
</users>
`;

// JSON data for messages (initially empty)
let messagesJSON = JSON.parse(localStorage.getItem('chatMessages')) || [];
let typingTimeout = null;
let searchQuery = '';
let isMuted = JSON.parse(localStorage.getItem('isMuted')) || false;

// Parse XML data
function parseXML(xmlString) {
    const parser = new DOMParser();
    return parser.parseFromString(xmlString, "text/xml");
}

const xmlDoc = parseXML(usersXML);
const userElements = xmlDoc.getElementsByTagName('user');
const users = [];

for (let i = 0; i < userElements.length; i++) {
    const userElement = userElements[i];
    users.push({
        id: parseInt(userElement.getElementsByTagName('id')[0].textContent),
        name: userElement.getElementsByTagName('n')[0].textContent,
        status: userElement.getElementsByTagName('status')[0].textContent,
        avatar: userElement.getElementsByTagName('avatar')[0].textContent,
        color: userElement.getElementsByTagName('color')[0].textContent,
        image: userElement.getElementsByTagName('image')[0].textContent
    });
}

// Default current user
let currentUser = users[0];

// Switch active user
document.getElementById('user1Btn').addEventListener('click', () => setCurrentUser(users[0]));
document.getElementById('user2Btn').addEventListener('click', () => setCurrentUser(users[1]));

function setCurrentUser(user) {
    currentUser = user;

    document.querySelectorAll('.user-btn').forEach(btn => btn.classList.remove('active'));

    if (user.id === 1) {
        document.getElementById('user1Btn').classList.add('active');
        document.getElementById('currentUserAvatar').className = 'chat-header-avatar user1';
    } else {
        document.getElementById('user2Btn').classList.add('active');
        document.getElementById('currentUserAvatar').className = 'chat-header-avatar user2';
    }

    // Handle avatar display (image or text)
    const avatarText = document.getElementById('avatarText');
    const avatarImage = document.getElementById('avatarImage');
    
    if (user.image && user.image.trim() !== '') {
        avatarText.classList.add('hide');
        avatarImage.src = user.image;
        avatarImage.alt = user.name;
        avatarImage.classList.add('show');
    } else {
        avatarText.textContent = user.avatar;
        avatarText.classList.remove('hide');
        avatarImage.classList.remove('show');
    }

    document.getElementById('currentUserName').textContent = user.name;
    document.getElementById('currentUserStatus').textContent = 'Active - You are chatting as this user';

    loadMessages();
}

setCurrentUser(users[0]);

// Mute/Unmute functionality
const muteButton = document.getElementById('muteButton');

function updateMuteButton() {
    if (isMuted) {
        muteButton.textContent = '🔕';
        muteButton.classList.add('muted');
        muteButton.title = 'Unmute Sounds';
    } else {
        muteButton.textContent = '🔔';
        muteButton.classList.remove('muted');
        muteButton.title = 'Mute Sounds';
    }
}

muteButton.addEventListener('click', () => {
    isMuted = !isMuted;
    localStorage.setItem('isMuted', JSON.stringify(isMuted));
    updateMuteButton();
});

updateMuteButton();

// Emoji Picker
const emojiButton = document.getElementById('emojiButton');
const emojiPicker = document.getElementById('emojiPicker');
const messageInput = document.getElementById('messageInput');

emojiButton.addEventListener('click', () => {
    emojiPicker.classList.toggle('show');
});

// Close emoji picker when clicking outside
document.addEventListener('click', (e) => {
    if (!emojiButton.contains(e.target) && !emojiPicker.contains(e.target)) {
        emojiPicker.classList.remove('show');
    }
});

// Add emoji to input
document.querySelectorAll('.emoji').forEach(emoji => {
    emoji.addEventListener('click', () => {
        messageInput.value += emoji.textContent;
        messageInput.focus();
    });
});

// File attachment
const attachButton = document.getElementById('attachButton');
const fileInput = document.getElementById('fileInput');

attachButton.addEventListener('click', () => {
    fileInput.click();
});

fileInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (event) => {
            sendImageMessage(event.target.result, file.name);
        };
        reader.readAsDataURL(file);
    }
    fileInput.value = '';
});

function sendImageMessage(imageData, fileName) {
    const newMessage = {
        id: messagesJSON.length + 1,
        senderId: currentUser.id,
        senderName: currentUser.name,
        text: '',
        image: imageData,
        imageName: fileName,
        timestamp: new Date().toISOString(),
        status: 'sent',
        reactions: []
    };

    messagesJSON.push(newMessage);
    saveMessages();
    loadMessages();
    playNotificationSound();
}

// Clear Chat
document.getElementById('clearChatBtn').addEventListener('click', () => {
    if (confirm('Are you sure you want to clear all messages?')) {
        messagesJSON = [];
        saveMessages();
        loadMessages();
    }
});

// Search Messages
document.getElementById('searchMessages').addEventListener('input', (e) => {
    searchQuery = e.target.value.toLowerCase();
    loadMessages();
});

// Typing indicator
messageInput.addEventListener('input', () => {
    const otherUser = users.find(u => u.id !== currentUser.id);
    showTypingIndicator(otherUser.name);
    
    clearTimeout(typingTimeout);
    typingTimeout = setTimeout(() => {
        hideTypingIndicator();
    }, 1000);
});

function showTypingIndicator(userName) {
    // Only show if viewing from the other user's perspective
    const typingIndicator = document.getElementById('typingIndicator');
    if (typingIndicator) {
        typingIndicator.classList.add('show');
    }
}

function hideTypingIndicator() {
    const typingIndicator = document.getElementById('typingIndicator');
    if (typingIndicator) {
        typingIndicator.classList.remove('show');
    }
}

// Notification sound
function playNotificationSound() {
    if (isMuted) return; // Don't play sound if muted
    
    // Create a simple beep sound
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.frequency.value = 800;
    oscillator.type = 'sine';
    
    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.1);
}

function loadMessages() {
    const chatMessages = document.getElementById('chatMessages');
    chatMessages.innerHTML = '';

    // Filter messages based on search query
    let filteredMessages = messagesJSON;
    if (searchQuery) {
        filteredMessages = messagesJSON.filter(msg => 
            msg.text.toLowerCase().includes(searchQuery) ||
            msg.senderName.toLowerCase().includes(searchQuery)
        );
    }

    if (filteredMessages.length === 0) {
        chatMessages.innerHTML = `
            <div class="empty-chat">
                <h3>${searchQuery ? 'No messages found' : 'No messages yet'}</h3>
                <p>${searchQuery ? 'Try a different search term' : 'Start the conversation by sending a message!'}</p>
            </div>
        `;
        return;
    }

    filteredMessages.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));

    filteredMessages.forEach((msg, index) => {
        const messageDiv = document.createElement('div');
        const isSent = msg.senderId === currentUser.id;
        messageDiv.className = `message ${isSent ? 'sent' : 'received'}`;
        messageDiv.dataset.messageId = msg.id;

        const time = new Date(msg.timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
        
        let messageContent = '';
        if (msg.image) {
            messageContent = `
                <img src="${msg.image}" alt="${msg.imageName}" class="message-image" onclick="window.open('${msg.image}', '_blank')">
            `;
        }
        if (msg.text) {
            messageContent += `<div class="message-bubble">${msg.text}</div>`;
        }

        // Message status (for sent messages)
        let statusIcon = '';
        if (isSent) {
            statusIcon = msg.status === 'read' ? '✓✓' : '✓';
        }

        // Reactions
        let reactionsHTML = '';
        if (msg.reactions && msg.reactions.length > 0) {
            const reactionCounts = {};
            msg.reactions.forEach(r => {
                reactionCounts[r] = (reactionCounts[r] || 0) + 1;
            });
            reactionsHTML = '<div class="message-reactions">';
            for (let emoji in reactionCounts) {
                reactionsHTML += `<span class="reaction" onclick="addReaction(${msg.id}, '${emoji}')">${emoji} ${reactionCounts[emoji]}</span>`;
            }
            reactionsHTML += '</div>';
        }

        messageDiv.innerHTML = `
            <div class="message-menu">
                <button class="message-menu-btn" onclick="toggleMessageMenu(${msg.id})">⋯</button>
                <div class="message-menu-dropdown" id="menu-${msg.id}">
                    <div class="message-menu-item" onclick="addReaction(${msg.id}, '❤️')">❤️ React</div>
                    <div class="message-menu-item" onclick="addReaction(${msg.id}, '👍')">👍 Like</div>
                    ${isSent ? `<div class="message-menu-item" onclick="deleteMessage(${msg.id})">🗑️ Delete</div>` : ''}
                </div>
            </div>
            ${messageContent}
            <div class="message-time">${time} • ${msg.senderName} <span class="message-status">${statusIcon}</span></div>
            ${reactionsHTML}
        `;

        chatMessages.appendChild(messageDiv);
    });

    chatMessages.scrollTop = chatMessages.scrollHeight;
    
    // Mark messages as read
    markMessagesAsRead();
}

function markMessagesAsRead() {
    messagesJSON.forEach(msg => {
        if (msg.senderId !== currentUser.id && msg.status !== 'read') {
            msg.status = 'read';
        }
    });
}

function toggleMessageMenu(messageId) {
    const menu = document.getElementById(`menu-${messageId}`);
    // Close all other menus
    document.querySelectorAll('.message-menu-dropdown').forEach(m => {
        if (m !== menu) m.classList.remove('show');
    });
    menu.classList.toggle('show');
}

function addReaction(messageId, emoji) {
    const message = messagesJSON.find(m => m.id === messageId);
    if (message) {
        if (!message.reactions) message.reactions = [];
        message.reactions.push(emoji);
        saveMessages();
        loadMessages();
    }
    // Close menu
    document.getElementById(`menu-${messageId}`).classList.remove('show');
}

function deleteMessage(messageId) {
    if (confirm('Delete this message?')) {
        messagesJSON = messagesJSON.filter(m => m.id !== messageId);
        saveMessages();
        loadMessages();
    }
    document.getElementById(`menu-${messageId}`).classList.remove('show');
}

// Close menus when clicking outside
document.addEventListener('click', (e) => {
    if (!e.target.closest('.message-menu')) {
        document.querySelectorAll('.message-menu-dropdown').forEach(m => {
            m.classList.remove('show');
        });
    }
});

document.getElementById('sendButton').addEventListener('click', sendMessage);
document.getElementById('messageInput').addEventListener('keypress', e => {
    if (e.key === 'Enter') sendMessage();
});

function sendMessage() {
    const messageInput = document.getElementById('messageInput');
    const messageText = messageInput.value.trim();

    if (messageText === '') return;

    const newMessage = {
        id: messagesJSON.length + 1,
        senderId: currentUser.id,
        senderName: currentUser.name,
        text: messageText,
        timestamp: new Date().toISOString(),
        status: 'sent',
        reactions: []
    };

    messagesJSON.push(newMessage);
    messageInput.value = '';
    saveMessages();
    loadMessages();
    playNotificationSound();
    hideTypingIndicator();
}

// Save messages to localStorage
function saveMessages() {
    localStorage.setItem('chatMessages', JSON.stringify(messagesJSON));
}

loadMessages();