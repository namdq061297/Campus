import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useCallback,
} from 'react';
import { Portal, Dialog, Button, Paragraph } from 'react-native-paper';
type AlertParams = {
  title: string;
  message: string;
  titleConfirm?: string;
  titleCancel?: string;
  onConfirm?: () => void;
  onCancel?: () => void;
};

type AlertContextType = {
  showAlert: (params: AlertParams) => void;
};

const AlertContext = createContext<AlertContextType>({
  showAlert: () => { },
});

export const AlertProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [visible, setVisible] = useState(false);
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [titleConfirm, setTitleConfirm] = useState('');
  const [titleCancel, setTitleCancel] = useState('');
  const [onConfirm, setOnConfirm] = useState<(() => void) | undefined>();
  const [onCancel, setOnCancel] = useState<(() => void) | undefined>();

  const showAlert = useCallback(
    ({ title, message, onConfirm, onCancel, titleCancel, titleConfirm }: AlertParams) => {
      setTitle(title);
      setMessage(message);
      setTitleConfirm(titleCancel ?? '');
      setTitleCancel(titleConfirm ?? '');
      setOnConfirm(() => onConfirm);
      setOnCancel(() => onCancel);
      setVisible(true);
    },
    []
  );


  const handleClose = () => {
    setVisible(false);
    setTitle('');
    setMessage('');
    setOnConfirm(undefined);
    setOnCancel(undefined);
  };

  const handleConfirm = () => {
    handleClose();
    onConfirm?.();
  };

  const handleCancel = () => {
    handleClose();
    onCancel?.();
  };

  return (
    <AlertContext.Provider value={{ showAlert }}>
      <Portal>
        <Dialog visible={visible} onDismiss={handleClose}>
          {!!title && <Dialog.Title>{title}</Dialog.Title>}
          {!!message && (
            <Dialog.Content>
              <Paragraph>{message}</Paragraph>
            </Dialog.Content>
          )}
          {(onCancel || onConfirm) && (
            <Dialog.Actions>
              {onCancel && <Button onPress={handleCancel}>Cancel</Button>}
              <Button onPress={handleConfirm}>
                {onConfirm ? (titleConfirm ?? 'OK') : (titleCancel ?? 'Close')}
              </Button>
            </Dialog.Actions>
          )}
        </Dialog>
      </Portal>
      {children}
    </AlertContext.Provider>
  );
};

export const useAlert = () => useContext(AlertContext);
