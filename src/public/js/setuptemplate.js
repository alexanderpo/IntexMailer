$(document).ready(function(){
    
    var frameElement = '';//for button Change value
    
    function markSelect(element){ //added class for mark active element
        $(element).addClass('markedElement');
        //element.css('background','#23ABF1');
    }

    $('.email-preview')
        .children()
        .load(function(){    //load iframe document   
        var iframeDocument = $('.email-preview').children().contents();//get iframe doc
        
        iframeDocument.find('head')
            .append(   //append style for active element, style for cursor on hover
                '<style>.markedElement{background: #FF8555;padding:5px;border-radius:10px;}a,img,h1,h2,h3,h4,h5,h6,span,strong,b,em,p,button,input{cursor:pointer;}</style>'
        );
               
        iframeDocument
            .find('a')
            .on('click',function(click){ //diactivate links in iframe doc
                click.preventDefault();
            });
        
       iframeDocument
        .find('body')
        .on('click',function(event){ //when object was cliked in iframe body tag
                $(frameElement).removeClass('markedElement'); //delete previous active element
                $('.setups').empty();  //clean place for new inputs
                
                var element = $(event.target);     // varibals from active element
                var textElement = element.text();
                var valueElement = element.val();
                var linkElement = element.attr('href');
                
                frameElement = element;//for global
                
                //edit only this elements 
                if(element.is('h1') || element.is('h2') || element.is('h3') || element.is('h4') || element.is('h5') ||
                element.is('h6') || element.is('span') || element.is('em') || element.is('strong') || element.is('b')){
                    markSelect(element);
                    $('.setups')
                        .hide()
                        .prepend(
                            '<div class="setup"><h4>Enter a new TEXT:</h4><input type="text" name="titleName" value="'
                            +textElement+' "><button type="" id="textSetupButton"></button></div>'
                        )
                        .fadeIn(700);  
                }   else if(element.is('p')){
                        markSelect(element);
                        $('.setups')
                            .hide()
                            .prepend(
                                '<div class="setup"><h4>Enter a new TEXT:</h4><textarea name="textareaName"> '
                                +textElement+'</textarea><button type="" id="textSetupButton"></button></div>'
                            )
                            .fadeIn(700); 
                    } else if(element.is('a') || element.is('button')){
                        markSelect(element);
                        $('.setups')
                            .hide()
                            .prepend(
                                '<div class="setup"><h4>Enter NAME for LINK:</h4><input type="text" name="link" value="'
                                +textElement+' "><button type="" id="textSetupButton"></button></div><div class="setup"><h4>Enter LINK:</h4><input type="text" name="link" value="'
                                +linkElement+' "><button type="" id="linkSetupButton"></button></div>'
                            )
                            .fadeIn(700);
                    } else if(element.is('img')){
                        markSelect(element);
                        $('.setups')
                            .hide()
                            .prepend(
                                '<div class="setup"><h4>Choose image file from COMPUTER:</h4><input id="imgLoad" type="file" accept="image/*,image/jpeg" name="file"><button type="" id="imageSetupButton"></button></div>'
                            )
                            .fadeIn(700);
                    }
            });
    });
    
    $(document).on('click', '#textSetupButton',function(){ // edit text elements
        var inputValue = $('#textSetupButton').prev().val();
        frameElement.text(inputValue);
    });
    
    $(document).on('click','#linkSetupButton',function(){ //edit links elements
         var inputValue = $('#linkSetupButton').prev().val();
         frameElement.attr('href',inputValue);
    });
    
    $(document).on('click','#imageSetupButton',function(e){ //edit links elements
         var tempPath = URL.createObjectURL($('#imageSetupButton').prev()[0].files[0]);
         frameElement.attr('src',tempPath);
    });    
});