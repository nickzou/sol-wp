interface generateJsRegisterTemplate {
    handle: string;
    file: string;
}

const generateJsRegisterTemplate = ({handle, file}:generateJsRegisterTemplate) => {
    return `wp_register_script('${handle}', get_template_directory_uri() . '/js/${file}.js', [], '1.0.0', ['strategy' => 'defer', 'in_footer' => true]);`
};

export default generateJsRegisterTemplate;