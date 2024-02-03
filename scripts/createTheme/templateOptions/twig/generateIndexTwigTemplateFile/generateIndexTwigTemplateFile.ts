import { File } from "@utils/types/File";

const generateIndexTwigTemplateFile = (): File => {
    const content = `<!DOCTYPE html>
    <html {{language_attributes}}>
    <head>
        <meta charset="{{charset}}">
        <meta name="viewport" content="width=device-width, initial-scale=1.0\">
        <title>{{title}}</title>
        {{wp_head | raw}}
    </head>
    <body class="{{body_class|join(' ')}}">
        <header>
            <h1>{{site_name}}</h1>
            <p>{{site_description}}</p>
        </header>
        <main>
            {% if posts %}
                {% for post in posts %}
                    <article>
                        <h2><a href="{{get_permalink(post.ID)}}">{{post.post_title}}</a></h2>
                        {{post.post_content | raw}}
                    </article>
                {% endfor %}
            {% else %}
                No posts found.
            {% endif %}
        </main>
        
        <footer>
            <p>&copy; {{"now"|date("Y")}} {{site_name}}</p>
        </footer>
        
        {{wp_footer | raw}}
    </body>
    </html>
    `;

    return {
        name: `index.twig`,
        content,
    }
};

export default generateIndexTwigTemplateFile;