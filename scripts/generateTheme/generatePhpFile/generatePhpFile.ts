interface PhpFile {
  name: string;
  content: string;
}

const generatePhpFile = (): PhpFile => {
  const content = `
<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
    <meta charset=\"<?php bloginfo( 'charset' ); ?>\">
    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">
    <title><?php wp_title(); ?></title>
    <?php wp_head(); ?>
</head>
<body <?php body_class(); ?>>
    <header>
        <h1><?php bloginfo( 'name' ); ?></h1>
        <p><?php bloginfo( 'description' ); ?></p>
    </header>
    
    <main>
        <?php if ( have_posts() ) : while ( have_posts() ) : the_post(); ?>
            <article>
                <h2><a href=\"<?php the_permalink(); ?>\"><?php the_title(); ?></a></h2>
                <?php the_content(); ?>
            </article>
        <?php endwhile; else : ?>
            <p><?php _e( 'No posts found.', 'textdomain' ); ?></p>
        <?php endif; ?>
    </main>
    
    <footer>
        <p>&copy; <?php echo date( 'Y' ); ?> <?php bloginfo( 'name' ); ?></p>
    </footer>
    
    <?php wp_footer(); ?>
</body>
</html>
`;

  return {
    name: `index.php`,
    content,
  };
};

export default generatePhpFile;
