const { uploader } = require("cloudinary").v2

async function uploads(filePath) {
    try {
        let result = await uploader.upload(filePath, {
            folder: "products",
            use_filename: true
        })
        
        return result.url
    } catch (error) {
        console.log(error);
        throw error
    }
}

module.exports = uploads