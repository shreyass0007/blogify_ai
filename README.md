# 📝 Blogify AI Studio

<div align="center">

**A powerful, AI-powered blog writing, editing, and publishing platform**

Built with modern web technologies and powered by OpenAI GPT-4o

[Features](#-features) • [Tech Stack](#-tech-stack) • [Getting Started](#-getting-started) • [Usage](#-usage) • [Contributing](#-contributing)

</div>

---

## ✨ Features

### 🤖 AI Writing Assistant
Access a comprehensive suite of smart tools directly in the editor:

- **🎯 Topic Ideas** - Generate trending blog post ideas based on your niche
- **📰 Title Generator** - Create catchy, SEO-friendly headlines
- **✍️ Content Expansion** - Turn brief notes into full, detailed paragraphs
- **🔍 Grammar Fixer** - Polish your writing with professional grammar and style corrections
- **🔑 SEO Keywords** - Discover high-impact keywords to improve search ranking
- **📊 Summarization** - Automatically generate meta descriptions and summaries

### 📝 Rich Markdown Editor
- Full markdown support with real-time preview
- Seamless AI integration for enhanced productivity
- Syntax highlighting for code blocks
- Image and media support
- Auto-save functionality

### 🎨 Modern, Beautiful UI
- Built with **React** and **TypeScript**
- Styled with **Tailwind CSS** for a responsive, mobile-first design
- Premium components from **shadcn/ui**
- Smooth animations powered by **Framer Motion**
- Dark mode support with **next-themes**
- Professional editorial design system

### 🔐 User Authentication
- Secure user authentication with **Passport.js**
- Google OAuth integration
- Session management with **express-session**
- Protected routes and API endpoints

### 📊 Content Management
- Create, edit, and manage blog posts
- Draft and publish workflows
- Post versioning and history
- Media library for images and assets

---

## 🛠️ Tech Stack

### Frontend
- **Framework**: React 18.3 with TypeScript
- **Build Tool**: Vite (Fast, modern bundler)
- **Styling**: Tailwind CSS with custom design system
- **UI Components**: shadcn/ui (Radix UI primitives)
- **State Management**: TanStack Query (React Query)
- **Routing**: React Router v6
- **Animations**: Framer Motion
- **Markdown Editor**: @uiw/react-md-editor
- **Forms**: React Hook Form + Zod validation

### Backend
- **Runtime**: Node.js
- **Framework**: Express 5
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: Passport.js (Local + Google OAuth)
- **Security**: bcryptjs, express-session, JWT
- **AI Integration**: OpenAI API (GPT-4o)
- **File Upload**: Multer

### Development Tools
- **Testing**: Vitest + Testing Library
- **Linting**: ESLint 9 with TypeScript support
- **Type Checking**: TypeScript 5.8
- **API Development**: Axios
- **Code Quality**: Prettier, TypeScript ESLint

---

## 🚀 Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v16 or higher) - [Download](https://nodejs.org/)
- **MongoDB** - Either:
  - Local installation - [Download](https://www.mongodb.com/try/download/community)
  - MongoDB Atlas (Cloud) - [Sign up](https://www.mongodb.com/cloud/atlas)
- **OpenAI API Key** - [Get your key](https://platform.openai.com/api-keys)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/shreyass0007/blogify_ai.git
   cd ai-blog-studio
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment configuration**
   
   Create a `.env` file in the root directory:
   ```env
   # Server Configuration
   PORT=5000
   
   # Database
   MONGODB_URI=mongodb://localhost:27017/blogify
   # Or use MongoDB Atlas:
   # MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/blogify
   
   # Authentication
   SESSION_SECRET=your_super_secret_session_key_change_this_in_production
   
   # OpenAI API
   OPENAI_API_KEY=sk-your-openai-api-key-here
   
   # Google OAuth (Optional)
   GOOGLE_CLIENT_ID=your_google_client_id
   GOOGLE_CLIENT_SECRET=your_google_client_secret
   GOOGLE_CALLBACK_URL=http://localhost:5173/auth/google/callback
   ```

   > ⚠️ **Important**: Never commit your `.env` file to version control!

### 🏃‍♂️ Running the Application

#### Option 1: Using the startup script (Recommended)

**Windows:**
```bash
.\run.bat
```

This will:
- Start the backend server on `http://localhost:5000`
- Start the frontend dev server on `http://localhost:5173`
- Open your browser automatically

#### Option 2: Manual start

**Terminal 1** (Backend):
```bash
npm run server
```

**Terminal 2** (Frontend):
```bash
npm run dev
```

#### Option 3: Development with auto-reload

For backend development with auto-reload:
```bash
npm run dev:server
```

---

## 🎯 Usage

### Creating Your First Blog Post

1. **Sign up** or **Login** to your account
2. Click on **"New Post"** or **"Start Writing"**
3. Use the markdown editor to write your content
4. Click the **AI Assistant** button to access AI tools:
   - Generate topic ideas
   - Create SEO-friendly titles
   - Expand content
   - Fix grammar
   - Get keyword suggestions

### AI Assistant Commands

The AI assistant supports various commands:

- **Topic Ideas**: Get fresh blog post ideas
- **Title Generator**: Generate multiple title options
- **Expand Content**: Select text and expand it
- **Grammar Check**: Improve writing quality
- **SEO Analysis**: Get keyword recommendations

### Publishing Your Post

1. Review your content in the **Preview** tab
2. Add tags and categories
3. Set a featured image (optional)
4. Click **"Publish"** when ready

---

## 📦 Available Scripts

```bash
# Development
npm run dev              # Start frontend dev server
npm run server           # Start backend server
npm run dev:server       # Start backend with auto-reload

# Building
npm run build            # Build for production
npm run build:dev        # Build in development mode
npm run preview          # Preview production build

# Testing
npm run test             # Run tests once
npm run test:watch       # Run tests in watch mode

# Code Quality
npm run lint             # Lint code with ESLint
```

---

## 🏗️ Project Structure

```
ai-blog-studio/
├── src/                    # Frontend source code
│   ├── components/         # React components
│   │   ├── editor/        # Editor-related components
│   │   ├── home/          # Home page components
│   │   └── layout/        # Layout components
│   ├── pages/             # Page components
│   ├── lib/               # Utility functions and API calls
│   ├── hooks/             # Custom React hooks
│   ├── types/             # TypeScript type definitions
│   └── index.css          # Global styles and design system
├── server/                # Backend source code
│   ├── models/            # MongoDB models
│   ├── routes/            # API routes
│   ├── middleware/        # Express middleware
│   └── index.js           # Server entry point
├── public/                # Static assets
├── .env                   # Environment variables (create this)
└── package.json           # Dependencies and scripts
```

---

## 🔧 Configuration

### Tailwind CSS

The project uses a custom design system configured in `tailwind.config.ts` and `src/index.css`. The theme includes:

- Editorial color palette with warm coral accents
- Custom typography (Inter, Merriweather, JetBrains Mono)
- Dark mode support
- Custom animations and transitions
- shadcn/ui component integration

### MongoDB Models

- **User**: User authentication and profile
- **Post**: Blog posts with metadata
- Additional models for tags, categories, and media

---

## 🚧 Development

### Adding New Features

1. Create a new branch for your feature
2. Implement your changes following the existing code style
3. Test your changes thoroughly
4. Submit a pull request

### Testing

Run tests with:
```bash
npm run test
```

For watch mode during development:
```bash
npm run test:watch
```

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- [OpenAI](https://openai.com/) for providing the GPT-4o API
- [shadcn/ui](https://ui.shadcn.com/) for beautiful component primitives
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework
- [Vite](https://vitejs.dev/) for the blazing-fast build tool

---

## 📞 Support

If you encounter any issues or have questions:

- Open an issue on GitHub
- Check existing issues for solutions
- Review the documentation

---

<div align="center">

**Made with ❤️ by the Blogify AI Team**

⭐ Star this repo if you find it helpful!

</div>