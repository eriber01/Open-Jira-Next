import { toast } from "react-toastify";

type typesMessage = 'success' | 'error'

interface PropsMessage {
  message: string
  type: typesMessage
}

export const onMessage = ({ message, type }: PropsMessage) => {

  switch (type) {
    case 'success':
      return toast.success(message);
    case 'error':
      return toast.error(message);
    default:
      break;
  }

}