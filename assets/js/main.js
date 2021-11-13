
//#region _________________________ Message fade ______________________________
	setTimeout(function() {
		jQuery('#flashMessage').fadeOut('slow');
	}, 5000); //time in milliseconds

//#endregion

//#region _________________________ Open image ________________________________
function test(element) { 
var newTab = window.open();
setTimeout(function(){newTab.document.body.innerHTML = element.innerHTML;
},500);
  return false;
}
//#endregion

// Fancybox Configuration
// $('[data-fancybox="gallery"]').fancybox({
// 	buttons: [
// 	  "slideShow",
// 	  "thumbs",
// 	  "zoom",
// 	  "fullScreen",
// 	  "share",
// 	  "close"
// 	],
// 	loop: false,
// 	protect: true
//   });
jQuery(".s").keyup(function (event) {
	alert("Hello! I am an alert box!!");
	// Retrieve the input field text and reset the count to zero
	var filter = $(this).val(),
		count = 0;
	var activeSearch = $(this).attr('id');
	var targetSearch = '';

	if (activeSearch == "filter") {
		targetSearch = "listLeadAuthor"
	}
	if (activeSearch == "filter2") {
		targetSearch = "listSubject"
	}
	if (activeSearch == "filter3") {
		targetSearch = "listDate"
	}

	if (event.keyCode == 8) {
		$("div.recordContainer span." + targetSearch).each(function () {
			$(this).parent().show();
		});
	}

	// Loop through the comment list
	$("div.recordContainer span." + targetSearch + ":visible").each(function () {
		// If the list item does not contain the text phrase fade it out
		if ($(this).text().search(new RegExp(filter, "i")) < 0) {
			$(this).parent().fadeOut("#records");

			// Show the list item if the phrase matches and increase the count by 1
		} else {
			$(this).parent().show();
			count++;
		}
	});

	// Update the count
	var numberItems = count;
	$("#filter-count").text("Matches = " + count);
});

