$(function() {

$('.btnSend').click(function(){
       sendTxtMessage($('.message').val());
});
$('.selectVendor').click(function(){
	ChatSection(1);
      var receiver_id = $(this).attr('id');
      var tmsiswa_id = $(this).attr('tmsiswa_id');
      var anonim = $(this).attr('anonim');
	
	  $('#ReciverId_txt').val(receiver_id);
	  $('#ReciverName_txt').html("<span class='badge badge-danger'>"+$(this).attr('title')+"</span>");
	  
	  GetChatHistory(receiver_id,tmsiswa_id,anonim);
 				
});
$('.upload_attachmentfile').change(function(){
	
	DisplayMessage('<div class="spiner"><i class="fa fa-circle-o-notch fa-spin"></i></div>');
	ScrollDown();
	
	var file_data = $('.upload_attachmentfile').prop('files')[0];
	var receiver_id = $('#ReciverId_txt').val();   
    var form_data = new FormData();
    form_data.append('attachmentfile', file_data);
	form_data.append('type', 'Attachment');
	form_data.append('receiver_id', receiver_id);
	
	$.ajax({
		        url: base_url+'layananbk/send_text_message',
               
                dataType: 'json',  
                cache: false,
                contentType: false,
                processData: false,
                data: form_data,                        
                type: 'post',
                success: function(response){
					
					$('.upload_attachmentfile').val('');
					GetChatHistory(receiver_id);
				},
				error: function (jqXHR, status, err) {
 							 // alert('Local error callback');
				}
	 });
	
});
$('.ClearChat').click(function(){
       var receiver_id = $('#ReciverId_txt').val();
  	 			$.ajax({
						  //dataType : "json",
  						  url: 'chat-clear?receiver_id='+receiver_id,
						  success:function(data)
						  {
  							 GetChatHistory(receiver_id);		 
						  },
						  error: function (jqXHR, status, err) {
 							 // alert('Local error callback');
						  }
 					});
 				
});

 

});	///end of jquery

function ViewAttachment(message_id){
//alert(message_id);
			/*$.ajax({
						  //dataType : "json",
  						  url: 'view-chat-attachment?message_id='+message_id,
						  success:function(data)
						  {
  							 		 
						  },
						  error: function (jqXHR, status, err) {
 							 // alert('Local error callback');
						  }
 					});*/
}
function ViewAttachmentImage(image_url,imageTitle){
	$('#modelTitle').html(imageTitle); 
	$('#modalImgs').attr('src',image_url);
	$('#myModalImg').modal('show');
}

function ChatSection(status){
	//chatSection
	if(status==0){
		$('#chatSection :input').attr('disabled', true);
    } else {
        $('#chatSection :input').removeAttr('disabled');
    }   
}
ChatSection(0);


function ScrollDown(){
	var elmnt = document.getElementById("content");
    var h = elmnt.scrollHeight;
   $('#content').animate({scrollTop: h}, 1000);
}
window.onload = ScrollDown();

function DisplayMessage(message){
	var Sender_Name = $('#Sender_Name').val();
	var Sender_ProfilePic = $('#Sender_ProfilePic').val();
	
		var str = '<div class="direct-chat-msg right">';
				str+='<div class="direct-chat-info clearfix">';
				 str+='<span class="direct-chat-name pull-right">'+Sender_Name ;
				 str+='</span><span class="direct-chat-timestamp pull-left"></span>'; //23 Jan 2:05 pm
				 str+='</div><img class="direct-chat-img" src="'+Sender_ProfilePic+'" alt="">';
				 str+='<div class="direct-chat-text">'+message;
				 str+='</div></div>';
		$('#dumppy').append(str);
}

function sendTxtMessage(message){
	var messageTxt = message.trim();
	if(messageTxt!=''){
		//console.log(message);
 		DisplayMessage(messageTxt);
		
				var layanan    = $('#ReciverId_txt').val();
				var tmsiswa_id = $('#tmsiswa_id').val();
				var anonim = $('#anonim').val();
				
				$.ajax({
						  dataType : "json",
						  type : 'post',
						  data : {messageTxt : messageTxt, layanan : layanan,tmsiswa_id:tmsiswa_id},
						  
						  url: base_url+'teacherbk/send_text_message',
						  success:function(data)
						  {
  							GetChatHistory(layanan,tmsiswa_id,anonim)		 
						  },
						  error: function (jqXHR, status, err) {
 							 // alert('Local error callback');
						  }
 					});
					
		
		
		ScrollDown();
		$('.message').val('');
		$('.message').focus();
	}else{
		$('.message').focus();
	}
}

function GetChatHistory(receiver_id,tmsiswa_id,anonim){
				$.ajax({
						  //dataType : "json",
  						  url: base_url+'teacherbk/get_chat_history_by_vendor?receiver_id='+receiver_id+"&tmsiswa_id="+tmsiswa_id+"&anonim="+anonim,
						  success:function(data)
						  {
  							$('#dumppy').html(data);
							ScrollDown();	 
						  },
						  error: function (jqXHR, status, err) {
 							 // alert('Local error callback');
						  }
 					});
}


