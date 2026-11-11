
export const config = {
  serverBaseApi: process.env.SERVER_BASE_API || "http://localhost:5133",
  clientBaseApi: process.env.NEXT_PUBLIC_BASE_API || "http://localhost:5133",
  hasSSL: process.env.HAS_SSL === "true",
  env: (process.env.NEXT_PUBLIC_production || "dev") as "production" | "dev"
};

export const placeHolderBlurImg = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAASwAAACoCAMAAABt9SM9AAAAA1BMVEWnpaaXiDhOAAAAR0lEQVR4nO3BAQEAAACCIP+vbkhAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAO8GxYgAAb0jQ/cAAAAASUVORK5CYII='


export const variantBadgeList = [
  { value: "BEST_VALUE", label: "Best Value" },
  { value: "MOST_POPULAR", label: "Most Popular" },
  { value: "BEST_SELLER", label: "Best Seller" },
  { value: "BEST_DEAL", label: "Best Deal" },
  { value: "PREMIUM", label: "Premium" },
  { value: "RECOMMENDED", label: "Recommended" },
  { value: "NEW", label: "New" },
  { value: "LIMITED_STOCK", label: "Limited Stock" },
  { value: "TRENDING", label: "Trending" },
  { value: "EXCLUSIVE", label: "Exclusive" },
  { value: "SPECIAL_OFFER", label: "Special Offer" },
  { value: "TOP_PICK", label: "Top Pick" }
]