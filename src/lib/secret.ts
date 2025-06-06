const { VITE_API_BASE_URL, VITE_NANOID_CHARSET, VITE_NANOID_SIZE, VITE_API_IMG_URL } = import.meta.env;

const BASE_API = VITE_API_BASE_URL;
const NANOID_CHARSET = VITE_NANOID_CHARSET;
const NANOID_SIZE = VITE_NANOID_SIZE;
const API_IMAGE_URL = VITE_API_IMG_URL;

export { API_IMAGE_URL, BASE_API, NANOID_CHARSET, NANOID_SIZE };
