from django.urls import path

from .views import (
    PolicyDetailAPIView, PolicyTimeLineAPIView, RegionAPIView
)

urlpatterns = [
    path("", PolicyDetailAPIView.as_view(), name="policy_detail"),
    path("timeline/", PolicyTimeLineAPIView.as_view(), name="policy_timeline"),
    path("regions/", RegionAPIView.as_view(), name="region")
]