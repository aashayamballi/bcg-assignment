from django.db import models
from django.core.validators import MaxValueValidator, MinValueValidator
from django.db.models.query_utils import Q
from django.db.models.functions import TruncMonth
from django.db.models import Count

class Fuel(models.Model):
    fuel = models.CharField(max_length=10, primary_key=True)

    def __str__(self) -> str:
        return self.fuel

class VehicleSegment(models.Model):
    vehicle_segment = models.CharField(max_length=10, primary_key=True)

    def __str__(self) -> str:
        return self.vehicle_segment

class Region(models.Model):
    region = models.CharField(max_length=10, primary_key=True)

    def __str__(self) -> str:
        return self.region

class PolicyDetailQuerySet(models.QuerySet):
    """
        custom queryset class that can be used with policydetail model 
    """
    def search(self, search_query=None):
        lookups = Q(policy_id=search_query) | Q(customer_id=search_query)
        return self.filter(lookups)
    
    def monthly_timeline_data(self):
        monthly_timeline = self.annotate(
            month=TruncMonth('date_of_purchase')).values('month').annotate(
                policies_bought=Count('id'))
        return monthly_timeline

class PolicyDetailManager(models.Manager):
    """
        custom model manager class for policy detail
    """
    def get_queryset(self):
        return PolicyDetailQuerySet(self.model, using=self._db)

    def search(self, search_query):
        return self.get_queryset().search(search_query)

    def monthly_timeline_data(self):
        return self.get_queryset().monthly_timeline_data()

class PolicyDetail(models.Model):
    MALE = "Male"
    FEMALE = "Female"
    OTHER = "Other"

    INCOME_GROUP_TYPES = [
        ("0-$25K", "0-$25K"),
        ("$25-$70K", "$25-$70K"),
        (">$70K", ">$70K")
    ]

    GENDER_TYPES = [
        (MALE, "Male"),
        (FEMALE, "Female"),
        (OTHER, "Other")
    ]

    policy_id = models.IntegerField(unique=True)
    date_of_purchase = models.DateField()
    customer_id = models.IntegerField()
    fuel = models.ForeignKey(Fuel, on_delete=models.CASCADE, related_name=\
        "policy_vehicle_fuel")
    vehicle_segment = models.ForeignKey(VehicleSegment, on_delete=models.CASCADE,
    related_name="policy_vehicle_segment")
    premium = models.IntegerField(validators=[MaxValueValidator(1000000),
                                                MinValueValidator(1)])
    bodily_injury_liability = models.BooleanField(default=False)
    personal_injury_protection = models.BooleanField(default=False)
    property_damage_liability = models.BooleanField(default=False)
    collision = models.BooleanField(default=False)
    comprehensive = models.BooleanField(default=False)
    customer_gender = models.CharField(max_length=10, choices=GENDER_TYPES)
    customer_income_group = models.CharField(max_length=10, 
                                                    choices=INCOME_GROUP_TYPES)
    customer_region = models.ForeignKey(Region, on_delete=models.CASCADE)
    customer_marital_status = models.BooleanField(default=False)

    objects = PolicyDetailManager()

    def __str__(self):
        return str(self.customer_id)


