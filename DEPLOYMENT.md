# 🚀 Deployment Guide - Memory Keeper for Grandparents

## Quick Deploy Checklist

### ✅ Prerequisites
- [ ] Supabase account and project
- [ ] OpenAI API key
- [ ] Vercel account (for frontend)
- [ ] GitHub repository (your fork)

### ✅ Environment Variables
```bash
# Frontend (.env)
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
VITE_OPENAI_API_KEY=sk-your-openai-key

# Supabase Edge Functions
OPENAI_API_KEY=sk-your-openai-key
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=your_supabase_anon_key
```

## 🗄️ Supabase Setup

### 1. Create Supabase Project
1. Go to [supabase.com](https://supabase.com)
2. Create new project
3. Wait for project to be ready
4. Note your project URL and anon key

### 2. Run Database Migrations
1. Go to **SQL Editor** in Supabase dashboard
2. Copy and paste the contents of `supabase/migrations/001_initial_schema.sql`
3. Click **Run** to execute the migration
4. Verify tables are created in **Table Editor**

### 3. Deploy Edge Functions
```bash
# Install Supabase CLI
npm install -g supabase

# Login to Supabase
supabase login

# Link to your project
supabase link --project-ref your-project-ref

# Deploy functions
supabase functions deploy generate-ai-response
supabase functions deploy generate-memory-blog
supabase functions deploy export-memory-pdf
```

### 4. Configure Edge Function Secrets
```bash
# Set OpenAI API key for Edge Functions
supabase secrets set OPENAI_API_KEY=sk-your-openai-key
```

## 🌐 Frontend Deployment (Vercel)

### 1. Connect to Vercel
1. Go to [vercel.com](https://vercel.com)
2. Import your GitHub repository
3. Configure build settings:
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`

### 2. Set Environment Variables
In Vercel dashboard, add these environment variables:
```
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
VITE_OPENAI_API_KEY=sk-your-openai-key
```

### 3. Deploy
```bash
# Deploy to Vercel
vercel --prod

# Or use the Vercel dashboard to deploy
```

## 🧪 Testing Your Deployment

### 1. Frontend Testing
- [ ] Visit your Vercel URL
- [ ] Test user registration/login
- [ ] Test guest login
- [ ] Test AI conversation
- [ ] Test blog generation
- [ ] Test PDF export

### 2. Backend Testing
- [ ] Check Supabase logs for errors
- [ ] Test Edge Functions in Supabase dashboard
- [ ] Verify database operations
- [ ] Test authentication flow

### 3. Integration Testing
- [ ] Full user journey: Sign up → Chat → Generate Blog → Export PDF
- [ ] Test on mobile devices
- [ ] Test accessibility features
- [ ] Test in incognito mode

## 🔧 Troubleshooting

### Common Issues

#### 1. CORS Errors
```javascript
// Add to Supabase Edge Functions
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}
```

#### 2. Environment Variables Not Loading
- Check variable names start with `VITE_`
- Restart development server after adding variables
- Verify variables in Vercel dashboard

#### 3. Database Connection Issues
- Verify Supabase URL and keys
- Check Row Level Security policies
- Ensure user authentication is working

#### 4. OpenAI API Errors
- Verify API key is correct
- Check API usage limits
- Ensure key has GPT-4 access

## 📊 Performance Optimization

### Frontend
- Enable Vercel's edge caching
- Optimize images and assets
- Use React.lazy for code splitting

### Backend
- Enable Supabase connection pooling
- Optimize database queries
- Cache frequently accessed data

## 🔒 Security Checklist

- [ ] Row Level Security enabled
- [ ] API keys stored securely
- [ ] CORS properly configured
- [ ] User authentication working
- [ ] Data encryption enabled
- [ ] No sensitive data in client code

## 📱 Mobile Optimization

- [ ] Responsive design tested
- [ ] Touch interactions working
- [ ] Mobile navigation smooth
- [ ] Text readable on small screens
- [ ] Voice input working on mobile

## 🎯 Hackathon Submission

### Final Checklist
- [ ] **Public GitHub repo** ✅
- [ ] **Live demo URL** (Vercel deployment)
- [ ] **60-second demo video** (Loom/YouTube)
- [ ] **Working in incognito** ✅
- [ ] **5+ commits during 24 hours** ✅
- [ ] **README updated** ✅

### Demo Video Script
1. **Introduction** (10s): "Memory Keeper for Grandparents"
2. **Problem** (10s): "Preserving family stories"
3. **Solution** (20s): Show AI conversation
4. **Features** (15s): Blog generation, PDF export
5. **Conclusion** (5s): "Built for hackathon"

### Submission Form
- **GitHub Repo**: `https://github.com/jaswanth2302/global-hackathon-v1`
- **Demo URL**: `https://your-app.vercel.app`
- **Video URL**: `https://youtube.com/watch?v=your-video`
- **Email**: Your email
- **Name**: Your name

## 🚀 Production Considerations

### Scaling
- Monitor Supabase usage limits
- Set up error tracking (Sentry)
- Implement rate limiting
- Add monitoring dashboards

### Maintenance
- Regular security updates
- Monitor API usage
- Backup database regularly
- Update dependencies

---

**Ready to deploy! 🎉**

*Your Memory Keeper app is ready to preserve precious family memories*
