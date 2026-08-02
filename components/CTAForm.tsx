"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

export default function CTAForm() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [errors, setErrors] = useState({ name: "", phone: "" });

  function submit(event: FormEvent) {
    event.preventDefault();
    const nextErrors = {
      name: name.trim() ? "" : "कृपया आफ्नो पूरा नाम लेख्नुहोस्।",
      phone: phone.trim() ? "" : "कृपया आफ्नो फोन नम्बर लेख्नुहोस्।",
    };
    setErrors(nextErrors);
    if (!nextErrors.name && !nextErrors.phone) router.push("/thank-you");
  }

  return <form noValidate onSubmit={submit} className="ring mx-auto max-w-2xl rounded-3xl bg-white p-5 shadow-xl shadow-[#1777b7]/10 sm:p-9">
    <div className="grid gap-5 sm:grid-cols-2">
      <label className="block text-sm font-bold text-[#12304a]">पूरा नाम *
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="तपाईंको पूरा नाम" className="mt-2 block w-full rounded-xl border border-slate-200 bg-white px-4 py-3.5 text-base font-normal outline-none transition focus:border-[#1777b7] focus:ring-4 focus:ring-[#1777b7]/10" />
        {errors.name && <span className="mt-1 block text-sm font-medium text-red-600">{errors.name}</span>}
      </label>
      <label className="block text-sm font-bold text-[#12304a]">फोन नम्बर *
        <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="९८XXXXXXXX" className="mt-2 block w-full rounded-xl border border-slate-200 bg-white px-4 py-3.5 text-base font-normal outline-none transition focus:border-[#1777b7] focus:ring-4 focus:ring-[#1777b7]/10" />
        {errors.phone && <span className="mt-1 block text-sm font-medium text-red-600">{errors.phone}</span>}
      </label>
    </div>
    <button className="mt-7 w-full rounded-xl bg-[#1777b7] px-6 py-4 text-base font-extrabold text-white shadow-lg shadow-[#1777b7]/25 transition hover:bg-[#12679f] focus:outline-none focus:ring-4 focus:ring-[#1777b7]/30">निःशुल्क परामर्श बुक गर्नुहोस्</button>
    <p className="mt-4 text-center text-sm text-slate-500">हामी तपाईंको गोपनीयताको सम्मान गर्छौं। कुनै स्पाम हुँदैन।</p>
  </form>;
}
