import { useEffect, useState } from "react";

const ImageGrid = ({
  images,
  screen,
  backgroundColors,
  handleChoice,
  shadowColor = "#0076a3",
  shadowOffset = { x: 6, y: 5 },
  shadowRadius = 4,
}) => {
  const [imageSources, setImageSources] = useState({});

  useEffect(() => {
    const loadImage = async (imageName) => {
      const image = await import(
        `../assets/images/screen_${screen}_imgs/${imageName}`
      );
      return image.default;
    };

    const fetchImages = async () => {
      const loadedImages = {};
      for (let image of images) {
        const src = await loadImage(image);
        loadedImages[image] = src;
      }
      setImageSources(loadedImages);
    };

    fetchImages();
  }, [images, screen]);

  return (
    <div className="container  py-4">
      <div className="row justify-content-center">
        {images.map((image, index) => (
          <div
            key={index}
            className="col-6 col-sm-4 col-md-3 mb-3 d-flex justify-content-center"
          >
            <div
              className={`bg-light border border-black border-4 shadow-sm rounded position-relative w-100`}
              style={{ paddingTop: "100%", cursor: "pointer" }}
              onClick={() => handleChoice(image, index)}
            >
              {imageSources[image] && (
                <img
                  src={imageSources[image]}
                  alt={`img ${index + 1}`}
                  className="img-fluid rounded position-absolute top-0 start-0 w-100 h-100 object-fit-cover"
                />
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageGrid;
