interface generateJsEnqueueTemplate {
    handle: string;
}

const generateJsEnqueueTemplate = ({handle}:generateJsEnqueueTemplate) => {
    return `wp_enqueue_script('${handle}');`;
};

export default generateJsEnqueueTemplate;