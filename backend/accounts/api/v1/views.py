from rest_framework_simplejwt.views import TokenObtainPairView



from rest_framework.permissions import AllowAny ,  IsAuthenticated
from rest_framework.decorators import permission_classes , api_view
from rest_framework.response import Response
from rest_framework import generics,status



from accounts.models import User,Profile
from .serializers import (
	UserSerializer,
	MyTokenObtainPairSerializer,
	RegisterSerializer
	)



# Get All Routes

@api_view(['GET'])
def getRoutes(request):
    routes = [
        '/api/token/',
        '/api/register/',
        '/api/token/refresh/',
        

    ]
    return Response(routes)

class MyTokenObtainPairView(TokenObtainPairView):
	serializer_class=MyTokenObtainPairSerializer

class RegisterView(generics.CreateAPIView):
	queryset=User.objects.all()
	permission_classes=[AllowAny]
	serializer_class=RegisterSerializer


@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def testEndPoint(request):
    if request.method == 'GET':
        data = f"Congratulation {request.user}, your API just responded to GET request"
        return Response({'response_data': data}, status=status.HTTP_200_OK)
    elif request.method == 'POST':
        text = "Hello buddy"
        data = f'Congratulation your API just responded to POST request with text: {text}'
        return Response({'response_data': data}, status=status.HTTP_200_OK)
    return Response({}, status.HTTP_400_BAD_REQUEST)




from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
class HomeView(APIView):
     
    permission_classes = (IsAuthenticated, )
    def get(self, request):
        content = {
              'message': 'Welcome to the JWT Authentication page using React Js and Django!'}
        return Response(content)