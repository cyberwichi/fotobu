const {
    Image
} = require('../models');

module.exports = {

    async popular() {
        await images = Image.find()
            .limit(6)
            .sort({
                likes: -1
            });
        return images;
    }

}