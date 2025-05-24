"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import styles from "./createTrainer.module.css";

export default function TrainerImgDrop({
  onImageUpload,
}: {
  onImageUpload: (url: string) => void;
}) {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const uploadToCloudinary = async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "boxer_date");

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_CLOUDINARY_BASE_SUBA_URL}`,
      {
        method: "POST",
        body: formData,
      }
    );

    const data = await res.json();
    return data.secure_url;
  };

  const processFile = async (file: File) => {
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = () => setImagePreview(reader.result as string);
      reader.readAsDataURL(file);

      const url = await uploadToCloudinary(file);
      onImageUpload(url);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    processFile(file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  return (
    <figure
      className={`${styles.dateImg}  ${isDragging ? styles.dragging : ""}`}
      onClick={() => fileInputRef.current?.click()}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
    >
      {!imagePreview && <h1 className={styles.plusIcon}>+</h1>}
      {imagePreview && (
        <Image
          src={imagePreview}
          alt="Previsualización del boxeador"
          width={350}
          height={350}
        />
      )}

      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        ref={fileInputRef}
        className={styles.hiddenInput}
      />
    </figure>
  );
}
