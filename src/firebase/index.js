import FireBaseTools from './firebase';

export const get = FireBaseTools.getDatabaseReference;
export const loginUser = FireBaseTools.loginUser;

export function firebaseStorage(path) {
  return FireBaseTools.getStorageReference(path);
}
