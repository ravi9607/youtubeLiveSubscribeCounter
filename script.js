$(document).ready(function() {

    var imageLink;
    var width;
    var height;
    var title;
    var totalViews;
    var totalSubscribers;
    var totalVideos;
    var channelId;
    var url;

    $("form").submit(function() {

        // fetch the value that is entered into the input field

        channelId = $("#search").val();

        // we will make the request to the youtube api

        // api key : AIzaSyBc5SRKGUxYGFTAOvQ8PXTPKjHEeu_WskU

        // make a request

        url = "https://www.googleapis.com/youtube/v3/channels?key=AIzaSyBBXsMiUVpT_pJgVe2k0ewZV-dNljtQdCY&id=" + channelId + "&part=snippet,contentDetails,statistics";

        $.get(url, function(data) {

            fetchData(data);

            bindData(imageLink, width, height, title, totalSubscribers, totalViews, totalVideos);

        });

        // automatically fetch the response from youtube api

        setInterval(function() {


            url = "https://www.googleapis.com/youtube/v3/channels?key=AIzaSyBBXsMiUVpT_pJgVe2k0ewZV-dNljtQdCY&id=" + channelId + "&part=statistics";

            $.get(url, function(data) {

                console.log(data);

                updateSubscribers(data);

            });

        }, 0);


        return false;


    });

    function fetchData(data) {
        imageLink = data.items[0].snippet.thumbnails.medium.url;
        width = data.items[0].snippet.thumbnails.medium.url.width;
        height = data.items[0].snippet.thumbnails.medium.url.height;

        title = data.items[0].snippet.title;

        totalSubscribers = data.items[0].statistics.subscriberCount;
        totalViews = data.items[0].statistics.viewCount;
        totalVideos = data.items[0].statistics.videoCount;

    }

    function bindData(imageLink, width, height, title, totalSubscribers, totalViews, totalVideos) {
        $("#thumbnail").attr("src", imageLink);
        $("#thumbnail").attr("width", width);
        $("#thumbnail").attr("height", height);
        $("#title").html(title);
        $("#subscribers").html("<h5>Subscribers</h5>" + totalSubscribers);
        $("#totalViews").html("<h5>TotalViews</h5>" + totalViews);
        $("#totalVideos").html("<h5>TotalVideos</h5>" + totalVideos);

    }

    function updateSubscribers(data) {
        $("#subscribers").html("<h5>Subscribers</h5>" + data.items[0].statistics.subscriberCount);
    }




});