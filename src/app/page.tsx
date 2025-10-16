'use client'

import { useState, useEffect } from 'react'
import { Search, Menu, X, MessageCircle, Phone, Mail, MapPin, ChevronDown, Heart, Star, Clock, Zap, Send, Calendar, Users, Music, Gift, QrCode, BookOpen, Share2, UserCircle, Radio, Camera, Wallet } from 'lucide-react'

// Data produk dari CSV
const allProducts = [
  { id: 1, nama: "Sunda 1", kategori: "Adat", harga: 99000, linkPreview: "https://app.smstory.id/pilihan-tema/sunda-01?sr=iiwedding", linkGambar: "https://i.ibb.co.com/Rkjn0dzm/01-Sunda-01.png", keterangan: "" },
  { id: 2, nama: "Jawa 1", kategori: "Adat", harga: 99000, linkPreview: "https://app.smstory.id/pilihan-tema/jawa-01?sr=iiwedding", linkGambar: "https://i.ibb.co.com/hR9CbpDv/02-Jawa-01.png", keterangan: "" },
  { id: 3, nama: "Minang 1", kategori: "Adat", harga: 99000, linkPreview: "https://app.smstory.id/pilihan-tema/minang-01?sr=iiwedding", linkGambar: "https://i.ibb.co.com/m5j4cHNw/03-Minang-01.png", keterangan: "" },
  { id: 4, nama: "Psh-01", kategori: "Alam", harga: 99000, linkPreview: "https://app.smstory.id/pilihan-tema/psh-01?sr=iiwedding", linkGambar: "https://i.ibb.co.com/5XRf9vBY/04-PSH-01.png", keterangan: "" },
  { id: 5, nama: "Psh-02", kategori: "Alam", harga: 99000, linkPreview: "https://app.smstory.id/pilihan-tema/psh-02?sr=iiwedding", linkGambar: "https://i.ibb.co.com/3Y0jpsCD/05-PSH-02.png", keterangan: "" },
  { id: 6, nama: "Psh-03", kategori: "Alam", harga: 99000, linkPreview: "https://app.smstory.id/pilihan-tema/psh-03?sr=iiwedding", linkGambar: "https://i.ibb.co.com/h116tDrh/06-PSH-03.png", keterangan: "" },
  { id: 7, nama: "Psh-04", kategori: "Alam", harga: 99000, linkPreview: "https://app.smstory.id/pilihan-tema/psh-04?sr=iiwedding", linkGambar: "https://i.ibb.co.com/cKt19Xp2/07-PSH-04.png", keterangan: "" },
  { id: 8, nama: "Psh-05", kategori: "Alam", harga: 99000, linkPreview: "https://app.smstory.id/pilihan-tema/psh-05?sr=iiwedding", linkGambar: "https://i.ibb.co.com/k2rQstdR/08-PSH-05.png", keterangan: "" },
  { id: 9, nama: "Psh-06", kategori: "Alam", harga: 99000, linkPreview: "https://app.smstory.id/pilihan-tema/psh-06?sr=iiwedding", linkGambar: "https://i.ibb.co.com/pBhwF7mm/09-PSH-06.png", keterangan: "" },
  { id: 10, nama: "Mss-01", kategori: "Bunga", harga: 99000, linkPreview: "https://app.smstory.id/pilihan-tema/mss-01?sr=iiwedding", linkGambar: "https://i.ibb.co.com/bMMcrbQB/10-MSS-01.png", keterangan: "" },
  { id: 11, nama: "Mss-02", kategori: "Bunga", harga: 99000, linkPreview: "https://app.smstory.id/pilihan-tema/mss-02?sr=iiwedding", linkGambar: "https://i.ibb.co.com/QjJfc6YT/11-MSS-02.png", keterangan: "" },
  { id: 12, nama: "Mss-03", kategori: "Bunga", harga: 99000, linkPreview: "https://app.smstory.id/pilihan-tema/mss-03?sr=iiwedding", linkGambar: "https://i.ibb.co.com/FbgYwBvF/12-MSS-03.png", keterangan: "" },
  { id: 13, nama: "Mss-04", kategori: "Bunga", harga: 99000, linkPreview: "https://app.smstory.id/pilihan-tema/mss-04?sr=iiwedding", linkGambar: "https://i.ibb.co.com/C56W3S35/13-MSS-04.png", keterangan: "" },
  { id: 14, nama: "Mss-05", kategori: "Bunga", harga: 99000, linkPreview: "https://app.smstory.id/pilihan-tema/mss-05?sr=iiwedding", linkGambar: "https://i.ibb.co.com/GvbzYZgH/14-MSS-05.png", keterangan: "" },
  { id: 15, nama: "Mss-06", kategori: "Bunga", harga: 99000, linkPreview: "https://app.smstory.id/pilihan-tema/mss-06?sr=iiwedding", linkGambar: "https://i.ibb.co.com/84xGkZWj/15-MSS-06.png", keterangan: "" },
  { id: 16, nama: "Nursa-01", kategori: "Elegant", harga: 99000, linkPreview: "https://app.smstory.id/pilihan-tema/nursa-01?sr=iiwedding", linkGambar: "https://i.ibb.co.com/8DyrSdCL/16-Nursa-01.png", keterangan: "" },
  { id: 17, nama: "Nursa-02", kategori: "Elegant", harga: 99000, linkPreview: "https://app.smstory.id/pilihan-tema/nursa-02?sr=iiwedding", linkGambar: "https://i.ibb.co.com/qPj7k5y/17-Nursa-02.png", keterangan: "" },
  { id: 18, nama: "Nursa-03", kategori: "Elegant", harga: 99000, linkPreview: "https://app.smstory.id/pilihan-tema/nursa-03?sr=iiwedding", linkGambar: "https://i.ibb.co.com/fRsRDzD/18-Nursa-03.png", keterangan: "" },
  { id: 19, nama: "Nursa-04", kategori: "Elegant", harga: 99000, linkPreview: "https://app.smstory.id/pilihan-tema/nursa-04?sr=iiwedding", linkGambar: "https://i.ibb.co.com/vCQmZqRN/19-Nursa-04.png", keterangan: "" },
  { id: 20, nama: "Nursa-05", kategori: "Elegant", harga: 99000, linkPreview: "https://app.smstory.id/pilihan-tema/nursa-05?sr=iiwedding", linkGambar: "https://i.ibb.co.com/rK7n8VKy/20-Nursa-05.png", keterangan: "" },
  { id: 21, nama: "Nursa-06", kategori: "Elegant", harga: 99000, linkPreview: "https://app.smstory.id/pilihan-tema/nursa-06?sr=iiwedding", linkGambar: "https://i.ibb.co.com/G35B0SC9/21-Nursa-06.png", keterangan: "" },
  { id: 22, nama: "Love-Cartoon-01", kategori: "Islami", harga: 99000, linkPreview: "https://app.smstory.id/pilihan-tema/love-cartoon-01?sr=iiwedding", linkGambar: "https://i.ibb.co.com/G48JPDpz/22-LOVE-CARTOON-01.png", keterangan: "" },
  { id: 23, nama: "Love-Cartoon-02", kategori: "Islami", harga: 99000, linkPreview: "https://app.smstory.id/pilihan-tema/love-cartoon-02?sr=iiwedding", linkGambar: "https://i.ibb.co.com/gMhFfnJR/23-LOVE-CARTOON-02.png", keterangan: "" },
  { id: 24, nama: "Love-Cartoon-03", kategori: "Islami", harga: 99000, linkPreview: "https://app.smstory.id/pilihan-tema/love-cartoon-03?sr=iiwedding", linkGambar: "https://i.ibb.co.com/WNtP6vmJ/24-LOVE-CARTOON-03.png", keterangan: "" },
  { id: 25, nama: "Butterfly-Fx-01", kategori: "Alam", harga: 99000, linkPreview: "https://app.smstory.id/pilihan-tema/butterfly-fx-01?sr=iiwedding", linkGambar: "https://i.ibb.co.com/Vc8F6Spy/25-Butterfly-FX-01.png", keterangan: "" },
  { id: 26, nama: "Butterfly-Fx-02", kategori: "Alam", harga: 99000, linkPreview: "https://app.smstory.id/pilihan-tema/butterfly-fx-02?sr=iiwedding", linkGambar: "https://i.ibb.co.com/x8LCydnK/26-Butterfly-FX-02.png", keterangan: "" },
  { id: 27, nama: "Butterfly-Fx-03", kategori: "Alam", harga: 99000, linkPreview: "https://app.smstory.id/pilihan-tema/butterfly-fx-03?sr=iiwedding", linkGambar: "https://i.ibb.co.com/K8bwBQ7/27-Butterfly-FX-03.png", keterangan: "" },
  { id: 28, nama: "Swn-01", kategori: "Elegant", harga: 99000, linkPreview: "https://app.smstory.id/pilihan-tema/swn-01?sr=iiwedding", linkGambar: "https://i.ibb.co.com/WNjybWKS/28-SWN-01.png", keterangan: "" },
  { id: 29, nama: "Swn-02", kategori: "Elegant", harga: 99000, linkPreview: "https://app.smstory.id/pilihan-tema/swn-02?sr=iiwedding", linkGambar: "https://i.ibb.co.com/2mgTnQy/29-SWN-02.png", keterangan: "" },
  { id: 30, nama: "Swn-03", kategori: "Elegant", harga: 99000, linkPreview: "https://app.smstory.id/pilihan-tema/swn-03?sr=iiwedding", linkGambar: "https://i.ibb.co.com/C5GcrjDj/30-SWN-03.png", keterangan: "" },
  { id: 31, nama: "Swn-04", kategori: "Elegant", harga: 99000, linkPreview: "https://app.smstory.id/pilihan-tema/swn-04?sr=iiwedding", linkGambar: "https://i.ibb.co.com/mFFBGxQH/31-SWN-04.png", keterangan: "" },
  { id: 32, nama: "Swn-05", kategori: "Elegant", harga: 99000, linkPreview: "https://app.smstory.id/pilihan-tema/swn-05?sr=iiwedding", linkGambar: "https://i.ibb.co.com/TxZd7kwD/32-SWN-05.png", keterangan: "" },
  { id: 33, nama: "Swn-06", kategori: "Elegant", harga: 99000, linkPreview: "https://app.smstory.id/pilihan-tema/swn-06?sr=iiwedding", linkGambar: "https://i.ibb.co.com/prWpcvS9/33-SWN-06.png", keterangan: "" },
  { id: 34, nama: "Swn-07", kategori: "Elegant", harga: 99000, linkPreview: "https://app.smstory.id/pilihan-tema/swn-07?sr=iiwedding", linkGambar: "https://i.ibb.co.com/4Zw1KHhX/34-SWN-07.png", keterangan: "" },
  { id: 35, nama: "Swn-08", kategori: "Elegant", harga: 99000, linkPreview: "https://app.smstory.id/pilihan-tema/swn-08?sr=iiwedding", linkGambar: "https://i.ibb.co.com/WNB6Xwtr/35-SWN-08.png", keterangan: "" },
  { id: 36, nama: "Swn-09", kategori: "Elegant", harga: 99000, linkPreview: "https://app.smstory.id/pilihan-tema/swn-09?sr=iiwedding", linkGambar: "https://i.ibb.co.com/99BxCF6q/36-SWN-09.png", keterangan: "" },
  { id: 37, nama: "Wavy-Sfe-01", kategori: "Bunga", harga: 99000, linkPreview: "https://app.smstory.id/pilihan-tema/wavy-sfe-01?sr=iiwedding", linkGambar: "https://i.ibb.co.com/v4g3JRQS/37-Wavy-SFE-01.jpg", keterangan: "" },
  { id: 38, nama: "Wavy-Sfe-02", kategori: "Bunga", harga: 99000, linkPreview: "https://app.smstory.id/pilihan-tema/wavy-sfe-02?sr=iiwedding", linkGambar: "https://i.ibb.co.com/cckMnfJ1/38-Wavy-SFE-02.jpg", keterangan: "" },
  { id: 39, nama: "Wavy-Sfe-03", kategori: "Bunga", harga: 99000, linkPreview: "https://app.smstory.id/pilihan-tema/wavy-sfe-03?sr=iiwedding", linkGambar: "https://i.ibb.co.com/LXQmRSyL/39-Wavy-SFE-03.jpg", keterangan: "" },
  { id: 40, nama: "Wavy-Sfe-04", kategori: "Bunga", harga: 99000, linkPreview: "https://app.smstory.id/pilihan-tema/wavy-sfe-04?sr=iiwedding", linkGambar: "https://i.ibb.co.com/Ngs3rSDB/40-Wavy-SFE-04.jpg", keterangan: "" },
  { id: 41, nama: "Wavy-Sfe-05", kategori: "Bunga", harga: 99000, linkPreview: "https://app.smstory.id/pilihan-tema/wavy-sfe-05?sr=iiwedding", linkGambar: "https://i.ibb.co.com/fVGdtpGg/41-Wavy-SFE-05.jpg", keterangan: "" },
  { id: 42, nama: "Wavy-Sfe-06", kategori: "Bunga", harga: 99000, linkPreview: "https://app.smstory.id/pilihan-tema/wavy-sfe-06?sr=iiwedding", linkGambar: "https://i.ibb.co.com/1YWVrD1w/42-Wavy-SFE-06.jpg", keterangan: "" },
  { id: 43, nama: "Wavy-Sfe-07", kategori: "Bunga", harga: 99000, linkPreview: "https://app.smstory.id/pilihan-tema/wavy-sfe-07?sr=iiwedding", linkGambar: "https://i.ibb.co.com/qMBVdLzk/43-Wavy-SFE-07.jpg", keterangan: "" },
  { id: 44, nama: "Wavy-Sfe-08", kategori: "Bunga", harga: 99000, linkPreview: "https://app.smstory.id/pilihan-tema/wavy-sfe-08?sr=iiwedding", linkGambar: "https://i.ibb.co.com/LhzSNLQG/44-Wavy-SFE-08.jpg", keterangan: "" },
  { id: 45, nama: "Wavy-Sfe-09", kategori: "Bunga", harga: 99000, linkPreview: "https://app.smstory.id/pilihan-tema/wavy-sfe-09?sr=iiwedding", linkGambar: "https://i.ibb.co.com/HfhHYFTj/45-Wavy-SFE-09.jpg", keterangan: "" },
  { id: 46, nama: "Aqiqah-Givemeart-Mks-01", kategori: "Aqiqah", harga: 99000, linkPreview: "https://app.smstory.id/pilihan-tema/aqiqah-givemeart-mks-01?sr=iiwedding", linkGambar: "https://i.ibb.co.com/x8fqPbyY/46-Aqiqah-Givemeart-Mks-01.png", keterangan: "" },
  { id: 47, nama: "Aqiqah-Givemeart-Mks-02", kategori: "Aqiqah", harga: 99000, linkPreview: "https://app.smstory.id/pilihan-tema/aqiqah-givemeart-mks-02?sr=iiwedding", linkGambar: "https://i.ibb.co.com/7ddDmpSM/47-Aqiqah-Givemeart-Mks-02.png", keterangan: "" },
  { id: 48, nama: "Aqiqah-Givemeart-Mks-03", kategori: "Aqiqah", harga: 99000, linkPreview: "https://app.smstory.id/pilihan-tema/aqiqah-givemeart-mks-03?sr=iiwedding", linkGambar: "https://i.ibb.co.com/k24BSrFb/48-Aqiqah-Givemeart-Mks-03.png", keterangan: "" },
  { id: 49, nama: "Ethnic-Sm-01", kategori: "Batik", harga: 99000, linkPreview: "https://app.smstory.id/pilihan-tema/ethnic-sm-01?sr=iiwedding", linkGambar: "https://i.ibb.co.com/B5MvMMRV/49-Ethnic-SM-01.jpg", keterangan: "" },
  { id: 50, nama: "Ethnic-Sm-02", kategori: "Batik", harga: 99000, linkPreview: "https://app.smstory.id/pilihan-tema/ethnic-sm-02?sr=iiwedding", linkGambar: "https://i.ibb.co.com/99ZWzZYb/50-Ethnic-SM-02.jpg", keterangan: "" },
  { id: 51, nama: "Ethnic-Sm-03", kategori: "Batik", harga: 99000, linkPreview: "https://app.smstory.id/pilihan-tema/ethnic-sm-03?sr=iiwedding", linkGambar: "https://i.ibb.co.com/Z6QpLn2F/51-Ethnic-SM-03.jpg", keterangan: "" },
  { id: 52, nama: "Autoplay-Floral-Dance-01", kategori: "Bunga", harga: 99000, linkPreview: "https://app.smstory.id/pilihan-tema/autoplay-floral-dance-01?sr=iiwedding", linkGambar: "https://i.ibb.co.com/KpBGLwwT/52-Autoplay-Floral-Dance-01.png", keterangan: "" },
  { id: 53, nama: "Autoplay-Floral-Dance-02", kategori: "Bunga", harga: 99000, linkPreview: "https://app.smstory.id/pilihan-tema/autoplay-floral-dance-02?sr=iiwedding", linkGambar: "https://i.ibb.co.com/PffKr5C/53-Autoplay-Floral-Dance-02.png", keterangan: "" },
  { id: 54, nama: "Autoplay-Floral-Dance-03", kategori: "Bunga", harga: 99000, linkPreview: "https://app.smstory.id/pilihan-tema/autoplay-floral-dance-03?sr=iiwedding", linkGambar: "https://i.ibb.co.com/TfXFZh0/54-Autoplay-Floral-Dance-03.png", keterangan: "" },
  { id: 55, nama: "Autoplay-Floral-Dance-04", kategori: "Bunga", harga: 99000, linkPreview: "https://app.smstory.id/pilihan-tema/autoplay-floral-dance-04?sr=iiwedding", linkGambar: "https://i.ibb.co.com/TM8stBsV/55-Autoplay-Floral-Dance-04.png", keterangan: "" },
  { id: 56, nama: "Autoplay-Floral-Dance-05", kategori: "Bunga", harga: 99000, linkPreview: "https://app.smstory.id/pilihan-tema/autoplay-floral-dance-05?sr=iiwedding", linkGambar: "https://i.ibb.co.com/DS2tLr3/56-Autoplay-Floral-Dance-05.png", keterangan: "" },
  { id: 57, nama: "Autoplay-Floral-Dance-06", kategori: "Bunga", harga: 99000, linkPreview: "https://app.smstory.id/pilihan-tema/autoplay-floral-dance-06?sr=iiwedding", linkGambar: "https://i.ibb.co.com/B2LSH5D6/57-Autoplay-Floral-Dance-06.png", keterangan: "" },
  { id: 58, nama: "Autoplay-Floral-Dance-07", kategori: "Bunga", harga: 99000, linkPreview: "https://app.smstory.id/pilihan-tema/autoplay-floral-dance-07?sr=iiwedding", linkGambar: "https://i.ibb.co.com/gbgV4kc9/58-Autoplay-Floral-Dance-07.png", keterangan: "" },
  { id: 59, nama: "Autoplay-Floral-Dance-08", kategori: "Bunga", harga: 99000, linkPreview: "https://app.smstory.id/pilihan-tema/autoplay-floral-dance-08?sr=iiwedding", linkGambar: "https://i.ibb.co.com/q3c0JJvZ/59-Autoplay-Floral-Dance-08.png", keterangan: "" },
  { id: 60, nama: "Autoplay-Floral-Dance-09", kategori: "Bunga", harga: 99000, linkPreview: "https://app.smstory.id/pilihan-tema/autoplay-floral-dance-09?sr=iiwedding", linkGambar: "https://i.ibb.co.com/rKrfrvZT/60-Autoplay-Floral-Dance-09.png", keterangan: "" },
  { id: 61, nama: "Full-Pattern-01", kategori: "Bunga", harga: 99000, linkPreview: "https://app.smstory.id/pilihan-tema/full-pattern-01?sr=iiwedding", linkGambar: "https://i.ibb.co.com/rRnBdJ7b/61-Full-Pattern-01.jpg", keterangan: "" },
  { id: 62, nama: "Full-Pattern-02", kategori: "Bunga", harga: 99000, linkPreview: "https://app.smstory.id/pilihan-tema/full-pattern-02?sr=iiwedding", linkGambar: "https://i.ibb.co.com/WmQKfMZ/62-Full-Pattern-02.jpg", keterangan: "" },
  { id: 63, nama: "Full-Pattern-03", kategori: "Bunga", harga: 99000, linkPreview: "https://app.smstory.id/pilihan-tema/full-pattern-03?sr=iiwedding", linkGambar: "https://i.ibb.co.com/vnfkWq2/63-Full-Pattern-03.jpg", keterangan: "" },
  { id: 64, nama: "Full-Pattern-Sfe-04", kategori: "Bunga", harga: 99000, linkPreview: "https://app.smstory.id/pilihan-tema/full-pattern-sfe-04?sr=iiwedding", linkGambar: "https://i.ibb.co.com/21Cj27Pq/64-Full-Pattern-04.jpg", keterangan: "" },
  { id: 65, nama: "Full-Pattern-Sfe-05", kategori: "Bunga", harga: 99000, linkPreview: "https://app.smstory.id/pilihan-tema/full-pattern-sfe-05?sr=iiwedding", linkGambar: "https://i.ibb.co.com/G31x8Zvx/65-Full-Pattern-05.jpg", keterangan: "" },
  { id: 66, nama: "Full-Pattern-Sfe-06", kategori: "Bunga", harga: 99000, linkPreview: "https://app.smstory.id/pilihan-tema/full-pattern-sfe-06?sr=iiwedding", linkGambar: "https://i.ibb.co.com/HT1FSZpt/66-Full-Pattern-06.jpg", keterangan: "" },
  { id: 67, nama: "Snowflakes-Effect-01", kategori: "Bunga", harga: 99000, linkPreview: "https://app.smstory.id/pilihan-tema/snowflakes-effect-01?sr=iiwedding", linkGambar: "https://i.ibb.co.com/S75Ng3hh/67-Snowflakes-Effect-01.jpg", keterangan: "" },
  { id: 68, nama: "Snowflakes-Effect-02", kategori: "Bunga", harga: 99000, linkPreview: "https://app.smstory.id/pilihan-tema/snowflakes-effect-02?sr=iiwedding", linkGambar: "https://i.ibb.co.com/993XDWhg/68-Snowflakes-Effect-02.jpg", keterangan: "" },
  { id: 69, nama: "Snowflakes-Effect-03", kategori: "Bunga", harga: 99000, linkPreview: "https://app.smstory.id/pilihan-tema/snowflakes-effect-03?sr=iiwedding", linkGambar: "https://i.ibb.co.com/twpVmGww/69-Snowflakes-Effect-03.jpg", keterangan: "" },
  { id: 70, nama: "Snowflakes-Effect-04", kategori: "Bunga", harga: 99000, linkPreview: "https://app.smstory.id/pilihan-tema/snowflakes-effect-04?sr=iiwedding", linkGambar: "https://i.ibb.co.com/ZR55BGvK/70-Snowflakes-Effect-04.jpg", keterangan: "" },
  { id: 71, nama: "Snowflakes-Effect-05", kategori: "Bunga", harga: 99000, linkPreview: "https://app.smstory.id/pilihan-tema/snowflakes-effect-05?sr=iiwedding", linkGambar: "https://i.ibb.co.com/RTQP93P5/71-Snowflakes-Effect-05.jpg", keterangan: "" },
  { id: 72, nama: "Snowflakes-Effect-06", kategori: "Bunga", harga: 99000, linkPreview: "https://app.smstory.id/pilihan-tema/snowflakes-effect-06?sr=iiwedding", linkGambar: "https://i.ibb.co.com/DPBSY7w8/72-Snowflakes-Effect-06.jpg", keterangan: "" },
  { id: 73, nama: "Snowflakes-Effect-07", kategori: "Bunga", harga: 99000, linkPreview: "https://app.smstory.id/pilihan-tema/snowflakes-effect-07?sr=iiwedding", linkGambar: "https://i.ibb.co.com/LhYJjQ8D/73-Snowflakes-Effect-07.jpg", keterangan: "" },
  { id: 74, nama: "Snowflakes-Effect-08", kategori: "Bunga", harga: 99000, linkPreview: "https://app.smstory.id/pilihan-tema/snowflakes-effect-08?sr=iiwedding", linkGambar: "https://i.ibb.co.com/b5KzcXxT/74-Snowflakes-Effect-08.jpg", keterangan: "" },
  { id: 75, nama: "Snowflakes-Effect-09", kategori: "Bunga", harga: 99000, linkPreview: "https://app.smstory.id/pilihan-tema/snowflakes-effect-09?sr=iiwedding", linkGambar: "https://i.ibb.co.com/LzyWS0Qf/75-Snowflakes-Effect-09.jpg", keterangan: "" },
  { id: 76, nama: "Snowflakes-Effect-10", kategori: "Bunga", harga: 99000, linkPreview: "https://app.smstory.id/pilihan-tema/snowflakes-effect-10?sr=iiwedding", linkGambar: "https://i.ibb.co.com/4ZTcHR3t/76-Snowflakes-Effect-10.jpg", keterangan: "" },
  { id: 77, nama: "Snowflakes-Effect-11", kategori: "Bunga", harga: 99000, linkPreview: "https://app.smstory.id/pilihan-tema/snowflakes-effect-11?sr=iiwedding", linkGambar: "https://i.ibb.co.com/xqPVvSXX/77-Snowflakes-Effect-11.jpg", keterangan: "" },
  { id: 78, nama: "Snowflakes-Effect-12", kategori: "Bunga", harga: 99000, linkPreview: "https://app.smstory.id/pilihan-tema/snowflakes-effect-12?sr=iiwedding", linkGambar: "https://i.ibb.co.com/C5YrQmMw/78-Snowflakes-Effect-12.jpg", keterangan: "" },
  { id: 79, nama: "Wide-01", kategori: "Alam", harga: 99000, linkPreview: "https://app.smstory.id/pilihan-tema/wide-01?sr=iiwedding", linkGambar: "https://i.ibb.co.com/kVxRwgdg/79-Wide-01.jpg", keterangan: "" },
  { id: 80, nama: "Wide-02", kategori: "Alam", harga: 99000, linkPreview: "https://app.smstory.id/pilihan-tema/wide-02?sr=iiwedding", linkGambar: "https://i.ibb.co.com/fzrtxBLP/80-Wide-02.jpg", keterangan: "" },
  { id: 81, nama: "Wide-03", kategori: "Alam", harga: 99000, linkPreview: "https://app.smstory.id/pilihan-tema/wide-03?sr=iiwedding", linkGambar: "https://i.ibb.co.com/G3pRHKmR/81-Wide-03.jpg", keterangan: "" },
  { id: 82, nama: "Wide-04", kategori: "Alam", harga: 99000, linkPreview: "https://app.smstory.id/pilihan-tema/wide-04?sr=iiwedding", linkGambar: "https://i.ibb.co.com/nNN1WNQb/82-Wide-04.jpg", keterangan: "" },
  { id: 83, nama: "Wide-05", kategori: "Alam", harga: 99000, linkPreview: "https://app.smstory.id/pilihan-tema/wide-05?sr=iiwedding", linkGambar: "https://i.ibb.co.com/SDg6VTRB/83-Wide-05.jpg", keterangan: "" },
  { id: 84, nama: "Wide-06", kategori: "Alam", harga: 99000, linkPreview: "https://app.smstory.id/pilihan-tema/wide-06?sr=iiwedding", linkGambar: "https://i.ibb.co.com/Q70DJnzY/84-Wide-06.jpg", keterangan: "" },
  { id: 85, nama: "Sm-01", kategori: "Alam", harga: 99000, linkPreview: "https://app.smstory.id/pilihan-tema/sm-01?sr=iiwedding", linkGambar: "https://i.ibb.co.com/N6H2rvth/85-SM-01.jpg", keterangan: "" },
  { id: 86, nama: "Sm-02", kategori: "Alam", harga: 99000, linkPreview: "https://app.smstory.id/pilihan-tema/sm-02?sr=iiwedding", linkGambar: "https://i.ibb.co.com/XwZCMyD/86-SM-02.jpg", keterangan: "" },
  { id: 87, nama: "Sm-03", kategori: "Alam", harga: 99000, linkPreview: "https://app.smstory.id/pilihan-tema/sm-03?sr=iiwedding", linkGambar: "https://i.ibb.co.com/9kyR3gr0/87-SM-03.jpg", keterangan: "" },
  { id: 88, nama: "Sm-04", kategori: "Alam", harga: 99000, linkPreview: "https://app.smstory.id/pilihan-tema/sm-04?sr=iiwedding", linkGambar: "https://i.ibb.co.com/GQTk0bwf/88-SM-04.jpg", keterangan: "" },
  { id: 89, nama: "Sm-05", kategori: "Alam", harga: 99000, linkPreview: "https://app.smstory.id/pilihan-tema/sm-05?sr=iiwedding", linkGambar: "https://i.ibb.co.com/CpmgwV6h/89-SM-05.jpg", keterangan: "" },
  { id: 90, nama: "Sm-06", kategori: "Alam", harga: 99000, linkPreview: "https://app.smstory.id/pilihan-tema/sm-06?sr=iiwedding", linkGambar: "https://i.ibb.co.com/4xjKBYd/90-SM-06.jpg", keterangan: "" },
  { id: 91, nama: "Sm-07", kategori: "Alam", harga: 99000, linkPreview: "https://app.smstory.id/pilihan-tema/sm-07?sr=iiwedding", linkGambar: "https://i.ibb.co.com/8nvffsF4/91-SM-07.jpg", keterangan: "" },
  { id: 92, nama: "Sm-08", kategori: "Alam", harga: 99000, linkPreview: "https://app.smstory.id/pilihan-tema/sm-08?sr=iiwedding", linkGambar: "https://i.ibb.co.com/YTwrqF9T/92-SM-08.jpg", keterangan: "" },
  { id: 93, nama: "Sm-09", kategori: "Alam", harga: 99000, linkPreview: "https://app.smstory.id/pilihan-tema/sm-09?sr=iiwedding", linkGambar: "https://i.ibb.co.com/hxNzxQT0/93-SM-09.jpg", keterangan: "" },
  { id: 94, nama: "Card-01-Mv", kategori: "Bunga", harga: 99000, linkPreview: "https://app.smstory.id/pilihan-tema/card-01-mv?sr=iiwedding", linkGambar: "https://i.ibb.co.com/Gfd8QR8V/94-Card-01-MV.jpg", keterangan: "" },
  { id: 95, nama: "Card-02Mv", kategori: "Bunga", harga: 99000, linkPreview: "https://app.smstory.id/pilihan-tema/card-02-mv?sr=iiwedding", linkGambar: "https://i.ibb.co.com/BKf7fQwX/95-Card-02-MV.jpg", keterangan: "" },
  { id: 96, nama: "Card-03-Mv", kategori: "Bunga", harga: 99000, linkPreview: "https://app.smstory.id/pilihan-tema/card-03-mv?sr=iiwedding", linkGambar: "https://i.ibb.co.com/dwN3bnTH/96-Card-03-MV.jpg", keterangan: "" },
  { id: 97, nama: "Card-04-Mv-Full-Dark", kategori: "Dark", harga: 99000, linkPreview: "https://app.smstory.id/pilihan-tema/card-04-mv-full-dark?sr=iiwedding", linkGambar: "https://i.ibb.co.com/4ZfZ3VxZ/97-Card-04-MV-Full-Dark.jpg", keterangan: "" },
  { id: 98, nama: "Card-05-Mv-Full-Dark", kategori: "Dark", harga: 99000, linkPreview: "https://app.smstory.id/pilihan-tema/card-05-mv-full-dark?sr=iiwedding", linkGambar: "https://i.ibb.co.com/23HvcdSS/98-Card-05-MV-Full-Dark.jpg", keterangan: "" },
  { id: 99, nama: "Card-06-Mv-Full-Dark", kategori: "Dark", harga: 99000, linkPreview: "https://app.smstory.id/pilihan-tema/card-06-mv-full-dark?sr=iiwedding", linkGambar: "https://i.ibb.co.com/zHmghKMW/99-Card-06-MV-Full-Dark.jpg", keterangan: "" },
  { id: 100, nama: "Boxed-01-Mv", kategori: "Bunga", harga: 99000, linkPreview: "https://app.smstory.id/pilihan-tema/boxed-01-mv?sr=iiwedding", linkGambar: "https://i.ibb.co.com/1tnNSgKj/100-Boxed-01-MV.jpg", keterangan: "" },
  { id: 101, nama: "Boxed-02-Mv", kategori: "Bunga", harga: 99000, linkPreview: "https://app.smstory.id/pilihan-tema/boxed-02-mv?sr=iiwedding", linkGambar: "https://i.ibb.co.com/S7V9y9KK/101-Boxed-02-MV.jpg", keterangan: "" },
  { id: 102, nama: "Boxed-03-Mv", kategori: "Bunga", harga: 99000, linkPreview: "https://app.smstory.id/pilihan-tema/boxed-03-mv?sr=iiwedding", linkGambar: "https://i.ibb.co.com/27kjKf2n/102-Boxed-03-MV.jpg", keterangan: "" },
  { id: 103, nama: "Boxed-04-Mv", kategori: "Bunga", harga: 99000, linkPreview: "https://app.smstory.id/pilihan-tema/boxed-04-mv?sr=iiwedding", linkGambar: "https://i.ibb.co.com/q398LjbD/103-Boxed-04-MV.jpg", keterangan: "" },
  { id: 104, nama: "Boxed-05-Mv", kategori: "Bunga", harga: 99000, linkPreview: "https://app.smstory.id/pilihan-tema/boxed-05-mv?sr=iiwedding", linkGambar: "https://i.ibb.co.com/23Cb4Sph/104-Boxed-05-MV.jpg", keterangan: "" },
  { id: 105, nama: "Boxed-06-Mv", kategori: "Bunga", harga: 99000, linkPreview: "https://app.smstory.id/pilihan-tema/boxed-06-mv?sr=iiwedding", linkGambar: "https://i.ibb.co.com/wZQT0pT6/105-Boxed-06-MV.jpg", keterangan: "" },
  { id: 106, nama: "Frame-01", kategori: "Bunga", harga: 99000, linkPreview: "https://app.smstory.id/pilihan-tema/frame-01?sr=iiwedding", linkGambar: "https://i.ibb.co.com/TqLY1VLQ/106-Frame-01.jpg", keterangan: "" },
  { id: 107, nama: "Frame-02", kategori: "Bunga", harga: 99000, linkPreview: "https://app.smstory.id/pilihan-tema/frame-02?sr=iiwedding", linkGambar: "https://i.ibb.co.com/zWcMcpN2/107-Frame-02.jpg", keterangan: "" },
  { id: 108, nama: "Frame-03", kategori: "Bunga", harga: 99000, linkPreview: "https://app.smstory.id/pilihan-tema/frame-03?sr=iiwedding", linkGambar: "https://i.ibb.co.com/dwVrQQP6/108-Frame-03.jpg", keterangan: "" },
  { id: 109, nama: "Frame-04", kategori: "Bunga", harga: 99000, linkPreview: "https://app.smstory.id/pilihan-tema/frame-04?sr=iiwedding", linkGambar: "https://i.ibb.co.com/GQ42Twcc/109-Frame-04.jpg", keterangan: "" },
  { id: 110, nama: "Frame-05", kategori: "Bunga", harga: 99000, linkPreview: "https://app.smstory.id/pilihan-tema/frame-05?sr=iiwedding", linkGambar: "https://i.ibb.co.com/xqRwsrBx/110-Frame-05.jpg", keterangan: "" },
  { id: 111, nama: "Frame-06", kategori: "Bunga", harga: 99000, linkPreview: "https://app.smstory.id/pilihan-tema/frame-06?sr=iiwedding", linkGambar: "https://i.ibb.co.com/1ffdnPsZ/111-Frame-06.jpg", keterangan: "" },
  { id: 112, nama: "Frame-07", kategori: "Bunga", harga: 99000, linkPreview: "https://app.smstory.id/pilihan-tema/frame-07?sr=iiwedding", linkGambar: "https://i.ibb.co.com/933j6Qd9/112-Frame-07.jpg", keterangan: "" },
  { id: 113, nama: "Frame-08", kategori: "Bunga", harga: 99000, linkPreview: "https://app.smstory.id/pilihan-tema/frame-08?sr=iiwedding", linkGambar: "https://i.ibb.co.com/KxrX7nkv/113-Frame-08.jpg", keterangan: "" },
  { id: 114, nama: "Frame-09", kategori: "Bunga", harga: 99000, linkPreview: "https://app.smstory.id/pilihan-tema/frame-09?sr=iiwedding", linkGambar: "https://i.ibb.co.com/SXjfqj5j/114-Frame-09.jpg", keterangan: "" },
  { id: 115, nama: "Simple-Corner-01", kategori: "Bunga", harga: 99000, linkPreview: "https://app.smstory.id/pilihan-tema/simple-corner-01?sr=iiwedding", linkGambar: "https://i.ibb.co.com/h1wHLHNB/115-Simple-Corner-01.jpg", keterangan: "" },
  { id: 116, nama: "Simple-Corner-02", kategori: "Bunga", harga: 99000, linkPreview: "https://app.smstory.id/pilihan-tema/simple-corner-02?sr=iiwedding", linkGambar: "https://i.ibb.co.com/5gR50grM/116-Simple-Corner-02.jpg", keterangan: "" },
  { id: 117, nama: "Simple-Corner-03", kategori: "Bunga", harga: 99000, linkPreview: "https://app.smstory.id/pilihan-tema/simple-corner-03?sr=iiwedding", linkGambar: "https://i.ibb.co.com/cSMzm1yc/117-Simple-Corner-03.jpg", keterangan: "" },
  { id: 118, nama: "Simple-Corner-04", kategori: "Bunga", harga: 99000, linkPreview: "https://app.smstory.id/pilihan-tema/simple-corner-04?sr=iiwedding", linkGambar: "https://i.ibb.co.com/0pjtnMzr/118-Simple-Corner-04.jpg", keterangan: "" },
  { id: 119, nama: "Simple-Corner-05", kategori: "Bunga", harga: 99000, linkPreview: "https://app.smstory.id/pilihan-tema/simple-corner-05?sr=iiwedding", linkGambar: "https://i.ibb.co.com/bgTxSjWG/119-Simple-Corner-05.jpg", keterangan: "" },
  { id: 120, nama: "Simple-Corner-06", kategori: "Bunga", harga: 99000, linkPreview: "https://app.smstory.id/pilihan-tema/simple-corner-06?sr=iiwedding", linkGambar: "https://i.ibb.co.com/B2WYqSgS/120-Simple-Corner-06.jpg", keterangan: "" },
  { id: 121, nama: "Netflix", kategori: "Luxury", harga: 140000, linkPreview: "https://invite.truelove.my.id/tema-netflix/", linkGambar: "https://invite.truelove.my.id/wp-content/uploads/2025/07/tema-netflix-thumb.jpg", keterangan: "Fast" },
  { id: 122, nama: "The Lux 1", kategori: "Luxury", harga: 140000, linkPreview: "https://invite.truelove.my.id/tema-the-lux-1/?to=Nama+Tamu", linkGambar: "https://invite.truelove.my.id/wp-content/uploads/2025/05/lux1.webp", keterangan: "Fast" },
  { id: 123, nama: "The Lux 2", kategori: "Luxury", harga: 140000, linkPreview: "https://invite.truelove.my.id/tema-lux-2/?to=Nama+Tamu", linkGambar: "https://invite.truelove.my.id/wp-content/uploads/2025/05/lux2.webp", keterangan: "Fast" },
  { id: 124, nama: "The Lux 3", kategori: "Luxury", harga: 140000, linkPreview: "https://invite.truelove.my.id/tema-lux-3/?to=Nama+Tamu", linkGambar: "https://invite.truelove.my.id/wp-content/uploads/2025/05/lux3.webp", keterangan: "Fast" },
  { id: 125, nama: "The Lux 4", kategori: "Luxury", harga: 140000, linkPreview: "https://invite.truelove.my.id/tema-lux-4/?to=Nama+Tamu", linkGambar: "https://invite.truelove.my.id/wp-content/uploads/2025/05/lux4.webp", keterangan: "Fast" },
  { id: 126, nama: "The Lux 5", kategori: "Luxury", harga: 140000, linkPreview: "https://invite.truelove.my.id/tema-lux-5/?to=Nama+Tamu", linkGambar: "https://invite.truelove.my.id/wp-content/uploads/2025/05/lux5.webp", keterangan: "Fast" },
  { id: 127, nama: "The Lux 6", kategori: "Luxury", harga: 140000, linkPreview: "https://invite.truelove.my.id/tema-lux-6/?to=Nama+Tamu", linkGambar: "https://invite.truelove.my.id/wp-content/uploads/2025/05/lux6.webp", keterangan: "Fast" },
  { id: 128, nama: "The Lux 7", kategori: "Luxury", harga: 140000, linkPreview: "https://invite.truelove.my.id/tema-lux-7/?to=Nama+Tamu", linkGambar: "https://invite.truelove.my.id/wp-content/uploads/2025/05/lux7.webp", keterangan: "Fast" },
  { id: 129, nama: "The Lux 8", kategori: "Luxury", harga: 140000, linkPreview: "https://invite.truelove.my.id/tema-lux-8/?to=Nama+Tamu", linkGambar: "https://invite.truelove.my.id/wp-content/uploads/2025/05/lux8.webp", keterangan: "Fast" },
  { id: 130, nama: "The Lux 9", kategori: "Luxury", harga: 140000, linkPreview: "https://invite.truelove.my.id/tema-lux-9/?to=Nama+Tamu", linkGambar: "https://invite.truelove.my.id/wp-content/uploads/2025/06/Lux-9-1.webp", keterangan: "Fast" },
  { id: 131, nama: "The Lux 10", kategori: "Luxury", harga: 140000, linkPreview: "https://invite.truelove.my.id/temea-lux-10/?to=Nama+Tamu", linkGambar: "https://invite.truelove.my.id/wp-content/uploads/2025/06/Lux10.webp", keterangan: "Fast" },
  { id: 132, nama: "Jawa 2", kategori: "Adat", harga: 140000, linkPreview: "https://invite.truelove.my.id/adat-jawa-1/?to=Nama+Tamu", linkGambar: "https://invite.truelove.my.id/wp-content/uploads/2025/06/temajawa1.jpg", keterangan: "Fast" },
  { id: 133, nama: "Jawa 3", kategori: "Adat", harga: 140000, linkPreview: "https://invite.truelove.my.id/adat-jawa-2/?to=Nama+Tamu", linkGambar: "https://invite.truelove.my.id/wp-content/uploads/2025/06/adat-jawa-2.jpg", keterangan: "Fast" },
  { id: 134, nama: "Jawa 4", kategori: "Adat", harga: 140000, linkPreview: "https://invite.truelove.my.id/tema-jawa-3/?to=Nama+Tamu", linkGambar: "https://invite.truelove.my.id/wp-content/uploads/2025/06/ADAT-JAWA-3.jpg", keterangan: "Fast" },
  { id: 135, nama: "Sunda 2", kategori: "Adat", harga: 140000, linkPreview: "https://invite.truelove.my.id/sunda-1/?to=Nama+Tamu", linkGambar: "https://invite.truelove.my.id/wp-content/uploads/2025/06/ADAT-SUNDA.jpg", keterangan: "Fast" },
  { id: 136, nama: "Batak 1", kategori: "Adat", harga: 140000, linkPreview: "https://invite.truelove.my.id/tema-adat-batak-1/?to=Nama+Tamu", linkGambar: "https://invite.truelove.my.id/wp-content/uploads/2025/06/temabatak1.jpg", keterangan: "Fast" },
  { id: 137, nama: "Betawi 1", kategori: "Adat", harga: 140000, linkPreview: "https://invite.truelove.my.id/betawi-1/?to=Nama+Tamu", linkGambar: "https://invite.truelove.my.id/wp-content/uploads/2025/06/betawi-1.jpg", keterangan: "Fast" },
  { id: 138, nama: "Dayak 1", kategori: "Adat", harga: 140000, linkPreview: "https://invite.truelove.my.id/dayak-1/", linkGambar: "https://invite.truelove.my.id/wp-content/uploads/2025/06/temadayak1.jpg", keterangan: "Fast" },
  { id: 139, nama: "Minang 2", kategori: "Adat", harga: 140000, linkPreview: "https://invite.truelove.my.id/minang-1/?to=Nama+Tamu", linkGambar: "https://invite.truelove.my.id/wp-content/uploads/2025/06/temaminang1.jpg", keterangan: "Fast" },
  { id: 140, nama: "Nias 1", kategori: "Adat", harga: 140000, linkPreview: "https://invite.truelove.my.id/adat-nias-1/?to=Nama+Tamu", linkGambar: "https://invite.truelove.my.id/wp-content/uploads/2025/06/ADAT-NIAS.jpg", keterangan: "Fast" },
  { id: 141, nama: "Bali 1", kategori: "Adat", harga: 140000, linkPreview: "https://invite.truelove.my.id/adat-bali-1/?to=Nama+Tamu", linkGambar: "https://invite.truelove.my.id/wp-content/uploads/2025/06/adat-Bali.jpg", keterangan: "Fast" },
  { id: 142, nama: "Japanese Sakura", kategori: "Adat", harga: 140000, linkPreview: "https://invite.truelove.my.id/hanami-sakura/?to=Nama+Tamu", linkGambar: "https://invite.truelove.my.id/wp-content/uploads/2025/06/hanami-sakura.jpg", keterangan: "Fast" },
  { id: 143, nama: "Japanese Hanaui Sarang", kategori: "Adat", harga: 140000, linkPreview: "https://invite.truelove.my.id/hanaui-sarang/?to=Nama+Tamu", linkGambar: "https://invite.truelove.my.id/wp-content/uploads/2025/06/hanuisarang.jpg", keterangan: "Fast" },
  { id: 144, nama: "Amethyst Dream", kategori: "3D Motion", harga: 140000, linkPreview: "https://invite.truelove.my.id/wedding-amethyst-dream/", linkGambar: "https://invite.truelove.my.id/wp-content/uploads/2025/06/Midnight-04-Large.jpeg", keterangan: "Fast" },
  { id: 145, nama: "Crimson Romance", kategori: "3D Motion", harga: 140000, linkPreview: "https://invite.truelove.my.id/3d-crimson-romance/", linkGambar: "https://invite.truelove.my.id/wp-content/uploads/2025/06/Midnight-03-Large.jpeg", keterangan: "Fast" },
  { id: 146, nama: "Crimson Tanpa Foto", kategori: "3D Motion", harga: 140000, linkPreview: "https://invite.truelove.my.id/crimson-tanpa-foto/?to=Nama+Tamu", linkGambar: "https://invite.truelove.my.id/wp-content/uploads/2025/06/Midnight-03-Large.jpeg", keterangan: "Fast" },
  { id: 147, nama: "Emerald Romance", kategori: "3D Motion", harga: 140000, linkPreview: "https://invite.truelove.my.id/3d-emerald-romance/", linkGambar: "https://invite.truelove.my.id/wp-content/uploads/2025/06/Midnight-05-Large.jpeg", keterangan: "Fast" },
  { id: 148, nama: "Midnight Garden", kategori: "3D Motion", harga: 140000, linkPreview: "https://invite.truelove.my.id/3d-midnight-garden/", linkGambar: "https://invite.truelove.my.id/wp-content/uploads/2025/06/Midnight-01-Large.jpeg", keterangan: "Fast" },
  { id: 149, nama: "Motion Islamic 1", kategori: "3D Motion", harga: 140000, linkPreview: "https://invite.truelove.my.id/islamic-motion-1/?to=Nama+Tamu", linkGambar: "https://invite.truelove.my.id/wp-content/uploads/2025/09/Mockup-Elemenpress-Islamic-01-Large.jpeg", keterangan: "Fast" },
  { id: 150, nama: "Motion Islamic 2", kategori: "3D Motion", harga: 140000, linkPreview: "https://invite.truelove.my.id/islamic-motion-2/?to=Nama+Tamu", linkGambar: "https://invite.truelove.my.id/wp-content/uploads/2025/09/Mockup-Elemenpress-Islamic-02-Large.jpeg", keterangan: "Fast" },
  { id: 151, nama: "Motion Islamic 3", kategori: "3D Motion", harga: 140000, linkPreview: "https://invite.truelove.my.id/islamic-motion-3/?to=Nama+Tamu", linkGambar: "https://invite.truelove.my.id/wp-content/uploads/2025/09/Mockup-Elemenpress-Islamic-03-Large.jpeg", keterangan: "Fast" },
  { id: 152, nama: "Motion Islamic 4", kategori: "3D Motion", harga: 140000, linkPreview: "https://invite.truelove.my.id/islamic-motion-4/?to=Nama+Tamu", linkGambar: "https://invite.truelove.my.id/wp-content/uploads/2025/09/Mockup-Elemenpress-Islamic-04-Large.jpeg", keterangan: "Fast" },
  { id: 153, nama: "Motion Islamic 5", kategori: "3D Motion", harga: 140000, linkPreview: "https://invite.truelove.my.id/islamic-motion-5/?to=Nama+Tamu", linkGambar: "https://invite.truelove.my.id/wp-content/uploads/2025/09/Mockup-Elemenpress-Islamic-05-Large.jpeg", keterangan: "Fast" },
  { id: 154, nama: "Royal Twilight", kategori: "3D Motion", harga: 140000, linkPreview: "https://invite.truelove.my.id/3d-royal-twilight/", linkGambar: "https://invite.truelove.my.id/wp-content/uploads/2025/06/Midnight-02-Large.jpeg", keterangan: "Fast" },
  { id: 155, nama: "3D Adat Bali", kategori: "3D Motion", harga: 140000, linkPreview: "https://invite.truelove.my.id/3d-adat-bali/", linkGambar: "https://invite.truelove.my.id/wp-content/uploads/2025/08/adatbali3d.jpg", keterangan: "Fast" },
  { id: 156, nama: "3D Adat Batak", kategori: "3D Motion", harga: 140000, linkPreview: "https://invite.truelove.my.id/3d-adat-batak", linkGambar: "https://invite.truelove.my.id/wp-content/uploads/2025/08/adatbatak3d.jpg", keterangan: "Fast" },
  { id: 157, nama: "3D Adat Betawi", kategori: "3D Motion", harga: 140000, linkPreview: "https://invite.truelove.my.id/3d-adat-betawi/", linkGambar: "https://invite.truelove.my.id/wp-content/uploads/2025/10/MOCKUP-Heritage-Vol-2-Betawi-Large.jpeg", keterangan: "Fast" },
  { id: 158, nama: "3D Adat Bugis", kategori: "3D Motion", harga: 140000, linkPreview: "https://invite.truelove.my.id/3d-adat-bugis-1/?to=Nama+Tamu", linkGambar: "https://invite.truelove.my.id/wp-content/uploads/2025/08/Adatbugis.jpg", keterangan: "Fast" },
  { id: 159, nama: "3D Adat Jawa", kategori: "3D Motion", harga: 140000, linkPreview: "https://invite.truelove.my.id/3d-motion-jawa-1/", linkGambar: "https://invite.truelove.my.id/wp-content/uploads/2025/07/thumb-3djawa.jpeg", keterangan: "Fast" },
  { id: 160, nama: "3D Adat Palembang", kategori: "3D Motion", harga: 140000, linkPreview: "https://invite.truelove.my.id/3d-motion-adat-palembang/", linkGambar: "https://invite.truelove.my.id/wp-content/uploads/2025/09/MOCKUP-Heritage-Vol-2-Palembang-Large.jpeg", keterangan: "Fast" },
  { id: 161, nama: "Basic 1", kategori: "Basic", harga: 140000, linkPreview: "https://invite.truelove.my.id/tema-bassic-1/?to=Nama+Tamu", linkGambar: "https://invite.truelove.my.id/wp-content/uploads/2025/06/Bassic-1.jpg", keterangan: "Fast" },
  { id: 162, nama: "Basic 2", kategori: "Basic", harga: 140000, linkPreview: "https://invite.truelove.my.id/tema-bassic-2/?to=Nama+Tamu", linkGambar: "https://invite.truelove.my.id/wp-content/uploads/2025/06/Bassic-2.jpg", keterangan: "Fast" },
  { id: 163, nama: "Basic 3", kategori: "Basic", harga: 140000, linkPreview: "https://invite.truelove.my.id/tema-bassic-3/?to=Nama+Tamu", linkGambar: "https://invite.truelove.my.id/wp-content/uploads/2025/06/Bassic-3.jpg", keterangan: "Fast" },
  { id: 164, nama: "Basic 4", kategori: "Basic", harga: 140000, linkPreview: "https://invite.truelove.my.id/tema-bassic-4/?to=Nama+Tamu", linkGambar: "https://invite.truelove.my.id/wp-content/uploads/2025/06/Bassic-4.jpg", keterangan: "Fast" },
  { id: 165, nama: "Basic 5", kategori: "Basic", harga: 140000, linkPreview: "https://invite.truelove.my.id/tema-bassic-5/?to=Nama+Tamu", linkGambar: "https://invite.truelove.my.id/wp-content/uploads/2025/06/Bassic-5.jpg", keterangan: "Fast" },
  { id: 166, nama: "Basic 6", kategori: "Basic", harga: 140000, linkPreview: "https://invite.truelove.my.id/tema-bassic-6/?to=Nama+Tamu", linkGambar: "https://invite.truelove.my.id/wp-content/uploads/2025/06/Bassic-6.jpg", keterangan: "Fast" },
  { id: 167, nama: "Basic 7", kategori: "Basic", harga: 140000, linkPreview: "https://invite.truelove.my.id/tema-bassic-7/?to=Nama+Tamu", linkGambar: "https://invite.truelove.my.id/wp-content/uploads/2025/06/Bassic-7.jpg", keterangan: "Fast" },
  { id: 168, nama: "Basic 8", kategori: "Basic", harga: 140000, linkPreview: "https://invite.truelove.my.id/tema-bassic-8/?to=Nama+Tamu", linkGambar: "https://invite.truelove.my.id/wp-content/uploads/2025/06/Bassic-8.jpg", keterangan: "Fast" },
  { id: 169, nama: "Basic 9", kategori: "Basic", harga: 140000, linkPreview: "https://invite.truelove.my.id/tema-bassic-9/?to=Nama+Tamu", linkGambar: "https://invite.truelove.my.id/wp-content/uploads/2025/06/Bassic-9.jpg", keterangan: "Fast" },
  { id: 170, nama: "Basic 10", kategori: "Basic", harga: 140000, linkPreview: "https://invite.truelove.my.id/tema-bassic-10/?to=Nama+Tamu", linkGambar: "https://invite.truelove.my.id/wp-content/uploads/2025/06/Bassic-10.jpg", keterangan: "Fast" },
  { id: 171, nama: "Basic 11", kategori: "Basic", harga: 140000, linkPreview: "https://invite.truelove.my.id/tema-bassic-11/?to=Nama+Tamu", linkGambar: "https://invite.truelove.my.id/wp-content/uploads/2025/06/bassic-11.jpg", keterangan: "Fast" },
  { id: 172, nama: "Basic 12", kategori: "Basic", harga: 140000, linkPreview: "https://invite.truelove.my.id/tema-bassic-12/?to=Nama+Tamu", linkGambar: "https://invite.truelove.my.id/wp-content/uploads/2025/06/bassic-12.jpg", keterangan: "Fast" },
  { id: 173, nama: "Syar'i 1", kategori: "Islami", harga: 140000, linkPreview: "https://invite.truelove.my.id/tema-syari-1/?to=Nama+Tamu", linkGambar: "https://invite.truelove.my.id/wp-content/uploads/2025/06/Syari-1.jpg", keterangan: "Fast" },
  { id: 174, nama: "Syar'i 2", kategori: "Islami", harga: 140000, linkPreview: "https://invite.truelove.my.id/tema-syari-2/?to=Nama+Tamu", linkGambar: "https://invite.truelove.my.id/wp-content/uploads/2025/06/Syari-2.jpg", keterangan: "Fast" },
  { id: 175, nama: "Syar'i 3", kategori: "Islami", harga: 140000, linkPreview: "https://invite.truelove.my.id/tema-syari-3/?to=Nama+Tamu", linkGambar: "https://invite.truelove.my.id/wp-content/uploads/2025/06/Syari-3.jpg", keterangan: "Fast" },
  { id: 176, nama: "Syar'i 4", kategori: "Islami", harga: 140000, linkPreview: "https://invite.truelove.my.id/tema-syari-4/?to=Nama+Tamu", linkGambar: "https://invite.truelove.my.id/wp-content/uploads/2025/06/Syari-4.jpg", keterangan: "Fast" },
  { id: 177, nama: "Syar'i 5", kategori: "Islami", harga: 140000, linkPreview: "https://invite.truelove.my.id/tema-syari-5/?to=Nama+Tamu", linkGambar: "https://invite.truelove.my.id/wp-content/uploads/2025/06/Syari-5.jpg", keterangan: "Fast" }
]

