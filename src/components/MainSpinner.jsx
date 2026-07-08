const MainSpinner = () => {
  return (
    <div className="relative h-[80vh] w-full overflow-hidden bg-black animate-pulse">
      <div className="absolute inset-0 bg-zinc-900" />

      <div className="absolute inset-0 bg-linear-to-r from-black via-black/70 to-transparent" />

      <div className="absolute left-8 top-1/3 z-10 w-[40%] space-y-5 md:left-16">
        <div className="h-12 w-3/4 rounded bg-zinc-800" />

        <div className="h-4 w-full rounded bg-zinc-800" />
        <div className="h-4 w-11/12 rounded bg-zinc-800" />
        <div className="h-4 w-4/5 rounded bg-zinc-800" />

        <div className="mt-8 flex gap-4">
          <div className="h-12 w-36 rounded-md bg-zinc-800" />
          <div className="h-12 w-40 rounded-md bg-zinc-800" />
        </div>
      </div>
    </div>
  );
};

export default MainSpinner;
