# Two-User Chat Application

A modern, feature-rich chat application that allows two users (Savi and Shilpa) to communicate with each other. Built with vanilla JavaScript, HTML5, and CSS3, featuring message persistence, emoji support, image sharing, and more.

## 🎯 Project Goal

Create an interactive chat application demonstrating modern web development practices including DOM manipulation, event handling, browser storage APIs, and responsive design - all without external frameworks or libraries.

## ✨ Features

- 👥 **Dual User System** - Switch between Savi and Shilpa to simulate conversations
- 💬 **Real-time Messaging** - Send and receive text messages instantly
- 😊 **Emoji Picker** - 20+ emojis to express emotions
- 📎 **Image Sharing** - Upload and share images in chat
- ❤️ **Message Reactions** - React to messages with emojis
- 🔍 **Message Search** - Search through conversation history
- ⌨️ **Typing Indicators** - See when the other user is typing
- 🟢 **Online Status** - Visual indicators for user availability
- 🔔 **Sound Notifications** - Audio alerts for new messages (with mute option)
- 💾 **Persistent Storage** - Chat history saved using localStorage
- ✓✓ **Read Receipts** - Message status indicators (sent/read)
- 🗑️ **Message Management** - Delete individual messages or clear entire chat
- 🖼️ **Image Preview** - Click images to view full-size
- 📱 **Responsive Design** - Works on desktop and tablet devices

## 📋 Prerequisites

- A modern web browser (Chrome 90+, Firefox 88+, Safari 14+, or Edge 90+)
- No server or additional software required
- Basic understanding of HTML, CSS, and JavaScript (for developers)

## 🚀 Installation & Setup

### Step 1: Get the Files
```bash
# Clone or download the project
git clone <repository-url>
cd "Chat Application"
```

### Step 2: Add Profile Pictures
Place the following image files in the project root directory:
- `savi.jpg` - Profile picture for Savi
- `shilpa.jpg` - Profile picture for Shilpa

**Note:** These images should be in JPG format and reasonably sized (recommended: 500x500px or less)

### Step 3: Open the Application
Simply double-click on `index.html` or:
```bash
# Open with default browser
start index.html       # Windows
open index.html        # macOS
xdg-open index.html    # Linux
```

**Alternative:** Right-click `index.html` → Open with → Choose your browser

## 📖 Usage Guide

### Basic Messaging
1. **Select a User**: Click on either "Savi" or "Shilpa" button in the left sidebar
2. **Type a Message**: Enter text in the input field at the bottom
3. **Send**: Press `Enter` or click the send button (➤)
4. **Switch Users**: Click the other user button to reply

### Sending Emojis
1. Click the 😊 emoji button next to the message input
2. Select any emoji from the popup picker
3. The emoji will be inserted at your cursor position
4. Continue typing or send immediately

### Sharing Images
1. Click the 📎 attachment button
2. Select an image file from your computer (JPG, PNG, GIF)
3. Image will be sent immediately
4. Click any image in chat to view full-size

### Reacting to Messages
1. Hover over any message to see the ⋯ menu button
2. Click the menu button
3. Select a reaction emoji (❤️ 😂 👍 😮 😢 😡)
4. Your reaction appears below the message

### Searching Messages
1. Use the search bar at the top of the sidebar (🔍 icon)
2. Type keywords to filter messages
3. Messages matching your search will be highlighted
4. Clear search to see all messages again

### Deleting Messages
1. Hover over **your own message** (you can only delete your messages)
2. Click the ⋯ menu button
3. Select "Delete Message"
4. Confirm deletion

### Managing Sounds
- Click the 🔔 bell icon in the chat header to mute
- Icon changes to 🔕 when muted
- Click again to unmute
- Your preference is saved automatically

### Clearing Chat
1. Click the 🗑️ trash icon in the chat header
2. Confirm that you want to clear all messages
3. All chat history will be permanently deleted
4. This action cannot be undone

## 📁 File Structure

```
Chat Application/
│
├── index.html          # Main HTML structure and layout
├── style.css           # All CSS styling, animations, and responsive design
├── script.js           # JavaScript application logic and functionality
├── savi.jpg           # Profile picture for user Savi
├── shilpa.jpg         # Profile picture for user Shilpa
├── .gitignore         # Files and folders to exclude from Git
└── README.md          # This documentation file
```

### File Descriptions

**index.html**
- Contains the HTML structure
- Defines the sidebar with user selection
- Creates the chat area with message display
- Sets up input controls for messaging

**style.css**
- All visual styling and layout
- CSS animations for typing indicators
- Responsive design media queries
- Color schemes and themes

**script.js**
- Core application logic
- Event handlers for user interactions
- localStorage integration for persistence
- DOM manipulation functions
- Message rendering and management

## 🛠️ Technologies Used

| Technology | Purpose |
|------------|---------|
| **HTML5** | Structure and semantic markup |
| **CSS3** | Styling, animations, flexbox layout |
| **JavaScript (ES6+)** | Application logic and interactivity |
| **localStorage API** | Persistent data storage in browser |
| **FileReader API** | Reading and handling image uploads |
| **Web Audio API** | Generating notification sounds |
| **DOM API** | Dynamic content manipulation |

