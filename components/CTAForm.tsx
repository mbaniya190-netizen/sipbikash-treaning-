"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

const text = {
  nameRequired: "\u0915\u0943\u092a\u092f\u093e \u0906\u092b\u094d\u0928\u094b \u092a\u0942\u0930\u093e \u0928\u093e\u092e \u0932\u0947\u0916\u094d\u0928\u0941\u0939\u094b\u0938\u094d\u0964",
  phoneRequired: "\u0915\u0943\u092a\u092f\u093e \u0906\u092b\u094d\u0928\u094b \u092b\u094b\u0928 \u0928\u092e\u094d\u092c\u0930 \u0932\u0947\u0916\u094d\u0928\u0941\u0939\u094b\u0938\u094d\u0964",
  requestFailed: "\u0924\u092a\u093e\u0908\u0902\u0915\u094b \u0905\u0928\u0941\u0930\u094b\u0927 \u0938\u0941\u0930\u0915\u094d\u0937\u093f\u0924 \u0917\u0930\u094d\u0928 \u0938\u0915\u093f\u090f\u0928\u0964 \u0915\u0943\u092a\u092f\u093e \u092b\u0947\u0930\u093f \u092a\u094d\u0930\u092f\u093e\u0938 \u0917\u0930\u094d\u0928\u0941\u0939\u094b\u0938\u094d\u0964",
  fullName: "\u092a\u0942\u0930\u093e \u0928\u093e\u092e",
  yourFullName: "\u0924\u092a\u093e\u0908\u0902\u0915\u094b \u092a\u0942\u0930\u093e \u0928\u093e\u092e",
  phoneNumber: "\u092b\u094b\u0928 \u0928\u092e\u094d\u092c\u0930",
  sending: "\u092a\u0920\u093e\u0909\u0901\u0926\u0948...",
  submit: "\u0928\u093f\u0903\u0936\u0941\u0932\u094d\u0915 \u092a\u0930\u093e\u092e\u0930\u094d\u0936 \u092c\u0941\u0915 \u0917\u0930\u094d\u0928\u0941\u0939\u094b\u0938\u094d",
  privacy: "\u0939\u093e\u092e\u0940 \u0924\u092a\u093e\u0908\u0902\u0915\u094b \u0917\u094b\u092a\u0928\u0940\u092f\u0924\u093e\u0915\u094b \u0938\u092e\u094d\u092e\u093e\u0928 \u0917\u0930\u094d\u091b\u094c\u0902\u0964 \u0915\u0941\u0928\u0948 \u0938\u094d\u092a\u093e\u092e \u0939\u0941\u0901\u0926\u0948\u0928\u0964",
};

export default function CTAForm() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [errors, setErrors] = useState({ name: "", phone: "" });
  const [submitError, setSubmitError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (isSubmitting) return;

    const nextErrors = {
      name: name.trim() ? "" : text.nameRequired,
      phone: phone.trim() ? "" : text.phoneRequired,
    };
    setErrors(nextErrors);
    setSubmitError("");
    if (nextErrors.name || nextErrors.phone) return;

    setIsSubmitting(true);
    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name.trim(), phone: phone.trim() }),
      });

      if (!response.ok) throw new Error("Lead submission failed");
      if (typeof window !== "undefined" && typeof window.fbq === "function") {
        {  window.fbq("track", "Lead");}
      router.push("/thank-you");
    } catch {
      setSubmitError(text.requestFailed);
    } finally {
      setIsSubmitting(false);
    }
  }

  return <form noValidate onSubmit={submit} className="ring mx-auto max-w-2xl rounded-3xl bg-white p-5 shadow-xl shadow-[#1777b7]/10 sm:p-9">
    <div className="grid gap-5 sm:grid-cols-2">
      <label className="block text-sm font-bold text-[#12304a]">{text.fullName} *
        <input type="text" autoComplete="name" value={name} onChange={(event) => setName(event.target.value)} placeholder={text.yourFullName} disabled={isSubmitting} className="mt-2 block w-full rounded-xl border border-slate-200 bg-white px-4 py-3.5 text-base font-normal outline-none transition focus:border-[#1777b7] focus:ring-4 focus:ring-[#1777b7]/10 disabled:cursor-not-allowed disabled:bg-slate-50" />
        {errors.name && <span className="mt-1 block text-sm font-medium text-red-600">{errors.name}</span>}
      </label>
      <label className="block text-sm font-bold text-[#12304a]">{text.phoneNumber} *
        <input type="tel" autoComplete="tel" inputMode="tel" value={phone} onChange={(event) => setPhone(event.target.value)} placeholder="98XXXXXXXX" disabled={isSubmitting} className="mt-2 block w-full rounded-xl border border-slate-200 bg-white px-4 py-3.5 text-base font-normal outline-none transition focus:border-[#1777b7] focus:ring-4 focus:ring-[#1777b7]/10 disabled:cursor-not-allowed disabled:bg-slate-50" />
        {errors.phone && <span className="mt-1 block text-sm font-medium text-red-600">{errors.phone}</span>}
      </label>
    </div>
    {submitError && <p role="alert" className="mt-5 rounded-xl bg-red-50 px-4 py-3 text-sm font-medium text-red-700">{submitError}</p>}
    <button type="submit" disabled={isSubmitting} className="mt-7 w-full rounded-xl bg-[#1777b7] px-6 py-4 text-base font-extrabold text-white shadow-lg shadow-[#1777b7]/25 transition hover:bg-[#12679f] focus:outline-none focus:ring-4 focus:ring-[#1777b7]/30 disabled:cursor-wait disabled:opacity-70">{isSubmitting ? text.sending : text.submit}</button>
    <p className="mt-4 text-center text-sm text-slate-500">{text.privacy}</p>
  </form>;
}
