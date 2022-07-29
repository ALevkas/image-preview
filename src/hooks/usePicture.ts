import { useEffect, useRef, useState } from 'react';

interface IBoxItem {
  id: number;
  coordinates: {
    top: number;
    left: number;
  };
  text: string;
}

interface IUsePicture {
  boxContainer: IBoxItem[];
  removeBoxContainer: () => void;
  imgRef: React.RefObject<HTMLImageElement>;
  textRef: React.RefObject<HTMLInputElement>;
  handleTextChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  textValue: string;
  currentId: number;
  setCurrentId: (id: number) => void;
}

const usePicture = (): IUsePicture => {
  const [boxContainer, setBoxContainer] = useState<IBoxItem[]>([]);
  const [currentId, setCurrentId] = useState<number>(-1);
  const [textValue, setTextValue] = useState<string>('');

  const imgRef = useRef<HTMLImageElement>(null);
  const textRef = useRef<HTMLInputElement>(null);

  const removeBoxContainer = (): void => {
    setBoxContainer([]);
  };

  const handleAddBox = (e: MouseEvent): void => {
    setCurrentId(-1);
    setTextValue('');

    const element = e.target as HTMLElement;
    const rect = element.getBoundingClientRect();
    const top = (100 * e.offsetY) / rect.height - 1;
    const left = (100 * e.offsetX) / rect.width - 1;

    const newId = +new Date();

    setCurrentId(newId);
    setTextValue('type here');

    setBoxContainer((prev) => [
      ...prev,
      {
        id: newId,
        coordinates: { top, left },
        text: 'type here',
      },
    ]);

    textRef.current?.focus();
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setTextValue(e.target.value.replace('type here', ''));
  };

  useEffect(() => {
    const boxElem = boxContainer.find((box) => box.id === currentId);

    if (currentId === -1 || !boxElem) return;

    setTextValue(boxElem.text);
  }, [currentId]);

  useEffect(() => {
    const previes = boxContainer.filter((elem) => elem.id !== currentId);
    const currentDiv = boxContainer.find((elem) => elem.id === currentId);

    if (currentDiv) {
      if (textValue) {
        currentDiv.text = textValue;
        setBoxContainer([...previes, currentDiv]);
      } else {
        setBoxContainer(previes);
      }
    }
  }, [textValue]);

  useEffect(() => {
    const onClick = (e: MouseEvent): boolean | void =>
      imgRef.current?.contains(e.target as Node) && handleAddBox(e);

    document.addEventListener('click', onClick);

    return () => {
      document.removeEventListener('click', onClick);
    };
  }, []);

  return {
    boxContainer,
    removeBoxContainer,
    imgRef,
    textRef,
    handleTextChange,
    textValue,
    currentId,
    setCurrentId,
  };
};

export default usePicture;
