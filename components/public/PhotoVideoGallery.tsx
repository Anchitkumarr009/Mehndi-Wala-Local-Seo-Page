"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Camera, Video, Sparkles, Play } from "lucide-react";

interface GalleryPhoto {
  url: string;
  artistName: string;
  style: string;
  alt: string;
}

interface GalleryVideo {
  videoUrl: string;
  posterUrl: string;
  artistName: string;
  style: string;
}

interface PhotoVideoGalleryProps {
  localityLabel: string;
  districtLabel?: string;
  photos?: GalleryPhoto[];
  videos?: GalleryVideo[];
}

export const PhotoVideoGallery: React.FC<PhotoVideoGalleryProps> = ({
  localityLabel,
  districtLabel,
  photos,
  videos,
}) => {
  const [activeTab, setActiveTab] = useState<"photos" | "videos">("photos");

  const defaultPhotos: GalleryPhoto[] = [
    {
      url: "https://images.unsplash.com/photo-1599818816933-289d0c64bead?q=80&w=800&auto=format&fit=crop",
      artistName: "Rehana Mehndi Studio",
      style: "Rajasthani bridal",
      alt: `Rajasthani bridal mehndi by Rehana Mehndi Studio, ${localityLabel}`,
    },
    {
      url: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=800&auto=format&fit=crop",
      artistName: "Sana's Henna Art",
      style: "Arabic guest design",
      alt: `Arabic style guest mehndi by Sana's Henna Art, ${localityLabel}`,
    },
    {
      url: "https://images.unsplash.com/photo-1583947215259-38e31be8751f?q=80&w=800&auto=format&fit=crop",
      artistName: "Priya Bridal Mehndi",
      style: "Fine-line bridal",
      alt: `Fine-line bridal mehndi by Priya Bridal Mehndi, ${localityLabel}`,
    },
    {
      url: "https://images.unsplash.com/photo-1563245372-f21724e3856d?q=80&w=800&auto=format&fit=crop",
      artistName: "Mehak Nails & Mehndi",
      style: "Floral guest design",
      alt: `Floral guest mehndi by Mehak Nails & Mehndi, ${localityLabel}`,
    },
    {
      url: "https://images.unsplash.com/photo-1605369572399-05d8d64a0f6e?q=80&w=800&auto=format&fit=crop",
      artistName: "Henna by Iqra",
      style: "Indo-Arabic portrait",
      alt: `Indo-Arabic portrait-style mehndi by Henna by Iqra, ${localityLabel}`,
    },
    {
      url: "https://images.unsplash.com/photo-1560066984-138dadb4c035?q=80&w=800&auto=format&fit=crop",
      artistName: "Team Mehak Creations",
      style: "Group event setup",
      alt: `Group mehndi setup by Team Mehak Creations, ${localityLabel}`,
    },
    {
      url: "https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?q=80&w=800&auto=format&fit=crop",
      artistName: "Rehana Mehndi Studio",
      style: "Full-hand bridal",
      alt: `Full-hand bridal mehndi by Rehana Mehndi Studio, ${localityLabel}`,
    },
    {
      url: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?q=80&w=800&auto=format&fit=crop",
      artistName: "Priya Bridal Mehndi",
      style: "Bridal feet design",
      alt: `Bridal feet mehndi by Priya Bridal Mehndi, ${localityLabel}`,
    },
  ];

  const defaultVideos: GalleryVideo[] = [
    {
      videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
      posterUrl: "https://images.unsplash.com/photo-1599818816933-289d0c64bead?q=80&w=800&auto=format&fit=crop",
      artistName: "Rehana Mehndi Studio",
      style: "Bridal application, timelapse",
    },
    {
      videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
      posterUrl: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=800&auto=format&fit=crop",
      artistName: "Sana's Henna Art",
      style: "Arabic design, close-up",
    },
    {
      videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
      posterUrl: "https://images.unsplash.com/photo-1583947215259-38e31be8751f?q=80&w=800&auto=format&fit=crop",
      artistName: "Priya Bridal Mehndi",
      style: "Fine-line technique",
    },
    {
      videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyBlazes.mp4",
      posterUrl: "https://images.unsplash.com/photo-1560066984-138dadb4c035?q=80&w=800&auto=format&fit=crop",
      artistName: "Team Mehak Creations",
      style: "Live wedding function",
    },
  ];

  const displayPhotos = photos && photos.length > 0 ? photos : defaultPhotos;
  const displayVideos = videos && videos.length > 0 ? videos : defaultVideos;

  return (
    <section id="gallery-section" className="mt-16 scroll-mt-20">
      <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-4 pb-4 border-b border-line">
        <div>
          <span className="text-[0.78rem] font-bold text-stain uppercase tracking-wider block mb-1">
            VISUAL PORTFOLIO
          </span>
          <h2 className="font-serif font-semibold text-2xl md:text-3xl text-ink m-0">
            Photo &amp; video gallery — <span className="text-stain">{localityLabel}</span> artists
          </h2>
        </div>

        {/* Gallery Tabs */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setActiveTab("photos")}
            className={`inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold rounded-full border transition-colors ${
              activeTab === "photos"
                ? "bg-ink text-parchment border-ink shadow-sm"
                : "bg-white text-ink-soft border-line-strong hover:bg-parchment"
            }`}
          >
            <Camera className="w-3.5 h-3.5" />
            <span>Photo portfolio ({displayPhotos.length})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("videos")}
            className={`inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold rounded-full border transition-colors ${
              activeTab === "videos"
                ? "bg-ink text-parchment border-ink shadow-sm"
                : "bg-white text-ink-soft border-line-strong hover:bg-parchment"
            }`}
          >
            <Video className="w-3.5 h-3.5" />
            <span>Video clips ({displayVideos.length})</span>
          </button>
        </div>
      </div>

      {/* Photos Panel */}
      {activeTab === "photos" && (
        <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5 animate-fadeIn">
          {displayPhotos.map((photo, idx) => (
            <figure
              key={idx}
              className="relative aspect-[4/5] rounded-sharp overflow-hidden border border-line bg-parchment-deep group shadow-2xs"
            >
              <Image
                src={photo.url}
                alt={photo.alt}
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                loading="lazy"
              />
              <figcaption className="absolute inset-x-0 bottom-0 z-10 p-3 pt-8 bg-gradient-to-t from-ink/90 via-ink/60 to-transparent text-parchment">
                <span className="block font-serif font-semibold text-xs md:text-sm text-white truncate">
                  {photo.artistName}
                </span>
                <span className="block text-[0.68rem] text-marigold-soft font-medium">
                  {photo.style}
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      )}

      {/* Videos Panel */}
      {activeTab === "videos" && (
        <div className="mt-8 space-y-4 animate-fadeIn">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
            {displayVideos.map((vid, idx) => (
              <figure
                key={idx}
                className="relative aspect-[4/5] rounded-sharp overflow-hidden border border-line bg-parchment-deep shadow-2xs flex flex-col justify-end"
              >
                <video
                  controls
                  muted
                  loop
                  playsInline
                  preload="none"
                  poster={vid.posterUrl}
                  className="absolute inset-0 w-full h-full object-cover z-0"
                >
                  <source src={vid.videoUrl} type="video/mp4" />
                  Your browser does not support video playback.
                </video>
                <figcaption className="relative z-10 p-3 pt-6 bg-gradient-to-t from-ink/95 via-ink/70 to-transparent text-parchment pointer-events-none">
                  <span className="block font-serif font-semibold text-xs md:text-sm text-white truncate">
                    {vid.artistName}
                  </span>
                  <span className="block text-[0.68rem] text-marigold-soft font-medium">
                    {vid.style}
                  </span>
                </figcaption>
              </figure>
            ))}
          </div>
          <p className="text-xs text-ink-soft italic">
            Tap the play control on any clip to watch — native video controls, no autoplay.
          </p>
        </div>
      )}
    </section>
  );
};
