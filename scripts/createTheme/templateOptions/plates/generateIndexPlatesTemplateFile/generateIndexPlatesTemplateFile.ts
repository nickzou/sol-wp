import { File } from "@utils/types/File";

const generateIndexPlatesTemplateFile = ():File => {
    const content = `<!DOCTYPE html>
    <html <?= $this->e($language_attributes) ?>>
    <head>
        <meta charset="<?= $this->e($charset) ?>">
        <meta name="viewport" content="width=device-width, initial-scale=1.0\">
        <title><?= $this->e($title) ?></title>
        <?= $wp_head ?>
    </head>
    <body class="<?= implode(' ', $body_class) ?>">
        <header>
            <h1><?= $this->e($site_name) ?></h1>
            <p><?= $this->e($site_description) ?></p>
        </header>
        <main>
            <?php if($posts): ?>
                <?php foreach($posts as $post): ?>
                    <article>
                        <h2><a href="<?= $this->e($post->link) ?>"><?=$this->e($post->title)?></a></h2>
                        <?= $post->content ?>
                    </article>
                <?php endforeach; ?>
            <?php else: ?>
                No posts found.
            <?php endif; ?>
        </main>
        
        <footer>
            <p>&copy; <?= $this->e(date("Y")) ?> <?= $this->e($site_name) ?></p>
        </footer>
        
        <?= $wp_footer ?>
    </body>
    </html>
    `;

    return {
        name: `index.php`,
        content,
    }
};

export default generateIndexPlatesTemplateFile;