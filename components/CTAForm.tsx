"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

export default function CTAForm() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [errors, setErrors] = useState({ name: "", phone: "" });
  const [submitError, setSubmitError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function submit(event: FormEvent) {
    event.preventDefault();
    const nextErrors = {
      name: name.trim() ? "" : "कृपया आफ्नो पूरा नाम लेख्नुहोस्।",
      phone: phone.trim() ? "" : "कृपया आफ्नो फोन नम्बर लेख्नुहोस्।",
    };
    setErrors(nextErrors);
    setSubmitError("");
    if (nextErrors.name || nextErrors.phone) return;

    setIsSubmitting(true);
    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, phone }),
      });
      if (!response.ok) throw new Error("Lead submission failed");
      router.push("/thank-you");
    } catch {
      setSubmitError("तपाईंको अनुरोध सुरक्षित गर्न सकिएन। कृपया फेरि प्रयास गर्नुहोस्।");
    } finally {
      setIsSubmitting(false);
    }
  }

  return <form noValidate onSubmit={submit} className="ring mx-auto max-w-2xl rounded-3xl bg-white p-5 shadow-xl shadow-[#1777b7]/10 sm:p-9">
    <div className="grid gap-5 sm:grid-cols-2">
      <label className="block text-sm font-bold text-[#12304a]">पूरा नाम *
        <input type="text" autoComplete="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="तपाईंको पूरा नाम" disabled={isSubmitting} className="mt-2 block w-full rounded-xl border border-slate-200 bg-white px-4 py-3.5 text-base font-normal outline-none transition focus:border-[#1777b7] focus:ring-4 focus:ring-[#1777b7]/10 disabled:cursor-not-allowed disabled:bg-slate-50" />
        {errors.name && <span className="mt-1 block text-sm font-medium text-red-600">{errors.name}</span>}
      </label>
      <label className="block text-sm font-bold text-[#12304a]">फोन नम्बर *
        <input type="tel" autoComplete="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="९८XXXXXXXX" disabled={isSubmitting} className="mt-2 block w-full rounded-xl border border-slate-200 bg-white px-4 py-3.5 text-base font-normal outline-none transition focus:border-[#1777b7] focus:ring-4 focus:ring-[#1777b7]/10 disabled:cursor-not-allowed disabled:bg-slate-50" />
        {errors.phone && <span className="mt-1 block text-sm font-medium text-red-600">{errors.phone}</span>}
      </label>
    </div>
    {submitError && <p role="alert" className="mt-5 rounded-xl bg-red-50 px-4 py-3 text-sm font-medium text-red-700">{submitError}</p>}
    <button disabled={isSubmitting} className="mt-7 w-full rounded-xl bg-[#1777b7] px-6 py-4 text-base font-extrabold text-white shadow-lg shadow-[#1777b7]/25 transition hover:bg-[#12679f] focus:outline-none focus:ring-4 focus:ring-[#1777b7]/30 disabled:cursor-wait disabled:opacity-70">{isSubmitting ? "पठाउँदै..." : "निःशुल्क परामर्श बुक गर्नुहोस्"}</button>
    <p className="mt-4 text-center text-sm text-slate-500">हामी तपाईंको गोपनीयताको सम्मान गर्छौं। कुनै स्पाम हुँदैन।</p>
  </form>;
}
