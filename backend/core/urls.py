from django.contrib import admin
from django.urls import path,include

from django.conf import settings
from django.conf.urls.static import static
from django.views.generic import TemplateView
urlpatterns = [
    path('admin/', admin.site.urls),
    # path('api/', include("api.urls")),
    path('accounts/', include("accounts.urls")),
    path('api/v1/todos/', include("todos.urls")),
    path("", TemplateView.as_view(template_name="index.html")),
    path('api/v1/home/', include("home.urls")),
]+static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

