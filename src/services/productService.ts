export const fetchProducts=async()=>{

    const apiUrl ="https://fakestoreapi.com/products";
    
    try {
        const response = await fetch(apiUrl);
        const data = await response.json()
        return data
    } catch (error) {
        console.error("At time of fetching data",error);
        return[];
    }
}