//Sign in function for google
function onSignIn(googleUser) {
  var profile = googleUser.getBasicProfile();
  console.log('ID: ' + profile.getId());
  console.log('Name: ' + profile.getName());
  console.log('Image URL: ' + profile.getImageUrl());
  console.log('Email: ' + profile.getEmail());
}

//Sign out function for google
function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
      console.log('User signed out.');
    });
  }

window.fbAsyncInit = function() {
  FB.init({
    appId      : '{3849666025153559}',
    cookie     : true,
    xfbml      : true,
    version    : '{v10.0}'
  });

  FB.AppEvents.logPageView();
};

(function(d, s, id){
   var js, fjs = d.getElementsByTagName(s)[0];
   if (d.getElementById(id)) {return;}
   js = d.createElement(s); js.id = id;
   js.src = "https://connect.facebook.net/en_US/sdk.js";
   fjs.parentNode.insertBefore(js, fjs);
 }(document, 'script', 'facebook-jssdk'));

FB.getLoginStatus(function(response) {
   statusChangeCallback(response);
});

{
   status: 'connected',
   authResponse: {
       accessToken: '...',
       expiresIn:'...',
       signedRequest:'...',
       userID:'...'
   }
}

function checkLoginState() {
 FB.getLoginStatus(function(response) {
   statusChangeCallback(response);
 });
}
