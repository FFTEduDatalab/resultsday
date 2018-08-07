$(function () {
    $('#options').change(function () {
        var url = $(this).val();
        window.location.hash = url;
        console.log('select Changed');
    });
});
window.addEventListener('hashchange', fn, false);

window.onload = fn; // fire on pageload

function fn() {
    if (window.location.hash != '') {
        $('#options').val(window.location.hash.replace('#', '')).change();
        console.log("hash = " + window.location.hash);
    } else {
        return false;
    }

}
