# 🚀 Deployment Guide - AI Grading Assistant

## Quick Deployment to Vercel (5 minutes, 100% FREE)

### Step 1: Get Google API Key (2 minutes)

1. Go to https://aistudio.google.com/app/apikey
2. Sign in with your Google Account
3. Click **"Create API key"**
4. Copy the key (starts with `AIza...`)
5. **Save it somewhere safe!**

### Step 2: Push to GitHub (2 minutes)

1. Create a new repository on GitHub:
   - Go to https://github.com/new
   - Name it: `grading-assistant`
   - Make it Public or Private
   - Don't initialize with README

2. Push your code:
```bash
cd C:\Users\SM TRADERs\.gemini\antigravity\scratch\grading-app

git init
git add .
git commit -m "Initial commit - AI Grading Assistant"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/grading-assistant.git
git push -u origin main
```

### Step 3: Deploy to Vercel (1 minute)

1. Go to https://vercel.com/signup
2. Sign up with GitHub (click "Continue with GitHub")
3. Click "Add New..." → "Project"
4. Import your `grading-assistant` repository
5. Configure:
   - Framework Preset: Next.js (auto-detected)
   - Root Directory: ./
   - Build Command: `npm run build` (auto-filled)
   - Output Directory: `.next` (auto-filled)

6. **Add Environment Variables:**
   Click "Environment Variables" and add:
   
   ```
   Name: GOOGLE_API_KEY
   Value: your-actual-api-key-here
   ```

7. Click "Deploy"

8. Wait 2-3 minutes...

9. **Done!** 🎉

Your app is now live at: `https://your-project-name.vercel.app`

---

## Testing Your Deployed App

### Step 1: Open Your App

Click the URL Vercel gave you (e.g., `grading-assistant-abc123.vercel.app`)

### Step 2: Test with Sample Essay

1. Create a test essay (or use the one you mentioned)
2. Save as PDF or paste text
3. Upload to your app
4. Click "Grade Assignment"
5. Review results!

---

## Free Tier Limits

### Vercel (Hosting)
- ✅ Unlimited deployments
- ✅ 100 GB bandwidth/month
- ✅ Automatic HTTPS
- ✅ Custom domain support
- ✅ **Completely FREE forever**

### Google Gemini API
- ✅ 15 requests per minute
- ✅ 1,500 requests per day
- ✅ **Completely FREE**

### Total Monthly Cost
**$0** - Truly free for individual use!

---

## Sharing Your App

### Option 1: Share Direct Link
```
https://your-app.vercel.app
```

Anyone can use it immediately!

### Option 2: Custom Domain (Optional)

1. Buy a domain (e.g., `mygrading.com` for ~$10/year)
2. In Vercel dashboard:
   - Go to your project
   - Settings → Domains
   - Add your domain
   - Follow DNS instructions

---

## Monitoring Usage

### Check Google AI Usage

1. Go to https://aistudio.google.com/
2. Check your usage quotas if needed

### Check Vercel Analytics

1. Go to https://vercel.com/dashboard
2. Click your project
3. See visitor stats, bandwidth usage

---

## Updating Your App

Made changes? Deploy updates:

```bash
git add .
git commit -m "Update: description of changes"
git push
```

Vercel automatically redeploys! (takes 2-3 minutes)

---

## Troubleshooting

### "API key not found"
- Go to Vercel dashboard
- Project → Settings → Environment Variables
- Make sure `GOOGLE_API_KEY` is set
- Redeploy if you just added it

### "Deployment failed"
- Check build logs in Vercel
- Make sure all files are committed to GitHub
- Ensure `package.json` has all dependencies

### "PDF upload not working"
- Check file size (<10MB)
- Ensure PDF has selectable text
- Try with a simple text file first

---

## Next Steps

### 1. Test Thoroughly
- Upload various essay types
- Test with different file sizes
- Verify grading accuracy

### 2. Share with Colleagues
- Get feedback from other teachers
- Iterate based on their needs
- Build a user base

### 3. Monitor Costs
- It's free, so just monitor usage limits!

### 4. Customize
- Adjust rubrics for your subject
- Modify UI colors/branding
- Add new features

---

## Cost Management Tips

### Stay in Free Tier
- You have 1,500 requests per day. That's a LOT of grading!
- Unless you're grading for the entire district, you won't hit the limit.

### Monetization Ideas
- Charge colleagues $5/month
- School license: $500/year
- District contract: $5000/year

**Break-even:** Immediate profit since costs are $0!

---

## Support & Help

### Resources
- Google AI Docs: https://ai.google.dev/docs
- Vercel Docs: https://vercel.com/docs
- Next.js Docs: https://nextjs.org/docs

### Common Issues
- Check README.md troubleshooting section
- Review Vercel deployment logs

---

**Your app is now live and ready to save you hours of grading time! 🎉**

**URL to share:** `https://your-app.vercel.app`
