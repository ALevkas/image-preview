import React from 'react';
import { Picture, Uploader } from 'components';
import { useFilePicture } from 'hooks';
import styles from './Main.module.scss';

const Main = (): JSX.Element => {
  const { picture, handleFile, handleRemovePicture } = useFilePicture();

  return (
    <div className={styles.container}>
      {picture ? (
        <Picture picture={picture} removePicture={handleRemovePicture} />
      ) : (
        <Uploader isImage handleFile={handleFile} />
      )}
    </div>
  );
};

export default Main;
