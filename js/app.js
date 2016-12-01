
console.log($);

var appContainer = document.querySelector('#app-container')

var forEach = function(arr, cb){
   for(var i = 0 ; i < arr.length; i+=1){
      cb(arr[i], i, arr)
   }
}

var  avatarObj= {
  matt: {username: "Matt", showIds: [170,169,175,318,76,270, 255]},
  ed: {username: "Ed", showIds: [5853,431,80,279,570,76,73,20540,83,17119]},
  michelle: {username: "Michelle", showIds: [83,576,735,73,749,170,112,80]},
  justin: {username: "Justin", showIds: [551,169,490,530,73,302, 547, 532]},
}


// var flixContainerEl = document.querySelector('.row')
var router = function(){
  var selectedUser = window.location.hash.slice(1)
  if (selectedUser === 0){
    showHomePage()
    return
  }
  // console.log(selectedUser);
  showUserShowsPage(selectedUser)

}

var showHomePage = function(avatarObj){
  var avatarStr = '<div class="row users-container">'
         avatarStr += "<h1>Who's watching?</h1>"
         for(var prop in avatarObj ){

           var avatarStr = '<div class="col-xs-6 col-md-3">'
               avatarStr +=  '<div class="thumbnail">'
               avatarStr +=     '<a href= "#'+propp+'">'
               avatarStr +=        '<img src="https://flathash.com/' + propp +'" alt="">'
               avatarStr +=        '<h3>'+ avatarObj[propp].username +'</h3>'
               avatarStr +=     '</a>'
               avatarStr += '</div>'
            }

          appContainer.innerHTML = avatarStr
}

var showUserShowsPage = function(usr){
    // var usr = avatarObj.username
  var userObj = avatarObj[usr]
console.log(userObj);

  var bigHTMLStr = '<h2>All <span class="bg-primary"> '+ userObj.username + '\'s </span> Shows </h2>'
      bigHTMLStr += '<div class="row shows-list"> </div>'
      bigHTMLStr += '<a href= "file:///Users/chadhaselden/TIY/assignments/assignment-19-netflix/index.html" class="glyphicon glyphicon-home" aria-hidden="true"></a>'

      appContainer.innerHTML = bigHTMLStr

      var firstShowId = userObj.showIds[0]
      console.log(firstShowId )


     forEach (userObj.showIds, function(elementIdNum){
    //  console.log(elementIdNum)

     $.getJSON("http://api.tvmaze.com/shows/" + elementIdNum ).then(function(dataResponse){
        console.log(dataResponse)

        // console.log(userList[selectedUser])

      var showsListContainerEl = document.querySelector('.shows-list')
      var showStr = '<div class="col-sm-3">'
        showStr +=    "<img src='" + dataResponse.image.medium  + "'>"
        showStr +=    "<h4>" + dataResponse.name  + "</h4>"
        showStr += '</div>'

      showsListContainerEl.innerHTML += showStr
    })

  })
}

window.addEventListener('hashchange', router)
router()
