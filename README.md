# AntaraShanti | Mindful Campus Edition

AntaraShanti is a premium, avant-garde web application designed specifically as a "private emotional intelligence infrastructure for modern campuses." It aims to bridge the gap between student mental health struggles and institutional support by offering real-time, AI-driven check-ins, cognitive reframing modules, and proactive, anonymized analytics for administrators. 

The application features a dark, sophisticated aesthetic ("electric lavender on midnight blue") to convey enterprise-grade security, clinical authority, and a modern, high-tech approach to mental well-being—moving beyond traditional "stigma-heavy" mental health portals.

## 🌟 Key Features

*   **Interactive Emotional Engine**: AI-powered check-ins and contextual coping generation that act as a frictionless first point of contact for students.
*   **Split Experience Demo Form**: A unique `/demo` flow allowing users to preview both the Student Check-In experience and the Administrative Dashboard.
*   **Stateful interactions**: Advanced form feedback (validating credentials, processing requests) for a professional, secure feel.
*   **Campus Node Tracking**: Dynamic, thematic UI elements showcasing the platform's active footprint and operational status.
*   **Resource Library**: A dedicated space for clinical methodologies and downloadable whitepapers.
*   **Cinematic UI/UX**: Built with custom Tailwind configurations, GSAP scroll animations, backdrop blurs, and magnetic button effects to create a highly engaging, immersive experience.

## 🛠️ Tech Stack

*   **Frontend Framework**: React (Vite)
*   **Styling**: Tailwind CSS (Custom thematic config)
*   **Animations**: GSAP (GreenSock Animation Platform) + ScrollTrigger
*   **Routing**: React Router DOM (v6+)
*   **Icons**: Lucide React

## 📂 Project Structure

```text
AntaraShanti/
├── public/                 # Static assets (images, fonts, dummy PDFs)
│   ├── logo.png            # Main platform logo (Dark Mode Optimized)
│   ├── hero-bg.png         # Cinematic campus background image
│   ├── campus-readiness-brief.pdf # Demo request download
│   └── executive-summary-roi.pdf  # Resources download
├── src/                    # Source code
│   ├── components/         # Reusable UI elements
│   │   ├── Navbar.jsx      # Global sticky navigation with scroll blur
│   │   ├── Footer.jsx      # Global footer with dynamic status node
│   │   └── ScrollToTop.jsx # Route transition utility
│   ├── pages/              # Main route views
│   │   ├── Home.jsx        # Landing page & core value proposition
│   │   ├── Features.jsx    # Deep dive into platform capabilities
│   │   ├── CampusImpact.jsx# Statistics and institutional outcomes
│   │   ├── Security.jsx    # FERPA compliance and privacy architecture
│   │   ├── Community.jsx   # Student stories and engagement
│   │   ├── About.jsx       # Mission and clinical principles
│   │   ├── Resources.jsx   # Methodologies and whitepaper downloads
│   │   └── Demo.jsx        # Interactive platform simulation & stateful form
│   ├── App.jsx             # Main application layout and router setup
│   ├── index.css           # Global stylesheet and custom Tailwind utilities (animations)
│   └── main.jsx            # React entry point
├── index.html              # HTML template
├── tailwind.config.js      # Thematic color palette and typography configuration
├── vite.config.js          # Vite build configuration
└── package.json            # Dependencies and scripts (npm run dev)
```

## 🚀 Getting Started Locally

1. **Clone the repository:**
   ```bash
   git clone https://github.com/swaroop-5-6-7/antarashanti.git
   ```
2. **Navigate into the directory:**
   ```bash
   cd antarashanti
   ```
3. **Install dependencies:**
   ```bash
   npm install
   ```
4. **Start the development server:**
   ```bash
   npm run dev
   ```

## 🛡️ Privacy & Compliance Note

*(Mock Data)* This application is a frontend demonstration. In a production environment, all data highlighted in the `CampusImpact` and `Security` sections would adhere strictly to FERPA/HIPAA compliance standards, utilizing end-to-end encryption and differential privacy algorithms to protect student identities.
