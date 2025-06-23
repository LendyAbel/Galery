import axios from "axios";
const baseUrl = '/api/photos'

const getAll = async () =>{
    try {
        const res = await axios.get(`${baseUrl}/allPhotos`)
        console.log('res.data',res.data)
        return res.data
        
    } catch (error) {
        console.error('Error al obtener las fotos',error)
    }
}

export default {getAll}