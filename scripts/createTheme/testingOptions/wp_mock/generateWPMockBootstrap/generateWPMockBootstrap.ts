import { File } from "@utils/types/File";

const generateWPMockBootstrap = ():File => {
    const content = `<?php
require_once dirname(__DIR__).'/vendor/autoload.php';

WP_Mock::bootstrap();

//Add functions here`;

    return {
        name: 'bootstrap.php',
        content
    }
};

export default generateWPMockBootstrap;