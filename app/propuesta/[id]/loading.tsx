// Same shape as the proposal cover, so the swap does not shift layout.
export default function Loading() {
  return (
    <div aria-busy="true" aria-label="Cargando propuesta" className="flex flex-1 flex-col bg-crema lg:grid lg:h-[920px] lg:grid-cols-[minmax(0,640px)_1fr]">
      <div className="flex animate-pulse flex-col gap-10 px-5 pt-6 pb-10 motion-reduce:animate-none md:px-12 lg:justify-between lg:pt-10 xl:px-20">
        <div className="h-6 w-full rounded bg-crema-honda" />
        <div className="flex flex-col gap-6">
          <div className="h-4 w-64 rounded bg-crema-honda" />
          <div className="h-[152px] w-4/5 rounded bg-crema-honda md:h-[208px] lg:h-[256px]" />
          <div className="h-14 w-full max-w-[440px] rounded bg-crema-honda" />
        </div>
        <div className="h-14 w-full rounded bg-crema-honda" />
      </div>
      <div className="aspect-[4/5] bg-crema-honda lg:aspect-auto" />
    </div>
  );
}
