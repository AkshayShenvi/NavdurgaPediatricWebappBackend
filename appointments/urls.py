from django.conf.urls import url
from appointments import views


urlpatterns = [
    url(r'^api/appointments',views.appointment_list),
    # url(r'^api/appointments/(?P<pk>[0-9]+)$',views.appointment)
]
