from django.urls import path

from . import views

urlpatterns = [
    # Categories — shared across afisha & generic event endpoints
    path('events/categories/', views.EventCategoryListView.as_view(), name='event-categories'),
    path('afisha/categories/', views.EventCategoryListView.as_view(), name='afisha-categories'),

    # Generic events (all published events)
    path('events/', views.EventListView.as_view(), name='event-list'),
    path('events/<slug:slug>/', views.EventDetailView.as_view(), name='event-detail'),

    # Afisha — subset filtered to show_in_afisha=True
    path('afisha/', views.AfishaListView.as_view(), name='afisha-list'),
    path('afisha/<slug:slug>/', views.AfishaDetailView.as_view(), name='afisha-detail'),
]
