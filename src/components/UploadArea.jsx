import React from 'react';
import { Upload } from 'lucide-react';

const UploadArea = ({ 
    fileUrl, // L'URL de l'aperçu du fichier (si disponible)
    onFileChange, // La fonction à appeler lors du changement (input ou drop)
    accept = "image/*", // Type de fichier accepté par défaut (peut être surchargé)
    label = "Déposez votre fichier ici" // Texte personnalisable
}) => {

  // Gestion des événements de glisser-déposer (Drag-and-Drop)
  const handleDragOver = (e) => {
    e.preventDefault(); 
    e.currentTarget.classList.add('border-blue-500', 'bg-blue-50');
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.currentTarget.classList.remove('border-blue-500', 'bg-blue-50');
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.currentTarget.classList.remove('border-blue-500', 'bg-blue-50');
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
        // Simule l'événement onChange pour utiliser la même fonction de gestion des fichiers
        onFileChange({ target: { files: e.dataTransfer.files } });
    }
  };

  return (
    <div
      className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center hover:border-blue-400 transition-colors cursor-pointer"
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <input
        type="file"
        id="file-upload-area"
        className="hidden"
        accept={accept}
        onChange={onFileChange} 
      />
      <label htmlFor="file-upload-area" className="cursor-pointer block">
        {fileUrl ? (
          // Affichage de l'aperçu si une URL est fournie
          <img 
            src={'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100'} 
            alt="Aperçu du fichier" 
            className="w-24 h-24 mx-auto object-contain" 
          />
        ) : (
          <div className="space-y-3">
            <div className="w-16 h-16 mx-auto bg-blue-100 rounded-full flex items-center justify-center">
              <Upload className="w-8 h-8 text-blue-600" />
            </div>
            <p className="text-gray-600 font-medium">
              {label}
            </p>
            <p className="text-sm text-gray-500">
              ou <span className="text-blue-600 underline">cliquez pour parcourir</span>
            </p>
          </div>
        )}
      </label>
    </div>
  )
};

export default UploadArea;