export default function Home() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('Semua')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)
    return () => clearTimeout(timer)
  }, [])

  const filteredProducts = allProducts.filter(product => {
    const matchesSearch = product.nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.kategori.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === 'Semua' || product.kategori === selectedCategory
    return matchesSearch && matchesCategory
  })

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(price)
  }

  const handleWhatsAppClick = () => {
    window.open('https://wa.me/6281214470624?text=Halo%20Kak,%20saya%20mau%20tanya-tanya%20tentang%20tema%20undangan%20digital', '_blank')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-cyan-50">
      {/* WhatsApp Floating Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={handleWhatsAppClick}
          className="whatsapp-float bg-green-500 text-white p-4 rounded-full shadow-lg hover:bg-green-600 transition-all duration-300"
          aria-label="WhatsApp"
        >
          <MessageCircle className="w-6 h-6" />
        </button>
      </div>

      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center">
              <div className="w-8 h-8 bg-dt rounded-lg flex items-center justify-center">
                <Heart className="w-5 h-5 text-white" />
              </div>
              <span className="ml-2 text-xl font-bold text-gray-900">SmileStory</span>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <a href="#produk" className="text-gray-700 hover:text-dt transition-colors">Produk</a>
              <a href="#fitur" className="text-gray-700 hover:text-dt transition-colors">Fitur</a>
              <a href="#harga" className="text-gray-700 hover:text-dt transition-colors">Harga</a>
              <a href="#kontak" className="text-gray-700 hover:text-dt transition-colors">Kontak</a>
            </nav>

            {/* Header Buttons */}
            <div className="hidden md:flex items-center space-x-3">
              <a
                href="https://wa.me/6281214470624?text=Halo%20Kak,%20saya%20mau%20tanya-tanya%20tentang%20tema%20undangan%20digital"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-dt text-white px-4 py-2 rounded-full hover:bg-white hover:text-dt border-2 border-dt transition-all duration-300 text-sm font-medium flex items-center gap-2"
              >
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp</span>
              </a>
              <a
                href="https://www.instagram.com/smilestory.invitation/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 rounded-full border-2 border-dt hover:bg-dt hover:text-white transition-all duration-300 text-sm font-medium text-dt"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zM5.838 12a6.162 6.162 0 1 1 12.324 0 6.162 6.162 0 0 1-12.324 0zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm4.965-10.405a1.44 1.44 0 1 1 2.881.001 1.44 1.44 0 0 1-2.881-.001z"/>
                </svg>
                <span>Instagram</span>
              </a>
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-md text-gray-700 hover:text-dt hover:bg-gray-100"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <div className="md:hidden py-4 border-t">
              <nav className="flex flex-col space-y-3">
                <a href="#produk" className="text-gray-700 hover:text-dt transition-colors">Produk</a>
                <a href="#fitur" className="text-gray-700 hover:text-dt transition-colors">Fitur</a>
                <a href="#harga" className="text-gray-700 hover:text-dt transition-colors">Harga</a>
                <a href="#kontak" className="text-gray-700 hover:text-dt transition-colors">Kontak</a>
                <div className="flex flex-col space-y-2 pt-3 border-t">
                  <a
                    href="https://wa.me/6281214470624?text=Halo%20Kak,%20saya%20mau%20tanya-tanya%20tentang%20tema%20undangan%20digital"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-dt text-white px-4 py-2 rounded-full hover:bg-white hover:text-dt border-2 border-dt transition-all duration-300 text-sm font-medium flex items-center gap-2 justify-center"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>WhatsApp</span>
                  </a>
                  <a
                    href="https://www.instagram.com/smilestory.invitation/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 rounded-full border-2 border-dt hover:bg-dt hover:text-white transition-all duration-300 text-sm font-medium text-dt justify-center"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zM5.838 12a6.162 6.162 0 1 1 12.324 0 6.162 6.162 0 0 1-12.324 0zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm4.965-10.405a1.44 1.44 0 1 1 2.881.001 1.44 1.44 0 0 1-2.881-.001z"/>
                    </svg>
                    <span>Instagram</span>
                  </a>
                </div>
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-12 md:py-20 px-4 overflow-hidden">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 md:mb-6">
            Undangan Digital
            <span className="block text-dt">Elegan & Modern</span>
          </h1>
          <p className="text-base md:text-lg lg:text-xl text-gray-600 mb-6 md:mb-8 max-w-2xl mx-auto leading-relaxed">
            Wujudkan momen spesial Anda dengan undangan digital yang cantik, interaktif, dan berkesan. 
            Berbagai pilihan tema yang dapat disesuaikan dengan kebutuhan Anda.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center">
            <a
              href="https://wa.me/6281214470624?text=Halo%20Kak,%20saya%20mau%20konsultasi%20untuk%20pemesanan%20undangan%20digital"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-dt text-white px-6 md:px-8 py-2.5 md:py-3 rounded-full hover:bg-white hover:text-dt border-2 border-dt transition-all duration-300 font-medium text-sm md:text-base shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              Konsultasi Gratis
            </a>
            <a
              href="#produk"
              className="bg-white text-dt border-2 border-dt px-6 md:px-8 py-2.5 md:py-3 rounded-full hover:bg-dt hover:text-white transition-all duration-300 font-medium text-sm md:text-base"
            >
              Lihat Koleksi
            </a>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-12 md:py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-900 mb-8 md:mb-12">
            Fitur Unggulan Kami
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {[
              { icon: Camera, title: "Foto Galeri", desc: "Galeri foto mempelawai" },
              { icon: Clock, title: "Countdown Acara", desc: "Hitung mundur otomatis" },
              { icon: Users, title: "Informasi Pengantin", desc: "Biodata lengkap" },
              { icon: MapPin, title: "Peta Lokasi", desc: "Maps interaktif" },
              { icon: Music, title: "Request Musik", desc: "Playlist personal" },
              { icon: Wallet, title: "Amplop Digital", desc: "Hadiah online" },
              { icon: QrCode, title: "RSVP & QR Code", desc: "Konfirmasi kehadiran" },
              { icon: BookOpen, title: "Love Story", desc: "Cerita perjalanan" },
              { icon: Send, title: "Ucapan dan Do'a", desc: "Wall ucapan digital" },
              { icon: Share2, title: "Fitur Kirim Undangan", desc: "Bagikan mudah" },
              { icon: UserCircle, title: "Nama Tamu Unlimited", desc: "Tamu tidak terbatas" },
              { icon: Radio, title: "Livestreaming Acara", desc: "Siaran langsung" }
            ].map((feature, index) => (
              <div
                key={index}
                className="group bg-white border-2 border-dt rounded-xl p-4 md:p-6 text-center hover:shadow-lg transition-all duration-300 hover:border-dt hover:scale-105"
              >
                <div className="w-10 h-10 md:w-12 md:h-12 bg-dt rounded-lg flex items-center justify-center mx-auto mb-3 md:mb-4 group-hover:bg-dt transition-colors">
                  <feature.icon className="w-5 h-5 md:w-6 md:h-6 text-white" />
                </div>
                <h3 className="font-semibold text-gray-900 text-sm md:text-base mb-1 md:mb-2">{feature.title}</h3>
                <p className="text-xs md:text-sm text-gray-600">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section id="produk" className="py-12 md:py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-900 mb-8 md:mb-12">
            Koleksi Template Undangan
          </h2>

          {/* Search and Filter */}
          <div className="mb-6 md:mb-8">
            <div className="relative max-w-md mx-auto mb-6">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Cari tema undangan..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 md:py-3 border-2 border-dt rounded-xl focus:outline-none focus:ring-2 focus:ring-dt focus:border-transparent text-sm md:text-base"
              />
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap justify-center gap-2 mb-6">
              {['Semua', 'Adat', 'Alam', 'Bunga', 'Elegant', 'Islami', 'Aqiqah', 'Batik', 'Dark', 'Luxury', '3D Motion', 'Basic'].map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-3 py-1 rounded-full text-xs sm:text-sm transition-all duration-300 ${
                    selectedCategory === category
                      ? 'bg-dt text-white'
                      : 'text-dt'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Products Grid */}
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
              {[...Array(8)].map((_, index) => (
                <div key={index} className="bg-white rounded-xl border-2 border-dt p-4 animate-pulse">
                  <div className="aspect-[3/4] bg-gray-200 rounded-lg mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                  <div className="h-8 bg-gray-200 rounded"></div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
              {filteredProducts.map((product) => (
                <div
                  key={product.id}
                  className="group bg-white rounded-xl border-2 border-dt overflow-hidden hover:shadow-xl transition-all duration-300 hover:border-dt hover:scale-105"
                >
                  <div className="relative aspect-[3/4] overflow-hidden bg-gray-100">
                    <img
                      src={product.linkGambar}
                      alt={product.nama}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      loading="lazy"
                    />
                    {product.keterangan === "Fast" && (
                      <div className="absolute top-2 right-2 bg-yellow-400 text-gray-900 px-2 py-1 rounded-full text-xs font-bold">
                        Kilat
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-900 text-base mb-1 truncate">{product.nama}</h3>
                    <p className="text-dt text-sm mb-3">{product.kategori}</p>
                    <p className="text-gray-900 font-bold text-base mb-3">{formatPrice(product.harga)}</p>
                    <div className="flex gap-2">
                      <a
                        href={product.linkPreview}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 bg-white text-dt border-2 border-dt px-3 py-2 rounded-xl text-xs md:text-sm font-medium hover:bg-dt hover:text-white transition-all duration-300 text-center"
                      >
                        Lihat Preview
                      </a>
                      <a
                        href={`https://wa.me/6281214470624?text=Halo%20Kak,%20saya%20mau%20tanya-tanya%20tentang%20tema%20${encodeURIComponent(product.nama)}%20(${product.kategori})`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 bg-dt text-white px-3 py-2 rounded-xl text-xs md:text-sm font-medium hover:bg-white hover:text-dt border-2 border-dt transition-all duration-300 text-center"
                      >
                        Pesan Sekarang
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {filteredProducts.length === 0 && !isLoading && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">Tidak ada tema yang ditemukan.</p>
            </div>
          )}
        </div>
      </section>

      {/* Pricing Section */}
      <section id="harga" className="py-12 md:py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-900 mb-8 md:mb-12">
            Pilihan Harga Terbaik
          </h2>
          <div className="grid md:grid-cols-2 gap-6 md:gap-8 max-w-4xl mx-auto">
            <div className="bg-gradient-to-br from-pink-50 to-pink-100 rounded-2xl p-6 md:p-8 border-2 border-pink-200">
              <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">Paket Basic</h3>
              <p className="text-3xl md:text-4xl font-bold text-dt mb-4">Rp 99.000</p>
              <ul className="space-y-2 mb-6 text-sm md:text-base">
                <li className="flex items-center gap-2">
                  <div className="w-5 h-5 bg-dt rounded-full flex items-center justify-center">
                    <span className="text-white text-xs">✓</span>
                  </div>
                  <span>Template Premium</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-5 h-5 bg-dt rounded-full flex items-center justify-center">
                    <span className="text-white text-xs">✓</span>
                  </div>
                  <span>Domain Gratis</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-5 h-5 bg-dt rounded-full flex items-center justify-center">
                    <span className="text-white text-xs">✓</span>
                  </div>
                  <span>Fitur Lengkap</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-5 h-5 bg-dt rounded-full flex items-center justify-center">
                    <span className="text-white text-xs">✓</span>
                  </div>
                  <span>Support 7 Hari</span>
                </li>
              </ul>
              <a
                href="https://wa.me/6281214470624?text=Halo%20Kak,%20saya%20mau%20pesan%20Paket%20Basic"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-dt text-white py-3 rounded-xl hover:bg-white hover:text-dt border-2 border-dt transition-all duration-300 font-medium text-center block"
              >
                Pesan Sekarang
              </a>
            </div>

            <div className="bg-gradient-to-br from-dt to-cyan-600 rounded-2xl p-6 md:p-8 border-2 border-dt text-white relative overflow-hidden">
              <div className="absolute top-4 right-4 bg-orange-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                POPULER
              </div>
              <h3 className="text-xl md:text-2xl font-bold mb-2">Paket Premium</h3>
              <p className="text-3xl md:text-4xl font-bold mb-4">Rp 140.000</p>
              <ul className="space-y-2 mb-6 text-sm md:text-base">
                <li className="flex items-center gap-2">
                  <div className="w-5 h-5 bg-white rounded-full flex items-center justify-center">
                    <span className="text-dt text-xs">✓</span>
                  </div>
                  <span>Template Exclusive</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-5 h-5 bg-white rounded-full flex items-center justify-center">
                    <span className="text-dt text-xs">✓</span>
                  </div>
                  <span>Domain Premium</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-5 h-5 bg-white rounded-full flex items-center justify-center">
                    <span className="text-dt text-xs">✓</span>
                  </div>
                  <span>Semua Fitur Unlimited</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-5 h-5 bg-white rounded-full flex items-center justify-center">
                    <span className="text-dt text-xs">✓</span>
                  </div>
                  <span>Support Prioritas</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-5 h-5 bg-white rounded-full flex items-center justify-center">
                    <span className="text-dt text-xs">✓</span>
                  </div>
                  <span>Garansi 30 Hari</span>
                </li>
              </ul>
              <a
                href="https://wa.me/6281214470624?text=Halo%20Kak,%20saya%20mau%20pesan%20Paket%20Premium"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-white text-dt py-3 rounded-xl hover:bg-gray-100 transition-all duration-300 font-bold text-center block"
              >
                Pesan Sekarang
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="kontak" className="py-12 md:py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-900 mb-8 md:mb-12">
            Hubungi Kami
          </h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl p-6 md:p-8 border-2 border-dt">
              <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-6">Informasi Kontak</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-dt rounded-lg flex items-center justify-center">
                    <Phone className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">WhatsApp</p>
                    <p className="text-gray-600">+62 812-1447-0624</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-dt rounded-lg flex items-center justify-center">
                    <Mail className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Email</p>
                    <p className="text-gray-600">info@smilestory.id</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-dt rounded-lg flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Jam Operasional</p>
                    <p className="text-gray-600">Senin - Sabtu: 09:00 - 21:00</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-dt to-cyan-600 rounded-2xl p-6 md:p-8 text-white">
              <h3 className="text-xl md:text-2xl font-bold mb-6">Butuh Bantuan?</h3>
              <p className="mb-6 text-sm md:text-base leading-relaxed">
                Tim kami siap membantu Anda memilih template undangan yang sempurna untuk momen spesial Anda. 
                Konsultasi gratis tanpa biaya tambahan.
              </p>
              <div className="space-y-3">
                <a
                  href="https://wa.me/6281214470624?text=Halo%20Kak,%20saya%20mau%20konsultasi%20untuk%20pemesanan%20undangan%20digital"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-white text-dt py-3 rounded-xl hover:bg-gray-100 transition-all duration-300 font-bold text-center block flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-5 h-5" />
                  Konsultasi via WhatsApp
                </a>
                <a
                  href="https://www.instagram.com/smilestory.invitation/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-white/20 backdrop-blur text-white py-3 rounded-xl hover:bg-white/30 transition-all duration-300 font-medium text-center block"
                >
                  Follow Instagram
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 md:py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-6 md:gap-8 mb-8">
            <div>
              <div className="flex items-center mb-4">
                <div className="w-8 h-8 bg-dt rounded-lg flex items-center justify-center">
                  <Heart className="w-5 h-5 text-white" />
                </div>
                <span className="ml-2 text-xl font-bold">SmileStory</span>
              </div>
              <p className="text-gray-400 text-sm">
                Mewujudkan momen spesial Anda dengan undangan digital yang elegan dan berkesan.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Layanan</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#produk" className="hover:text-white transition-colors">Template Undangan</a></li>
                <li><a href="#fitur" className="hover:text-white transition-colors">Fitur Lengkap</a></li>
                <li><a href="#harga" className="hover:text-white transition-colors">Harga</a></li>
                <li><a href="#kontak" className="hover:text-white transition-colors">Kontak</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Bantuan</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">FAQ</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Panduan</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Syarat & Ketentuan</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Kebijakan Privasi</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Ikuti Kami</h4>
              <div className="flex space-x-3">
                <a
                  href="https://wa.me/6281214470624"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-dt transition-colors"
                >
                  <MessageCircle className="w-5 h-5" />
                </a>
                <a
                  href="https://www.instagram.com/smilestory.invitation/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-dt transition-colors"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zM5.838 12a6.162 6.162 0 1 1 12.324 0 6.162 6.162 0 0 1-12.324 0zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm4.965-10.405a1.44 1.44 0 1 1 2.881.001 1.44 1.44 0 0 1-2.881-.001z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-800 pt-6 text-center text-sm text-gray-400">
            <p>&copy; 2024 SmileStory. All rights reserved. Made with ❤️ in Indonesia</p>
          </div>
        </div>
      </footer>
    </div>
  )
}