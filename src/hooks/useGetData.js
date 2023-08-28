import { db } from "../firebase";
import { useState } from "react";
import { useEffect } from "react";
import { collection, getDocs, onSnapshot } from "firebase/firestore";
import { toast } from "react-toastify";

export const useGetData = (collectionName) => {
  const [data, setData] = useState([]);
  const collectionRef = collection(db, collectionName);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // const getData = async () => {
    //   try {
    //     const dataRef = await getDocs(collectionRef);
    //     const filteredData = dataRef.docs.map((doc) => ({
    //       ...doc.data(),
    //       id: doc.id,
    //     }));
    //     setData(filteredData);
    //     console.log(filteredData);
    //   } catch (error) {
    //     toast.error(error.message);
    //   }
    // };
    const getData = async () => {
      await onSnapshot(collectionRef, (snapshot) => {
        setData(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        setLoading(false);
      });
    };
    getData();
  }, []);

  return { data, loading };
};
