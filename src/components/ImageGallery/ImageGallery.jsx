// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
// import Loader from '../Loader/Loader';
// import Button from '../Button/Button';
// import { nanoid } from 'nanoid';
// import PropTypes from 'prop-types';

// const ImageGallery = ({ query, page, perPage, onOpenModal }) => {
//   const [images, setImages] = useState([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const [totalImages, setTotalImages] = useState(0);
//   const [currentPage, setCurrentPage] = useState(1);

//   const addScrollListener = () => {
//     window.addEventListener('scroll', handleScroll);
//   };

//   const removeScrollListener = () => {
//     window.removeEventListener('scroll', handleScroll);
//   };

//   const handleScroll = () => {
//     if (!isLoading && images.length < totalImages) {
//       const { innerHeight } = window;
//       const { scrollHeight, scrollTop } = document.documentElement;
//       const scrolledToBottom = innerHeight + scrollTop >= scrollHeight;

//       if (scrolledToBottom) {
//         fetchImages();
//       }
//     }
//   };

//   const fetchImages = () => {
//     const apiKey = '37446225-ced4f53dd81a7d760f8a029fd';
//     const url = `https://pixabay.com/api/?q=${query}&page=${currentPage}&key=${apiKey}&image_type=photo&orientation=horizontal&per_page=${perPage}`;

//     setIsLoading(true);

//     axios
//       .get(url)
//       .then(response => {
//         const newImages = response.data.hits.map(image => ({
//           ...image,
//           id: nanoid(),
//         }));

//         setImages(prevImages => [...prevImages, ...newImages]);
//         setIsLoading(false);
//         setTotalImages(response.data.total);
//         setCurrentPage(prevPage => prevPage + 1);
//       })
//       .catch(error => {
//         console.error('Error fetching images:', error);
//         setIsLoading(false);
//       });
//   };

//   useEffect(() => {
//     setCurrentPage(1);
//     setImages([]);
//     fetchImages();
//     addScrollListener();

//     return () => removeScrollListener();
//   }, [query, isLoading, images.length, totalImages, currentPage]); 

//   return (
//     <div>
//       <ul className="ImageGallery">
//         {images.map(image => (
//           <ImageGalleryItem key={image.id} image={image} onOpenModal={onOpenModal} />
//         ))}
//       </ul>
//       {isLoading && <Loader />}
//       {images.length > 0 && images.length < totalImages && (
//         <Button onClick={fetchImages} hasMore={!isLoading} />
//       )}
//     </div>
//   );
// };

// ImageGallery.propTypes = {
//   query: PropTypes.string.isRequired,
//   page: PropTypes.number.isRequired,
//   perPage: PropTypes.number.isRequired,
//   onOpenModal: PropTypes.func.isRequired,
// };

// export default ImageGallery;
// // 
// useEffect(() => {
//   const addScrollListener = () => {
//     window.addEventListener('click', handleScroll);
//   };

//   const removeScrollListener = () => {
//     window.removeEventListener('click', handleScroll);
//   };

//   const handleScroll = () => {
//     if (!isLoading && images.length < totalImages) {
//       const { innerHeight } = window;
//       const { scrollHeight, scrollTop } = document.documentElement;
//       const scrolledToBottom = innerHeight + scrollTop >= scrollHeight;

//       if (scrolledToBottom) {
//         fetchImages();
//       }
//     }
//   };

//   const fetchImages = () => {
//     const apiKey = '37446225-ced4f53dd81a7d760f8a029fd';
//     const url = `https://pixabay.com/api/?q=${query}&page=${currentPage}&key=${apiKey}&image_type=photo&orientation=horizontal&per_page=${perPage}`;

//     setIsLoading(true);

//     axios
//       .get(url)
//       .then(response => {
//         const newImages = response.data.hits.map(image => ({
//           ...image,
//           id: nanoid(),
//         }));

//         setImages(prevImages => [...prevImages, ...newImages]);
//         setIsLoading(false);
//         setTotalImages(response.data.total);
//         setCurrentPage(prevPage => prevPage + 1);
//       })
//       .catch(error => {
//         console.error('Error fetching images:', error);
//         setIsLoading(false);
//       });
//   };

//   setCurrentPage(1);
//   setImages([]);
//   fetchImages();
//   addScrollListener();

//   return () => removeScrollListener();
// }, [query, currentPage, isLoading, images.length, totalImages, perPage]);
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import Loader from '../Loader/Loader';
import Button from '../Button/Button';
import { nanoid } from 'nanoid';
import PropTypes from 'prop-types';

const ImageGallery = ({ query, page, perPage, onOpenModal }) => {
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [totalImages, setTotalImages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  const handleScroll = () => {
    if (!isLoading && images.length < totalImages) {
      const { innerHeight } = window;
      const { scrollHeight, scrollTop } = document.documentElement;
      const scrolledToBottom = innerHeight + scrollTop >= scrollHeight;

      if (scrolledToBottom) {
        fetchImages();
      }
    }
  };

  const fetchImages = () => {
    const apiKey = '37446225-ced4f53dd81a7d760f8a029fd';
    const url = `https://pixabay.com/api/?q=${query}&page=${currentPage}&key=${apiKey}&image_type=photo&orientation=horizontal&per_page=${perPage}`;

    setIsLoading(true);

    axios
      .get(url)
      .then(response => {
        const newImages = response.data.hits.map(image => ({
          ...image,
          id: nanoid(),
        }));

        setImages(prevImages => [...prevImages, ...newImages]);
        setIsLoading(false);
        setTotalImages(response.data.total);
        setCurrentPage(prevPage => prevPage + 1);
      })
      .catch(error => {
        console.error('Error fetching images:', error);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    fetchImages();

    const addScrollListener = () => {
      window.addEventListener('click', handleScroll);
    };

    const removeScrollListener = () => {
      window.removeEventListener('click', handleScroll);
    };

    addScrollListener();
    return () => removeScrollListener();
  }, [currentPage, isLoading, images.length, totalImages, query, perPage, fetchImages, handleScroll,]);

  return (
    <div>
      <ul className="ImageGallery">
        {images.map(image => (
          <ImageGalleryItem key={image.id} image={image} onOpenModal={onOpenModal} />
        ))}
      </ul>
      {isLoading && <Loader />}
      {images.length > 0 && images.length < totalImages && (
        <Button onClick={fetchImages} hasMore={!isLoading} />
      )}
    </div>
  );
};

ImageGallery.propTypes = {
  query: PropTypes.string.isRequired,
  page: PropTypes.number.isRequired,
  perPage: PropTypes.number.isRequired,
  onOpenModal: PropTypes.func.isRequired,
};

export default ImageGallery;