# 🎓 AI Grading Assistant - Quick Start (Google Gemini Edition)

## ✅ Your App is Ready!

I've updated your app to use **Google Gemini**, which has a generous **FREE TIER** (no credit card required for the free tier in many regions).

---

## 📍 Location

Your app is here:
```
C:\Users\SM TRADERs\.gemini\antigravity\scratch\grading-app
```

---

## 🚀 How to Run Locally (Test Before Deploying)

### Step 1: Get Google API Key (100% Free)

1. Go to: https://aistudio.google.com/app/apikey
2. Sign in with your Google Account
3. Click **"Create API key"**
4. Copy the key (starts with `AIza...`)

### Step 2: Set Up Environment

1. Open the `grading-app` folder
2. Create a new file called `.env.local`
3. Add this content:

```
GOOGLE_API_KEY=your_copied_api_key_here
```

### Step 3: Run the App

Open PowerShell in the `grading-app` folder and run:

```powershell
npm run dev
```

Then open your browser to:
```
http://localhost:3000
```

### Step 4: Test with Your Essay

1. Upload your PDF essay
2. Click "Grade Assignment"
3. See the results!

---

## 🌐 Deploy to Vercel (Make it Live)

Once you've tested locally, deploy for free:

1. **Push to GitHub**
2. **Import to Vercel**
3. **Add Environment Variable:**
   - Name: `GOOGLE_API_KEY`
   - Value: `your_api_key`
4. **Deploy!**

---

## 💰 Cost Breakdown

### Completely FREE:

**Google Gemini API (Free Tier):**
- 15 requests per minute
- 1,500 requests per day
- **Enough for any individual teacher!**

**Vercel Hosting:**
- **FREE forever**

**Total: $0** 🎉

---

## 🐛 Troubleshooting

### "Missing Google API Key"
- Check `.env.local` file
- Restart the server (`Ctrl+C` then `npm run dev`) after changing env variables

### PDF upload fails?
- Ensure PDF has selectable text (not scanned image)
- Try with smaller file (<5MB)

---

**Happy grading! 🎓**
