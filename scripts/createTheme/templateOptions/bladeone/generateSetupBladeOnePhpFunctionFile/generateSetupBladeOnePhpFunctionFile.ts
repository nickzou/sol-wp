import generatePhpFunctionFile from "@createTheme/generatePhpFunctionFile/generatePhpFunctionFile";

const generateSetupBladeOneFunctionFile = () => {
    return generatePhpFunctionFile({
        name: "setup_bladeone",
        functionBody: `$viewsDir = get_template_directory() . '/views';
  $cache = get_template_directory() . '/cache';
  
  global $views, $posts, $post, $wp_did_header, $wp_query, $wp_rewrite, $wpdb, $wp_version, $wp, $id, $comment, $user_ID;

  $views = new eftec\\bladeone\\BladeOne($viewsDir, $cache);
  $views->pipeEnable=true;`
    })
};

export default generateSetupBladeOneFunctionFile;