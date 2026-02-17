import GuidedAssessment from "@/components/dashboard/GuidedAssessment";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Background Decorative Elements */}
      <div className="fixed inset-0 -z-10 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[10%] right-[-5%] w-[30%] h-[30%] bg-accent/10 rounded-full blur-[100px]" />
      </div>

      <main className="flex-grow pt-32 pb-20">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16 animate-fade-in">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
              AI-Powered <span className="text-primary italic">Assessment</span> Wizard
            </h1>
            <p className="text-lg text-secondary">
              Follow the steps below to analyze student work and identify learning gaps instantly.
            </p>
          </div>

          <div className="glass rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden animate-fade-in" style={{ animationDelay: '0.2s' }}>
            {/* Subtle grid pattern background */}
            <div className="absolute inset-0 opacity-5 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, var(--primary) 1px, transparent 0)', backgroundSize: '32px 32px' }} />
            
            <div className="relative z-10">
              <GuidedAssessment />
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-white/50 dark:bg-gray-900/50 py-10 border-t border-border">
        <div className="container mx-auto text-center px-4">
          <p className="text-secondary text-sm">
            © 2026 EduAI Assessment Platform. Built for Premium Educators.
          </p>
        </div>
      </footer>
    </div>
  );
}
