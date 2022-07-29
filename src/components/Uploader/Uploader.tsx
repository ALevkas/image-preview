import { Button } from 'components';
import React, { useRef } from 'react';
import { IUploaderProps } from './Uploader.types';

const Uploader = (props: IUploaderProps): JSX.Element => {
  const { handleFile, isImage } = props;
  const fileInput = useRef<HTMLInputElement>(null);

  const handleUpload = (): void => {
    if (!fileInput.current) return;
    fileInput.current.click();
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    if (!event.target.files) return;

    handleFile(event.target.files[0]);
  };

  return (
    <>
      <Button onClick={handleUpload}>Upload a file</Button>
      <input
        accept={isImage ? 'image/*' : '*'}
        ref={fileInput}
        type="file"
        onChange={handleChange}
        style={{ display: 'none' }}
      />
    </>
  );
};

export default Uploader;
