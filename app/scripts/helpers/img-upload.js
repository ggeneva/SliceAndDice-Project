/* global $ */

const clientId = 'cb5cf831126a0dd';
const uploadUrl = 'https://api.imgur.com/3/image';

class ImageUpload {
    uploadToApi(file) {
        return new Promise((resolve, reject) => {
            $.ajax({
                url: uploadUrl,
                type: 'POST',
                headers: {
                    'Authorization': 'Client-ID ' + clientId,
                },
                data: file,
                success: resolve,
                error: reject,
                processData: false,
            });
        });
    }
}

const uploadImg = new ImageUpload();

export { uploadImg };
