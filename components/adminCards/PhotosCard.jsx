import { useState, useEffect } from "react";
import { updateUserByAdmin } from "@/lib/user";
import { Upload, X } from "lucide-react";
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

const PhotoBlock = ({ label, initialPhoto, onUpload, onDelete }) => {
  const [photo, setPhoto] = useState(null);
  const [preview, setPreview] = useState(null);

  useEffect(() => {
    setPhoto(initialPhoto);
    setPreview(initialPhoto);
  }, [initialPhoto]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setPreview(URL.createObjectURL(file));
    setPhoto(file);
    onUpload && onUpload(file);
  };

  const handleDelete = () => {
    setPhoto(null);
    setPreview(null);
    onDelete && onDelete();
  };

  return (
    <div className="w-full h-1/2 md:p-4 p-2 shadow-md rounded-[10px] border border-black/5 flex flex-col gap-4">
      <p>{label}</p>

      {preview ? (
        <div className="relative h-full">
            <img src={preview} alt="preview" className="h-full w-auto object-cover object-center" crossOrigin="use-credentials" />
            <button onClick={handleDelete} className="absolute w-[30px] h-[30px] bg-orange/50 rounded-full flex items-center justify-center top-2 right-2 cursor-pointer hover:bg-orange transition">
                <X color="white" />
            </button>
        </div>
      ) : (
        <div className="relative h-full min-h-[180px] flex flex-col items-center justify-center border-2 border-dashed border-orange rounded-xl cursor-pointer hover:bg-orange/10 transition">
            <input
                type="file"
                id="file-upload"
                accept=".png, .jpg, .jpeg"
                className="opacity-0 absolute w-full h-full cursor-pointer"
                onChange={handleFileChange}
            />

            <Upload className="w-12 h-12 text-orange mb-2" />
            <p className="text-gray-700 font-medium text-center">Déposer le fichier ici</p>
            <p className="mt-2 text-xs text-gray-400 text-center">Formats PNG, JPG et JPEG uniquement</p>
        </div>
      )}
    </div>
  );
};

export default function UserPhotos({ user }) {
    const handleUpload = async (field, file, isDelete = false) => {
        try {
            const formData = new FormData();
            if (isDelete) {
                formData.append(field, "DELETE");
            } else {
                formData.append(field, file);
            }

            const res = await updateUserByAdmin(user.id, formData);
            if (res?.status !== "success") {
                console.error("Erreur lors de la mise à jour de la photo");
            }
        } catch (err) {
            console.error(err);
        }
    };

    const handleDelete = (field) => {
        handleUpload(field, null, true);
    };

    return (
        <div className="flex flex-col lg:w-3/10 gap-6">
            <PhotoBlock
                label="Photo principale"
                initialPhoto={user.photo ? `${API_BASE_URL}/users/${user.photo}` : null}
                onUpload={(file) => handleUpload("photo", file)}
                onDelete={() => handleDelete("photo")}
            />
            <PhotoBlock
                label="Photo de célébration"
                initialPhoto={user.photoCelebration ? `${API_BASE_URL}/users/${user.photoCelebration}` : null}
                onUpload={(file) => handleUpload("photo_celebration", file)}
                onDelete={() => handleDelete("photo_celebration")}
            />
        </div>
    );
}
