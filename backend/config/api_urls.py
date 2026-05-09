"""Aggregated v1 API routes."""
from django.urls import include, path

urlpatterns = [
    path('', include('apps.core.urls')),
    path('', include('apps.news.urls')),
    path('', include('apps.events.urls')),
    path('', include('apps.teams.urls')),
    path('', include('apps.people.urls')),
    path('', include('apps.pages.urls')),
    path('', include('apps.documents.urls')),
    path('', include('apps.media_app.urls')),
    path('', include('apps.international.urls')),
]
