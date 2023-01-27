import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/api/';

const API_KEY = '31620730-cb4a39b7fbcb60cc00e539a30';

const fetchImages = async(query, page) => {
  const response = await axios.get(
    `?q=${query}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
    )
    return response.data;
}

export default fetchImages