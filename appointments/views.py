from django.shortcuts import render

# Create your views here.
from django.http.response import JsonResponse
from rest_framework.parsers import JSONParser
from rest_framework import status

from appointments.models import Appointments
from appointments.serializers import AppointmentsSerializer
from rest_framework.decorators import api_view


@api_view(['GET','POST','PUT','DELETE'])
def appointment_list(request):
    if request.method == 'GET':
        appointments = Appointments.objects.all()

        appointments_serializers=AppointmentsSerializer(appointments,many=True)
        return JsonResponse(appointments_serializers.data, safe=False)

    elif request.method == 'POST':
        appointments_data = JSONParser().parse(request)
        appointments_serializer= AppointmentsSerializer(data=appointments_data)

        if appointments_serializer.is_valid():
            appointments_serializer.save()
            return JsonResponse(appointments_serializer.data,status=status.HTTP_201_CREATED)
        return JsonResponse(appointments_serializer.errors,status=status.HTTP_400_BAD_REQUEST)