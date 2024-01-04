import { File } from "@utils/types/File";

const generateIndexBladeOneFile = ():File => {
    const content = `<?php
    $views = __DIR__ . '/views';
    $cache = __DIR__ . '/cache';
    $blade = new eftec\\bladeone\\BladeOne($views,$cache);

    $post_data = [];

    if(have_posts()) {
        while(have_posts()) {
            the_post();
            $post_data[] = [
                'link' => get_the_permalink(),
                'title' => get_the_title(),
                'content' => get_the_content(),
            ];
        }
    }

    echo $blade->run("index", $post_data);
    `;

    return {
        name: 'index.php',
        content
    }
};

export default generateIndexBladeOneFile;