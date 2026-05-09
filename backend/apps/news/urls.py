from django.urls import path

from . import views

urlpatterns = [
    path('news/', views.NewsListView.as_view(), name='news-list'),
    path('news/<slug:slug>/', views.NewsDetailView.as_view(), name='news-detail'),
]
