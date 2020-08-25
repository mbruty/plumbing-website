let currentToggle = "Bathrooms";
let testimonialIdx = 0;
let testimonials = []

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
    let currIdx = parseInt($('.icon-container .selected').attr('id').charAt(7));
    $('.icon-container .selected').removeClass('selected');
    if(currIdx === 5){
        currIdx = 0;
    }
    $(`#slider-${currIdx + 1}`).addClass('selected');

    //Update the image source
    $('#before-img').attr("src", `public/before-after/${currIdx + 1}/before.jpg`);
    $('#after-img').attr("src", `public/before-after/${currIdx + 1}/after.jpg`);
}

const prevImg = (e) => {
    let currIdx = parseInt($('.icon-container .selected').attr('id').charAt(7));
    $('.icon-container .selected').removeClass('selected');
    if(currIdx === 1){
        currIdx = 6;
    }
    $(`#slider-${currIdx - 1}`).addClass('selected');
}

const delay = async (ms) => {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    })
}
const updateTestimionials = () => {
    $('#testimonial-name').removeClass('in').addClass('out');
    $('#testimonial-text').removeClass('in').addClass('out');

    // See if testimonial is at the end of list
    if(testimonialIdx === testimonials.length){
        testimonialIdx = 0;
    }

    delay(400).then(() => {
        $('#testimonial-name').text(testimonials[testimonialIdx++]);
        $('#testimonial-text').text(testimonials[testimonialIdx++]);
        $('#testimonial-name').removeClass('out').addClass('in');
        $('#testimonial-text').removeClass('out').addClass('in');
        
    })
}

const testimonialLoop = () => {
    //Set testimonials
    updateTestimionials();
    // Change testimonial every 10 seconds
    setInterval(updateTestimionials, 10000)
}
const landingLoop = () => {
    
    const bottom = $('.bottom');
    bottom.empty();

    // Items to be shown
    const items = [
        `<div style="margin: auto;" class="bottom-content"><p>LEARN MORE ABOUT ACE IMPROVEMENTS</p><p>We are reliable fully qualified carpenter, carrying out quality work at affordable prices in and around Plymouth</p><a class="link" href="#why-choose">FIND OUT MORE</a></div>`,
        `<div style="margin: auto;" class="bottom-content"><p>DISCOVER WHAT WE CAN DO FOR YOU</p><p>Lorem Ipsum dolor sit amet, congue sed diam nonum</p><a class="link" href="#what-can-we-do">FIND OUT MORE</a></div>`,
        `<div style="margin: auto;" class="bottom-content"><p>SEE THE QUALITY WE PROVIDE</p><p>Lorem Ipsum dolor sit amet, congue sed diam nonum</p><a class="link" href="#project-section">VIEW PROJECTS</a></div>`
    ];
    // Set the default value
    bottom.append(items[0]);

    let counter = 0;
    setInterval(() => {
        // Loop back to the original
        if(counter === 3){
            counter = 0;
        }
        bottom.removeClass('in').addClass('out');
        delay(300).then(() => {
            bottom.empty();
            bottom.append(items[counter++]);
            bottom.removeClass('out').addClass('in');
        })
    }, 8000)
}
const loadFile = () => {
    $.ajax({
        async: true,
        type: "GET",
        url: "public/testimonials.txt"
    }).then((res) => {
        testimonials = res.split(/\r?\n/);

        //Start updating testimonials
        testimonialLoop();
    })
}

const setDescription = () => {
    $.ajax({
        async: true,
        type: "GET",
        url: "public/description.txt"
    }).then((res) => {
        res = res.split(/\r?\n/);
        res.forEach((item) => {
            $('#description').append(`<p>${item}</p>`);
        });
    })
}
$(document).ready(() => {

    //Load description and set it
    setDescription();

    // Click listeners
    $('#kitchen-btn').click(toggleBefore)
    $('#bathroom-btn').click(toggleBefore)
    $('.middle').click(displayImg);
    $('#prev-img').click(prevImg);
    $('#next-img').click(nextImg);

    // Load the text file
    loadFile();
    if($(window).width() < 812){
        landingLoop();
    }

})