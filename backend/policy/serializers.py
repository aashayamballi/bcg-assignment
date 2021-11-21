from django.db.models import fields
from rest_framework import serializers

from .models import PolicyDetail, Region

class PolicyDetailSerializer(serializers.ModelSerializer):
    """
        PolicyDetail serializer that serializes/deserialized json to queryset and
        viceversa. 

        Update method is for updating the policy detail method
    """

    class Meta:
        model = PolicyDetail
        fields = "__all__"
    
    def update(self, instance_obj, validated_data):
        premium_val = validated_data.get("premium")

        instance_obj.premium = premium_val
        instance_obj.save()

        return instance_obj

class PolicyTimelineSerializer(serializers.ModelSerializer):
    """
        This is to convert the queryset to JSON. since there is not
        policies_bought, purchase_date in the PolicyDetail model
        setting the value in here so that this serializer won't throw an error.
    """
    policies_bought = serializers.IntegerField()
    month = serializers.DateField(format="%m-%d-%Y")

    class Meta:
        model = PolicyDetail
        fields = ("policies_bought", "month")
        ordering = ['purchase_date']

class RegionSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Region
        fields = "__all__"
