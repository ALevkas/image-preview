import { useState } from 'react';

interface IUseFilePicture {
  picture: string | null;
  handleFile: (file: File) => void;
  handleRemovePicture: () => void;
}

const useFilePicture = (): IUseFilePicture => {
  const [picture, setPicture] = useState<string | null>(null);

  const handleFile = (file: File): void => {
    setPicture(URL.createObjectURL(file));
  };

  const handleRemovePicture = (): void => {
    setPicture(null);
  };

  return { picture, handleFile, handleRemovePicture };
};

export default useFilePicture;
