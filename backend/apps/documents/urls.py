from django.urls import path

from . import views

urlpatterns = [
    path('documents/', views.DocumentListView.as_view(), name='documents-list'),
    path('open-data/', views.OpenDataListView.as_view(), name='open-data-list'),
    path('press-releases/', views.PressReleaseListView.as_view(), name='press-releases-list'),
]
