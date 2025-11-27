'use client';

import { useState } from 'react';
import { Upload, FileText, CheckCircle, AlertCircle, Download, Sparkles, ChevronRight, GraduationCap, BarChart3 } from 'lucide-react';

interface Criterion {
  name: string;
  maxPoints: number;
  description: string;
}

interface GradeResult {
  criterion: string;
  score: number;
  maxPoints: number;
  feedback: string;
}

export default function Home() {
  const [file, setFile] = useState<File | null>(null);
  const [text, setText] = useState('');
  const [rubric, setRubric] = useState<Criterion[]>([
    { name: 'Thesis Statement', maxPoints: 20, description: 'Clear, arguable claim' },
    { name: 'Evidence & Support', maxPoints: 30, description: 'Relevant examples and citations' },
    { name: 'Organization', maxPoints: 20, description: 'Logical flow and transitions' },
    { name: 'Grammar & Mechanics', maxPoints: 30, description: 'Proper spelling, punctuation, syntax' }
  ]);
  const [grading, setGrading] = useState(false);
  const [results, setResults] = useState<GradeResult[] | null>(null);
  const [overallFeedback, setOverallFeedback] = useState('');
  const [totalScore, setTotalScore] = useState(0);
  const [error, setError] = useState('');

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFile = e.target.files?.[0];
    if (!uploadedFile) return;

    setFile(uploadedFile);
    setError('');

    // Read file content
    if (uploadedFile.type === 'application/pdf') {
      const formData = new FormData();
      formData.append('file', uploadedFile);

      try {
        const response = await fetch('/api/extract-pdf', {
          method: 'POST',
          body: formData
        });
        const data = await response.json();
        setText(data.text);
      } catch (err) {
        setError('Failed to extract PDF text');
      }
    } else {
      const reader = new FileReader();
      reader.onload = (e) => {
        setText(e.target?.result as string);
      };
      reader.readAsText(uploadedFile);
    }
  };

  const handleGrade = async () => {
    if (!text) {
      setError('Please upload a file or paste text first');
      return;
    }

    setGrading(true);
    setError('');
    setResults(null); // Reset results

    try {
      const response = await fetch('/api/grade', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text, rubric })
      });

      if (!response.ok) {
        throw new Error('Grading failed');
      }

      const data = await response.json();
      setResults(data.results);
      setOverallFeedback(data.overallFeedback);
      setTotalScore(data.totalScore);
    } catch (err) {
      setError('Failed to grade assignment. Please check your API key.');
    } finally {
      setGrading(false);
    }
  };

  const exportResults = () => {
    const exportData = {
      totalScore,
      maxScore: rubric.reduce((sum, c) => sum + c.maxPoints, 0),
      results,
      overallFeedback,
      timestamp: new Date().toISOString()
    };

    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `grading-results-${Date.now()}.json`;
    a.click();
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans selection:bg-violet-200 selection:text-violet-900">
      {/* Decorative Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-violet-400/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-400/20 rounded-full blur-[120px]" />
      </div>

      {/* Header */}
      <header className="relative bg-white/80 backdrop-blur-md border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-br from-violet-600 to-indigo-600 p-2.5 rounded-xl shadow-lg shadow-violet-500/20">
                <GraduationCap className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-violet-600 to-indigo-600">
                  AI Grading Assistant
                </h1>
                <p className="text-xs text-slate-500 font-medium">Powered by Gemini 2.0</p>
              </div>
            </div>
            <a
              href="https://github.com/MohammadNoman/simple-grading-assistant"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium text-slate-600 hover:text-violet-600 transition-colors flex items-center gap-2"
            >
              <span className="hidden sm:inline">View on GitHub</span>
              <ChevronRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </header>

      <main className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-4 tracking-tight">
            Grade Smarter, <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-blue-600">Not Harder</span>
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Upload any essay or assignment and get instant, detailed feedback powered by advanced AI. Save hours of grading time today.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column - Input */}
          <div className="lg:col-span-5 space-y-6">

            {/* Upload Card */}
            <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden group">
              <div className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  <div className="p-2 bg-violet-100 rounded-lg text-violet-600">
                    <Upload className="w-5 h-5" />
                  </div>
                  <h3 className="font-semibold text-slate-900">Upload Assignment</h3>
                </div>

                <div className="relative border-2 border-dashed border-slate-200 rounded-xl p-8 text-center transition-all duration-300 hover:border-violet-500 hover:bg-violet-50/50 group-hover:shadow-inner">
                  <input
                    type="file"
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                    accept=".pdf,.txt,.doc,.docx"
                    onChange={handleFileUpload}
                  />
                  <div className="space-y-3">
                    <div className="w-12 h-12 bg-white rounded-full shadow-sm border border-slate-100 flex items-center justify-center mx-auto">
                      <FileText className="w-6 h-6 text-violet-500" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-slate-900">
                        Drop your file here
                      </p>
                      <p className="text-xs text-slate-500 mt-1">
                        PDF, DOCX, TXT up to 10MB
                      </p>
                    </div>
                  </div>
                </div>

                {file && (
                  <div className="mt-4 p-3 bg-violet-50 border border-violet-100 rounded-lg flex items-center gap-3 animate-in fade-in slide-in-from-top-2">
                    <div className="p-2 bg-white rounded-md shadow-sm">
                      <FileText className="w-4 h-4 text-violet-600" />
                    </div>
                    <span className="text-sm font-medium text-violet-900 truncate">{file.name}</span>
                    <CheckCircle className="w-4 h-4 text-violet-500 ml-auto" />
                  </div>
                )}

                <div className="relative mt-6">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-slate-200"></div>
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-white px-2 text-slate-400 font-medium">Or paste text</span>
                  </div>
                </div>

                <textarea
                  className="mt-4 w-full h-32 p-4 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all resize-none"
                  placeholder="Paste student work here..."
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                />
              </div>
            </div>

            {/* Rubric Card */}
            <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-100 p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className="p-2 bg-blue-100 rounded-lg text-blue-600">
                    <BarChart3 className="w-5 h-5" />
                  </div>
                  <h3 className="font-semibold text-slate-900">Grading Rubric</h3>
                </div>
                <span className="text-xs font-bold bg-slate-100 text-slate-600 px-2 py-1 rounded-full">
                  {rubric.reduce((sum, c) => sum + c.maxPoints, 0)} Points
                </span>
              </div>

              <div className="space-y-3">
                {rubric.map((criterion, index) => (
                  <div key={index} className="group p-3 hover:bg-slate-50 rounded-lg transition-colors border border-transparent hover:border-slate-100">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm font-medium text-slate-700">{criterion.name}</span>
                      <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full">
                        {criterion.maxPoints} pts
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 line-clamp-1 group-hover:line-clamp-none transition-all">
                      {criterion.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Button */}
            <button
              onClick={handleGrade}
              disabled={grading || !text}
              className="w-full group relative overflow-hidden bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 disabled:from-slate-300 disabled:to-slate-400 text-white font-semibold py-4 px-6 rounded-xl shadow-lg shadow-violet-500/30 transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0"
            >
              <div className="relative z-10 flex items-center justify-center gap-2">
                {grading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Analyzing...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5 transition-transform group-hover:scale-110" />
                    <span>Grade Assignment</span>
                  </>
                )}
              </div>
              {/* Shine Effect */}
              <div className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent z-0" />
            </button>

            {error && (
              <div className="p-4 bg-red-50 border border-red-100 rounded-xl flex items-start gap-3 animate-in fade-in slide-in-from-top-2">
                <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-red-700 font-medium">{error}</p>
              </div>
            )}
          </div>

          {/* Right Column - Results */}
          <div className="lg:col-span-7">
            {results ? (
              <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">

                {/* Score Card */}
                <div className="relative overflow-hidden bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl shadow-2xl p-8 text-white">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

                  <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
                    <div className="text-center md:text-left">
                      <h2 className="text-slate-400 font-medium mb-1 uppercase tracking-wider text-sm">Overall Score</h2>
                      <div className="flex items-baseline gap-1 justify-center md:justify-start">
                        <span className="text-6xl font-bold tracking-tighter">{totalScore}</span>
                        <span className="text-2xl text-slate-500 font-medium">
                          / {rubric.reduce((sum, c) => sum + c.maxPoints, 0)}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-6">
                      <div className="text-center">
                        <div className="text-3xl font-bold text-emerald-400">
                          {Math.round((totalScore / rubric.reduce((sum, c) => sum + c.maxPoints, 0)) * 100)}%
                        </div>
                        <div className="text-xs text-slate-400 uppercase tracking-wide mt-1">Grade</div>
                      </div>
                      <div className="w-px h-12 bg-white/10" />
                      <button
                        onClick={exportResults}
                        className="flex flex-col items-center gap-1 group"
                      >
                        <div className="p-3 bg-white/10 rounded-xl group-hover:bg-white/20 transition-colors">
                          <Download className="w-5 h-5" />
                        </div>
                        <span className="text-xs text-slate-400 group-hover:text-white transition-colors">Export</span>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Feedback Section */}
                <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-100 p-8">
                  <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-violet-500" />
                    AI Feedback
                  </h3>
                  <p className="text-slate-600 leading-relaxed bg-slate-50 p-6 rounded-xl border border-slate-100">
                    {overallFeedback}
                  </p>
                </div>

                {/* Detailed Breakdown */}
                <div className="space-y-4">
                  {results.map((result, index) => (
                    <div
                      key={index}
                      className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden transition-all hover:shadow-md"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <div className="p-6">
                        <div className="flex justify-between items-start mb-3">
                          <h4 className="font-bold text-slate-900">{result.criterion}</h4>
                          <div className="flex items-center gap-2">
                            <div className="h-2 w-24 bg-slate-100 rounded-full overflow-hidden">
                              <div
                                className="h-full bg-violet-500 rounded-full"
                                style={{ width: `${(result.score / result.maxPoints) * 100}%` }}
                              />
                            </div>
                            <span className="font-bold text-violet-600 min-w-[3rem] text-right">
                              {result.score}/{result.maxPoints}
                            </span>
                          </div>
                        </div>
                        <p className="text-sm text-slate-600">{result.feedback}</p>
                      </div>
                    </div>
                  ))}
                </div>

              </div>
            ) : (
              <div className="h-full min-h-[400px] flex flex-col items-center justify-center text-center p-8 border-2 border-dashed border-slate-200 rounded-3xl bg-slate-50/50">
                <div className="w-20 h-20 bg-white rounded-full shadow-sm border border-slate-100 flex items-center justify-center mb-6">
                  <Sparkles className="w-10 h-10 text-slate-300" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">Ready to Grade</h3>
                <p className="text-slate-500 max-w-sm">
                  Upload an assignment on the left to get started. The AI will analyze the work and provide detailed feedback in seconds.
                </p>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-slate-500">
              Built with Next.js, Tailwind CSS & Google Gemini
            </p>
            <div className="flex items-center gap-6">
              <a href="#" className="text-sm text-slate-500 hover:text-violet-600 transition-colors">Privacy</a>
              <a href="#" className="text-sm text-slate-500 hover:text-violet-600 transition-colors">Terms</a>
              <a href="https://github.com/MohammadNoman/simple-grading-assistant" className="text-sm text-slate-500 hover:text-violet-600 transition-colors">GitHub</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
