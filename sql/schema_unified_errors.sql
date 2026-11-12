-- robot-educatif.info — catalogue codes erreurs (MySQL 8 / MariaDB 10)
SET NAMES utf8mb4;
SET CHARACTER SET utf8mb4;

CREATE TABLE IF NOT EXISTS `device_categories` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `slug` VARCHAR(64) NOT NULL,
  `name_fr` VARCHAR(120) NOT NULL,
  `name_en` VARCHAR(120) NOT NULL,
  `name_de` VARCHAR(120) NOT NULL,
  `name_it` VARCHAR(120) NOT NULL,
  `name_es` VARCHAR(120) NOT NULL,
  `sort_order` INT NOT NULL DEFAULT 100,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uq_device_categories_slug` (`slug`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `brands` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `slug` VARCHAR(64) NOT NULL,
  `name` VARCHAR(120) NOT NULL,
  `is_affiliate_partner` TINYINT(1) NOT NULL DEFAULT 0,
  `priority_rank` INT NOT NULL DEFAULT 100,
  `official_site_url` VARCHAR(500) DEFAULT NULL,
  `support_url` VARCHAR(500) DEFAULT NULL,
  `support_email` VARCHAR(190) DEFAULT NULL,
  `support_phone` VARCHAR(64) DEFAULT NULL,
  `affiliate_default_url` VARCHAR(500) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uq_brands_slug` (`slug`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `products` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `slug` VARCHAR(96) NOT NULL,
  `brand_id` INT UNSIGNED NOT NULL,
  `category_id` INT UNSIGNED NOT NULL,
  `name` VARCHAR(180) NOT NULL,
  `protocol` VARCHAR(64) DEFAULT NULL,
  `official_doc_url` VARCHAR(500) DEFAULT NULL,
  `affiliate_url_fr` VARCHAR(500) DEFAULT NULL,
  `affiliate_url_en` VARCHAR(500) DEFAULT NULL,
  `affiliate_url_de` VARCHAR(500) DEFAULT NULL,
  `affiliate_url_it` VARCHAR(500) DEFAULT NULL,
  `affiliate_url_es` VARCHAR(500) DEFAULT NULL,
  `image_url` VARCHAR(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uq_products_slug` (`slug`),
  KEY `idx_products_brand` (`brand_id`),
  KEY `idx_products_category` (`category_id`),
  CONSTRAINT `fk_products_brand` FOREIGN KEY (`brand_id`) REFERENCES `brands` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `fk_products_category` FOREIGN KEY (`category_id`) REFERENCES `device_categories` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `error_codes` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `slug` VARCHAR(96) NOT NULL,
  `category_id` INT UNSIGNED NOT NULL,
  `brand_id` INT UNSIGNED NOT NULL,
  `product_id` INT UNSIGNED DEFAULT NULL,
  `error_code` VARCHAR(120) NOT NULL,
  `difficulty` TINYINT UNSIGNED NOT NULL DEFAULT 2,
  `estimated_time` VARCHAR(64) DEFAULT NULL,
  `estimated_cost` VARCHAR(64) DEFAULT NULL,
  `requires_official_sav` TINYINT(1) NOT NULL DEFAULT 0,
  `title_fr` VARCHAR(255) NOT NULL,
  `title_en` VARCHAR(255) NOT NULL,
  `title_de` VARCHAR(255) NOT NULL,
  `title_it` VARCHAR(255) NOT NULL,
  `title_es` VARCHAR(255) NOT NULL,
  `symptom_fr` TEXT NOT NULL,
  `symptom_en` TEXT NOT NULL,
  `symptom_de` TEXT NOT NULL,
  `symptom_it` TEXT NOT NULL,
  `symptom_es` TEXT NOT NULL,
  `solution_fr` TEXT NOT NULL,
  `solution_en` TEXT NOT NULL,
  `solution_de` TEXT NOT NULL,
  `solution_it` TEXT NOT NULL,
  `solution_es` TEXT NOT NULL,
  `tools_fr` VARCHAR(255) DEFAULT NULL,
  `tools_en` VARCHAR(255) DEFAULT NULL,
  `tools_de` VARCHAR(255) DEFAULT NULL,
  `tools_it` VARCHAR(255) DEFAULT NULL,
  `tools_es` VARCHAR(255) DEFAULT NULL,
  `safety_warning_fr` TEXT DEFAULT NULL,
  `safety_warning_en` TEXT DEFAULT NULL,
  `safety_warning_de` TEXT DEFAULT NULL,
  `safety_warning_it` TEXT DEFAULT NULL,
  `safety_warning_es` TEXT DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uq_error_codes_slug` (`slug`),
  KEY `idx_error_codes_category` (`category_id`),
  KEY `idx_error_codes_brand` (`brand_id`),
  KEY `idx_error_codes_product` (`product_id`),
  CONSTRAINT `fk_error_codes_category` FOREIGN KEY (`category_id`) REFERENCES `device_categories` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `fk_error_codes_brand` FOREIGN KEY (`brand_id`) REFERENCES `brands` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `fk_error_codes_product` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `error_code_applicable_products` (
  `error_code_id` INT UNSIGNED NOT NULL,
  `product_id` INT UNSIGNED NOT NULL,
  PRIMARY KEY (`error_code_id`, `product_id`),
  KEY `idx_ecap_product` (`product_id`),
  CONSTRAINT `fk_ecap_error` FOREIGN KEY (`error_code_id`) REFERENCES `error_codes` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_ecap_product` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `product_submissions` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `site` VARCHAR(64) NOT NULL DEFAULT 'robot-educatif.info',
  `lang` VARCHAR(8) DEFAULT NULL,
  `page_url` VARCHAR(500) DEFAULT NULL,
  `category_name` VARCHAR(120) DEFAULT NULL,
  `brand_name` VARCHAR(120) DEFAULT NULL,
  `product_name` VARCHAR(180) DEFAULT NULL,
  `error_code` VARCHAR(120) DEFAULT NULL,
  `description` TEXT,
  `visitor_email` VARCHAR(190) DEFAULT NULL,
  `ip_hash` VARCHAR(64) DEFAULT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_product_submissions_created` (`created_at`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
