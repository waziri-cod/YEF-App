/**
 * ============================================
 * SEARCH & FILTER COMPONENT
 * ============================================
 * Advanced search and filtering for marketplace and loans
 * Features: Client-side search, filtering, sorting
 */

import { useState, useMemo, useCallback } from "react";
import { Search, Filter, X, ChevronDown } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuCheckboxItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";

/**
 * Types for search and filter
 */
export interface SearchFilter {
  searchQuery: string;
  selectedCategory?: string;
  selectedStatus?: string;
  priceRange?: [number, number];
  sortBy?: string;
  selectedTags?: string[];
  location?: string;
}

export interface SearchableItem {
  id: string;
  title: string;
  description: string;
  category?: string;
  status?: string;
  price?: number;
  location?: string;
  tags?: string[];
  rating?: number;
  [key: string]: unknown;
}

interface SearchAndFilterProps {
  items: SearchableItem[];
  onItemsChange: (items: SearchableItem[]) => void;
  searchPlaceholder?: string;
  categories?: string[];
  statuses?: string[];
  tags?: string[];
  locations?: string[];
  showPriceFilter?: boolean;
  showLocationFilter?: boolean;
  showTagsFilter?: boolean;
  showSortBy?: boolean;
  maxPrice?: number;
}

/**
 * Search and Filter Component
 */
