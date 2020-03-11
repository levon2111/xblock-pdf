/* Javascript for pdfXBlock. */
function pdfXBlockInitView(runtime, element) {
    alert(888)
    var kaka = getData()
    console.log(kaka)
    console.log(element)
    console.log(runtime)
    console.trace(runtime)
    let block_id = $(element).attr("data-usage-id");
    let course_id = $(element).attr("data-course-id");
    console.log(block_id)
    console.log(course_id)
    /* Weird behaviour :
     * In the LMS, element is the DOM container.
     * In the CMS, element is the jQuery object associated*
     * So here I make sure element is the jQuery object */
    if (element.innerHTML) {
        element = $(element);
    }

    $(function () {
        element.find('.pdf-download-button').on('click', function () {
            var handlerUrl = runtime.handlerUrl(element, 'on_download');
            $.post(handlerUrl, '{}');
        });
    });
}
