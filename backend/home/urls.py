from django.urls import path,include

app_name='home'
urlpatterns = [
   
    path("", include("home.api.v1.urls")),
]