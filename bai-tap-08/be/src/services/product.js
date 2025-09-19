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
      skip: offset,
      take: Number(limit),
    });

    const total = await prisma.products.count({ where: whereClause });

    if (q) {
      const Fuse = (await import("fuse.js")).default;
      const fuse = new Fuse(products, {
        keys: ["name", "description"],
        threshold: 0.3,
      });
      const results = fuse.search(q);
      products = results.map((r) => r.item);
    }

    return { data: products, total, page: Number(page), limit: Number(limit) };
  },
};
