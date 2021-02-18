from django.db import models

# Create your models here.

class Appointments(models.Model):
    firstName = models.CharField(max_length=30,blank=False)
    lastName = models.CharField(max_length=30,blank=False)
    phNumber = models.CharField(max_length=10,blank=False)
    eMail = models.EmailField(max_length=50)
    startTime = models.DateTimeField(blank=False)
    endTime = models.DateTimeField(blank=False)


    class Meta:
        ordering = ['startTime']