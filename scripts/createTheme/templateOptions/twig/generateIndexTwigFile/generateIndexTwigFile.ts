import { File } from "@utils/types/File";

const generateIndexTwigFile = ():File => {
    const content = `<?php
    // $post_data = [];

    // if ( have_posts()){
    //     while(have_posts()) {
    //         the_post();
    //         $post_data[] = [
    //             'link' => get_the_permalink(),
    //             'title' => get_the_title(),
    //             'content' => get_the_content(),
    //         ];
    //     }
    // };

    // $context = [
    //     'posts' => $post_data
    // ];

    echo $views->render('index.twig', $context);
?>   
    `;

    return {
        name: 'index.php',
        content
    }
};

export default generateIndexTwigFile;