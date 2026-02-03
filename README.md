# VRGC.exe - VR & Gaming Club Website

<div align="center">
  
  ![VRGC Logo](https://img.shields.io/badge/VRGC-ONLINE-green?style=for-the-badge&logo=gamepad&logoColor=white)
  ![React](https://img.shields.io/badge/React-18.2-61dafb?style=for-the-badge&logo=react)
  ![Vite](https://img.shields.io/badge/Vite-5.0-646cff?style=for-the-badge&logo=vite)
  ![TailwindCSS](https://img.shields.io/badge/Tailwind-3.4-38bdf8?style=for-the-badge&logo=tailwindcss)

  **Official website for VR & Gaming Club - VIT Bhopal University**
  
  *Built with cutting-edge tech. Designed for the future.*

</div>

---

## 🎮 About

VRGC.exe is the official web portal for the VR & Gaming Club at VIT Bhopal. This cyberpunk-themed, highly interactive website showcases:

- 🏆 **Esports Tournaments** - Register for competitive gaming events
- 🎓 **Workshops & Bootcamps** - Learn game dev, Unity, VR/AR
- 🤝 **Community Hub** - Connect with 1200+ gamers
- 🎫 **Event Management** - Seamless ticket booking system
- 📸 **Gallery** - Highlights from past events
- 👥 **Membership Portal** - Join the guild

---

## ✨ Features

### 🎨 **Cyberpunk UI/UX**
- Animated matrix background with interactive particles
- Glitch text effects on hover
- Neon borders and glow effects
- Scanline overlay for retro-futuristic vibe
- Custom scrollbar styling

### 🚀 **Advanced Functionality**
- **Boot Loader Animation** - Immersive system startup sequence
- **Responsive Design** - Mobile-first approach, works on all devices
- **Smooth Transitions** - Page transitions and scroll effects
- **Interactive Modals** - Hacking-style ticket registration
- **Real-time Stats** - Dynamic club statistics display

### 🎯 **Performance Optimized**
- Built with Vite for lightning-fast builds
- Canvas-based animations with optimized rendering
- Lazy loading and code splitting ready
- Responsive particle count based on viewport

---

## 🛠️ Tech Stack

| Technology | Purpose |
|------------|---------|
| **React 18** | UI framework |
| **Vite** | Build tool & dev server |
| **TailwindCSS** | Utility-first styling |
| **Lucide React** | Modern icon library |
| **Framer Motion** | Animation library (ready) |

---

## 📦 Installation

### Prerequisites
- Node.js 16+ 
- npm or yarn

### Setup Steps

```bash
# 1. Navigate to project directory
cd Vrgc-web

# 2. Install dependencies
npm install

# 3. Start development server
npm run dev

# 4. Build for production
npm run build

# 5. Preview production build
npm run preview
```

The dev server will start at `http://localhost:3000`

---

## 📁 Project Structure

```
Vrgc-web/
├── src/
│   ├── App.jsx           # Main application component
│   ├── main.jsx          # React entry point
│   └── index.css         # Global styles & Tailwind
├── public/               # Static assets
├── index.html            # HTML template
├── vite.config.js        # Vite configuration
├── tailwind.config.js    # Tailwind configuration
├── postcss.config.js     # PostCSS configuration
└── package.json          # Dependencies & scripts
```

---

## 🎨 Component Breakdown

### Core Components

1. **MatrixBackground** - Animated particle system with grid
2. **GlitchText** - Cyberpunk text with glitch effect
3. **BootLoader** - System initialization animation
4. **Navbar** - Responsive navigation with mobile menu
5. **Hero** - Landing section with CTA buttons
6. **EventsPage** - Event cards with booking functionality
7. **GalleryPage** - Image showcase grid
8. **AboutPage** - Club info, team, and membership perks
9. **TicketModal** - Multi-step registration modal
10. **Footer** - Links, contact info, social media

---

## 🎯 Usage

### Running the Development Server

```bash
npm run dev
```

Access at `http://localhost:3000`. Hot Module Replacement (HMR) is enabled for instant updates.

### Building for Production

```bash
npm run build
```

Creates optimized production bundle in `dist/` folder.

### Previewing Production Build

```bash
npm run preview
```

Serves the production build locally for testing.

---

## 🎨 Customization

### Colors

Edit the color scheme in [tailwind.config.js](tailwind.config.js):

```js
colors: {
  'neon-purple': '#a855f7',
  'neon-blue': '#3b82f6',
  'neon-green': '#22c55e',
  'cyber-dark': '#0f172a',
}
```

### Fonts

Update fonts in [index.html](index.html):

```html
<link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@700;900&display=swap" rel="stylesheet">
```

### Events Data

Modify the events array in [App.jsx](src/App.jsx) `EventsPage` component to add/edit events.

---

## 🚀 Deployment

### Vercel (Recommended)

```bash
npm install -g vercel
vercel
```

### Netlify

```bash
npm run build
# Drag & drop the 'dist' folder to Netlify
```

### GitHub Pages

```bash
# Install gh-pages
npm install --save-dev gh-pages

# Add to package.json scripts:
"deploy": "vite build && gh-pages -d dist"

# Deploy
npm run deploy
```

---

## 🤝 Contributing

We welcome contributions! Here's how you can help:

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/AmazingFeature`)
3. **Commit** your changes (`git commit -m 'Add some AmazingFeature'`)
4. **Push** to the branch (`git push origin feature/AmazingFeature`)
5. **Open** a Pull Request

---

## 📝 Future Enhancements

- [ ] Backend integration (Node.js/Express)
- [ ] Database for event management (MongoDB/PostgreSQL)
- [ ] User authentication system
- [ ] Payment gateway integration
- [ ] Admin dashboard
- [ ] Email notification system
- [ ] Live chat support
- [ ] Blog section
- [ ] Leaderboard system
- [ ] Discord bot integration

---

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

## 👥 Team

**VR & Gaming Club - VIT Bhopal**

- Website: [vrgc.vitbhopal.ac.in](#)
- Email: vrgc@vitbhopal.ac.in
- Instagram: [@vrgc.vitbhopal](#)
- Discord: [Join our server](#)

---

## 🙏 Acknowledgments

- VIT Bhopal University
- All club members and contributors
- Open source community
- Lucide for amazing icons
- Tailwind CSS team

---

<div align="center">
  
  **Made with ❤️ by VRGC Tech Team**
  
  ⭐ Star this repo if you like it!
  
  ![Visitors](https://visitor-badge.laobi.icu/badge?page_id=vrgc.website)
  
</div>
