'use strict';

var instB4Edit = "";//to hold the content on quiz instruction before editing it

$(document).ready(function () {
    //check login status on page load
    //checkLogin("", "Log in required. Please log in to continue");
    
    
    
    /*
    ********************************************************************************************************************************
    ********************************************************************************************************************************
    ********************************************************************************************************************************
    ********************************************************************************************************************************
    ********************************************************************************************************************************
    */

    //call function to attach event handler which will make us check user's log in status each time user leave tab and come back
    //checkDocumentVisibility(checkLogin);
    
    
    /*
    ********************************************************************************************************************************
    ********************************************************************************************************************************
    ********************************************************************************************************************************
    ********************************************************************************************************************************
    ********************************************************************************************************************************
    */
   

    //TO REFRESH THE LIST OF QUIZZES
    $("#quizListDiv").on('click', '#refreshQuizList', function () {
        //show loading...
        $("#quizListDiv").html(loaderDiv + " Refreshing List");

        $("#quizListDiv").load(appRoot + "quiz/ql #quizListDivUL");
    });


    /*
    ********************************************************************************************************************************
    ********************************************************************************************************************************
    ********************************************************************************************************************************
    ********************************************************************************************************************************
    ********************************************************************************************************************************
    */

    //WHEN A QUIZ TITLE IS CLICKED (ON THE QUIZ LIST) IN ORDER TO SEE THE QUESTIONS UNDER THE QUIZ
    $("#quizListDiv").on('click', '.myQuizList', function (e) {
        e.preventDefault();
        
        var clickedElem = $(this);
        
        var qId = clickedElem.attr('href');

        if (qId) {
            $("#createQuizDiv").addClass("hidden");
            $("#viewQuizQueDiv").removeClass("hidden");

            //show 'loading'
            $("#viewQuizQueDiv").html(loaderDiv + "Fetching Questions...");


            $("#viewQuizQueDiv").load(appRoot + "quiz/getquiz", {qId: qId}, function () {
                //remove the active class from all lis
                $(".myQuizList").parents('li').removeClass("active");

                //add the active class to the li of the quiz we just displayed
                clickedElem.parents('li').addClass("active");
                
                scrollPageToTop();
            });
        }
    });

    /*
    ********************************************************************************************************************************
    ********************************************************************************************************************************
    ********************************************************************************************************************************
    ********************************************************************************************************************************
    ********************************************************************************************************************************
    */

    //WHEN "CREATE NEW QUIZ" IS CLICKED
    $("#viewQuizQueDiv").on('click', '#createNewQuiz', function () {
        $("#createQuizDiv").removeClass("hidden");
        $("#viewQuizQueDiv").addClass("hidden");
    });


    /*
    ********************************************************************************************************************************
    ********************************************************************************************************************************
    ********************************************************************************************************************************
    ********************************************************************************************************************************
    ********************************************************************************************************************************
    */
    
    //WHEN "CHANGE" IS CLICKED IN ORDER TO CHANGE A QUIZ's LOGO
    $("#pageContent").on('click', '#chQuizLogo', function(e){
        e.preventDefault();

        $("#newLogo").click();
    });
   
   
   /*
    ********************************************************************************************************************************
    ********************************************************************************************************************************
    ********************************************************************************************************************************
    ********************************************************************************************************************************
    ********************************************************************************************************************************
    */
    
    //TO CHANGE THE LOGO ATTACHED TO A QUIZ(WHILE VIEWING CREATED QUIZ QUESTIONS)
    $("#pageContent").on('change', '#newLogo', function(e){
        e.preventDefault();
        
        var fileToUpload = $(this).get(0).files[0];
        var qGrp = $("#currVQI").val();//get quiz group
        var currentLogo = $("#curVQLogo").attr('src');
        var fileInputElem = $(this);
        
        //if a file was selected
        if(fileToUpload){
            //show a preview of the file and then send the file to server for upload
            displayImgIfAllIsWell(this, fileToUpload, "#curVQLogo", 200000, function(status){
                //call function to send file to server if function returned 1
                if(status === 1){
                    uploadNewQuizLogo(fileToUpload, qGrp, currentLogo, fileInputElem, "#curVQLogo");
                }
            });
        }
    });
   
   
   
   /*
    ********************************************************************************************************************************
    ********************************************************************************************************************************
    ********************************************************************************************************************************
    ********************************************************************************************************************************
    ********************************************************************************************************************************
    */

    //TO REMOVE THE LOGO ATTACHED TO A QUIZ (WHIE VIEWING CREATED QUIZ QUESTIONS)
    $("#pageContent").on('click', '#remQuizLogo', function(e){
        e.preventDefault();
        
        //get the id of the quiz, send to server to detach the img from quiz and also delete it from disk
        //if successful, display success msg and change src of logo to default (img.png), else display error msg
        
        var qGrp = $("#currVQI").val();
        
        if(qGrp){
            displayFlashMsg("Detaching Image From Quiz", spinnerClass, 'black', '', false);
            
            $.ajax({
                url: appRoot+"quiz/cqi",
                method: "POST",
                data: {qGrp:qGrp, a:'d'}
            }).done(function(returnedData){
                if(returnedData.status === 1){
                    changeFlashMsgContent("Image detached from quiz", '', 'green', 1000, false);
                    $("#curVQLogo").attr('src', appRoot+"public/images/img.png");
                    
                    $("#remQuizLogo").addClass("hidden");//hide the button to remove the image
                }
                
                else{
                    changeFlashMsgContent("Unable to process your request at this time", '', 'red', '', false);
                }
            }).fail(function(){
                checkBrowserOnline();
            });
        }
    });
    
    /*
    ********************************************************************************************************************************
    ********************************************************************************************************************************
    ********************************************************************************************************************************
    ********************************************************************************************************************************
    ********************************************************************************************************************************
    */
   
   //TO REMOVE AN IMAGE FROM A QUESTION
   $("#pageContent").on('click', '.removeImage', function(e){
       e.preventDefault();
       
       var queId = $(this).attr('id').split("-")[1];
       var removeImgElem = $(this);
       var divShowingImg = $(this).parents(".showAttImg");
       var imgElem = $(this).siblings('.attImgQuePrivDisp');
       
       //make server req to detach image from question and also delete the image from disk
       if(queId){
           $(removeImgElem).html("<i class='"+spinnerClass+"'></i> Removing Image...");
           
           $.ajax({
               url: appRoot+"quiz/dqqi",
               method: "POST",
               data: {q:queId}
           }).done(function(returnedData){
                if(returnedData.status === 1){
                    //show success msg, hide the div where the image is shown and make the img src empty
                    $(divShowingImg).addClass("hidden");
                    $(imgElem).attr("src", "");

                    //change the text back to "remove image"
                    $(removeImgElem).html("Remove Image");
                }
               
                else{
                     //dispay error msg
                     $(removeImgElem).html("<i class='fa fa-exclamation text-danger'></i> Request Failed");

                     //change the text back to "remove image"
                     setTimeout(function(){$(removeImgElem).html("Remove Image");}, 2000);
                }
               
           }).fail(function(){
                checkBrowserOnline();
               
                //change the text back to "remove image"
                setTimeout(function(){$(removeImgElem).html("Remove Image");}, 2000);
           });
       }
   });
   
   
   /*
    ********************************************************************************************************************************
    ********************************************************************************************************************************
    ********************************************************************************************************************************
    ********************************************************************************************************************************
    ********************************************************************************************************************************
    */
   
    //WHEN THE "EDIT" ICON IN FRONT OF INSTRUCTION IS CLICKED
    $("#pageContent").on('click', '#editQuizInst', function(e){
        e.preventDefault();
        
        /*
         * get the instruction, replace the instruction with a textarea, and insert the instruction in the textarea
         * Also append "Save" and "cancel" buttons after the textarea
         * Then hide the edit icon
         * Save instruction
         * 
         * Write a conditional (just in case the edit was triggered) to prevent the effect of the button if it has been clicked already
         */
        
        var instruction = $("#quizInst").text();
        
        if($("#editedQuizInst").length === 0){
            var vToDisplay = "<textarea class='form-control' id='editedQuizInst'>"+instruction+"</textarea>\
            <br>\
            <button class='btn btn-primary btn-xs' id='saveEditInst'>Save</button>\
            <button class='btn btn-danger btn-xs' id='cancelEditInst'>Cancel</button>";

            //now change the instruction
            $("#quizInst").html(vToDisplay);
            
            //hide the "edit" icon/btn
            $(this).addClass("hidden");
            
            //save the instruction in the global variable "instB4Edit". Instruction will be changed to this when "cancel" is clicked
            instB4Edit = instruction;
        }
    });
   
    /*
    ********************************************************************************************************************************
    ********************************************************************************************************************************
    ********************************************************************************************************************************
    ********************************************************************************************************************************
    ********************************************************************************************************************************
    */
   
    //CANCEL THE EDITING OF INSTRUCTION IN QUIZ
    $("#pageContent").on('click', '#cancelEditInst', function(e){
        e.preventDefault();
        
        //revert the instruction back
        $("#quizInst").html("<b>"+instB4Edit+"</b>");
        
        //then show the edit icon again
        $("#editQuizInst").removeClass("hidden");
    });
   
    /*
    ********************************************************************************************************************************
    ********************************************************************************************************************************
    ********************************************************************************************************************************
    ********************************************************************************************************************************
    ********************************************************************************************************************************
    */
   
    //WHEN THE "SAVE" BUTTON IS CLICKED TO SAVE THE NEWLY PROVIDED INSTRUCTION
    $("#pageContent").on('click', '#saveEditInst', function(e){
        e.preventDefault();
        
        //get the quiz id, the instruction and send to server
        //show "saving" on the "save" button
        //if successful, set the instruction to the new one
        //if failed, display error message and do nothing. Hide the error message after a while
        
        var quizId = $("#currVQI").val();
        var instruction = $("#editedQuizInst").val();
        
        if(quizId){
            //show "saving"
            $(this).html("<i class='"+spinnerClass+"'></i> Saving");
            
            $.ajax({
                url: appRoot+"quiz/upInst",
                method: "GET",
                data: {qId:quizId, instruction:instruction}
            }).done(function(rd){
                if(rd.status === 1){
                    //successful
                    $("#saveEditInst").html("Saved");
                    
                    //change from edit view after a while
                    setTimeout(function(){$("#quizInst").html("<b>"+instruction+"</b>");}, 500);
                    
                    //show the edit icon back
                    $("#editQuizInst").removeClass("hidden");
                }
                
                else if(rd.status === 0){
                    //failed
                    $("#saveEditInst").toggleClass('btn-danger', 'btn-primary').html("Update Failed");
                    
                    //change button back to "save" after a while
                    setTimeout(function(){$("#saveEditInst").toggleClass('btn-danger', 'btn-primary').html("Save");}, 2000);
                }
                
                else if(rd.status === -1){
                    //set value in session storage to be used in auto submitting the edited instruction after user logs in
                    //setSessionStorage(storageName, storageValue, examDetails)
                    setSessionStorage("action", "autoSubmitEditedInstruction", '');
                    
                    //login required
                    triggerLoginForm('You are logged out. Login to continue', {'color':'red'});//trigger log in form
                }
            }).fail(function(){
                checkBrowserOnline(false);
            });
        }
    });
   
   
   /*
    ********************************************************************************************************************************
    ********************************************************************************************************************************
    ********************************************************************************************************************************
    ********************************************************************************************************************************
    ********************************************************************************************************************************
    */

});