## 🎨 Key Features in Detail

### Message Status System
- ✓ Single checkmark - Message sent
- ✓✓ Double checkmark - Message read by recipient
- Automatic status updates when switching users

### Typing Indicator
- Animated three-dot animation
- Shows when the current user is typing
- Simulates real-time chat experience
- Auto-hides after 1 second of inactivity

### Data Persistence
- All messages stored in browser's localStorage
- Chat history preserved across sessions
- Survives browser restarts and page refreshes
- Images stored as base64 data URLs
- Mute preference saved automatically

### Online Status
- Green dot indicator (🟢) shows user is "online"
- Always visible on active user's avatar
- Enhances real-time chat simulation

## 💻 Browser Compatibility

| Browser | Minimum Version | Status |
|---------|----------------|--------|
| Google Chrome | 90+ | ✅ Fully Supported |
| Mozilla Firefox | 88+ | ✅ Fully Supported |
| Safari | 14+ | ✅ Fully Supported |
| Microsoft Edge | 90+ | ✅ Fully Supported |
| Opera | 76+ | ✅ Fully Supported |

**Note:** Internet Explorer is not supported as it lacks modern JavaScript features.

## ⚠️ Known Limitations

- **Local Only**: No server-side functionality; works only on one computer
- **Two Users Only**: Limited to Savi and Shilpa (no additional users)
- **No Real-Time**: Simulated chat experience (not actual real-time communication)
- **Image Storage**: Images stored as base64 can increase localStorage size
- **Single Device**: Cannot sync across multiple devices or browsers
- **localStorage Limits**: Browser typically limits localStorage to 5-10MB

## 🔒 Privacy & Data

- **Local Storage Only**: All data stays on your computer
- **No Server Communication**: Nothing is sent over the internet
- **Browser Specific**: Data isolated per browser and domain
- **User Control**: You can clear data anytime via browser settings
- **No Tracking**: No analytics or tracking scripts included

## 🐛 Troubleshooting

### Images Not Showing
**Problem**: Profile pictures show as initials instead of photos
**Solution**: Ensure `savi.jpg` and `shilpa.jpg` are in the same folder as `index.html`

### Messages Not Persisting
**Problem**: Chat history disappears after refresh
**Solution**: Check browser's localStorage is enabled and not in private/incognito mode

### Sound Not Playing
**Problem**: No notification sound when sending messages
**Solution**: 
1. Check if mute button shows 🔔 (unmuted)
2. Ensure browser has permission to play sounds
3. Some browsers require user interaction before playing audio

### Emoji Picker Not Appearing
**Problem**: Clicking emoji button does nothing
**Solution**: Check JavaScript console for errors (Press F12 → Console tab)

### Search Not Working
**Problem**: Search doesn't filter messages
**Solution**: Ensure messages exist in chat; search is case-insensitive

## 🚀 Future Enhancements

Potential features for future versions:

- [ ] Support for more than two users
- [ ] Voice message recording
- [ ] Video call integration
- [ ] Backend server with WebSocket for real-time communication
- [ ] User authentication and authorization
- [ ] End-to-end message encryption
- [ ] Export chat history (PDF, JSON, or text)
- [ ] Dark mode toggle
- [ ] Custom themes and color schemes
- [ ] File sharing (not just images)
- [ ] Message editing capability
- [ ] Group chat functionality
- [ ] Notification system
- [ ] Offline message queuing

## 📚 Learning Objectives

This project demonstrates:

✅ **DOM Manipulation** - Dynamic content creation and updates
✅ **Event Handling** - Managing user interactions
✅ **State Management** - Maintaining application state without frameworks
✅ **Browser APIs** - localStorage, FileReader, Web Audio
✅ **CSS Animations** - Creating smooth, engaging UI transitions
✅ **Responsive Design** - Adapting to different screen sizes
✅ **Code Organization** - Modular, maintainable JavaScript
✅ **Data Persistence** - Saving and loading user data
✅ **File Handling** - Processing and displaying uploaded images

## 👨‍💻 Development Notes

### Code Quality
- Written in vanilla JavaScript (no frameworks)
- Follows ES6+ standards
- Comprehensive inline comments
- Modular function design
- Consistent naming conventions

### Performance Considerations
- DOM queries cached for efficiency
- Event delegation where applicable
- Minimal reflows and repaints
- Efficient localStorage usage

## 📄 License

This project is created for educational purposes. Feel free to use, modify, and learn from the code.

## 👤 Author

**Savi Dubey , Shilpa Rathod**

## 🙏 Acknowledgments

- Emoji graphics from Unicode standard
- Design inspiration from modern messaging apps (WhatsApp, Telegram, Signal)
- Web APIs documentation from MDN Web Docs

## 📞 Support

For issues, questions, or suggestions:
1. Check the Troubleshooting section above
2. Review the code comments in `script.js`
3. Open browser console (F12) to check for errors

---

**Version:** 1.0.0  
**Last Updated:** November 6, 2025  
**Status:** Production Ready ✅