export function SearchAndFilter({
  items,
  onItemsChange,
  searchPlaceholder = "Search items...",
  categories = [],
  statuses = [],
  tags = [],
  locations = [],
  showPriceFilter = true,
  showLocationFilter = true,
  showTagsFilter = true,
  showSortBy = true,
  maxPrice = 10000000,
}: SearchAndFilterProps) {
  const [filters, setFilters] = useState<SearchFilter>({
    searchQuery: "",
    selectedCategory: "",
    selectedStatus: "",
    priceRange: [0, maxPrice],
    sortBy: "relevance",
    selectedTags: [],
    location: "",
  });

  const [isFilterOpen, setIsFilterOpen] = useState(false);

  /**
   * Filter and search items
   */
  const filteredItems = useMemo(() => {
    let result = [...items];

    // Text search
    if (filters.searchQuery) {
      const query = filters.searchQuery.toLowerCase();
      result = result.filter(
        (item) =>
          item.title.toLowerCase().includes(query) ||
          item.description.toLowerCase().includes(query) ||
          (item.tags && item.tags.some((tag) => tag.toLowerCase().includes(query)))
      );
    }

    // Category filter
    if (filters.selectedCategory) {
      result = result.filter((item) => item.category === filters.selectedCategory);
    }

    // Status filter
    if (filters.selectedStatus) {
      result = result.filter((item) => item.status === filters.selectedStatus);
    }

    // Price range filter
    if (showPriceFilter && filters.priceRange) {
      result = result.filter(
        (item) =>
          (item.price ?? 0) >= filters.priceRange![0] &&
          (item.price ?? 0) <= filters.priceRange![1]
      );
    }

    // Location filter
    if (showLocationFilter && filters.location) {
      result = result.filter(
        (item) =>
          item.location?.toLowerCase().includes(filters.location.toLowerCase())
      );
    }

    // Tags filter
    if (showTagsFilter && filters.selectedTags.length > 0) {
      result = result.filter((item) =>
        filters.selectedTags.every((tag) =>
          (item.tags ?? []).includes(tag)
        )
      );
    }

    // Sort results
    if (filters.sortBy === "price-low") {
      result.sort((a, b) => (a.price ?? 0) - (b.price ?? 0));
    } else if (filters.sortBy === "price-high") {
      result.sort((a, b) => (b.price ?? 0) - (a.price ?? 0));
    } else if (filters.sortBy === "rating") {
      result.sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0));
    } else if (filters.sortBy === "newest") {
      result.reverse();
    }

    return result;
  }, [
    items,
    filters,
    showPriceFilter,
    showLocationFilter,
    showTagsFilter,
  ]);

  /**
   * Update parent when filters change
   */
  useMemo(() => {
    onItemsChange(filteredItems);
  }, [filteredItems, onItemsChange]);

  /**
   * Reset all filters
   */
  const handleResetFilters = () => {
    setFilters({
      searchQuery: "",
      selectedCategory: "",
      selectedStatus: "",
      priceRange: [0, maxPrice],
      sortBy: "relevance",
      selectedTags: [],
      location: "",
    });
  };

  /**
   * Toggle tag selection
   */
  const toggleTag = (tag: string) => {
    setFilters((prev) => ({
      ...prev,
      selectedTags: prev.selectedTags?.includes(tag)
        ? prev.selectedTags.filter((t) => t !== tag)
        : [...(prev.selectedTags ?? []), tag],
    }));
  };

  /**
   * Remove individual tag
   */
  const removeTag = (tag: string) => {
    toggleTag(tag);
  };

  const activeFilterCount = [
    filters.searchQuery ? 1 : 0,
    filters.selectedCategory ? 1 : 0,
    filters.selectedStatus ? 1 : 0,
    filters.location ? 1 : 0,
    filters.selectedTags?.length ? 1 : 0,
  ].reduce((a, b) => a + b, 0);

  return (
    <div className="space-y-4">
      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder={searchPlaceholder}
          className="pl-10"
          value={filters.searchQuery}
          onChange={(e) =>
            setFilters((prev) => ({
              ...prev,
              searchQuery: e.target.value,
            }))
          }
        />
      </div>

      {/* Filter Controls */}
      <div className="flex flex-wrap gap-2 items-center">
        {/* Category Filter */}
        {categories.length > 0 && (
          <Select
            value={filters.selectedCategory || ""}
            onValueChange={(value) =>
              setFilters((prev) => ({
                ...prev,
                selectedCategory: value,
              }))
            }
          >
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All Categories</SelectItem>
              {categories.map((cat) => (
                <SelectItem key={cat} value={cat}>
                  {cat}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}

        {/* Status Filter */}
        {statuses.length > 0 && (
          <Select
            value={filters.selectedStatus || ""}
            onValueChange={(value) =>
              setFilters((prev) => ({
                ...prev,
                selectedStatus: value,
              }))
            }
          >
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All Statuses</SelectItem>
              {statuses.map((status) => (
                <SelectItem key={status} value={status}>
                  {status}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}

        {/* Location Filter */}
        {showLocationFilter && locations.length > 0 && (
          <Select
            value={filters.location || ""}
            onValueChange={(value) =>
              setFilters((prev) => ({
                ...prev,
                location: value,
              }))
            }
          >
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Location" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All Locations</SelectItem>
              {locations.map((loc) => (
                <SelectItem key={loc} value={loc}>
                  {loc}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}

        {/* Sort By */}
        {showSortBy && (
          <Select
            value={filters.sortBy || "relevance"}
            onValueChange={(value) =>
              setFilters((prev) => ({
                ...prev,
                sortBy: value,
              }))
            }
          >
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="relevance">Relevance</SelectItem>
              <SelectItem value="newest">Newest</SelectItem>
              {showPriceFilter && (
                <>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                </>
              )}
              <SelectItem value="rating">Highest Rated</SelectItem>
            </SelectContent>
          </Select>
        )}

        {/* Advanced Filters */}
        <DropdownMenu open={isFilterOpen} onOpenChange={setIsFilterOpen}>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              size="sm"
              className={cn(
                "gap-2",
                activeFilterCount > 0 && "border-primary"
              )}
            >
              <Filter className="h-4 w-4" />
              Filters
              {activeFilterCount > 0 && (
                <Badge variant="secondary" className="ml-1">
                  {activeFilterCount}
                </Badge>
              )}
              <ChevronDown className="h-4 w-4 transition-transform duration-200" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-56">
            {/* Price Filter */}
            {showPriceFilter && (
              <>
                <DropdownMenuLabel>Price Range</DropdownMenuLabel>
                <div className="px-4 py-3">
                  <Slider
                    value={filters.priceRange || [0, maxPrice]}
                    onValueChange={(value) =>
                      setFilters((prev) => ({
                        ...prev,
                        priceRange: value as [number, number],
                      }))
                    }
                    min={0}
                    max={maxPrice}
                    step={100000}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground mt-2">
                    <span>
                      {(filters.priceRange?.[0] ?? 0).toLocaleString()} TZS
                    </span>
                    <span>
                      {(filters.priceRange?.[1] ?? maxPrice).toLocaleString()} TZS
                    </span>
                  </div>
                </div>
                <DropdownMenuSeparator />
              </>
            )}

            {/* Tags Filter */}
            {showTagsFilter && tags.length > 0 && (
              <>
                <DropdownMenuLabel>Tags</DropdownMenuLabel>
                {tags.map((tag) => (
                  <DropdownMenuCheckboxItem
                    key={tag}
                    checked={filters.selectedTags?.includes(tag) ?? false}
                    onCheckedChange={() => toggleTag(tag)}
                  >
                    {tag}
                  </DropdownMenuCheckboxItem>
                ))}
              </>
            )}

            {/* Reset Filters */}
            {activeFilterCount > 0 && (
              <>
                <DropdownMenuSeparator />
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full justify-start text-xs"
                  onClick={handleResetFilters}
                >
                  Reset Filters
                </Button>
              </>
            )}
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Results Count */}
        <div className="ml-auto text-sm text-muted-foreground">
          {filteredItems.length} of {items.length} results
        </div>
      </div>

      {/* Selected Tags Display */}
      {(filters.selectedTags?.length ?? 0) > 0 && (
        <div className="flex flex-wrap gap-2">
          {filters.selectedTags?.map((tag) => (
            <Badge key={tag} variant="secondary" className="gap-1">
              {tag}
              <button
                onClick={() => removeTag(tag)}
                className="hover:text-foreground"
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          ))}
        </div>
      )}
    </div>
  );
}

export default SearchAndFilter;
