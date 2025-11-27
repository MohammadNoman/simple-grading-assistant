# 🎓 AI Grading Assistant

A free, AI-powered grading assistant that helps teachers grade essays and assignments 70% faster with detailed, constructive feedback.

![Grading Assistant](https://img.shields.io/badge/Next.js-16-black) ![TypeScript](https://img.shields.io/badge/TypeScript-5-blue) ![License](https://img.shields.io/badge/license-MIT-green)

## ✨ Features

- ✅ **PDF Upload Support** - Upload student essays in PDF format
- ✅ **AI-Powered Grading** - Get detailed scores and feedback using **Google Gemini**
- ✅ **Custom Rubrics** - Grade against your own criteria
- ✅ **Beautiful UI** - Clean, professional interface
- ✅ **Export Results** - Download grades and feedback
- ✅ **100% Free** - Uses Google's generous free tier

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ installed
- Google API Key (Free)

### Installation

1. **Clone or download this project**

2. **Install dependencies**
```bash
cd grading-app
npm install
```

3. **Set up environment variables**

Create a file named `.env.local` in the root directory:

```env
GOOGLE_API_KEY=your_google_api_key_here
```

**Get your Google API key:**
- Go to https://aistudio.google.com/app/apikey
- Create a new API key
- Copy and paste it into `.env.local`

4. **Run the development server**
```bash
npm run dev
```

5. **Open in browser**
```
http://localhost:3000
```

## 📖 How to Use

### Step 1: Upload Assignment
- Click "Upload" or drag and drop a PDF file
- Or paste text directly into the text area

### Step 2: Review Rubric
- Default rubric is provided (Essay grading)
- Total: 100 points across 4 criteria

### Step 3: Grade
- Click "Grade Assignment"
- AI will analyze and provide scores + feedback
- Takes 5-10 seconds

### Step 4: Review Results
- See overall score and percentage
- Review detailed breakdown by criterion
- Read AI-generated feedback
- Export results as JSON

## 🌐 Deploy for Free

### Deploy to Vercel (Recommended)

1. **Push to GitHub**
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin your-github-repo-url
git push -u origin main
```

2. **Deploy to Vercel**
- Go to https://vercel.com
- Sign in with GitHub
- Click "New Project"
- Import your repository
- Add environment variable:
  - Name: `GOOGLE_API_KEY`
  - Value: your API key
- Click "Deploy"

3. **Your app is live!**
- Vercel will give you a URL like: `your-app.vercel.app`
- Share with colleagues
- Use from anywhere

### Alternative: Deploy to Netlify

1. Install Netlify CLI
```bash
npm install -g netlify-cli
```

2. Build and deploy
```bash
npm run build
netlify deploy --prod
```

3. Add environment variables in Netlify dashboard

## 💰 Cost Breakdown (100% Free!)

### Free Tier Limits:

**Google Gemini API:**
- 15 requests per minute
- 1,500 requests per day
- **Completely FREE**

**Vercel Hosting:**
- 100 GB bandwidth/month
- Unlimited deployments
- Custom domain support
- **Completely free for personal use**

**Total Cost: $0** 🎉

## 🎯 Example Usage

### Sample Essay Grading

**Input:** 500-word persuasive essay (PDF)

**Output:**
```
Overall Score: 82/100 (82%)

Breakdown:
- Thesis Statement: 16/20
  "Clear thesis, but could be more specific..."
  
- Evidence & Support: 25/30
  "Good use of examples. Add more citations..."
  
- Organization: 18/20
  "Excellent flow and transitions..."
  
- Grammar & Mechanics: 23/30
  "Several run-on sentences. Watch comma usage..."
```

## 🔧 Customization

### Change the Rubric

Edit `app/page.tsx`, line ~20:

```typescript
const [rubric, setRubric] = useState<Criterion[]>([
  { name: 'Your Criterion', maxPoints: 25, description: 'Description' },
  // Add more criteria...
]);
```

### Customize UI Colors

Edit `app/page.tsx` - change Tailwind classes:
- `bg-blue-600` → `bg-purple-600` (change primary color)
- `from-blue-50 to-indigo-100` → your gradient

## 📊 Features Roadmap

- [ ] Save grading history
- [ ] Batch grading (multiple files at once)
- [ ] Custom rubric builder UI
- [ ] Student portal to view feedback
- [ ] Export to PDF
- [ ] Email results to students
- [ ] Class analytics dashboard

## 🐛 Troubleshooting

### "Failed to grade assignment"
- Check your Google API key in `.env.local`
- Check browser console for errors

### PDF upload not working
- Ensure file is a valid PDF
- Try a smaller file (<5MB)
- Check if PDF has selectable text (not scanned image)

### Deployment issues
- Make sure environment variables are set in Vercel
- Check build logs for errors
- Ensure Node.js version is 18+

## 📝 License

MIT License - Free to use, modify, and distribute

## 🙏 Credits

Built with:
- [Next.js](https://nextjs.org/) - React framework
- [Google Gemini](https://ai.google.dev/) - AI grading engine
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [pdf-parse](https://www.npmjs.com/package/pdf-parse) - PDF extraction

## 💡 Tips for Best Results

1. **Clear rubrics** - Be specific about what each criterion measures
2. **Detailed submissions** - Longer essays get better feedback
3. **Review AI suggestions** - Always check and adjust scores
4. **Consistent grading** - Use same rubric for all students
5. **Save feedback** - Export results for your records

## 🤝 Contributing

Found a bug? Have a feature request? Open an issue on GitHub!

## 📧 Support

Need help? Have questions?
- Open an issue on GitHub
- Check the troubleshooting section above
- Review OpenAI API documentation

---

**Built by teachers, for teachers. Happy grading! 🎓**
