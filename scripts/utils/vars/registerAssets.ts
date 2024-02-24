export type registerAsset = {
    handle: string;
    file: string;
    fileType: 'css' | 'js';
};

const registerAssets:registerAsset[] = [];

export default registerAssets;