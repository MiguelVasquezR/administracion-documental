import Image from "next/image";
import React from "react";

interface UploadImageProps extends React.InputHTMLAttributes<HTMLInputElement> {
  image: string | "";
  handleImageCapture: (file: File) => void;
  name: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  onBlur: React.FocusEventHandler<HTMLInputElement>;
  ref: React.Ref<HTMLInputElement>;
}

const UploadImage = ({
  image,
  handleImageCapture,
  name,
  onChange,
  onBlur,
  ref,
  ...props // Para capturar cualquier otra propiedad extra
}: UploadImageProps) => {
  return (
    <div style={{ textAlign: "center", marginTop: "20px" }}>
      {image !== "" ? (
        <Image
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
        name={name}
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) {
            handleImageCapture(file);
          }
          onChange(e); // También llamar al onChange de react-hook-form
        }}
        onBlur={onBlur}
        ref={ref}
        style={{ display: "none" }}
        {...props} // Asegura que otras props se apliquen
      />
    </div>
  );
};

export default UploadImage;
