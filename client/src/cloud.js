const cloudinary = require('cloudinary').v2;

// Configure Cloudinary
cloudinary.config({
  cloud_name: 'your-cloud-name',
  api_key: 'your-api-key',
  api_secret: 'your-api-secret'
});

// List of images to upload
const images = [
  './public/sreemeditec.png',
  './public/00172.png',
  './public/00272 (1).png',
  './public/00472.png',
  './public/00572 (1).png',
  './public/00672.png',
  './public/00772.png',
  './public/00872.png',
  './public/00972 (1).png',
  './public/01172.png',
  './public/01272.png',
  './public/01372.png',
  './public/01472 (1).png',
  './public/01572.png'
];

async function uploadImage(filePath) {
  try {
    const result = await cloudinary.uploader.upload(filePath, {
      upload_preset: 'your-upload-preset',
      folder: 'gallery',
      transformation: [{ quality: 'auto', fetch_format: 'auto' }]
    });
    console.log(`Uploaded ${filePath}: ${result.secure_url}`);
    return result.secure_url;
  } catch (error) {
    console.error(`Error uploading ${filePath}:`, error);
  }
}

// Upload all images
async function uploadAllImages() {
  for (const image of images) {
    await uploadImage(image);
  }
}

uploadAllImages();