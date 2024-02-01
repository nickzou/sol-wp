import generatePhpFunctionFile from "@createTheme/generatePhpFunctionFile/generatePhpFunctionFile";

const generateSetupSmartyPhpFunctionFile = () => {
    return generatePhpFunctionFile({
        name: "setup_smarty",
        functionBody: `  global $views, $posts, $post, $wp_did_header, $wp_query, $wp_rewrite, $wpdb, $wp_version, $wp, $id, $comment, $user_ID;
        $views = new \\Smarty\\Smarty();
        $views->setTemplateDir(get_template_directory() . '/views/views');
        $views->setConfigDir(get_template_directory() . '/views/config');
        $views->setCompileDir(get_template_directory() . '/views/compile');
        $views->setCacheDir(get_template_directory() . '/views/cache');
        $views->testInstall();
        
        $views->`
    })
};

export default generateSetupSmartyPhpFunctionFile;