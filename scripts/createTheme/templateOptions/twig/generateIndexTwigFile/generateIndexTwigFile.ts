import { File } from "@utils/types/File";

const generateIndexTwigFile = ():File => {
    const content = `<?php
    echo $views->render('index.twig');
?>   
    `;

    return {
        name: 'index.php',
        content
    }
};

export default generateIndexTwigFile;