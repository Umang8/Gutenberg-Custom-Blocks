(function( $ ) {
  'use strict';
  
  $(document).on('click', '.state-options', function() {
    var formData = 'security=' + myAjax.ajax_nonce;
    var category = $(this).attr("data-category");
    var stateId = $(this).attr("data-stateid");
    $('.getData').html('<tr class="load-center"><td colspan="4"><div class="loader"></td></tr>');
   
    $.ajax({
      type: 'post',
      dataType: 'HTML',
      url: myAjax.ajax_url,
      data: {action: 'display_selected_state', category: category, stateId: stateId, formData: formData},
      success: function (response) {
        $('.getData').html(response);
        jQuery('.cs-state-details-tbl table tbody tr td').each(function(){
            var get = jQuery(this).closest('table').find('th').eq( this.cellIndex );
            var th = get.text();
            jQuery(this).attr('data-title', th);
        });
      },
      error: function () {
        console.log('Cannot retrieve data.');
      }
    });
    
  })

  var $ = jQuery;
        var contributor_id = getUrlParameter('contributor_id');
        if( contributor_id != '' ){
            var header_height = jQuery("header").outerHeight();
            var breadcrumb_height = jQuery(".bread-crumb").outerHeight();
            var scroll_position = $("#"+contributor_id).offset().top - ( header_height + breadcrumb_height + 20 ) ;
            setTimeout(() => {
                $('html, body').animate({scrollTop: scroll_position }, 'slow');
            }, "1000");
            
        } 
        function getUrlParameter(sParam) {
                var sPageURL = window.location.search.substring(1),
                    sURLVariables = sPageURL.split('&'),
                    sParameterName,
                    i;
                for (i = 0; i < sURLVariables.length; i++) {
                    sParameterName = sURLVariables[i].split('=');
                    if (sParameterName[0] === sParam) {
                        return sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
                    }
                }
                return false;
        };
        jQuery('.sponsor').on('click', function(e){
            e.preventDefault();
            jQuery(this).siblings('#popup').addClass('active-popup');
            jQuery('body').addClass('fixed-popup');
        });
        
        // jQuery('.close-popup').on('click', function(e){
        //     jQuery(this).parents('#popup').removeClass('active-popup');
        //     jQuery('body').removeClass('fixed-popup');
        // });
        jQuery('body').on('click', '.close-popup', function( e ) {
            e.preventDefault();
            jQuery(this).parents('#popup').removeClass('active-popup');
            jQuery('body').removeClass('fixed-popup');
        }); 
        
        jQuery(document).mouseup(function(e) 
        {
            var container = jQuery(".popup-content");
        
            // if the target of the click isn't the container nor a descendant of the container
            if (!container.is(e.target) && container.has(e.target).length === 0) 
            {
                container.parent().removeClass('active-popup');
                jQuery('body').removeClass('fixed-popup');
            }
        });
        jQuery(document).on("click", ".reviewed-author a, .author-name a ", function(e) { 
            var current_id = jQuery(this).attr('data-id');
            jQuery('body').addClass('fixed-popup');
            
            jQuery.ajax({
                url     : "/wp-admin/admin-ajax.php",
                type    : 'POST',
                data    : {
                    action    : "return_popup_html",
                    current_id: current_id
                },
                success: function (data, textStatus, XMLHttpRequest) {
                   jQuery('.banner_popup_main').html('');
                   jQuery('.banner_popup_main').html(data);
                   jQuery('.banner_popup_main .popup-container').addClass('active-popup');                 
                }
            });
            return false;
    
        });
  
})( jQuery );
