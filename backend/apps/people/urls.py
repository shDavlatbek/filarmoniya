from django.urls import path

from . import views

urlpatterns = [
    path('management/', views.ManagementListView.as_view(), name='management-list'),
    path('management/<slug:slug>/', views.ManagementDetailView.as_view(), name='management-detail'),
    path('central-apparatus/', views.CentralApparatusListView.as_view(), name='central-apparatus-list'),
    path('central-apparatus/<slug:slug>/', views.CentralApparatusDetailView.as_view(), name='central-apparatus-detail'),
]
