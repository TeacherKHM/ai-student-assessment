import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10 pointer-events-none">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/10 rounded-full blur-[120px]" />
          <div className="absolute bottom-[10%] right-[-5%] w-[30%] h-[30%] bg-accent/10 rounded-full blur-[100px]" />
        </div>

        <div className="container mx-auto text-center px-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-soft text-primary text-xs font-semibold mb-6 animate-fade-in">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            Next-Gen Student Assessment
          </div>

          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            Identify Learning Gaps <br />
            <span className="text-primary italic">Instantly</span> with AI.
          </h1>

          <p className="text-xl text-secondary max-w-2xl mx-auto mb-10 animate-fade-in" style={{ animationDelay: '0.3s' }}>
            The AI-powered platform for math and physics teachers. Analyze student work,
            detect misconceptions, and generate personalized learning paths in seconds.
          </p>

          <div className="flex flex-col md:flex-row items-center justify-center gap-4 animate-fade-in" style={{ animationDelay: '0.4s' }}>
            <Link href="/signup" className="bg-primary text-white text-lg font-semibold px-8 py-4 rounded-full hover:bg-primary-hover hover:shadow-xl transition-all hover:-translate-y-1 active:scale-95 w-full md:w-auto text-center">
              Get Started for Free
            </Link>
            <Link href="#how-it-works" className="bg-white dark:bg-gray-800 text-foreground text-lg font-semibold px-8 py-4 rounded-full border border-border hover:shadow-lg transition-all w-full md:w-auto text-center">
              Watch Demo
            </Link>
          </div>

          <div className="mt-16 relative mx-auto max-w-5xl rounded-2xl overflow-hidden shadow-2xl border border-border animate-fade-in" style={{ animationDelay: '0.5s' }}>
            <div className="aspect-video bg-gray-100 dark:bg-gray-800 flex items-center justify-center relative overflow-hidden">
              <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, #2563eb 1px, transparent 0)', backgroundSize: '24px 24px' }} />
              <div className="z-10 text-center p-8">
                <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-primary" fill="currentColor" viewBox="0 0 20 20"><path d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" /></svg>
                </div>
                <h3 className="text-2xl font-bold mb-2">Interactive Dashboard Preview</h3>
                <p className="text-secondary">AI-Generated Feedback & Error Mapping</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 border-y border-border bg-gray-50 dark:bg-gray-900/50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-1">92%</div>
              <div className="text-secondary text-sm">OCR Accuracy</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-1">5hr+</div>
              <div className="text-secondary text-sm">Weekly Time Saved</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-1">200+</div>
              <div className="text-secondary text-sm">Misconception Types</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-1">100%</div>
              <div className="text-secondary text-sm">Google Integration</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-32">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">Powerful Features for Modern Teachers</h2>
            <p className="text-secondary text-lg">
              We provide the tools you need to move beyond simple grading and into genuine diagnostic teaching.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard
              icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" /></svg>}
              title="Advanced Work Analysis"
              description="Upload scans or photos of handwritten work. Our AI extracts steps, equations, and diagrams automatically."
            />
            <FeatureCard
              icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}
              title="Misconception Detection"
              description="Identify exactly where a student went wrong. Is it a conceptual gap or just a simple arithmetic error?"
              color="bg-accent-soft text-accent"
            />
            <FeatureCard
              icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.586.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>}
              title="Personalized Plans"
              description="Automated generation of targeted practice problems based on individual student performance patterns."
              color="bg-orange-50 text-orange-500"
            />
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-32 bg-primary text-white overflow-hidden relative">
        <div className="absolute inset-0 opacity-10 pointer-events-none overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 border-8 border-white rounded-full -translate-y-1/2 translate-x-1/2" />
        </div>

        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold mb-8">Ready to revolutionize your classroom?</h2>
          <p className="text-xl text-primary-soft max-w-2xl mx-auto mb-12">
            Join hundreds of educators who are using EduAI to provide better feedback in half the time.
          </p>
          <div className="flex flex-col md:flex-row items-center justify-center gap-6">
            <Link href="/signup" className="bg-white text-primary text-lg font-bold px-10 py-4 rounded-full hover:shadow-2xl transition-all hover:scale-105 active:scale-95 w-full md:w-auto text-center">
              Get Started Now
            </Link>
            <Link href="/contact" className="text-white text-lg font-semibold border-b-2 border-white/30 hover:border-white transition-all py-1">
              Talk to an Expert
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

function FeatureCard({ icon, title, description, color = "bg-primary-soft text-primary" }: { icon: React.ReactNode, title: string, description: string, color?: string }) {
  return (
    <div className="p-8 rounded-2xl border border-border hover:shadow-xl transition-all hover:-translate-y-2 bg-white dark:bg-gray-800">
      <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-6 ${color}`}>
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-4">{title}</h3>
      <p className="text-secondary leading-relaxed">
        {description}
      </p>
    </div>
  );
}
