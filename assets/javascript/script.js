//? HTML elements
const searchButton = document.getElementById("btnSearch");
const btnDownload = document.getElementsByClassName("btnDownload")[0];
const selectBox = document.getElementById("selectBox");
const searchInput = document.getElementById("inputSearch");
const resultMedia = document.getElementsByClassName("resultBoxMedia")[0];
const resultProfile = document.getElementsByClassName("resultBoxProfile")[0];
const resultBox = document.getElementById("resultBox");
const likesNumber = document.querySelector(".likes .number")
const commentsNumber = document.querySelector(".comments .number");
const userName = document.getElementById("userName");
const Name = document.getElementById("Name");
const profilePic = document.getElementById("profile");

//? vars
const data = null;
let selectBoxVal = selectBox.value;


searchButton.addEventListener("click", event => {
    //* prevent defualt
    event.preventDefault();

    // * get url or username
    const inputVal = searchInput.value;

    const xhr = new XMLHttpRequest();
    xhr.withCredentials = true;

    if (inputVal.length != 0) {

        if (selectBoxVal == 1) {

            // TODO . . .

        } else if (selectBoxVal == 2) {

            //! get short code
            let arr = inputVal.split("/");
            const ShortCode = arr[4];

            console.log(ShortCode);

            //! open request
            xhr.open("GET", `https://instagram47.p.rapidapi.com/post_details?shortcode=CWASiPpqguz`, true);
            xhr.setRequestHeader("x-rapidapi-host", "instagram47.p.rapidapi.com");
            xhr.setRequestHeader("x-rapidapi-key", "1312a34a16mshf6c97ff3206afe6p1602f7jsn357918cb1f08");
            xhr.setRequestHeader("access-control-allow-origin", "*");

            //! onload
            xhr.onload = function () {

                if (this.status == 200) {
                    //! get response json
                    const response = JSON.parse(this.responseText);

                    const resUserName = response.body.owner.username;
                    const resName = response.body.owner.full_name;
                    const profilePicURL = response.body.owner.profile_pic_url
                    const postURL = response.body.display_resources[0].src;
                    const numberOfLikes = response.body.edge_media_preview_like.count;
                    const numberOfComments = response.body.edge_media_preview_comment.count;
                    ////req 2

                    //! create img tag and set image src
                    const result = document.createElement("img");
                    result.style.width = "100%";
                    result.style.height = "100%";
                    result.setAttribute("src", postURL);
                    resultBox.appendChild(result);


                    //! set username and fullname
                    userName.innerHTML = resUserName;
                    Name.innerHTML = resName;

                    //! set likes and comments count 
                    likesNumber.innerHTML = numberOfLikes;
                    commentsNumber.innerHTML = numberOfComments;

                    //! set profile picture
                    profilePic.setAttribute("src", profilePicURL);



                    //! set download btn href
                    btnDownload.setAttribute("href", postURL);

                    resultMedia.style.opacity = "1";
                }
            }

            // ! send req
            xhr.send(data);
        }

    }



});

selectBox.addEventListener("change", event => {

    let selectBoxVal = selectBox.value;
    selectBoxVal = selectBoxVal;

    //* empty the search box
    searchInput.value = "";

    //* change input placeholder
    if (selectBoxVal == 1) {
        searchInput.setAttribute("placeholder", "Type Username");
    } else {

        searchInput.setAttribute("placeholder", "Paste post URL");
    }

});