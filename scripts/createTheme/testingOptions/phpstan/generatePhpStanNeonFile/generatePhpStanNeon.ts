import { File } from "@utils/types/File";

const generatePhpStanNeon = (themeFolder:string):File => {
    const content = `parameters:
    level: 1
    paths:
        - wp/themes/${themeFolder}
    excludePaths:
        - wp/themes/${themeFolder}/vendor
    bootstrapFiles:
        - wp/themes/${themeFolder}/vendor/php-stubs/wordpress-stubs/wordpress-stubs.php
        - phpstan/bootstrap.php
    ignoreErrors:
        - '#File ends with a trailing whitespace#'`;

    return {
        name: 'phpstan.neon',
        content
    }
};

export default generatePhpStanNeon;