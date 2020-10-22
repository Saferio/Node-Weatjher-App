$(document).ready(function() {
    console.log("Working")



    $("#weatherSearch").submit((e) => {
        e.preventDefault();

        var search = $("#search").val();
        if (!search) {
            $("#pageBreak").show()
            $(".weatherError").text("")
            $(".location").text("Please enter the address")
            $(".forecast").text("")
        } else {
            $("#pageBreak").show()
            $(".location").text("Loading...")
            fetch(`/weather?search=${search}`).then((response) => {

                response.json().then((data) => {
                    if (data.error) {
                        $(".weatherError").text(data.error)
                        $(".location").text("")
                        $(".forecast").text("")
                        console.log(data.error)
                    } else {
                        $(".weatherError").text("")
                        $(".location").text(data.location)
                        $(".forecast").text(data.forecast)
                        console.log(data.forecast)
                    }

                })
            })
        }


    })

});