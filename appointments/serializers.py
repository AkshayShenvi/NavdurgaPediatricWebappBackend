from rest_framework import serializers
from appointments.models import Appointments

class AppointmentsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Appointments
        fields =('id','firstName','lastName','phNumber','eMail','startTime','endTime')
