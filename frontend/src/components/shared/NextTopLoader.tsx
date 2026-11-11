import NextTopLoader from "nextjs-toploader";

export default function NextJsTopLoader() {
  return (
    <NextTopLoader
      color="var(--color-main)"
      initialPosition={0.08}
      crawlSpeed={200}
      height={3}
      crawl={true}
      showSpinner={true}
      easing="ease"
      speed={200}
      shadow="0 0 10px #65b545,0 0 5px #000"
    />
  );
}