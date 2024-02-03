import { File } from "@utils/types/File";

const generateIndexSmartyFile = ():File => {
    const content = `<?php
    $post_data = [];
    
    if (have_posts()) {
        while(have_posts()) {
            the_post();

            $post_data[] = [
                'link' => get_the_permalink(),
                'title' => get_the_title(),
                'content' => get_the_content(),
            ];
        }
    };
    
    $views->assign('posts', $post_data);
    $views->display('index.tpl');
?>`;

    return {
        name: 'index.php',
        content
    }
};

export default generateIndexSmartyFile;