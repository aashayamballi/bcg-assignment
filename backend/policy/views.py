from django.core.paginator import Paginator, PageNotAnInteger, EmptyPage
from django.shortcuts import get_object_or_404

from rest_framework.views import APIView
from rest_framework.response import Response

from .models import PolicyDetail, Region
from .serializers import (PolicyDetailSerializer, PolicyTimelineSerializer,
    RegionSerializer
)

class PolicyDetailAPIView(APIView):
    NUM_OF_PAGES_PER_PAGE = 20
    
    def get(self, request):
        try:
            response_data = {}
            page_num = request.query_params.get('page_num', 1)
            search_query = request.query_params.get('search_query')
            
            if search_query is None or search_query == "":
                policy_qs = PolicyDetail.objects.all()
            else:
                policy_qs = PolicyDetail.objects.search(search_query)
            
            paginator = Paginator(policy_qs, self.NUM_OF_PAGES_PER_PAGE)
            page_data = paginator.page(page_num)
            serialized_data = PolicyDetailSerializer(page_data, many=True).data
        
        except PageNotAnInteger:
            page_data = paginator.page(1)
            page_num = 1
            serialized_data = PolicyDetailSerializer(page_data, many=True).data

        except EmptyPage:
            page_num = paginator.num_pages
            page_data = paginator.page(page_num)
            serialized_data = PolicyDetailSerializer(page_data, many=True).data
        
        response_data["total_policy_count"] = paginator.count
        response_data["total_num_pages"] = paginator.num_pages
        response_data["current_page"] = int(page_num)
        response_data["has_next_page"] = page_data.has_next()
        response_data["has_previous_page"] = page_data.has_previous()
        response_data["data_per_page"] = self.NUM_OF_PAGES_PER_PAGE
        response_data["page_data"] = serialized_data

        return Response(response_data)
        
    def patch(self, request):
        premium_val = request.data.get("premium")
        id = request.data.get("id")
        
        policy_detail_obj = get_object_or_404(PolicyDetail, id=id)

        data_to_update ={
            "premium": premium_val
        }

        serializer = PolicyDetailSerializer(policy_detail_obj, 
        data=data_to_update, partial=True)

        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(f"Policy({id}) updated successfully")
    

class PolicyTimeLineAPIView(APIView):
    def get(self, request):
        region = request.query_params.get("region")
        response_data = {}

        policy_qs = PolicyDetail.objects.all()

        if region is None or region == "":
            timeline_data = policy_qs.monthly_timeline_data()
        else:
            timeline_data = policy_qs.filter(customer_region__region=region)\
                .monthly_timeline_data()
            
        response_data["timeline_data"] = PolicyTimelineSerializer(timeline_data,
                                                                many=True).data

        return Response(response_data)


class RegionAPIView(APIView):
    """
        This API will return the regions
    """
    def get(self, _):
        regions = Region.objects.all()
        serialized_data = RegionSerializer(regions, many=True).data
        return Response(serialized_data)



        



