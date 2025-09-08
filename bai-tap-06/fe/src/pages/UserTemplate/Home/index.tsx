import React, { useState, useEffect } from "react";
import axios from "axios";
import InfiniteScroll from "react-infinite-scroll-component";

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  discount: number;
  image_url?: string;
  views: number;
}

const Home: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const [filters, setFilters] = useState({
    categoryId: 0,
    minPrice: 0,
    maxPrice: 0,
    hasDiscount: false,
    sortBy: "views",
    sortOrder: "desc",
  });

  const limit = 8;

  const normalizeProducts = (items: any[]): Product[] => {
    return items.map((p) => ({
      ...p,
      price: Number(p.price),
      discount: Number(p.discount),
      views: Number(p.views),
    }));
  };

  const fetchProducts = async (pageToFetch: number, reset = false) => {
    try {
      const res = await axios.get("http://localhost:3069/api/product/filter", {
        params: {
          q: query || undefined,
          categoryId: filters.categoryId || undefined,
          minPrice: filters.minPrice || undefined,
          maxPrice: filters.maxPrice || undefined,
          hasDiscount: filters.hasDiscount,
          sortBy: filters.sortBy,
          sortOrder: filters.sortOrder,
          page: pageToFetch,
          limit,
        },
      });

      const { data: responseData, total } = res.data.data || {
        data: [],
        total: 0,
      };

      if (!Array.isArray(responseData)) {
        throw new Error("Dữ liệu từ API không phải là mảng");
      }

      const normalized = normalizeProducts(responseData);

      if (reset) {
        setProducts(normalized);
      } else {
        setProducts((prev) => [...prev, ...normalized]);
      }

      setHasMore(
        (reset ? normalized.length : products.length + normalized.length) <
          total
      );
      setPage(pageToFetch);
    } catch (err) {
      console.error("Fetch error:", err);
      setError((err as Error).message || "Lỗi khi tải sản phẩm");
    }
  };

  useEffect(() => {
    fetchProducts(1, true);
  }, [filters]);

  const loadMore = () => {
    fetchProducts(page + 1, false);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    fetchProducts(1, true);
  };

  const handleFilterChange = (key: string, value: any) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div className="container mx-auto px-6 py-6 grid grid-cols-1 md:grid-cols-4 gap-6">
      <aside className="md:col-span-1">
        <div className="sticky top-24 bg-white p-5 rounded-2xl shadow-lg">
          <h3 className="text-xl font-bold mb-5 text-gray-700">Bộ lọc</h3>

          <div className="mb-5">
            <label className="block text-sm font-medium mb-1">Danh mục</label>
            <select
              value={filters.categoryId}
              onChange={(e) =>
                handleFilterChange("categoryId", Number(e.target.value))
              }
              className="w-full p-2 border rounded-lg"
            >
              <option value={0}>Tất cả</option>
              <option value={1}>Electronics</option>
              <option value={2}>Clothing</option>
              <option value={3}>Books</option>
              <option value={4}>Sports</option>
            </select>
          </div>

          <div className="mb-5">
            <label className="block text-sm font-medium mb-1">Giá từ</label>
            <input
              type="number"
              placeholder="0"
              value={filters.minPrice || ""}
              onChange={(e) =>
                handleFilterChange(
                  "minPrice",
                  e.target.value ? Number(e.target.value) : 0
                )
              }
              className="w-full p-2 border rounded-lg"
            />
          </div>

          <div className="mb-5">
            <label className="block text-sm font-medium mb-1">Đến</label>
            <input
              type="number"
              placeholder="..."
              value={filters.maxPrice || ""}
              onChange={(e) =>
                handleFilterChange(
                  "maxPrice",
                  e.target.value ? Number(e.target.value) : 0
                )
              }
              className="w-full p-2 border rounded-lg"
            />
          </div>

          <div className="mb-5 flex items-center gap-2">
            <input
              type="checkbox"
              checked={filters.hasDiscount}
              onChange={(e) =>
                handleFilterChange("hasDiscount", e.target.checked)
              }
            />
            <span className="text-sm">Có khuyến mãi</span>
          </div>

          {/* Sắp xếp */}
          <div className="mb-5">
            <label className="block text-sm font-medium mb-1">
              Sắp xếp theo
            </label>
            <select
              value={filters.sortBy}
              onChange={(e) => handleFilterChange("sortBy", e.target.value)}
              className="w-full p-2 border rounded-lg"
            >
              <option value="views">Lượt xem</option>
              <option value="price">Giá</option>
              <option value="discount">Khuyến mãi</option>
            </select>
          </div>

          {/* Thứ tự */}
          <div>
            <label className="block text-sm font-medium mb-1">Thứ tự</label>
            <select
              value={filters.sortOrder}
              onChange={(e) => handleFilterChange("sortOrder", e.target.value)}
              className="w-full p-2 border rounded-lg"
            >
              <option value="desc">Giảm dần</option>
              <option value="asc">Tăng dần</option>
            </select>
          </div>
        </div>
      </aside>

      <section className="md:col-span-3">
        <div className="flex justify-end mb-6">
          <input
            type="text"
            value={query}
            onChange={handleSearch}
            placeholder="🔍 Tìm kiếm..."
            className="w-full md:w-1/2 p-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        <InfiniteScroll
          dataLength={products.length}
          next={loadMore}
          hasMore={hasMore}
          loader={<h4 className="text-center text-gray-500">Đang tải...</h4>}
          endMessage={
            <p className="text-center text-gray-500">Đã hết dữ liệu!</p>
          }
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.length > 0 ? (
              products.map((product) => (
                <div
                  key={product.id}
                  className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl hover:scale-105 transition-transform duration-300"
                >
                  <div className="relative">
                    {product.image_url ? (
                      <img
                        src={product.image_url}
                        alt={product.name}
                        className="w-full h-52 object-cover"
                      />
                    ) : (
                      <div className="w-full h-52 bg-gray-100 flex items-center justify-center text-gray-400">
                        No Image
                      </div>
                    )}
                    {product.discount > 0 && (
                      <span className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow">
                        -{product.discount}%
                      </span>
                    )}
                  </div>

                  <div className="p-4">
                    <h3 className="text-lg font-semibold truncate mb-1">
                      {product.name}
                    </h3>
                    <p className="text-sm text-gray-500 line-clamp-2 mb-3">
                      {product.description}
                    </p>

                    <div className="flex items-center gap-2 mb-2">
                      {product.discount > 0 ? (
                        <>
                          <span className="text-gray-400 line-through text-sm">
                            ${Number(product.price).toFixed(2)}
                          </span>
                          <span className="text-green-600 font-bold">
                            $
                            {(
                              Number(product.price) *
                              (1 - product.discount / 100)
                            ).toFixed(2)}
                          </span>
                        </>
                      ) : (
                        <span className="text-green-600 font-bold">
                          ${Number(product.price).toFixed(2)}
                        </span>
                      )}
                    </div>

                    <div className="text-gray-400 text-sm mb-3">
                      👀 {product.views} lượt xem
                    </div>

                    <button className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-2 px-4 rounded-full hover:from-blue-600 hover:to-blue-700 transition-colors shadow-md">
                      Xem chi tiết
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-500">
                Không có sản phẩm để hiển thị.
              </p>
            )}
          </div>
        </InfiniteScroll>
      </section>
    </div>
  );
};

export default Home;
