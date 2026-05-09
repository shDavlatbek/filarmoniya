from django.urls import path

from . import views

urlpatterns = [
    path('teams/', views.TeamListView.as_view(), name='teams-list'),
    path('teams/<slug:slug>/', views.TeamDetailView.as_view(), name='teams-detail'),
]
