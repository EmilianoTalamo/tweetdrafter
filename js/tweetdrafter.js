/*
	Guido Emiliano Tálamo
	DWM2A - 2017
	Profesor Omar Toyos
*/
var tweet = $('#textarea');
var chars = 140 - $(tweet).val().length;
var tweetlist;
$('tweetlink').on('click', function()
{
	$.mobile.back();
});
$.each(localStorage, function(i)
{
	var tw = $('<li class="ui-li-static ui-body-inherit ui-first-child waves-effect waves-button  waves-effect waves-button">' + localStorage[i] + '</li>');
	$("#tweetlist").append(tw);
});
var current = $('document');
$('#charcount').html(chars);
function charcount()
{
	chars = 140 - tweet.val().length;
	$('#charcount').html(chars);
	if(chars < 0)
	{
		$('#charcount').css('color','red');
	}
	else
	{
		$('#charcount').css('color','black');
	}
}

function refreshtweets()
{
	if(current.html() == "")
	{
		dilit();
	}
	$(tweetlist).unbind('tap');
	$(tweetlist).unbind('taphold');
	$('#backbtn').unbind('tap');
	tweetlist = $('#tweetlist').children();
	$(tweetlist).on('tap', function()
	{
		current = $(this);
		edit();
	});
	$(tweetlist).on('taphold', function()
	{
		$(tweetlist).unbind('tap');
		$('#actions').popup('open', {transition: 'fade', changeHash : false});
		current = $(this);
		$('#popuptweet').text($(current).text());
		$('#ghosttweet').text($(current).text());
		$('#ghosttweet').attr('value',$(current).text());
		$('#tweetlink').attr('href','https://twitter.com/home?status=' + $(current).text());
		refreshtweets();
	});
	localStorage.clear();
	$.each(tweetlist, function(i)
	{
		localStorage.setItem(i, $(this).text());
	});
}

function edit()
{
	tweet.val($(current).text());
	charcount();
	$.mobile.navigate('#pagetwo', {transition: 'fade'});
	$(tweet).on('input', function()
	{
		$(current).text($(tweet).val());
		if($('#charcount').text() < 0)
		{
			$(current).css('border-left','2px solid red');
		}
		else
		{
			$(current).css('border-left','2px solid #2196F3');
		}
	});
}

function newtw()
{
	n = $('<li class="ui-li-static ui-body-inherit ui-first-child waves-effect waves-button  waves-effect waves-button"></li>');
	$("#tweetlist").append(n);
	current = n;
	edit();
}

function dilit()
{
	$(current).remove();
}

$(document).on("pagebeforeshow", "#pageone", refreshtweets);
$(tweet).on('input', charcount);
$('#newtweet').on('tap', newtw);
$('#del').on('tap', function()
{
	$.mobile.back();
	dilit();
});

$('#copybtn').on('tap', function()
{
	$.mobile.back();
});

$('#contextualdelbtn').on('tap', function()
{
	$.mobile.back();
	dilit();
	refreshtweets();
});

var clipboard = new Clipboard('#copybtn');