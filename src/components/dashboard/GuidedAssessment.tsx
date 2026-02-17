"use client";

import { useState, useEffect } from "react";
import { useSession, signIn } from "next-auth/react";
import Link from "next/link";

type Step = 1 | 2 | 3 | 4 | 5;

export default function GuidedAssessment() {
  const { data: session, status } = useSession();
  const [currentStep, setCurrentStep] = useState<Step>(1);
  const [courses, setCourses] = useState<any[]>([]);
  const [selectedCourse, setSelectedCourse] = useState<string | null>(null);
  const [assignments, setAssignments] = useState<any[]>([]);
  const [selectedAssignment, setSelectedAssignment] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Fetch courses when authenticated
  useEffect(() => {
    if (session?.accessToken && currentStep === 1) {
      fetchCourses();
    }
  }, [session, currentStep]);

  // Fetch assignments when course is selected and step is 2
  useEffect(() => {
    if (session?.accessToken && selectedCourse && currentStep === 2) {
      fetchAssignments();
    }
  }, [session, selectedCourse, currentStep]);

  const fetchCourses = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/classroom/courses");
      if (res.ok) {
        const data = await res.json();
        setCourses(data);
      }
    } catch (err) {
      console.error("Failed to fetch courses", err);
    } finally {
      setLoading(false);
    }
  };

  const fetchAssignments = async () => {
    if (!selectedCourse) return;
    setLoading(true);
    try {
      const res = await fetch(`/api/classroom/assignments?courseId=${selectedCourse}`);
      if (res.ok) {
        const data = await res.json();
        setAssignments(data);
      }
    } catch (err) {
      console.error("Failed to fetch assignments", err);
    } finally {
      setLoading(false);
    }
  };

  const renderStep1 = () => {
    if (status === "unauthenticated") {
      return (
        <div className="text-center py-10 animate-fade-in">
          <div className="w-20 h-20 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <h2 className="text-3xl font-bold mb-4">Step 1: Connect your Classroom</h2>
          <p className="text-secondary mb-8 max-w-md mx-auto">
            To begin the assessment, we need to access your Google Classroom courses and student submissions.
          </p>
          <button
            onClick={() => signIn("google")}
            className="bg-primary text-white px-8 py-4 rounded-full font-bold hover:shadow-xl transition-all active:scale-95 flex items-center gap-2 mx-auto"
          >
            <img src="https://www.google.com/favicon.ico" className="w-4 h-4 invert" alt="Google" />
            Connect Google Classroom
          </button>
        </div>
      );
    }

    if (loading) {
      return (
        <div className="text-center py-20">
          <div className="animate-spin w-12 h-12 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-secondary">Loading your courses...</p>
        </div>
      );
    }

    return (
      <div className="animate-fade-in">
        <div className="mb-8 text-center">
            <h2 className="text-3xl font-bold mb-2">Step 1: Select a Course</h2>
            <p className="text-secondary">Choose the class you want to assess today.</p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
            <button
              key={course.id}
              onClick={() => {
                setSelectedCourse(course.id);
                setCurrentStep(2);
              }}
              className={`p-6 rounded-2xl border text-left transition-all hover:shadow-lg group ${
                selectedCourse === course.id ? "border-primary bg-primary-soft shadow-inner" : "border-border bg-white"
              }`}
            >
              <div className="w-10 h-10 bg-primary/10 text-primary rounded-lg flex items-center justify-center font-bold mb-4 group-hover:scale-110 transition-transform">
                {course.name?.[0]}
              </div>
              <h3 className="font-bold text-lg mb-1">{course.name}</h3>
              <p className="text-secondary text-sm line-clamp-1">{course.section || "No section"}</p>
            </button>
          ))}
        </div>
        
        {courses.length === 0 && (
            <div className="text-center py-10 border-2 border-dashed border-border rounded-2xl">
                <p className="text-secondary">No active courses found. Are you a teacher in Google Classroom?</p>
            </div>
        )}
      </div>
    );
  };

  const renderStep2 = () => {
    if (loading) {
      return (
        <div className="text-center py-20">
          <div className="animate-spin w-12 h-12 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-secondary">Loading course assignments...</p>
        </div>
      );
    }

    return (
      <div className="animate-fade-in">
        <div className="flex items-center gap-4 mb-8">
            <button 
                onClick={() => setCurrentStep(1)}
                className="w-10 h-10 border border-border rounded-full flex items-center justify-center hover:bg-gray-50 transition-colors"
            >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" /></svg>
            </button>
            <div className="text-left">
                <h2 className="text-3xl font-bold mb-1">Step 2: Select Assignment</h2>
                <p className="text-secondary italic">Course: {courses.find(c => c.id === selectedCourse)?.name}</p>
            </div>
        </div>

        <div className="flex flex-col gap-4">
          {assignments.map((assignment) => (
            <button
              key={assignment.id}
              onClick={() => {
                setSelectedAssignment(assignment.id);
                setCurrentStep(3);
              }}
              className={`p-6 rounded-2xl border text-left flex items-center justify-between transition-all hover:bg-gray-50 group ${
                selectedAssignment === assignment.id ? "border-primary bg-primary-soft" : "border-border bg-white"
              }`}
            >
              <div>
                <h3 className="font-bold text-lg mb-1 group-hover:text-primary transition-colors">{assignment.title}</h3>
                <p className="text-secondary text-sm">
                  Created at: {new Date(assignment.creationTime).toLocaleDateString()}
                </p>
              </div>
              <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>
              </div>
            </button>
          ))}
        </div>

        {assignments.length === 0 && (
          <div className="text-center py-10 border-2 border-dashed border-border rounded-2xl">
            <p className="text-secondary text-lg mb-4">No assignments found for this course.</p>
            <button 
                onClick={() => setCurrentStep(1)}
                className="text-primary font-bold hover:underline"
            >
                Try another course
            </button>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="w-full max-w-5xl mx-auto">
      {/* Progress Bar */}
      <div className="mb-12">
        <div className="flex justify-between mb-2">
          {["Start", "Assignment", "Submission", "Analysis", "Result"].map((label, i) => (
            <div 
              key={label} 
              className={`text-[10px] font-bold uppercase tracking-widest ${currentStep >= i + 1 ? "text-primary" : "text-gray-400"}`}
            >
              {label}
            </div>
          ))}
        </div>
        <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
          <div 
            className="h-full bg-primary transition-all duration-500 ease-out"
            style={{ width: `${(currentStep / 5) * 100}%` }}
          />
        </div>
      </div>

      {/* Step Content */}
      <div className="min-h-[400px]">
        {currentStep === 1 && renderStep1()}
        {currentStep === 2 && renderStep2()}
        {currentStep === 3 && (
          <div className="text-center py-20">
            <h2 className="text-2xl font-bold mb-4">Step 3: Submission Selection</h2>
            <p className="text-secondary">Coming soon in the next step of implementation...</p>
            <button 
                onClick={() => setCurrentStep(2)}
                className="mt-6 text-sm text-primary font-semibold hover:underline"
            >
                ← Back to Assignments
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
