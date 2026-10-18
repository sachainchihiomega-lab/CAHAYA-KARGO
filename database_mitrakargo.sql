-- ==============================================================================
-- DATABASE SCHEMA & SEED DATA RESMI
-- PERUSAHAAN : PT Samudra Lintas Artha (Mitra Kargo)
-- DOMAIN     : https://mitrakargo.net/
-- WHATSAPP   : 087882621638 (+6287882621638)
-- HOSTING    : Rumahweb (RW MANASLU ENT) | User: mitr3369
-- DATABASE   : MariaDB 10.11 / MySQL 5.7+ / cPanel phpMyAdmin
-- ==============================================================================
--
-- PANDUAN PENTING CARA IMPOR DI CPANEL RUMAHWEB AGAR TIDAK ERROR:
--
-- 1. Buka cPanel (https://mitrakargo.net/cpanel atau melalui ClientZone Rumahweb).
-- 2. Buka menu "MySQL® Databases":
--    - Buat database baru (misal: "mitr3369_kargo").
--    - Buat user baru (misal: "mitr3369_user" beserta passwordnya).
--    - Hubungkan User ke Database di bagian "Add User To Database", centang "ALL PRIVILEGES", lalu klik "Make Changes".
-- 3. Buka menu "phpMyAdmin" dari cPanel.
-- 4. [SANGAT PENTING - MENCEGAH ERROR "No database selected"]:
--    Di kolom sebelah kiri phpMyAdmin, KLIK NAMA DATABASE ANDA (contoh: mitr3369_kargo) sampai terbuka!
-- 5. Setelah nama database aktif, klik tab "Import" di menu atas.
-- 6. Pilih file "database_mitrakargo.sql" ini, lalu klik "Go" / "Kirim".
--    Atau klik tab "SQL", salin seluruh isi file ini, dan klik "Go".
-- ==============================================================================

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

-- --------------------------------------------------------
-- Table structure for table `company_profile`
-- --------------------------------------------------------
DROP TABLE IF EXISTS `company_profile`;
CREATE TABLE `company_profile` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL DEFAULT 'PT Samudra Lintas Artha',
  `short_name` varchar(100) NOT NULL DEFAULT 'Mitra Kargo',
  `tagline` varchar(255) NOT NULL DEFAULT 'Solusi Logistik & Ekspedisi Terpercaya Seluruh Nusantara',
  `phone` varchar(50) NOT NULL DEFAULT '+62 878-8262-1638',
  `whatsapp` varchar(50) NOT NULL DEFAULT '6287882621638',
  `email` varchar(100) NOT NULL DEFAULT 'info@mitrakargo.net',
  `website` varchar(100) NOT NULL DEFAULT 'https://mitrakargo.net',
  `address` text DEFAULT NULL,
  `operating_hours` varchar(255) NOT NULL DEFAULT 'Senin - Sabtu: 08.00 - 21.00 WIB (Customer Support 24/7)',
  `instagram` varchar(255) DEFAULT 'https://instagram.com/mitrakargo.net',
  `facebook` varchar(255) DEFAULT 'https://facebook.com/mitrakargoid',
  `linkedin` varchar(255) DEFAULT 'https://linkedin.com/company/samudra-lintas-artha',
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `company_profile` (`id`, `name`, `short_name`, `tagline`, `phone`, `whatsapp`, `email`, `website`, `address`, `operating_hours`, `instagram`, `facebook`, `linkedin`) VALUES
(1, 'PT Samudra Lintas Artha', 'Mitra Kargo', 'Solusi Logistik & Ekspedisi Terpercaya Seluruh Nusantara', '+62 878-8262-1638', '6287882621638', 'info@mitrakargo.net', 'https://mitrakargo.net', 'Kawasan Pergudangan Logistik Terpadu Blok A5 No. 12, Jl. Cakung Cilincing Raya, Jakarta Utara 14120', 'Senin - Sabtu: 08.00 - 21.00 WIB (Customer Support 24/7)', 'https://instagram.com/mitrakargo.net', 'https://facebook.com/mitrakargoid', 'https://linkedin.com/company/samudra-lintas-artha');

-- --------------------------------------------------------
-- Table structure for table `admin_users`
-- --------------------------------------------------------
DROP TABLE IF EXISTS `admin_users`;
CREATE TABLE `admin_users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `role` varchar(50) NOT NULL DEFAULT 'SUPERADMIN',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `admin_users` (`id`, `username`, `email`, `role`) VALUES
(1, 'ADMIN', 'info@mitrakargo.net', 'SUPERADMIN'),
(2, 'mitr3369', 'info@mitrakargo.net', 'CPANEL_ADMIN');

-- --------------------------------------------------------
-- Table structure for table `shipping_rates`
-- --------------------------------------------------------
DROP TABLE IF EXISTS `shipping_rates`;
CREATE TABLE `shipping_rates` (
  `id` varchar(50) NOT NULL,
  `origin` varchar(100) NOT NULL,
  `destination` varchar(100) NOT NULL,
  `service_type` varchar(20) NOT NULL,
  `price_per_kg` decimal(12,2) NOT NULL,
  `min_weight_kg` int(11) NOT NULL DEFAULT 50,
  `estimated_days` varchar(50) NOT NULL,
  `is_popular` tinyint(1) DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `shipping_rates` (`id`, `origin`, `destination`, `service_type`, `price_per_kg`, `min_weight_kg`, `estimated_days`, `is_popular`) VALUES
('rate-1', 'Jakarta (Jabodetabek)', 'Surabaya', 'darat', 2500.00, 50, '2-3 Hari (Trans Jawa)', 1),
('rate-2', 'Jakarta (Jabodetabek)', 'Surabaya', 'laut', 1800.00, 100, '3-4 Hari (Kapal RoRo)', 0),
('rate-3', 'Jakarta (Jabodetabek)', 'Surabaya', 'udara', 18500.00, 10, '1 Hari (Next Day)', 0),
('rate-4', 'Jakarta (Jabodetabek)', 'Medan', 'laut', 4500.00, 50, '4-6 Hari (Pelabuhan Belawan)', 1),
('rate-5', 'Jakarta (Jabodetabek)', 'Medan', 'darat', 5500.00, 100, '5-7 Hari (Lintas Sumatera)', 0),
('rate-6', 'Jakarta (Jabodetabek)', 'Makassar', 'laut', 3800.00, 50, '4-6 Hari (Kapal Cepat)', 1),
('rate-7', 'Jakarta (Jabodetabek)', 'Balikpapan', 'laut', 4200.00, 50, '4-5 Hari (IKN Hub)', 1),
('rate-8', 'Jakarta (Jabodetabek)', 'Semarang', 'darat', 2200.00, 50, '1-2 Hari', 0),
('rate-9', 'Jakarta (Jabodetabek)', 'Denpasar (Bali)', 'darat', 3500.00, 50, '3-4 Hari', 1),
('rate-10', 'Surabaya', 'Banjarmasin', 'laut', 3200.00, 50, '3-4 Hari', 1),
('rate-11', 'Surabaya', 'Makassar', 'laut', 2900.00, 50, '2-3 Hari', 1),
('rate-12', 'Jakarta (Jabodetabek)', 'Pontianak', 'laut', 3900.00, 50, '3-4 Hari (Kapal RoRo)', 1),
('rate-13', 'Jakarta (Jabodetabek)', 'Palembang', 'darat', 3200.00, 50, '2-3 Hari', 0),
('rate-14', 'Jakarta (Jabodetabek)', 'Pekanbaru', 'darat', 4500.00, 50, '4-5 Hari', 0),
('rate-15', 'Jakarta (Jabodetabek)', 'Batam', 'laut', 4200.00, 50, '3-5 Hari', 1);

-- --------------------------------------------------------
-- Table structure for table `tracking_shipments`
-- --------------------------------------------------------
DROP TABLE IF EXISTS `tracking_shipments`;
CREATE TABLE `tracking_shipments` (
  `id` varchar(50) NOT NULL,
  `resi_number` varchar(50) NOT NULL,
  `sender_name` varchar(150) NOT NULL,
  `sender_phone` varchar(50) NOT NULL,
  `sender_city` varchar(100) NOT NULL,
  `recipient_name` varchar(150) NOT NULL,
  `recipient_phone` varchar(50) NOT NULL,
  `recipient_city` varchar(100) NOT NULL,
  `recipient_address` text DEFAULT NULL,
  `service_type` varchar(20) NOT NULL,
  `weight_kg` decimal(10,2) NOT NULL,
  `volume_cbm` decimal(10,3) DEFAULT NULL,
  `goods_type` varchar(150) NOT NULL,
  `status` varchar(50) NOT NULL,
  `current_location` varchar(150) NOT NULL,
  `estimated_arrival` varchar(100) NOT NULL,
  `driver_name` varchar(100) DEFAULT NULL,
  `driver_phone` varchar(50) DEFAULT NULL,
  `fleet_plate` varchar(50) DEFAULT NULL,
  `created_at` varchar(50) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `resi_number` (`resi_number`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `tracking_shipments` (`id`, `resi_number`, `sender_name`, `sender_phone`, `sender_city`, `recipient_name`, `recipient_phone`, `recipient_city`, `recipient_address`, `service_type`, `weight_kg`, `goods_type`, `status`, `current_location`, `estimated_arrival`, `driver_name`, `driver_phone`, `fleet_plate`, `created_at`) VALUES
('ship-1', 'MK-889210', 'PT Indoprima Tehnik', '08119827364', 'Jakarta (Jabodetabek)', 'CV Sinar Baja Makmur', '08123984711', 'Surabaya', 'Jl. Rungkut Industri Raya No. 45, Kawasan SIER, Surabaya', 'darat', 280.00, 'Sparepart Mesin Industri & Bearing', 'dalam_perjalanan', 'Hub Distribusi Semarang - Tol Trans Jawa KM 424', '18 Okt 2026', 'Joko Purwanto', '087882621638', 'B 9142 UXT (CDD Long Box)', '15 Okt 2026, 09:30 WIB'),
('ship-2', 'MK-772154', 'CV Makmur Sentosa Kimia', '08138291029', 'Jakarta (Jabodetabek)', 'PT Celebes Mineral Utama', '08527819200', 'Makassar', 'Kawasan Industri Makassar (KIMA) Kavling 8, Daya, Makassar', 'laut', 1450.00, 'Drum Kimia Cair Industri (Non-DG)', 'transit_hub', 'Dermaga Petikemas Pelabuhan Tanjung Perak Surabaya', '21 Okt 2026', 'Capt. Agus Supriyadi', '087882621638', 'KM Dharma Kencana VII', '14 Okt 2026, 11:00 WIB'),
('ship-3', 'MK-902341', 'PT Graha Medika Sejahtera', '08129837162', 'Jakarta (Jabodetabek)', 'RSUD Kanujoso Djatiwibowo', '08137788990', 'Balikpapan', 'Jl. MT Haryono No. 138, Balikpapan Selatan', 'udara', 45.00, 'Alat Kesehatan & Reagen Laboratorium', 'terkirim', 'Penerima: Dr. Maya R. (Bagian Farmasi RSUD)', '17 Okt 2026 (Tepat Waktu)', 'Kurir Kargo Express', '087882621638', 'B 1092 PKS', '16 Okt 2026, 14:00 WIB');

-- --------------------------------------------------------
-- Table structure for table `logistics_articles`
-- --------------------------------------------------------
DROP TABLE IF EXISTS `logistics_articles`;
CREATE TABLE `logistics_articles` (
  `id` varchar(50) NOT NULL,
  `title` varchar(255) NOT NULL,
  `slug` varchar(255) NOT NULL,
  `category` varchar(100) NOT NULL,
  `excerpt` text DEFAULT NULL,
  `cover_image` varchar(255) NOT NULL,
  `author` varchar(100) NOT NULL,
  `author_role` varchar(100) NOT NULL,
  `read_time_minutes` int(11) NOT NULL DEFAULT 5,
  `target_keywords` varchar(255) DEFAULT NULL,
  `meta_description` text DEFAULT NULL,
  `status` varchar(20) NOT NULL DEFAULT 'dipublikasikan',
  `views_count` int(11) NOT NULL DEFAULT 0,
  `shares_count` int(11) NOT NULL DEFAULT 0,
  `published_at` varchar(50) NOT NULL,
  `seo_score` int(11) NOT NULL DEFAULT 95,
  `content` longtext DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `slug` (`slug`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `logistics_articles` (`id`, `title`, `slug`, `category`, `excerpt`, `cover_image`, `author`, `author_role`, `read_time_minutes`, `target_keywords`, `meta_description`, `status`, `views_count`, `shares_count`, `published_at`, `seo_score`, `content`) VALUES
('art-1', 'Panduan Lengkap Standar Packing Kayu & Bubble Wrap Kargo: Proteksi Maksimal Alat Berat, Mesin & Elektronik Antar Pulau', 'panduan-standar-packing-kayu-kargo-mesin-elektronik-antar-pulau', 'Tips Packing', 'Pelajari SOP packing kayu berstandar ISPM 15, ketebalan bubble wrap berlapis, silica gel anti-kelembaban laut, dan teknik strapping pallet untuk mencegah risiko benturan selama pengiriman darat dan laut.', 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80', 'Tim Ahli Kemasan Mitra Kargo', 'Senior Packaging Specialist', 6, 'tips packing kayu kargo, packing barang elektronik ekspedisi, standar packing bubble wrap antar pulau', 'Panduan teknis pengemasan kargo berat dan barang pecah belah dengan peti kayu berstandar ISPM 15 dari PT Samudra Lintas Artha.', 'dipublikasikan', 1420, 88, '15 Okt 2026', 96, '## SOP Standar Packing Kayu Mitra Kargo\n\nPengiriman kargo antar pulau membutuhkan proteksi maksimal dengan rangka kayu sengon/meranti berstandar ISPM 15, bubble wrap tebal, dan stretch film kedap air.'),
('art-2', 'Info Terkini Pelabuhan Tanjung Priok, Tanjung Perak & Makassar: Jadwal Kapal Roro, Estimasi Dwell Time & Alur Gate-In 2026', 'info-pelabuhan-tanjung-priok-perak-makassar-jadwal-roro-dwell-time-2026', 'Info Pelabuhan', 'Simak jadwal rutin kapal roro ekspedisi dari Jakarta dan Surabaya ke Makassar, Balikpapan, Banjarmasin dan Pontianak.', 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=1200&q=80', 'Capt. Hendro Wibowo', 'Port & Marine Logistics Coordinator', 7, 'jadwal kapal roro kargo jakarta surabaya makassar, dwell time tanjung priok perak 2026', 'Jadwal rutin kapal roro kargo PT Samudra Lintas Artha untuk rute Jakarta-Pontianak, Surabaya-Makassar, dan Balikpapan.', 'dipublikasikan', 2310, 142, '12 Okt 2026', 98, '### Rute Kapal RoRo Mitra Kargo\n\nJadwal berlayar 3x hingga 5x seminggu menghubungkan Tanjung Priok, Tanjung Perak, dan Soekarno-Hatta Makassar.'),
('art-3', 'Update Regulasi Kemenhub & Bea Cukai 2026: Batas Muatan Truk Zero ODOL, Sertifikasi Kargo Kimia Cair & Ketentuan Pengiriman ke Wilayah IKN', 'update-regulasi-kemenhub-zero-odol-kargo-kimia-cair-ikn-nusantara-2026', 'Update Regulasi', 'Ketahui poin penting penegakan tilang elektronik Weigh-in-Motion (WIM) di jalan tol, syarat lembar data keselamatan (MSDS) barang kimia, dan izin IKN.', 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&w=1200&q=80', 'Bambang Kusuma, S.T., M.Log', 'Head of Compliance & Regulatory Affairs', 8, 'regulasi odol kemenhub 2026, aturan muatan truk odol jalan tol, syarat kirim cairan kimia kargo', 'Aturan resmi Zero ODOL Kemenhub dan syarat logistik proyek IKN Nusantara dari PT Samudra Lintas Artha.', 'dipublikasikan', 1890, 115, '09 Okt 2026', 97, '## Kepatuhan Regulasi Kargo Indonesia 2026\n\nSemua armada PT Samudra Lintas Artha 100% mematuhi batas dimensi dan tonase legal Kementerian Perhubungan.'),
('art-4', 'Strategi Jitu Menghitung Rumus Berat Volume (Dimensi) Kargo Darat, Laut & Udara: Hemat Biaya Kirim Barang Ringan Berukuran Besar', 'strategi-menghitung-rumus-berat-volume-dimensi-kargo-darat-laut-udara', 'Panduan Logistik', 'Kupas tuntas rumus perhitungan berat volume: pembagi 4.000 untuk darat, 6.000 untuk kargo udara, dan kubikasi CBM (m3) kargo laut.', 'https://images.unsplash.com/photo-1553413077-190dd305871c?auto=format&fit=crop&w=1200&q=80', 'Dedi Kurniawan', 'Pricing & Operations Analyst', 5, 'rumus volume kargo darat 4000, rumus hitung volume kargo udara 6000, cara hitung cbm kargo laut', 'Cara menghitung volumetrik kargo darat PxLxT/4000, udara PxLxT/6000, dan kubikasi CBM di mitrakargo.net.', 'dipublikasikan', 1670, 94, '05 Okt 2026', 99, '## Rumus Berat Volume Kargo\n\nKargo Darat = (PxLxT)/4000. Kargo Udara = (PxLxT)/6000. CBM = (PxLxT)/1.000.000.');

-- --------------------------------------------------------
-- Table structure for table `testimonials`
-- --------------------------------------------------------
DROP TABLE IF EXISTS `testimonials`;
CREATE TABLE `testimonials` (
  `id` varchar(50) NOT NULL,
  `name` varchar(150) NOT NULL,
  `role_or_company` varchar(150) NOT NULL,
  `city` varchar(100) NOT NULL,
  `rating` int(11) NOT NULL DEFAULT 5,
  `service_type` varchar(50) NOT NULL,
  `comment` text DEFAULT NULL,
  `status` varchar(50) NOT NULL DEFAULT 'disetujui',
  `created_at` varchar(50) NOT NULL,
  `is_verified_buyer` tinyint(1) DEFAULT 1,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `testimonials` (`id`, `name`, `role_or_company`, `city`, `rating`, `service_type`, `comment`, `status`, `created_at`, `is_verified_buyer`) VALUES
('testi-1', 'Budi Santoso', 'Direktur Operasional PT Indoprima Niaga', 'Surabaya', 5, 'darat', 'Sudah 2 tahun berlangganan pengiriman suku cadang mesin pabrik Jakarta-Surabaya via Mitra Kargo (PT Samudra Lintas Artha). Pengiriman door-to-door selalu on-time, armada truk CDD dan Fuso sangat bersih, dan resinya bisa dilacak real-time.', 'disetujui', '15 Okt 2026', 1),
('testi-2', 'Hj. Ratna Sari Dewi', 'Owner Grosir Tekstil Pasar Tanah Abang', 'Jakarta', 5, 'laut', 'Kirim roll kain partai besar ke Makassar dan Banjarmasin paling hemat pakai Kargo Laut Mitra Kargo. Tarif kontainer LCL-nya ramah UMKM, barang dibungkus plastik kedap air jadi aman tidak basah.', 'disetujui', '14 Okt 2026', 1),
('testi-3', 'Ir. Hendarto Prabowo', 'Project Manager Konstruksi IKN', 'Balikpapan', 5, 'sewa_truk', 'Sewa Tronton Wingbox dan Fuso Losbak untuk mobilisasi material tower crane ke IKN via Balikpapan sangat memuaskan. Driver profesional, berizin resmi, dan tim support 24 jam responsif via WhatsApp.', 'disetujui', '11 Okt 2026', 1),
('testi-4', 'Dr. Faisal Arifin, Sp.A', 'Keluarga Dokter Spesialis', 'Medan', 5, 'pindahan', 'Layanan pindahan rumah dinas dari Jakarta Selatan ke Medan tuntas tanpa ada satu pun perabot pecah belah yang lecet. Packing kayunya rapi, tim bongkar muat sigap dan ramah.', 'disetujui', '08 Okt 2026', 1);

-- --------------------------------------------------------
-- Table structure for table `quote_requests`
-- --------------------------------------------------------
DROP TABLE IF EXISTS `quote_requests`;
CREATE TABLE `quote_requests` (
  `id` varchar(50) NOT NULL,
  `name` varchar(150) NOT NULL,
  `company_name` varchar(150) DEFAULT NULL,
  `phone` varchar(50) NOT NULL,
  `email` varchar(100) DEFAULT NULL,
  `origin` varchar(100) NOT NULL,
  `destination` varchar(100) NOT NULL,
  `service_type` varchar(50) NOT NULL,
  `goods_type` varchar(150) NOT NULL,
  `estimated_weight_kg` decimal(10,2) NOT NULL,
  `notes` text DEFAULT NULL,
  `status` varchar(50) NOT NULL DEFAULT 'baru',
  `created_at` varchar(50) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `quote_requests` (`id`, `name`, `company_name`, `phone`, `email`, `origin`, `destination`, `service_type`, `goods_type`, `estimated_weight_kg`, `notes`, `status`, `created_at`) VALUES
('quote-1', 'Bambang Sudibyo', 'PT Semen Perkasa Abadi', '081288339911', 'bambang@semenperkasa.co.id', 'Jakarta (Jabodetabek)', 'Balikpapan', 'laut', 'Semen Mortar 40 Sak & Keramik Tile', 2000.00, 'Membutuhkan palet kayu dan terpal tahan air untuk proyek infrastruktur di Balikpapan.', 'baru', '18 Okt 2026, 08:15 WIB');

/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
