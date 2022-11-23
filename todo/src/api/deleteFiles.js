import { deleteObject, ref } from 'firebase/storage';
import { storage } from '../firebase';

/**
 * удаляет файл из storage
 * @param {string} name
 */

export const deleteFile = (name) => {
  const desertRef = ref(storage, `/${name}`);

  // Delete the file
  deleteObject(desertRef)
    .then(() => {
      // File deleted successfully
    })
    .catch((error) => {
      // Uh-oh, an error occurred!
    });
};
