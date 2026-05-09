from django.urls import path

from . import views

urlpatterns = [
    path('videos/categories/', views.VideoCategoryListView.as_view(), name='video-categories'),
    path('videos/', views.VideoListView.as_view(), name='videos-list'),
]
