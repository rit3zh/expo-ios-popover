interface IAvailableSize {
  width: number;
  height: number;
}

interface IAvailableSizeEvent {
  nativeEvent: IAvailableSize;
}

interface IOpenChangeEvent {
  nativeEvent: { isOpen: boolean };
}

export type { IAvailableSize, IAvailableSizeEvent, IOpenChangeEvent };
