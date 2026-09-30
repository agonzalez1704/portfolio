// Same shape as the proposal header and hero, so the swap does not shift layout.
export default function Loading() {
  return (
    <div aria-busy="true" aria-label="Cargando propuesta" className="mx-auto w-full max-w-[1440px] px-5 md:px-12 xl:px-24">
      <div className="h-16 md:h-[88px]" />
      <div className="grid animate-pulse gap-10 pt-6 pb-16 motion-reduce:animate-none md:pt-10 lg:grid-cols-[1fr_minmax(0,520px)] lg:items-end lg:gap-16">
        <div className="flex flex-col gap-8">
          <div className="h-5 w-64 rounded-lg bg-well" />
          <div className="h-28 w-3/4 rounded-xl bg-well md:h-[184px]" />
          <div className="h-16 w-full max-w-[560px] rounded-lg bg-well" />
          <div className="h-[52px] w-60 rounded-full bg-well" />
        </div>
        <div className="aspect-[4/5] rounded-3xl bg-well" />
      </div>
    </div>
  );
}
