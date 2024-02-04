import { File } from "@utils/types/File";

const generateIndexBladeOneFile = ():File => {
    const content = `<?php

    echo $views->run("index", get_global_context());
    `;

    return {
        name: 'index.php',
        content
    }
};

export default generateIndexBladeOneFile;