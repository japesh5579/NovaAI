import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-6">
      <div className="text-center max-w-md">
        <p className="text-[120px] font-black leading-none bg-gradient-to-r from-[#FF7A1A] to-[#1E3A73] bg-clip-text text-transparent select-none">
          404
        </p>
        <h1 className="text-2xl font-black text-gray-900 dark:text-gray-100 mt-2 mb-3">
          Page not found
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-8 leading-relaxed">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#FF7A1A] to-[#1E3A73] text-white text-sm font-bold shadow-lg hover:opacity-90 transition-opacity"
        >
          <ArrowLeft size={14} /> Back to Home
        </Link>
      </div>
    </div>
  );
}
