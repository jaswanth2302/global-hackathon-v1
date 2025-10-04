# 🧠 Memory Keeper for Grandparents

**Preserve precious family memories through AI-powered conversations**

A beautiful web application that helps grandparents share their life stories through guided AI conversations, transforming them into shareable blog posts and PDFs.

## ✨ Features

### 🤖 AI-Powered Conversations
- **Guided Memory Questions**: AI asks thoughtful questions about childhood, family, career, and life lessons
- **Contextual Follow-ups**: Dynamic conversations that build on previous responses
- **Empathetic AI**: Warm, patient, and encouraging conversation style
- **Voice Support**: Optional voice input and text-to-speech output

### 📝 Memory Blog Generation
- **Beautiful Blog Posts**: Transform conversations into well-structured, readable blog posts
- **Smart Summarization**: AI-generated summaries and tags
- **Markdown Formatting**: Rich text with headings, timestamps, and formatting
- **PDF Export**: Download memories as beautifully formatted PDFs
- **Shareable Links**: Create unique links to share memories with family

### 🔐 Secure & Private
- **Supabase Authentication**: Email magic links and guest login options
- **Row-Level Security**: Your memories are private and secure
- **Real-time Updates**: Live chat and memory synchronization
- **Data Ownership**: Full control over your personal data

### 🎨 Beautiful Design
- **Warm, Accessible Theme**: Carefully designed for grandparents
- **Responsive Design**: Works perfectly on all devices
- **High Contrast Mode**: Accessibility features for better visibility
- **Large Fonts**: Easy-to-read interface

## 🚀 Tech Stack

- **Frontend**: React 18 + Vite + TailwindCSS
- **Backend**: Supabase (Database, Auth, Storage, Edge Functions)
- **AI**: OpenAI GPT-4 for conversations and blog generation
- **Deployment**: Vercel (Frontend) + Supabase (Backend)

## 📦 Installation & Setup

### Prerequisites
- Node.js 18+ 
- Supabase account
- OpenAI API key

### 1. Clone and Install
```bash
git clone https://github.com/jaswanth2302/global-hackathon-v1.git
cd global-hackathon-v1
npm install
```

### 2. Environment Setup
```bash
# Copy environment template
cp .env.example .env

# Add your credentials to .env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
VITE_OPENAI_API_KEY=your_openai_api_key
```

### 3. Database Setup
```bash
# Run database migrations in Supabase
# Copy the SQL from supabase/migrations/001_initial_schema.sql
# and run it in your Supabase SQL editor
```

### 4. Deploy Edge Functions
```bash
# Deploy Supabase Edge Functions
supabase functions deploy generate-ai-response
supabase functions deploy generate-memory-blog
supabase functions deploy export-memory-pdf
```

### 5. Start Development
```bash
npm run dev
```

## 🗄️ Database Schema

### Users Table
- `id` (UUID, Primary Key)
- `name` (Text)
- `email` (Text)
- `profile_photo_url` (Text, Optional)
- `created_at`, `updated_at` (Timestamps)

### Memories Table
- `id` (UUID, Primary Key)
- `user_id` (UUID, Foreign Key)
- `title` (Text)
- `content` (Text, Markdown)
- `summary` (Text)
- `tags` (Text Array)
- `media_urls` (Text Array)
- `created_at`, `updated_at` (Timestamps)

### Chat History Table
- `id` (UUID, Primary Key)
- `user_id` (UUID, Foreign Key)
- `session_id` (Text)
- `message` (Text)
- `sender` (Enum: 'USER', 'AI')
- `timestamp` (Timestamp)

### Blog Exports Table
- `id` (UUID, Primary Key)
- `memory_id` (UUID, Foreign Key)
- `pdf_url` (Text, Optional)
- `share_link` (Text, Optional)
- `created_at` (Timestamp)

## 🔧 API Endpoints

### Supabase Edge Functions

#### `generate-ai-response`
- **Purpose**: Generate AI responses for chat conversations
- **Input**: `{ message, history, sessionId }`
- **Output**: `{ response }`

