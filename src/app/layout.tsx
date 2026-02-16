import type { Metadata } from "next";
import "./globals.css";
import NavBar from "@/components/ui/NavBar";
import AuthProvider from "@/components/AuthProvider";

export const metadata: Metadata = {
  title: "EduAI - AI-Powered Student Assessment",
  description: "Advanced AI platform for identifying learning gaps in math and physics through Google Classroom integration.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body>
        <AuthProvider>
          <NavBar />
          <main>{children}</main>
          <footer className="bg-gray-50 dark:bg-gray-900 py-12 border-t border-border mt-20">
            <div className="container mx-auto text-center">
              <p className="text-secondary text-sm">
                © 2026 EduAI Assessment Platform. Built for Educators.
              </p>
            </div>
          </footer>
        </AuthProvider>
      </body>
    </html>
  );
}
