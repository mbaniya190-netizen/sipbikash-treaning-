
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | Sip Bikas",
  description:
    "Privacy Policy for Sip Bikas Scaffolding Training and lead collection.",
};

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-white px-5 py-10 text-gray-800">
      <div className="mx-auto max-w-3xl">
        <h1 className="mb-3 text-3xl font-bold text-gray-900">
          Privacy Policy
        </h1>

        <p className="mb-8 text-sm text-gray-500">
          Last updated: August 2026
        </p>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-900">
            1. About Us
          </h2>

          <p>
            Sip Bikas Skill Development provides practical skill training,
            including scaffolding training, career guidance, and information
            related to training and employment opportunities.
          </p>

          <h2 className="pt-4 text-xl font-semibold text-gray-900">
            2. Information We Collect
          </h2>

          <p>
            When you submit a lead form on our website or through an
            advertisement, we may collect information such as your full name
            and phone number.
          </p>

          <h2 className="pt-4 text-xl font-semibold text-gray-900">
            3. How We Use Your Information
          </h2>

          <p>
            We use the information you provide to contact you about our
            training programs, provide course information, answer your
            enquiries, and assist with registration or enrollment.
          </p>

          <h2 className="pt-4 text-xl font-semibold text-gray-900">
            4. Information Sharing
          </h2>

          <p>
            We do not sell your personal information. We may use trusted
            service providers and advertising platforms, such as Meta, to
            operate our lead generation and communication services.
          </p>

          <h2 className="pt-4 text-xl font-semibold text-gray-900">
            5. Data Security
          </h2>

          <p>
            We take reasonable measures to protect the personal information
            submitted through our website and lead forms. However, no method
            of electronic transmission or storage can be guaranteed to be
            completely secure.
          </p>

          <h2 className="pt-4 text-xl font-semibold text-gray-900">
            6. Your Choices
          </h2>

          <p>
            If you no longer want to receive communications from us, you can
            ask us to stop contacting you.
          </p>

          <h2 className="pt-4 text-xl font-semibold text-gray-900">
            7. Contact Us
          </h2>

          <p>
            If you have questions about this Privacy Policy or want to request
            information about your personal data, please contact Sip Bikas
            Skill Development.
          </p>

          <p className="pt-2">
            Phone:{" "}
            <a
              href="tel:+9779765942884"
              className="font-medium text-blue-600 underline"
            >
              +977 976-5942884
            </a>
          </p>

          <p>
            Email:{" "}
            <a
              href="mailto:mbaniya190@gmail.com"
              className="font-medium text-blue-600 underline"
            >
              mbaniya190@gmail.com
            </a>
          </p>

          <p className="pt-6 text-sm text-gray-500">
            By submitting your information through our website or lead forms,
            you acknowledge that you have read and understood this Privacy
            Policy.
          </p>
        </section>
      </div>
    </main>
  );
}

