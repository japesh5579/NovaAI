import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy — Nova AICode Studio",
  description: "How Nova AICode Studio collects, uses, and protects your information.",
};

export default function PrivacyPage() {
  return (
    <div className="bg-background min-h-screen">
      <main className="max-w-3xl mx-auto px-6 pt-32 pb-24">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 font-semibold mb-12 transition-colors"
        >
          <ArrowLeft size={14} /> Back to home
        </Link>

        <h1 className="text-4xl font-black text-gray-900 dark:text-gray-100 mb-2">Privacy Policy</h1>
        <p className="text-sm text-gray-400 mb-10">Last updated: May 2025</p>

        <div className="prose prose-sm prose-gray dark:prose-invert max-w-none space-y-8 text-gray-600 dark:text-gray-400 leading-relaxed">

          <section>
            <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-3">1. Who We Are</h2>
            <p>
              Nova AICode Studio is a creative tech agency operated by Rajat Gupta, providing full-stack development,
              AI integration, e-commerce, and digital services. You can contact us at{" "}
              <a href="mailto:japeshjhatta@gmail.com" className="text-[#FF7A1A] hover:underline">
                japeshjhatta@gmail.com
              </a>.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-3">2. What Information We Collect</h2>
            <p>When you use our contact form, we collect:</p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>Your name</li>
              <li>Your email address</li>
              <li>Your phone number (optional)</li>
              <li>The message you send us</li>
            </ul>
            <p className="mt-3">
              We do not collect any information automatically beyond standard server logs (IP address, browser type,
              pages visited) that are retained by our hosting provider, Vercel.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-3">3. How We Use Your Information</h2>
            <p>We use the information you provide solely to:</p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>Respond to your enquiry</li>
              <li>Discuss potential projects or collaborations</li>
              <li>Send project-related updates if you become a client</li>
            </ul>
            <p className="mt-3">We do not sell, rent, or share your personal data with third parties for marketing purposes.</p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-3">4. Third-Party Services</h2>
            <p>This website uses the following third-party services:</p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li><strong className="text-gray-800 dark:text-gray-200">Web3Forms</strong> — processes contact form submissions</li>
              <li><strong className="text-gray-800 dark:text-gray-200">Groq</strong> — powers the Nova AI chat assistant</li>
              <li><strong className="text-gray-800 dark:text-gray-200">Vercel</strong> — hosts this website and its infrastructure</li>
            </ul>
            <p className="mt-3">Each of these services has its own privacy policy governing how they handle data.</p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-3">5. Data Retention</h2>
            <p>
              Contact form submissions are forwarded to our email inbox and are retained only as long as necessary
              to respond to your enquiry. We do not store your data in a separate database.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-3">6. Your Rights</h2>
            <p>You have the right to:</p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>Request access to any personal data we hold about you</li>
              <li>Request correction or deletion of your personal data</li>
              <li>Withdraw consent at any time</li>
            </ul>
            <p className="mt-3">
              To exercise any of these rights, email us at{" "}
              <a href="mailto:japeshjhatta@gmail.com" className="text-[#FF7A1A] hover:underline">
                japeshjhatta@gmail.com
              </a>.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-3">7. Cookies</h2>
            <p>
              This website does not use tracking cookies. Theme preferences (light/dark mode) are stored locally
              in your browser and never transmitted to our servers.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-3">8. Changes to This Policy</h2>
            <p>
              We may update this policy occasionally. The date at the top of this page reflects the most recent revision.
              Continued use of the site after changes constitutes acceptance of the updated policy.
            </p>
          </section>

        </div>
      </main>
    </div>
  );
}
