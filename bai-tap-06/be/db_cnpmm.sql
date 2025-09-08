CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `full_name` varchar(255) DEFAULT NULL,
  `age` int DEFAULT NULL,
  `avatar` varchar(255) DEFAULT NULL,
  `deletedBy` int NOT NULL DEFAULT '0',
  `isDeleted` tinyint(1) NOT NULL DEFAULT '0',
  `deletedAt` timestamp NULL DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `users` (`id`, `email`, `password`, `full_name`, `age`, `avatar`, `deletedBy`, `isDeleted`, `deletedAt`, `createdAt`, `updatedAt`) VALUES
(1, 'user1@example.com', '$2b$10$XGGBUqazGREbq0cwYQeQXuhiv.mjvxrR0YBEn4RPZaPzErVbmwq9q', 'Nguyễn Văn A', 25, 'avatar1.jpg', 0, 0, NULL, '2025-04-29 11:00:04', '2025-05-02 14:44:43'),
(2, 'user2@example.com', '$2b$10$XGGBUqazGREbq0cwYQeQXuhiv.mjvxrR0YBEn4RPZaPzErVbmwq9q', 'Trần Thị B', 30, 'avatar2.jpg', 0, 0, NULL, '2025-04-29 11:00:04', '2025-05-02 14:44:43'),
(3, 'user3@example.com', '$2b$10$XGGBUqazGREbq0cwYQeQXuhiv.mjvxrR0YBEn4RPZaPzErVbmwq9q', 'Lê Văn C', 28, 'avatar3.jpg', 0, 0, NULL, '2025-04-29 11:00:04', '2025-05-02 14:44:43'),
(4, 'vieet@gmai.com', '$2b$10$XGGBUqazGREbq0cwYQeQXuhiv.mjvxrR0YBEn4RPZaPzErVbmwq9q', 'vieet', 22, NULL, 0, 0, NULL, '2025-04-29 11:00:39', '2025-04-29 11:00:39'),
(5, 'viet@gmai.com', '$2b$10$oGv31GGyF/MgM3VqPMkTAueomiwMFW.ZG4hFZ..5tWOGly/pRX4vO', 'viet', 21, NULL, 0, 0, NULL, '2025-05-03 18:34:14', '2025-05-03 18:34:14'),
(6, 'vieeet@gmai.com', '$2b$10$zuYLHDU1D2tCFFVUvP.jAu80O87oERUTLIQmR/4/R7b7KZVoGxH9u', 'viet', 21, NULL, 0, 0, NULL, '2025-05-10 14:00:02', '2025-05-10 14:00:02'),
(7, 'viet1@gmai.com', '$2b$10$39nw9JaURytnZ.7GFE77iuFBTIm.U/PQtyp1LI8hECM9DOOP8oeyi', 'viet', 21, NULL, 0, 0, NULL, '2025-05-10 14:07:19', '2025-05-10 14:07:19'),
(8, 'viet2@gmai.com', '$2b$10$Ne01kk0GgccvWy8K8uakoOYiIX6zgFZrudaqFo0QXJtSDLCi3PtXq', 'viet', 21, NULL, 0, 0, NULL, '2025-05-10 14:11:47', '2025-05-10 14:11:47');

CREATE TABLE `categories` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL UNIQUE,
  `description` text DEFAULT NULL,
  `isDeleted` tinyint(1) NOT NULL DEFAULT '0',
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `categories` (`name`, `description`) VALUES
('Electronics', 'Electronic devices and gadgets'),
('Clothing', 'Fashion and apparel items'),
('Books', 'Books and educational materials'),
('Sports', 'Sports equipment and gear');

CREATE TABLE `products` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `price` decimal(10,2) NOT NULL,
  `discount` decimal(5,2) DEFAULT 0.00,
  `category_id` int NOT NULL,
  `user_id` int NOT NULL,
  `image_url` varchar(255) DEFAULT NULL,
  `views` int NOT NULL DEFAULT 0,
  `isDeleted` tinyint(1) NOT NULL DEFAULT '0',
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`category_id`) REFERENCES `categories`(`id`) ON DELETE CASCADE,
  FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `products` (`name`, `description`, `price`, `discount`, `category_id`, `user_id`, `image_url`, `views`) VALUES
-- Electronics
('Smartphone X1', 'Latest smartphone with 5G support', 699.99, 10.00, 1, 1, 'https://example.com/smartphone_x1.jpg', 150),
('Wireless Headphones', 'Noise-cancelling headphones', 129.99, 5.00, 1, 2, 'https://example.com/headphones.jpg', 80),
('Laptop Pro', 'High-performance laptop', 1299.99, 15.00, 1, 3, 'https://example.com/laptop_pro.jpg', 200),

-- Clothing
('T-Shirt Classic', 'Cotton t-shirt for casual wear', 19.99, 0.00, 2, 4, 'https://example.com/tshirt_classic.jpg', 50),
('Jacket Winter', 'Warm jacket for cold weather', 89.99, 20.00, 2, 5, 'https://example.com/jacket_winter.jpg', 120),
('Sneakers Black', 'Stylish black sneakers', 59.99, 10.00, 2, 6, 'https://example.com/sneakers_black.jpg', 90),

-- Books
('The Great Gatsby', 'Classic novel by F. Scott Fitzgerald', 12.99, 0.00, 3, 7, 'https://example.com/great_gatsby.jpg', 30),
('Python Programming', 'Beginner guide to Python', 29.99, 5.00, 3, 8, 'https://example.com/python_book.jpg', 70),

-- Sports
('Soccer Ball', 'Official size 5 soccer ball', 24.99, 0.00, 4, 1, 'https://example.com/soccer_ball.jpg', 60),
('Yoga Mat', 'Non-slip yoga mat', 19.99, 10.00, 4, 2, 'https://example.com/yoga_mat.jpg', 40);