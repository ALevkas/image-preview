import React from 'react';
import { Button } from 'components';
import { usePicture } from 'hooks';
import { IPictureProps } from './Picture.types';
import styles from './Picture.module.scss';

const Picture = (props: IPictureProps): JSX.Element => {
  const { picture, removePicture } = props;
  const {
    boxContainer,
    removeBoxContainer,
    imgRef,
    textRef,
    handleTextChange,
    textValue,
    currentId,
    setCurrentId,
  } = usePicture();

  const handleClose = (): void => {
    removeBoxContainer();
    removePicture();
  };

  return (
    <>
      <Button onClick={handleClose} className={styles.close}>
        close preview
      </Button>
      <div className={styles.picture}>
        {boxContainer.map((box) => (
          <div
            title={box.text.length > 20 ? box.text : ''}
            className={styles.text}
            onClick={() => {
              textRef.current?.focus();
              setCurrentId(box.id);
            }}
            key={+box.id}
            style={{
              border: `${box.id === currentId ? '1px dashed black' : 'none'}`,
              color: `${box.text === 'type here' ? 'grey' : 'black'}`,
              top: `${box.coordinates.top}%`,
              left: `${box.coordinates.left}%`,
            }}
          >
            {box.text}
          </div>
        ))}
        <img ref={imgRef} className={styles.img} alt="img" src={picture} />
      </div>

      <input
        value={textValue}
        ref={textRef}
        type="text"
        onChange={handleTextChange}
        style={{
          zIndex: 1,
          position: 'absolute',
          top: '15px',
          right: '15px',
          width: 0,
          height: 0,
        }}
      />
    </>
  );
};

export default Picture;
