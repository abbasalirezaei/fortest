from django.contrib import admin

from home.models import ContactMessage
# Register your models here.
class ContactMessageAdmin(admin.ModelAdmin):
    list_display = ['name','subject', 'update_at','status']
    readonly_fields =('name','subject','email','message',)
    list_filter = ['status']

admin.site.register(ContactMessage,ContactMessageAdmin)

https://stackoverflow.com/questions/66649074/django-rest-frame-work-send-email-from-contact-form