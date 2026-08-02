export default function SectionTitle({ eyebrow, title, children }: { eyebrow?: string; title: string; children?: React.ReactNode }) {
  return <div className="mx-auto mb-10 max-w-2xl text-center"><p className="mb-3 text-sm font-bold uppercase tracking-[.16em] text-[#f5a92e]">{eyebrow}</p><h2 className="text-3xl font-extrabold tracking-tight text-[#12304a] sm:text-4xl">{title}</h2>{children && <div className="mt-4 text-base leading-7 text-slate-600">{children}</div>}</div>;
}
