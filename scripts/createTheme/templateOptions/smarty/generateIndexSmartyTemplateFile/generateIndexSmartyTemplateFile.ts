import { File } from "@utils/types/File";

const generateIndexSmartyTemplateFile = ():File => {
    const content = `{* Smarty *}
<!DOCTYPE html>
    <html {$language_attributes}>
        <head>
            <meta charset="{$charset}">
            <meta name="viewport" content="width=device-width, initial-scale=1.0\">
            <title>{$title}</title>
            {$wp_head|unescape}
        </head>
        <body class="{$body_class|join(' ')}">
            <header>
                <h1>{$site_name}</h1>
                <p>{$site_description}</p>
            </header>
            <main>
                {if $posts }
                    { foreach $posts as $post }
                        <article>
                            <h2><a href="{$post.link}">{$post.title}</a></h2>
                            {$post.content | unescaped}
                        </article>
                    { endforeach }
                { else }
                    No posts found.
                { endif }
            </main>
            
            <footer>
                <p>&copy; {$smarty.now|date_format:"%Y"} {$site_name}</p>
            </footer>
            
            {$wp_footer|unescaped}
        </body>
    </html>`;

    return {
        name: `index.tpl`,
        content
    }
};

export default generateIndexSmartyTemplateFile;