/*
********************************************************************************************************************************
********************************************************************************************************************************
********************************************************************************************************************************
********************************************************************************************************************************
********************************************************************************************************************************
*/


function appendToQuizList(quizTitle, quizId){    
    $("<li><a class='myQuizList pointer' href='"+quizId+"'>"+quizTitle+"</a></li>")
            .insertBefore($("#quizListDivUL").children("li").first());
}


/*
********************************************************************************************************************************
********************************************************************************************************************************
********************************************************************************************************************************
********************************************************************************************************************************
********************************************************************************************************************************
*/


function uploadNewQuizLogo(fileToUpload, qGrp, currentLogo, fileInputElem, displayLogoElem){
    if(qGrp){
        var formInfo = new FormData();

        formInfo.append('nl', fileToUpload);
        formInfo.append('qGrp', qGrp);
        formInfo.append('a', 'c');

        displayFlashMsg('Upoading image', spinnerClass, 'black', '', false);

        $.ajax({
            url: appRoot+"quiz/cqi",
            method: "POST",
            data: formInfo,
            processData: false,
            cache: false,
            contentType: false
        }).done(function(returnedData){
            if(returnedData.status === 1){
                //dispay success message, 'unset' the file from the file input field
                changeFlashMsgContent('Image changed', '', 'green', 1000);
                
                $("#remQuizLogo").removeClass("hidden");//show the button to remove the image in case it was hidden
            }

            else{
                //display error msg, remove the selected file and change logo displayed back to the previous one
                changeFlashMsgContent(returnedData.l_e_m, '', 'red', '');
                
                $(fileInputElem).val("");//remove selected file from input field
                
                $(displayLogoElem).attr('src', currentLogo);//revert to the logo we want to change
            }
        }).fail(function(){
            $(fileInputElem).val("");//remove selected file from input field
                
            $(displayLogoElem).attr('src', currentLogo);//revert to the logo we want to change
            
            checkBrowserOnline(true);
        });
    }
}

/*
********************************************************************************************************************************
********************************************************************************************************************************
********************************************************************************************************************************
********************************************************************************************************************************
********************************************************************************************************************************
*/



/*
********************************************************************************************************************************
********************************************************************************************************************************
********************************************************************************************************************************
********************************************************************************************************************************
********************************************************************************************************************************
*/



/*
********************************************************************************************************************************
********************************************************************************************************************************
********************************************************************************************************************************
********************************************************************************************************************************
********************************************************************************************************************************
*/