#### `generate-memory-blog`
- **Purpose**: Transform chat history into blog post
- **Input**: `{ memoryId }`
- **Output**: `{ memory, blog }`

#### `export-memory-pdf`
- **Purpose**: Export memory as PDF
- **Input**: `{ memoryId }`
- **Output**: PDF file

## 🎯 Hackathon Features

### Core Functionality
✅ **Complete MVP** - All features working end-to-end  
✅ **AI Integration** - OpenAI GPT-4 for conversations and blog generation  
✅ **Database** - Full Supabase integration with RLS security  
✅ **Authentication** - Magic link and guest login  
✅ **Real-time Chat** - Live conversation interface  
✅ **Blog Generation** - AI-powered memory blog creation  
✅ **PDF Export** - Download memories as PDFs  
✅ **Responsive Design** - Works on all devices  

### Advanced Features
✅ **Voice Input/Output** - Accessibility features  
✅ **Session Management** - Track conversation sessions  
✅ **Memory Dashboard** - View and manage all memories  
✅ **Shareable Links** - Share memories with family  
✅ **Tag System** - Organize memories by topics  
✅ **Search & Filter** - Find specific memories  

## 🚀 Deployment

### Frontend (Vercel)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy to Vercel
vercel --prod
```

### Backend (Supabase)
1. Create new Supabase project
2. Run database migrations
3. Deploy Edge Functions
4. Configure environment variables

## 🧪 Testing

### Manual Testing Checklist
- [ ] User registration and login
- [ ] AI conversation flow
- [ ] Memory blog generation
- [ ] PDF export functionality
- [ ] Responsive design on mobile
- [ ] Accessibility features
- [ ] Real-time updates

### Test Scenarios
1. **New User Journey**: Sign up → Start conversation → Generate blog → Export PDF
2. **Guest User**: Quick access without registration
3. **Memory Management**: View, edit, and organize memories
4. **Sharing**: Create and test shareable links

## 📱 User Experience

### For Grandparents
- **Simple Interface**: Large buttons, clear text, intuitive navigation
- **Guided Conversations**: AI asks natural, engaging questions
- **No Technical Knowledge Required**: Just type and share stories
- **Immediate Results**: See memories transformed into beautiful blogs

### For Family Members
- **Easy Sharing**: Receive shareable links to read memories
- **Beautiful Formatting**: Professional-looking blog posts
- **PDF Downloads**: Save memories permanently
- **Search & Organize**: Find specific stories and topics

## 🔒 Security & Privacy

- **Row-Level Security**: Users can only access their own data
- **Encrypted Storage**: All data encrypted at rest
- **No Data Mining**: Conversations are private and not used for training
- **GDPR Compliant**: Full data ownership and deletion rights
- **Secure Authentication**: Magic link authentication with Supabase

## 🎨 Design Philosophy

### Accessibility First
- **High Contrast**: Support for users with visual impairments
- **Large Fonts**: Easy reading for all ages
- **Voice Navigation**: Screen reader compatibility
- **Keyboard Navigation**: Full keyboard accessibility

### Warm & Inviting
- **Soft Colors**: Warm, pastel color palette
- **Friendly Typography**: Georgia serif for readability
- **Gentle Animations**: Subtle, non-distracting effects
- **Emotional Design**: Creates connection and trust

## 🚀 Future Enhancements

- **Multi-language Support**: Conversations in different languages
- **Photo Integration**: Upload and attach photos to memories
- **Timeline View**: Chronological memory organization
- **Family Trees**: Connect memories to family relationships
- **Voice Cloning**: Preserve actual voice recordings
- **Advanced AI**: More sophisticated conversation flows

## 📄 License

MIT License - Built for the ACTA Global Hackathon 2025

## 🤝 Contributing

This is a hackathon project, but contributions are welcome! Please feel free to:
- Report bugs
- Suggest features
- Submit pull requests
- Share feedback

## 📞 Support

For questions or support:
- **GitHub Issues**: Report bugs and feature requests
- **Email**: Contact the development team
- **Documentation**: Check the README and code comments

---

**Built with ❤️ for preserving precious family memories**

*Memory Keeper - Where stories live forever*