from django.db.models.functions import TruncDate
from rest_framework.views import APIView
from rest_framework.generics import ListCreateAPIView, CreateAPIView, ListAPIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .models import Medication, RefillRequest
from .serializers import MedicationSerializer, RefillRequestSerializer, UserSerializer
from django.db.models import Count

class RegisterView(CreateAPIView):
    serializer_class = UserSerializer
    permission_classes = []

class MedicationListView(ListAPIView):
    queryset = Medication.objects.all()
    serializer_class = MedicationSerializer

class RefillRequestCreateView(CreateAPIView):
    serializer_class = RefillRequestSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


from django.contrib.auth.models import User
from django.db.models.functions import TruncDate


class RefillRequestStatsView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        # Stats by medication
        medication_stats = RefillRequest.objects.values('medication__name').annotate(total=Count('id'))

        # Stats by date
        date_stats = (
            RefillRequest.objects
            .annotate(request_date=TruncDate('requested_at'))
            .values('request_date')
            .annotate(total=Count('id'))
            .order_by('request_date')
        )

        # Total counts
        total_requests = RefillRequest.objects.count()
        total_users = User.objects.count()

        return Response({
            "medication_stats": medication_stats,
            "date_stats": date_stats,
            "total_requests": total_requests,
            "total_users": total_users,
        })
