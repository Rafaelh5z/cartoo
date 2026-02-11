import { useQuery } from "@apollo/client/react";


export default function GetProductList(query) {

    const { error, data, loading } = useQuery(query);

    return { error, data, loading };
} 
