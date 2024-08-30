import { useState, useEffect } from 'react'
import JoblyApi from "../api/api";

const useItems = (item, req) => {
    const [isLoading, setIsLoading] = useState(true);
    const [items, setItems] = useState([]);

    useEffect(() => {
        async function getItems(item, req) {
          const itemList = await JoblyApi.getItems(item, req);
          setItems(itemList);
          setIsLoading(false);
        }
        getItems(item, req)
      }, []);
    return [items, setItems, isLoading, setIsLoading]
}

export default useItems
