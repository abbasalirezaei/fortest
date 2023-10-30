from django.contrib import admin
from .models import Task

class TaskAdmin(admin.ModelAdmin):
    list_display=['id','title','completed']

admin.site.register(Task,TaskAdmin)
# Register your models here.
