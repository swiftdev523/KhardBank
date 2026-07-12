import { Search } from "lucide-react";

export default function UtilityBar() {
  return (
    <div className="bg-ink text-white/70 text-xs">
      <div className="max-w-7xl mx-auto px-4 md:px-8 flex items-center justify-between h-9">
        <nav aria-label="Site type" className="flex items-center gap-5">
          <span className="text-white font-medium border-b-2 border-brass pb-[9px] -mb-px">
            Personal
          </span>
          <a href="#business" className="hover:text-white transition-colors">
            Business
          </a>
        </nav>
        <div className="flex items-center gap-5">
          <a
            href="#talk-to-us"
            className="hidden sm:inline hover:text-white transition-colors">
            Talk to us
          </a>
          <a href="#support" className="hover:text-white transition-colors">
            Support
          </a>
          <button
            type="button"
            aria-label="Search"
            className="hover:text-white transition-colors">
            <Search size={14} aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>
  );
}
