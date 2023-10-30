from django.urls import path,include

app_name='todos'
urlpatterns = [
   
    path("", include("todos.api.v1.urls")),
]