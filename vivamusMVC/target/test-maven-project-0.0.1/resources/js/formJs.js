/**
 * Exposing intl-tel-input as a component
 */
// HEADER DROPDOWN STARTS HERE
function dropBtn() {
    $("#myDropdown").slideToggle();
}
function filterFunction() {
    var input, filter, ul, li, a, i;
    input = $("#myInput");
    filter = input.value.toUpperCase();
    div = $("#myDropdown");
    a = div.$("a");
    for (i = 0; i < a.length; i++) {
        if (a[i].html().toUpperCase().indexOf(filter) > -1) {
            a[i].style.display = "";
        } else {
            a[i].style.display = "none";
        }
    }
}
// HEADER DROPDOWN ENDS HERE

$(document).ready(function () {
    //FORMS SUBMISSION STARTS HERE
    var current  =1;
    var $fs  =$(".msFields");
    var $formDiv =$("#formDiv");

    //submit \
    var $result         = $('#result');
    var $form           = $('#msform');
    var $nextBtn        = $("#next");
    var $backBtn        = $("#back");
    var $actionBtn       =$(".actionButton");
    var $progressbarli  = $("#progressbar li");
    //donation tabs
    var $paypalBtn      = $("#payPal");
    var $creditCarBtn   = $("#creditCard");


    if(typeof (localStorage.submitted) !== "undefined") {
        $form.fadeOut("slow",function(){
            $formDiv.hide().html("<p class='text-center alert-success'>Success! Thank you for helping.</p>").fadeIn("slow");
        });
    }

/*    var $submitBtn=$("#submit")
    var $finishBtn = $("input[type=button]");*/
    //for animation
    var animating;
    var scale, left, opacity;
    var $currentFs, $nextFs,$backFs;
    var fs=$("#msform fieldset");
    var fieldHasError;

    //Local Storage


/*hide fieldsets*/
    fs.each(function (e) {
        if (e != 0)
            $(this).hide();
    });


//transition for next
    function nextTransition(){
        /*  ANIMATION / FIELDSET TRANSITION */
        var fs = $("#msform fieldset:visible");
      /*  if (animating)return false;*/
        animating = true;


        $currentFs = fs;
        $nextFs = fs.next().fadeIn("slow");

        $progressbarli.eq($("fieldset").index($nextFs)).addClass("active");

        $nextFs.show();
        $backBtn.show().css({"align-items": "left"});

        //hide the current fieldset with style
        $currentFs.animate({opacity: 0}, {
            step: function (now, mx) {
                //as the opacity of current_fs reduces to 0 - stored in "now"
                //1. scale current_fs down to 80%
                scale = 1 - (1 - now) * 0.2;
                //2. bring next_fs from the right(50%)
                left = (now * 50)     + "%";
                //3. increase opacity of next_fs to 1 as it moves in
                opacity = 1 - now;
                $currentFs.css({
                    'transform': 'scale(' + scale + ')',
                    'position': 'relative'
                });
                $nextFs.css({'left': left, 'opacity': opacity});
                $nextBtn.css({"display": "inline-block", "background": " #2DA8C9", "color": "#FFFFFF"});
                $progressbarli.eq($("fieldset").index($currentFs)).removeClass("active");
            },
            duration: 800,
            complete: function () {
                $currentFs.hide();
                animating = false;


            },
            //this comes from the custom easing plugin
            easing: 'easeInOutBack'

        });
    }

         var nextClickCount=0;
         var clickCount=0;
//NEXT BUTTON TO SUBMIT
$nextBtn.click (function(event){
    //prevent form triggering
           event.preventDefault();
    localStorage.clickcount = 1;
    /*BUTTON CLICK COUNT*/
    //set clickcount
           nextClickCount +=1;
                //button show on click
           if (nextClickCount== 1) {
               //PROCEED
               nextTransition();
               $(this).val("Proceed");

           } else if (nextClickCount == 2) {
               //CHANGE NEXT TO FINISH
               nextTransition();
                $(this).val("Finish")
           } else if (nextClickCount == 3) {
               $.ajax({
                   method  : 'POST',
                   url     : '/submit',
                   data    : $form.serialize(),
                   dataType:"json",
                   //error*
                   error: function () {
                       // $("#result").html(resp.message);
                       alert("Failed!");

                   },
                   //success*
                   success: function (data) {
                       // alert("SUCCESS!")
                       console.log(data);
                       if (data.message){
                                  /*CHECK LOCAL STORAGE*/
                            /*LOCAL STORAGE*/
                            //set local storage return tre
                           localStorage.setItem("submitted" , true)
                           //show alert success
                           $form.fadeOut("slow",function(){
                               $formDiv.hide().html("<p class='text-center alert-success'>Success! Thank you for helping.</p>").fadeIn("slow");
                           });


                       }else{
                           /*ERROR*/
                           $(".has-error").removeClass("error-field");
                           $(".error").remove();
                           $("error-field").removeClass("error-field");
                           //Display general message :success
                           $result.empty().fadeIn().removeClass("alert-success").addClass("genError").html("Field indicated by asterisk(*) must be valid or not empty!");
                           //get each input validation
                           $.each(data,function(a,b){
                               //get field invalid
                               var field = $("input[name='"+a+"']");

                               //add class field that has-error class style
                               field.addClass("has-error");
                               //message on span
                               field.siblings(".help-block").empty().append(b).addClass("alert-danger");
                                //GET container with error
                               var fieldContainer = field.closest("fieldset");
                               //add style
                               fieldContainer.addClass("has-error");
                           });
                           displayFieldsetError();
                       }
                   }
               });
           }

       });

function backTransition() {
//get visible fieldset
    var fs = $("#msform fieldset:visible");
    /*if (animating) return false;*/
    animating = true;

    $currentFs = fs;
    $backFs = $currentFs.prev();

    //de-activate current step on progressbar
    $progressbarli.eq($("fieldset").index($currentFs)).removeClass("active");

    //show the previous fieldset

    $backFs.show();
    $("#next").css({"display": "inline-block"});


    //hide the current fieldset with style
    $currentFs.animate({opacity: 0}, {
        step: function (now, mx) {
            //as the opacity of current_fs reduces to 0 - stored in "now"
            //1. scale previous_fs from 80% to 100%
            scale = 0.8 + (1 - now) * 0.2;
            //2. take current_fs to the right(50%) - from 0%
            left = ((1 - now) * 50) + "%";
            //3. increase opacity of previous_fs to 1 as it moves in
            opacity = 1 - now;
            $currentFs.css({'left': left});
            $backFs.css({'transform': 'scale(' + scale + ')', 'opacity': opacity});
            $progressbarli.eq($("fieldset").index($backFs)).addClass("active");
        },
        duration: 800,
        complete: function () {
            $currentFs.hide();
            animating = false;
        },
        //this comes from the custom easing plugin
        easing: 'easeInOutBack'
    });
}


$backBtn.click(function () {
    nextClickCount -= 1;
        if (nextClickCount == 1) {
            //proceed
            backTransition();
            $nextBtn.val("Proceed");
        } else if (nextClickCount == 0) {
            //finish
            backTransition();
            $nextBtn.val("Next");
            $backBtn.hide().fadeOut("slow");
        }
    });
    /* DISPLAY FIELDSET WITH ERROR */
    // Slide to fieldset with error to show error page
    // Focus on field with error
    function displayFieldsetError() {
        /* Get all fieldset with class has-error */
        var fieldsets = $("fieldset.has-error");

        /* Check if there's any fieldset with has-error class found */
        // return false if empty/nothing found
        if(fieldsets == null || fieldsets == "" || fieldsets == undefined) return false;

        /* Get first element / First fieldset with has-error class */
        var fieldset = fieldsets.get(0);

        /* Get id of fieldset */
        var fieldsetId = fieldset.id;

            /*ANIMATE ERROR FIELDSETS*/
            //back to first fieldset if error
            if(fieldsetId == "personalDetails"){
                /*set error id */
                var errorFieldset = $("#"+fieldsetId);

                //animate using transition//
                transitionToErrorFS(errorFieldset);
                //hide back button
                $backBtn.hide();
                //nextBtn.next;
                $nextBtn.val("Next");
                nextClickCount = 0;
            } else if (fieldsetId == "paymentMethod"){
                /*set error id */
                var errorFieldset = $("#"+fieldsetId);
                //animate using transition//
                transitionToErrorFS(errorFieldset);
                //hide back button
                $backBtn.show();
                //nextBtn.next;
                $nextBtn.val("Next");
                nextClickCount = 1;
            }
        /*Get the id of an input that has error*/
        var inputHasError = $("input.has-error");

        /* Check if there is an input that has-error class*/
        if (inputHasError == null || inputHasError == "" || inputHasError == undefined) return false;

        /*Find first has-error class*/

        $("input.has-error:first").focus();


    }

function transitionToErrorFS(fieldset) {

    var fs = $("#msform fieldset:visible");
    /*if (animating) return false;*/
    animating = true;

    $currentFs = fs;
    $backFs = fieldset;

    //de-activate current step on progressbar
    $progressbarli.eq($("fieldset").index($currentFs)).removeClass("active");

    //show the previous fieldset

    $backFs.show();
    $("#next").css({"display": "inline-block"});


    //hide the current fieldset with style
    $currentFs.animate({opacity: 0}, {
        step: function (now, mx) {
            //as the opacity of current_fs reduces to 0 - stored in "now"
            //1. scale previous_fs from 80% to 100%
            scale = 0.8 + (1 - now) * 0.2;
            //2. take current_fs to the right(50%) - from 0%
            left = ((1 - now) * 50) + "%";
            //3. increase opacity of previous_fs to 1 as it moves in
            opacity = 1 - now;
            $currentFs.css({'left': left});
            $backFs.css({'transform': 'scale(' + scale + ')', 'opacity': opacity});
            $progressbarli.eq($("fieldset").index($backFs)).addClass("active");
        },
        duration: 800,
        complete: function () {
            $currentFs.hide();
            animating = false;
        },
        //this comes from the custom easing plugin
        easing: 'easeInOutBack'
    });
}

    $paypalBtn.click(function () {
        $(this).addClass("tabBtnWhite");
        $creditCarBtn.removeClass("tabBtnWhite");
    });
    $creditCarBtn.click(function () {
       $(this).addClass("tabBtnWhite");
        $paypalBtn.removeClass("tabBtnWhite");

    });

});



