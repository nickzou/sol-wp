import { File } from "@utils/types/File";

const generateIndexLatteFile = ():File => {
    const content = `<?php
    $latte->render(get_template_directory() . '/views/index.latte', get_global_context());
    `;

    return {
        name: 'index.php',
        content
    }
};

export default generateIndexLatteFile;