import { File } from "@utils/types/File";

const generateIndexBladeOneTemplateFile = ():File => {
    const content = `<!DOCTYPE html>
    <html {{$language_attributes}}>
    <head>
        <meta charset="{{$charset}}">
        <meta name="viewport" content="width=device-width, initial-scale=1.0\">
        <title>{{$title}}</title>
        {{ wp_head() }}
    </head>
    <body class="{{$body_class->implode(' ')}}">
        <header>
            <h1>{{$site_name}}</h1>
            <p>{{$site_description}}</p>
        </header>
        <main>
            @if(have_posts())
                @while(have_posts())
                    @php(the_post())
                    <article>
                        <h2><a href="{{ get_permalink() }}">{{ get_the_title() }}</a></h2>
                        {{ the_content() }}
                    </article>
                @endwhile
            @else
                No posts found.
            @endif
        </main>
        
        <footer>
            <p>&copy; {{ date('Y') }} {{ $site_name }}</p>
        </footer>
        
        {{ wp_footer() }}
    </body>
    </html>`;

    return {
        name: 'index.blade.php',
        content
    }
};

export default generateIndexBladeOneTemplateFile;