import { File } from "@utils/types/File";

const generateIndexLatteTemplateFile = ():File => {
    const content = `<!DOCTYPE html>
    <html {$language_attributes}>
    <head>
        <meta charset="{$charset}">
        <meta name="viewport" content="width=device-width, initial-scale=1.0\">
        <title>{$title}</title>
        {php wp_head()}
    </head>
    <body class="{$body_class|join:' '}">
        <header>
            <h1>{$site_name}</h1>
            <p>{$site_description}</p>
        </header>
        <main>
            { if $posts }
                { for $posts as $post }
                    <article>
                        <h2><a href="{$post.link}">{$post.title}</a></h2>
                        {$post.content}
                    </article>
                {% endfor %}
            { else }
                No posts found.
            { endif }
        </main>
        
        <footer>
            <p>&copy; {"now"|date:'Y'} {$site_name}</p>
        </footer>
        
        {php wp_footer()}
    </body>
    </html>`;

    return {
        name: 'index.latte',
        content
    }
};

export default generateIndexLatteTemplateFile;