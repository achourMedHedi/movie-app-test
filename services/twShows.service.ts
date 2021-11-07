import axios from "axios"
import { API_KEY } from "../contants"

export const fetchTvShowsListApi = async () => {
    const result = await axios.get(`https://api.themoviedb.org/3/tv/top_rated?api_key=${API_KEY}&language=en-US&page=1`)
    return result.data.results
}