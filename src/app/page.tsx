import SearchResult from "@/components/SearchResult"
import BeerMap from "@/components/BeerMap"

export default function Home() {
  return (
    <main className="">
      <div className="absolute z-10 top-5 left-5 bottom-10 bg-white w-80 rounded-md shadow-md">
        <div className="pt-3 pl-3 pr-3 space-y-3">
          <SearchResult />
          <SearchResult />
          <SearchResult />
          <SearchResult />
          <SearchResult />
          <SearchResult />
          <SearchResult />
        </div>
      </div>

      <div className="w-screen h-screen">
        <BeerMap />
      </div>
    </main>
  );
}
