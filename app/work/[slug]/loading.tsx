// Same shape as the case study header and hero image, so the swap does not shift layout.
export default function Loading() {
  return (
    <div aria-busy="true" aria-label="Loading case study" className="mx-auto w-full max-w-[1440px] px-5 md:px-12 xl:px-24">
      <div className="h-16 md:h-[88px]" />
      <div className="flex animate-pulse flex-col gap-10 pt-8 pb-12 motion-reduce:animate-none md:pt-14 md:pb-16">
        <div className="h-11 w-24 rounded-full bg-well" />
        <div className="h-14 w-3/4 rounded-xl bg-well md:h-[92px] lg:h-[120px]" />
        <div className="h-7 w-full max-w-[640px] rounded-lg bg-well" />
        <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className="h-12 rounded-lg bg-well" />
          ))}
        </div>
      </div>
      <div className="aspect-[4/3] animate-pulse rounded-2xl bg-well motion-reduce:animate-none md:aspect-[2/1]" />
    </div>
  );
}
