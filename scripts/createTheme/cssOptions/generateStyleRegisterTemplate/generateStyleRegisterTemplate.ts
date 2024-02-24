interface generateStyleEnqueueTemplate {
    handle: string;
    file: string;
}
const generateStyleEnqueueTemplate = ({handle, file}:generateStyleEnqueueTemplate) => {
    return `wp_register_style('${handle}', get_template_directory_uri() . '/css/${file}.css', [], '1.0.0', 'all' )`;
};

export default generateStyleEnqueueTemplate;