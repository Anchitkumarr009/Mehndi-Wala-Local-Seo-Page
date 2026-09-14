"use client";

import React, { useState, useEffect } from "react";
import { Link2, Search, X, Check, MapPin } from "lucide-react";

interface LocalityOption {
  id: string;
  localityLabel: string;
  districtLabel: string;
  cityLabel: string;
  countryLabel: string;
  url: string;
  searchKey: string;
}

interface InterlinksCardProps {
  currentId?: string;
  selectedIds: string[];
  onChange: (ids: string[]) => void;
}

export const InterlinksCard: React.FC<InterlinksCardProps> = ({
  currentId,
  selectedIds,
  onChange,
}) => {
  const [options, setOptions] = useState<LocalityOption[]>([]);
  const [search, setSearch] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadLocalities() {
      try {
        const res = await fetch("/api/pages/interlinks");
        const data = await res.json();
        if (data.localities) {
          // Filter out the current page if editing
          const filtered = data.localities.filter((l: LocalityOption) => l.id !== currentId);
          setOptions(filtered);
        }
      } catch (err) {
        console.error("Failed to load interlinks:", err);
      } finally {
        setLoading(false);
      }
    }
    loadLocalities();
  }, [currentId]);

  const filteredOptions = options.filter((opt) =>
    opt.searchKey.includes(search.toLowerCase().trim())
  );

  const toggleSelect = (id: string) => {
    if (selectedIds.includes(id)) {
      onChange(selectedIds.filter((item) => item !== id));
    } else {
      onChange([...selectedIds, id]);
    }
  };

  const removeId = (id: string) => {
    onChange(selectedIds.filter((item) => item !== id));
  };

  const selectedLocalities = options.filter((opt) => selectedIds.includes(opt.id));

  return (
    <div className="bg-card border border-line rounded-sharp p-6 shadow-sm">
      <div className="flex items-center gap-2 pb-3 border-b border-line mb-3">
        <Link2 className="w-4 h-4 text-stain" />
        <h3 className="font-serif font-semibold text-base text-ink m-0">
          Interlinking &amp; Nearby Localities ({selectedIds.length} Selected)
        </h3>
      </div>

      <p className="text-xs text-ink-soft mb-4 leading-relaxed">
        Select other locality pages to cross-link. These will appear in this page&apos;s footer
        interlink card (&quot;Explore Nearby Areas&quot;) and in the sitewide footer&apos;s
        &quot;Nearby Localities&quot; column.
      </p>

      {/* Selected Chips */}
      <div className="flex flex-wrap gap-2 mb-4 min-h-[38px] p-2 bg-parchment/60 border border-line rounded-sharp">
        {selectedLocalities.length === 0 ? (
          <span className="text-xs text-ink-soft/70 py-1">
            No interlinks selected yet. Use the search dropdown below to select nearby localities.
          </span>
        ) : (
          selectedLocalities.map((item) => (
            <span
              key={item.id}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold bg-white text-ink border border-line rounded-sharp shadow-2xs"
            >
              <MapPin className="w-3 h-3 text-stain" />
              <span>
                {item.localityLabel} ({item.districtLabel})
              </span>
              <button
                type="button"
                onClick={() => removeId(item.id)}
                className="text-ink-soft hover:text-red-700 p-0.5 ml-1"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          ))
        )}
      </div>

      {/* Search Input & Dropdown */}
      <div className="relative">
        <div className="relative">
          <Search className="w-4 h-4 text-ink-soft absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Search localities by name, district, or city..."
            value={search}
            onFocus={() => setIsDropdownOpen(true)}
            onChange={(e) => {
              setSearch(e.target.value);
              setIsDropdownOpen(true);
            }}
            className="w-full pl-9 pr-3 py-2 text-xs bg-white border border-line rounded-sharp text-ink focus:outline-none focus:border-stain"
          />
        </div>

        {/* Dropdown Menu */}
        {isDropdownOpen && (
          <>
            <div
              className="fixed inset-0 z-10"
              onClick={() => setIsDropdownOpen(false)}
            />
            <div className="absolute top-full left-0 right-0 z-20 mt-1 max-h-60 overflow-y-auto bg-white border border-line rounded-sharp shadow-lg divide-y divide-line">
              {loading ? (
                <div className="p-3 text-center text-xs text-ink-soft">
                  Loading localities...
                </div>
              ) : filteredOptions.length === 0 ? (
                <div className="p-3 text-center text-xs text-ink-soft">
                  No matching localities found.
                </div>
              ) : (
                filteredOptions.map((opt) => {
                  const isSelected = selectedIds.includes(opt.id);
                  return (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => toggleSelect(opt.id)}
                      className={`w-full text-left p-2.5 text-xs flex items-center justify-between hover:bg-parchment transition-colors ${
                        isSelected ? "bg-parchment/60 font-bold" : ""
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <MapPin className="w-3.5 h-3.5 text-stain flex-shrink-0" />
                        <div>
                          <div className="text-ink font-semibold">
                            {opt.localityLabel}
                          </div>
                          <div className="text-[0.68rem] text-ink-soft">
                            {opt.districtLabel}, {opt.cityLabel}
                          </div>
                        </div>
                      </div>
                      {isSelected && (
                        <span className="flex items-center gap-1 text-[0.7rem] text-stain font-bold">
                          <Check className="w-3.5 h-3.5" />
                          <span>Selected</span>
                        </span>
                      )}
                    </button>
                  );
                })
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};
