const axios = require("axios");
const fs = require("fs-extra");
const path = require("path");

const IMAGES_PATH = "images/external";
const IMAGES_DIR = path.join(__dirname, "../", IMAGES_PATH);
const OUTPUT = path.join(__dirname, "../src/imagesList.json");

async function fetchImages() {
  try {
    const response = await axios.get(
      "https://picsum.photos/v2/list?page=1&limit=3"
    );
    const images = response.data;
    const imagesUrl = [];

    // create an images directory if it doesn't exist
    await fs.ensureDir(IMAGES_DIR);

    for (const img of images) {
      const imageUrl = img.download_url;
      const imageName = `${img.id}.jpg`;
      const imagePath = path.join(IMAGES_DIR, imageName);

      // download and save the image
      const imageResponse = await axios({
        url: imageUrl,
        responseType: "arraybuffer",
      });
      await fs.writeFile(imagePath, imageResponse.data);

      imagesUrl.push(`${IMAGES_PATH}/${imageName}`);

      console.log(`Image downloaded: ${imagePath}`);
    }

    fs.writeFileSync(OUTPUT, JSON.stringify(imagesUrl, null, 2));
  } catch (error) {
    console.error(
      "An error occurred while fetching images from picsum.photos:",
      error
    );
  }
}

fetchImages();
