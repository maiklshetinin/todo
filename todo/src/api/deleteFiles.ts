import { deleteObject, ref } from 'firebase/storage';
import { storage } from '../firebase';

export const deleteFile = (name: string) => {
  const desertRef = ref(storage, `/${name}`);

  // Delete the file
  deleteObject(desertRef)
    .then(() => {
      // File deleted successfully
    })
    .catch((error) => {
      // eslint-disable-next-line no-console
      console.log(error);
      // Uh-oh, an error occurred!
    });
};
