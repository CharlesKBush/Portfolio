(function ($) {
    "use strict";
    
    // Dropdown on mouse hover
    $(document).ready(function () {
        function toggleNavbarMethod() {
            if ($(window).width() > 768) {
                $('.navbar .dropdown').on('mouseover', function () {
                    $('.dropdown-toggle', this).trigger('click');
                }).on('mouseout', function () {
                    $('.dropdown-toggle', this).trigger('click').blur();
                });
            } else {
                $('.navbar .dropdown').off('mouseover').off('mouseout');
            }
        }
        toggleNavbarMethod();
        $(window).resize(toggleNavbarMethod);
    });
    
    
    // Back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 100) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({scrollTop: 0}, 1500, 'easeInOutExpo');
        return false;
    });
    
    
    // Header slider
    $('.header-slider').slick({
        autoplay: true,
        dots: true,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1
    });
    
    
    // Product Slider 4 Column
    $('.product-slider-4').slick({
        autoplay: true,
        infinite: true,
        dots: false,
        slidesToShow: 4,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 1200,
                settings: {
                    slidesToShow: 4,
                }
            },
            {
                breakpoint: 992,
                settings: {
                    slidesToShow: 3,
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 2,
                }
            },
            {
                breakpoint: 576,
                settings: {
                    slidesToShow: 1,
                }
            },
        ]
    });
    
    
    // Product Slider 3 Column
    $('.product-slider-3').slick({
        autoplay: true,
        infinite: true,
        dots: false,
        slidesToShow: 3,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 992,
                settings: {
                    slidesToShow: 3,
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 2,
                }
            },
            {
                breakpoint: 576,
                settings: {
                    slidesToShow: 1,
                }
            },
        ]
    });
    
    
    // Product Detail Slider
    $('.product-slider-single').slick({
        infinite: true,
        autoplay: true,
        dots: false,
        fade: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        asNavFor: '.product-slider-single-nav'
    });
    $('.product-slider-single-nav').slick({
        slidesToShow: 3,
        slidesToScroll: 1,
        dots: false,
        centerMode: true,
        focusOnSelect: true,
        asNavFor: '.product-slider-single'
    });
    
    
    // Brand Slider
    $('.brand-slider').slick({
        speed: 5000,
        autoplay: true,
        autoplaySpeed: 0,
        cssEase: 'linear',
        slidesToShow: 5,
        slidesToScroll: 1,
        infinite: true,
        swipeToSlide: true,
        centerMode: true,
        focusOnSelect: false,
        arrows: false,
        dots: false,
        responsive: [
            {
                breakpoint: 992,
                settings: {
                    slidesToShow: 4,
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 3,
                }
            },
            {
                breakpoint: 576,
                settings: {
                    slidesToShow: 2,
                }
            },
            {
                breakpoint: 300,
                settings: {
                    slidesToShow: 1,
                }
            }
        ]
    });
    
    
    // Review slider
    $('.review-slider').slick({
        autoplay: true,
        dots: false,
        infinite: true,
        slidesToShow: 2,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                }
            }
        ]
    });
    
    
    // Widget slider
    $('.sidebar-slider').slick({
        autoplay: true,
        dots: false,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1
    });
    
    
    // Quantity
    $('.qty button').on('click', function () {
        var $button = $(this);
        var oldValue = $button.parent().find('input').val();
        if ($button.hasClass('btn-plus')) {
            var newVal = parseFloat(oldValue) + 1;
        } else {
            if (oldValue > 0) {
                var newVal = parseFloat(oldValue) - 1;
            } else {
                newVal = 0;
            }
        }
        $button.parent().find('input').val(newVal);
    });
    
    
    // Shipping address show hide
    $('.checkout #shipto').change(function () {
        if($(this).is(':checked')) {
            $('.checkout .shipping-address').slideDown();
        } else {
            $('.checkout .shipping-address').slideUp();
        }
    });
    
    
    // Payment methods show hide
    $('.checkout .payment-method .custom-control-input').change(function () {
        if ($(this).prop('checked')) {
            var checkbox_id = $(this).attr('id');
            $('.checkout .payment-method .payment-content').slideUp();
            $('#' + checkbox_id + '-show').slideDown();
        }
    });
})(jQuery);

//START OF NEW CODE

function setCookie(name, expOff, path, data) {
    if (path === undefined) {
        path = "/";
    }
    let exp = new Date(Date.now() + (expOff)).toUTCString();
    path = `path=${path};`;
    exp = `expires=${exp};`;
    document.cookie = `${name}=${data};${exp}${path}`;
}

function loadCookie(name) {
    if (name === undefined) {
        name = "*";
    }
    let cookie = document.cookie.split(";");
    if (name === "*") {
        return cookie;
    }
    let value = ""
    cookie.forEach(c => {
       let data = c.split("=");
       if (data[0].trim() === name.trim()) {
           value = data[1];
       } 
    });
    return value;
}

function checkCookie(name, expOff, path, data) {
    let value = loadCookie(name);
    if (value !== "" && value !== undefined) {
        return value;
    }
    setCookie(name, expOff, path, data)
    value = loadCookie(name);
    return value;
}

function loadCart() {
    let cart = JSON.parse(checkCookie("cart", 36000*24, "/", JSON.stringify([])));
    let table = document.querySelector("#cart-table");
    let subtotal = document.querySelector("#subtotal");
    let shipping = document.querySelector("#shipping");
    let total = document.querySelector("#total");
    let tot = 0;
    let sub = 0;
    let ship = 0;
    table.innerHTML = "";
    cart.forEach(c => {
        sub += (c.price*c.quantity);
        table.innerHTML += `<tr> <td> <div class="img"> <a href="#"><img src="img/${c.id}.jpg" alt="Image"></a> <p>${c.name}</p></div></td><td>$${c.price}</td><td> <div class="qty"> <button class="btn-minus"><i class="fa fa-minus"></i></button> <input type="text" value="${c.quantity}"> <button class="btn-plus"><i class="fa fa-plus"></i></button> </div></td><td>$${c.price*c.quantity}</td><td><button onclick="removeFromCart('${c.id}')"><i class="fa fa-trash"></i></button></td></tr>`
    });
    tot = sub + ship;
    subtotal.innerHTML = `$${sub}`;
    shipping.innerHTML = `$${ship}`;
    total.innerHTML = `$${tot}`;
}

function removeFromCart(name) {
    let cart = JSON.parse(checkCookie("cart", 36000*24, "/", JSON.stringify([])));
    let index = -1;
    for (let i=0; i<cart.length; i++) {
        let c = cart[i];
        if (c.id === name) {
            index = i;
            break;
        }
    }
    if (index !== -1) {
        cart.splice(index,1);
    }
    setCookie("cart", 36000*24, "/", JSON.stringify(cart));
    loadCart();
}

function addToCart(id, price, name) {
    let cart = JSON.parse(checkCookie("cart", 36000*24, "/", JSON.stringify([])));
    let data = {};
    data.id = id;
    data.name = name;
    data.price = price;
    data.quantity = 1;

    let flag = true;

    cart.forEach(c => {
        if (c.id === id) flag = false;
    });

    if (flag) {
        cart.push(data);
        setCookie("cart", 36000*24, "/", JSON.stringify(cart));
        loadCart();
    }
}