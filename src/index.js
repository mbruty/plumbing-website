let currentToggle = "Bathrooms";

const toggleBefore = () => {
    if(currentToggle === "Bathrooms"){
        currentToggle = "Kitchens";
        $('#bathroom-btn').removeClass('selected');
        $('#kitchen-btn').addClass('selected');
    }
    else{
        currentToggle = "Bathrooms";
        $('#kitchen-btn').removeClass('selected');
        $('#bathroom-btn').addClass('selected');
        $('#svg-img').attr('src', '../public/plumb-01.svg');
    }
    $("#kitchen-img").toggleClass('transparent');
}

const displayImg = (e) => {
    const id = e.target.id;
    $('.middle').removeClass('selected');
    $(`#${id}`).addClass('selected');
}

const nextImg = (e) => {
    const id = e.target.id;
    let a = $('.icon-container .selected').attr('id').charAt(7);
    console.log(a);
}

const prevImg = (e) => {
    const id = e.target.id;
}

$(document).ready(() => {

    // Click listeners
    $('#kitchen-btn').click(toggleBefore)
    $('#bathroom-btn').click(toggleBefore)
    $('.middle').click(displayImg);
    $('#prev-img').click(prevImg);
    $('#next-img').click(nextImg);
})