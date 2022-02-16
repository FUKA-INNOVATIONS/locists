import { StatusBar } from "expo-status-bar";

import UserStorage from "./src/utils/userStorage";
import UserStorageContext from "./src/context/UserStorageContext";

// import Main from './src/views/Main';
import { AddPost } from "./src/views/AddPost";

// Create new instance of the storage
const userDataStorage = new UserStorage();

export default function App() {
  return (
    <>
      <UserStorageContext.Provider value={userDataStorage}>
        <AddPost />
      </UserStorageContext.Provider>
      <StatusBar style="auto" />
    </>
  );
}
