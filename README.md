# BackEnd

- Python Packages
pip install Django
pip install djangorestframework
pip install djangorestframework-simplejwt
pip install django-cors-headers

settings:

Add the packages to install apps:
    'corsheaders',
    'rest_framework',
    'rest_framework_simplejwt.token_blacklist'


add to middleware:
"corsheaders.middleware.CorsMiddleware",
"django.middleware.common.CommonMiddleware",
```
CORS_ALLOWED_ORIGINS = [
 
    "http://localhost:3000",
    "http://127.0.0.1:3000",
]
```
and add the settings for simple jwt:
```
REST_FRAMEWORK = {
     'DEFAULT_AUTHENTICATION_CLASSES': [
        'rest_framework_simplejwt.authentication.JWTAuthentication',
      ],
}

SIMPLE_JWT = {
     'ACCESS_TOKEN_LIFETIME': timedelta(minutes=10),
     'REFRESH_TOKEN_LIFETIME': timedelta(days=1),
     'ROTATE_REFRESH_TOKENS': True,
     'BLACKLIST_AFTER_ROTATION': True
}
```


- create an app (accounts):
add: api/account/v1


create the models.py:

create the serailizer.py:
1. UserSerializer()
2. MyTokenObtainPairSerializer => to add our field to token...

create urls.py:


- TokenRefreshView:
and 
- TokenObtainPairView:
you can import both of them from jwt_views: 
from rest_framework_simplejwt import views as jwt_views

or you can create a custom TokenObtainPairView.

so you have two endpoints:
api/token/
api/token/refresh/

when you login at the api/token -> it gives you access and refresh token.
and then when the access token get expired : 
you can: send the refresh token whit post request to api/token/refresh  -> it gives you new accsess and refresh token.

summery:
until now:
- install the packegs
- add the settings
- create accounts app, add the Custom User Model and Profile model
- create serilizer : add the field that we want show it in the token
- create views: TokenObtainPairView 
- create urls : add TokenRefreshView and Custom TokenObtainPairView to urls.
- create a user and test the functionalty. I mean , enter the username and password in the /api/token
    and get the access and refresh token, copey the refresh token and go to the /api/token/refresh
    and send post requst with the old refresh toekn--> it give you new access and refresh token.

- create the views for testing: Like
```
class HomeView(APIView):
     
    permission_classes = (IsAuthenticated, )
    def get(self, request):
        content = {
              'message': 'Welcome to the JWT Authentication page using React Js and Django!'}
        return Response(content) 
```
now send a get request with authorization barear and send the access token ...

### LogOut

By the use of refresh token, we will generate the new access token. But, what happens when user wants to log out.
The client can forgot both token. For example we have remove both the access and refresh token from localStorage. But, if refresh token is stolen, then another client use this token and use it. To prevent this, we will create the logout API, by using we can invalid the refresh token.

- To create logout API, we will write the LogoutView in our views.py file in app directory:
```
class LogoutView(APIView):
     permission_classes = (IsAuthenticated,)
     def post(self, request):
          
          try:
               refresh_token = request.data["refresh_token"]
               token = RefreshToken(refresh_token)
               token.blacklist()
               return Response(status=status.HTTP_205_RESET_CONTENT)
          except Exception as e:
               return Response(status=status.HTTP_400_BAD_REQUEST)


urlpatterns = [
     .....
     path('logout/', views.LogoutView.as_view(), name ='logout')
]
```


# front end:

first:

create a context to share between components:
AuthContext():
- login_user()
- register_user()

check the local storge:
```
    const [authTokens, setAuthTokens] = useState(() =>
        localStorage.getItem("authTokens")
            ? JSON.parse(localStorage.getItem("authTokens"))
            : null
    );

```
then create login user function:

```
 const loginUser = async (email, password) => {
        const response = await fetch("http://127.0.0.1:8000/api/token/", {
            method: "POST",
            // <form action="http://127.0.0.1:8000/api/token/" method="POST" >
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email, password
            })
        })

        const data = await response.json()
        console.log(data);

        if (response.status === 200) {
            console.log("Logged In");
            // set the access and refresh tokens in local storage
            setAuthTokens(data)
            // set the user data ,user data like email , userid image ... in the localstoreage,
            // for user we have to decode the access token ...
            
            setUser(jwt_decode(data.access))
            localStorage.setItem("authTokens", JSON.stringify(data))
            history.push("/dashboard")

        } else {
            console.log(response.status);
            console.log("there was a server issue");
            
            
        }


    }


```

sweetalert2
jwt-decode




# Application definition
```
INSTALLED_APPS = [
     ........
     # Register your app
    'rest_framework',
    'corsheaders',
    'oauth2_provider',
    'social_django',
]
```
```
CORS_ORIGIN_ALLOW_ALL = True
```
.....

MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',
    ..............
]

TEMPLATES = [
    {
        ...
        'OPTIONS': {
            'context_processors': [
                ...
                'social_django.context_processors.backends',
                'social_django.context_processors.login_redirect',
            ],
        },
    }
]


REST_FRAMEWORK = {
    ...
    'DEFAULT_AUTHENTICATION_CLASSES': (
        ...
        'oauth2_provider.contrib.rest_framework.OAuth2Authentication',
        'drf_social_oauth2.authentication.SocialAuthentication',
    ),
}

AUTHENTICATION_BACKENDS = (
    # Google OAuth2
   'social_core.backends.google.GoogleOAuth2',
   'drf_social_oauth2.backends.DjangoOAuth2',
   'django.contrib.auth.backends.ModelBackend',
)


# Define SOCIAL_AUTH_GOOGLE_OAUTH2_SCOPE to get extra permissions from Google.
SOCIAL_AUTH_GOOGLE_OAUTH2_SCOPE = [
    'https://www.googleapis.com/auth/userinfo.email',
    'https://www.googleapis.com/auth/userinfo.profile',
]

.....