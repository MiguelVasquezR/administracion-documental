import Image from "next/image";
import React from "react";
import { UseFormRegister } from "react-hook-form";

interface UploadImageProps {
  image: string | "";
  register: UseFormRegister<any>;
  handleImageCapture: (file: File) => void;
}

const UploadImage = ({
  image,
  register,
  handleImageCapture,
}: UploadImageProps) => {
  return (
    <div style={{ textAlign: "center", marginTop: "20px" }}>
      {image !== "" ? (
        <Image
          {...register("imagen")}
          alt="Imagen"
          src={image}
          width={300}
          height={400}
          className="rounded-md object-fill bg-primary/50 w-[300px] h-[400px]"
          onClick={() => document.getElementById("fileInput")?.click()}
        />
      ) : (
        <div
          className="w-[300px] h-[400px] bg-gray-300 rounded-md flex justify-center items-center"
          onClick={() => document.getElementById("fileInput")?.click()}
        >
          <p>Selecciona una imagen</p>
        </div>
      )}
      <input
        id="fileInput"
        type="file"
        accept="image/*"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) {
            handleImageCapture(file);
          }
        }}
        style={{ display: "none" }}
      />
    </div>
  );
};

export default UploadImage;
