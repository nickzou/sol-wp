import { File } from "@utils/types/File";

const generatePhpStanBootstrapFile = ():File => {
    const content = `<?php
    define("WP_DEBUG", true);
    `;

    return {
        name: 'bootstrap.php',
        content
    }
};

export default generatePhpStanBootstrapFile;