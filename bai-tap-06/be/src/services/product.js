import prisma from "../common/prisma/init";

export const productService = {
  async filterProducts(params) {
    const {
      q,
      categoryId,
      minPrice,
      maxPrice,
      hasDiscount,
      sortBy = "views",
      sortOrder = "desc",
      page = 1,
      limit = 10,
    } = params;

    const offset = (page - 1) * limit;

    const whereClause = { isDeleted: false };

    if (minPrice) {
      whereClause.price = { ...whereClause.price, gte: parseFloat(minPrice) };
    }
    if (maxPrice) {
      whereClause.price = { ...whereClause.price, lte: parseFloat(maxPrice) };
    }
    if (categoryId && !isNaN(Number(categoryId))) {
      whereClause.category_id = Number(categoryId);
    }
    if (hasDiscount === "true" || hasDiscount === true) {
      whereClause.discount = { gt: 0 };
    }

    let products = await prisma.products.findMany({
      where: whereClause,
      orderBy: {
        [sortBy]: sortOrder === "asc" ? "asc" : "desc",
      },
    });

    if (q) {
      const Fuse = (await import("fuse.js")).default;
      const fuse = new Fuse(products, {
        keys: ["name"],
        threshold: 0,
      });
      const results = fuse.search(q);
      products = results.map((r) => r.item);
    }

    const total = products.length;

    const paginatedProducts = products.slice(offset, offset + Number(limit));

    return {
      data: paginatedProducts,
      total,
      page: Number(page),
      limit: Number(limit),
    };
  },
};
