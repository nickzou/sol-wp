interface generateStyleEnqueueTemplate {
    handle: string;
}

const generateStyleEnqueueTemplate = ({handle}:generateStyleEnqueueTemplate) => {
    return `wp_enqueue_style('${handle}')`;
};

export default generateStyleEnqueueTemplate;