import generatePhpFunctionFile from "@createTheme/generatePhpFunctionFile/generatePhpFunctionFile";

const generateSetupBladeOneFunctionFile = () => {
    return generatePhpFunctionFile({
        name: "setup_bladeone",
        functionBody: `$views = get_template_directory() . '/views';
  $cache = get_template_directory() . '/cache';
  
  global $blade, $posts, $post, $wp_did_header, $wp_query, $wp_rewrite, $wpdb, $wp_version, $wp, $id, $comment, $user_ID;

  $blade = new eftec\\bladeone\\BladeOne($views, $cache);`
    })
};

export default generateSetupBladeOneFunctionFile;