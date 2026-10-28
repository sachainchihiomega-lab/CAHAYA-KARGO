<?php
/**
 * Mitra Kargo - PT Samudra Lintas Artha (https://mitrakargo.net/)
 * File Fallback Index PHP untuk Apache / LiteSpeed cPanel Rumahweb
 * Memastikan ketika pengunjung membuka https://mitrakargo.net/ (tanpa /index.html)
 * halaman index.html langsung termuat sempurna dan tidak blank putih.
 */

$htmlFile = __DIR__ . '/index.html';

if (file_exists($htmlFile)) {
    // Pastikan header content-type HTML UTF-8
    header('Content-Type: text/html; charset=UTF-8');
    readfile($htmlFile);
    exit;
} else {
    header('HTTP/1.1 200 OK');
    header('Content-Type: text/html; charset=UTF-8');
    echo '<!DOCTYPE html><html><head><meta http-equiv="refresh" content="0;url=index.html"></head><body>Loading Mitra Kargo...</body></html>';
    exit;
}
