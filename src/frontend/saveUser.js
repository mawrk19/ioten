
import { db } from './firebase';

const saveUser = async (user) => {
  try {
    await db.collection('users').add(user);
    console.log('User saved successfully');
  } catch (error) {
    console.error('Error saving user: ', error);
  }
};

export { saveUser };