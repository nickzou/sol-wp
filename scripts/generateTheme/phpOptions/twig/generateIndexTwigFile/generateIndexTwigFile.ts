import { File } from "@utils/types/File";

const generateIndexTwigFile = ():File => {
    const content = `<?php
    $posts = [];

    if ( have_posts()){
        while(have_posts()) {
            the_post();
            $posts[] = [
                'link' => get_the_permalink(),
                'title' => get_the_title(),
                'content' => get_the_content(),
            ];
        }
    };

    $context = [
        'wp_head' => capture_wp_head(),
        'wp_footer' => capture_wp_footer(),
        'language_attributes' => get_language_attributes(),
        'charset' => get_bloginfo( 'charset' ),
        'title' => wp_title( '|', false),
        'body_class' => get_body_class(),
        'site_name' => get_bloginfo( 'name' ),
        'site_description' => get_bloginfo( 'description' ),
        'posts' => $posts
    ];

    echo $twig->render('index.twig', $context);
?>   
    `;

    return {
        name: 'index.php',
        content
    }
};

export default generateIndexTwigFile;