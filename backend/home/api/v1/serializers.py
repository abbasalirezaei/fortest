from rest_framework import serializers
from home.models import ContactMessage

class ContactMessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactMessage
        fields = [
            'name',
			'email',
			'subject',
			'message',
		]
