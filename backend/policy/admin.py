from django.contrib import admin
from .models import (
    Fuel, VehicleSegment, Region, PolicyDetail
)

# Register your models here.

all_policy_detail_related_models = [Fuel, VehicleSegment, Region, PolicyDetail]
admin.site.register(all_policy_detail_related_models)
